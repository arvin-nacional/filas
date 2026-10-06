'use client'

import Image from 'next/image'
import { BarChart3, Package, Pause, Play, Store } from 'lucide-react'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import type { EcosystemSceneController } from './ecosystem-three'

type SceneProps = {
  enableAnimation: boolean
  demandTitle: string
  storeTitle: string
  fulfillmentTitle: string
}

const motionQuery = '(prefers-reduced-motion: reduce)'
const subscribeToMotion = (callback: () => void) => {
  const media = window.matchMedia?.(motionQuery)
  media?.addEventListener('change', callback)
  return () => media?.removeEventListener('change', callback)
}
const prefersReducedMotion = () => window.matchMedia?.(motionQuery).matches ?? true
const titleLines = (title: string, index: number) => {
  const splitAt =
    index === 2
      ? title.includes(' & ')
        ? title.indexOf(' & ')
        : title.lastIndexOf(' ')
      : title.indexOf(' ')
  return splitAt > 0 ? [title.slice(0, splitAt + 1), title.slice(splitAt + 1)] : [title]
}

export const AnimatedEcosystemScene = ({
  enableAnimation,
  demandTitle,
  storeTitle,
  fulfillmentTitle,
}: SceneProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const figureRef = useRef<HTMLElement>(null)
  const labelRefs = useRef<(HTMLLIElement | null)[]>([])
  const sceneRef = useRef<EcosystemSceneController | null>(null)
  const [renderer, setRenderer] = useState<'loading' | 'webgl' | 'fallback'>('loading')
  const [entrance, setEntrance] = useState<'waiting' | 'entering' | 'complete'>('waiting')
  const [paused, setPaused] = useState(false)
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const reducedMotion = useSyncExternalStore(subscribeToMotion, prefersReducedMotion, () => true)
  const running = enableAnimation && !paused && !reducedMotion
  const runningRef = useRef(running)
  const activeService = hoveredService ?? selectedService
  const activeServiceRef = useRef(activeService)

  useEffect(() => {
    runningRef.current = running
    sceneRef.current?.setRunning(running, !enableAnimation || reducedMotion)
  }, [running, enableAnimation, reducedMotion])

  useEffect(() => {
    activeServiceRef.current = activeService
    sceneRef.current?.setActive(activeService)
  }, [activeService])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let cancelled = false
    let started = false
    const loadScene = async () => {
      if (started) return
      started = true
      try {
        const { createEcosystemScene } = await import('./ecosystem-three')
        if (cancelled) return
        const animateEntrance = runningRef.current
        const scene = createEcosystemScene(
          canvas,
          (points, reveal) => {
            points.forEach((point, index) => {
              const label = labelRefs.current[index]
              label?.style.setProperty('--service-x', `${point.x}%`)
              label?.style.setProperty('--service-y', `${point.y}%`)
              label?.style.setProperty('--service-opacity', String(point.opacity))
            })
            figureRef.current?.style.setProperty('--ecosystem-reveal', String(reveal))
          },
          { animateEntrance, onEntranceComplete: () => setEntrance('complete') },
        )
        sceneRef.current = scene
        scene.setActive(activeServiceRef.current)
        scene.setRunning(runningRef.current, !animateEntrance)
        setEntrance(animateEntrance ? 'entering' : 'complete')
        setRenderer('webgl')
      } catch {
        if (!cancelled) {
          figureRef.current?.style.setProperty('--ecosystem-reveal', '1')
          setEntrance('complete')
          setRenderer('fallback')
        }
      }
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          void loadScene()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(canvas)
    const onContextLost = (event: Event) => {
      event.preventDefault()
      sceneRef.current?.dispose()
      sceneRef.current = null
      labelRefs.current.forEach((label) => {
        label?.style.removeProperty('--service-x')
        label?.style.removeProperty('--service-y')
        label?.style.removeProperty('--service-opacity')
      })
      figureRef.current?.style.setProperty('--ecosystem-reveal', '1')
      setEntrance('complete')
      setRenderer('fallback')
    }
    canvas.addEventListener('webglcontextlost', onContextLost)
    return () => {
      cancelled = true
      observer.disconnect()
      canvas.removeEventListener('webglcontextlost', onContextLost)
      sceneRef.current?.dispose()
      sceneRef.current = null
    }
  }, [])

  return (
    <figure
      ref={figureRef}
      aria-label="Three connected services in the FILAS ecosystem"
      data-renderer={renderer}
      data-entrance={entrance}
      data-animation={running && renderer === 'webgl' ? 'running' : 'paused'}
      data-animation-enabled={enableAnimation}
      className="relative mx-auto w-full max-w-[560px] min-w-0 lg:max-w-[min(100%,560px,70svh)]"
      onPointerMove={(event) => {
        if (!running || event.pointerType === 'touch') return
        const bounds = canvasRef.current?.getBoundingClientRect()
        if (!bounds) return
        if (event.clientY > bounds.bottom) {
          sceneRef.current?.setPointer(0, 0)
          return
        }
        sceneRef.current?.setPointer(
          ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
          ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
        )
      }}
      onPointerLeave={() => sceneRef.current?.setPointer(0, 0)}
    >
      <div className="relative aspect-square">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[7%] rounded-full bg-[radial-gradient(ellipse_at_56%_70%,#c5bba833,transparent_70%)]"
        />
        {renderer === 'fallback' && (
          <Image
            src="/hero/ecosystem-sculpture.webp"
            alt=""
            fill
            unoptimized
            loading="eager"
            sizes="(min-width: 640px) 560px, 100vw"
            className="pointer-events-none object-contain"
          />
        )}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full ${renderer === 'webgl' ? 'opacity-100' : 'opacity-0'}`}
        />
        <svg
          aria-hidden="true"
          data-brand-emblem="filas"
          viewBox="0 0 620 641"
          className="pointer-events-none absolute top-1/2 left-1/2 h-auto w-[19%] -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-[var(--ecosystem-reveal,0)]"
        >
          <image href="/filas-horizontal-logo.png" width="3076" height="641" />
        </svg>
        {enableAnimation && !reducedMotion && renderer === 'webgl' && (
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? 'Play animation' : 'Pause animation'}
            className="absolute right-0 bottom-0 inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[11px] text-filas-muted transition-colors hover:bg-filas-surface hover:text-filas-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-filas-accent-text motion-reduce:transition-none"
          >
            {paused ? (
              <Play size={12} aria-hidden="true" />
            ) : (
              <Pause size={12} aria-hidden="true" />
            )}
            {paused ? 'Motion paused' : 'Pause motion'}
          </button>
        )}
      </div>
      <figcaption className="mt-5 sm:absolute sm:inset-0 sm:mt-0 sm:pointer-events-none">
        <ul className="grid list-none grid-cols-3 gap-2 p-0 sm:relative sm:block sm:h-full">
          {[
            {
              title: demandTitle,
              Icon: BarChart3,
              position: 'sm:top-[var(--service-y,24%)] sm:left-[var(--service-x,35%)]',
              iconColor: 'text-filas-accent-text',
              color: 'text-filas-ink sm:text-white sm:[text-shadow:0_1px_2px_#57200e60]',
            },
            {
              title: storeTitle,
              Icon: Store,
              position: 'sm:top-[var(--service-y,46%)] sm:left-[var(--service-x,80%)]',
              iconColor: 'text-[#917b5a]',
              color: 'text-filas-ink',
            },
            {
              title: fulfillmentTitle,
              Icon: Package,
              position: 'sm:top-[var(--service-y,74%)] sm:left-[var(--service-x,35%)]',
              iconColor: 'text-[#293c34]',
              color: 'text-filas-ink sm:text-white sm:[text-shadow:0_1px_2px_#0006]',
            },
          ].map(({ title, Icon, position, iconColor, color }, index) => (
            <li
              key={index}
              ref={(element) => {
                labelRefs.current[index] = element
              }}
              className={`min-w-0 sm:pointer-events-auto sm:absolute sm:w-[28%] sm:-translate-x-1/2 sm:-translate-y-1/2 ${position}`}
            >
              <button
                type="button"
                aria-pressed={selectedService === index}
                onClick={() => setSelectedService(selectedService === index ? null : index)}
                onPointerEnter={() => setHoveredService(index)}
                onPointerLeave={() => setHoveredService(null)}
                onFocus={() => setHoveredService(index)}
                onBlur={() => setHoveredService(null)}
                className={`group flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg text-center focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-filas-accent-text sm:gap-1.5 ${entrance !== 'complete' ? 'pointer-events-none' : ''} ${renderer === 'fallback' ? 'opacity-100' : 'opacity-[var(--service-opacity,0)]'} ${color}`}
              >
                <span
                  aria-hidden="true"
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-filas-line bg-filas-paper shadow-[0_2px_0_#968d7f,0_4px_8px_#342c341a] sm:h-10 sm:w-10 sm:border-white/70 ${iconColor} ${activeService === index ? 'ring-2 ring-current ring-offset-2 ring-offset-filas-paper' : ''}`}
                >
                  <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.75} />
                </span>
                <span className="text-sm leading-[1.25] font-medium tracking-tight sm:text-base [overflow-wrap:anywhere]">
                  {titleLines(title, index).map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  )
}
