<template>
  <v-app-bar app flat color="transparent" class="galaxy-navbar" elevation="0">
    <div class="d-flex align-center">
      <v-avatar class="me-2 logo-container">
        <v-icon color="accent" size="x-large" class="logo-icon">mdi-galaxy</v-icon>
        <div class="logo-glow"></div>
      </v-avatar>
      <span class="text-h6 font-weight-bold logo-text">
        <!--Vamos a añadir el logo de imagen-->
        <v-img src="@/assets/logo.png" width="70" height="70" class="logo-image"></v-img>
      </span>
    </div>
    
    <v-spacer></v-spacer>
    
    <!-- Enlaces para pantallas medianas y grandes -->
    <div class="d-none d-md-flex align-center">
      <v-btn variant="text" to="#servicios" class="nav-link">
        <span>Servicios</span>
      </v-btn>
      <v-btn variant="text" to="#proceso" class="nav-link">
        <span>Proceso</span>
      </v-btn>
      <v-btn variant="text" to="#portafolio" class="nav-link">
        <span>Portafolio</span>
      </v-btn>
      <v-btn color="accent" variant="flat" to="#contacto" class="ms-2 cosmic-btn">
        Contactar
        <v-icon end>mdi-rocket-launch</v-icon>
      </v-btn>
    </div>
    
    <!-- Menú para móviles -->
    <v-app-bar-nav-icon 
      class="d-flex d-md-none cosmic-icon" 
      @click="drawer = !drawer"
    ></v-app-bar-nav-icon>
    
    <!-- Drawer para móviles -->
    <v-navigation-drawer v-model="drawer" temporary class="galaxy-drawer">
      <div class="drawer-header pa-4 d-flex align-center">
        <v-avatar class="me-2">
          <v-icon color="accent" size="x-large">mdi-galaxy</v-icon>
        </v-avatar>
        <span class="text-h6 font-weight-bold">
          <span class="gradient-text">Beba</span>nova
        </span>
      </div>
      
      <div class="cosmic-stars-bg"></div>
      
      <v-list class="drawer-list">
        <v-list-item 
          v-for="(item, i) in navItems" 
          :key="i"
          :title="item.title" 
          :to="item.to" 
          @click="drawer = false"
          class="drawer-item"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" color="accent"></v-icon>
          </template>
        </v-list-item>
      </v-list>
      
      <template v-slot:append>
        <div class="pa-4">
          <v-btn block color="accent" variant="elevated" to="#contacto" @click="drawer = false" class="cosmic-btn">
            Contactar
            <v-icon end>mdi-rocket-launch</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)

const navItems = [
  { title: 'Servicios', to: '#servicios', icon: 'mdi-tools' },
  { title: 'Proceso', to: '#proceso', icon: 'mdi-chart-timeline' },
  { title: 'Portafolio', to: '#portafolio', icon: 'mdi-briefcase' },
]
</script>

<style scoped>
.galaxy-navbar {
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: fixed;
  z-index: 100;
  transition: all 0.3s ease;
  background: rgba(1, 10, 38, 0.4) !important;
}

.logo-container {
  position: relative;
  overflow: visible;
}

.logo-icon {
  animation: pulse 4s infinite ease-in-out;
}

.logo-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
  opacity: 0.4;
  filter: blur(8px);
  animation: pulse 4s infinite ease-in-out;
}

.gradient-text {
  background: linear-gradient(45deg, var(--accent), var(--accent-alt));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
}

.nav-link {
  position: relative;
  overflow: hidden;
  margin: 0 6px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-link span {
  position: relative;
  z-index: 2;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--accent-alt));
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 80%;
}

.nav-link:hover {
  transform: translateY(-2px);
}

.cosmic-btn {
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(79, 195, 247, 0.3);
  transition: all 0.3s ease;
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

.cosmic-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 195, 247, 0.5);
}

.cosmic-btn:hover::before {
  opacity: 1;
  animation: cosmic-glow 3s infinite;
}

.cosmic-icon {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.cosmic-icon:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
}

.galaxy-drawer {
  background: rgba(1, 10, 38, 0.95);
  backdrop-filter: blur(15px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.drawer-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 16px;
}

.drawer-list {
  background: transparent;
  position: relative;
  z-index: 2;
}

.drawer-item {
  margin-bottom: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.drawer-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
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
  z-index: 1;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}

@keyframes cosmic-glow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>