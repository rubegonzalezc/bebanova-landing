<template>
  <v-container class="testimonials-section py-16">
    <div class="cosmic-stars-bg"></div>
    
    <div class="section-heading mb-16">
      <h2>Lo que dicen nuestros <span class="gradient-text">Clientes</span></h2>
      <p class="text-subtitle-1">La satisfacción de nuestros viajeros estelares es nuestra mejor carta de navegación</p>
    </div>
    
    <v-row class="justify-center testimonial-row">
      <v-col cols="12" md="10" lg="9" class="position-relative">
        <v-carousel
          v-model="currentSlide"
          height="auto"
          hide-delimiters
          :show-arrows="false"
          interval="6000"
          cycle
          class="testimonial-carousel"
        >
          <v-carousel-item
            v-for="(testimonial, i) in testimonials"
            :key="i"
            class="pb-12 carousel-item-wrapper"
          >
            <v-card class="testimonial-card mx-auto">
              <div class="cosmic-planet testimonial-planet"></div>
              
              <div class="testimonial-quote">
                <v-icon icon="mdi-format-quote-open" size="large" color="white" class="quote-icon"></v-icon>
              </div>
              
              <v-card-text class="text-body-1 testimonial-content">
                {{ testimonial.content }}
              </v-card-text>
              
              <v-divider class="mx-auto my-4 cosmic-divider" width="120"></v-divider>
              
              <div class="testimonial-author d-flex align-center pa-4">
                <v-avatar class="mr-4 cosmic-avatar" size="70">
                  <v-img :src="testimonial.avatar" cover></v-img>
                  <div class="avatar-glow"></div>
                </v-avatar>
                <div>
                  <div class="text-subtitle-1 font-weight-bold gradient-text">{{ testimonial.name }}</div>
                  <div class="text-caption">{{ testimonial.position }}</div>
                </div>
              </div>
            </v-card>
          </v-carousel-item>
        </v-carousel>
        
        <div class="text-center mt-6 carousel-controls">
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            color="accent"
            @click="prevSlide"
            class="mr-2 nav-btn"
            size="large"
          ></v-btn>
          
          <div class="d-inline-block">
            <v-btn
              v-for="(dot, i) in testimonials.length"
              :key="i"
              icon
              :color="currentSlide === i ? 'accent' : 'grey'"
              size="small"
              @click="currentSlide = i"
              class="mx-1 dot-btn"
              :class="{'active-dot': currentSlide === i}"
            >
              <v-icon :icon="currentSlide === i ? 'mdi-star' : 'mdi-star-outline'" size="small"></v-icon>
            </v-btn>
          </div>
          
          <v-btn
            icon="mdi-chevron-right"
            variant="text"
            color="accent"
            @click="nextSlide"
            class="ml-2 nav-btn"
            size="large"
          ></v-btn>
        </div>
      </v-col>
    </v-row>
    
    <div class="star-field">
      <div v-for="n in 50" :key="n" class="star" :style="randomStarPosition()"></div>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const currentSlide = ref(0)

