"use client";

import StorytellingHero from "@/components/storytelling/StorytellingHero";
import TimelineSection from "@/components/storytelling/TimelineSection";
import CounterSection from "@/components/storytelling/CounterSection";
import EventPromoSection from "@/components/storytelling/EventPromoSection";
import StorytellingCTA from "@/components/storytelling/StorytellingCTA";
import ParallaxQuote from "@/components/storytelling/ParallaxQuote";
import BrandShowcase from "@/components/storytelling/BrandShowcase";
import MediaMentions from "@/components/storytelling/MediaMentions";
import InstagramFeed from "@/components/storytelling/InstagramFeed";
import SplitTextReveal from "@/components/storytelling/SplitTextReveal";
import HighlightReel from "@/components/storytelling/HighlightReel";
import MomentosCarousel from "@/components/storytelling/MomentosCarousel";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useInstagramProfile } from "@/hooks/useInstagramProfile";
import danielRibeiro from "@/assets/daniel-ribeiro.jpg";
import danielPalestra from "@/assets/daniel-palestra.png";

/* ─── MOMENTOS CAROUSEL — Real photos with captions ─── */
const momentos = [
  { src: "/daniel/stage-mic.png", caption: "No palco do Método Acelera — compartilhando estratégias com centenas de lojistas", year: "2026" },
  { src: "/daniel/team-dsm.png", caption: "Equipe DSM Multimarcas reunida no showroom de Curitiba", year: "2024" },
  { src: "/daniel/neymar.png", caption: "Encontro com Neymar — referência dentro e fora do campo", year: "2024" },
  { src: "/daniel/acelera-stage.png", caption: "Evento Acelera — palco, convidados e energia da comunidade", year: "2026" },
  { src: "/daniel/podcast.png", caption: "Gravando podcast — bastidores e reflexões sobre o mercado automotivo", year: "2026" },
  { src: "/daniel/office-close.png", caption: "No escritório da DSM — assinando contratos e fechando negócios", year: "2024" },
  { src: "/daniel/lecture-white.png", caption: "Palestra para lojistas — método na prática, resultado real", year: "2024" },
  { src: "/daniel/acelera-crowd.png", caption: "Conectando com a plateia no Acelera — energia que transforma", year: "2026" },
  { src: "/daniel/conference-phone.png", caption: "Em conferência — monitorando resultados em tempo real", year: "2025" },
  { src: "/daniel/lecture-cap-front.png", caption: "Treinamento intensivo — cada detalhe importa na negociação", year: "2024" },
  { src: "/daniel/story-red-cap.png", caption: "Ou você perde o medo, ou a oportunidade", year: "2025" },
  { src: "/daniel/office-wide.png", caption: "Visão estratégica — planejando o próximo passo da DSM", year: "2024" },
  { src: "/daniel/hero-profile.png", caption: "Daniel Ribeiro — do Capão Redondo ao topo do mercado automotivo", year: "2026" },
  { src: "/daniel/lecture-cap-side.png", caption: "Cada palestra é uma oportunidade de mudar vidas", year: "2024" },
];

const BRAND_COLOR = "hsl(35 90% 55%)"; // Gold/amber — matches his visual identity

/* ─── REAL DATA FROM PUBLIC RESEARCH ─── */

