"use client";

import { motion } from "framer-motion";
import { Instagram, ExternalLink, Play } from "lucide-react";

interface HighlightItem {
  label: string;
  image: string;
  href: string;
}

interface InstagramPost {
  image: string;
  likes?: string;
  comments?: string;
  href: string;
  isVideo?: boolean;
}

interface InstagramFeedProps {
  handle: string;
  followers: string;
  posts: number;
  brandColor?: string;
  gallery: InstagramPost[];
  highlights?: HighlightItem[];
  profileImage?: string;
  bio?: string;
  embedPostUrls?: string[];
}

export default function InstagramFeed({
  handle,
  followers,
  posts,
  brandColor = "hsl(35 90% 55%)",
  gallery,
  highlights = [],
  profileImage,
  bio,
}: InstagramFeedProps) {
  return (
    <section className="py-28 px-6 bg-[hsl(240_10%_4%)] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header — Instagram-style profile */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8 mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Profile picture */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full p-[3px] bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={handle}
                  className="w-full h-full rounded-full object-cover border-[3px] border-[hsl(240_10%_4%)]"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center border-[3px] border-[hsl(240_10%_4%)]">
                  <Instagram className="w-10 h-10 text-white/60" />
                </div>
              )}
            </div>
            {/* Verified */}
            <div className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full bg-[#3897f0] flex items-center justify-center ring-[3px] ring-[hsl(240_10%_4%)]">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
          </div>

          {/* Info */}
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <h3 className="font-display text-2xl md:text-3xl font-black text-white tracking-tight">
                @{handle}
              </h3>
            </div>
            {bio && (
              <p className="font-body text-sm text-white/50 mb-3 max-w-md">{bio}</p>
            )}
            <div className="flex items-center gap-6 justify-center md:justify-start">
              <span className="font-body text-sm text-white/50">
                <strong className="text-white font-bold">{followers}</strong> seguidores
              </span>
              <span className="font-body text-sm text-white/50">
                <strong className="text-white font-bold">{posts.toLocaleString()}</strong> posts
              </span>
            </div>
          </div>

          {/* Follow button */}
          <a
            href={`https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-body text-sm font-bold tracking-[0.1em] uppercase text-white transition-all hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)",
            }}
          >
            <Instagram className="w-4 h-4" />
            Seguir
          </a>
        </motion.div>

        {/* Highlights carousel — Instagram stories style */}
        {highlights.length > 0 && (
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
              {highlights.map((h, i) => (
                <motion.a
                  key={i}
                  href={h.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex flex-col items-center gap-2 group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <div className="w-[72px] h-[72px] md:w-20 md:h-20 rounded-full p-[2.5px] bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] group-hover:scale-110 transition-transform duration-300">
                    <div className="w-full h-full rounded-full border-[2.5px] border-[hsl(240_10%_4%)] overflow-hidden">
                      <img
                        src={h.image}
                        alt={h.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="font-body text-[11px] text-white/60 group-hover:text-white/90 transition-colors max-w-[76px] text-center truncate">
                    {h.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Post grid */}
        {gallery.length > 0 && (
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {gallery.map((post, i) => (
              <motion.a
                key={i}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-zinc-800"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {post.isVideo && (
                  <div className="absolute top-3 right-3">
                    <Play className="w-5 h-5 text-white drop-shadow-lg fill-white" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Empty state — if no gallery, show CTA */}
        {gallery.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center mb-6">
              <Instagram className="w-10 h-10 text-white" />
            </div>
            <p className="font-body text-white/50 mb-6">
              Acompanhe os bastidores, negociações e conteúdo exclusivo.
            </p>
            <a
              href={`https://instagram.com/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-body text-sm font-bold text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)",
              }}
            >
              Ver no Instagram
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        )}

        {/* Footer CTA */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href={`https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm font-bold text-white/40 hover:text-white/80 transition-colors"
          >
            Ver mais no Instagram
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
