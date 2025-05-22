<script setup lang="ts">
import { defineOptions, ref, shallowRef, computed, watch, onMounted, onBeforeUnmount, nextTick, PropType } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
defineOptions({
  inheritAttrs: false
})
const prepareScreenshotCapture = () => {
  const state = {
    originalSizes: modelData.map(d => d?.targetScale.clone()),
    originalPositions: modelData.map(d => d?.targetPosition.clone())
  }
  
  modelData.forEach((data, index) => {
    if (data && index !== currentModelIndex.value) {
      data.targetPosition.set(1000, 1000, 1000)
      data.targetScale.set(0.0001, 0.0001, 0.0001)
    }
  })
  
  return state
}

const isolateCurrentModel = () => {
  modelData.forEach((data, index) => {
    if (data && index !== currentModelIndex.value) {
      data.model.visible = false
      if (data.placeholder) data.placeholder.visible = false
    }
  })
}

const restoreSceneState = () => {
  modelData.forEach(data => {
    if (data) {
      data.model.visible = true
      if (data.placeholder) data.placeholder.visible = true
    }
  })
}

const restoreOriginalSizes = (sizes, positions) => {
  modelData.forEach((data, index) => {
    if (data) {
      data.targetScale.copy(sizes[index])
      data.targetPosition.copy(positions[index])
    }
  })
}
const props = defineProps({
  modelSources: { type: Array as PropType<string[]>, required: true },
  previewImgs: { type: Array as PropType<string[]>, required: true },
  modelDefaultSize: { type: Number, default: 1 },
  autoRotate: { type: Boolean, default: true },
  animationSpeed: { type: Number, default: 0.08 },
  curveRadius: { type: Number, default: 5 },
  angleSeparation: { type: Number, default: 25 },
  scaleMultiplier: { type: Number, default: 0.01 }, 
  rotationSensitivity: { type: Number, default: 2.5 }, 
  enableScreenshot: { type: Boolean, default: false },
})

const emit = defineEmits(['model-loaded', 'rotation-change', 'model-switch', 'model-changed'])

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

const loadingProgress = ref(0)
const modelsLoadedCount = ref(0)
const totalModels = computed(() => props.modelSources.length)
const isFullyLoaded = ref(false)
const showLoadingError = computed(() => {
    const models = loadedModels.value;
    return !isFullyLoaded.value &&
           modelsLoadedCount.value === totalModels.value &&
           totalModels.value > 0 &&
           Array.isArray(models) &&
           models.length === 0;
});
const isLoadingModels = ref(false);


const isUserInteracting = ref(false)
const isDraggingModel = ref(false) 
const isSetupComplete = ref(false)


const isActive = ref(true) 
const isVisible = ref(true) 
const autoRotating = ref(props.autoRotate) 
const interactionEnded = ref(true); 


let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let controls: OrbitControls | null = null
let animationFrameId: number | null = null
let clock = new THREE.Clock()
let raycaster: THREE.Raycaster | null = null;
const pointer = new THREE.Vector2();
let previousPointerX = 0;
let needsRender = false; 

const loadedModels = shallowRef<THREE.Object3D[]>([])
const textureLoader = new THREE.TextureLoader();
let modelData: ({
    model: THREE.Object3D;
    placeholder: THREE.Mesh | null;
    texture: THREE.Texture | null;
    size: THREE.Vector3;
    center: THREE.Vector3;
    targetPosition: THREE.Vector3;
    targetQuaternion: THREE.Quaternion; 
    placeholderTargetQuaternion: THREE.Quaternion; 
    targetScale: THREE.Vector3;
    isModelActiveInScene: boolean;
} | null)[] = [];
const currentModelIndex = ref(0)
const interactionScaleBoostFactor = 1.05;

const centerModelTargetScale = ref(new THREE.Vector3(props.modelDefaultSize, props.modelDefaultSize, props.modelDefaultSize))