const testimonials = [
  {
    name: 'María Rodríguez',
    position: 'CEO, InnovaTech',
    content: 'GalaxTech transformó nuestra idea en una aplicación web excepcional. Su enfoque profesional y atención al detalle superaron nuestras expectativas. El equipo estuvo presente en cada paso del proceso, asegurando que nuestra visión se convirtiera en realidad.',
    avatar: 'https://randomuser.me/api/portraits/women/41.jpg'
  },
  {
    name: 'Carlos Méndez',
    position: 'Director de Producto, FutureDesign',
    content: 'Los prototipos 3D que desarrollaron para nuestro producto fueron exactamente lo que necesitábamos. El proceso fue rápido y los resultados excelentes. Su experiencia en modelado 3D nos permitió iterar rápidamente y lanzar nuestro producto antes de lo previsto.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Ana Gómez',
    position: 'Gerente de RRHH, TechStart',
    content: 'La capacitación que recibió nuestro equipo fue fundamental para mejorar nuestros procesos internos. Profesionales de primera línea con gran experiencia. El programa personalizado se adaptó perfectamente a nuestras necesidades y el seguimiento posterior aseguró que aplicáramos los conocimientos adquiridos.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % testimonials.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + testimonials.length) % testimonials.length
}

const randomStarPosition = () => {
  return {
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 3 + 2}s`,
    animationDelay: `${Math.random() * 5}s`
  }
}
</script>

<style scoped>
.testimonials-section {
  position: relative;
  overflow: hidden;
  padding-bottom: 80px; /* Aumentado para evitar que los controles choquen */
}

.cosmic-stars-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(1px 1px at 10px 10px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
    radial-gradient(1px 1px at 40px 60px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
    radial-gradient(1.5px 1.5px at 90px 40px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 100px 100px;
  opacity: 0.1;
  z-index: 0;
}

.gradient-text {
  background: linear-gradient(45deg, var(--accent), var(--accent-alt));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
}

.section-heading {
  position: relative;
  z-index: 2;
  margin-bottom: 100px !important; /* Aumentar este espacio */
}

.testimonial-row {
  position: relative;
  z-index: 1;
  margin-top: 40px; /* Agregado para dar más espacio */
}

.position-relative {
  position: relative;
}

.carousel-item-wrapper {
  padding-top: 40px; /* Agregado para dar espacio a las comillas */
  overflow: visible;
}

.testimonial-carousel {
  overflow: visible;
  padding-top: 30px; /* Espacio extra para las comillas */
}

.testimonial-card {
  background: rgba(11, 29, 81, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 50px 30px 40px;
  max-width: 850px;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(79, 195, 247, 0.2);
  transition: transform 0.5s ease, opacity 0.5s ease, box-shadow 0.5s ease;
  animation: floatCard 8s ease-in-out infinite;
  overflow: visible;
  margin-top: 20px; /* Espacio adicional en la parte superior */
}

.testimonial-card:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(79, 195, 247, 0.4);
}

.testimonial-planet {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  opacity: 0.08;
  filter: blur(5px);
  z-index: 0;
  top: -150px;
  right: -150px;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
}

@keyframes floatCard {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.testimonial-quote {
  position: absolute;
  top: -35px; /* Ajustado hacia arriba un poco más */
  left: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, var(--accent), var(--accent-alt));
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(79, 195, 247, 0.5);
  animation: pulsateQuote 3s infinite ease-in-out;
  z-index: 10; /* Aumentado para asegurar que esté sobre todo */
}

@keyframes pulsateQuote {
  0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(79, 195, 247, 0.5); }
  50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(79, 195, 247, 0.7); }
}

.quote-icon {
  margin-top: -3px;
}

.testimonial-content {
  font-size: 1.1rem;
  line-height: 1.7;
  font-style: italic;
  margin-top: 10px; /* Reducido el margen superior ya que aumentamos el padding */
  min-height: 150px;
  color: rgba(225, 229, 242, 0.95);
  position: relative;
  z-index: 1;
  padding: 0 10px;
}

.cosmic-divider {
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  height: 1px;
  opacity: 0.5;
}

.testimonial-author {
  padding: 10px 20px;
  position: relative;
  z-index: 1;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  margin-top: 10px;
}

.cosmic-avatar {
  position: relative;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
  overflow: visible;
  border: 2px solid transparent;
  background: linear-gradient(45deg, var(--accent), var(--accent-alt)) border-box;
  -webkit-mask: 
     linear-gradient(#fff 0 0) padding-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
}

.avatar-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(79, 195, 247, 0.5) 0%, transparent 70%);
  filter: blur(8px);
  z-index: -1;
}

/* Control de carrusel mejorado */
.carousel-controls {
  position: relative;
  z-index: 10;
  margin-top: 30px !important;
}

.nav-btn {
  margin: 0 5px;
  background-color: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(79, 195, 247, 0.2);
}

.nav-btn:hover {
  background-color: rgba(79, 195, 247, 0.2);
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(79, 195, 247, 0.4);
}

.dot-btn {
  margin: 0 5px;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.dot-btn:hover {
  opacity: 0.9;
  transform: scale(1.1);
}

.active-dot {
  opacity: 1;
  transform: scale(1.2);
  box-shadow: 0 0 10px rgba(79, 195, 247, 0.5);
}

.star-field {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  animation: pulseStar 3s ease-in-out infinite;
}

@keyframes pulseStar {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}

/* Mejoras responsivas */
@media (max-width: 960px) {
  .testimonial-card {
    padding: 35px 25px;
    margin: 0 15px;
  }
  
  .testimonial-content {
    font-size: 1rem;
    min-height: 180px;
  }
}

@media (max-width: 600px) {
  .testimonial-card {
    padding: 45px 20px 30px; /* Ajustado para móviles */
    margin: 0 10px;
    overflow: visible; /* Mantener visible para las comillas */
  }
  
  .testimonial-quote {
    width: 50px;
    height: 50px;
    left: 30px;
    top: -25px; /* Ajustado para móviles */
  }
  
  .testimonial-content {
    font-size: 0.95rem;
    min-height: 220px;
    margin-top: 5px; /* Reducido más para móviles */
  }
  
  .testimonial-author {
    flex-direction: column;
    text-align: center;
  }
  
  .cosmic-avatar {
    margin-right: 0 !important;
    margin-bottom: 15px;
  }
}
</style>