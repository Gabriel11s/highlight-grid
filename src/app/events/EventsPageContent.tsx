"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import EventDetailDrawer from "@/components/EventDetailDrawer";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import eventsHero from "@/assets/events-hero.jpg";
import danielRibeiro from "@/assets/daniel-ribeiro.jpg";
import danielPalestra from "@/assets/daniel-palestra.png";
import news1 from "@/assets/news-1.jpg";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { getI18nEvents, resolveI18nEvent } from "@/data/events-i18n";
import type { StaticImageData } from "next/image";

function imgSrc(img: string | StaticImageData | undefined): string {
  if (!img) return "/placeholder.svg";
  return typeof img === "string" ? img : img.src;
}

interface EventSpeaker {
  name: string;
  role: string;
  image: string | StaticImageData;
  profileUrl: string;
}

/* Events data is now in src/data/events-i18n.ts — fully internationalized */
const _legacyEvents = [
  {
    date: "APR 20",
    year: "2026",
    title: "Método Acelera",
    location: "Miami, FL",
    description: "Palestra exclusiva de Daniel Ribeiro sobre estratégias de crescimento no mercado automotivo americano, branding digital e oportunidades para empreendedores latinos nos EUA.",
    status: "Confirmed",
    featured: true,
    image: danielPalestra,
    segment: "Visibilidade / Premium",
    fullDescription: "Daniel Ribeiro, empreendedor e estrategista do mercado automotivo na Flórida, apresenta uma palestra exclusiva sobre como construir presença de marca, escalar operações de dealership e aproveitar oportunidades no mercado americano. Com experiência prática no setor, Daniel compartilha insights sobre branding digital, networking estratégico e as tendências que estão moldando o futuro do varejo automotivo nos EUA. Um evento imperdível para quem quer se posicionar de forma competitiva no mercado.",
    address: "Downtown Miami, FL (local exato a confirmar)",
    hours: "19h às 22h",
    website: "https://highlight-grid.lovable.app",
    howToParticipate: [
      "Acompanhe as redes sociais de Daniel Ribeiro para link de inscrição.",
      "Vagas limitadas — garanta sua presença antecipadamente.",
      "Networking session após a palestra com drinks e finger food.",
      "Traga cartões de visita para conexões estratégicas.",
    ],
    highlights: [
      "Palestra sobre crescimento no mercado automotivo dos EUA",
      "Estratégias de branding digital para dealerships",
      "Networking com empreendedores e profissionais do setor",
      "Insights sobre oportunidades para latinos no mercado americano",
      "Sessão de Q&A ao vivo com Daniel Ribeiro",
    ],
    ticketInfo: "Entrada gratuita mediante inscrição antecipada. Vagas limitadas a 100 participantes. VIP com acesso ao networking dinner: $75.",
    speaker: {
      name: "Daniel Ribeiro",
      role: "Empreendedor & Estrategista Automotivo",
      image: danielRibeiro,
      profileUrl: "/speaker/daniel-ribeiro",
    } as EventSpeaker,
  },
  {
    date: "MAR 28",
    year: "2026",
    title: "FuelFest Tampa",
    location: "Florida State Fairgrounds, Tampa",
    description: "Aftermarket, performance e branding com público entusiasta. Ativações e exposição para comunidades automotivas mais jovens e digitais.",
    status: "Confirmed",
    featured: true,
    image: news1,
    segment: "Entusiastas",
    fullDescription: "FuelFest é um dos maiores eventos de cultura automotiva dos EUA, reunindo entusiastas de carros, aftermarket parts, performance builds e branding digital. O evento em Tampa traz ativações de marcas, exposição de veículos modificados, competições de som automotivo, food trucks e experiências imersivas para o público jovem e digital. Uma oportunidade única para networking com a comunidade car culture da Flórida.",
    address: "4800 US-301, Tampa, FL 33610, USA",
    hours: "13h às 20h",
    website: "https://fuelfest.com",
    howToParticipate: [
      "Acesse fuelfest.com e selecione o evento de Tampa.",
      "Compre ingressos online (General Admission ou VIP).",
      "Para expositores: preencha o formulário de vendor/sponsor no site.",
      "Chegue cedo para garantir vaga no estacionamento — o evento lota rápido.",
    ],
    highlights: [
      "Mais de 500 veículos expostos",
      "Competições de som e burnout",
      "Ativações de marcas de aftermarket",
      "Área VIP com experiências exclusivas",
      "Food trucks e entretenimento ao vivo",
    ],
    ticketInfo: "Ingressos a partir de $30 (General Admission). VIP disponível por $75. Crianças menores de 5 anos entram grátis. Compra exclusivamente online.",
  },
  {
    date: "APR 04",
    year: "2026",
    title: "Bimmer Invasion West Palm Beach",
    location: "South Florida Fairgrounds, West Palm Beach",
    description: "Car show julgado, burnout, exhaust competitions, drift demos, vendors e mais de 150 mil pés quadrados de exposição.",
    status: "Confirmed",
    segment: "Entusiastas",
    fullDescription: "Bimmer Invasion é o maior evento BMW/performance do sudeste dos EUA. Com mais de 150.000 pés quadrados de área de exposição, o evento apresenta car show julgado com troféus, competições de burnout e exhaust, drift demos ao vivo, vendor marketplace e encontro da comunidade BMW. Ideal para owners de BMW, entusiastas de performance europeia e marcas do aftermarket.",
    address: "9067 Southern Blvd, West Palm Beach, FL 33411, USA",
    hours: "11h às 18h",
    website: "https://bimmerinvasion.com",
    howToParticipate: [
      "Visite bimmerinvasion.com para comprar ingressos de espectador.",
      "Para registrar seu carro no show: inscreva-se na categoria correta (Show & Shine, Euro, Modified).",
      "Vendors podem solicitar booth pelo formulário no site oficial.",
      "Chegue antes das 10h se for participante do car show para check-in.",
    ],
    highlights: [
      "Car show julgado com mais de 20 categorias",
      "Competição de burnout ao vivo",
      "Drift demos com pilotos profissionais",
      "Vendor marketplace com peças e acessórios",
      "Exhaust competition com medição de dB",
    ],
    ticketInfo: "Espectador: $25 antecipado / $35 na porta. Registro de carro: $45 (inclui entrada). Vendor booths a partir de $300.",
  },
  {
    date: "APR 13–15",
    year: "2026",
    title: "FIADA Used Car Summit",
    location: "Miami, FL",
    description: "Varejo automotivo, operação de loja, financiamento, compliance, compra e venda de usados e networking com dealers independentes.",
    status: "Strategic",
    segment: "Dealer / Usados",
    fullDescription: "O FIADA Used Car Summit é a principal conferência para dealers independentes de veículos usados na Flórida. O evento reúne palestras sobre operação de loja, buy-here-pay-here, compliance regulatório, tendências de financiamento, digital marketing para dealerships e sessões de networking estruturado. Essencial para quem opera no mercado de usados e quer se manter competitivo.",
    address: "Miami, FL (local exato a confirmar pela FIADA)",
    hours: "8h às 17h (3 dias)",
    website: "https://fiada.com",
    howToParticipate: [
      "Acesse fiada.com e busque pelo Used Car Summit 2026.",
      "Registre-se como participante (membro FIADA tem desconto).",
      "Para patrocinar ou expor: entre em contato pelo formulário de sponsors.",
      "Reserve hotel parceiro para tarifas especiais do evento.",
    ],
    highlights: [
      "Palestras sobre compliance e regulamentação na Flórida",
      "Workshops de digital marketing para dealerships",
      "Sessões de networking com dealers de todo o sudeste",
      "Painel sobre tendências de financiamento BHPH",
      "Exposição de ferramentas e software para dealers",
    ],
    ticketInfo: "Registro para membros FIADA: $199. Não-membros: $349. Inclui acesso a todas as palestras, workshops e área de exposição.",
  },
  {
    date: "APR 16–18",
    year: "2026",
    title: "Barrett-Jackson Palm Beach",
    location: "South Florida Fairgrounds, West Palm Beach",
    description: "Centenas de collector cars no-reserve, Exhibitor Marketplace, sponsor displays, Thrill Rides e Hot Laps.",
    status: "Registration Open",
    segment: "Collector / Luxo",
    fullDescription: "Barrett-Jackson é o leilão de collector cars mais prestigioso do mundo. A edição Palm Beach traz centenas de veículos clássicos, muscle cars, exóticos e restomods em formato no-reserve. Além do leilão principal, o evento conta com Exhibitor Marketplace, sponsor displays, Thrill Rides, Hot Laps e experiências VIP. Um dos eventos automotivos com maior peso comercial e visibilidade da Flórida.",
    address: "9067 Southern Blvd, West Palm Beach, FL 33411, USA",
    hours: "9h às 20h (3 dias, horários de leilão variam)",
    website: "https://barrett-jackson.com",
    howToParticipate: [
      "Acesse barrett-jackson.com e selecione Palm Beach 2026.",
      "Compre ingressos de espectador ou registre-se como bidder (requer pré-aprovação).",
      "Para consignar um veículo: preencha o formulário de consignment com fotos e histórico.",
      "Exhibitors podem solicitar espaço no Marketplace pelo portal de vendors.",
    ],
    highlights: [
      "Leilão no-reserve com centenas de collector cars",
      "Thrill Rides e Hot Laps com supercarros",
      "Exhibitor Marketplace com peças, arte e memorabilia",
      "Experiência VIP com hospitalidade premium",
      "Cobertura ao vivo na TV e streaming",
    ],
    ticketInfo: "Ingressos a partir de $40/dia. Pacote 3 dias: $99. Bidder registration: $400 (requer depósito). VIP packages disponíveis.",
  },
  {
    date: "APR 17–26",
    year: "2026",
    title: "Jeep Beach 2026",
    location: "Daytona International Speedway, Daytona Beach",
    description: "Main Event e Vendor Show em 24–25 de abril. Grande em comunidade, patrocínio, vendors e merchandising.",
    status: "Confirmed",
    segment: "Off-road / Comunidade",
    fullDescription: "Jeep Beach é o maior encontro de Jeep do sudeste dos EUA, reunindo milhares de jeepers durante 10 dias de atividades. O Main Event e Vendor Show acontecem nos dias 24–25 de abril no Daytona International Speedway. O evento inclui trail rides, obstacle courses, vendor show com mais de 200 expositores, beach crawl e ações beneficentes. Mais de US$ 5 milhões já foram doados para causas locais através do evento.",
    address: "1801 W International Speedway Blvd, Daytona Beach, FL 32114, USA",
    hours: "Main Event: 9h às 17h (24–25 de abril). Atividades durante toda a semana.",
    website: "https://jeepbeach.com",
    howToParticipate: [
      "Acesse jeepbeach.com para ver a agenda completa de 10 dias.",
      "Registre-se para o Main Event e trail rides (vagas limitadas).",
      "Vendors podem solicitar booth pelo portal de expositores.",
      "Participe do Beach Crawl e obstacle courses (inscrição separada).",
    ],
    highlights: [
      "Mais de 200 vendors e expositores",
      "Trail rides guiados pela região de Daytona",
      "Obstacle course no Speedway",
      "Beach Crawl coletivo pela praia",
      "Mais de US$ 5 milhões doados para caridade",
    ],
    ticketInfo: "Main Event: $20/dia. Trail rides: $35–$75 dependendo da trilha. Vendor booths a partir de $500. Registro do veículo para show: $30.",
  },
  {
    date: "MAY 01–03",
    year: "2026",
    title: "Formula 1 Miami Grand Prix",
    location: "Miami International Autodrome, Miami Gardens",
    description: "Sprint Qualifying na sexta, Sprint Race e Qualifying no sábado, GP no domingo.",
    status: "Confirmed",
    segment: "Visibilidade / Premium",
    fullDescription: "O Miami Grand Prix é uma das corridas mais glamorosas do calendário da Fórmula 1. Realizado no Miami International Autodrome, o evento de 3 dias inclui Sprint Qualifying na sexta, Sprint Race e Qualifying no sábado, e o Grand Prix no domingo. Além da corrida, o paddock club, fan zones, shows ao vivo e experiências de hospitalidade premium fazem deste um dos eventos automotivos de maior visibilidade global.",
    address: "347 Don Shula Dr, Miami Gardens, FL 33056, USA",
    hours: "Portões abrem às 9h. Atividades de pista das 10h às 18h (horários variam por dia).",
    website: "https://f1miamigp.com",
    howToParticipate: [
      "Acesse f1miamigp.com para comprar ingressos (vendem rápido).",
      "Escolha entre General Admission, Grandstand ou Hospitality packages.",
      "Para ativações de marca: entre em contato com o departamento de parcerias comerciais.",
      "Reserve transporte e hotel com antecedência — a região lota completamente.",
    ],
    highlights: [
      "Sprint Race no sábado + Grand Prix no domingo",
      "Fan zones com simuladores e experiências interativas",
      "Paddock Club e hospitality premium",
      "Shows e entretenimento ao vivo entre sessões",
      "Cobertura global — mais de 1 bilhão de espectadores na TV",
    ],
    ticketInfo: "General Admission: a partir de $300/dia. Grandstand: $500–$2,000/dia. Hospitality packages: $3,000–$15,000. Ingressos 3 dias disponíveis com desconto.",
  },
  {
    date: "MAY 07",
    year: "2026",
    title: "FLADA Dealer Hall of Fame",
    location: "Waldorf Astoria, Orlando",
    description: "Agenda institucional e de relacionamento do setor de concessionárias na Flórida.",
    status: "By Invitation",
    segment: "Institucional",
    fullDescription: "O FLADA Dealer Hall of Fame é o evento institucional mais importante da Florida Automobile Dealers Association. Realizado no luxuoso Waldorf Astoria Orlando, a noite celebra líderes do setor automotivo com premiações, reconhecimento de carreiras e networking de alto nível entre dealers franqueados, executivos de montadoras e figuras políticas do setor. Um evento de relacionamento estratégico por excelência.",
    address: "14200 Bonnet Creek Resort Ln, Orlando, FL 32821, USA",
    hours: "Recepção: 18h. Jantar e cerimônia: 19h às 22h.",
    website: "https://flada.com",
    howToParticipate: [
      "Evento exclusivo por convite — entre em contato com a FLADA para verificar elegibilidade.",
      "Membros FLADA podem solicitar convites pelo portal de membros.",
      "Oportunidades de patrocínio disponíveis pelo departamento de parcerias.",
      "Dress code: Black tie / formal.",
    ],
    highlights: [
      "Premiação Hall of Fame para líderes do setor",
      "Networking com executivos de concessionárias e montadoras",
      "Jantar de gala no Waldorf Astoria",
      "Oportunidades de patrocínio com alta visibilidade",
      "Presença de figuras políticas e regulatórias do setor",
    ],
    ticketInfo: "Evento por convite. Mesas de patrocínio disponíveis a partir de $5,000. Contate a FLADA para mais informações.",
  },
  {
    date: "MAY 30 – JUN 02",
    year: "2026",
    title: "Southeast Regional Independent Automotive Dealer Conference",
    location: "Hilton Sandestin Beach, Miramar Beach",
    description: "Primeira conferência regional para dealers independentes do Sudeste. Foco em ferramentas, conhecimento e parcerias.",
    status: "Registration Open",
    segment: "Dealer / Usados",
    fullDescription: "A primeira conferência regional dedicada exclusivamente a dealers independentes de automóveis do Sudeste dos EUA. Organizada com apoio da FIADA, o evento no Hilton Sandestin Beach oferece workshops intensivos sobre ferramentas digitais, gestão de inventário, financiamento, compliance, marketing e parcerias estratégicas. O formato resort incentiva networking em ambiente relaxado e produtivo.",
    address: "4000 Sandestin Blvd S, Miramar Beach, FL 32550, USA",
    hours: "9h às 18h (workshops e palestras). Eventos sociais à noite.",
    website: "https://fiada.com",
    howToParticipate: [
      "Acesse o site da FIADA e busque pela conferência regional 2026.",
      "Registre-se como participante (early bird pricing disponível).",
      "Reserve quarto no Hilton Sandestin Beach com tarifa especial do evento.",
      "Para expor ou patrocinar: acesse o portal de sponsors no site.",
    ],
    highlights: [
      "Workshops intensivos sobre gestão de dealership",
      "Painel sobre ferramentas digitais e CRM",
      "Sessões de compliance e regulamentação estadual",
      "Networking no resort à beira-mar",
      "Apoio institucional da FIADA",
    ],
    ticketInfo: "Early bird: $249 até 30 de abril. Regular: $399. Inclui acesso completo, materiais e eventos sociais. Hotel reservado separadamente.",
  },
];

