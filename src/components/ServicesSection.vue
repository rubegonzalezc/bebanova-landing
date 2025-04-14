<template>
  <v-container id="servicios" class="services-section py-16">
    <div class="section-heading" v-intersect="onIntersect">
      <h2>Nuestros <span class="accent">Servicios</span></h2>
      <p class="text-subtitle-1">Soluciones tecnológicas cósmicas adaptadas a tus necesidades específicas</p>
    </div>
    
    <v-row>
      <v-col 
        v-for="(service, index) in services" 
        :key="service.title"
        cols="12" 
        md="6" 
        lg="3"
        class="service-card-wrapper"
      >
        <v-card 
          class="service-card" 
          :class="{'show': isVisible || forceShow}"
          :style="{ transitionDelay: `${index * 0.1}s` }" 
          variant="elevated"
          height="100%"
        >
          <div class="service-icon-container">
            <div class="icon-wrapper">
              <v-icon size="36" :icon="service.icon" color="white"></v-icon>
            </div>
          </div>
          
          <v-card-title class="text-center">{{ service.title }}</v-card-title>
          
          <v-card-text>
            <p>{{ service.description }}</p>
            <v-list density="compact" class="bg-transparent">
              <v-list-item 
                v-for="(item, i) in service.items" 
                :key="i"
                :title="item"
                prepend-icon="mdi-star-shooting"
                class="service-list-item"
              ></v-list-item>
            </v-list>
          </v-card-text>
          
          <v-card-actions class="justify-center pb-4">
            <v-btn variant="text" color="accent" to="#contacto" class="cosmic-btn-sm">
              Más información
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const visibleCount = ref(0)
const forceShow = ref(false)

const services = [
  {
    title: 'Desarrollo Web',
    icon: 'mdi-code-tags',
    description: 'Sitios y aplicaciones web a medida, responsivos y optimizados para todos los dispositivos.',
    items: ['Landing Pages', 'E-commerce', 'Sistemas a medida']
  },
  {
    title: 'Aplicaciones Móviles',
    icon: 'mdi-cellphone',
    description: 'Apps nativas y multiplataforma que brindan experiencias excepcionales a tus usuarios.',
    items: ['iOS y Android', 'React Native', 'Flutter']
  },
  {
    title: 'Impresión 3D',
    icon: 'mdi-printer-3d',
    description: 'Prototipado rápido y fabricación de productos personalizados con tecnología de última generación.',
    items: ['Modelado 3D', 'Prototipos funcionales', 'Pequeños lotes de producción']
  },
  {
    title: 'Capacitaciones',
    icon: 'mdi-school',
    description: 'Formación técnica especializada para equipos y profesionales que buscan mejorar sus habilidades.',
    items: ['Inteligencia Artificial', 'Diseño 3D', 'Realidad Virtual']
  }
]

const onIntersect = (entries) => {
  if (entries[0].isIntersecting) {
    isVisible.value = true
    
    // Animación secuencial para mostrar cada tarjeta
    const interval = setInterval(() => {
      if (visibleCount.value < services.length) {
        visibleCount.value++
      } else {
        clearInterval(interval)
      }
    }, 100)
  }
}

// Asegurar que se muestren las tarjetas incluso si v-intersect falla
onMounted(() => {
  // Pequeño retraso para dar tiempo a la página a renderizarse
  setTimeout(() => {
    forceShow.value = true
  }, 1000)
})
</script>

<style scoped>
.services-section {
  position: relative;
  z-index: 1;
}

.service-card {
  background: rgba(11, 29, 81, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  transform: translateY(50px);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  color: #E1E5F2; /* Color claro para el texto */
  overflow: hidden;
  position: relative;
}

.service-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom, rgba(79, 195, 247, 0.05), transparent);
  pointer-events: none;
}

.service-card.show {
  transform: translateY(0);
  opacity: 1;
}

.service-card .v-card-title {
  color: #E1E5F2; /* Color claro para títulos */
}

.service-card .v-card-text {
  color: rgba(225, 229, 242, 0.9); /* Color claro con ligera transparencia */
}

.service-card .v-card-text p {
  color: rgba(225, 229, 242, 0.9); /* Específico para párrafos */
  margin-bottom: 16px;
}

.service-icon-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent), var(--accent-alt));
  border-radius: 50%;
  box-shadow: 0 0 25px rgba(79, 195, 247, 0.5);
  position: relative;
  overflow: visible;
}

.icon-wrapper::after {
  content: "";
  position: absolute;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 1px solid rgba(79, 195, 247, 0.3);
  animation: pulse-ring 2s infinite;
  pointer-events: none;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.4;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

.service-list-item {
  opacity: 0.9;
  color: rgba(225, 229, 242, 0.8) !important; /* Colores claros para los ítems de la lista */
}

.service-list-item .v-icon {
  color: var(--accent) !important; /* Forzar el color del ícono */
  font-size: 16px;
  margin-right: 8px;
}

/* Asegurar que los íconos y el texto en los ítems de la lista tengan el color correcto */
.v-list-item__content {
  color: rgba(225, 229, 242, 0.8) !important;
}

.v-list-item__title {
  color: rgba(225, 229, 242, 0.8) !important;
}

.service-card-wrapper {
  padding: 12px;
}

/* Corregir problemas en listas de Vuetify */
.bg-transparent {
  background-color: transparent !important;
}

.v-list.bg-transparent .v-list-item {
  background-color: transparent !important;
}

.cosmic-btn-sm {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.cosmic-btn-sm::before {
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

.cosmic-btn-sm:hover {
  transform: translateY(-2px);
}

.cosmic-btn-sm:hover::before {
  opacity: 0.3;
  animation: cosmic-glow 3s infinite;
}

@keyframes cosmic-glow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Mejorar la visualización en dispositivos móviles */
@media (max-width: 600px) {
  .service-card {
    max-width: 90%;
    margin: 0 auto;
  }
}
</style>