const animate = () => {
    if (!renderer || !scene || !camera || !controls || !isActive.value) {
        animationFrameId = requestAnimationFrame(animate);
        return;
    }

    animationFrameId = requestAnimationFrame(animate);
    const delta = clock.getDelta();
    let frameNeedsRender = needsRender; 
    needsRender = false; 

    const controlsUpdated = controls.update();
    if (controlsUpdated) frameNeedsRender = true;

    if (isFullyLoaded.value) {
        modelData.forEach((data, index) => {
            if (!data) return; 

           
            const currentObject = data.isModelActiveInScene ? data.model : data.placeholder;
            if (!currentObject) return;

            const isCurrentCenterModel = index === currentModelIndex.value && data.isModelActiveInScene;

            if (!currentObject.position.equals(data.targetPosition)) {
                currentObject.position.lerp(data.targetPosition, props.animationSpeed);
                if (currentObject.position.distanceTo(data.targetPosition) < 0.001) {
                    currentObject.position.copy(data.targetPosition);
                }
                frameNeedsRender = true;
            }

            const currentTargetQuaternion = data.isModelActiveInScene
                ? data.targetQuaternion 
                : data.placeholderTargetQuaternion;

           
            const shouldSlerpRotation = !isCurrentCenterModel || (!isDraggingModel.value && !autoRotating.value);

            if (shouldSlerpRotation) {
                 if (!currentObject.quaternion.equals(currentTargetQuaternion)) {
                     currentObject.quaternion.slerp(currentTargetQuaternion, props.animationSpeed); // Slerp towards the correct target
                     if (currentObject.quaternion.angleTo(currentTargetQuaternion) < 0.005) {
                         currentObject.quaternion.copy(currentTargetQuaternion);
                     }
                     frameNeedsRender = true;
                 }
            }

            let finalTargetScale = data.targetScale.clone();

            if (isCurrentCenterModel && isUserInteracting.value && !isDraggingModel.value) {
                const boostedSize = props.modelDefaultSize * interactionScaleBoostFactor;
                finalTargetScale.set(boostedSize, boostedSize, boostedSize);
            }

            if (!currentObject.scale.equals(data.targetScale)) {
                currentObject.scale.lerp(data.targetScale, props.animationSpeed);
                if (currentObject.scale.distanceTo(data.targetScale) < 0.001) {
                    currentObject.scale.copy(data.targetScale);
                }
                frameNeedsRender = true;
            }

            if (isCurrentCenterModel && props.autoRotate && autoRotating.value && isVisible.value && !isUserInteracting.value && interactionEnded.value && !isDraggingModel.value) {
                 const rotationY = 0.5 * delta;
                 const incrementalRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotationY);
                 currentObject.quaternion.premultiply(incrementalRotation);
                 data.targetQuaternion.copy(currentObject.quaternion);
                 frameNeedsRender = true;
            }
        });
    }

    if (frameNeedsRender) {
        renderer.render(scene, camera);
    }
}


function onPointerDown(event: PointerEvent) {
    const currentData = modelData[currentModelIndex.value];
    if (!camera || !isFullyLoaded.value || !currentData || !currentData.model || !currentData.isModelActiveInScene || !raycaster || !containerRef.value) {
        return; 
    }

    const rect = containerRef.value.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(currentData.model, true);

    if (intersects.length > 0) {
        //event.preventDefault();
        isDraggingModel.value = true;
        isUserInteracting.value = true;
        interactionEnded.value = false;
        autoRotating.value = false;
        previousPointerX = event.clientX;

        if(controls) controls.enabled = false;
        if (containerRef.value) containerRef.value.style.cursor = 'grabbing';
    }
}

function onPointerMove(event: PointerEvent) {
    if (!isDraggingModel.value) return;

    const centralModelData = modelData[currentModelIndex.value];
    if (!centralModelData?.model) {
        onPointerUpOrLeave(event); 
        return;
    }

    //event.preventDefault(); 

    const currentPointerX = event.clientX;
    const deltaX = currentPointerX - previousPointerX;
    previousPointerX = currentPointerX;

    const rotationAngle = (deltaX / (containerRef.value?.clientWidth ?? window.innerWidth)) * Math.PI * props.rotationSensitivity;

    const model = centralModelData.model;
    const targetQuat = centralModelData.targetQuaternion;

    const incrementalRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotationAngle);
    model.quaternion.premultiply(incrementalRotation);

    targetQuat.copy(model.quaternion);

    needsRender = true;
}

function onPointerUpOrLeave(event: PointerEvent) {
    if (isDraggingModel.value) {
        isDraggingModel.value = false;

        if(controls) controls.enabled = true; 
        if (containerRef.value) containerRef.value.style.cursor = 'grab'; 

        handleInteractionEnd();
    }
}