const timeline = [
  {
    year: "~2007",
    title: "Saiu do Capão Redondo",
    description:
      "Nascido e criado na Zona Sul de São Paulo, deixou o bairro aos 20 anos rumo a Curitiba. Sem estudo formal, carregava determinação e a experiência de uma infância que forjou resiliência.",
    image: "/daniel/office-close.png",
  },
  {
    year: "2018",
    title: "Nasce a DSM Multimarcas",
    description:
      "Com R$ 150 mil e três carros no pátio, fundou a DSM Multimarcas Comércio de Veículos em Curitiba. A aposta: transparência total, câmera ligada e negociação ao vivo como contrato de confiança.",
    image: "/daniel/team-dsm.png",
  },
  {
    year: "2020",
    title: "D87 Garage entra em cena",
    description:
      "Inaugurou a D87 Garage, expandindo o ecossistema automotivo. O modelo de consignação e conteúdo digital começou a atrair atenção nacional — e celebridades começaram a aparecer no pátio.",
    image: "/daniel/neymar.png",
  },
  {
    year: "2024",
    title: "Método DSM Acelera",
    description:
      "Formalizou o know-how em empresa de treinamento. O Acelerador de Vendas Método Daniel Ribeiro nasceu para ensinar lojistas a dominar vendas com método, não talento. Mais de 3 mil lojistas impactados.",
    image: "/daniel/acelera-stage.png",
  },
  {
    year: "2026",
    title: "Além da Favela",
    description:
      "Lançou o livro 'Além da Favela — Uma Escada Para o Amanhã', sintetizando a jornada do Capão Redondo ao comando de uma operação que vende mais de 150 veículos por mês. Palestras, imersões e o G4 Podcasts consolidaram sua voz no setor.",
    image: "/daniel/podcast.png",
  },
];

const stats = [
  { value: 150, suffix: "+", label: "Veículos vendidos/mês" },
  { value: 758, suffix: "K", label: "Seguidores Instagram" },
  { value: 3000, suffix: "+", label: "Lojistas treinados" },
  { value: 30, suffix: "M+", label: "Views no TikTok" },
];

const brands = [
  {
    name: "DSM Multimarcas",
    role: "CEO & Fundador",
    year: "2018",
    description:
      "Operação varejista e consignada de veículos em Curitiba. Mais de 150 carros vendidos por mês com modelo baseado em transparência, câmera ao vivo e geração de demanda via conteúdo digital.",
    href: "https://instagram.com/dsm_multimarcas1",
  },
  {
    name: "D87 Garage",
    role: "Sócio-Fundador",
    year: "2020",
    description:
      "Showroom e vitrine digital com mais de 49 mil seguidores e 17 mil publicações. Foco em ofertas, bastidores e prova social com celebridades e influenciadores.",
    href: "https://instagram.com/d87.garage",
  },
  {
    name: "Método DSM Acelera",
    role: "Criador",
    year: "2024",
    description:
      "Programa de treinamento profissional para lojistas do setor automotivo. Imersões em Alphaville, palestras nacionais e o Protocolo Negociador como produto educacional estruturado.",
    href: "https://metododsm.com.br",
  },
  {
    name: "D87 Burger",
    role: "Sócio",
    year: "2021",
    description:
      "Expansão para o ramo alimentício em Curitiba. Diversificação de portfólio mantendo a essência empreendedora e a lógica de marca pessoal forte.",
  },
];

const mediaMentions = [
  {
    outlet: "G4 Podcasts",
    title: "Por Dentro de uma Multimarcas de Sucesso — Os Bastidores do Negócio de Carros",
    type: "podcast" as const,
    date: "Jan 2026",
    href: "https://music.amazon.com.br/podcasts/65211ad3-45b9-48d4-850c-1640efe6722c/episodes/11fa59dc-7ea9-4a85-be30-c9c091ec5506/",
  },
  {
    outlet: "Notícias Automotivas",
    title: "Vendedor de carros de Curitiba fica famoso no TikTok",
    type: "article" as const,
    date: "Set 2024",
    href: "https://www.noticiasautomotivas.com.br/vendedor-de-carros-de-curitiba-fica-famoso-no-tiktok/",
  },
  {
    outlet: "Pinfercast",
    title: "Empreendedorismo automotivo e construção de marca pessoal",
    type: "podcast" as const,
    date: "2024",
  },
  {
    outlet: "iG Lorena",
    title: "Empresário Daniel Ribeiro vira sucesso em Curitiba com visitas de artistas",
    type: "article" as const,
    date: "Set 2021",
  },
];

