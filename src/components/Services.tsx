import { 
  Code2, 
  Smartphone, 
  Palette, 
  Search, 
  ShoppingCart, 
  BarChart,
  Rocket,
  HeadphonesIcon
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: Code2,
      title: 'Desenvolvimento Web',
      description: 'Sites e aplicações web modernas com React, Next.js e as mais recentes tecnologias do mercado.',
      features: ['Frontend Responsivo', 'Backend Robusto', 'APIs REST/GraphQL', 'Banco de Dados']
    },
    {
      icon: Smartphone,
      title: 'Aplicativos Mobile',
      description: 'Apps nativos e híbridos para iOS e Android com performance excepcional e UX intuitiva.',
      features: ['React Native', 'Flutter', 'App Store Deploy', 'Push Notifications']
    },
    {
      icon: Palette,
      title: 'Design UI/UX',
      description: 'Interfaces elegantes e experiências de usuário que convertem visitantes em clientes.',
      features: ['Prototipagem', 'Design System', 'Wireframing', 'User Research']
    },
    {
      icon: Search,
      title: 'SEO & Performance',
      description: 'Otimização para motores de busca e performance superior para melhor ranking.',
      features: ['SEO Técnico', 'Page Speed', 'Core Web Vitals', 'Analytics']
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce',
      description: 'Lojas virtuais completas com sistema de pagamentos, gestão de produtos e relatórios.',
      features: ['Shopify/WooCommerce', 'Gateway Pagamento', 'Gestão Estoque', 'Relatórios']
    },
    {
      icon: BarChart,
      title: 'Business Intelligence',
      description: 'Dashboards e relatórios inteligentes para tomada de decisões baseada em dados.',
      features: ['Dashboards Interativos', 'Data Analysis', 'Automação', 'KPIs']
    },
    {
      icon: Rocket,
      title: 'MVP Development',
      description: 'Desenvolvimento rápido de produtos mínimos viáveis para validação de ideias.',
      features: ['Prototipagem Rápida', 'Validação Mercado', 'Iteração Ágil', 'Launch Strategy']
    },
    {
      icon: HeadphonesIcon,
      title: 'Consultoria Tech',
      description: 'Consultoria especializada em arquitetura, tecnologias e estratégias digitais.',
      features: ['Code Review', 'Arquitetura', 'Tech Stack', 'Mentoria']
    }
  ];

  return (
    <section id="servicos" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Meus Serviços
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ofereço soluções completas e personalizadas para transformar suas ideias em 
              produtos digitais de sucesso.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-xl hover:bg-card-hover transition-all duration-300 group border-border/50 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Service Icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Service Content */}
                <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Service Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="text-xs text-muted-foreground flex items-center"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 animate-fade-in">
            <div className="bg-gradient-light rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Vamos Criar Algo Incrível Juntos?
              </h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Entre em contato e vamos discutir como posso ajudar a transformar sua ideia em realidade.
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById('contato');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-glow transition-all duration-300"
              >
                Solicitar Orçamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;