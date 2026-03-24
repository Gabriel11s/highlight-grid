/**
 * Full i18n content for Daniel Ribeiro's speaker page
 * All text fields translate with the global language switch
 */

import type { Language } from "@/contexts/LanguageContext";

type I18n = Record<Language, string>;

function t(texts: Partial<Record<Language, string>> & { en: string; pt: string }): I18n {
  const base = texts.en;
  return {
    en: texts.en, pt: texts.pt,
    es: texts.es || base, fr: texts.fr || base, de: texts.de || base,
    it: texts.it || base, zh: texts.zh || base, ja: texts.ja || base,
    ko: texts.ko || base, ar: texts.ar || base,
  };
}

// Helper to resolve a single i18n text
export function r(text: I18n, lang: Language): string {
  return text[lang] || text.en;
}

// ═══════════════════════════════════════
// HERO
// ═══════════════════════════════════════
export const hero = {
  tagline: t({
    en: "From Capão Redondo to the Top of the Automotive Market | Entrepreneur & Automotive Strategist",
    pt: "Do Capão Redondo ao Topo do Mercado Automotivo | Empreendedor & Estrategista Automotivo",
    es: "Del Capão Redondo a la Cima del Mercado Automotriz | Emprendedor y Estratega Automotriz",
    de: "Vom Capão Redondo an die Spitze des Automobilmarktes | Unternehmer & Automobil-Stratege",
    fr: "Du Capão Redondo au Sommet du Marché Automobile | Entrepreneur & Stratège Automobile",
  }),
};

// ═══════════════════════════════════════
// MANIFESTO (SplitTextReveal)
// ═══════════════════════════════════════
export const manifesto = {
  topLine: t({
    en: "Selling is not",
    pt: "Venda não é",
    es: "Vender no es",
    de: "Verkaufen ist kein",
    fr: "Vendre n'est pas",
  }),
  bottomLine: t({
    en: "talent. It's method.",
    pt: "talento. É método.",
    es: "talento. Es método.",
    de: "Talent. Es ist Methode.",
    fr: "du talent. C'est une méthode.",
  }),
  description: t({
    en: "CEO of DSM Multimarcas and D87 Garage, Daniel Ribeiro left the south side of São Paulo with one vision: to prove that anyone with method, discipline and transparency can build an empire. Today he runs an operation selling over 150 vehicles per month in Curitiba and trains thousands of dealers across Brazil.",
    pt: "CEO da DSM Multimarcas e D87 Garage, Daniel Ribeiro saiu da Zona Sul de São Paulo com uma visão: provar que qualquer pessoa com método, disciplina e transparência pode construir um império. Hoje comanda uma operação que vende mais de 150 veículos por mês em Curitiba e treina milhares de lojistas pelo Brasil.",
    es: "CEO de DSM Multimarcas y D87 Garage, Daniel Ribeiro dejó la zona sur de São Paulo con una visión: demostrar que cualquiera con método, disciplina y transparencia puede construir un imperio. Hoy dirige una operación que vende más de 150 vehículos al mes en Curitiba y entrena a miles de comerciantes en Brasil.",
    de: "CEO von DSM Multimarcas und D87 Garage verließ Daniel Ribeiro die Südzone von São Paulo mit einer Vision: zu beweisen, dass jeder mit Methode, Disziplin und Transparenz ein Imperium aufbauen kann. Heute leitet er eine Operation, die über 150 Fahrzeuge pro Monat in Curitiba verkauft und Tausende von Händlern in Brasilien ausbildet.",
    fr: "PDG de DSM Multimarcas et D87 Garage, Daniel Ribeiro a quitté la zone sud de São Paulo avec une vision : prouver que toute personne dotée de méthode, discipline et transparence peut bâtir un empire. Aujourd'hui, il dirige une opération vendant plus de 150 véhicules par mois à Curitiba et forme des milliers de concessionnaires au Brésil.",
  }),
};