/* Instagram highlights — real highlights from @daniel.ribeiro87 */
const instagramHighlights = [
  { label: "Acelera", image: "/daniel/acelera-crowd.png", href: "https://www.instagram.com/stories/highlights/18039470560877181/" },
  { label: "DSM", image: "/daniel/team-dsm.png", href: "https://instagram.com/daniel.ribeiro87" },
  { label: "Palestras", image: "/daniel/lecture-white.png", href: "https://instagram.com/daniel.ribeiro87" },
  { label: "Bastidores", image: "/daniel/office-close.png", href: "https://instagram.com/daniel.ribeiro87" },
  { label: "Podcast", image: "/daniel/podcast.png", href: "https://instagram.com/daniel.ribeiro87" },
  { label: "Networking", image: "/daniel/neymar.png", href: "https://instagram.com/daniel.ribeiro87" },
];

/* Instagram gallery — real photos that link to the profile */
const instagramGallery = [
  { image: "/daniel/stage-mic.png", href: "https://instagram.com/daniel.ribeiro87", isVideo: false },
  { image: "/daniel/acelera-stage.png", href: "https://instagram.com/daniel.ribeiro87", isVideo: false },
  { image: "/daniel/lecture-cap-front.png", href: "https://instagram.com/daniel.ribeiro87", isVideo: true },
  { image: "/daniel/office-wide.png", href: "https://instagram.com/daniel.ribeiro87", isVideo: false },
  { image: "/daniel/conference-phone.png", href: "https://instagram.com/daniel.ribeiro87", isVideo: false },
  { image: "/daniel/story-red-cap.png", href: "https://instagram.com/daniel.ribeiro87", isVideo: true },
  { image: "/daniel/lecture-white.png", href: "https://instagram.com/daniel.ribeiro87", isVideo: false },
  { image: "/daniel/acelera-crowd.png", href: "https://instagram.com/daniel.ribeiro87", isVideo: false },
  { image: "/daniel/neymar.png", href: "https://instagram.com/daniel.ribeiro87", isVideo: false },
];

const highlights = [
  { emoji: "🚗", label: "150+ carros/mês" },
  { emoji: "📱", label: "758K seguidores" },
  { emoji: "🎤", label: "G4 Podcasts" },
  { emoji: "📖", label: "Além da Favela" },
  { emoji: "🏆", label: "3000+ lojistas treinados" },
  { emoji: "🎬", label: "30M+ views TikTok" },
  { emoji: "🏢", label: "4 empresas" },
  { emoji: "⚡", label: "Método DSM Acelera" },
  { emoji: "🇧🇷", label: "Do Capão ao topo" },
];

const upcomingEvents = [
  {
    title: "Imersão Método DSM Acelera",
    date: "2026-04-09",
    location: "Alphaville, São Paulo",
    description:
      "Imersão presencial com carga horária completa sobre estratégias de venda no setor automotivo. Metodologia prática, cases reais e networking com lojistas de todo o Brasil.",
    href: "https://metododsm.com.br",
    image: "/daniel/acelera-crowd.png",
    ticketInfo: "Modalidades de acesso: Standard, VIP e Premium. Vagas limitadas.",
  },
];

