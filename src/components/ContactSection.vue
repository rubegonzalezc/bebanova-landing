<template>
  <v-container id="contacto" class="contact-section py-16">
    <div class="section-heading">
      <h2>Conversemos sobre tu <span class="accent">Proyecto</span></h2>
      <p class="text-subtitle-1">Estamos listos para ayudarte a navegar por el cosmos digital</p>
    </div>
    
    <v-row>
      <v-col cols="12" md="5" lg="4">
        <v-card class="contact-info-card" variant="flat">
          <v-card-title>Información de contacto</v-card-title>
          <v-card-text>
            <p>Contáctanos a través de los siguientes medios o completa el formulario:</p>
            
            <v-list density="comfortable" class="contact-list mt-4">
              <v-list-item prepend-icon="mdi-email" title="info@galaxtech.com"></v-list-item>
              <v-list-item prepend-icon="mdi-phone" title="+1 (555) 123-4567"></v-list-item>
              <v-list-item prepend-icon="mdi-map-marker" title="Av. Galaxia 123, Ciudad Espacial"></v-list-item>
            </v-list>
            
            <div class="d-flex gap-2 mt-6">
              <v-btn variant="text" icon="mdi-linkedin" color="accent"></v-btn>
              <v-btn variant="text" icon="mdi-github" color="accent"></v-btn>
              <v-btn variant="text" icon="mdi-twitter" color="accent"></v-btn>
              <v-btn variant="text" icon="mdi-instagram" color="accent"></v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="7" lg="8">
        <v-card class="contact-form-card" variant="flat">
          <v-form ref="form" @submit.prevent="submitForm">
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
                  <v-icon end>mdi-send</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
        
        <v-dialog v-model="formSuccess" max-width="400">
          <v-card class="success-card text-center pa-6">
            <v-avatar color="accent" size="80" class="mb-4">
              <v-icon size="x-large" color="white">mdi-check</v-icon>
            </v-avatar>
            <h3 class="text-h5 mb-2">¡Mensaje enviado con éxito!</h3>
            <p class="mb-4">Nos pondremos en contacto contigo a la brevedad.</p>
            <v-btn color="accent" @click="formSuccess = false">Aceptar</v-btn>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = ref(null)
const loading = ref(false)
const formSuccess = ref(false)

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
}

.contact-info-card, .contact-form-card {
  background: rgba(11, 29, 81, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  height: 100%;
  color: #E1E5F2;
}

.contact-info-card .v-card-title,
.contact-form-card .v-card-title {
  color: #E1E5F2;
  font-weight: bold;
}

.contact-info-card .v-card-text,
.contact-form-card .v-card-text,
.contact-info-card p,
.contact-form-card p {
  color: rgba(225, 229, 242, 0.9);
}

/* Estilos para la lista de contacto */
.contact-list {
  background-color: transparent !important;
}

.contact-list .v-list-item {
  background-color: transparent !important;
  min-height: 40px;
}

.contact-list .v-list-item__title {
  color: #E1E5F2 !important;
}

.contact-list .v-icon {
  color: var(--accent) !important;
}

/* Estilos para los campos del formulario */
.contact-field {
  color: #E1E5F2 !important;
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

/* Botón cósmico */
.cosmic-btn {
  position: relative;
  overflow: hidden;
}

.cosmic-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, var(--accent), var(--accent-alt));
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;
}

.cosmic-btn:hover::before {
  opacity: 0.2;
}

/* Tarjeta de éxito */
.success-card {
  background: rgba(11, 29, 81, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #E1E5F2;
}

.success-card h3 {
  color: #E1E5F2;
}

.success-card p {
  color: rgba(225, 229, 242, 0.9);
}
</style>