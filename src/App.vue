<template>
  <v-app>
    <app-header />
    <v-main>
      <!-- Envuelve todo en un contenedor para controlar el ancho -->
      <v-container class="pa-0" fluid>
        <hero-section id="home" />
        <services-section id="services" />
        <process-section id="process" />
        <about-section id="about" />
        <contact-section id="contact" />
      </v-container>
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    HeroSection,
    ServicesSection,
    ProcessSection,
    AboutSection,
    ContactSection,
    AppFooter
  }
}
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: #333;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

// Sobrescribir algunos estilos de Vuetify
.v-application {
  [class*="text-"] {
    font-family: 'Poppins', sans-serif !important;
  }
  
  .v-main {
    padding: 0 !important;
  }
}

// Estilos para todas las secciones
section {
  padding: 100px 0;
  width: 100%;
  box-sizing: border-box;
}

// Estilo para los contenedores dentro de las secciones
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

// Ajustes responsive
@media (max-width: 768px) {
  section {
    padding: 60px 0;
  }
}
</style>