function handleInteractionEnd() {
    if (!isDraggingModel.value && isUserInteracting.value) {
        isUserInteracting.value = false;
        emit('rotation-change', false); 

        setTimeout(() => {
            interactionEnded.value = true; 
            if (props.autoRotate && !isUserInteracting.value) {
                autoRotating.value = true;
            }
        }, controls && controls.dampingFactor > 0 ? 150 : 50); 
    }
}


const initThree = () => {
  if (!canvasRef.value || !containerRef.value) return;
  const container = containerRef.value
  const width = container.clientWidth
  const height = container.clientHeight

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({
  canvas: canvasRef.value,
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: props.enableScreenshot,
  powerPreference: 'high-performance'
})
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
  scene.add(ambientLight)
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5)
  directionalLight1.position.set(5, 10, 7.5)
  scene.add(directionalLight1)
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight2.position.set(-5, 5, -7.5)
  scene.add(directionalLight2)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.enableRotate = false; 
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  
    controls.enabled = false; 
    controls.dispose();

  raycaster = new THREE.Raycaster();

  canvasRef.value?.addEventListener('pointerdown', onPointerDown, { passive: false }); 
  window.addEventListener('pointermove', onPointerMove, { passive: false });
  window.addEventListener('pointerup', onPointerUpOrLeave);
  canvasRef.value?.addEventListener('lostpointercapture', onPointerUpOrLeave);

  controls.addEventListener('start', () => {
    if (!isDraggingModel.value) {
        isUserInteracting.value = true;
        interactionEnded.value = false;
        autoRotating.value = false; 
        emit('rotation-change', true);
    }
  });
  controls.addEventListener('end', () => {
    if (!isDraggingModel.value) { 
        handleInteractionEnd();
    }
  });

  const handleResize = () => {
    if (!camera || !renderer || !containerRef.value || !isActive.value) return
    const width = containerRef.value.clientWidth
    const height = containerRef.value.clientHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    needsRender = true; 
  }
  window.addEventListener('resize', handleResize)

  const logCameraState = (event: MouseEvent) => {
      if (event.detail > 0 && event.type === 'click') { 
         if (camera) {
              const pos = camera.position;
              const rot = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ');
              console.log(
                  `Camera State: \n` +
                  `  Position: x=${pos.x.toFixed(2)}, y=${pos.y.toFixed(2)}, z=${pos.z.toFixed(2)}\n` +
                  `  Rotation: x=${THREE.MathUtils.radToDeg(rot.x).toFixed(1)}°, y=${THREE.MathUtils.radToDeg(rot.y).toFixed(1)}°, z=${THREE.MathUtils.radToDeg(rot.z).toFixed(1)}°`
              );
          }
      }
  };
  containerRef.value?.addEventListener('click', logCameraState);


  onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
      containerRef.value?.removeEventListener('click', logCameraState);
      canvasRef.value?.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUpOrLeave);
      canvasRef.value?.removeEventListener('lostpointercapture', onPointerUpOrLeave);
  });

  isSetupComplete.value = true;
  if (props.modelSources.length > 0) {
      loadAllModels();
  } else {
      console.warn("No model sources provided.");
      isFullyLoaded.value = true;
  }
  startAnimationLoop(); 
}

