<template>
    <section class="cta">
      <div class="pattern-bg"></div>
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="7">
            <div class="cta-content">
              <div class="cta-badge">Innovación Tecnológica</div>
              <h1>Transforma tu <span class="highlight">negocio</span> con soluciones digitales de vanguardia</h1>
              <p>Desde aplicaciones web hasta experiencias de realidad virtual, creamos tecnología que impulsa el futuro de tu empresa</p>
              
              <div class="cta-actions">
                <v-btn
                  class="btn-primary"
                  href="#contact"
                  size="large"
                  rounded="pill"
                  elevation="3"
                >
                  Solicita una consulta gratuita
                </v-btn>
                
                <v-btn
                  class="btn-secondary"
                  href="#services"
                  size="large"
                  rounded="pill"
                  variant="outlined"
                >
                  Explorar servicios
                </v-btn>
              </div>
              
              <div class="cta-features">
                <div class="feature" v-for="(feature, index) in features" :key="index">
                  <i class="fas fa-check-circle"></i>
                  <span>{{ feature }}</span>
                </div>
              </div>
            </div>
          </v-col>
          
          <v-col cols="12" md="5" class="d-none d-md-block">
            <div class="cta-image">
              <div class="image-wrapper">
                <img src="@/assets/img/logo.png" alt="Bebanova Logo" class="main-image">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="tech-badge tech-badge-1">
                  <i class="fas fa-mobile-alt"></i>
                </div>
                <div class="tech-badge tech-badge-2">
                  <i class="fas fa-vr-cardboard"></i>
                </div>
                <div class="tech-badge tech-badge-3">
                  <i class="fas fa-code"></i>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </template>
  
  <script>
  export default {
    name: 'HeroSection',
    data() {
      return {
        features: [
          'Proyectos 100% personalizados',
          'Tecnología de última generación',
          'Soporte continuo garantizado'
        ]
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .cta {
    background: linear-gradient(135deg, #1a1a2e 0%, #000f2e 100%);
    color: white;
    padding: 160px 0 100px;
    position: relative;
    overflow: hidden;
  }
  
  .pattern-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
  }
  
  // Estilos para cta-content, cta-badge, highlight, cta-actions, etc.
  
  .cta-badge {
    display: inline-block;
    background: rgba(65, 105, 225, 0.2);
    color: #80b3ff;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 8px 15px;
    border-radius: 30px;
    margin-bottom: 25px;
    border: 1px solid rgba(65, 105, 225, 0.3);
  }
  
  h1 {
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 25px;
    letter-spacing: -0.5px;
  }
  
  .highlight {
    position: relative;
    color: #80b3ff;
    z-index: 1;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 5px;
      left: 0;
      width: 100%;
      height: 8px;
      background-color: rgba(65, 105, 225, 0.3);
      z-index: -1;
      border-radius: 10px;
    }
  }
  
  // Resto de estilos para cta-content, cta-features, image-wrapper, etc.
  
  .cta-features {
    display: flex;
    flex-wrap: wrap;
    gap: 20px 30px;
    margin-top: 30px;
  }
  
  .feature {
    display: flex;
    align-items: center;
    font-size: 1rem;
    
    i {
      color: #80b3ff;
      margin-right: 10px;
      font-size: 18px;
    }
  }
  
  // Estilos para la imagen y animaciones
  
  .main-image {
    width: 350px;
    height: auto;
    position: relative;
    z-index: 5;
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4));
    animation: float 6s ease-in-out infinite;
  }
  
  .image-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  // Resto de los estilos para shapes y tech-badges
  .shape {
    position: absolute;
    border-radius: 50%;
    opacity: 0.6;
    z-index: 1;
  }
  
  .shape-1 {
    width: 300px;
    height: 300px;
    background: linear-gradient(45deg, #4169e1, #6a8dff);
    filter: blur(50px);
    animation: rotate 15s linear infinite;
  }
  
  .shape-2 {
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, #001f61, #003bb2);
    top: 20%;
    right: 10%;
    filter: blur(40px);
    animation: rotate 12s linear infinite reverse;
  }
  
  .tech-badge {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 10;
    animation: pulse 3s infinite;
    
    i {
      color: #4169e1;
      font-size: 24px;
    }
  }
  
  .tech-badge-1 {
    top: 20%;
    left: 0;
    animation-delay: 0.5s;
  }
  
  .tech-badge-2 {
    bottom: 15%;
    left: 15%;
    animation-delay: 1s;
  }
  
  .tech-badge-3 {
    top: 30%;
    right: 5%;
    animation-delay: 1.5s;
  }
  
  // Estilos para botones
  .btn-primary {
    background: linear-gradient(135deg, #4169e1 0%, #80b3ff 100%) !important;
    margin-right: 15px;
  }
  
  .btn-secondary {
    background: rgba(255, 255, 255, 0.1) !important;
    color: white !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
  }
  
  // Responsive styles
  @media (max-width: 960px) {
    .cta {
      padding: 140px 0 80px;
    }
    
    h1 {
      font-size: 2.3rem;
    }
    
    .cta-content p {
      font-size: 1.1rem;
    }
    
    .cta-actions {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .btn-primary, .btn-secondary {
      margin-bottom: 15px;
    }
  }
  </style>