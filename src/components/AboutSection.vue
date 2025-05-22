<template>
  <section id="next-section" class="next-section">
    <div class="container">
      <div class="section-header">
        <h2>¿Qué es BEBANOVA?</h2>
        <div class="section-divider">
          <span></span>
        </div>
      </div>
      <div class="next-section-content flex-row">
        <div class="next-section-image">
          <img src="/public/beba.jpg" alt="Doggo">
        </div>
        <div class="next-section-text">
          <div class="text-block">
            BEBANOVA es una empresa chilena innovadora y vanguardista que empodera a individuos y organizaciones en la era digital. Nos especializamos en soluciones tecnológicas de punta y capacitación de alta calidad en áreas clave como desarrollo digital, realidad virtual, impresión 3D e inteligencia artificial, diseñadas para ser accesibles a todos.
          </div>
          <div class="text-block">
             En BEBANOVA, no somos solo una empresa de tecnología; somos arquitectos de posibilidades y diseñadores de futuros. Inspirados en la lealtad y el espíritu de un compañero fiel que da nombre a nuestra empresa.
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="about" class="about">
    <div class="container">
      <div class="section-header">
        <h2>Pilares Estrategicos</h2>
        <div class="section-divider">
          <span></span>
        </div>
      </div>
      <div class="about-content">
        <div class="about-intro" ref="aboutIntro">

          
        </div>

        <div class="values" ref="values">
          <div class="value-item" v-for="(value, index) in values" :key="index">
            <div class="value-icon">
              <i :class="value.icon"></i>
            </div>
            <h4>{{ value.title }}</h4>
            <p>{{ value.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  
</template>

<script>
export default {
  name: 'AboutSection',
  data() {
    return {
      stats: [
        { number: '5+', label: 'Años de experiencia' },
        { number: '50+', label: 'Proyectos completados' },
        { number: '100%', label: 'Clientes satisfechos' }
      ],
      values: [
        { 
          title: 'Excelencia', 
          description: 'Buscamos la perfección en cada proyecto', 
          icon: 'fas fa-star' 
        },
        { 
          title: 'Innovación', 
          description: 'Siempre a la vanguardia tecnológica', 
          icon: 'fas fa-lightbulb' 
        },
        { 
          title: 'Compromiso', 
          description: 'Orientados al éxito de nuestros clientes', 
          icon: 'fas fa-handshake' 
        },
        { 
          title: 'Colaboración', 
          description: 'Trabajo en equipo para mejores resultados', 
          icon: 'fas fa-users' 
        }
      ]
    };
  },
  mounted() {
    // Animaciones para los elementos cuando aparecen en el viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // Si es un contador de estadísticas, animar los números
          if (entry.target.classList.contains('about-stats')) {
            this.animateStatNumbers();
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    // Observar los elementos principales
    if (this.$refs.aboutIntro) observer.observe(this.$refs.aboutIntro);
    if (this.$refs.missionVision) observer.observe(this.$refs.missionVision);
    if (this.$refs.values) observer.observe(this.$refs.values);
  },
  methods: {
    animateStatNumbers() {
      if (!this.$refs.statNumbers) return;
      
      this.$refs.statNumbers.forEach(statElement => {
        const finalValue = parseInt(statElement.textContent) || 100;
        let startValue = 0;
        const duration = 2000; // ms
        const increment = finalValue / (duration / 16); // Para aproximadamente 60fps
        
        const updateCounter = () => {
          startValue += increment;
          if (startValue < finalValue) {
            statElement.textContent = Math.ceil(startValue) + (statElement.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
          } else {
            statElement.textContent = finalValue + (statElement.textContent.includes('+') ? '+' : '');
          }
        };
        
        requestAnimationFrame(updateCounter);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  background-color: #f8fafc;
  padding: 40px 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -150px;
    right: -150px;
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, rgba(65, 105, 225, 0.05) 0%, rgba(65, 105, 225, 0.01) 100%);
    border-radius: 50%;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -100px;
    left: -100px;
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, rgba(65, 105, 225, 0.05) 0%, rgba(65, 105, 225, 0.01) 100%);
    border-radius: 50%;
    z-index: 0;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
    
    h2 {
      font-size: 2.5rem;
      color: #1a1a2e;
      margin-bottom: 20px;
      position: relative;
      display: inline-block;
    }
    
    .section-divider {
      width: 100%;
      text-align: center;
      position: relative;
      
      span {
        display: inline-block;
        width: 80px;
        height: 4px;
        background: linear-gradient(90deg, #4169e1, #80b3ff);
        border-radius: 4px;
        position: relative;
        
        &::before,
        &::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4169e1;
          top: 50%;
          transform: translateY(-50%);
        }
        
        &::before {
          left: -15px;
        }
        
        &::after {
          right: -15px;
        }
      }
    }
  }
  
  .about-content {
    position: relative;
    z-index: 1;
    
    > div {
      opacity: 0;
      transform: translateY(30px);
      
      &.animated {
        animation: fadeInUp 0.8s forwards;
      }
    }
  }
  
  .about-intro {
    display: flex;
    margin-bottom: 60px;
    align-items: center;
    gap: 40px;
    
    .about-intro-text {
      flex: 1;
      
      .lead {
        font-size: 1.8rem;
        font-weight: 600;
        line-height: 1.4;
        margin-bottom: 25px;
        color: #1a1a2e;
        
        .highlight {
          position: relative;
          color: #4169e1;
          z-index: 1;
          
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 40%;
            background-color: rgba(65, 105, 225, 0.15);
            z-index: -1;
            border-radius: 4px;
          }
        }
      }
      
      .about-description {
        font-size: 1.1rem;
        line-height: 1.8;
        color: #555;
      }
    }
    
    .about-stats {
      flex: 0 0 300px;
      display: flex;
      flex-direction: column;
      gap: 25px;
      
      .stat-item {
        background-color: white;
        padding: 10px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        text-align: center;
        transition: all 0.3s ease;
        border: 1px solid rgba(65, 105, 225, 0.1);
        position: relative;
        overflow: hidden;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(65, 105, 225, 0.05) 0%, rgba(255, 255, 255, 0) 80%);
        }
        
        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(65, 105, 225, 0.1);
          border: 1px solid rgba(65, 105, 225, 0.2);
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #4169e1;
          line-height: 1;
          margin-bottom: 8px;
        }
        
        .stat-label {
          font-size: 0.9rem;
          color: #555;
          font-weight: 500;
        }
      }
    }
  }
  
  .mission-vision {
    display: flex;
    gap: 40px;
    margin-bottom: 60px;
    
    .mission, .vision {
      flex: 1;
      background: white;
      border-radius: 20px;
      padding: 10px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      border: 1px solid rgba(65, 105, 225, 0.1);
      
      &::before {
        content: '';
        position: absolute;
        width: 200px;
        height: 200px;
        background: linear-gradient(135deg, rgba(65, 105, 225, 0.05) 0%, rgba(65, 105, 225, 0.01) 100%);
        border-radius: 50%;
        top: -100px;
        right: -100px;
      }
      
      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(65, 105, 225, 0.1);
      }
      
      .card-icon {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, rgba(65, 105, 225, 0.1) 0%, rgba(65, 105, 225, 0.2) 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
        transition: all 0.3s ease;
      }
      
      &:hover .card-icon {
        transform: scale(1.1);
        box-shadow: 0 10px 20px rgba(65, 105, 225, 0.15);
      }
      
      .card-icon i {
        font-size: 24px;
        color: #4169e1;
      }
      
      h3 {
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 20px;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #4169e1, #80b3ff);
        }
      }
      
      p {
        font-size: 1rem;
        line-height: 1.6;
        color: #555;
      }
    }
  }
  
  .values {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    
    .value-item {
      flex: 1 1 calc(25% - 30px);
      min-width: 200px;
      text-align: center;
      padding: 15px 10px;
      background: white;
      border-radius: 15px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      position: relative;
      z-index: 1;
      overflow: hidden;
      border: 1px solid rgba(65, 105, 225, 0.05);
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0;
        background: linear-gradient(to bottom, rgba(65, 105, 225, 0.05), transparent);
        transition: height 0.4s ease;
        z-index: -1;
      }
      
      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 35px rgba(65, 105, 225, 0.1);
        
        &::before {
          height: 100%;
        }
      }
      
      .value-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, rgba(65, 105, 225, 0.1) 0%, rgba(65, 105, 225, 0.2) 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 15px;
        transition: all 0.3s ease;
      }
      
      &:hover .value-icon {
        transform: scale(1.1) rotate(5deg);
        background: linear-gradient(135deg, rgba(65, 105, 225, 0.2) 0%, rgba(65, 105, 225, 0.3) 100%);
      }
      
      .value-icon i {
        font-size: 20px;
        color: #4169e1;
      }
      
      h4 {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 10px;
        color: #1a1a2e;
      }
      
      p {
        font-size: 0.9rem;
        color: #555;
      }
    }
  }
}