const loadAllModels = async () => {
    if (isLoadingModels.value) {
        console.warn("Model loading already in progress. Skipping new request.");
        return;
    }
    if (!scene || !camera || !isSetupComplete.value) {
        console.warn("Scene/Camera not ready, cannot load models yet.");
        return; 
    }

    isLoadingModels.value = true;
    console.log("Starting model load process...");

    const wasAnimating = animationFrameId !== null;
    stopAnimationLoop(); 
    cleanupModels(); 
    isFullyLoaded.value = false;
    loadingProgress.value = 0;
    modelsLoadedCount.value = 0;
    const loadedGltfData: ({ gltfScene: THREE.Object3D; index: number } | null)[] = new Array(props.modelSources.length).fill(null);
    modelData = new Array(props.modelSources.length).fill(null);
    
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    const HDRIloader = new RGBELoader();
    HDRIloader.load('/sunset.hdr', (texture) => { texture.mapping = THREE.EquirectangularReflectionMapping; scene.environment = texture;}) //scene.background = texture;})
    
    const loadPromises = props.modelSources.map((src, index) =>
        new Promise<void>(async (resolve) => {
            let gltf: any = null;
            let texture: THREE.Texture | null = null;

            try {
                gltf = await loader.loadAsync(src);
            } catch (error) {
                modelsLoadedCount.value++;
                loadingProgress.value = (modelsLoadedCount.value / totalModels.value) * 100;
                resolve();
                return;
            }

            if (props.previewImgs && props.previewImgs[index]) {
                try {
                    texture = await textureLoader.loadAsync(props.previewImgs[index]);
                    texture.colorSpace = THREE.SRGBColorSpace;
                } catch (texError) {
                    texture = null;
                }
            }

            const model = gltf.scene;
            model.rotation.set(0, 0, 0);
            model.updateMatrixWorld();
            const initialBox = new THREE.Box3().setFromObject(model);
            const center = initialBox.getCenter(new THREE.Vector3());
            model.position.sub(center);
            model.scale.set(props.modelDefaultSize, props.modelDefaultSize, props.modelDefaultSize);
            model.updateMatrixWorld();
            const finalBox = new THREE.Box3().setFromObject(model);
            const sizeAtDefaultScale = finalBox.getSize(new THREE.Vector3());

            let placeholder: THREE.Mesh | null = null;
            if (texture) {
                const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
                const placeholderHeight = props.modelDefaultSize * 0.8;
                const placeholderWidth = placeholderHeight * aspectRatio;
                const geometry = new THREE.PlaneGeometry(placeholderWidth, placeholderHeight);
                const material = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    side: THREE.DoubleSide,
                    depthWrite: false,
                });
                placeholder = new THREE.Mesh(geometry, material);
                placeholder.rotation.set(0, 0, 0);

                const initialScale = props.modelDefaultSize * (1.0 + props.scaleMultiplier);
                placeholder.scale.set(initialScale, initialScale, initialScale);
            }

            const targetPosition = new THREE.Vector3();
            const targetQuaternion = new THREE.Quaternion();
            const placeholderTargetQuaternion = new THREE.Quaternion();

            const dummy = new THREE.Object3D();
            dummy.position.copy(targetPosition);
            dummy.lookAt(camera!.position);
            targetQuaternion.copy(dummy.quaternion);
            placeholderTargetQuaternion.copy(dummy.quaternion);

            modelData[index] = {
                model: model,
                placeholder: placeholder,
                texture: texture,
                size: sizeAtDefaultScale,
                center: center.clone(),
                targetPosition: targetPosition,
                targetQuaternion: targetQuaternion,
                placeholderTargetQuaternion: placeholderTargetQuaternion,
                targetScale: new THREE.Vector3(props.modelDefaultSize, props.modelDefaultSize, props.modelDefaultSize),
                isModelActiveInScene: false,
            };

            modelsLoadedCount.value++;
            loadingProgress.value = (modelsLoadedCount.value / totalModels.value) * 100;
            resolve();
        })
    );

    try {
        await Promise.all(loadPromises);
        console.log("All models and placeholders processed.");

         const validModelDataEntries = modelData.filter(data => data !== null && (data.model || data.placeholder)) as Exclude<typeof modelData[number], null>[];
        loadedModels.value = modelData.map(d => d?.model).filter(m => m !== undefined) as THREE.Object3D[];


       if (validModelDataEntries.length > 0) {
            console.log(`Found ${validModelDataEntries.length} valid entries (model or placeholder).`);

            if (!modelData[currentModelIndex.value]) {
                const firstValidIndex = modelData.findIndex(d => d !== null && (d.model || d.placeholder));
                currentModelIndex.value = firstValidIndex >= 0 ? firstValidIndex : 0;
                console.warn(`Resetting currentModelIndex to first valid index: ${currentModelIndex.value}`);
            }
            setupInitialCamera();
            calculateModelTargets(currentModelIndex.value, true);

            console.log("Targets calculated. Applying initial state and adding to scene...");

            modelData.forEach((data, index) => {
                if (!data || !scene) return;

                const isCurrent = index === currentModelIndex.value;

                if (isCurrent && data.model) {
                    data.isModelActiveInScene = true;
                    data.model.position.copy(data.targetPosition);
                    data.model.quaternion.copy(data.targetQuaternion);
                    data.model.scale.copy(data.targetScale);
                    data.model.updateMatrixWorld(true);
                    scene.add(data.model);
                    console.log(`Added model ${index} (active) to scene`);
                } else if (data.placeholder) {
                    data.isModelActiveInScene = false;
                    data.placeholder.position.copy(data.targetPosition);
                    data.placeholder.quaternion.copy(data.placeholderTargetQuaternion);
                    data.placeholder.scale.copy(data.targetScale);
                    data.placeholder.updateMatrixWorld(true);
                    scene.add(data.placeholder);
                    console.log(`Added placeholder ${index} to scene`);
                } else if (data.model) {
                    console.warn(`Placeholder missing for index ${index}, adding model instead.`);
                    data.isModelActiveInScene = true;
                    data.model.position.copy(data.targetPosition);
                    data.model.quaternion.copy(data.targetQuaternion);
                    data.model.scale.copy(data.targetScale);
                    data.model.updateMatrixWorld(true);
                    scene.add(data.model);
                }
            });

            console.log("Initial objects added to scene.");
          
            isFullyLoaded.value = true;
            emit('model-loaded');
            console.log("Model loading officially complete (isFullyLoaded=true).");
            await nextTick();
            controls?.update();
            needsRender = true;
            if (renderer && scene && camera) {
                console.log("Forcing initial render.");
                renderer.render(scene, camera);
            }
        } else {
            console.warn("No models or placeholders loaded successfully.");
            isFullyLoaded.value = true;
            emit('model-loaded');
        }
    } catch (error) {
        console.error("Error during loading Promise.all:", error);
        isFullyLoaded.value = true;
    } finally {
        isLoadingModels.value = false;
        console.log("Model load process finished.");
        if (wasAnimating || isActive.value) {
            startAnimationLoop();
        }
    }
};

