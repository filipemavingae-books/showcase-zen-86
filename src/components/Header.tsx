import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';

interface HeaderProps {
  user: User | null;
  onOpenChat: () => void;
  onSignOut: () => void;
  onOpenAuth: () => void;
}

const Header = ({ user, onOpenChat, onSignOut, onOpenAuth }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Name */}
          <div className="flex items-center space-x-2">
            <div className="text-xl md:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Isaac Muaco Dev
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['inicio', 'sobre', 'portfolio', 'servicos', 'contato'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-foreground hover:text-primary transition-colors duration-200 capitalize font-medium"
              >
                {item === 'inicio' ? 'Início' : 
                 item === 'sobre' ? 'Sobre' :
                 item === 'portfolio' ? 'Portfólio' :
                 item === 'servicos' ? 'Serviços' : 'Contato'}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              onClick={onOpenChat}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white font-semibold"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat IA
            </Button>
            
            {user ? (
              <Button 
                onClick={onSignOut}
                variant="outline"
                className="border-border hover:bg-muted"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            ) : (
              <Button 
                onClick={onOpenAuth}
                variant="outline"
                className="border-border hover:bg-muted"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border shadow-lg animate-slide-up">
            <nav className="px-4 py-6 space-y-4">
              {['inicio', 'sobre', 'portfolio', 'servicos', 'contato'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left text-foreground hover:text-primary transition-colors duration-200 capitalize font-medium py-2"
                >
                  {item === 'inicio' ? 'Início' : 
                   item === 'sobre' ? 'Sobre' :
                   item === 'portfolio' ? 'Portfólio' :
                   item === 'servicos' ? 'Serviços' : 'Contato'}
                </button>
              ))}

              <div className="space-y-3 pt-4 border-t border-border">
                <Button 
                  onClick={() => {
                    onOpenChat();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white font-semibold"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat IA
                </Button>
                
                {user ? (
                  <Button 
                    onClick={() => {
                      onSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-border hover:bg-muted"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {
                      onOpenAuth();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-border hover:bg-muted"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;