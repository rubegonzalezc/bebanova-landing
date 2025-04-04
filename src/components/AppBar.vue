<template>
  <v-app-bar app flat color="transparent" class="galaxy-navbar" elevation="0">
    <div class="d-flex align-center">
      <v-avatar class="me-2">
        <v-icon color="accent" size="x-large">mdi-galaxy</v-icon>
      </v-avatar>
      <span class="text-h6 font-weight-bold">Bebanova</span>
    </div>
    
    <v-spacer></v-spacer>
    
    <!-- Enlaces para pantallas medianas y grandes -->
    <div class="d-none d-md-flex align-center">
      <v-btn variant="text" to="#servicios" class="nav-link">Servicios</v-btn>
      <v-btn variant="text" to="#proceso" class="nav-link">Proceso</v-btn>
      <v-btn variant="text" to="#portafolio" class="nav-link">Portafolio</v-btn>
      <v-btn color="accent" variant="flat" to="#contacto" class="ms-2">
        Contactar
      </v-btn>
    </div>
    
    <!-- Menú para móviles -->
    <v-app-bar-nav-icon 
      class="d-flex d-md-none" 
      @click="drawer = !drawer"
    ></v-app-bar-nav-icon>
    
    <!-- Drawer para móviles -->
    <v-navigation-drawer v-model="drawer" temporary class="galaxy-drawer">
      <v-list>
        <v-list-item title="Servicios" to="#servicios" @click="drawer = false"></v-list-item>
        <v-list-item title="Proceso" to="#proceso" @click="drawer = false"></v-list-item>
        <v-list-item title="Portafolio" to="#portafolio" @click="drawer = false"></v-list-item>
        <v-list-item title="Contactar" to="#contacto" @click="drawer = false"></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>

<style scoped>
.galaxy-navbar {
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-link {
  position: relative;
  overflow: hidden;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--accent-alt));
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.galaxy-drawer {
  background: rgba(11, 29, 81, 0.9);
  backdrop-filter: blur(10px);
}
</style>