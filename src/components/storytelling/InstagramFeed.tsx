"use client";

import { motion } from "framer-motion";
import { Instagram, ExternalLink, Heart, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";

interface InstagramPost {
  image: string;
  likes?: string;
  comments?: string;
  href: string;
}

interface InstagramFeedProps {
  handle: string;
  followers: string;
  posts: number;
  brandColor?: string;
  gallery: InstagramPost[];
  embedPostUrls?: string[];
  profileImage?: string;
  bio?: string;
}

export default function InstagramFeed({
  handle,
  followers,
  posts,
  brandColor = "hsl(35 90% 55%)",
  gallery,
  embedPostUrls,
  profileImage,
  bio,
}: InstagramFeedProps) {
  const embedRef = useRef<HTMLDivElement>(null);

  // Load Instagram embed script
  useEffect(() => {
    if (!embedPostUrls?.length) return;
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      // @ts-expect-error — Instagram global
      if (window.instgrm) window.instgrm.Embeds.process();
    };
    return () => { document.body.removeChild(script); };
  }, [embedPostUrls]);

  return (
    <section className="py-32 px-6 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-[3px] bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={handle}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <Instagram className="w-8 h-8 text-foreground" />
                  </div>
                )}
              </div>
              {/* Verified badge */}
              <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-[#3897f0] flex items-center justify-center ring-2 ring-background">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-display text-2xl font-black text-foreground tracking-tight">
                @{handle}
              </h3>
              {bio && (
                <p className="font-body text-xs text-muted-foreground mt-0.5 max-w-xs">{bio}</p>
              )}
              <div className="flex items-center gap-4 mt-1.5">
                <span className="font-body text-sm text-muted-foreground">
                  <strong className="text-foreground">{followers}</strong> seguidores
                </span>
                <span className="font-body text-sm text-muted-foreground">
                  <strong className="text-foreground">{posts.toLocaleString()}</strong> posts
                </span>
              </div>
            </div>
          </div>

          <a
            href={`https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-body text-sm font-bold tracking-[0.1em] uppercase text-white transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)",
            }}
          >
            Seguir
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Instagram Embeds (official) */}
        {embedPostUrls && embedPostUrls.length > 0 && (
          <div ref={embedRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {embedPostUrls.map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="[&_iframe]:!rounded-xl [&_iframe]:!border-border"
              >
                <blockquote
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink={url}
                  style={{
                    background: "transparent",
                    border: 0,
                    borderRadius: "12px",
                    margin: 0,
                    maxWidth: "100%",
                    minWidth: "100%",
                    padding: 0,
                    width: "100%",
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Fallback gallery grid */}
        {(!embedPostUrls || embedPostUrls.length === 0) && gallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {gallery.map((post, i) => (
              <motion.a
                key={i}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-xl overflow-hidden bg-muted"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                  {post.likes && (
                    <span className="flex items-center gap-1.5 text-white font-body text-sm font-bold">
                      <Heart className="w-4 h-4 fill-white" />
                      {post.likes}
                    </span>
                  )}
                  {post.comments && (
                    <span className="flex items-center gap-1.5 text-white font-body text-sm font-bold">
                      <MessageCircle className="w-4 h-4 fill-white" />
                      {post.comments}
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* CTA to profile */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href={`https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver mais no Instagram
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