const calculateModelTargets = (centerIndex: number, snap: boolean = false) => {
    if (!scene || modelData.length === 0 || !modelData.some(d => d !== null)) {
        console.warn("calculateModelTargets skipped: Scene not ready or no valid model data.");
        return;
    }

    if (centerIndex < 0 || centerIndex >= modelData.length || !modelData[centerIndex]) {
        console.warn(`calculateModelTargets skipped: Invalid centerIndex ${centerIndex} or no data at index.`);
        const firstValidIndex = modelData.findIndex(d => d !== null);
        if (firstValidIndex === -1) return;
        centerIndex = firstValidIndex;
        console.warn(`Using fallback centerIndex: ${centerIndex}`);
    }

    const numValidEntries = modelData.filter(d => d !== null).length;
    if (numValidEntries === 0) return;

    const radius = props.curveRadius;
    const mainModelYOffset = 1;

    let validIndexCounter = -1;
    const centerModelValidIndex = modelData.slice(0, centerIndex + 1).filter(d => d !== null).length - 1;

    modelData.forEach((data, originalIndex) => {
        if (!data) return;

        validIndexCounter++;
        const isCurrent = originalIndex === centerIndex;
        let relativeValidIndex = validIndexCounter - centerModelValidIndex;

        const angleStep = (Math.PI * 2) / numValidEntries; 
        const angle = relativeValidIndex * angleStep;

        const targetX = Math.sin(angle) * radius;
        const targetZ = Math.cos(angle) * radius;

        data.targetPosition.set(targetX, 0, targetZ);

        if (isCurrent) {
            data.targetPosition.z = radius * 0.5; 
            data.targetPosition.y += mainModelYOffset; 
        }

        const dummy = new THREE.Object3D();
        dummy.position.copy(data.targetPosition);
        const objUp = data.placeholder?.up ?? data.model?.up ?? new THREE.Vector3(0, 1, 0);
        dummy.up.copy(objUp);
        dummy.lookAt(camera!.position);
        data.placeholderTargetQuaternion.copy(dummy.quaternion);
        if (!isCurrent || snap) {
            data.targetQuaternion.copy(data.placeholderTargetQuaternion);
        }

        const scaleFactor = isCurrent ? 1 : 1 * props.scaleMultiplier; 
        const finalScale = props.modelDefaultSize * scaleFactor;
        data.targetScale.set(finalScale, finalScale, finalScale);

        if (snap) {
            const objectToSnap = isCurrent ? data.model : data.placeholder;
            const targetQuat = isCurrent ? data.targetQuaternion : data.placeholderTargetQuaternion;

            if (objectToSnap) {
                objectToSnap.position.copy(data.targetPosition);
                objectToSnap.quaternion.copy(targetQuat);
                objectToSnap.scale.copy(data.targetScale);
                objectToSnap.updateMatrixWorld(true);
            }
        }

        if (data.model) {
            data.model.visible = true;
            data.model.scale.copy(data.targetScale); 
        }
        if (data.placeholder) {
            data.placeholder.visible = true;
            data.placeholder.scale.copy(data.targetScale); 
        }
    });
    needsRender = true;
};

