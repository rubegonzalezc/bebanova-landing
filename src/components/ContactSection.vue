<template>
  <v-container id="contacto" class="contact-section py-16">
    <div class="cosmic-stars-bg"></div>
    
    <div class="section-heading">
      <h2>Conversemos sobre tu <span class="gradient-text">Proyecto</span></h2>
      <p class="text-subtitle-1">Estamos listos para ayudarte a navegar por el cosmos digital</p>
    </div>
    
    <v-row>
      <v-col cols="12" md="5" lg="4">
        <v-hover v-slot:default="{ isHovering, props }">
          <v-card 
            v-bind="props"
            class="contact-info-card" 
            :class="{ 'on-hover': isHovering }"
            variant="flat"
          >
            <div class="cosmic-planet contact-planet"></div>
            
            <v-card-title class="d-flex align-center">
              <v-icon color="accent" class="me-2">mdi-headset</v-icon>
              Información de contacto
            </v-card-title>
            
            <v-card-text>
              <p>Contáctanos a través de los siguientes medios o completa el formulario:</p>
              
              <v-list density="comfortable" class="contact-list mt-4">
                <v-list-item 
                  v-for="(item, index) in contactInfo" 
                  :key="index"
                  :prepend-icon="item.icon"
                  :title="item.text"
                  class="contact-list-item"
                  :class="{'item-hover': index === hoverIndex}"
                  @mouseenter="hoverIndex = index"
                  @mouseleave="hoverIndex = null"
                ></v-list-item>
              </v-list>
              
              <div class="d-flex gap-2 mt-6 social-icons">
                <v-btn 
                  v-for="(social, index) in socialMedia"
                  :key="index"
                  variant="text" 
                  :icon="social.icon" 
                  color="accent"
                  class="social-btn"
                ></v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      
      <v-col cols="12" md="7" lg="8">
        <v-hover v-slot:default="{ isHovering, props }">
          <v-card 
            v-bind="props"
            class="contact-form-card" 
            :class="{ 'on-hover': isHovering }"
            variant="flat"
          >
            <v-form ref="form" @submit.prevent="submitForm" class="contact-form">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.name"
                    label="Nombre completo"
                    variant="outlined"
                    required
                    :rules="nameRules"
                    class="contact-field"
                    color="accent"
                    bg-color="rgba(255, 255, 255, 0.05)"
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.email"
                    label="Correo electrónico"
                    variant="outlined"
                    required
                    :rules="emailRules"
                    class="contact-field"
                    color="accent"
                    bg-color="rgba(255, 255, 255, 0.05)"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.phone"
                    label="Teléfono (opcional)"
                    variant="outlined"
                    class="contact-field"
                    color="accent"
                    bg-color="rgba(255, 255, 255, 0.05)"
                    prepend-inner-icon="mdi-phone"
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.service"
                    label="Servicio de interés"
                    variant="outlined"
                    :items="serviceOptions"
                    required
                    class="contact-field"
                    color="accent"
                    bg-color="rgba(255, 255, 255, 0.05)"
                    prepend-inner-icon="mdi-briefcase"
                  ></v-select>
                </v-col>
                
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.message"
                    label="Cuéntanos sobre tu proyecto"
                    variant="outlined"
                    rows="4"
                    required
                    :rules="messageRules"
                    class="contact-field"
                    color="accent"
                    bg-color="rgba(255, 255, 255, 0.05)"
                    prepend-inner-icon="mdi-message-text"
                  ></v-textarea>
                </v-col>
                
                <v-col cols="12" class="text-center">
                  <v-btn 
                    type="submit"
                    color="accent"
                    size="large"
                    :loading="loading"
                    class="cosmic-btn px-6"
                  >
                    Enviar mensaje
                    <v-icon end>mdi-rocket-launch</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-hover>
        
        <v-dialog v-model="formSuccess" max-width="400">
          <v-card class="success-card text-center pa-6">
            <div class="cosmic-stars"></div>
            <v-avatar color="accent" size="80" class="mb-4 success-avatar">
              <v-icon size="x-large" color="white">mdi-check</v-icon>
            </v-avatar>
            <h3 class="text-h5 mb-2">¡Mensaje enviado con éxito!</h3>
            <p class="mb-4">Nos pondremos en contacto contigo a la brevedad.</p>
            <v-btn color="accent" @click="formSuccess = false" class="cosmic-btn">Aceptar</v-btn>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    
    <!-- Estrellas flotantes -->
    <div class="floating-stars">
      <div v-for="n in 15" :key="`star-${n}`" 
          class="floating-star"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`
          }">
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = ref(null)
const loading = ref(false)
const formSuccess = ref(false)
const hoverIndex = ref(null)

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: ''
})

const nameRules = [
  v => !!v || 'El nombre es requerido',
  v => v.length >= 3 || 'El nombre debe tener al menos 3 caracteres'
]

const emailRules = [
  v => !!v || 'El email es requerido',
  v => /.+@.+\..+/.test(v) || 'El email debe ser válido'
]

const messageRules = [
  v => !!v || 'El mensaje es requerido',
  v => v.length >= 10 || 'El mensaje debe tener al menos 10 caracteres'
]

const serviceOptions = [
  'Desarrollo Web',
  'Aplicaciones Móviles',
  'Impresión 3D',
  'Capacitaciones',
  'Otro'
]

const contactInfo = [
  { icon: 'mdi-email-outline', text: 'info@bebanova.com' },
  { icon: 'mdi-phone-outline', text: '+1 (555) 123-4567' },
  { icon: 'mdi-map-marker-outline', text: 'Av. Galaxia 123, Ciudad Espacial' }
]

const socialMedia = [
  { icon: 'mdi-linkedin', link: '#' },
  { icon: 'mdi-github', link: '#' },
  { icon: 'mdi-twitter', link: '#' },
  { icon: 'mdi-instagram', link: '#' }
]

const submitForm = async () => {
  const { valid } = await form.value.validate()
  
  if (valid) {
    loading.value = true
    
    // Simulación de envío
    setTimeout(() => {
      loading.value = false
      formSuccess.value = true
      form.value.reset()
    }, 1500)
  }
}
</script>

<style scoped>
.contact-section {
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.gradient-text {
  background: linear-gradient(45deg, var(--accent), var(--accent-alt));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
}

.contact-info-card, .contact-form-card {
  background: rgba(11, 29, 81, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  height: 100%;
  color: #E1E5F2;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  position: relative;
  overflow: hidden;
  padding: 24px; /* Añadir padding interno en toda la tarjeta */
}

.contact-info-card.on-hover, .contact-form-card.on-hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(79, 195, 247, 0.3);
}

.contact-planet {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  opacity: 0.15;
  filter: blur(3px);
  z-index: 0;
  top: -50px;
  right: -50px;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
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
  z-index: -1;
}

.contact-info-card .v-card-title,
.contact-form-card .v-card-title {
  color: #E1E5F2;
  font-weight: bold;
  position: relative;
  z-index: 1;
}

.contact-info-card .v-card-text,
.contact-form-card .v-card-text,
.contact-info-card p,
.contact-form-card p {
  color: rgba(225, 229, 242, 0.9);
  position: relative;
  z-index: 1;
}

/* Estilos para la lista de contacto */
.contact-list {
  background-color: transparent !important;
  position: relative;
  z-index: 1;
}

.contact-list-item {
  background-color: transparent !important;
  min-height: 40px;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-bottom: 4px;
}

.contact-list-item.item-hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
  transform: translateX(5px);
}

.contact-list .v-list-item__title {
  color: #E1E5F2 !important;
}

.contact-list .v-icon {
  color: var(--accent) !important;
}

/* Estilos para los campos del formulario */
.contact-form {
  width: 100%;
}

.contact-field {
  color: #E1E5F2 !important;
  margin-bottom: 12px; /* Aumentado de 4px a 12px */
}

.contact-field :deep(.v-field__input) {
  color: #E1E5F2 !important;
}

.contact-field :deep(.v-field__outline) {
  border-color: rgba(225, 229, 242, 0.3) !important;
}

.contact-field :deep(.v-field__outline:hover) {
  border-color: var(--accent) !important;
}

.contact-field :deep(.v-field__outline--focused) {
  border-color: var(--accent) !important;
  box-shadow: 0 0 0 2px rgba(79, 195, 247, 0.2);
}

.contact-field :deep(.v-field__prepend-inner) {
  color: var(--accent) !important;
  opacity: 0.8;
}

.contact-field :deep(.v-field:hover .v-field__prepend-inner) {
  opacity: 1;
}

.contact-field :deep(.v-label) {
  color: rgba(225, 229, 242, 0.7) !important;
}

.contact-field :deep(.v-label--focused) {
  color: var(--accent) !important;
}

.contact-field :deep(.v-messages) {
  color: #FF4081 !important;
}

/* Para el v-textarea asegurarse que tiene suficiente espacio */
.v-textarea.contact-field {
  margin-bottom: 16px; /* Un poco más de espacio para el área de texto */
}

/* Iconos sociales */
.social-icons {
  position: relative;
  z-index: 1;
}

.social-btn {
  transition: all 0.3s ease;
  border-radius: 50%;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 5px 15px rgba(79, 195, 247, 0.3);
}

/* Botón cósmico */
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

@keyframes cosmic-glow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Tarjeta de éxito */
.success-card {
  background: rgba(11, 29, 81, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #E1E5F2;
  position: relative;
  overflow: hidden;
}

.success-avatar {
  box-shadow: 0 0 30px rgba(79, 195, 247, 0.8);
  position: relative;
  z-index: 1;
}

.success-card h3 {
  color: #E1E5F2;
  position: relative;
  z-index: 1;
}

.success-card p {
  color: rgba(225, 229, 242, 0.9);
  position: relative;
  z-index: 1;
}

.cosmic-stars {
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
  z-index: 0;
}

/* Estrellas flotantes */
.floating-stars {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: -1;
}

.floating-star {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.5;
  animation: twinkle 4s infinite ease-in-out;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 0.7; transform: scale(1.2); }
}

/* Ajuste para dispositivos móviles */
@media (max-width: 600px) {
  .contact-form-card {
    padding: 16px; /* Menos padding en móviles */
  }
  
  .v-col {
    padding: 6px 8px; /* Menos padding en las columnas */
  }
}
</style>