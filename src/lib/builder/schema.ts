/**
 * NEWS Visual Builder — Block Schema
 *
 * Each profile/post page is a JSON document containing:
 * - metadata (title, slug, brandColor, author info)
 * - blocks[] — ordered array of section blocks
 *
 * Each block has a `type` that maps to a storytelling component,
 * plus a `props` object matching that component's props.
 */

/* ─── BLOCK TYPES ─── */

export type BlockType =
  | "hero"
  | "split-text"
  | "highlight-reel"
  | "timeline"
  | "parallax-quote"
  | "counters"
  | "brand-showcase"
  | "media-mentions"
  | "instagram-feed"
  | "event-promo"
  | "cta"
  | "rich-text"
  | "image-full"
  | "spacer";

/* ─── BLOCK DEFINITIONS ─── */

export interface HeroBlock {
  type: "hero";
  props: {
    name: string;
    tagline: string;
    image: string;
  };
}

export interface SplitTextBlock {
  type: "split-text";
  props: {
    topLine: string;
    bottomLine: string;
    description: string;
  };
}

export interface HighlightReelBlock {
  type: "highlight-reel";
  props: {
    highlights: { emoji: string; label: string }[];
  };
}

export interface TimelineBlock {
  type: "timeline";
  props: {
    title?: string;
    items: { year: string; title: string; description: string }[];
  };
}

export interface ParallaxQuoteBlock {
  type: "parallax-quote";
  props: {
    quote: string;
    attribution?: string;
  };
}

export interface CountersBlock {
  type: "counters";
  props: {
    stats: { value: number; suffix?: string; prefix?: string; label: string }[];
  };
}

export interface BrandShowcaseBlock {
  type: "brand-showcase";
  props: {
    title?: string;
    subtitle?: string;
    brands: {
      name: string;
      role: string;
      year: string;
      description: string;
      href?: string;
    }[];
  };
}

export interface MediaMentionsBlock {
  type: "media-mentions";
  props: {
    title?: string;
    mentions: {
      outlet: string;
      title: string;
      type: "podcast" | "article" | "video";
      date: string;
      href?: string;
    }[];
  };
}

export interface InstagramFeedBlock {
  type: "instagram-feed";
  props: {
    handle: string;
    followers: string;
    posts: number;
    gallery: {
      image: string;
      likes?: string;
      comments?: string;
      href: string;
    }[];
  };
}

export interface EventPromoBlock {
  type: "event-promo";
  props: {
    title?: string;
    events: {
      title: string;
      date: string;
      location: string;
      description: string;
      href: string;
      image?: string;
      ticketInfo?: string;
    }[];
  };
}

export interface CTABlock {
  type: "cta";
  props: {
    headline: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    socialLinks?: { platform: string; url: string }[];
  };
}

export interface RichTextBlock {
  type: "rich-text";
  props: {
    content: string; // HTML or markdown
    align?: "left" | "center" | "right";
    maxWidth?: string;
  };
}

export interface ImageFullBlock {
  type: "image-full";
  props: {
    src: string;
    alt: string;
    caption?: string;
    aspectRatio?: string;
  };
}

export interface SpacerBlock {
  type: "spacer";
  props: {
    height: number; // in px
  };
}

export type Block =
  | HeroBlock
  | SplitTextBlock
  | HighlightReelBlock
  | TimelineBlock
  | ParallaxQuoteBlock
  | CountersBlock
  | BrandShowcaseBlock
  | MediaMentionsBlock
  | InstagramFeedBlock
  | EventPromoBlock
  | CTABlock
  | RichTextBlock
  | ImageFullBlock
  | SpacerBlock;

/* ─── PAGE DOCUMENT ─── */

export interface PageDocument {
  id: string;
  slug: string;
  title: string;
  brandColor: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

/* ─── BLOCK CATALOG (for the editor UI) ─── */

export interface BlockCatalogItem {
  type: BlockType;
  label: string;
  icon: string;
  description: string;
  defaultProps: Record<string, unknown>;
}

export const BLOCK_CATALOG: BlockCatalogItem[] = [
  {
    type: "hero",
    label: "Hero",
    icon: "🖼️",
    description: "Full-screen hero com foto, nome e tagline",
    defaultProps: { name: "Seu Nome", tagline: "Sua tagline aqui", image: "" },
  },
  {
    type: "split-text",
    label: "Manifesto",
    icon: "✍️",
    description: "Texto grande dividido em duas linhas com descrição",
    defaultProps: { topLine: "Linha 1", bottomLine: "Linha 2", description: "Descrição aqui..." },
  },
  {
    type: "highlight-reel",
    label: "Destaques",
    icon: "⚡",
    description: "Ticker infinito com badges de destaque",
    defaultProps: { highlights: [{ emoji: "🚀", label: "Destaque 1" }] },
  },
  {
    type: "timeline",
    label: "Timeline",
    icon: "📅",
    description: "Linha do tempo com marcos da jornada",
    defaultProps: { title: "A Jornada", items: [{ year: "2024", title: "Marco", description: "Descrição..." }] },
  },
  {
    type: "parallax-quote",
    label: "Citação",
    icon: "💬",
    description: "Citação grande com efeito parallax",
    defaultProps: { quote: "Sua citação inspiradora aqui.", attribution: "Autor" },
  },
  {
    type: "counters",
    label: "Números",
    icon: "📊",
    description: "Contadores animados de impacto",
    defaultProps: { stats: [{ value: 100, suffix: "+", label: "Métrica" }] },
  },
  {
    type: "brand-showcase",
    label: "Marcas",
    icon: "🏢",
    description: "Grid de empresas/marcas com detalhes",
    defaultProps: { title: "Ecossistema", brands: [{ name: "Marca", role: "Cargo", year: "2024", description: "..." }] },
  },
  {
    type: "media-mentions",
    label: "Mídia",
    icon: "📰",
    description: "Aparições em mídia e podcasts",
    defaultProps: { title: "Na Mídia", mentions: [{ outlet: "Veículo", title: "Título", type: "article", date: "2024" }] },
  },
  {
    type: "instagram-feed",
    label: "Instagram",
    icon: "📸",
    description: "Feed do Instagram com stats e gallery",
    defaultProps: { handle: "seuhandle", followers: "10K", posts: 100, gallery: [] },
  },
  {
    type: "event-promo",
    label: "Evento",
    icon: "🎤",
    description: "Promoção de evento com countdown",
    defaultProps: { title: "Próximo Evento", events: [{ title: "Evento", date: "2026-12-31", location: "Local", description: "...", href: "#" }] },
  },
  {
    type: "cta",
    label: "CTA Final",
    icon: "🚀",
    description: "Call-to-action com redes sociais",
    defaultProps: { headline: "Vamos conectar?", description: "Entre em contato.", ctaText: "Saiba mais", ctaHref: "#" },
  },
  {
    type: "rich-text",
    label: "Texto",
    icon: "📝",
    description: "Bloco de texto livre",
    defaultProps: { content: "Seu texto aqui...", align: "left" },
  },
  {
    type: "image-full",
    label: "Imagem",
    icon: "🖼️",
    description: "Imagem full-width com legenda",
    defaultProps: { src: "", alt: "Imagem", caption: "" },
  },
  {
    type: "spacer",
    label: "Espaço",
    icon: "↕️",
    description: "Espaçamento entre seções",
    defaultProps: { height: 64 },
  },
];
