import { Github, Linkedin, Twitter, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com',
      label: 'LinkedIn'
    },
    {
      icon: Twitter,
      href: 'https://twitter.com',
      label: 'Twitter'
    },
    {
      icon: Instagram,
      href: 'https://instagram.com',
      label: 'Instagram'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Portfolio
              </h3>
              <p className="text-background/80 leading-relaxed">
                Criando experiências digitais excepcionais que conectam pessoas 
                e transformam ideias em realidade.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4 text-background">
                Links Rápidos
              </h4>
              <nav className="space-y-2">
                {['Início', 'Sobre', 'Portfólio', 'Serviços', 'Contato'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      const sectionId = item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                      const element = document.getElementById(sectionId === 'início' ? 'inicio' : sectionId);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="block w-full text-background/80 hover:text-background transition-colors duration-200"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold mb-4 text-background">
                Redes Sociais
              </h4>
              <div className="flex justify-center md:justify-end space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-background/20 transition-all duration-200 group"
                  >
                    <social.icon className="w-5 h-5 text-background/80 group-hover:text-background group-hover:scale-110 transition-all duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-background/20 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-2 text-background/80 text-sm">
                <span>© 2024 Portfolio. Feito com</span>
                <Heart className="w-4 h-4 text-red-400" />
                <span>e muito café</span>
              </div>
              
              <button
                onClick={scrollToTop}
                className="text-background/80 hover:text-background text-sm transition-colors duration-200"
              >
                Voltar ao Topo ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;