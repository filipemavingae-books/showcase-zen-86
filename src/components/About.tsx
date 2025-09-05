import { Code, Palette, Zap, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';

const About = () => {
  const skills = [
    {
      icon: Code,
      title: 'Desenvolvimento',
      description: 'React, TypeScript, Node.js, e as mais modernas tecnologias web'
    },
    {
      icon: Palette,
      title: 'Design UI/UX',
      description: 'Interfaces intuitivas e experiências de usuário memoráveis'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Otimização e velocidade para resultados excepcionais'
    },
    {
      icon: Heart,
      title: 'Paixão',
      description: 'Dedicação total em cada projeto e atenção aos detalhes'
    }
  ];

  return (
    <section id="sobre" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Sobre Mim
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Sou um profissional apaixonado por tecnologia e design, com mais de 5 anos de experiência 
              criando soluções digitais que fazem a diferença.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="animate-slide-up">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                Transformando Ideias em Realidade Digital
              </h3>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Minha jornada na tecnologia começou com a curiosidade de entender como as coisas funcionam. 
                  Hoje, essa curiosidade se transformou em expertise para criar experiências digitais que 
                  conectam pessoas e resolvem problemas reais.
                </p>
                <p>
                  Acredito que a combinação perfeita entre design elegante e código eficiente é o que 
                  diferencia um projeto bom de um projeto extraordinário. Cada linha de código e cada 
                  pixel são cuidadosamente pensados para entregar o melhor resultado.
                </p>
                <p>
                  Estou sempre aprendendo novas tecnologias e metodologias para oferecer soluções 
                  inovadoras e atualizadas com as tendências do mercado.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-slide-up">
              {skills.map((skill, index) => (
                <Card 
                  key={index} 
                  className="p-6 hover:shadow-lg hover:bg-card-hover transition-all duration-300 group border-border/50"
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <skill.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    {skill.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {skill.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;