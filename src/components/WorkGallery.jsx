import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────
   Media items — 13 images + 2 videos
───────────────────────────────────────── */
const MEDIA = [
  { id: 1,  type: 'image', title: 'Brand Visual',        desc: 'Product creative for client',  url: '/Testimonial/work-1.png',       span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2' },
  { id: 2,  type: 'video', title: 'Client Reel',         desc: 'Short-form content',            url: '/Testimonial/work-video-1.mp4', span: 'md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2' },
  { id: 3,  type: 'image', title: 'Product Shot',        desc: 'Premium product photography',   url: '/Testimonial/work-2.png',       span: 'md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2' },
  { id: 4,  type: 'image', title: 'Content Creation',    desc: 'Social media content',          url: '/Testimonial/work-3.png',       span: 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2' },
  { id: 5,  type: 'video', title: 'Brand Reel',          desc: 'Video for retention',           url: '/Testimonial/work-video-2.mp4', span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2' },
  { id: 6,  type: 'image', title: 'Campaign Visual',     desc: 'Marketing creative',            url: '/Testimonial/work-4.png',       span: 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2' },
  { id: 7,  type: 'image', title: 'Wellness Brand',      desc: 'Irish wellness visual',         url: '/Testimonial/work-5.png',       span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2' },
  { id: 8,  type: 'image', title: 'Supplement Brand',    desc: 'Product content',               url: '/Testimonial/work-6.png',       span: 'md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2' },
  { id: 9,  type: 'image', title: 'Fitness Visual',      desc: 'Brand photography',             url: '/Testimonial/work-7.png',       span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2' },
  { id: 10, type: 'image', title: 'Brand Content',       desc: 'Creative for social',           url: '/Testimonial/work-8.png',       span: 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2' },
  { id: 11, type: 'image', title: 'Supplement Creative', desc: 'Product photography',           url: '/Testimonial/work-9.jpg',       span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2' },
  { id: 12, type: 'image', title: 'Lifestyle Content',   desc: 'Fitness brand creative',        url: '/Testimonial/work-10.jpg',      span: 'md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2' },
  { id: 13, type: 'image', title: 'Brand Photography',   desc: 'Premium brand visual',          url: '/Testimonial/work-11.jpg',      span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2' },
  { id: 14, type: 'image', title: 'Product Visual',      desc: 'Creative product shot',         url: '/Testimonial/work-12.jpg',      span: 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2' },
  { id: 15, type: 'image', title: 'Fitness Content',     desc: 'Lifestyle brand photography',   url: '/Testimonial/work-13.jpg',      span: 'md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2' },
]

/* ─────────────────────────────────────────
   Individual media item (image or video)
───────────────────────────────────────── */
function MediaItem({ item, className = '', onClick }) {
  const videoRef = useRef(null)
  const [inView, setInView]       = useState(false)
  const [buffering, setBuffering] = useState(true)

  useEffect(() => {
    if (item.type !== 'video') return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { rootMargin: '50px', threshold: 0.1 }
    )
    if (videoRef.current) obs.observe(videoRef.current)
    return () => { if (videoRef.current) obs.unobserve(videoRef.current) }
  }, [item.type])

  useEffect(() => {
    if (item.type !== 'video' || !videoRef.current) return
    let mounted = true
    const play = async () => {
      if (!videoRef.current || !mounted) return
      try {
        if (videoRef.current.readyState >= 3) {
          setBuffering(false)
          await videoRef.current.play()
        } else {
          setBuffering(true)
          await new Promise((res) => { if (videoRef.current) videoRef.current.oncanplay = res })
          if (mounted) { setBuffering(false); await videoRef.current.play() }
        }
      } catch {}
    }
    inView ? play() : videoRef.current.pause()
    return () => {
      mounted = false
      if (videoRef.current) { videoRef.current.pause() }
    }
  }, [inView, item.type])

  if (item.type === 'video') {
    return (
      <div className={`${className} relative overflow-hidden bg-parchment`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onClick={onClick}
          playsInline muted loop preload="auto"
          style={{ opacity: buffering ? 0.8 : 1, transition: 'opacity 0.2s', transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <source src={item.url} type="video/mp4" />
        </video>
        {buffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
        {/* Video badge */}
        <div className="absolute top-2 right-2 bg-copper/90 text-chalk text-[9px] font-display font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
          Video
        </div>
      </div>
    )
  }

  return (
    <img
      src={item.url}
      alt={item.title}
      className={`${className} object-cover cursor-pointer`}
      onClick={onClick}
      loading="lazy"
      decoding="async"
    />
  )
}

/* ─────────────────────────────────────────
   Expanded modal
───────────────────────────────────────── */
function GalleryModal({ selectedItem, onClose, setSelectedItem, mediaItems }) {
  const [dockPos, setDockPos] = useState({ x: 0, y: 0 })

  return (
    <>
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedItem.id}
            className="relative w-full max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ y: 20, scale: 0.97 }}
            animate={{ y: 0, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 30, mass: 0.5 } }}
            exit={{ y: 20, scale: 0.97, transition: { duration: 0.15 } }}
            onClick={(e) => e.stopPropagation()}
          >
            <MediaItem item={selectedItem} className="w-full h-full max-h-[80vh]" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-chalk font-display font-bold text-xl">{selectedItem.title}</h3>
              <p className="text-chalk/70 font-body text-sm mt-1">{selectedItem.desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Close button */}
        <motion.button
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-chalk/20 text-chalk flex items-center justify-center backdrop-blur-sm hover:bg-chalk/30 z-10"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
        </motion.button>
      </motion.div>

      {/* Draggable thumbnail dock */}
      <motion.div
        drag dragMomentum={false} dragElastic={0.1}
        animate={{ x: dockPos.x, y: dockPos.y }}
        onDragEnd={(_, info) => setDockPos(p => ({ x: p.x + info.offset.x, y: p.y + info.offset.y }))}
        className="fixed z-[60] left-1/2 bottom-6 -translate-x-1/2 touch-none cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center -space-x-2 px-3 py-2 rounded-2xl bg-chalk/20 backdrop-blur-xl border border-white/20 shadow-xl">
          {mediaItems.map((item, i) => (
            <motion.div
              key={item.id}
              onClick={(e) => { e.stopPropagation(); setSelectedItem(item) }}
              style={{ zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - i }}
              className={`relative w-9 h-9 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 ${
                selectedItem.id === item.id ? 'ring-2 ring-white shadow-lg' : 'hover:ring-2 hover:ring-white/40'
              }`}
              initial={{ rotate: i % 2 === 0 ? -12 : 12 }}
              animate={{
                scale:  selectedItem.id === item.id ? 1.2  : 1,
                rotate: selectedItem.id === item.id ? 0    : i % 2 === 0 ? -12 : 12,
                y:      selectedItem.id === item.id ? -8   : 0,
              }}
              whileHover={{ scale: 1.3, rotate: 0, y: -10, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
            >
              <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}

/* ─────────────────────────────────────────
   Main exported gallery
───────────────────────────────────────── */
export default function WorkGallery() {
  const [items, setItems]               = useState(MEDIA)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isDragging, setIsDragging]     = useState(false)

  return (
    <div>
      <p className="my-2 text-center font-body text-xs uppercase tracking-widest text-smoke">
        Content Created for Our Clients
      </p>
      <h3 className="mx-auto max-w-2xl text-center font-display text-4xl md:text-6xl font-extrabold tracking-tight text-ink py-3">
        Our <span className="text-copper">Work</span>
      </h3>
      <div className="mb-10" />

      <AnimatePresence mode="wait">
        {selectedItem ? (
          <GalleryModal
            key="modal"
            selectedItem={selectedItem}
            onClose={() => setSelectedItem(null)}
            setSelectedItem={setSelectedItem}
            mediaItems={items}
          />
        ) : null}
      </AnimatePresence>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[70px]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden:  { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layoutId={`media-${item.id}`}
            className={`relative overflow-hidden rounded-2xl cursor-pointer ${item.span}`}
            onClick={() => !isDragging && setSelectedItem(item)}
            variants={{
              hidden:  { y: 40, scale: 0.92, opacity: 0 },
              visible: { y: 0, scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 25, delay: index * 0.05 } },
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
              setIsDragging(false)
              if (Math.abs(info.offset.x + info.offset.y) > 50) {
                const newItems = [...items]
                const dragged  = newItems.splice(index, 1)[0]
                const target   = (info.offset.x + info.offset.y) > 0
                  ? Math.min(index + 1, items.length - 1)
                  : Math.max(index - 1, 0)
                newItems.splice(target, 0, dragged)
                setItems(newItems)
              }
            }}
          >
            <MediaItem
              item={item}
              className="absolute inset-0 w-full h-full"
              onClick={() => !isDragging && setSelectedItem(item)}
            />
            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-3"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <h3 className="relative text-chalk font-display font-semibold text-sm line-clamp-1">{item.title}</h3>
              <p className="relative text-chalk/70 font-body text-xs mt-0.5 line-clamp-1">{item.desc}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
