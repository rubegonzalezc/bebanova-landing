<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const props = defineProps<{
  modelSrc: string
  modelDefaultSize: number
  autoRotate?: boolean
}>()

const emit = defineEmits(['model-loaded', 'rotation-change'])

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)
const loadingProgress = ref(0)
const isUserInteracting = ref(false)
const isSetupComplete = ref(false)
const isModelLoaded = ref(false)
const isFullyVisible = ref(false)
const popAnimationStarted = ref(false)
const popAnimationComplete = ref(false)

const isActive = ref(true)
const isVisible = ref(true)

let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let controls: OrbitControls | null = null
let animationFrameId: number | null = null
let model: THREE.Object3D | null = null
let autoRotateSpeed = 0.5
let autoRotating = false 
let modelAppearTime = 0
let mixers: THREE.AnimationMixer[] = []
let clock = new THREE.Clock()

const lerpFactor = 0.05
const targetScale = new THREE.Vector3(1, 1, 1)

const defaultCameraPosition = new THREE.Vector3()
const defaultCameraTarget = new THREE.Vector3(0, 0, 0)
const cameraReturning = ref(false)

const animate = (time: number) => {
  if (!renderer || !scene || !camera || !isActive.value) return

  animationFrameId = requestAnimationFrame(animate)

  const delta = clock.getDelta()
  mixers.forEach((mixer) => mixer.update(delta))

  if (model && isModelLoaded.value && isFullyVisible.value && !popAnimationStarted.value) {
    if (modelAppearTime === 0) {
      modelAppearTime = time
    }

    if (time - modelAppearTime > 1000) {
      popAnimationStarted.value = true

      targetScale.set(
        props.modelDefaultSize * 1.1, 
        props.modelDefaultSize * 1.1,
        props.modelDefaultSize * 1.1,
      )

      setTimeout(() => {
        if (model) {
          targetScale.set(props.modelDefaultSize, props.modelDefaultSize, props.modelDefaultSize)
          popAnimationComplete.value = true
          autoRotating = props.autoRotate !== false
        }
      }, 400) 
    }
  }

  if (autoRotating && model && isVisible.value && popAnimationComplete.value) {
    model.rotation.y += autoRotateSpeed * 0.01
  }

  if (model) {
    if (popAnimationStarted.value && !popAnimationComplete.value) {
      model.scale.lerp(targetScale, 0.15)
    } else {
      model.scale.lerp(targetScale, 0.05)
    }
  }

  if (cameraReturning.value && camera && controls) {
    const currentPosition = new THREE.Vector3().copy(camera.position)
    const currentDistance = currentPosition.length()
    const defaultDistance = defaultCameraPosition.length()

    const currentDirection = currentPosition.clone().normalize()
    const defaultDirection = new THREE.Vector3().copy(defaultCameraPosition).normalize()

    const currentQuat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      currentDirection,
    )
    const targetQuat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      defaultDirection,
    )

    const slerpFactor = 0.01
    currentQuat.slerp(targetQuat, slerpFactor)

    const newDirection = new THREE.Vector3(0, 0, 1).applyQuaternion(currentQuat)

    const distanceFactor = 0.01
    const newDistance = currentDistance * (1 - distanceFactor) + defaultDistance * distanceFactor

    camera.position.copy(newDirection.multiplyScalar(newDistance))
    controls.target.lerp(defaultCameraTarget, 0.01)
    autoRotating = true
    if (camera.position.distanceTo(defaultCameraPosition) < 0.01) {
      cameraReturning.value = false
        
    }
  }

  controls?.update()
  renderer.render(scene, camera)
}

const render = () => {
  if (renderer && scene && camera) {
    renderer.render(scene, camera)
    return renderer.domElement
  }
  return null
}

const initThree = () => {
  if (!canvasRef.value || !containerRef.value) return

  const container = containerRef.value
  const width = container.clientWidth
  const height = container.clientHeight

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 5
  defaultCameraPosition.copy(camera.position)

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    precision: 'mediump',
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.1
  controls.enableZoom = false
  controls.enablePan = false

  targetScale.set(props.modelDefaultSize, props.modelDefaultSize, props.modelDefaultSize)

  controls.addEventListener('start', () => {
    isUserInteracting.value = true
    emit('rotation-change', true)

    cameraReturning.value = false
    autoRotating = false

    if (model) {
      targetScale.set(
        props.modelDefaultSize * 1.1,
        props.modelDefaultSize * 1.1,
        props.modelDefaultSize * 1.1,
      )
    }
  })

  controls.addEventListener('end', () => {
    isUserInteracting.value = false
    emit('rotation-change', false)

    targetScale.set(props.modelDefaultSize, props.modelDefaultSize, props.modelDefaultSize)

    cameraReturning.value = true

  })

  if (props.modelSrc) {
    loadModel(props.modelSrc)
  }

  const handleResize = () => {
    if (!camera || !renderer || !containerRef.value || !isActive.value) return
    const container = containerRef.value
    const width = container.clientWidth
    const height = container.clientHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)

    renderer.render(scene, camera)
  }

  window.addEventListener('resize', handleResize)
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  isSetupComplete.value = true
  animationFrameId = requestAnimationFrame(animate)
}

