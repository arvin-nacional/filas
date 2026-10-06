import * as THREE from 'three'

export type EcosystemSceneController = {
  setRunning: (running: boolean, completeEntrance?: boolean) => void
  setPointer: (x: number, y: number) => void
  setActive: (index: number | null) => void
  dispose: () => void
}

export type EcosystemLabelPoint = { x: number; y: number; opacity: number }

type EntranceOptions = {
  animateEntrance?: boolean
  onEntranceComplete?: () => void
}

const easeOut = (value: number) => 1 - Math.pow(1 - THREE.MathUtils.clamp(value, 0, 1), 3)

// Clockwise arrows with broad, rounded shoulders. Each end fits into the next tail.
const arrowShape = (start: number) => {
  const shape = new THREE.Shape()
  const outer = 2.32
  const inner = 1.27
  const end = start - (Math.PI * 2) / 3
  const shoulder = end + 0.23
  const point = (radius: number, angle: number) =>
    new THREE.Vector2(radius * Math.cos(angle), radius * Math.sin(angle))
  const first = point(outer, start)
  shape.moveTo(first.x, first.y)
  shape.absarc(0, 0, outer, start, shoulder, true)
  const outerShoulder = point(outer + 0.13, shoulder)
  const tip = point((outer + inner) / 2, end - 0.04)
  const innerShoulder = point(inner - 0.13, shoulder)
  const innerEnd = point(inner, shoulder)
  const afterOuter = outerShoulder.clone().lerp(tip, 0.09)
  const beforeTip = tip.clone().lerp(outerShoulder, 0.09)
  const afterTip = tip.clone().lerp(innerShoulder, 0.09)
  const beforeInner = innerShoulder.clone().lerp(tip, 0.09)
  shape.quadraticCurveTo(outerShoulder.x, outerShoulder.y, afterOuter.x, afterOuter.y)
  shape.lineTo(beforeTip.x, beforeTip.y)
  shape.quadraticCurveTo(tip.x, tip.y, afterTip.x, afterTip.y)
  shape.lineTo(beforeInner.x, beforeInner.y)
  shape.quadraticCurveTo(innerShoulder.x, innerShoulder.y, innerEnd.x, innerEnd.y)
  shape.absarc(0, 0, inner, shoulder, start, false)
  // Concave tail receives the previous arrow tip.
  const notch = point((outer + inner) / 2, start - 0.055)
  shape.lineTo(notch.x, notch.y)
  shape.closePath()
  return shape
}