const setupInitialCamera = () => {
    if (!camera || !controls) return;

    const numValidEntries = modelData.filter(d => d !== null).length;
    if (numValidEntries === 0) return;

    const radius = props.curveRadius;
    const distanceFactor = 1.5; 
    const cameraDistance = radius * distanceFactor;

    camera.position.set(0, radius * 0.5, cameraDistance);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();

    camera.near = Math.max(0.01, cameraDistance * 0.1);
    camera.far = Math.max(50, cameraDistance * 10);
    camera.updateProjectionMatrix();

    controls.target.set(0, 0, 0);
    controls.update();

    console.log(`Camera initialized to fit all models.`);
};



const switchToModel = (requestedIndex: number) => {
    if (!isFullyLoaded.value || !scene || modelData.length <= 1) return;

    const numValidEntries = modelData.filter(d => d !== null).length;
    if (numValidEntries <= 1) return;

    let currentValidIndex = -1;
    let targetValidIndex = -1;
    let currentActualIndex = -1;
    let targetActualIndex = -1;
    let validCounter = 0;

    for (let i = 0; i < modelData.length; i++) {
        if (modelData[i]) {
            if (i === currentModelIndex.value) {
                currentValidIndex = validCounter;
                currentActualIndex = i;
            }
            const normalizedRequested = ((requestedIndex % numValidEntries) + numValidEntries) % numValidEntries;
            if (validCounter === normalizedRequested) {
                targetValidIndex = validCounter;
                targetActualIndex = i;
            }
            validCounter++;
        }
    }

    if (targetActualIndex === -1 || targetActualIndex === currentActualIndex || !controls) {
        console.warn(`Switch aborted: target index ${targetActualIndex} invalid or same as current ${currentActualIndex}.`);
        return;
    }

    const oldIndex = currentActualIndex;
    const newIndex = targetActualIndex;
    const oldData = modelData[oldIndex];
    const newData = modelData[newIndex];

    console.log(`Switching from index ${oldIndex} to ${newIndex}`);

    isUserInteracting.value = false;
    isDraggingModel.value = false;
    if (containerRef.value) containerRef.value.style.cursor = 'grab';
    if (controls) controls.enabled = true;
    autoRotating.value = false;
    interactionEnded.value = true;

    if (oldData?.model && oldData.isModelActiveInScene) {
        scene.remove(oldData.model);
        console.log(`Removed model ${oldIndex}`);
    }
    if (oldData?.placeholder) {
        oldData.placeholder.position.copy(oldData.targetPosition);
        oldData.placeholder.quaternion.copy(oldData.placeholderTargetQuaternion);
        oldData.placeholder.scale.copy(oldData.targetScale);
        oldData.placeholder.updateMatrixWorld();
        scene.add(oldData.placeholder);
        console.log(`Added placeholder ${oldIndex}`);
    }
    if (oldData) oldData.isModelActiveInScene = false;

    if (newData?.placeholder && !newData.isModelActiveInScene) {
        scene.remove(newData.placeholder);
        console.log(`Removed placeholder ${newIndex}`);
    }
    if (newData?.model) {
        newData.model.position.copy(newData.targetPosition);
        newData.model.quaternion.copy(newData.targetQuaternion);
        newData.model.scale.copy(newData.targetScale);
        newData.model.updateMatrixWorld();
        scene.add(newData.model);
        console.log(`Added model ${newIndex}`);
        newData.isModelActiveInScene = true;
    } else if (newData?.placeholder) {
        console.warn(`Model missing for new index ${newIndex}, adding its placeholder instead.`);
        newData.placeholder.position.copy(newData.targetPosition);
        newData.placeholder.quaternion.copy(newData.placeholderTargetQuaternion);
        newData.placeholder.scale.copy(newData.targetScale);
        newData.placeholder.updateMatrixWorld();
        scene.add(newData.placeholder);
        newData.isModelActiveInScene = false;
    }

    currentModelIndex.value = newIndex;
    calculateModelTargets(newIndex, false);
    if (newData) {
        newData.targetQuaternion.copy(newData.placeholderTargetQuaternion);
    }
    setTimeout(() => {
        if (props.autoRotate && !isUserInteracting.value) {
            autoRotating.value = true;
        }
    }, 300);

    emit('model-switch', newIndex);
    needsRender = true;
};