const segmentColors: Record<string, string> = {
  "Entusiastas": "text-primary",
  "Dealer / Usados": "text-emerald-600",
  "Collector / Luxo": "text-amber-600",
  "Off-road / Comunidade": "text-sky-600",
  "Visibilidade / Premium": "text-primary",
  "Institucional": "text-neutral-500",
};

const EventsPageContent = () => {
  const { t, language } = useLanguage();
  const i18nEvents = getI18nEvents(danielRibeiro, danielPalestra, news1);
  const events = i18nEvents.map(e => resolveI18nEvent(e, language as Language));
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const searchParams = useSearchParams();
  const hasProcessedParam = useRef(false);

  useEffect(() => {
    if (hasProcessedParam.current) return;
    const eventParam = searchParams.get("event");
    if (eventParam) {
      hasProcessedParam.current = true;
      // Let the page render and settle, then smoothly open the drawer
      const timer = setTimeout(() => {
        const found = events.find(
          (e) => e.title.toLowerCase() === eventParam.toLowerCase()
        );
        if (found) {
          setSelectedEvent(found);
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero with newspaper image */}
      <section className="relative pt-16">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={imgSrc(eventsHero)} alt="Editorial newsroom" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        </div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 -mt-20 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
          >
            <span className="font-display uppercase tracking-[0.2em] text-sm md:text-base font-bold text-primary block mb-3">{t("events.semester")}</span>
            <h1 className="text-4xl md:text-6xl font-display font-black text-foreground tracking-tighter mb-4">
              {t("events.title")}
            </h1>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              {t("events.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured event */}
      <section className="px-6 lg:px-10 py-12 max-w-[1600px] mx-auto">
        <motion.div
          className="group cursor-pointer relative overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
          onClick={() => setSelectedEvent(events[0])}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="overflow-hidden">
              <img src={imgSrc(events[0].image)} alt={events[0].title} className="w-full aspect-[16/10] lg:aspect-auto lg:h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-bold tracking-[0.15em] uppercase bg-primary/10 border border-primary/20 text-primary mb-4 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {t("events.nextUp")}
              </span>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-display text-3xl font-black text-foreground">{events[0].date}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-black text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
                {events[0].title}
              </h2>
              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{events[0].description}</p>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                  <MapPin className="w-3 h-3" />{events[0].location}
                </span>
                <span className={`font-body text-[10px] font-bold tracking-[0.15em] uppercase ${segmentColors[events[0].segment]}`}>
                  {events[0].segment}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-primary font-body font-semibold">
                {t("events.viewDetails")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Events list */}
      <section className="px-6 lg:px-10 pb-24 max-w-[1600px] mx-auto">
        <div className="space-y-3">
          {events.slice(1).map((event, i) => (
            <motion.div
              key={i}
              className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-8 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md cursor-pointer transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const }}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="md:w-28 shrink-0">
                <span className="block font-display text-lg font-black text-foreground leading-tight">{event.date}</span>
                <span className="block font-body text-xs text-primary font-bold tracking-wider uppercase mt-0.5">{event.year}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-display font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body mt-1 line-clamp-2">{event.description}</p>
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                    <MapPin className="w-3 h-3" />{event.location}
                  </span>
                  <span className={`font-body text-[10px] font-bold tracking-[0.15em] uppercase ${segmentColors[event.segment]}`}>
                    {event.segment}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[9px] font-bold tracking-[0.15em] uppercase bg-primary/10 border border-primary/20 text-primary">
                  {event.status}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Event Detail Drawer */}
      <EventDetailDrawer event={selectedEvent} onClose={() => setSelectedEvent(null)} />

      <SiteFooter />
    </div>
  );
};

export default EventsPageContent;
