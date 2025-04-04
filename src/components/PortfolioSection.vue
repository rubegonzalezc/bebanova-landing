<template>
  <v-container id="portafolio" class="portfolio-section py-16">
    <div class="section-heading">
      <h2>Nuestro <span class="accent">Portafolio</span></h2>
      <p class="text-subtitle-1">Proyectos estelares que demuestran nuestra experiencia y calidad</p>
    </div>
    
    <v-row class="mb-6">
      <v-col cols="12" class="text-center">
        <v-chip-group
          v-model="selectedCategory"
          mandatory
          selected-class="selected-category"
        >
          <v-chip
            v-for="category in categories"
            :key="category.value"
            :value="category.value"
            variant="outlined"
            filter
            class="cosmic-chip ma-2"
          >
            <v-icon start :icon="category.icon"></v-icon>
            {{ category.title }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col 
        v-for="(project, index) in filteredProjects" 
        :key="project.id"
        cols="12" sm="6" lg="3"
        class="portfolio-item"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            class="portfolio-card"
            :class="{ 'on-hover': isHovering }"
            :style="{ animationDelay: `${index * 0.1}s` }"
            variant="flat"
          >
            <v-img
              :src="project.image"
              height="200"
              cover
              class="portfolio-image"
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate color="accent"></v-progress-circular>
                </div>
              </template>
              
              <div class="image-overlay d-flex align-center justify-center" v-if="isHovering">
                <v-btn
                  icon="mdi-eye"
                  variant="text"
                  color="white"
                  size="large"
                  @click.stop="openProjectDetails(project)"
                ></v-btn>
              </div>
            </v-img>
            
            <v-card-title>{{ project.title }}</v-card-title>
            
            <v-card-text>
              <p>{{ project.description }}</p>
              <v-chip-group>
                <v-chip
                  v-for="(tag, i) in project.tags"
                  :key="i"
                  size="small"
                  variant="flat"
                  class="mr-1 mb-1 tag-chip"
                >
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    
    <v-row class="mt-12">
      <v-col cols="12" class="text-center">
        <v-btn
          color="accent"
          size="large"
          variant="elevated"
          to="#contacto"
          class="cosmic-btn"
        >
          ¿Listo para tu proyecto?
          <v-icon end>mdi-rocket-launch</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    
    <!-- Modal de detalles del proyecto -->
    <v-dialog
      v-model="projectDialog"
      max-width="800"
    >
      <v-card class="project-details-card" v-if="selectedProject">
        <v-card-title class="text-h4">
          {{ selectedProject.title }}
          <v-btn icon="mdi-close" variant="text" @click="projectDialog = false" class="float-right"></v-btn>
        </v-card-title>
        
        <v-img
          :src="selectedProject.image"
          height="300"
          cover
        ></v-img>
        
        <v-card-text>
          <p class="text-body-1 my-4">{{ selectedProject.fullDescription || selectedProject.description }}</p>
          
          <div class="mt-4">
            <h3 class="text-h6 mb-2">Tecnologías utilizadas</h3>
            <v-chip-group>
              <v-chip
                v-for="(tech, i) in selectedProject.technologies"
                :key="i"
                class="mr-2 mb-2"
                variant="outlined"
              >
                {{ tech }}
              </v-chip>
            </v-chip-group>
          </div>
          
          <div class="mt-4" v-if="selectedProject.results">
            <h3 class="text-h6 mb-2">Resultados</h3>
            <p>{{ selectedProject.results }}</p>
          </div>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            @click="projectDialog = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="accent"
            @click="projectDialog = false"
            to="#contacto"
          >
            Contactar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('all')
const projectDialog = ref(false)
const selectedProject = ref(null)

const categories = [
  { title: 'Todos', value: 'all', icon: 'mdi-view-grid' },
  { title: 'Web', value: 'web', icon: 'mdi-web' },
  { title: 'Apps', value: 'app', icon: 'mdi-cellphone' },
  { title: '3D', value: '3d', icon: 'mdi-printer-3d' },
  { title: 'Capacitación', value: 'training', icon: 'mdi-school' }
]

const projects = [
  {
    id: 1,
    title: 'E-commerce Premium',
    description: 'Plataforma de comercio electrónico personalizada con integración de pagos y gestión de inventario.',
    fullDescription: 'Desarrollamos una plataforma completa de comercio electrónico para una tienda de productos premium. Implementamos un sistema de gestión de inventario en tiempo real, múltiples pasarelas de pago y una experiencia de usuario optimizada para maximizar las conversiones.',
    image: 'https://via.placeholder.com/600x400?text=E-commerce+Premium',
    category: 'web',
    tags: ['Diseño Web', 'E-commerce'],
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe API'],
    results: 'Incremento del 45% en ventas online y reducción del 30% en el tiempo de gestión de pedidos.'
  },
  {
    id: 2,
    title: 'App de Delivery',
    description: 'Aplicación móvil de entrega a domicilio con seguimiento en tiempo real y sistema de pedidos.',
    fullDescription: 'Creamos una aplicación móvil completa para un servicio de delivery local. Incluye seguimiento GPS en tiempo real, gestión de pedidos, múltiples métodos de pago y un panel de administración para el cliente.',
    image: 'https://via.placeholder.com/600x400?text=Delivery+App',
    category: 'app',
    tags: ['App Móvil', 'Flutter'],
    technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Stripe'],
    results: 'La aplicación ha procesado más de 10,000 pedidos en los primeros 3 meses con una calificación promedio de 4.8/5 estrellas.'
  },
  {
    id: 3,
    title: 'Prototipo Industrial',
    description: 'Diseño e impresión 3D de un prototipo funcional para el sector industrial.',
    fullDescription: 'Diseñamos e imprimimos un prototipo funcional para una pieza de maquinaria industrial. El proyecto incluyó modelado 3D de precisión, selección de materiales especiales resistentes a altas temperaturas y pruebas de estrés.',
    image: 'https://via.placeholder.com/600x400?text=Prototipo+3D',
    category: '3d',
    tags: ['Impresión 3D', 'Prototipado'],
    technologies: ['Fusion 360', 'Ultimaker S5', 'Materiales compuestos', 'Pruebas de estrés'],
    results: 'El prototipo redujo los costos de producción en un 60% y aceleró el tiempo de desarrollo en 8 semanas.'
  },
  {
    id: 4,
    title: 'Programa de Capacitación',
    description: 'Entrenamiento especializado en desarrollo web para una empresa tecnológica.',
    fullDescription: 'Desarrollamos un programa de capacitación personalizado para un equipo de desarrolladores en tecnologías web modernas. El programa incluyó módulos teóricos y prácticos, proyectos reales y mentoría continua.',
    image: 'https://via.placeholder.com/600x400?text=Capacitación+Web',
    category: 'training',
    tags: ['Capacitación', 'Desarrollo Web'],
    technologies: ['Vue.js', 'React', 'Node.js', 'AWS'],
    results: 'El equipo aumentó su productividad en un 35% y lanzó 3 nuevos proyectos aplicando las tecnologías aprendidas.'
  },
  {
    id: 5,
    title: 'Dashboard Analytics',
    description: 'Plataforma web para visualización de datos de analítica empresarial en tiempo real.',
    fullDescription: 'Desarrollamos un dashboard interactivo para visualización de datos empresariales que integra múltiples fuentes de datos y proporciona insights en tiempo real con gráficos personalizados y reportes automatizados.',
    image: 'https://via.placeholder.com/600x400?text=Analytics+Dashboard',
    category: 'web',
    tags: ['Dashboard', 'Analytics'],
    technologies: ['Vue.js', 'D3.js', 'GraphQL', 'PostgreSQL'],
    results: 'Reducción del 40% en el tiempo de toma de decisiones gracias a la centralización de datos y visualizaciones en tiempo real.'
  },
  {
    id: 6,
    title: 'App de Fitness',
    description: 'Aplicación móvil personalizada para seguimiento de entrenamientos y nutrición.',
    fullDescription: 'Diseñamos y desarrollamos una aplicación móvil completa para el seguimiento de entrenamientos y nutrición con planes personalizados, seguimiento de progreso y sincronización con dispositivos wearables.',
    image: 'https://via.placeholder.com/600x400?text=Fitness+App',
    category: 'app',
    tags: ['App Móvil', 'Salud'],
    technologies: ['React Native', 'Firebase', 'HealthKit', 'Google Fit'],
    results: '20,000 descargas en el primer trimestre con una tasa de retención del 68%.'
  },
  {
    id: 7,
    title: 'Maqueta Arquitectónica',
    description: 'Diseño e impresión 3D de una maqueta arquitectónica de alta precisión.',
    fullDescription: 'Creamos una maqueta arquitectónica detallada para un proyecto de construcción utilizando diseño e impresión 3D de alta precisión. El proyecto incluyó elementos interiores y exteriores minuciosamente detallados.',
    image: 'https://via.placeholder.com/600x400?text=Maqueta+Arquitectónica',
    category: '3d',
    tags: ['Impresión 3D', 'Arquitectura'],
    technologies: ['AutoCAD', 'Prusa i3 MK3', 'Resina especializada', 'Acabados artísticos'],
    results: 'La maqueta fue crucial para obtener la aprobación del proyecto, destacando por su nivel de detalle y precisión.'
  },
  {
    id: 8,
    title: 'Taller de Innovación',
    description: 'Programa de capacitación en innovación y metodologías ágiles para equipo directivo.',
    fullDescription: 'Diseñamos y facilitamos un taller intensivo de innovación y metodologías ágiles para el equipo directivo de una empresa de tecnología, enfocado en transformación digital y desarrollo de productos.',
    image: 'https://via.placeholder.com/600x400?text=Taller+Innovación',
    category: 'training',
    tags: ['Capacitación', 'Innovación'],
    technologies: ['Design Thinking', 'Lean Startup', 'Scrum', 'Kanban'],
    results: 'El equipo implementó nuevos procesos que aceleraron el tiempo de lanzamiento de productos en un 30%.'
  }
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return projects
  } else {
    return projects.filter(project => project.category === selectedCategory.value)
  }
})

const openProjectDetails = (project) => {
  selectedProject.value = project
  projectDialog.value = true
}
</script>

<style scoped>
.portfolio-section {
  position: relative;
}

.cosmic-chip {
  background: rgba(11, 29, 81, 0.6);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.cosmic-chip:hover, .cosmic-chip.selected-category {
  background: rgba(79, 195, 247, 0.2);
  border-color: var(--accent);
  box-shadow: 0 0 10px rgba(79, 195, 247, 0.3);
}

.portfolio-card {
  background: rgba(11, 29, 81, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
  animation: fadeInUp 0.6s both;
  height: 100%;
}

.portfolio-card.on-hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(79, 195, 247, 0.3);
}

.portfolio-image {
  position: relative;
  transition: all 0.4s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(11, 29, 81, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portfolio-card.on-hover .image-overlay {
  opacity: 1;
}

.tag-chip {
  background: rgba(94, 53, 177, 0.2);
  color: var(--light);
  font-size: 0.75rem;
}

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
  transition: opacity 0.3s ease;
  z-index: -1;
}

.cosmic-btn:hover::before {
  opacity: 0.2;
}

.project-details-card {
  background: rgba(11, 29, 81, 0.9);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>