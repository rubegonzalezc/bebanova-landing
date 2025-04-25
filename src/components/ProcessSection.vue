<template>
    <section class="process">
      <v-container>
        <h2>Nuestro Proceso</h2>
        
        <div class="timeline">
          <div 
            v-for="(step, index) in processSteps" 
            :key="index"
            class="step"
            :class="{ 'animated': step.animated }"
            :data-step="step.number"
          >
            <div class="step-icon">
              <i :class="step.icon"></i>
            </div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </v-container>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ProcessSection',
    data() {
      return {
        processSteps: [
          {
            number: '01',
            title: 'Planificación',
            description: 'Análisis de necesidades y definición de objetivos claros para tu proyecto',
            icon: 'fas fa-lightbulb',
            animated: false
          },
          {
            number: '02',
            title: 'Diseño',
            description: 'Prototipos y maquetación enfocada en experiencia de usuario',
            icon: 'fas fa-pencil-ruler',
            animated: false
          },
          {
            number: '03',
            title: 'Desarrollo',
            description: 'Programación con tecnologías de vanguardia y código limpio',
            icon: 'fas fa-code',
            animated: false
          },
          {
            number: '04',
            title: 'Testeo',
            description: 'Control de calidad exhaustivo y optimización de rendimiento',
            icon: 'fas fa-vial',
            animated: false
          },
          {
            number: '05',
            title: 'Entrega',
            description: 'Implementación final y soporte continuo garantizado',
            icon: 'fas fa-rocket',
            animated: false
          }
        ]
      }
    },
    mounted() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              const stepIndex = parseInt(entry.target.dataset.index);
              this.processSteps[stepIndex].animated = true;
            }, index * 200);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      
      this.$nextTick(() => {
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
          step.dataset.index = index;
          observer.observe(step);
        });
      });
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .process {
    background-color: #ffffff;
    padding: 120px 0;
    position: relative;
    overflow: hidden;
    
    &::before {
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
    
    &::after {
      content: '';
      position: absolute;
      bottom: -100px;
      right: -100px;
      width: 300px;
      height: 300px;
      background: linear-gradient(135deg, rgba(65, 105, 225, 0.05) 0%, rgba(65, 105, 225, 0.01) 100%);
      border-radius: 50%;
      z-index: 0;
    }
    
    h2 {
      margin-bottom: 80px;
    }
  }
  
  .timeline {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 50px;
    z-index: 10;
    
    &::before {
      content: '';
      position: absolute;
      width: 85%;
      height: 3px;
      background: linear-gradient(90deg, rgba(65, 105, 225, 0.3) 0%, #4169e1 50%, rgba(65, 105, 225, 0.3) 100%);
      top: 40px;
      left: 7.5%;
      z-index: 1;
      border-radius: 3px;
    }
  }
  
  .step {
    flex: 1;
    text-align: center;
    padding: 0 15px;
    position: relative;
    z-index: 2;
    transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    opacity: 0;
    transform: translateY(30px);
    
    &.animated {
      animation: fadeInStep 0.8s forwards;
    }
    
    &:hover {
      transform: translateY(-10px);
    }
    
    &::before {
      content: '';
      position: absolute;
      width: 3px;
      height: 25px;
      background-color: #4169e1;
      top: 43px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      transition: opacity 0.4s ease, height 0.4s ease;
      z-index: 1;
    }
    
    &:hover::before {
      opacity: 1;
      height: 35px;
    }
    
    &::after {
      content: attr(data-step);
      position: absolute;
      top: -20px;
      right: 20%;
      background: linear-gradient(135deg, #4169e1 0%, #80b3ff 100%);
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-shadow: 0 3px 10px rgba(65, 105, 225, 0.3);
    }
    
    &:hover::after {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .step-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #ffffff 0%, #f5f7ff 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 25px;
    box-shadow: 0 10px 25px rgba(65, 105, 225, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.8);
    position: relative;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    z-index: 2;
    
    i {
      font-size: 30px;
      color: #4169e1;
      transition: all 0.4s ease;
    }
  }
  
  .step:hover .step-icon {
    box-shadow: 0 15px 35px rgba(65, 105, 225, 0.25);
    transform: scale(1.05);
    background: linear-gradient(135deg, #ffffff 0%, #e6edff 100%);
    border-color: #4169e1;
    
    i {
      transform: scale(1.1);
    }
  }
  
  .step h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 12px;
    color: #1a1a2e;
    transition: all 0.3s ease;
  }
  
  .step:hover h3 {
    color: #4169e1;
  }
  
  .step p {
    color: #555;
    font-size: 0.95rem;
    line-height: 1.6;
    padding: 0 10px;
  }
  
  @media (max-width: 960px) {
    .timeline {
      flex-direction: column;
      padding: 0 15px;
      
      &::before {
        width: 3px;
        height: 85%;
        left: 40px;
        top: 7.5%;
      }
    }
    
    .step {
      display: flex;
      align-items: center;
      margin-bottom: 50px;
      text-align: left;
      padding: 0 0 0 65px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      &::before {
        top: 50%;
        left: 40px;
        transform: translateY(-50%);
        width: 25px;
        height: 3px;
      }
      
      &:hover::before {
        width: 35px;
        height: 3px;
      }
      
      &::after {
        top: 50%;
        right: auto;
        left: 0;
        transform: translateY(-50%) scale(0.5);
      }
      
      &:hover::after {
        transform: translateY(-50%) scale(1);
      }
      
      &:hover {
        transform: translateX(10px);
      }
    }
    
    .step-icon {
      width: 60px;
      height: 60px;
      margin: 0 20px 0 0;
      
      i {
        font-size: 22px;
      }
    }
  }
  </style>