/**
 * Internationalized event content
 * Each text field maps to translations for all supported languages
 */

import type { Language } from "@/contexts/LanguageContext";

type I18nText = Record<Language, string>;

function i18n(texts: Partial<Record<Language, string>> & { en: string; pt: string }): I18nText {
  // Fallback chain: requested → en → pt
  const base = texts.en;
  return {
    en: texts.en,
    pt: texts.pt,
    es: texts.es || base,
    fr: texts.fr || base,
    de: texts.de || base,
    it: texts.it || base,
    zh: texts.zh || base,
    ja: texts.ja || base,
    ko: texts.ko || base,
    ar: texts.ar || base,
  };
}

export interface I18nEvent {
  date: string;
  year: string;
  title: I18nText;
  location: I18nText;
  description: I18nText;
  status: I18nText;
  segment: string;
  featured?: boolean;
  image?: any;
  fullDescription: I18nText;
  address: string;
  hours: string;
  website: string;
  howToParticipate: I18nText[];
  highlights: I18nText[];
  ticketInfo: I18nText;
  speaker?: {
    name: string;
    role: I18nText;
    image: any;
    profileUrl: string;
  };
}

export function resolveI18nEvent(event: I18nEvent, lang: Language) {
  const r = (t: I18nText) => t[lang] || t.en;
  return {
    date: event.date,
    year: event.year,
    title: r(event.title),
    location: r(event.location),
    description: r(event.description),
    status: r(event.status),
    segment: event.segment,
    featured: event.featured,
    image: event.image,
    fullDescription: r(event.fullDescription),
    address: event.address,
    hours: event.hours,
    website: event.website,
    howToParticipate: event.howToParticipate.map(r),
    highlights: event.highlights.map(r),
    ticketInfo: r(event.ticketInfo),
    speaker: event.speaker ? {
      name: event.speaker.name,
      role: r(event.speaker.role),
      image: event.speaker.image,
      profileUrl: event.speaker.profileUrl,
    } : undefined,
  };
}

// ═══════════════════════════════════════════════
// EVENT DATA WITH FULL i18n
// ═══════════════════════════════════════════════

