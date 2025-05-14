<template>
    <header :class="{ 'scrolled': isScrolled }">
      <v-container>
        <v-row align="center">
          <v-col cols="auto">
            <div class="logo">
              <!-- Asegúrate que esta es la ruta correcta a tu logo oscuro con texto blanco -->
              <img src="@/assets/img/logo.png" alt="Bebanova Logo">
            </div>
          </v-col>
          
          <v-col class="d-none d-md-flex justify-end">
            <nav>
              <ul>
                <li><a href="#home">Inicio</a></li>
                <li><a href="#services">Servicios</a></li>
                <li><a href="#process">Proceso</a></li>
                <li><a href="#about">Nosotros</a></li>
                <li><a href="#contact">Contacto</a></li>
              </ul>
            </nav>
          </v-col>
          
          <v-col class="d-flex d-md-none justify-end">
            <div class="mobile-toggle" @click="toggleMobileMenu">
              <i class="fas fa-bars"></i>
            </div>
          </v-col>
        </v-row>
      </v-container>
      
      <v-navigation-drawer
        v-model="mobileMenuOpen"
        temporary
        location="right"
        class="mobile-menu" 
        theme="dark"
      >
        <v-list>
          <v-list-item 
            v-for="(item, index) in navItems" 
            :key="index"
            :href="item.link"
            @click="mobileMenuOpen = false"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </header>
  </template>
  
  <script>
  export default {
    name: 'AppHeader',
    data() {
      return {
        isScrolled: false,
        mobileMenuOpen: false,
        navItems: [
          { text: 'Inicio', link: '#home' },
          { text: 'Servicios', link: '#services' },
          { text: 'Proceso', link: '#process' },
          { text: 'Nosotros', link: '#about' },
          { text: 'Contacto', link: '#contact' }
        ]
      }
    },
    methods: {
      handleScroll() {
        this.isScrolled = window.scrollY > 50;
      },
      toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
  </script>
  
  <style lang="scss" scoped>
  header {
    // Fondo oscuro para el header, puedes ajustarlo a un color sólido o gradiente de tu proyecto
    background: linear-gradient(135deg, #1a1a2e 0%, #000f2e 100%); // Ejemplo de gradiente oscuro
    // background-color: #1a1a2e; // Alternativa: color sólido oscuro
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); // Sombra ajustada para fondo oscuro
    transition: all 0.3s ease-in-out;
    padding-top: 10px; // Añadido padding para que el logo no esté tan pegado arriba
    padding-bottom: 10px;

    &.scrolled {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      // Podrías cambiar ligeramente el fondo al hacer scroll si lo deseas
      // background: #111; // Ejemplo de fondo ligeramente diferente al hacer scroll
    }
  }
  
  .logo img {
    height: 75px; // Ajustado el tamaño inicial del logo
    width: auto;
    transition: all 0.3s ease-in-out;
    filter: brightness(0) invert(1);
  }

  header.scrolled .logo img {
    height: 40px; // Encoger logo al hacer scroll
  }
  
  nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  nav ul li {
    margin-left: 30px; // Aumentado ligeramente el margen
  }
  
  nav ul li a {
    color: #e0e0e0; // Color claro para texto de navegación sobre fondo oscuro
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease-in-out;
    position: relative;
    font-size: 0.95rem;
    
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -6px; // Ajustado para que no esté tan pegado
      left: 50%;
      transform: translateX(-50%);
      background-color: #4fc3f7; // Color de acento para la línea (azul claro)
      transition: all 0.3s ease-in-out;
    }
    
    &:hover {
      color: #ffffff; // Texto más brillante al hacer hover
      
      &:after {
        width: 100%;
      }
    }
  }
  
  .mobile-toggle {
    display: flex;
    color: #e0e0e0; // Color claro para el ícono del menú móvil
    font-size: 26px; // Ligeramente más grande
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #ffffff;
    }
  }

  // Estilos para el menú de navegación móvil (drawer)
  // Si usas Vuetify, el `theme="dark"` en v-navigation-drawer ayudará.
  // Puedes añadir estilos más específicos aquí si es necesario.
  .mobile-menu {
    // background-color: #1a1a2e; // Asegura que el drawer también tenga fondo oscuro
    // .v-list-item-title {
    //   color: #e0e0e0;
    // }
    // .v-list-item:hover {
    //   background-color: rgba(255, 255, 255, 0.1);
    // }
  }
  </style>