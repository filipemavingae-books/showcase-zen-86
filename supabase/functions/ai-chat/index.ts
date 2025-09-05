import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversation_id, user_id } = await req.json();

    // Create Supabase client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Verificar e decrementar créditos
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('credits_remaining')
      .eq('user_id', user_id)
      .single();

    if (profileError || !profile) {
      return new Response(JSON.stringify({ error: 'Perfil não encontrado' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (profile.credits_remaining <= 0) {
      return new Response(JSON.stringify({ error: 'Créditos insuficientes' }), {
        status: 402,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Decrementar créditos
    await supabaseAdmin
      .from('user_profiles')
      .update({ credits_remaining: profile.credits_remaining - 1 })
      .eq('user_id', user_id);

    // Buscar mensagens anteriores para contexto
    const { data: previousMessages } = await supabaseAdmin
      .from('chat_messages')
      .select('content, is_ai')
      .eq('conversation_id', conversation_id)
      .order('created_at', { ascending: true })
      .limit(10);

    // Preparar contexto
    let context = "Você é um assistente de IA especializado em desenvolvimento web e técnico do Isaac Muaco Dev. ";
    context += "Isaac é um desenvolvedor web especializado em React, TypeScript, Node.js, Supabase e tecnologias modernas. ";
    context += "Ele oferece serviços de desenvolvimento de sites, aplicações web, e-commerce, sistemas personalizados e suporte técnico. ";
    context += "Responda de forma útil, profissional e amigável sobre desenvolvimento web, tecnologias, ou qualquer dúvida relacionada aos serviços do Isaac.\n\n";

    if (previousMessages && previousMessages.length > 0) {
      context += "Histórico da conversa:\n";
      previousMessages.forEach(msg => {
        context += `${msg.is_ai ? 'IA' : 'Usuário'}: ${msg.content}\n`;
      });
      context += "\n";
    }

    // Chamar API Gemini
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Chave da API Gemini não configurada');
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: context + `Usuário: ${message}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
          },
        }),
      }
    );

    const geminiData = await geminiResponse.json();
    
    if (!geminiResponse.ok) {
      console.error('Erro da API Gemini:', geminiData);
      throw new Error('Erro na API Gemini');
    }

    const aiResponse = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 
                     'Desculpe, houve um problema ao processar sua mensagem.';

    // Salvar resposta da IA
    await supabaseAdmin
      .from('chat_messages')
      .insert({
        conversation_id,
        content: aiResponse,
        is_ai: true,
        credits_used: 0
      });

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro na função ai-chat:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});