// ═══════════════════════════════════════
// HIGHLIGHTS REEL
// ═══════════════════════════════════════
export const highlights = [
  { emoji: "🚗", label: t({ en: "150+ cars/month", pt: "150+ carros/mês", es: "150+ autos/mes", de: "150+ Autos/Monat", fr: "150+ voitures/mois" }) },
  { emoji: "📱", label: t({ en: "758K followers", pt: "758K seguidores", es: "758K seguidores", de: "758K Follower", fr: "758K abonnés" }) },
  { emoji: "🎤", label: t({ en: "G4 Podcasts", pt: "G4 Podcasts" }) },
  { emoji: "📖", label: t({ en: "Beyond the Favela", pt: "Além da Favela", es: "Más Allá de la Favela", de: "Jenseits der Favela", fr: "Au-delà de la Favela" }) },
  { emoji: "🏆", label: t({ en: "3000+ dealers trained", pt: "3000+ lojistas treinados", es: "3000+ comerciantes capacitados", de: "3000+ Händler geschult", fr: "3000+ concessionnaires formés" }) },
  { emoji: "🎬", label: t({ en: "30M+ TikTok views", pt: "30M+ views TikTok", es: "30M+ vistas TikTok", de: "30M+ TikTok Views", fr: "30M+ vues TikTok" }) },
  { emoji: "🏢", label: t({ en: "4 companies", pt: "4 empresas", es: "4 empresas", de: "4 Unternehmen", fr: "4 entreprises" }) },
  { emoji: "⚡", label: t({ en: "Método DSM Acelera", pt: "Método DSM Acelera" }) },
  { emoji: "🇧🇷", label: t({ en: "From Capão to the top", pt: "Do Capão ao topo", es: "Del Capão a la cima", de: "Vom Capão an die Spitze", fr: "Du Capão au sommet" }) },
];