const nextModel = () => {
    
    if (!isFullyLoaded.value || modelData.length === 0) return;
    const numValidEntries = modelData.filter(d => d !== null).length;
    if (numValidEntries === 0) return;

    let currentValidIndex = -1;
    let validCounter = 0;
    for (let i = 0; i < modelData.length; i++) {
        if (modelData[i]) {
            if (i === currentModelIndex.value) {
                currentValidIndex = validCounter;
                break;
            }
            validCounter++;
        }
    }

    if (currentValidIndex !== -1) {
        switchToModel(currentValidIndex + 1); 
        resetAutoSwitch(); 
    }
    emit('model-changed', currentModelIndex.value);
};

const previousModel = () => {
    
    if (!isFullyLoaded.value || modelData.length === 0) return;
    const numValidEntries = modelData.filter(d => d !== null).length;
    if (numValidEntries === 0) return;

    let currentValidIndex = -1;
    let validCounter = 0;
    for (let i = 0; i < modelData.length; i++) {
        if (modelData[i]) {
            if (i === currentModelIndex.value) {
                currentValidIndex = validCounter;
                break;
            }
            validCounter++;
        }
    }

    if (currentValidIndex !== -1) {
        switchToModel(currentValidIndex - 1); 
        resetAutoSwitch(); 
    }
    emit('model-changed', currentModelIndex.value);
};

const startAnimationLoop = () => {
  if (!animationFrameId && isSetupComplete.value) {
    clock.start();
    animate();
  }
}

const stopAnimationLoop = () => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    clock.stop();
  }
}

const autoSwitchInterval = ref<number | null>(null);

const resetAutoSwitch = () => {
  if (autoSwitchInterval.value) {
    clearInterval(autoSwitchInterval.value);
  }
  autoSwitchInterval.value = setInterval(() => {
    if (isFullyLoaded.value && modelData.length > 1) {
      nextModel(); 
    }
  }, 5000) as unknown as number; 
};

onMounted(() => {
  resetAutoSwitch();

  const resetOnInteraction = () => {
    resetAutoSwitch(); 
  };

  containerRef.value?.addEventListener('click', resetOnInteraction);
  containerRef.value?.addEventListener('mousemove', resetOnInteraction);

  onBeforeUnmount(() => {
    if (autoSwitchInterval.value) {
      clearInterval(autoSwitchInterval.value);
    }
    containerRef.value?.removeEventListener('click', resetOnInteraction);
    containerRef.value?.removeEventListener('mousemove', resetOnInteraction);
  });
});

onMounted(() => {
  const containerElement = containerRef.value;
  if (!containerElement) return;

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        resizeObserver.unobserve(containerElement);
        initThree();
      }
    }
  });

  resizeObserver.observe(containerElement);

  onBeforeUnmount(() => {
    resizeObserver.disconnect();
  });
  nextTick(() => {
    if (containerRef.value) {
        initThree(); 
    } else {
        console.error("Container ref not available on mount.");
    }
  });

  if ('IntersectionObserver' in window && containerRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const intersecting = entry.isIntersecting;
          isVisible.value = intersecting;
          if (intersecting && !isActive.value) {
              isActive.value = true;
              startAnimationLoop();
          } else if (!intersecting && isActive.value) {
              isActive.value = false;
              stopAnimationLoop();
          }
        });
      }, { threshold: 0.1 } 
    );
    observer.observe(containerRef.value);
    onBeforeUnmount(() => observer.disconnect());
  } else {
    isActive.value = true;
  }

  const handleVisibilityChange = () => {
      if (document.hidden) {
          isVisible.value = false;
      } else {
          isVisible.value = true;
          if (isActive.value) {
              startAnimationLoop();
          }
      }
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);
  onBeforeUnmount(() => document.removeEventListener('visibilitychange', handleVisibilityChange));

});


