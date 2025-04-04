<template>
  <v-container class="testimonials-section py-16">
    <div class="section-heading">
      <h2>Lo que dicen nuestros <span class="accent">Clientes</span></h2>
      <p class="text-subtitle-1">La satisfacción de nuestros viajeros estelares es nuestra mejor carta de navegación</p>
    </div>
    
    <v-row class="justify-center">
      <v-col cols="12" md="10" lg="8">
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
            class="pb-12"
          >
            <v-card class="testimonial-card mx-auto">
              <div class="testimonial-quote">
                <v-icon icon="mdi-format-quote-open" size="large" color="accent" class="quote-icon"></v-icon>
              </div>
              
              <v-card-text class="text-body-1 testimonial-content">
                {{ testimonial.content }}
              </v-card-text>
              
              <v-divider class="mx-auto my-4" width="80"></v-divider>
              
              <div class="testimonial-author d-flex align-center">
                <v-avatar class="mr-4" size="60">
                  <v-img :src="testimonial.avatar" cover></v-img>
                </v-avatar>
                <div>
                  <div class="text-subtitle-1 font-weight-bold">{{ testimonial.name }}</div>
                  <div class="text-caption">{{ testimonial.position }}</div>
                </div>
              </div>
            </v-card>
          </v-carousel-item>
        </v-carousel>
        
        <div class="text-center mt-2">
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            color="accent"
            @click="prevSlide"
            class="mr-2"
          ></v-btn>
          
          <v-btn
            v-for="(dot, i) in testimonials.length"
            :key="i"
            icon
            :color="currentSlide === i ? 'accent' : 'secondary'"
            size="small"
            @click="currentSlide = i"
            class="mx-1"
          >
            <v-icon :icon="currentSlide === i ? 'mdi-circle' : 'mdi-circle-outline'" size="x-small"></v-icon>
          </v-btn>
          
          <v-btn
            icon="mdi-chevron-right"
            variant="text"
            color="accent"
            @click="nextSlide"
            class="ml-2"
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
}

.testimonial-carousel {
  overflow: visible;
}

.testimonial-card {
  background: rgba(11, 29, 81, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px rgba(79, 195, 247, 0.2);
  transition: transform 0.5s ease, opacity 0.5s ease;
  animation: floatCard 8s ease-in-out infinite;
}

@keyframes floatCard {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.testimonial-quote {
  position: absolute;
  top: -20px;
  left: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, var(--accent), var(--accent-alt));
  border-radius: 50%;
}

.quote-icon {
  margin-top: -3px;
}

.testimonial-content {
  font-size: 1.1rem;
  line-height: 1.6;
  font-style: italic;
  margin-top: 20px;
  min-height: 120px;
}

.testimonial-author {
  padding: 0 20px 10px;
}

.v-avatar {
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.star-field {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
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
</style>