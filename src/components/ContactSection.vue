<!-- filepath: c:\Users\ruben.gonzalez\OneDrive - Servicios Dimerc SpA\Escritorio\Bebanova\bebanova-vue\src\components\ContactSection.vue -->
<template>
    <section id="contact" class="contact">
      <div class="container">
        <div class="section-header">
        <h2>Contacto</h2>
        <div class="section-divider">
          <span></span>
        </div>
        </div>
        <div class="contact-container">
          <div class="contact-info">
            <div class="contact-card">
              <h3>Información de Contacto</h3>
              <div class="contact-method" v-for="(method, index) in contactMethods" :key="index">
                <div class="contact-icon">
                  <i :class="method.icon"></i>
                </div>
                <div class="contact-info-text">
                  <h4>{{ method.title }}</h4>
                  <p v-if="!method.isLink">{{ method.value }}</p>
                  <a v-else :href="method.href">{{ method.value }}</a>
                </div>
              </div>
              <div class="social-links">
                <a
                  v-for="(social, index) in socialLinks"
                  :key="index"
                  class="social-link"
                  :href="social.href || '#'"
                  target="_blank"
                  rel="noopener"
                >
                  <i :class="social.icon"></i>
                </a>
              </div>
            </div>
            <div class="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.0857997583194!2d-71.5421984235469!3d-32.94874407199609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689dd3af7a2ae65%3A0x327b3202d800b3ad!2sLos%20Olivillos%20440%2C%202511044%20Conc%C3%B3n%2C%20Valpara%C3%ADso!5e0!3m2!1ses-419!2scl!4v1747700897885!5m2!1ses-419!2scl"
                width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy">
              </iframe>
            </div>
          </div>
          <div class="contact-form">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Nombre</label>
                <input type="text" id="name" v-model="form.name" placeholder="Tu nombre completo" required>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="form.email" placeholder="tu@email.com" required>
              </div>
              <div class="form-group">
                <label for="subject">Asunto</label>
                <input type="text" id="subject" v-model="form.subject" placeholder="¿En qué podemos ayudarte?" required>
              </div>
              <div class="form-group">
                <label for="message">Mensaje</label>
                <textarea id="message" v-model="form.message" rows="5" placeholder="Escribe tu mensaje aquí..." required></textarea>
              </div>
              <button type="submit" class="btn">Enviar mensaje</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ContactSection',
    data() {
      return {
        form: {
          name: '',
          email: '',
          subject: '',
          message: ''
        },
        contactMethods: [
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
          },
          {
            icon: 'fas fa-clock',
            title: 'Horario de Atención',
            value: 'Lunes a Viernes: 9:00 - 18:00',
            isLink: false
          }
        ],
        socialLinks: [
          { icon: 'fab fa-whatsapp' },
          { icon: 'fab fa-instagram' },
          { icon: 'fab fa-linkedin-in',href:'https://www.linkedin.com/company/bebanova' }
        ]
      }
    },
    methods: {
      submitForm() {
        // Simular envío del formulario
        alert('Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.');
        // Limpiar formulario
        this.form = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .contact {
    background-color: #f8fafc;
    padding: 40px 0;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: -150px;
      right: -150px;
      width: 400px;
      height: 400px;
      background: linear-gradient(135deg, rgba(65, 105, 225, 0.05) 0%, rgba(65, 105, 225, 0.01) 100%);
      border-radius: 50%;
      z-index: 0;
    }
    .section-header {
    text-align: center;
    margin-bottom: 40px;
    position: relative;
    z-index: 1;

    h2 {
      font-size: 2.5rem;
      color: #1a1a2e;
      margin-bottom: 20px;
      position: relative;
      display: inline-block;
    }

    .section-divider {
      width: 100%;
      text-align: center;
      position: relative;

      span {
        display: inline-block;
        width: 80px;
        height: 4px;
        background: linear-gradient(90deg, #4169e1, #80b3ff);
        border-radius: 4px;
        position: relative;

        &::before,
        &::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4169e1;
          top: 50%;
          transform: translateY(-50%);
        }

        &::before {
          left: -15px;
        }

        &::after {
          right: -15px;
        }
      }
    }
  }
  
  .contact-container {
    display: flex;
    gap: 50px;
    position: relative;
    z-index: 2;
  }
  
  .contact-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .contact-card {
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
    transition: all 0.3s ease;
    border: 1px solid rgba(65, 105, 225, 0.1);
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(65, 105, 225, 0.1);
    }
    
    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1a1a2e;
      position: relative;
      padding-bottom: 15px;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 40px;
        height: 3px;
        background: linear-gradient(90deg, #4169e1, #80b3ff);
      }
    }
  }
  
  .contact-method {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .contact-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, rgba(65, 105, 225, 0.1) 0%, rgba(65, 105, 225, 0.2) 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    
    i {
      font-size: 20px;
      color: #4169e1;
    }
  }
  
  .contact-info-text {
    h4 {
      font-size: 1.1rem;
      margin-bottom: 5px;
      color: #1a1a2e;
    }
    
    p, a {
      font-size: 0.95rem;
      color: #555;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    a:hover {
      color: #4169e1;
    }
  }
  
  .social-links {
    display: flex;
    gap: 15px;
    margin-top: 20px;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, rgba(65, 105, 225, 0.1) 0%, rgba(65, 105, 225, 0.2) 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-3px);
      background: linear-gradient(135deg, #4169e1, #80b3ff);
      
      i {
        color: white;
      }
    }
    
    i {
      font-size: 18px;
      color: #4169e1;
      transition: all 0.3s ease;
    }
  }
  
  .contact-form {
    flex: 1;
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    border: 1px solid rgba(65, 105, 225, 0.1);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: -50px;
      right: -50px;
      width: 150px;
      height: 150px;
      background: linear-gradient(135deg, rgba(65, 105, 225, 0.03) 0%, rgba(65, 105, 225, 0.01) 100%);
      border-radius: 50%;
      z-index: 0;
    }
    
    form {
      position: relative;
      z-index: 1;
    }
  }
  
  .form-group {
    margin-bottom: 25px;
    
    label {
      display: block;
      margin-bottom: 8px;
      font-size: 0.95rem;
      font-weight: 500;
      color: #1a1a2e;
    }
    
    input, textarea {
      width: 100%;
      padding: 15px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      font-family: inherit;
      font-size: 1rem;
      color: #555;
      background-color: #f9f9f9;
      transition: all 0.3s ease;
      
      &:focus {
        border-color: #4169e1;
        outline: none;
        box-shadow: 0 0 0 3px rgba(65, 105, 225, 0.1);
        background-color: white;
      }
    }
  }
  
  .map-container {
    height: 300px;
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(65, 105, 225, 0.1);
  }
  
  button.btn {
    background: linear-gradient(135deg, #4169e1 0%, #80b3ff 100%);
    color: white;
    font-weight: 600;
    padding: 15px 30px;
    border-radius: 30px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 10px 20px rgba(65, 105, 225, 0.3);
    border: none;
    cursor: pointer;
    display: inline-block;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 25px rgba(65, 105, 225, 0.4);
    }
  }
  
  @media (max-width: 992px) {
    .contact-container {
      flex-direction: column-reverse;
    }
    
    .contact-form {
      margin-bottom: 40px;
    }
  }
  
  @media (max-width: 768px) {
    .contact {
      padding: 80px 0;
    }
    
    .contact-form, .contact-card {
      padding: 25px;
    }
  }}
  </style>