const loadModel = (modelSrc: string) => {
  if (!scene || !camera) return

  loadingProgress.value = 0
  isModelLoaded.value = false

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/') 

  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader) 

  loader.load(
    modelSrc,
    (gltf) => {
      if (model && scene) {
        scene.remove(model)
        mixers = []
      }

      model = gltf.scene

      if (gltf.animations && gltf.animations.length > 0) {
        const mixer = new THREE.AnimationMixer(model)
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play()
        })
        mixers.push(mixer)
      }

      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh

          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((mat) => {
                if (mat.map) mat.map.anisotropy = 4
              })
            } else {
              if (mesh.material.map) mesh.material.map.anisotropy = 4
            }
          }

          if (mesh.geometry) {
            mesh.geometry.computeBoundingSphere()
            mesh.frustumCulled = true
          }
        }
      })

      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      model.position.sub(center)

      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const fov = camera!.fov * (Math.PI / 180)
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
      cameraZ *= 1.5
      camera!.position.z = cameraZ

      defaultCameraPosition.copy(camera!.position)

      camera!.near = cameraZ / 100
      camera!.far = cameraZ * 100
      camera!.updateProjectionMatrix()

      scene!.add(model)

      model.scale.set(props.modelDefaultSize, props.modelDefaultSize, props.modelDefaultSize)
      targetScale.set(props.modelDefaultSize, props.modelDefaultSize, props.modelDefaultSize)

      initialZoomDone = false
      modelAppearTime = performance.now()

      loadingProgress.value = 100
      isModelLoaded.value = true

      autoRotating = props.autoRotate !== false

      emit('model-loaded')

      if (renderer && scene && camera) {
        renderer.render(scene, camera)
      }
    },
    (xhr) => {
      if (xhr.total) {
        loadingProgress.value = (xhr.loaded / xhr.total) * 100
      }
    },
    (error) => {
      console.error('Error loading model:', error)
      loadingProgress.value = 0
    },
  )
}

onMounted(() => {
  initThree()

  if ('IntersectionObserver' in window) {
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isActive.value = entry.isIntersecting
          isVisible.value = entry.isIntersecting

          if (entry.isIntersecting && isSetupComplete.value) {
            clock.start()

            if (!animationFrameId) {
              animationFrameId = requestAnimationFrame(animate)
            }
          }
          else if (!entry.isIntersecting) {
            if (animationFrameId !== null) {
              cancelAnimationFrame(animationFrameId)
              animationFrameId = null
            }
            clock.stop()

            isFullyVisible.value = false
          }
        })
      },
      { threshold: 0.1 }, 
    )

    const fullyVisibleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isFullyVisible.value = entry.isIntersecting

          if (!entry.isIntersecting) {
            if (!popAnimationStarted.value) {
              modelAppearTime = 0
            }
          }
        })
      },
      { threshold: 0.8 }, 
    )

    if (containerRef.value) {
      visibilityObserver.observe(containerRef.value)
      fullyVisibleObserver.observe(containerRef.value)
    }

    onBeforeUnmount(() => {
      visibilityObserver.disconnect()
      fullyVisibleObserver.disconnect()
    })
  }
})

watch(
  () => props.modelSrc,
  (newSrc) => {
    if (newSrc && scene && isActive.value) {
      popAnimationStarted.value = false
      popAnimationComplete.value = false
      modelAppearTime = 0
      isModelLoaded.value = false
      autoRotating = false

      loadModel(newSrc)
    }
  },
)
watch(
  () => props.autoRotate,
  (newValue) => {
    if (!isUserInteracting.value) {
      autoRotating = newValue !== false
    }
  },
)

onBeforeUnmount(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }

  if (model) {
    disposeObject(model)
    model = null
  }

  if (renderer) {
    renderer.dispose()
    renderer = null
  }

  if (controls) {
    controls.dispose()
    controls = null
  }

  scene = null
  camera = null
  mixers = []
})

const disposeObject = (obj: THREE.Object3D) => {
  if (!obj) return

  while (obj.children.length > 0) {
    disposeObject(obj.children[0])
    obj.remove(obj.children[0])
  }

  if ((obj as THREE.Mesh).isMesh) {
    const mesh = obj as THREE.Mesh
    if (mesh.geometry) {
      mesh.geometry.dispose()
    }

    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => disposeMaterial(material))
      } else {
        disposeMaterial(mesh.material)
      }
    }
  }
}

const disposeMaterial = (material: THREE.Material) => {
  Object.keys(material).forEach((prop) => {
    if (material[prop] && material[prop].isTexture) {
      material[prop].dispose()
    }
  })

  material.dispose()
}

defineExpose({
  render,
  scene: () => scene,
  camera: () => camera,
  renderer: () => renderer,
})
</script>

<template>
  <div ref="containerRef" class="three-scene-container">
    <canvas ref="canvasRef" class="model-canvas"></canvas>
    <div v-if="loadingProgress > 0 && loadingProgress < 100" class="loading-indicator">
      Loading: {{ Math.round(loadingProgress) }}%
    </div>
  </div>
</template>

<style scoped>
.three-scene-container {
  position: relative;
  width: 100%;
  height: 100%;
  contain: content;
}

.model-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  will-change: transform;
}

.loading-indicator {
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-size: 0.875rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.25rem;
  z-index: 30;
}
</style>
