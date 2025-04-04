<template>
  <v-container id="mision-vision" class="mission-vision-section py-16">
    <div class="section-heading">
      <h2>Nuestra <span class="accent">Identidad</span></h2>
      <p class="text-subtitle-1">Conoce los valores que guían nuestro viaje a través del cosmos digital</p>
    </div>
    
    <v-row class="galaxy-cards">
      <v-col cols="12" md="6">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              v-bind="props"
              class="mission-card cosmic-card"
              :class="{ 'on-hover': isHovering }"
            >
              <div class="cosmic-planet mission-planet"></div>
              <v-card-title class="text-h4 font-weight-bold">
                Misión
              </v-card-title>
              <v-card-text class="text-body-1">
                <p>Transformar ideas innovadoras en soluciones tecnológicas de vanguardia que impulsen el crecimiento y éxito de nuestros clientes en el universo digital.</p>
                <p class="mt-4">Nos comprometemos a crear experiencias digitales excepcionales combinando creatividad, tecnología y atención personalizada en cada proyecto.</p>
              </v-card-text>
              <div class="cosmic-stars"></div>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      
      <v-col cols="12" md="6">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              v-bind="props"
              class="vision-card cosmic-card"
              :class="{ 'on-hover': isHovering }"
            >
              <div class="cosmic-planet vision-planet"></div>
              <v-card-title class="text-h4 font-weight-bold">
                Visión
              </v-card-title>
              <v-card-text class="text-body-1">
                <p>Ser una empresa líder en innovación tecnológica reconocida por crear soluciones que trasciendan fronteras y transformen positivamente la forma en que las personas interactúan con la tecnología.</p>
                <p class="mt-4">Aspiramos a expandir nuestro horizonte de conocimientos y capacidades para navegar junto a nuestros clientes hacia nuevas galaxias de posibilidades digitales.</p>
              </v-card-text>
              <div class="cosmic-stars"></div>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
    
    <v-row class="mt-16">
      <v-col cols="12" class="text-center">
        <div class="values-container">
          <h3 class="text-h5 mb-8">Nuestros Valores Estelares</h3>
          
          <v-row justify="center">
            <v-col 
              v-for="(value, index) in values" 
              :key="index" 
              cols="6" sm="4" md="2"
            >
              <div class="value-item">
                <v-avatar 
                  size="64" 
                  class="value-icon mb-2"
                  :style="{ background: `linear-gradient(45deg, ${value.colorStart}, ${value.colorEnd})` }"
                >
                  <v-icon :icon="value.icon" size="large" color="white"></v-icon>
                </v-avatar>
                <h4 class="text-subtitle-1 font-weight-bold">{{ value.title }}</h4>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const values = [
  { 
    title: 'Innovación', 
    icon: 'mdi-lightbulb', 
    colorStart: '#4FC3F7', 
    colorEnd: '#2196F3' 
  },
  { 
    title: 'Excelencia', 
    icon: 'mdi-star', 
    colorStart: '#FF4081', 
    colorEnd: '#C51162' 
  },
  { 
    title: 'Integridad', 
    icon: 'mdi-shield', 
    colorStart: '#5E35B1', 
    colorEnd: '#3F1DCB' 
  },
  { 
    title: 'Colaboración', 
    icon: 'mdi-handshake', 
    colorStart: '#81C784', 
    colorEnd: '#388E3C' 
  },
  { 
    title: 'Adaptabilidad', 
    icon: 'mdi-refresh', 
    colorStart: '#FFB74D', 
    colorEnd: '#FF9800' 
  },
  { 
    title: 'Pasión', 
    icon: 'mdi-heart', 
    colorStart: '#FF5252', 
    colorEnd: '#D32F2F' 
  }
]
</script>

<style>
.mission-vision-section {
  position: relative;
  overflow: hidden;
}

.cosmic-card {
  background: rgba(11, 29, 81, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  height: 100%;
  padding: 20px;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.cosmic-card.on-hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(79, 195, 247, 0.4);
}

.cosmic-planet {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  opacity: 0.2;
  filter: blur(3px);
  z-index: 0;
}

.mission-planet {
  top: -30px;
  right: -30px;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
}

.vision-planet {
  bottom: -30px;
  left: -30px;
  background: radial-gradient(circle, var(--secondary) 0%, transparent 70%);
}

.cosmic-stars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(1px 1px at 10px 10px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
    radial-gradient(1px 1px at 40px 60px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
    radial-gradient(1.5px 1.5px at 90px 40px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 100px 100px;
  opacity: 0.1;
  z-index: 0;
}

.value-icon {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.value-item:hover .value-icon {
  transform: scale(1.1) rotate(5deg);
}

.values-container {
  background: rgba(1, 10, 38, 0.4);
  border-radius: 24px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
</style>