<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  scene: any
  enableScreenshot: boolean
  modelCount?: number 
}>()
const capturedScreenshots = ref<string[]>([])

const emit = defineEmits(['screenshot-taken'])
const screenshotTaken = ref(false)

const captureAllModelScreenshots = async () => {
  if (!props.scene || !props.modelCount) return
  
  const originalIndex = props.scene.getCurrentIndex()
  const { originalSizes, originalPositions } = await props.scene.prepareScreenshotCapture()

  try {
    for (let i = 0; i < props.modelCount; i++) {
      await props.scene.switchToModel(i)
      await waitForModelSettled(props.scene, i)
      
      // Isolate current model and set high-res rendering
      await props.scene.isolateCurrentModel()
      const dataUrl = await captureHighResScreenshot(2048)
      
      if (dataUrl) {
        triggerDownload(dataUrl, `model-${i + 1}-hd.png`)
        await new Promise(resolve => setTimeout(resolve, 300))
      }
      
      await props.scene.restoreSceneState()
    }
  } finally {
    await props.scene.switchToModel(originalIndex)
    await props.scene.restoreOriginalSizes(originalSizes, originalPositions)
  }
}
const waitForModelSettled = async (scene, index, timeout = 3000) => {
  const start = Date.now()
  return new Promise((resolve) => {
    const check = () => {
      const modelData = scene.getModelData(index)
      if (!modelData) return resolve(true)
      
      const positionDiff = modelData.model.position.distanceTo(modelData.targetPosition)
      const rotationDiff = modelData.model.quaternion.angleTo(modelData.targetQuaternion)
      
      if (positionDiff < 0.01 && rotationDiff < 0.01) {
        resolve(true)
      } else if (Date.now() - start > timeout) {
        console.warn(`Timeout waiting for model ${index} to settle`)
        resolve(true)
      } else {
        requestAnimationFrame(check)
      }
    }
    check()
  })
}
const captureHighResScreenshot = async (resolution = 2048) => {
  const renderer = props.scene.renderer()
  const originalSize = {
    width: renderer.domElement.width,
    height: renderer.domElement.height
  }
  
  // Set high-res render size
  const scale = resolution / Math.max(originalSize.width, originalSize.height)
  renderer.setSize(
    originalSize.width * scale,
    originalSize.height * scale,
    false 
  )
  
  // Wait for resize and final render
  const dataUrl = await new Promise<string>(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        try {
          renderer.render(props.scene.scene(), props.scene.camera())
          resolve(renderer.domElement.toDataURL('image/png'))
        } catch (error) {
          console.error('High-res capture failed:', error)
          resolve('')
        }
      })
    })
  })
  
  // Restore original size
  renderer.setSize(originalSize.width, originalSize.height, false)
  return dataUrl
}
const isValidImage = (dataUrl: string) => {
  return dataUrl && dataUrl.length > 5000 
}
const isCanvasPainted = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('webgl2') || canvas.getContext('webgl')
  if (!context) return false
  
  // Check if canvas has non-transparent pixels
  const pixels = new Uint8Array(4)
  context.readPixels(0, 0, 1, 1, context.RGBA, context.UNSIGNED_BYTE, pixels)
  return pixels[3] !== 0 
}


const captureCurrentModel = async () => {
  return new Promise<string>((resolve) => {
    try {
      const renderer = props.scene.renderer()
      const scene = props.scene.scene()
      const camera = props.scene.camera()

      renderer.setSize(renderer.domElement.width, renderer.domElement.height)
      renderer.clear()
      renderer.render(scene, camera)
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          try {
            const dataUrl = renderer.domElement.toDataURL('image/png')
            resolve(dataUrl || '')
          } catch (error) {
            console.error('DataURL conversion failed:', error)
            resolve('')
          }
        })
      })
    } catch (error) {
      console.error('Capture error:', error)
      resolve('')
    }
  })
}

const triggerDownload = (dataUrl: string, filename: string) => {
  if (!dataUrl) return
  
  try {
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    setTimeout(() => document.body.removeChild(link), 1000)
  } catch (error) {
    console.error('Download failed:', error)
  }
}
// Take screenshot when model is fully rendered
const takeScreenshot = async () => {
  if (screenshotTaken.value) return
  const dataUrl = await captureCurrentModel()
  emit('screenshot-taken', dataUrl)
  screenshotTaken.value = true
}

defineExpose({
  takeScreenshot,
  captureAllModelScreenshots
})
</script>

<template>
</template>
