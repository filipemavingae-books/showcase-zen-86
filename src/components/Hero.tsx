import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profilePhoto from '@/assets/profile-photo.png';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center bg-gradient-muted relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-secondary-light/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center animate-fade-in">
          {/* Profile Photo */}
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-primary rounded-full blur opacity-25 group-hover:opacity-75 transition-opacity duration-300" />
              <img
                src={profilePhoto}
                alt="Foto de perfil profissional"
                className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-background shadow-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
              Isaac Muaco Dev
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground mb-8">
              Desenvolvedor Full Stack
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Desenvolvedor especializado em criar soluções web modernas e inovadoras. 
              Transformo suas ideias em aplicações digitais de alta qualidade usando 
              React, TypeScript, Node.js e as tecnologias mais avançadas do mercado.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-white px-8 py-3 text-lg font-semibold"
                onClick={() => scrollToSection('portfolio')}
              >
                Ver Projetos
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 px-8 py-3 text-lg font-semibold"
                onClick={() => scrollToSection('contato')}
              >
                Entrar em Contato
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center">
              <button
                onClick={() => scrollToSection('sobre')}
                className="animate-bounce text-primary hover:text-secondary transition-colors duration-200"
                aria-label="Rolar para próxima seção"
              >
                <ArrowDown size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;