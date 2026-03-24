"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface PhotoItem {
  src: string;
  alt: string;
  span?: "tall" | "wide" | "normal";
}

interface PhotoGalleryProps {
  title?: string;
  subtitle?: string;
  photos: PhotoItem[];
  brandColor?: string;
}

/* ─── 3D Tilt Card ─── */
function TiltCard({
  photo,
  index,
  brandColor,
  onSelect,
}: {
  photo: PhotoItem;
  index: number;
  brandColor: string;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Stagger pattern: alternate between different reveal directions
  const directions = [
    { x: -60, y: 30 },
    { x: 0, y: 60 },
    { x: 60, y: 30 },
    { x: 0, y: -40 },
    { x: -40, y: 0 },
  ];
  const dir = directions[index % directions.length];

  const spanClass =
    photo.span === "tall"
      ? "row-span-2"
      : photo.span === "wide"
      ? "col-span-2"
      : "";

  const aspectClass =
    photo.span === "tall"
      ? "aspect-[3/5]"
      : photo.span === "wide"
      ? "aspect-[16/9]"
      : "aspect-square";

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${spanClass}`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, x: dir.x, y: dir.y, scale: 0.85, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
    >
      <div className={aspectClass}>
        <motion.img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Glare overlay — follows cursor */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
          ),
        }}
      />

      {/* Dark gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Caption that slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <p className="font-body text-xs text-white/90 line-clamp-2">{photo.alt}</p>
      </div>

      {/* Zoom icon */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
        <ZoomIn className="w-4 h-4 text-white" />
      </div>

      {/* Brand accent line at bottom */}
      <div
        className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700 ease-out"
        style={{ backgroundColor: brandColor }}
      />
    </motion.div>
  );
}

export default function PhotoGallery({
  title = "Galeria",
  subtitle,
  photos,
  brandColor = "hsl(220 15% 45%)",
}: PhotoGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const navigateLightbox = (dir: 1 | -1) => {
    if (selected === null) return;
    const next = (selected + dir + photos.length) % photos.length;
    setSelected(next);
  };

  return (
    <section className="py-28 px-6 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header with stagger reveal */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-display font-black text-foreground tracking-tighter"
            initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="font-body text-muted-foreground mt-4 max-w-lg mx-auto text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Masonry grid with 3D tilt cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {photos.map((photo, i) => (
            <TiltCard
              key={i}
              photo={photo}
              index={i}
              brandColor={brandColor}
              onSelect={() => setSelected(i)}
            />
          ))}
        </div>
      </div>

      {/* Premium Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop blur */}
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />

            {/* Navigation */}
            <button
              className="absolute left-4 md:left-8 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
              onClick={() => navigateLightbox(-1)}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 md:right-8 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
              onClick={() => navigateLightbox(1)}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Close */}
            <button
              className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
              onClick={() => setSelected(null)}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <motion.div
              key={selected}
              className="relative z-40 max-w-[90vw] max-h-[85vh]"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={photos[selected].src}
                alt={photos[selected].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
              {/* Caption */}
              <motion.p
                className="text-center font-body text-sm text-white/60 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {photos[selected].alt}
              </motion.p>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 font-body text-xs text-white/40 tracking-[0.2em]">
              {selected + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