const cleanupModels = () => {
    console.log(`Cleaning up models and placeholders...`);
    if (scene) {
        modelData.forEach(data => {
            if (!data) return;
            if (data.model) {
                scene.remove(data.model);
                disposeObject(data.model);
            }
            if (data.placeholder) {
                scene.remove(data.placeholder);
                if (data.placeholder.geometry) data.placeholder.geometry.dispose();
                if (data.placeholder.material) {
                    if (Array.isArray(data.placeholder.material)) {
                        data.placeholder.material.forEach(m => m.dispose());
                    } else {
                        data.placeholder.material.dispose();
                    }
                }
            }
            if (data.texture) {
                data.texture.dispose();
            }
        });
    }
    loadedModels.value = []; 
    modelData = []; 
    console.log("Model and placeholder cleanup complete.");
}

onBeforeUnmount(() => {
    console.log("ModelCarousel component unmounting...");
    stopAnimationLoop();
    cleanupModels();
    controls?.dispose();
    renderer?.dispose();
    scene = null;
    camera = null;
    renderer = null;
    controls = null;
    raycaster = null;
    console.log("ModelCarousel cleanup complete.");
});

const disposeObject = (obj: THREE.Object3D | null) => {
    if (!obj) return;

    obj.removeFromParent();

    while (obj.children.length > 0) {
        disposeObject(obj.children[0]);
    }
    if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) {
            mesh.geometry.dispose();
        }
        if (mesh.material) {
            if (Array.isArray(mesh.material)) {
                mesh.material.forEach(disposeMaterial);
            } else {
                disposeMaterial(mesh.material);
            }
        }
    }
};


const disposeMaterial = (material: any) => {
    if (!material) return;
    for (const key in material) {
        const value = material[key];
        if (value && typeof value === 'object' && typeof value.dispose === 'function') {
            if (value.isTexture || value.image || value instanceof THREE.Texture) {
                 try { value.dispose(); } catch(e) {}
            }
        }
    }
    if (typeof material.dispose === 'function') {
         try {
             material.dispose();
         } catch(e) {}
    }
   
};


onBeforeUnmount(() => {
  console.log("ModelCarousel component unmounting...");
  stopAnimationLoop();
  cleanupModels(); 
  controls?.dispose(); 
  renderer?.dispose(); 
  scene = null;
  camera = null;
  renderer = null;
  controls = null;
  raycaster = null;
  console.log("ModelCarousel cleanup complete.");
});

watch(() => props.modelSources, (newSources, oldSources) => {
  if (JSON.stringify(newSources) !== JSON.stringify(oldSources)) {
    console.log("Model sources changed. Reloading...");
    currentModelIndex.value = 0;
    if (isSetupComplete.value) {
      loadAllModels();
    }
  }
}, { deep: true });

watch(() => props.autoRotate, (newValue) => {
    if (!isUserInteracting.value && interactionEnded.value) {
        autoRotating.value = newValue;
        if(newValue) needsRender = true; 
    } else if (!newValue) {
        autoRotating.value = false;
    }
});



watch(() => props.enableScreenshot, (newValue) => {
  if (renderer) {
    renderer.dispose();
    initThree(); 
    console.log(`Renderer reinitialized with preserveDrawingBuffer: ${newValue}`);
  }
});

defineExpose({
  nextModel,
  previousModel,
  switchToModel,
  getCurrentIndex: () => currentModelIndex.value,
  scene: () => scene,
  camera: () => camera,
  renderer: () => renderer,
  prepareScreenshotCapture,
  isolateCurrentModel,
  restoreSceneState,
  restoreOriginalSizes,
  getModelData: (index) => modelData[index]
});

</script>

<template>
  <div ref="containerRef" class="model-carousel-container" v-bind="$attrs">
    <canvas ref="canvasRef" class="model-canvas"></canvas>
    
  </div>
</template>

<style scoped>
.model-carousel-container {
  position: relative;
  width: 100%;
  height: 100%; 
  overflow: hidden;
  contain: content;
  cursor: grab;
  touch-action: pan-y;
}

.model-canvas {
  display: block;
  width: 100%; 
  height: 100%;
  z-index: 1;
  outline: none;
  touch-action: pan-y;
}

.loading-indicator {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.4rem 0.9rem;
  border-radius: 5px;
  font-size: 0.9em;
  z-index: 2;
  pointer-events: none; 
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  touch-action: pan-y;
}
.loading-indicator.error {
    background-color: rgba(180, 0, 0, 0.8); 
    touch-action: pan-y;
}
</style>