const SpeakerPageContent = ({ slug }: { slug: string }) => {
  const heroImg = typeof danielRibeiro === "string" ? danielRibeiro : danielRibeiro.src;
  const { profile: liveProfile, isLive } = useInstagramProfile("daniel.ribeiro87");

  // Use live data if available, otherwise static
  const igFollowers = isLive && liveProfile ? `${Math.round(liveProfile.followersCount / 1000)}K` : "758K";
  const igPosts = isLive && liveProfile ? liveProfile.postsCount : 1986;
  const igBio = isLive && liveProfile ? liveProfile.biography : "CEO DSM Multimarcas | D87 Garage | Venda é método. Casado.";
  const igProfilePic = isLive && liveProfile?.profilePicUrl ? liveProfile.profilePicUrl : "/daniel/hero-profile.png";

  // Build Instagram gallery from live posts or fallback to static
  const igGallery = isLive && liveProfile?.posts?.length
    ? liveProfile.posts.slice(0, 9).map((p) => ({
        image: p.imageUrl,
        href: p.href,
        isVideo: p.isVideo,
        likes: p.likesCount > 0 ? String(p.likesCount) : undefined,
        comments: p.commentsCount > 0 ? String(p.commentsCount) : undefined,
      }))
    : instagramGallery;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* 1. HERO — Fullscreen parallax */}
      <StorytellingHero
        name="Daniel Ribeiro"
        tagline="Do Capão Redondo ao Topo do Mercado Automotivo"
        image={heroImg}
        brandColor={BRAND_COLOR}
      />

      {/* 2. MANIFESTO — Split text reveal */}
      <SplitTextReveal
        topLine="Venda não é"
        bottomLine="talento. É método."
        description="CEO da DSM Multimarcas e D87 Garage, Daniel Ribeiro saiu da Zona Sul de São Paulo com uma visão: provar que qualquer pessoa com método, disciplina e transparência pode construir um império. Hoje comanda uma operação que vende mais de 150 veículos por mês em Curitiba e treina milhares de lojistas pelo Brasil."
        brandColor={BRAND_COLOR}
      />

      {/* 3. HIGHLIGHTS REEL — Infinite scroll ticker */}
      <HighlightReel highlights={highlights} brandColor={BRAND_COLOR} />

      {/* 4. TIMELINE — A Jornada */}
      <TimelineSection
        title="A Jornada"
        items={timeline}
        brandColor={BRAND_COLOR}
      />

      {/* 5. PARALLAX QUOTE */}
      <ParallaxQuote
        quote="Comecei com R$ 150 mil e três carros. Hoje a câmera é meu contrato de confiança."
        attribution="Daniel Ribeiro, G4 Podcasts"
        brandColor={BRAND_COLOR}
      />

      {/* 6. COUNTERS — Impact numbers */}
      <CounterSection stats={stats} brandColor={BRAND_COLOR} />

      {/* 7. BRAND SHOWCASE — Ecossistema */}
      <BrandShowcase
        title="O Ecossistema"
        subtitle="Quatro empresas. Uma filosofia: transparência gera confiança, confiança gera venda."
        brands={brands}
        brandColor={BRAND_COLOR}
      />

      {/* 8. MEDIA MENTIONS */}
      <MediaMentions
        title="Na Mídia"
        mentions={mediaMentions}
        brandColor={BRAND_COLOR}
      />

      {/* 9. MOMENTOS CAROUSEL — Horizontal scroll with real photos */}
      <MomentosCarousel
        title="Momentos"
        items={momentos}
        brandColor={BRAND_COLOR}
      />

      {/* 10. INSTAGRAM FEED — live data with fallback */}
      <InstagramFeed
        handle="daniel.ribeiro87"
        followers={igFollowers}
        posts={igPosts}
        brandColor={BRAND_COLOR}
        bio={igBio}
        profileImage={igProfilePic}
        highlights={instagramHighlights}
        gallery={igGallery}
      />

      {/* 10. UPCOMING EVENT */}
      <EventPromoSection
        title="Próximo Evento"
        events={upcomingEvents}
        brandColor={BRAND_COLOR}
      />

      {/* 11. CTA FINAL */}
      <StorytellingCTA
        headline="Quer dominar o jogo?"
        description="Conheça o Método DSM Acelera, acompanhe a jornada nas redes ou entre em contato para parcerias e eventos."
        ctaText="Acessar o Método"
        ctaHref="https://metododsm.com.br"
        brandColor={BRAND_COLOR}
        socialLinks={[
          { platform: "instagram", url: "https://instagram.com/daniel.ribeiro87" },
          { platform: "tiktok", url: "https://tiktok.com/@daniel.ribeiro87" },
          { platform: "youtube", url: "https://www.youtube.com/@daniel.ribeiro87" },
          { platform: "website", url: "https://metododsm.com.br" },
        ]}
      />

      <SiteFooter />
    </div>
  );
};

export default SpeakerPageContent;
