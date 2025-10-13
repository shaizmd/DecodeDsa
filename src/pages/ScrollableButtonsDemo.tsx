import React, { useRef } from "react"

// Single-file implementation: component + demo

type ButtonItem = {
  id: string
  label: string
  onClick?: () => void
  disabled?: boolean
}

type Props = {
  items: ButtonItem[]
  className?: string
  scrollStep?: number
}

function ScrollableButtonGroup({ items, className = "", scrollStep = 200 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const scrollBy = (delta: number) => {
    const el = containerRef.current
    if (!el) return
    el.scrollBy({ left: delta, behavior: "smooth" })
  }

  return (
    <div className={`relative ${className}`}> 
      <button
        aria-hidden
        onClick={() => scrollBy(-scrollStep)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/80 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        title="Scroll left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        ref={containerRef}
        role="toolbar"
        aria-label="Scrollable button group"
        tabIndex={0}
        className="no-scrollbar overflow-x-auto py-2 px-4 sm:px-12 flex gap-3 items-center scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {items.map((it) => (
          <button
            key={it.id}
            onClick={it.onClick}
            disabled={it.disabled}
            className={`flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full border transition-colors duration-150 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 ${
              it.disabled
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                : "bg-white text-gray-800 border-gray-200 hover:bg-indigo-50"
            }`}
          >
            {it.label}
          </button>
        ))}
      </div>

      <button
        aria-hidden
        onClick={() => scrollBy(scrollStep)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/80 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        title="Scroll right"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

// Demo page (single-file)
const ScrollableButtonsDemo = () => {
  const items: ButtonItem[] = Array.from({ length: 18 }).map((_, i) => ({
    id: String(i),
    label: `Option ${i + 1}`,
    onClick: () => alert(`Clicked Option ${i + 1}`),
  }))

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Scrollable Button Group Demo (single-file)</h1>
      <div className="max-w-3xl">
        <ScrollableButtonGroup items={items} scrollStep={240} />
      </div>

      <p className="mt-6 text-sm text-gray-600">Use the buttons at the ends on wide screens or swipe horizontally on touch devices.</p>
    </div>
  )
}

export default ScrollableButtonsDemo
