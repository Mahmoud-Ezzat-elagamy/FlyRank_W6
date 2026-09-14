import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const TorusCanvas = lazy(() => import('./TorusCanvas'))

export default function ModelViewer() {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100">
      {/* Container Card */}
      <div className="w-full max-w-lg bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl flex flex-col items-center gap-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-semibold tracking-tight text-white">Interactive 3D Model</h1>
          <p className="text-xs text-slate-400 mt-1">Move your mouse to tilt, hover over the ring to interact</p>
        </div>

        {/* 3D Viewport Box with distinct background */}
        <div
          ref={containerRef}
          className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800/80 relative shadow-inner flex items-center justify-center"
        >
          {isVisible ? (
            <Suspense fallback={<div className="text-xs text-slate-400">Loading 3D scene...</div>}>
              <TorusCanvas />
            </Suspense>
          ) : (
            <div className="text-xs text-slate-500">Scroll to view</div>
          )}
        </div>
      </div>

      {/* torus  */}
    </main>
  )
}
