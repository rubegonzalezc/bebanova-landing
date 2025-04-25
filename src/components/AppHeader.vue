<template>
    <header :class="{ 'scrolled': isScrolled }">
      <v-container>
        <v-row align="center">
          <v-col cols="auto">
            <div class="logo">
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
    background-color: white;
    padding: 20px 0;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease-in-out;
    
    &.scrolled {
      padding: 10px 0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
  }
  
  .logo img {
    height: 70px;
    width: auto;
    transition: all 0.3s ease-in-out;
  }
  
  nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  nav ul li {
    margin-left: 25px;
  }
  
  nav ul li a {
    color: #1a1a2e;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease-in-out;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 0;
      background-color: #4169e1;
      transition: all 0.3s ease-in-out;
    }
    
    &:hover {
      color: #4169e1;
      
      &:after {
        width: 100%;
      }
    }
  }
  
  .mobile-toggle {
    display: flex;
    color: #1a1a2e;
    font-size: 24px;
    cursor: pointer;
  }
  </style>