export function getI18nEvents(danielRibeiro: any, danielPalestra: any, news1: any): I18nEvent[] {
  return [
    {
      date: "APR 20",
      year: "2026",
      title: i18n({ en: "Método Acelera", pt: "Método Acelera", es: "Método Acelera", de: "Método Acelera", fr: "Méthode Acelera" }),
      location: i18n({ en: "Miami, FL", pt: "Miami, FL" }),
      description: i18n({
        en: "Exclusive talk by Daniel Ribeiro on growth strategies in the American automotive market, digital branding and opportunities for Latino entrepreneurs in the US.",
        pt: "Palestra exclusiva de Daniel Ribeiro sobre estratégias de crescimento no mercado automotivo americano, branding digital e oportunidades para empreendedores latinos nos EUA.",
        es: "Charla exclusiva de Daniel Ribeiro sobre estrategias de crecimiento en el mercado automotriz americano, branding digital y oportunidades para emprendedores latinos en EEUU.",
        de: "Exklusiver Vortrag von Daniel Ribeiro über Wachstumsstrategien im amerikanischen Automobilmarkt, digitales Branding und Chancen für lateinamerikanische Unternehmer in den USA.",
        fr: "Conférence exclusive de Daniel Ribeiro sur les stratégies de croissance du marché automobile américain, le branding digital et les opportunités pour les entrepreneurs latinos aux USA.",
      }),
      status: i18n({ en: "Confirmed", pt: "Confirmado", es: "Confirmado", de: "Bestätigt", fr: "Confirmé", it: "Confermato", zh: "已确认", ja: "確定", ko: "확정", ar: "مؤكد" }),
      featured: true,
      image: danielPalestra,
      segment: "Visibilidade / Premium",
      fullDescription: i18n({
        en: "Daniel Ribeiro, entrepreneur and automotive market strategist in Florida, presents an exclusive talk on how to build brand presence, scale dealership operations and seize opportunities in the American market. With hands-on industry experience, Daniel shares insights on digital branding, strategic networking and the trends shaping the future of automotive retail in the US. A must-attend event for anyone looking to position themselves competitively in the market.",
        pt: "Daniel Ribeiro, empreendedor e estrategista do mercado automotivo na Flórida, apresenta uma palestra exclusiva sobre como construir presença de marca, escalar operações de dealership e aproveitar oportunidades no mercado americano. Com experiência prática no setor, Daniel compartilha insights sobre branding digital, networking estratégico e as tendências que estão moldando o futuro do varejo automotivo nos EUA. Um evento imperdível para quem quer se posicionar de forma competitiva no mercado.",
        es: "Daniel Ribeiro, emprendedor y estratega del mercado automotriz en Florida, presenta una charla exclusiva sobre cómo construir presencia de marca, escalar operaciones de concesionarios y aprovechar oportunidades en el mercado americano.",
        de: "Daniel Ribeiro, Unternehmer und Automobilmarkt-Stratege in Florida, präsentiert einen exklusiven Vortrag darüber, wie man Markenpräsenz aufbaut, Händleroperationen skaliert und Chancen auf dem amerikanischen Markt nutzt. Mit praktischer Branchenerfahrung teilt Daniel Einblicke in digitales Branding, strategisches Networking und die Trends, die die Zukunft des Automobilhandels in den USA prägen.",
        fr: "Daniel Ribeiro, entrepreneur et stratège du marché automobile en Floride, présente une conférence exclusive sur la construction de la présence de marque, la montée en puissance des opérations de concession et les opportunités du marché américain.",
      }),
      address: "Downtown Miami, FL",
      hours: "19h - 22h",
      website: "https://highlight-grid.vercel.app",
      howToParticipate: [
        i18n({ en: "Follow Daniel Ribeiro on social media for the registration link.", pt: "Acompanhe as redes sociais de Daniel Ribeiro para link de inscrição.", es: "Sigue a Daniel Ribeiro en redes sociales para el enlace de registro.", de: "Folgen Sie Daniel Ribeiro in den sozialen Medien für den Registrierungslink.", fr: "Suivez Daniel Ribeiro sur les réseaux sociaux pour le lien d'inscription." }),
        i18n({ en: "Limited spots — secure your place in advance.", pt: "Vagas limitadas — garanta sua presença antecipadamente.", es: "Plazas limitadas — asegura tu lugar con antelación.", de: "Begrenzte Plätze — sichern Sie sich Ihren Platz im Voraus.", fr: "Places limitées — réservez votre place à l'avance." }),
        i18n({ en: "Networking session after the talk with drinks and finger food.", pt: "Networking session após a palestra com drinks e finger food.", es: "Sesión de networking después de la charla con bebidas y canapés.", de: "Networking-Session nach dem Vortrag mit Getränken und Fingerfood.", fr: "Session de networking après la conférence avec boissons et amuse-bouches." }),
        i18n({ en: "Bring business cards for strategic connections.", pt: "Traga cartões de visita para conexões estratégicas.", es: "Trae tarjetas de visita para conexiones estratégicas.", de: "Bringen Sie Visitenkarten für strategische Kontakte mit.", fr: "Apportez vos cartes de visite pour des contacts stratégiques." }),
      ],
      highlights: [
        i18n({ en: "Talk on growth in the US automotive market", pt: "Palestra sobre crescimento no mercado automotivo dos EUA", es: "Charla sobre crecimiento en el mercado automotriz de EEUU", de: "Vortrag über Wachstum im US-Automobilmarkt", fr: "Conférence sur la croissance du marché automobile américain" }),
        i18n({ en: "Digital branding strategies for dealerships", pt: "Estratégias de branding digital para dealerships", es: "Estrategias de branding digital para concesionarios", de: "Digitale Branding-Strategien für Händler", fr: "Stratégies de branding digital pour concessionnaires" }),
        i18n({ en: "Networking with entrepreneurs and industry professionals", pt: "Networking com empreendedores e profissionais do setor", es: "Networking con emprendedores y profesionales del sector", de: "Networking mit Unternehmern und Branchenprofis", fr: "Networking avec entrepreneurs et professionnels du secteur" }),
        i18n({ en: "Insights on opportunities for Latinos in the American market", pt: "Insights sobre oportunidades para latinos no mercado americano", es: "Perspectivas sobre oportunidades para latinos en el mercado americano", de: "Einblicke in Chancen für Latinos auf dem amerikanischen Markt", fr: "Perspectives sur les opportunités pour les Latinos sur le marché américain" }),
        i18n({ en: "Live Q&A session with Daniel Ribeiro", pt: "Sessão de Q&A ao vivo com Daniel Ribeiro", es: "Sesión de preguntas y respuestas en vivo con Daniel Ribeiro", de: "Live Q&A-Session mit Daniel Ribeiro", fr: "Session Q&R en direct avec Daniel Ribeiro" }),
      ],
      ticketInfo: i18n({
        en: "Free entry with advance registration. Limited to 100 attendees. VIP with networking dinner access: $75.",
        pt: "Entrada gratuita mediante inscrição antecipada. Vagas limitadas a 100 participantes. VIP com acesso ao networking dinner: $75.",
        es: "Entrada gratuita con registro anticipado. Limitado a 100 asistentes. VIP con acceso a la cena de networking: $75.",
        de: "Kostenloser Eintritt mit Voranmeldung. Begrenzt auf 100 Teilnehmer. VIP mit Zugang zum Networking-Dinner: $75.",
        fr: "Entrée gratuite sur inscription préalable. Limité à 100 participants. VIP avec accès au dîner de networking : 75$.",
      }),
      speaker: {
        name: "Daniel Ribeiro",
        role: i18n({
          en: "Entrepreneur & Automotive Strategist",
          pt: "Empreendedor & Estrategista Automotivo",
          es: "Emprendedor y Estratega Automotriz",
          de: "Unternehmer & Automobil-Stratege",
          fr: "Entrepreneur & Stratège Automobile",
          it: "Imprenditore & Stratega Automobilistico",
          zh: "企业家 & 汽车战略家",
          ja: "起業家 & 自動車ストラテジスト",
          ko: "기업가 & 자동차 전략가",
          ar: "رائد أعمال واستراتيجي سيارات",
        }),
        image: danielRibeiro,
        profileUrl: "/speaker/daniel-ribeiro",
      },
    },
    // For remaining events, use same pattern with en+pt minimum
    {
      date: "MAR 28", year: "2026",
      title: i18n({ en: "FuelFest Tampa", pt: "FuelFest Tampa" }),
      location: i18n({ en: "Florida State Fairgrounds, Tampa", pt: "Florida State Fairgrounds, Tampa" }),
      description: i18n({
        en: "Aftermarket, performance and branding for car enthusiasts. Activations and exhibitions for younger, digital-first automotive communities.",
        pt: "Aftermarket, performance e branding com público entusiasta. Ativações e exposição para comunidades automotivas mais jovens e digitais.",
        es: "Aftermarket, rendimiento y branding para entusiastas del automóvil. Activaciones y exposiciones para comunidades automotrices más jóvenes y digitales.",
        de: "Aftermarket, Performance und Branding für Auto-Enthusiasten. Aktivierungen und Ausstellungen für jüngere, digital orientierte Automobil-Communities.",
      }),
      status: i18n({ en: "Confirmed", pt: "Confirmado", es: "Confirmado", de: "Bestätigt", fr: "Confirmé", it: "Confermato", zh: "已确认", ja: "確定", ko: "확정", ar: "مؤكد" }),
      featured: true, image: news1, segment: "Entusiastas",
      fullDescription: i18n({
        en: "FuelFest is one of the largest car culture events in the US, bringing together car enthusiasts, aftermarket parts, performance builds and digital branding. The Tampa event features brand activations, modified vehicle exhibitions, car audio competitions, food trucks and immersive experiences for young, digital audiences.",
        pt: "FuelFest é um dos maiores eventos de cultura automotiva dos EUA, reunindo entusiastas de carros, aftermarket parts, performance builds e branding digital. O evento em Tampa traz ativações de marcas, exposição de veículos modificados, competições de som automotivo, food trucks e experiências imersivas para o público jovem e digital.",
        de: "FuelFest ist eines der größten Auto-Kultur-Events in den USA. Es bringt Auto-Enthusiasten, Aftermarket-Teile, Performance-Builds und digitales Branding zusammen. Die Tampa-Veranstaltung bietet Markenaktivierungen, Ausstellungen modifizierter Fahrzeuge, Car-Audio-Wettbewerbe und immersive Erlebnisse.",
      }),
      address: "4800 US-301, Tampa, FL 33610, USA", hours: "13h - 20h", website: "https://fuelfest.com",
      howToParticipate: [
        i18n({ en: "Visit fuelfest.com and select the Tampa event.", pt: "Acesse fuelfest.com e selecione o evento de Tampa.", de: "Besuchen Sie fuelfest.com und wählen Sie das Tampa-Event.", es: "Visita fuelfest.com y selecciona el evento de Tampa." }),
        i18n({ en: "Buy tickets online (General Admission or VIP).", pt: "Compre ingressos online (General Admission ou VIP).", de: "Kaufen Sie Tickets online (General Admission oder VIP).", es: "Compra entradas online (Admisión General o VIP)." }),
        i18n({ en: "For exhibitors: fill out the vendor/sponsor form on the website.", pt: "Para expositores: preencha o formulário de vendor/sponsor no site.", de: "Für Aussteller: Füllen Sie das Vendor/Sponsor-Formular auf der Website aus.", es: "Para expositores: completa el formulario de vendor/sponsor en el sitio." }),
        i18n({ en: "Arrive early to secure parking — the event fills up fast.", pt: "Chegue cedo para garantir vaga no estacionamento — o evento lota rápido.", de: "Kommen Sie früh, um einen Parkplatz zu sichern — die Veranstaltung ist schnell ausverkauft.", es: "Llega temprano para asegurar estacionamiento — el evento se llena rápido." }),
      ],
      highlights: [
        i18n({ en: "Over 500 vehicles on display", pt: "Mais de 500 veículos expostos", de: "Über 500 ausgestellte Fahrzeuge", es: "Más de 500 vehículos expuestos" }),
        i18n({ en: "Sound and burnout competitions", pt: "Competições de som e burnout", de: "Sound- und Burnout-Wettbewerbe", es: "Competencias de sonido y burnout" }),
        i18n({ en: "Aftermarket brand activations", pt: "Ativações de marcas de aftermarket", de: "Aftermarket-Markenaktivierungen", es: "Activaciones de marcas aftermarket" }),
        i18n({ en: "VIP area with exclusive experiences", pt: "Área VIP com experiências exclusivas", de: "VIP-Bereich mit exklusiven Erlebnissen", es: "Área VIP con experiencias exclusivas" }),
        i18n({ en: "Food trucks and live entertainment", pt: "Food trucks e entretenimento ao vivo", de: "Food Trucks und Live-Unterhaltung", es: "Food trucks y entretenimiento en vivo" }),
      ],
      ticketInfo: i18n({
        en: "Tickets from $30 (General Admission). VIP available for $75. Children under 5 free. Online purchase only.",
        pt: "Ingressos a partir de $30 (General Admission). VIP disponível por $75. Crianças menores de 5 anos entram grátis. Compra exclusivamente online.",
        de: "Tickets ab $30 (General Admission). VIP für $75 erhältlich. Kinder unter 5 Jahren kostenlos. Nur Online-Kauf.",
        es: "Entradas desde $30 (Admisión General). VIP disponible por $75. Niños menores de 5 años gratis. Compra exclusivamente online.",
      }),
    },
  ];
}
