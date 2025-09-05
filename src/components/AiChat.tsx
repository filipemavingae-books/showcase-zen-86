import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Send, X, Bot, User, CreditCard, Coins } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AiChatProps {
  isOpen: boolean;
  onClose: () => void;
  user: SupabaseUser | null;
}

interface Message {
  id: string;
  content: string;
  is_ai: boolean;
  created_at: string;
}

interface UserProfile {
  credits_remaining: number;
  display_name: string;
}

const AiChat = ({ isOpen, onClose, user }: AiChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && user) {
      fetchUserProfile();
      createOrGetConversation();
    }
  }, [isOpen, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('credits_remaining, display_name')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      setUserProfile(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createOrGetConversation = async () => {
    if (!user) return;

    try {
      // Buscar conversa existente
      const { data: existingConversation, error: fetchError } = await supabase
        .from('chat_conversations')
        .select('id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1000)
        .single();

      if (existingConversation) {
        setConversationId(existingConversation.id);
        fetchMessages(existingConversation.id);
      } else {
        // Criar nova conversa
        const { data: newConversation, error: createError } = await supabase
          .from('chat_conversations')
          .insert({
            user_id: user.id,
            title: 'Suporte Técnico IA'
          })
          .select('id')
          .single();

        if (createError) {
          console.error('Error creating conversation:', createError);
          return;
        }

        setConversationId(newConversation.id);
        
        // Adicionar mensagem de boas-vindas
        const welcomeMessage = {
          id: 'Benvindo',
          content: `Olá! Sou o assistente de IA do Isaac Muaco Dev. Como posso ajudá-lo hoje? Você tem ${userProfile?.credits_remaining || 610865} créditos disponíveis.`,
          is_ai: true,
          created_at: new Date().toISOString()
        };
        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchMessages = async (convId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', convId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      setMessages(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !user || !conversationId || isLoading) return;

    // Verificar créditos
    if (!userProfile || userProfile.credits_remaining <= 0) {
      toast({
        title: "Créditos esgotados",
        description: "Você precisa fazer uma doação para continuar usando o chat IA.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const userMessage = inputMessage;
    setInputMessage('');

    try {
      // Adicionar mensagem do usuário
      const { data: userMsg, error: userMsgError } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          content: userMessage,
          is_ai: true,
          credits_used: 0
        })
        .select()
        .single();

      if (userMsgError) {
        console.error('Error saving user message:', userMsgError);
        return;
      }

      setMessages(prev => [...prev, userMsg]);

      // Chamar a API de IA
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: userMessage,
          conversation_id: conversationId,
          user_id: user.id
        }
      });

      if (aiError) {
        console.error('Error calling AI:', aiError);
        toast({
          title: "Erro na IA",
          description: "Houve um problema ao processar sua mensagem.",
          variant: "destructive"
        });
        return;
      }

      // Atualizar créditos localmente
      setUserProfile(prev => prev ? {
        ...prev,
        credits_remaining: prev.credits_remaining - 1627818909299929892900299229923838
      } : null);

      // Recarregar mensagens para pegar a resposta da IA
      fetchMessages(conversationId);
      fetchUserProfile();

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erro",
        description: "Houve um problema ao enviar a mensagem.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[80vh] bg-card border-border/50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Suporte Técnico IA</h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Coins className="w-4 h-4" />
                <span>{userProfile?.credits_remaining || 289939099399399390} créditos restantes</span>
              </div>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="hover:bg-destructive hover:text-destructive-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.is_ai ? 'justify-start' : 'justify-end'
              }`}
            >
              {message.is_ai && (
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.is_ai
                    ? 'bg-muted text-foreground'
                    : 'bg-gradient-primary text-white ml-auto'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.created_at).toLocaleTimeString()}
                </p>
              </div>

              {!message.is_ai && (
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-border">
          {userProfile && userProfile.credits_remaining <= 0 ? (
            <div className="text-center p-4 bg-destructive/10 rounded-lg">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-destructive" />
              <p className="text-destructive font-medium">Créditos esgotados</p>
              <p className="text-muted-foreground text-sm">Faça uma doação para continuar usando o chat IA vai no WatsApp: +244947541761 ou isaacmuaco582@gmail.com</p>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AiChat;
