<template>
    <section class="services">
      <v-container>
        <h2>Nuestros Servicios</h2>
        <v-row>
          <v-col 
            v-for="(service, index) in services" 
            :key="index"
            cols="12" sm="6" lg="4"
          >
            <div 
              class="service-card" 
              :class="{ 'expanded': service.expanded, 'animated': service.animated }"
              @click="toggleService(service)"
            >
              <div class="service-header">
                <div class="icon">
                  <i :class="service.icon"></i>
                </div>
                <h3>{{ service.title }}</h3>
                <div class="toggle-icon">
                  <i class="fas fa-chevron-down"></i>
                </div>
              </div>
              <p>{{ service.description }}</p>
              <div class="service-details">
                <ul v-if="Array.isArray(service.features) && service.features[0]?.subfeatures">
                  <li 
                    v-for="(feature, featureIndex) in service.features" 
                    :key="featureIndex"
                    :style="{ '--item-index': featureIndex }"
                    class="main-feature"
                  >
                    <i class="fas fa-check"></i> {{ feature.name }}
                    <ul class="subfeatures">
                      <li 
                        v-for="(sub, subIndex) in feature.subfeatures" 
                        :key="subIndex"
                        :style="{ '--item-index': subIndex }"
                        class="sub-feature"
                      >
                        <i class="fas fa-plus"></i> {{ sub }}
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul v-else>
                  <li 
                    v-for="(feature, featureIndex) in service.features" 
                    :key="featureIndex"
                    :style="{ '--item-index': featureIndex }"
                  >
                    <i class="fas fa-check"></i> {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ServicesSection',
    data() {
      return {
        services: [
          {
            title: 'Desarrollo Web',
            icon: 'fas fa-laptop-code',
            description: 'Sitios empresariales, ecommerce y mantenimiento web optimizado.',
            features: [
              'Desarrollo de Sitios Web Empresariales',
              'Desarrollo de Sitios Web Ecommerce',
              'Mantenimiento y Actualización de Sitios Web',
              'Landing pages optimizadas',
              'Diseño UI/UX personalizado'
            ],
            expanded: false,
            animated: false
          },
          {
            title: 'Aplicaciones Móviles',
            icon: 'fas fa-mobile-alt',
            description: 'Soluciones nativas para iOS y Android con experiencia de usuario excepcional.',
            features: [
              'Desarrollo nativo iOS (Swift)',
              'Desarrollo nativo Android (Kotlin/Java)',
              'Aplicaciones híbridas (React Native, Flutter)',
              'Aplicaciones empresariales',
              'Mantenimiento y actualizaciones'
            ],
            expanded: false,
            animated: false
          },
          {
            title: 'Inteligencia Artificial',
            icon: 'fas fa-brain',
            description: 'Implementación de IA para automatización y mejora de procesos empresariales.',
            features: [
              {
                name: 'Diseño de Cursos',
                subfeatures: [
                 'Curso para todas las edades y perfiles',
                  'Curso Práctico y Lúdico con IA',
                ]
              },
              {
                name: 'Servicios Personalizados',
                subfeatures: [
                  'Chatbots Inteligentes',
              'Sistemas de Recomendación',
              'Procesamiento de Lenguaje natural',
              'Análisis Predictivo',
              'Automatización de Procesos'
                ]
              }
            ],
           
            expanded: false,
            animated: false
          },
          {
            title: 'Impresión 3D',
            icon: 'fas fa-print',
            description: 'Cursos especializados y servicios de diseño para prototipos innovadores.',
            features: [
              {
                name: 'Diseño de Cursos',
                subfeatures: [
                  'Cursos introductorios 3D',
                  'Cursos de modelado 3D',
                  'Cursos de impresión 3D avanzada'
                ]
              },
              {
                name: 'Servicios Personalizados',
                subfeatures: [
                  'Diseño de Prototipos',
                  'Impresión de piezas personalizadas',
                  'Modelado 3D',
                  'Consultoría técnica'
                ]
              }
            ],
            expanded: false,
            animated: false
          },
          {
            title: 'Realidad Virtual',
            icon: 'fas fa-vr-cardboard',
            description: 'Experiencias inmersivas y soluciones VR personalizadas para tu negocio.',
              features: [
              {
                name: 'Diseño de Cursos',
                subfeatures: [
                 'Cursos básico: Introducción a los usuarios a los conceptos básicos de la RV, el funcionamiento de los lentes y la navegación en entornos virtuales.',
                  'Tours virtuales',
              'Experiencias VR inmersivas',
              'Simulaciones de entrenamiento',
                ]
              },
            
            ],

            expanded: false,
            animated: false
          }
        ]
      }
    },
    methods: {
      toggleService(service) {
        // Close other open services
        this.services.forEach(s => {
          if (s !== service && s.expanded) {
            s.expanded = false;
          }
        });
        
        // Toggle this service
        service.expanded = !service.expanded;
        
        // Add indices to the list items for staggered animation
        if (service.expanded) {
          this.$nextTick(() => {
            const items = service.features;
            items.forEach((_, index) => {
              service.features[index].index = index;
            });
          });
        }
      }
    },
    mounted() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              const serviceIndex = parseInt(entry.target.dataset.index);
              this.services[serviceIndex].animated = true;
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      this.$nextTick(() => {
        const cards = document.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
          card.dataset.index = index;
          observer.observe(card);
        });
      });
    }
  }
  </script>
  
  <style lang="scss" scoped>
  
  .services {
    background-color: #f8fafc;
    padding: 40px 0;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      width: 600px;
      height: 600px;
      background: linear-gradient(135deg, rgba(65, 105, 225, 0.05) 0%, rgba(65, 105, 225, 0.01) 100%);
      border-radius: 50%;
      top: -200px;
      right: -200px;
      z-index: 0;
    }
    
    &::after {
      content: '';
      position: absolute;
      width: 400px;
      height: 400px;
      background: linear-gradient(135deg, rgba(65, 105, 225, 0.05) 0%, rgba(65, 105, 225, 0.01) 100%);
      border-radius: 50%;
      bottom: -150px;
      left: -150px;
      z-index: 0;
    }
    
    h2 {
      color: #1a1a2e;
      margin-bottom: 70px;
      position: relative;
      z-index: 1;
    }
  }
  
  .service-card {
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    overflow: hidden;
    position: relative;
    cursor: pointer;
    border: 1px solid rgba(65, 105, 225, 0.05);
    margin-bottom: 30px;
    height: 100%;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: linear-gradient(90deg, #4169e1, #80b3ff);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s ease;
    }
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      
      &::before {
        transform: scaleX(1);
      }
    }
    
    &.expanded::before {
      transform: scaleX(1);
    }
    
    &.animated {
      animation: fadeInService 0.8s forwards;
    }
  }
  
  
  .service-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 15px 10px;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    
    .icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, rgba(65, 105, 225, 0.1) 0%, rgba(65, 105, 225, 0.2) 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      transition: all 0.3s ease;
      
      i {
        font-size: 32px;
        color: #4169e1;
        transition: all 0.3s ease;
      }
    }
    
    h3 {
      text-align: center;
      margin-bottom: 10px;
      font-weight: 600;
      color: #1a1a2e;
      transition: all 0.3s ease;
    }
  }
  
  
  .toggle-icon {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 30px;
    height: 30px;
    background: rgba(65, 105, 225, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    i {
      color: #4169e1;
      font-size: 14px;
      transition: all 0.3s ease;
    }
  }
  
  .service-card.expanded .toggle-icon {
    background: #4169e1;
    
    i {
      color: white;
      transform: rotate(180deg);
    }
  }
  
  .service-card p {
    padding: 15px 15px;
    color: #555;
    font-size: 0.95rem;
    text-align: center;
    margin-bottom: 5px;
  }
  
  .service-details {
    max-height: 0;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 0;
    background-color: #f8fafc;
  }
  
  .service-card.expanded .service-details {
    max-height: none;      // Let it grow as needed
    height: auto;          // Let height be determined by content
    overflow: visible;     // Allow children to expand
    opacity: 1;
  }
  
  .service-details ul {
    list-style: none;
    padding: 10px 10px 10px 10px;
    margin: 0;
  }
  
  .service-details ul li {
    position: relative;
    padding: 12px 10px 12px 30px;
    margin-bottom: 8px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(10px);
    animation: fadeInUp 0.5s forwards;
    animation-delay: calc(0.1s * var(--item-index, 0));
    
    i {
      position: static;
      margin-right: 8px;
      color: #4169e1;
      font-size: 14px;
      vertical-align: middle;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &:hover {
      background-color: rgba(65, 105, 225, 0.05);
      transform: translateX(5px);
    }
  }

  .subfeatures {
    margin-top: 5px;
    margin-left: 0;
    padding-left: 18px;
    border-left: 2px solid #e0e7ef;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .sub-feature {
    background: none;
    box-shadow: none;
    color: #1a1a2e;
    font-size: 0.95em;
    padding: 6px 0 6px 18px;
    margin-bottom: 2px;
    opacity: 0.8;
    i {
      color: #b0b8d1;
      font-size: 12px;
      left: 0;
      margin-right: 6px;
      position: static;
      vertical-align: middle;
    }
    overflow-wrap: break-word;
    word-break: break-word;
  }
  </style>