.next-section {
  background: #fff;
  padding: 10px 0 40px 0;
  .section-header {
    text-align: center;
    margin-bottom: 50px;
    h2 {
      font-size: 2.2rem;
      color: #1a1a2e;
      margin-bottom: 18px;
    }
    .section-divider span {
      display: inline-block;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #4169e1, #80b3ff);
      border-radius: 4px;
      position: relative;

      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #4169e1;
        top: 50%;
        transform: translateY(-50%);
      }

      &::before {
        left: -15px;
      }

      &::after {
        right: -15px;
      }
    }
  }
  .next-section-content.flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 40px;
    justify-content: center;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
  }

  // Force column direction on mobile/tablet
  @media (max-width: 900px) {
    .next-section-content.flex-row {
      flex-direction: column !important;
      align-items: center !important;
      gap: 24px !important;
      text-align: left;
      max-width: 100%;
    }
  }

  .next-section-image {
    flex: 0 0 320px;
    max-width: 320px;
    width: 75%;
    img {
      width: 100%;
      height: auto;
      border-radius: 18px;
      object-fit: cover;
      box-shadow: 0 4px 24px rgba(65, 105, 225, 0.08);
      display: block;
    }
    @media (max-width: 900px) {
      margin: 0 auto 12px auto;
      max-width: 75%;
    }
    @media (max-width: 600px) {
      max-width: 75vw;
    }
  }

  .next-section-text {
    flex: 1 1 0;
    font-size: 1.15rem;
    color: #444;
    line-height: 1.8;
    text-align: justify;
    display: flex;
    flex-direction: column;
    gap: 18px;
    .text-block {
      margin-bottom: 0;
      text-align: justify;
    }
    @media (max-width: 900px) {
      padding: 0 8px;
      gap: 14px;
    }
    @media (max-width: 600px) {
      font-size: 1rem;
      padding: 0 2vw;
      gap: 10px;
    }
  }

  @media (max-width: 900px) {
    .next-section-content.flex-row {
      flex-direction: column;
      align-items: stretch;
      gap: 24px;
    }
    .next-section-image {
      margin-bottom: 0;
      margin-top: 0;
      margin-left: auto;
      margin-right: auto;
    }
    .next-section-text {
      padding-top: 0;
    }
  }

  @media (max-width: 600px) {
    .next-section-content.flex-row {
      gap: 16px;
    }
    .next-section-image {
      max-width: 75vw; 
    }
    .next-section-text {
      font-size: 0.98rem;
      padding: 0 2vw;
    }
  }
}

@media (max-width: 992px) {
  .about-intro {
    flex-direction: column !important;
    text-align: center;
  
    .about-stats {
      flex-direction: row !important;
      flex-wrap: wrap;
      width: 100%;
      justify-content: center;
      
      .stat-item {
        flex: 1 1 calc(33.333% - 20px);
        min-width: 150px;
      }
    }
  }
  
  .mission-vision {
    flex-direction: column !important;
    gap: 30px;
    
    .mission, .vision {
      text-align: center;
      
      h3::after {
        left: 50% !important;
        transform: translateX(-50%);
      }
      
      .card-icon {
        margin: 0 auto 25px;
      }
    }
  }
}

@media (max-width: 768px) {
  .about {
    padding: 10px 0;
  }
  
  .about-intro .about-stats .stat-item {
    flex: 1 1 100%;
  }
  
  .value-item {
    flex: 1 1 calc(50% - 30px) !important;
  }
}

@media (max-width: 576px) {
  .value-item {
    flex: 1 1 100% !important;
  }
}
</style>