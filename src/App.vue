<template>
  <v-app>
    <app-header />
    <v-main>
      <v-container class="pa-0" fluid>
        <hero-section id="home" />
        <services-section id="services" />
        <process-section id="process" />
        <about-section id="about" />
        <contact-section id="contact" />
      </v-container>
    </v-main>
    <app-footer />
    <button
      class="back-to-top left"
      :class="{ 'scrolled': showBackToTop }"
      @click="scrollToTop"
      aria-label="Volver arriba"
    >
      <span class="logo-icon">
        <img src="/public/logoSoloInverted.png" alt="Logo" />
      </span>
      <span class="arrow-icon">
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <path d="M24 36V12M24 12L14 22M24 12L34 22" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </button>
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
  },
  data() {
    return {
      showBackToTop: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.showBackToTop = window.scrollY > 200
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
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

.v-application {
  [class*="text-"] {
    font-family: 'Poppins', sans-serif !important;
  }
  .v-main {
    padding: 0 !important;
  }
}

section {
  padding: 100px 0;
  width: 100%;
  box-sizing: border-box;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.back-to-top {
  position: fixed;
  left: 32px;
  bottom: 32px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #1a1a2e;
  color: #1a1a2e;
  border: 2px solid #1a1a2e;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.15);
  font-size: 2rem;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
  transition: opacity 0.4s cubic-bezier(.4,0,.2,1), background 0.3s, border 0.3s, transform 0.5s;
}

.back-to-top.scrolled {
  opacity: 0.95;
  pointer-events: auto;
}

.back-to-top .logo-icon,
.back-to-top .arrow-icon {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.back-to-top .logo-icon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
  z-index: 2;
  transition:
    opacity 0.4s cubic-bezier(.4,0,.2,1),
    transform 0.5s cubic-bezier(.4,0,.2,1);
}
.back-to-top .arrow-icon {
  opacity: 0;
  transform: rotate(-180deg) scale(0.7);
  z-index: 1;
  transition:
    opacity 0.4s cubic-bezier(.4,0,.2,1),
    transform 0.5s cubic-bezier(.4,0,.2,1);
}
.back-to-top:hover .logo-icon {
  opacity: 0;
  transform: rotate(180deg) scale(0.7);
}
.back-to-top:hover .arrow-icon {
  opacity: 1;
  transform: rotate(0deg) scale(1.1);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.back-to-top:hover {
  background: #1a1a2e;
  color: #1a1a2e;
  border-color: #1a1a2e;
}

.back-to-top .logo-icon img {
  width: 70%;
  height: 70%;
  object-fit: contain;
  display: block;
  transform: translateX(-2%) translateY(+10%);
}

@media (max-width: 768px) {
  section {
    padding: 60px 0;
  }
  .back-to-top {
    left: 12px;
    bottom: 12px;
    width: 56px;
    height: 56px;
    font-size: 1.5rem;
  }
}
</style>