// ═══════════════════════════════════════
// TIMELINE
// ═══════════════════════════════════════
export const timeline = [
  {
    year: "~2007",
    title: t({ en: "Left Capão Redondo", pt: "Saiu do Capão Redondo", es: "Dejó Capão Redondo", de: "Verließ Capão Redondo", fr: "A quitté Capão Redondo" }),
    description: t({
      en: "Born and raised in the south side of São Paulo, he left the neighborhood at 20 heading to Curitiba. Without formal education, he carried determination and the experience of a childhood that forged resilience.",
      pt: "Nascido e criado na Zona Sul de São Paulo, deixou o bairro aos 20 anos rumo a Curitiba. Sem estudo formal, carregava determinação e a experiência de uma infância que forjou resiliência.",
      es: "Nacido y criado en la zona sur de São Paulo, dejó el barrio a los 20 años rumbo a Curitiba. Sin estudios formales, llevaba determinación y la experiencia de una infancia que forjó resiliencia.",
      de: "Geboren und aufgewachsen in der Südzone von São Paulo, verließ er das Viertel mit 20 in Richtung Curitiba. Ohne formale Ausbildung trug er Entschlossenheit und die Erfahrung einer Kindheit, die Resilienz schmiedete.",
      fr: "Né et élevé dans la zone sud de São Paulo, il a quitté le quartier à 20 ans en direction de Curitiba. Sans éducation formelle, il portait détermination et l'expérience d'une enfance qui a forgé la résilience.",
    }),
    image: "/daniel/office-close.png",
  },
  {
    year: "2018",
    title: t({ en: "DSM Multimarcas is born", pt: "Nasce a DSM Multimarcas", es: "Nace DSM Multimarcas", de: "DSM Multimarcas wird gegründet", fr: "Naissance de DSM Multimarcas" }),
    description: t({
      en: "With R$150,000 and three cars in the lot, he founded DSM Multimarcas Comércio de Veículos in Curitiba. The bet: total transparency, camera on and live negotiation as a trust contract.",
      pt: "Com R$ 150 mil e três carros no pátio, fundou a DSM Multimarcas Comércio de Veículos em Curitiba. A aposta: transparência total, câmera ligada e negociação ao vivo como contrato de confiança.",
      es: "Con R$150 mil y tres autos en el patio, fundó DSM Multimarcas Comércio de Veículos en Curitiba. La apuesta: transparencia total, cámara encendida y negociación en vivo como contrato de confianza.",
      de: "Mit R$150.000 und drei Autos auf dem Hof gründete er DSM Multimarcas Comércio de Veículos in Curitiba. Die Wette: totale Transparenz, Kamera an und Live-Verhandlung als Vertrauensvertrag.",
      fr: "Avec R$150 000 et trois voitures sur le terrain, il a fondé DSM Multimarcas Comércio de Veículos à Curitiba. Le pari : transparence totale, caméra allumée et négociation en direct comme contrat de confiance.",
    }),
    image: "/daniel/lecture-cap-front.png",
  },
  {
    year: "2020",
    title: t({ en: "D87 Garage enters the scene", pt: "D87 Garage entra em cena", es: "D87 Garage entra en escena", de: "D87 Garage betritt die Bühne", fr: "D87 Garage entre en scène" }),
    description: t({
      en: "Opened D87 Garage, expanding the automotive ecosystem. The consignment and digital content model began attracting national attention — and celebrities started showing up at the lot.",
      pt: "Inaugurou a D87 Garage, expandindo o ecossistema automotivo. O modelo de consignação e conteúdo digital começou a atrair atenção nacional — e celebridades começaram a aparecer no pátio.",
      es: "Inauguró D87 Garage, expandiendo el ecosistema automotriz. El modelo de consignación y contenido digital comenzó a atraer atención nacional — y las celebridades empezaron a aparecer en el patio.",
      de: "Eröffnete D87 Garage und erweiterte das Automobil-Ökosystem. Das Konsignations- und Digital-Content-Modell begann nationale Aufmerksamkeit zu erregen — und Prominente tauchten auf dem Gelände auf.",
      fr: "A ouvert D87 Garage, élargissant l'écosystème automobile. Le modèle de consignation et de contenu digital a commencé à attirer l'attention nationale — et les célébrités ont commencé à apparaître.",
    }),
    image: "/daniel/neymar.png",
  },
  {
    year: "2024",
    title: t({ en: "Método DSM Acelera", pt: "Método DSM Acelera" }),
    description: t({
      en: "Formalized the know-how into a training company. The Sales Accelerator Method Daniel Ribeiro was created to teach dealers how to master sales with method, not talent. Over 3,000 dealers impacted.",
      pt: "Formalizou o know-how em empresa de treinamento. O Acelerador de Vendas Método Daniel Ribeiro nasceu para ensinar lojistas a dominar vendas com método, não talento. Mais de 3 mil lojistas impactados.",
      es: "Formalizó el know-how en una empresa de capacitación. El Acelerador de Ventas Método Daniel Ribeiro nació para enseñar a los comerciantes a dominar las ventas con método, no talento. Más de 3 mil comerciantes impactados.",
      de: "Formalisierte das Know-how in ein Trainingsunternehmen. Der Verkaufsbeschleuniger Método Daniel Ribeiro wurde geschaffen, um Händlern beizubringen, Verkäufe mit Methode zu meistern, nicht mit Talent. Über 3.000 Händler erreicht.",
      fr: "A formalisé le savoir-faire en entreprise de formation. L'Accélérateur de Ventes Méthode Daniel Ribeiro est né pour enseigner aux concessionnaires à maîtriser les ventes par la méthode, pas le talent. Plus de 3 000 concessionnaires impactés.",
    }),
    image: "/daniel/acelera-stage.png",
  },
  {
    year: "2026",
    title: t({ en: "Beyond the Favela", pt: "Além da Favela", es: "Más Allá de la Favela", de: "Jenseits der Favela", fr: "Au-delà de la Favela" }),
    description: t({
      en: "Launched the book 'Beyond the Favela — A Staircase to Tomorrow', synthesizing the journey from Capão Redondo to running an operation that sells over 150 vehicles per month. Talks, immersions and the G4 Podcasts consolidated his voice in the sector.",
      pt: "Lançou o livro 'Além da Favela — Uma Escada Para o Amanhã', sintetizando a jornada do Capão Redondo ao comando de uma operação que vende mais de 150 veículos por mês. Palestras, imersões e o G4 Podcasts consolidaram sua voz no setor.",
      es: "Lanzó el libro 'Más Allá de la Favela — Una Escalera Para el Mañana', sintetizando el viaje desde Capão Redondo hasta el mando de una operación que vende más de 150 vehículos al mes.",
      de: "Veröffentlichte das Buch 'Jenseits der Favela — Eine Treppe für Morgen', das die Reise vom Capão Redondo zur Leitung einer Operation zusammenfasst, die über 150 Fahrzeuge pro Monat verkauft.",
      fr: "A publié le livre 'Au-delà de la Favela — Un Escalier pour Demain', synthétisant le parcours du Capão Redondo à la direction d'une opération vendant plus de 150 véhicules par mois.",
    }),
    image: "/daniel/stage-mic.png",
  },
];

