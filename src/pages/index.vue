<template>
  <v-app class="galaxy-theme">
    <app-bar />
    
    <v-main>
      <hero-section />
      <services-section />
      <mission-vision-section />
      <process-section />
      <portfolio-section />
      <testimonials-section />
      <contact-section /> 
    </v-main>
    
    <app-footer />
  </v-app>
</template>

<script setup>
import AppBar from '@/components/AppBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import ServicesSection from '@/components/ServicesSection.vue'
import MissionVisionSection from '@/components/MissionVisionSection.vue'
import ProcessSection from '@/components/ProcessSection.vue'
import PortfolioSection from '@/components/PortfolioSection.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style>
.galaxy-theme {
  --primary: #0B1D51;      /* Azul profundo espacial */
  --secondary: #5E35B1;    /* Púrpura galáctico */
  --accent: #4FC3F7;       /* Azul estelar */
  --accent-alt: #FF4081;   /* Nebulosa rosa */
  --dark: #010A26;         /* Negro espacial */
  --light: #E1E5F2;        /* Blanco estelar */
  --star-dust: rgba(255, 255, 255, 0.8);
  
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  color: var(--light);
}

/* Animación de estrellas de fondo */
.galaxy-theme::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, var(--star-dust), rgba(0,0,0,0)),
    radial-gradient(2px 2px at 40px 70px, var(--star-dust), rgba(0,0,0,0)),
    radial-gradient(1px 1px at 90px 40px, var(--star-dust), rgba(0,0,0,0)),
    radial-gradient(1px 1px at 130px 80px, var(--star-dust), rgba(0,0,0,0)),
    radial-gradient(1px 1px at 160px 120px, var(--star-dust), rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 200px 200px;
  animation: stars-animation 300s linear infinite;
  z-index: -1;
}

@keyframes stars-animation {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

.section-heading {
  margin-bottom: 2rem;
  text-align: center;
}

.section-heading h2 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.section-heading .accent {
  color: var(--accent);
  background: linear-gradient(45deg, var(--accent), var(--accent-alt));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>