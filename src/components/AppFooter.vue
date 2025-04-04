<template>
  <v-footer class="galaxy-footer">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="mb-6 mb-md-0">
          <div class="d-flex align-center mb-4">
            <v-avatar size="42" class="mr-2 gradient-avatar">
              <v-icon icon="mdi-galaxy" color="white"></v-icon>
            </v-avatar>
            <span class="text-h5 font-weight-bold">Bebanova</span>
          </div>
          
          <p class="mb-4">
            Exploramos el cosmos digital para transformar ideas innovadoras en soluciones tecnológicas de vanguardia que impulsan el crecimiento y éxito de nuestros clientes.
          </p>
          
          <div class="social-links d-flex gap-2">
            <v-btn
              v-for="icon in socialIcons"
              :key="icon"
              :icon="icon"
              variant="text"
              color="light"
              class="social-icon"
            ></v-btn>
          </div>
        </v-col>
        
        <v-col cols="12" sm="6" md="2">
          <h3 class="text-subtitle-1 font-weight-bold mb-4">Servicios</h3>
          <v-list density="compact" class="footer-links pa-0">
            <v-list-item
              v-for="(link, i) in serviceLinks"
              :key="i"
              :title="link.title"
              :href="link.url"
              density="compact"
              class="px-0"
            ></v-list-item>
          </v-list>
        </v-col>
        
        <v-col cols="12" sm="6" md="2">
          <h3 class="text-subtitle-1 font-weight-bold mb-4">Empresa</h3>
          <v-list density="compact" class="footer-links pa-0">
            <v-list-item
              v-for="(link, i) in companyLinks"
              :key="i"
              :title="link.title"
              :href="link.url"
              density="compact"
              class="px-0"
            ></v-list-item>
          </v-list>
        </v-col>
        
        <v-col cols="12" sm="6" md="2">
          <h3 class="text-subtitle-1 font-weight-bold mb-4">Legal</h3>
          <v-list density="compact" class="footer-links pa-0">
            <v-list-item
              v-for="(link, i) in legalLinks"
              :key="i"
              :title="link.title"
              :href="link.url"
              density="compact"
              class="px-0"
            ></v-list-item>
          </v-list>
        </v-col>
        
        <v-col cols="12" sm="6" md="2">
          <h3 class="text-subtitle-1 font-weight-bold mb-4">Contacto</h3>
          <v-list density="compact" class="footer-contact pa-0">
            <v-list-item
              prepend-icon="mdi-email"
              title="info@bebanova.cl"
              class="px-0"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-phone"
              title="+56 9 1234 5678" 
              class="px-0"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-map-marker"
              title="Santiago, Chile"
              class="px-0"
            ></v-list-item>
          </v-list>
        </v-col>
      </v-row>
      
      <v-divider class="my-4 border-opacity-10"></v-divider>
      
      <div class="d-flex flex-column flex-md-row align-md-center justify-space-between">
        <div class="text-body-2 text-center text-md-left mb-3 mb-md-0">
          &copy; {{ new Date().getFullYear() }} GalaxTech. Todos los derechos reservados.
        </div>
        <div class="text-center text-md-right">
          <v-btn variant="text" size="small" href="#" class="text-caption me-2">Política de Privacidad</v-btn>
          <v-btn variant="text" size="small" href="#" class="text-caption">Términos de Servicio</v-btn>
        </div>
      </div>
    </v-container>
    
    <!-- Efecto de estrellas en el footer -->
    <div class="stars-effect"></div>
  </v-footer>
</template>

<script setup>
const socialIcons = [
  'mdi-linkedin',
  'mdi-github',
  'mdi-twitter',
  'mdi-instagram'
]

const serviceLinks = [
  { title: 'Desarrollo Web', url: '#servicios' },
  { title: 'Aplicaciones Móviles', url: '#servicios' },
  { title: 'Impresión 3D', url: '#servicios' },
  { title: 'Capacitaciones', url: '#servicios' }
]

const companyLinks = [
  { title: 'Nuestro Proceso', url: '#proceso' },
  { title: 'Portafolio', url: '#portafolio' },
  { title: 'Sobre Nosotros', url: '#' },
  { title: 'Blog', url: '#' }
]

const legalLinks = [
  { title: 'Términos y Condiciones', url: '#' },
  { title: 'Política de Privacidad', url: '#' },
  { title: 'Cookies', url: '#' }
]
</script>

<style>
.galaxy-footer {
  background: linear-gradient(to top, #010A26 0%, rgba(11, 29, 81, 0.8) 100%);
  color: var(--light);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  padding-top: 60px;
  padding-bottom: 30px;
}

.gradient-avatar {
  background: linear-gradient(45deg, var(--accent), var(--secondary));
}

.social-icon {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-5px);
  opacity: 0.9;
}

.footer-links {
  background: transparent !important;
}

.footer-links .v-list-item, .footer-contact .v-list-item {
  min-height: 32px;
  color: var(--light) !important;
  opacity: 0.8;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.footer-links .v-list-item:hover, .footer-contact .v-list-item:hover {
  opacity: 1;
  transform: translateX(5px);
}

.footer-contact .v-list-item .v-icon {
  color: var(--accent);
}

.stars-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(1px 1px at 25% 25%, rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0)),
                    radial-gradient(1px 1px at 50% 50%, rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0)),
                    radial-gradient(1px 1px at 75% 75%, rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0));
  background-size: 200px 200px;
  opacity: 0.1;
  z-index: -1;
}
</style>
