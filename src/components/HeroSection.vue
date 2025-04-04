<template>
  <v-container fluid class="hero-section py-16">
    <v-row align="center">
      <v-col cols="12" md="6" class="hero-content">
        <h1 class="text-h2 font-weight-bold mb-4">
          Soluciones <span class="gradient-text">galácticas</span> personalizadas
        </h1>
        <p class="text-subtitle-1 mb-8">
          Exploramos el universo digital para transformar tus ideas en realidad con nuestro equipo experto en desarrollo web, aplicaciones móviles, impresión 3D y capacitaciones
        </p>
        <div class="d-flex flex-wrap gap-3">
          <v-btn size="large" color="accent" to="#contacto" variant="elevated" class="cosmic-btn">
            Solicitar cotización
            <v-icon end>mdi-rocket-launch</v-icon>
          </v-btn>
          <v-btn size="large" color="secondary" to="#servicios" variant="outlined" class="cosmic-btn-outline">
            Explorar servicios
            <v-icon end>mdi-telescope</v-icon>
          </v-btn>
        </div>
      </v-col>
      
      <v-col cols="12" md="6" class="hero-image">
        <v-img src="@/assets/hero-galaxy.png" max-height="500" contain class="floating-animation"></v-img>
      </v-col>
    </v-row>
    
    <!-- Estrellas animadas -->
    <div class="stars-container">
      <div v-for="n in 20" :key="`star-${n}`" 
           class="floating-star"
           :style="{
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,
             animationDelay: `${Math.random() * 5}s`
           }">
      </div>
    </div>
  </v-container>
</template>

<script setup>
// Componente de la sección hero
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.gradient-text {
  background: linear-gradient(45deg, var(--accent), var(--accent-alt));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
}

.cosmic-btn {
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(79, 195, 247, 0.5);
}

.cosmic-btn::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  z-index: -1;
  background: linear-gradient(45deg, var(--accent), var(--accent-alt));
  background-size: 400%;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cosmic-btn:hover::before {
  opacity: 1;
  animation: cosmic-glow 3s infinite;
}

.cosmic-btn-outline {
  border: 2px solid var(--secondary);
  transition: all 0.3s ease;
}

.cosmic-btn-outline:hover {
  box-shadow: 0 0 15px rgba(94, 53, 177, 0.7);
}

.floating-animation {
  animation: floating 6s ease-in-out infinite;
}

@keyframes floating {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes cosmic-glow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.stars-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.floating-star {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.7;
  animation: twinkle 3s infinite ease-in-out;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 0.9; transform: scale(1.2); }
}
</style>