import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Portfolio = () => {
  const projects = [
    {
      id: crypto.randomUUID(),
      title: 'E-commerce Moderno',
      description: 'Plataforma completa de e-commerce com carrinho, pagamentos e painel administrativo.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center',
      tags: ['React', 'TypeScript', 'Supabase', 'Stripe'],
      githubUrl: 'https://github.com/isaacmuaco/ecommerce-project',
      liveUrl: 'https://ecommerce-demo.isaacmuaco.dev'
    },
    {
      id: crypto.randomUUID(),
      title: 'Dashboard Analytics',
      description: 'Sistema de análise de dados em tempo real com gráficos interativos e relatórios.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
      tags: ['Next.js', 'Chart.js', 'PostgreSQL', 'API'],
      githubUrl: 'https://github.com/isaacmuaco/dashboard-project',
      liveUrl: 'https://dashboard-demo.isaacmuaco.dev'
    },
    {
      id: crypto.randomUUID(),
      title: 'App de Gestão',
      description: 'Aplicação completa para gestão de projetos e equipes com funcionalidades colaborativas.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
      tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      githubUrl: 'https://github.com/isaacmuaco/gestao-project',
      liveUrl: 'https://gestao-demo.isaacmuaco.dev'
    },
    {
      id: crypto.randomUUID(),
      title: 'Landing Page Corporativa',
      description: 'Site institucional responsivo com animações suaves e otimização SEO.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'SEO'],
      githubUrl: 'https://github.com/isaacmuaco/landing-project',
      liveUrl: 'https://landing-demo.isaacmuaco.dev'
    },
    {
      id: crypto.randomUUID(),
      title: 'Sistema de Reservas',
      description: 'Plataforma de agendamento online com calendário integrado e notificações.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&crop=center',
      tags: ['Vue.js', 'Laravel', 'MySQL', 'Calendar API'],
      githubUrl: 'https://github.com/isaacmuaco/reservas-project',
      liveUrl: 'https://reservas-demo.isaacmuaco.dev'
    },
    {
      id: crypto.randomUUID(),
      title: 'Chat em Tempo Real',
      description: 'Aplicação de mensagens instantâneas com salas privadas e compartilhamento de arquivos.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=center',
      tags: ['React', 'Socket.io', 'Express', 'File Upload'],
      githubUrl: 'https://github.com/isaacmuaco/chat-project',
      liveUrl: 'https://chat-demo.isaacmuaco.dev'
    }
  ];

  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-background-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Meu Portfólio
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Uma seleção dos meus projetos mais recentes, demonstrando diferentes tecnologias 
              e soluções criativas para desafios únicos.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.id} 
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 animate-slide-up border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs font-medium bg-primary-light text-primary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Código
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-200 text-white"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver Mais
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* More Projects CTA */}
          <div className="text-center mt-12 animate-fade-in">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 px-8 py-3"
            >
              Ver Todos os Projetos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;