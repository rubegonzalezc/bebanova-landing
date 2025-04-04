<template>
  <v-container id="proceso" class="process-section py-16">
    <div class="section-heading">
      <h2>Nuestro <span class="accent">Proceso</span></h2>
      <p class="text-subtitle-1">Un viaje cósmico para llevar tu proyecto al éxito</p>
    </div>
    
    <v-timeline align="start" side="end" line-color="accent" line-inset="12">
      <v-timeline-item
        v-for="(step, i) in steps"
        :key="i"
        :dot-color="step.color"
        size="large"
        fill-dot
      >
        <template v-slot:icon>
          <v-avatar color="transparent">
            <v-icon :icon="step.icon" color="white"></v-icon>
          </v-avatar>
        </template>
        
        <v-card class="process-card" variant="flat">
          <v-card-title class="d-flex align-center">
            <div class="step-number me-2">{{ i + 1 }}</div>
            {{ step.title }}
          </v-card-title>
          <v-card-text>
            <p>{{ step.description }}</p>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script setup>
const steps = [
  {
    title: 'Consulta inicial',
    description: 'Exploramos el universo de tus necesidades y objetivos para entender completamente tu proyecto.',
    icon: 'mdi-message-text',
    color: 'accent'
  },
  {
    title: 'Planificación y propuesta',
    description: 'Trazamos la ruta estelar de tu proyecto y te presentamos un plan detallado para el viaje.',
    icon: 'mdi-clipboard-text',
    color: 'secondary'
  },
  {
    title: 'Desarrollo y prototipado',
    description: 'Creamos tu solución con un enfoque iterativo, manteniéndote en la órbita de comunicación constante.',
    icon: 'mdi-code-tags',
    color: 'accent-darken-1'
  },
  {
    title: 'Pruebas y ajustes',
    description: 'Exploramos meticulosamente cada rincón de la galaxia de tu producto para garantizar su calidad y funcionalidad.',
    icon: 'mdi-test-tube',
    color: 'secondary-darken-1'
  },
  {
    title: 'Entrega y soporte',
    description: 'Lanzamos tu solución final al universo digital y te brindamos soporte continuo en su travesía.',
    icon: 'mdi-rocket-launch',
    color: 'accent'
  }
]
</script>

<style scoped>
.process-section {
  position: relative;
  overflow: hidden;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--accent), var(--accent-alt));
  color: white;
  font-weight: bold;
}

.process-card {
  background: rgba(11, 29, 81, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.process-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(79, 195, 247, 0.3);
}

/* Constelación de fondo */
.process-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(2px 2px at 40px 70px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
    radial-gradient(2px 2px at 150px 150px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0)),
    radial-gradient(1px 1px at 260px 290px, rgba(255, 255, 255, 0.8), rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 500px 500px;
  opacity: 0.2;
  z-index: -1;
}
</style>