// ═══════════════════════════════════════
// STATS (CounterSection)
// ═══════════════════════════════════════
export const stats = [
  { value: 150, suffix: "+", label: t({ en: "Vehicles sold/month", pt: "Veículos vendidos/mês", es: "Vehículos vendidos/mes", de: "Fahrzeuge verkauft/Monat", fr: "Véhicules vendus/mois" }) },
  { value: 758, suffix: "K", label: t({ en: "Instagram Followers", pt: "Seguidores Instagram", es: "Seguidores Instagram", de: "Instagram-Follower", fr: "Abonnés Instagram" }) },
  { value: 3000, suffix: "+", label: t({ en: "Dealers trained", pt: "Lojistas treinados", es: "Comerciantes capacitados", de: "Händler geschult", fr: "Concessionnaires formés" }) },
  { value: 30, suffix: "M+", label: t({ en: "TikTok Views", pt: "Views no TikTok", es: "Vistas en TikTok", de: "TikTok-Aufrufe", fr: "Vues TikTok" }) },
];

// ═══════════════════════════════════════
// PARALLAX QUOTE
// ═══════════════════════════════════════
export const quote = {
  text: t({
    en: "I started with R$150,000 and three cars. Today the camera is my trust contract.",
    pt: "Comecei com R$ 150 mil e três carros. Hoje a câmera é meu contrato de confiança.",
    es: "Empecé con R$150 mil y tres autos. Hoy la cámara es mi contrato de confianza.",
    de: "Ich habe mit R$150.000 und drei Autos angefangen. Heute ist die Kamera mein Vertrauensvertrag.",
    fr: "J'ai commencé avec R$150 000 et trois voitures. Aujourd'hui la caméra est mon contrat de confiance.",
  }),
  attribution: "Daniel Ribeiro, G4 Podcasts",
};

// ═══════════════════════════════════════
// BRANDS (BrandShowcase)
// ═══════════════════════════════════════
export const brandsSection = {
  title: t({ en: "The Ecosystem", pt: "O Ecossistema", es: "El Ecosistema", de: "Das Ökosystem", fr: "L'Écosystème" }),
  subtitle: t({
    en: "Four companies. One philosophy: transparency builds trust, trust builds sales.",
    pt: "Quatro empresas. Uma filosofia: transparência gera confiança, confiança gera venda.",
    es: "Cuatro empresas. Una filosofía: transparencia genera confianza, confianza genera ventas.",
    de: "Vier Unternehmen. Eine Philosophie: Transparenz schafft Vertrauen, Vertrauen schafft Verkäufe.",
    fr: "Quatre entreprises. Une philosophie : la transparence crée la confiance, la confiance crée les ventes.",
  }),
};