export const createEcosystemScene = (
  canvas: HTMLCanvasElement,
  onProjectLabels?: (points: EcosystemLabelPoint[], reveal: number) => void,
  { animateEntrance = false, onEntranceComplete }: EntranceOptions = {},
): EcosystemSceneController => {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.85
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 40)
  camera.position.set(0, -0.7, 12)
  camera.lookAt(0, 0, 0)

  scene.add(new THREE.HemisphereLight(0xfff8ee, 0x655c50, 1.6))
  const key = new THREE.DirectionalLight(0xfff5e8, 2.7)
  key.position.set(-3, 5, 8)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.camera.left = -4
  key.shadow.camera.right = 4
  key.shadow.camera.top = 4
  key.shadow.camera.bottom = -4
  key.shadow.normalBias = 0.04
  key.shadow.bias = -0.0004
  key.shadow.radius = 4
  scene.add(key)
  const fill = new THREE.DirectionalLight(0xf2eee7, 0.8)
  fill.position.set(4, -2, 5)
  scene.add(fill)

  const sculpture = new THREE.Group()
  sculpture.rotation.x = -0.24
  scene.add(sculpture)

  const grain = new Uint8Array(128 * 128 * 4)
  let seed = 47
  for (let i = 0; i < grain.length; i += 4) {
    seed = (seed * 1664525 + 1013904223) >>> 0
    const value = 100 + (seed % 70)
    grain[i] = grain[i + 1] = grain[i + 2] = value
    grain[i + 3] = 255
  }
  const texture = new THREE.DataTexture(grain, 128, 128)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(5, 5)
  texture.needsUpdate = true
  const colors = [0xb54c2e, 0xc7b49a, 0x293c34]
  const materials = colors.map(
    (color) =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.73,
        metalness: 0,
        bumpMap: texture,
        bumpScale: 0.015,
      }),
  )
  const segments = materials.map((material, index) => {
    const geometry = new THREE.ExtrudeGeometry(arrowShape(Math.PI - (index * Math.PI * 2) / 3), {
      depth: 0.36,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.075,
      bevelThickness: 0.09,
      curveSegments: 64,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    sculpture.add(mesh)
    return mesh
  })
  const labelAnchors = segments.map((_, index) => {
    const angle = ((1 - index) * Math.PI * 2) / 3
    return new THREE.Vector3(Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0.46)
  })
  const projected = new THREE.Vector3()
  const labelPoints = segments.map(() => ({ x: 0, y: 0, opacity: animateEntrance ? 0 : 1 }))

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.ShadowMaterial({ color: 0x5b4934, opacity: 0.07, depthWrite: false }),
  )
  ground.position.z = -0.18
  ground.receiveShadow = true
  sculpture.add(ground)

  const orbit = new THREE.Group()
  const points = Array.from({ length: 160 }, (_, i) => {
    const angle = (i / 160) * Math.PI * 2
    return new THREE.Vector3(Math.cos(angle) * 2.7, Math.sin(angle) * 2.7, -0.1)
  })
  const line = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: 0xbea992, transparent: true, opacity: 0.35 }),
  )
  scene.add(line)
  const dotGeometry = new THREE.SphereGeometry(0.043, 16, 12)
  const dotMaterials = colors.map(
    (color) => new THREE.MeshBasicMaterial({ color, transparent: true }),
  )
  const dots = colors.map((_, index) => {
    const angle = ((1 - index) * Math.PI * 2) / 3
    const dot = new THREE.Mesh(dotGeometry, dotMaterials[index])
    dot.position.set(Math.cos(angle) * 2.7, Math.sin(angle) * 2.7, 0.06)
    orbit.add(dot)
    return dot
  })
  scene.add(orbit)

  let running = false
  let inView = false
  let disposed = false
  let active: number | null = null
  let pointerX = 0
  let pointerY = 0
  let frame = 0
  let elapsed = 0
  let entranceElapsed = 0
  let entranceComplete = !animateEntrance
  let entranceReported = false
  let reveal = entranceComplete ? 1 : 0
  const hoverLifts = segments.map(() => 0)
  let previous = 0
  const render = () => {
    if (disposed) return
    segments.forEach((mesh, index) => {
      const progress = entranceComplete ? 1 : easeOut((entranceElapsed - index * 0.26) / 0.55)
      mesh.visible = progress > 0
      mesh.castShadow = progress === 1
      mesh.material.opacity = progress
      mesh.material.transparent = progress < 1
      mesh.material.depthWrite = progress === 1
      mesh.scale.setScalar(0.965 + progress * 0.035)
      mesh.rotation.z = (1 - progress) * 0.045
      mesh.position.z = (1 - progress) * 0.26 + hoverLifts[index]
      labelPoints[index].opacity = entranceComplete
        ? 1
        : easeOut((entranceElapsed - index * 0.26 - 0.25) / 0.28)
    })
    reveal = entranceComplete ? 1 : easeOut((entranceElapsed - 0.8) / 0.42)
    orbit.visible = reveal > 0
    line.visible = reveal > 0
    line.material.opacity = 0.35 * reveal
    dotMaterials.forEach((material) => {
      material.opacity = reveal
    })
    renderer.render(scene, camera)
    if (onProjectLabels) {
      segments.forEach((mesh, index) => {
        mesh.localToWorld(projected.copy(labelAnchors[index])).project(camera)
        labelPoints[index].x = (projected.x + 1) * 50
        labelPoints[index].y = (1 - projected.y) * 50
      })
      onProjectLabels(labelPoints, reveal)
    }
    if (entranceComplete && !entranceReported) {
      entranceReported = true
      onEntranceComplete?.()
    }
  }
  const tick = (time: number) => {
    frame = 0
    if (disposed || !running || !inView || document.hidden) return
    // Thirty frames per second is ample for this quiet movement.
    if (previous && time - previous < 1000 / 30) {
      frame = requestAnimationFrame(tick)
      return
    }
    const delta = Math.min(previous ? (time - previous) / 1000 : 0, 0.05)
    if (!entranceComplete) {
      entranceElapsed += delta
      entranceComplete = entranceElapsed >= 1.22
    }
    if (entranceComplete) elapsed += delta
    previous = time
    sculpture.rotation.x +=
      (-0.24 + (entranceComplete ? pointerY * 0.045 : 0) - sculpture.rotation.x) * 0.06
    sculpture.rotation.y +=
      ((entranceComplete ? pointerX * 0.055 : 0) - sculpture.rotation.y) * 0.06
    sculpture.position.y = Math.sin(elapsed * 0.65) * 0.025
    orbit.rotation.z = -elapsed * 0.065
    segments.forEach((_, index) => {
      const lift = entranceComplete && active === index ? 0.14 : 0
      hoverLifts[index] += (lift - hoverLifts[index]) * 0.075
    })
    render()
    frame = requestAnimationFrame(tick)
  }
  const sync = () => {
    if (disposed) return
    cancelAnimationFrame(frame)
    frame = 0
    previous = 0
    if (running && inView && !document.hidden && !disposed) frame = requestAnimationFrame(tick)
    else render()
  }
  const resize = () => {
    if (disposed) return
    const { width, height } = canvas.getBoundingClientRect()
    if (width > 0 && height > 0) renderer.setSize(width, height, false)
    render()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    sync()
  })
  visibilityObserver.observe(canvas)
  document.addEventListener('visibilitychange', sync)
  resize()

  return {
    setRunning(value, completeEntrance = false) {
      running = value
      if (completeEntrance) {
        entranceComplete = true
        sculpture.rotation.set(-0.24, 0, 0)
        sculpture.position.y = 0
        hoverLifts.fill(0)
      }
      sync()
    },
    setPointer(x, y) {
      pointerX = x
      pointerY = y
    },
    setActive(index) {
      active = index
    },
    dispose() {
      disposed = true
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', sync)
      segments.forEach((mesh) => mesh.geometry.dispose())
      materials.forEach((material) => material.dispose())
      texture.dispose()
      ground.geometry.dispose()
      ground.material.dispose()
      line.geometry.dispose()
      line.material.dispose()
      dotGeometry.dispose()
      dotMaterials.forEach((material) => material.dispose())
      dots.forEach((dot) => orbit.remove(dot))
      renderer.dispose()
      renderer.forceContextLoss()
    },
  }
}
