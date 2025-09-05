import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Auth from "@/components/Auth";
import AiChat from "@/components/AiChat";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    setShowAuth(false);
  };

  const handleOpenChat = () => {
    if (user) {
      setShowChat(true);
    } else {
      setShowAuth(true);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowChat(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        onOpenChat={handleOpenChat}
        onSignOut={handleSignOut}
        onOpenAuth={() => setShowAuth(true)}
      />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Contact />
      </main>
      <Footer />
      
      {showAuth && (
        <Auth onAuthSuccess={handleAuthSuccess} />
      )}
      
      <AiChat 
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        user={user}
      />
    </div>
  );
};

export default Index;