export const brands = [
  {
    name: "DSM Multimarcas",
    role: t({ en: "CEO & Founder", pt: "CEO & Fundador", es: "CEO y Fundador", de: "CEO & Gründer", fr: "PDG & Fondateur" }),
    year: "2018",
    description: t({
      en: "Retail and consignment vehicle operation in Curitiba. Over 150 cars sold per month with a model based on transparency, live camera and demand generation via digital content.",
      pt: "Operação varejista e consignada de veículos em Curitiba. Mais de 150 carros vendidos por mês com modelo baseado em transparência, câmera ao vivo e geração de demanda via conteúdo digital.",
      es: "Operación minorista y de consignación de vehículos en Curitiba. Más de 150 autos vendidos al mes con un modelo basado en transparencia, cámara en vivo y generación de demanda vía contenido digital.",
      de: "Einzelhandel und Kommissionsfahrzeugbetrieb in Curitiba. Über 150 Autos pro Monat verkauft mit einem Modell basierend auf Transparenz, Live-Kamera und Nachfragegenerierung via digitalen Content.",
      fr: "Opération de vente au détail et de consignation de véhicules à Curitiba. Plus de 150 voitures vendues par mois avec un modèle basé sur la transparence, la caméra en direct et la génération de demande via le contenu digital.",
    }),
    href: "https://instagram.com/dsm_multimarcas1",
  },
  {
    name: "D87 Garage",
    role: t({ en: "Co-Founder", pt: "Sócio-Fundador", es: "Cofundador", de: "Mitgründer", fr: "Cofondateur" }),
    year: "2020",
    description: t({
      en: "Digital showroom with over 49K followers and 17K publications. Focus on offers, behind-the-scenes and social proof with celebrities and influencers.",
      pt: "Showroom e vitrine digital com mais de 49 mil seguidores e 17 mil publicações. Foco em ofertas, bastidores e prova social com celebridades e influenciadores.",
      es: "Showroom y vitrina digital con más de 49 mil seguidores y 17 mil publicaciones. Enfoque en ofertas, bastidores y prueba social con celebridades e influencers.",
      de: "Digitaler Showroom mit über 49.000 Followern und 17.000 Publikationen. Fokus auf Angebote, Hinter-den-Kulissen und Social Proof mit Prominenten und Influencern.",
      fr: "Showroom et vitrine digitale avec plus de 49 000 abonnés et 17 000 publications. Focus sur les offres, les coulisses et la preuve sociale avec des célébrités et influenceurs.",
    }),
    href: "https://instagram.com/d87.garage",
  },
  {
    name: "Método DSM Acelera",
    role: t({ en: "Creator", pt: "Criador", es: "Creador", de: "Schöpfer", fr: "Créateur" }),
    year: "2024",
    description: t({
      en: "Professional training program for automotive dealers. Immersions in Alphaville, national talks and the Negotiator Protocol as a structured educational product.",
      pt: "Programa de treinamento profissional para lojistas do setor automotivo. Imersões em Alphaville, palestras nacionais e o Protocolo Negociador como produto educacional estruturado.",
      es: "Programa de capacitación profesional para comerciantes del sector automotriz. Inmersiones en Alphaville, charlas nacionales y el Protocolo Negociador como producto educativo estructurado.",
      de: "Professionelles Trainingsprogramm für Autohändler. Immersionen in Alphaville, nationale Vorträge und das Verhandlungsprotokoll als strukturiertes Bildungsprodukt.",
      fr: "Programme de formation professionnelle pour les concessionnaires automobiles. Immersions à Alphaville, conférences nationales et le Protocole Négociateur comme produit éducatif structuré.",
    }),
    href: "https://metododsm.com.br",
  },
  {
    name: "D87 Burger",
    role: t({ en: "Partner", pt: "Sócio", es: "Socio", de: "Gesellschafter", fr: "Associé" }),
    year: "2021",
    description: t({
      en: "Expansion into the food business in Curitiba. Portfolio diversification while maintaining the entrepreneurial essence and strong personal brand logic.",
      pt: "Expansão para o ramo alimentício em Curitiba. Diversificação de portfólio mantendo a essência empreendedora e a lógica de marca pessoal forte.",
      es: "Expansión al ramo alimenticio en Curitiba. Diversificación del portafolio manteniendo la esencia emprendedora y la lógica de marca personal fuerte.",
      de: "Expansion ins Gastronomiegeschäft in Curitiba. Portfolio-Diversifizierung unter Beibehaltung der unternehmerischen Essenz und starken persönlichen Markenlogik.",
      fr: "Expansion dans la restauration à Curitiba. Diversification du portfolio tout en maintenant l'essence entrepreneuriale et la logique de marque personnelle forte.",
    }),
  },
];

