<script setup lang="ts">
import { ref, computed, onMounted} from 'vue'
import ThreeScene from './ThreeScene.vue' // For single model
import ModelCarousel from './ModelCarousel.vue' // For multiple models
import ScreenshotTool from './ScreenshotTool.vue'
import { nextTick } from 'vue'
const modelScreenshots = ref<string[]>([])

const props = defineProps<{
  modelSources?: string[]
  previewImg: string[]
  enableScreenshot?: boolean
  modelDefaultSize: number
  textModel?: string[]; // New prop for per-model dialog text
}>()
const modelSources = computed(() => {
  return props.modelSources || [];
});

const textModel = computed(() => {
  return props.textModel || [];
});

const isMultiModel = computed(() => modelSources.value.length > 1);

const sceneRef = ref(null) 
const carouselRef = ref<InstanceType<typeof ModelCarousel> | null>(null); 
const threeSceneRef = ref<InstanceType<typeof ThreeScene> | null>(null);

const emit = defineEmits(['screenshotTaken', 'modelIndexChanged'])

const modelLoaded = ref(false)
const showModel = ref(false)
const isRotating = ref(false)
const screenshotToolRef = ref(null)
const screenshotTaken = ref(false)
const containerRef = ref<HTMLDivElement | null>(null)
const shouldLoadModel = ref(false)

const currentModelIndex = ref(0);

const currentModelText = computed(() => {
  if (isMultiModel.value && textModel.value.length > 0) {
    return textModel.value[currentModelIndex.value] || '';
  }
  return '';
});

const handleModelLoaded = async () => {
  console.log('Model loaded event received')
  modelLoaded.value = true
  showModel.value = true

  if (props.enableScreenshot && !screenshotTaken.value) {
    if (isMultiModel.value) {
  
      await nextTick()
      const screenshots = await screenshotToolRef.value?.captureAllModelScreenshots()
      if (screenshots) {
        modelScreenshots.value = screenshots
        emit('screenshotTaken', screenshots)
      }
    } else {
    
      setTimeout(async () => {
        screenshotToolRef.value?.takeScreenshot()
      }, 3000)
    }
    screenshotTaken.value = true
  }
}
const handleRotationChange = (rotating: boolean) => {
  isRotating.value = rotating
}

const handleScreenshotTaken = (dataUrl: string) => {
  console.log('Screenshot taken callback received')
  screenshotTaken.value = true
  emit('screenshotTaken', dataUrl)
}

onMounted(() => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            shouldLoadModel.value = true
          }
        })
      },
      {
        rootMargin: '200px', 
        threshold: 0.1, 
      },
    )

    if (containerRef.value) {
      observer.observe(containerRef.value)
    }
  } else {
    shouldLoadModel.value = true
  }
  emit('modelIndexChanged', currentModelIndex.value);
})
const nextModel = () => {
  if (carouselRef.value && isMultiModel.value) {
    carouselRef.value.nextModel();
    currentModelIndex.value = (currentModelIndex.value + 1) % modelSources.value.length;
    emit('modelIndexChanged', currentModelIndex.value); 
  }
}

const prevModel = () => {
  if (carouselRef.value && isMultiModel.value) {
    currentModelIndex.value =
      (currentModelIndex.value - 1 + modelSources.value.length) % modelSources.value.length;
    carouselRef.value.previousModel();
    emit('modelIndexChanged', currentModelIndex.value); 
  }
}

defineExpose({ nextModel, prevModel });
</script>

<template>
  <div 
    class="model-container" 
    ref="containerRef"
  >
    <div class="image-overlay" :class="{ 'fade-out': showModel }">
       <img :src="previewImg[0]" alt="Model Preview" class="preview-image" loading="lazy" />
    </div>    

    <div v-if="isMultiModel && shouldLoadModel" class="carousel-controls">
    </div>

    <template v-if="shouldLoadModel">
      <ModelCarousel
        v-if="isMultiModel"
        ref="carouselRef"
        :modelSources="modelSources"
        :previewImgs="previewImg"
        :modelDefaultSize="modelDefaultSize"
        @model-loaded="handleModelLoaded"
        @rotation-change="handleRotationChange"
        @model-changed="(index) => {
    console.log('Model changed to index:', index); // Debugging
    nextTick(() => {
      currentModelIndex = index; // Update after DOM updates
      emit('modelIndexChanged', currentModelIndex);
    });
  }"
        class="viewer-component"
      />
         <ThreeScene
            v-else-if="modelSources.length === 1"
            ref="threeSceneRef"
            :modelSrc="modelSources[0]" :modelDefaultSize="modelDefaultSize"
            :autoRotate="true"
            @model-loaded="handleModelLoaded"
            @rotation-change="handleRotationChange"
             class="viewer-component"
          />
    </template>

    <ScreenshotTool
      v-if="enableScreenshot && shouldLoadModel"
      ref="screenshotToolRef"
      :scene="isMultiModel ? carouselRef : threeSceneRef"
      :enableScreenshot="!!enableScreenshot"
      :model-count="isMultiModel ? modelSources.length : undefined"
      @screenshot-taken="handleScreenshotTaken"
    />
  </div>
</template>

<style scoped>
.model-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.viewer-component {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5; 
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: opacity 0.5s ease-out;
  pointer-events: none; 
}

.image-overlay.fade-out {
  opacity: 0;
  z-index: -1;
}

.preview-image {
   max-width: 100%;
   max-height: 100%;
   object-fit: contain;
   will-change: transform;
}

.carousel-controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 25;
  pointer-events: none;
}

.arrow {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 1.5em;
  pointer-events: auto;
  z-index: 50;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.left-arrow {
  left: -30px; }

.right-arrow {
  right: -30px;
}

.carousel-controls .model-info-dialog {
  position: absolute;
  bottom: -130px; 
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 1em;
  pointer-events: auto;
  text-align: center;
  max-width: 90%; 
  overflow-wrap: break-word; 
  word-wrap: break-word;
  white-space: normal; 
}
</style>