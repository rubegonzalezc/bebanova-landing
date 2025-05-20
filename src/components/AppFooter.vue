<template>
    <footer class="footer">
      <div class="footer-pattern"></div>
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo-col">
            <div class="footer-logo">
              <img src="@/assets/img/logo.png" alt="Bebanova Logo">
            </div>
            <p class="footer-about-text">
              Bebanova es una empresa especializada en soluciones digitales de vanguardia, enfocada en la transformación digital y la implementación de tecnologías emergentes para negocios.
            </p>
            <div class="footer-social">
              <a
                v-for="(social, index) in socialLinks"
                :key="index"
                :href="social.href || '#'"
                class="footer-social-icon"
                target="_blank"
                rel="noopener"
              >
                <i :class="social.icon"></i>
              </a>
            </div>
          </div>
          <div class="footer-links-col">
            <h3 class="footer-col-title">Enlaces rápidos</h3>
            <ul class="footer-links">
              <li v-for="(link, index) in quickLinks" :key="index">
                <a :href="link.url"><i class="fas fa-chevron-right"></i> {{ link.name }}</a>
              </li>
            </ul>
          </div>
          <div class="footer-links-col">
            <h3 class="footer-col-title">Servicios</h3>
            <ul class="footer-links">
              <li v-for="(service, index) in services" :key="index">
                <a :href="service.url"><i class="fas fa-chevron-right"></i> {{ service.name }}</a>
              </li>
            </ul>
          </div>
          <div class="footer-contact-col">
            <h3 class="footer-col-title">Contáctanos</h3>
            <div v-for="(contact, index) in contactInfo" :key="index" class="footer-contact-item">
              <div class="footer-contact-icon">
                <i :class="contact.icon"></i>
              </div>
              <div class="footer-contact-text">
                <h4>{{ contact.title }}</h4>
                <p v-if="!contact.isLink">{{ contact.value }}</p>
                <a v-else :href="contact.href">{{ contact.value }}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copyright">© {{ currentYear }} Bebanova. Todos los derechos reservados.</p>
          <div class="footer-bottom-links">
            <a href="#">Términos de Servicio</a>
            <a href="#">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'AppFooter',
    data() {
      return {
        currentYear: new Date().getFullYear(),
        socialLinks: [
          { icon: 'fab fa-whatsapp' },
          { icon: 'fab fa-instagram' },
          { icon: 'fab fa-linkedin-in',href: 'https://www.linkedin.com/company/bebanova' }
        ],
        quickLinks: [
          { name: 'Inicio', url: '#home' },
          { name: 'Servicios', url: '#services' },
          { name: 'Proceso', url: '#process' },
          { name: 'Nosotros', url: '#about' },
          { name: 'Contacto', url: '#contact' }
        ],
        services: [
          { name: 'Desarrollo Web', url: '#' },
          { name: 'Aplicaciones Móviles', url: '#' },
          { name: 'Inteligencia Artificial', url: '#' },
          { name: 'Impresión 3D', url: '#' },
          { name: 'Realidad Virtual', url: '#' }
        ],
        contactInfo: [
          { 
            icon: 'fas fa-map-marker-alt', 
            title: 'Ubicación', 
            value: 'Los Olivillos 440, Concón, Chile',
            isLink: false
          },
          { 
            icon: 'fas fa-phone-alt', 
            title: 'Teléfono', 
            value: '+56 9 7466 6386',
            isLink: true,
            href: 'tel:+56974666386'
          },
          { 
            icon: 'fas fa-envelope', 
            title: 'Email', 
            value: 'contacto@bebanova.com',
            isLink: true,
            href: 'mailto:contacto@bebanova.com'
          }
        ]
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .footer {
    background-color: #1a1a2e;
    color: white;
    padding: 80px 0 30px;
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 5px;
      background: linear-gradient(90deg, #4169e1, #80b3ff, #4169e1);
    }
  }
  
  .footer-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
    position: relative;
    z-index: 1;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    position: relative;
    z-index: 10;
  }
  
  .footer-logo-col {
    flex: 2;
    min-width: 200px;
  }
  
  .footer-logo {
    margin-bottom: 25px;
    max-width: 180px;
    
    img {
      width: 100%;
      height: auto;
      filter: brightness(0) invert(1);
    }
  }
  
  .footer-about-text {
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 25px;
  }
  
  .footer-social {
    display: flex;
    gap: 15px;
  }
  
  .footer-social-icon {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    &:hover {
      background: #4169e1;
      transform: translateY(-3px);
    }
    
    i {
      color: white;
      font-size: 18px;
    }
  }
  
  .footer-links-col {
    flex: 1;
    min-width: 150px;
  }
  
  .footer-col-title {
    color: white;
    font-size: 1.2rem;
    margin-bottom: 25px;
    font-weight: 600;
    position: relative;
    padding-bottom: 10px;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 30px;
      height: 2px;
      background: #4169e1;
    }
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 15px;
    }
    
    a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      
      &:hover {
        color: #80b3ff;
        transform: translateX(5px);
      }
      
      i {
        margin-right: 10px;
        font-size: 12px;
        color: #4169e1;
      }
    }
  }
  
  .footer-contact-col {
    flex: 2;
    min-width: 200px;
  }
  
  .footer-contact-item {
    display: flex;
    margin-bottom: 20px;
  }
  
  .footer-contact-icon {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    
    i {
      color: #80b3ff;
      font-size: 18px;
    }
  }
  
  .footer-contact-text {
    flex: 1;
    
    h4 {
      color: white;
      font-size: 1rem;
      margin-bottom: 5px;
      margin-top: 0;
    }
    
    p, a {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
      line-height: 1.5;
      text-decoration: none;
      transition: all 0.3s ease;
      margin: 0;
      
      &:hover {
        color: #80b3ff;
      }
    }
  }
  
  .footer-bottom {
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 30px;
    margin-top: 60px;
    position: relative;
    z-index: 10;
  }
  
  .footer-copyright {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
  }
  
  .footer-bottom-links {
    margin-top: 15px;
    
    a {
      color: rgba(255, 255, 255, 0.7);
      margin: 0 10px;
      font-size: 0.9rem;
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
        color: #80b3ff;
      }
    }
  }
  
  @media (max-width: 992px) {
    .footer-content {
      gap: 30px;
    }
    
    .footer-logo-col {
      flex: 100%;
    }
  }
  
  @media (max-width: 768px) {
    .footer {
      padding: 60px 0 30px;
    }
    
    .footer-links-col, .footer-contact-col {
      flex: 100%;
    }
    
    .footer-bottom {
      margin-top: 40px;
    }
  }
  </style>