// ═══════════════════════════════════════
// MEDIA
// ═══════════════════════════════════════
export const mediaTitle = t({ en: "In the Media", pt: "Na Mídia", es: "En los Medios", de: "In den Medien", fr: "Dans les Médias" });

// ═══════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════
export const eventsTitle = t({ en: "Next Event", pt: "Próximo Evento", es: "Próximo Evento", de: "Nächstes Event", fr: "Prochain Événement" });
export const eventCard = {
  title: t({ en: "DSM Acelera Method Immersion", pt: "Imersão Método DSM Acelera", es: "Inmersión Método DSM Acelera", de: "DSM Acelera Methode Immersion", fr: "Immersion Méthode DSM Acelera" }),
  description: t({
    en: "In-person immersion with full schedule on sales strategies in the automotive sector. Practical methodology, real cases and networking with dealers from all over Brazil.",
    pt: "Imersão presencial com carga horária completa sobre estratégias de venda no setor automotivo. Metodologia prática, cases reais e networking com lojistas de todo o Brasil.",
    es: "Inmersión presencial con horario completo sobre estrategias de venta en el sector automotriz. Metodología práctica, casos reales y networking con comerciantes de todo Brasil.",
    de: "Präsenz-Immersion mit vollem Zeitplan zu Verkaufsstrategien im Automobilsektor. Praktische Methodik, reale Cases und Networking mit Händlern aus ganz Brasilien.",
    fr: "Immersion en présentiel avec programme complet sur les stratégies de vente dans le secteur automobile. Méthodologie pratique, cas réels et networking avec des concessionnaires de tout le Brésil.",
  }),
  ticketInfo: t({
    en: "Access modalities: Standard, VIP and Premium. Limited spots.",
    pt: "Modalidades de acesso: Standard, VIP e Premium. Vagas limitadas.",
    es: "Modalidades de acceso: Standard, VIP y Premium. Plazas limitadas.",
    de: "Zugangsmodi: Standard, VIP und Premium. Begrenzte Plätze.",
    fr: "Modalités d'accès : Standard, VIP et Premium. Places limitées.",
  }),
};

// ═══════════════════════════════════════
// CTA
// ═══════════════════════════════════════
export const cta = {
  headline: t({
    en: "Want to dominate the game?",
    pt: "Quer dominar o jogo?",
    es: "¿Quieres dominar el juego?",
    de: "Willst du das Spiel beherrschen?",
    fr: "Vous voulez dominer le jeu ?",
  }),
  description: t({
    en: "Learn about the Método DSM Acelera, follow the journey on social media or get in touch for partnerships and events.",
    pt: "Conheça o Método DSM Acelera, acompanhe a jornada nas redes ou entre em contato para parcerias e eventos.",
    es: "Conoce el Método DSM Acelera, sigue la jornada en redes o contáctanos para alianzas y eventos.",
    de: "Lernen Sie die Método DSM Acelera kennen, folgen Sie der Reise in den sozialen Medien oder kontaktieren Sie uns für Partnerschaften und Events.",
    fr: "Découvrez le Método DSM Acelera, suivez le parcours sur les réseaux ou contactez-nous pour des partenariats et événements.",
  }),
  ctaText: t({
    en: "Access the Method",
    pt: "Acessar o Método",
    es: "Acceder al Método",
    de: "Zur Methode",
    fr: "Accéder à la Méthode",
  }),
};

// ═══════════════════════════════════════
// SECTION TITLES
// ═══════════════════════════════════════
export const sectionTitles = {
  timeline: t({ en: "The Journey", pt: "A Jornada", es: "El Viaje", de: "Die Reise", fr: "Le Parcours" }),
};
