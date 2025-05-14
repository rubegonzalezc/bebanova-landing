<template>
    <section class="cta">
      <div class="pattern-bg"></div>
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="7">
            <div class="cta-content">
              <h1>Soluciones <span class="gradient-text-hero">galácticas</span> personalizadas</h1>
              <p>Desde aplicaciones web hasta experiencias de realidad virtual, creamos tecnología que impulsa el futuro de tu empresa.</p>
              
              <div class="cta-actions">
                <v-btn
                  class="btn-primary"
                  href="#contact"
                  size="large"
                  rounded="pill"
                  elevation="3"
                >
                  SOLICITAR COTIZACIÓN
                </v-btn>
                
                <v-btn
                  class="btn-secondary"
                  href="#services"
                  size="large"
                  rounded="pill"
                  variant="outlined"
                >
                  EXPLORAR SERVICIOS
                </v-btn>
              </div>
            </div>
          </v-col>
          
          <v-col cols="12" md="5" style="overflow: visible !important;">
            <div class="cta-image">
              <div class="image-wrapper">
                <div
                  v-if="textModel.length > 0"
                  class="model-info-dialog"
                >
                  {{ textModel[currentModelIndex] }}
                </div>
                <ModelViewer
                  :modelSources="[`/3D/source/logo.glb`,`/3D/source/quest3.glb`,`/3D/source/brain.glb`,`/3D/source/ender3.glb`,`/3D/source/text.glb`]"
                  :previewImg="[`/logo3D.png`,`/quest3.png`,`/AI.png`,`/ender3.png`,`/code.png`]"
                  :textModel="textModel"
                  :enableScreenshot="false"
                  :modelDefaultSize="20"
                  class="model-viewer-masked"
                  @modelIndexChanged="handleModelIndexChanged"
                />
                <img src="/public/hero-galaxy.png" alt="galaxia" class="main-image">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </template>
  
  <script>
  import ModelViewer from '../components/ModelViewer.vue'
  export default {
    name: 'HeroSection',
    components: {
      ModelViewer
    },
    data() {
      return {
        currentModelIndex: 0,
        textModel: [
          '!Bienvenido a Bebanova! ',
          'Capacitaciones Realidad Virtual',
          'Capacitaciones Inteligencia Artificial',
          'Capacitaciones Impresión 3D',
          'Apoyo en Programación'
        ]
      }
    },
    methods: {
      handleModelIndexChanged(index) {
        this.currentModelIndex = index;
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
    overflow: visible;
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
  
  .cta-content {
  }
  
  h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 25px;
    letter-spacing: -0.5px;
  }
  
  .gradient-text-hero {
    background: linear-gradient(135deg, #80b3ff, #4fc3f7, #a98eff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline;
  }
  
  .cta-content p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 35px;
    max-width: 550px;
  }
  
  .cta-actions {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .model-viewer-masked {
    z-index: 10;
    -webkit-mask-image: radial-gradient(circle, rgba(65, 105, 225, 1) 70%, rgba(0, 0, 0, 0) 90%);
    mask-image: radial-gradient(circle, rgba(65, 105, 225, 1) 70%, rgba(0, 0, 0, 0) 90%);
    -webkit-mask-size: cover;
    mask-size: cover;
    opacity: 1;
    max-height: 70%;
    max-width: 100%;
    top: 10%;
  }
  
  .main-image {
    width: 100%;
    height: 100%;
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
    max-width: auto;
    max-height: auto;
    overflow: visible;
  }
  
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
  
  .btn-primary {
    background: linear-gradient(135deg, #4169e1 0%, #80b3ff 100%) !important;
  }
  
  .btn-secondary {
    background: rgba(255, 255, 255, 0.1) !important;
    color: white !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
  }

  .model-info-dialog {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 12px 18px;
    border-radius: 8px;
    font-size: 1.1em;
    pointer-events: auto;
    text-align: center;
    max-width: 90%;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: normal;
    z-index: 100;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
  }
  
  @media (max-width: 960px) {
    .cta {
      padding: 120px 0 60px;
      text-align: center;
    }
    
    .cta-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h1 {
      font-size: 2.5rem;
    }
    
    .cta-content p {
      font-size: 1rem;
      max-width: 90%;
    }
    
    .cta-actions {
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    
    .btn-primary, .btn-secondary {
      margin-bottom: 15px;
      width: 100%;
      max-width: 300px;
    }

    .image-wrapper {
      margin-top: 40px;
    }
    
    .model-info-dialog {
      font-size: 1em;
      padding: 10px 15px;
    }
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 2rem;
    }
    .cta-content p {
      font-size: 0.9rem;
    }
    .model-info-dialog {
      font-size: 0.9em;
      padding: 8px 12px;
      top: 75%;
    }
  }
  </style>