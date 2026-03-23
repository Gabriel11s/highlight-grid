"use client";

import { motion } from "framer-motion";
import type { Block, PageDocument } from "./schema";

/* ─── Lazy-loaded storytelling components ─── */
import StorytellingHero from "@/components/storytelling/StorytellingHero";
import SplitTextReveal from "@/components/storytelling/SplitTextReveal";
import HighlightReel from "@/components/storytelling/HighlightReel";
import TimelineSection from "@/components/storytelling/TimelineSection";
import ParallaxQuote from "@/components/storytelling/ParallaxQuote";
import CounterSection from "@/components/storytelling/CounterSection";
import BrandShowcase from "@/components/storytelling/BrandShowcase";
import MediaMentions from "@/components/storytelling/MediaMentions";
import InstagramFeed from "@/components/storytelling/InstagramFeed";
import EventPromoSection from "@/components/storytelling/EventPromoSection";
import StorytellingCTA from "@/components/storytelling/StorytellingCTA";

/* ─── Generic blocks (inline) ─── */

function RichTextBlock({ content, align = "left", maxWidth = "48rem" }: { content: string; align?: string; maxWidth?: string }) {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="mx-auto" style={{ maxWidth, textAlign: align as "left" | "center" | "right" }}>
        <motion.div
          className="font-body text-base text-muted-foreground leading-relaxed prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </section>
  );
}

function ImageFullBlock({ src, alt, caption, aspectRatio }: { src: string; alt: string; caption?: string; aspectRatio?: string }) {
  return (
    <section className="px-6 py-8 bg-background">
      <motion.figure
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full rounded-2xl object-cover"
            style={aspectRatio ? { aspectRatio } : undefined}
          />
        ) : (
          <div
            className="w-full rounded-2xl bg-muted flex items-center justify-center text-muted-foreground font-body text-sm"
            style={{ aspectRatio: aspectRatio ?? "16/9" }}
          >
            Adicione uma imagem
          </div>
        )}
        {caption && (
          <figcaption className="mt-3 text-center font-body text-sm text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </motion.figure>
    </section>
  );
}

function SpacerBlock({ height }: { height: number }) {
  return <div style={{ height: `${height}px` }} />;
}

/* ─── RENDERER ─── */

interface BlockRendererProps {
  block: Block;
  brandColor: string;
  isEditing?: boolean;
  onSelect?: () => void;
}

export function BlockRenderer({ block, brandColor, isEditing, onSelect }: BlockRendererProps) {
  const wrapper = isEditing ? (
    <div
      className="relative group cursor-pointer"
      onClick={onSelect}
    >
      {/* Edit indicator */}
      <div className="absolute -top-2 -left-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary text-primary-foreground text-xs font-body font-bold">
          ✏️ {block.type}
        </span>
      </div>
      <div className="group-hover:ring-2 ring-primary/30 rounded-lg transition-all">
        {renderBlock(block, brandColor)}
      </div>
    </div>
  ) : (
    renderBlock(block, brandColor)
  );

  return wrapper;
}

function renderBlock(block: Block, brandColor: string) {
  switch (block.type) {
    case "hero":
      return <StorytellingHero {...block.props} brandColor={brandColor} />;
    case "split-text":
      return <SplitTextReveal {...block.props} brandColor={brandColor} />;
    case "highlight-reel":
      return <HighlightReel {...block.props} brandColor={brandColor} />;
    case "timeline":
      return <TimelineSection {...block.props} brandColor={brandColor} />;
    case "parallax-quote":
      return <ParallaxQuote {...block.props} brandColor={brandColor} />;
    case "counters":
      return <CounterSection {...block.props} brandColor={brandColor} />;
    case "brand-showcase":
      return <BrandShowcase {...block.props} brandColor={brandColor} />;
    case "media-mentions":
      return <MediaMentions {...block.props} brandColor={brandColor} />;
    case "instagram-feed":
      return <InstagramFeed {...block.props} brandColor={brandColor} />;
    case "event-promo":
      return <EventPromoSection {...block.props} brandColor={brandColor} />;
    case "cta":
      return <StorytellingCTA {...block.props} brandColor={brandColor} />;
    case "rich-text":
      return <RichTextBlock {...block.props} />;
    case "image-full":
      return <ImageFullBlock {...block.props} />;
    case "spacer":
      return <SpacerBlock {...block.props} />;
    default:
      return (
        <div className="py-8 px-6 text-center text-muted-foreground font-body text-sm">
          Bloco desconhecido: {(block as Block).type}
        </div>
      );
  }
}

/* ─── FULL PAGE RENDERER ─── */

interface PageRendererProps {
  document: PageDocument;
  isEditing?: boolean;
  onSelectBlock?: (index: number) => void;
}

export function PageRenderer({ document: doc, isEditing, onSelectBlock }: PageRendererProps) {
  return (
    <div className="min-h-screen bg-background">
      {doc.blocks.map((block, i) => (
        <BlockRenderer
          key={`${block.type}-${i}`}
          block={block}
          brandColor={doc.brandColor}
          isEditing={isEditing}
          onSelect={() => onSelectBlock?.(i)}
        />
      ))}
    </div>
  );
}
