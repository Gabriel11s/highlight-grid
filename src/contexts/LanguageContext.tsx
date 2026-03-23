"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "pt" | "es" | "fr" | "de" | "it" | "zh" | "ja" | "ko" | "ar";

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

export const languages: LanguageOption[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  // ========== NAV ==========
  "nav.stories": { en: "Stories", pt: "Histórias", es: "Historias", fr: "Articles", de: "Geschichten", it: "Storie", zh: "故事", ja: "ストーリー", ko: "스토리", ar: "قصص" },
  "nav.events": { en: "Events", pt: "Eventos", es: "Eventos", fr: "Événements", de: "Veranstaltungen", it: "Eventi", zh: "活动", ja: "イベント", ko: "이벤트", ar: "فعاليات" },
  "nav.products": { en: "Products", pt: "Produtos", es: "Productos", fr: "Produits", de: "Produkte", it: "Prodotti", zh: "产品", ja: "製品", ko: "제품", ar: "منتجات" },
  "nav.latest": { en: "Latest", pt: "Últimas", es: "Últimas", fr: "Dernières", de: "Neueste", it: "Ultime", zh: "最新", ja: "最新", ko: "최신", ar: "الأحدث" },

  // ========== HERO ==========
  "hero.breaking": { en: "Breaking Now", pt: "Urgente", es: "Último Momento", fr: "Flash Info", de: "Eilmeldung", it: "Ultima Ora", zh: "突发新闻", ja: "速報", ko: "속보", ar: "عاجل" },
  "hero.title1": { en: "Global Markets Rally", pt: "Mercados Globais em Alta", es: "Mercados Globales al Alza", fr: "Rallye des Marchés Mondiaux", de: "Globale Märkte im Aufschwung", it: "Rally dei Mercati Globali", zh: "全球市场反弹", ja: "世界市場が反発", ko: "글로벌 시장 반등", ar: "ارتفاع الأسواق العالمية" },
  "hero.title2": { en: "on Trade Deal.", pt: "com Acordo Comercial.", es: "por Acuerdo Comercial.", fr: "sur un Accord Commercial.", de: "durch Handelsabkommen.", it: "sull'Accordo Commerciale.", zh: "贸易协议达成。", ja: "貿易協定で。", ko: "무역 합의로.", ar: "بسبب الصفقة التجارية." },
  "hero.description": { en: "Major economies reach historic agreement on tariff reductions, sending equities surging across all sectors.", pt: "Grandes economias alcançam acordo histórico de redução de tarifas, impulsionando ações em todos os setores.", es: "Las principales economías alcanzan un acuerdo histórico de reducción arancelaria, impulsando las acciones en todos los sectores.", fr: "Les grandes économies concluent un accord historique sur la réduction des tarifs, faisant bondir les actions dans tous les secteurs.", de: "Große Volkswirtschaften erzielen historische Einigung über Zollsenkungen und lassen Aktien in allen Sektoren steigen.", it: "Le principali economie raggiungono un accordo storico sulla riduzione dei dazi, facendo salire le azioni in tutti i settori.", zh: "主要经济体就关税削减达成历史性协议，推动各行业股票飙升。", ja: "主要経済圏が関税削減で歴史的合意に達し、全セクターで株価が急騰。", ko: "주요 경제국이 관세 인하에 합의하며 모든 섹터에서 주가가 급등했습니다.", ar: "توصلت الاقتصادات الكبرى إلى اتفاق تاريخي بشأن تخفيض الرسوم الجمركية." },
  "hero.readStory": { en: "Read Full Story", pt: "Ler Matéria Completa", es: "Leer Artículo Completo", fr: "Lire l'Article", de: "Ganzen Artikel Lesen", it: "Leggi l'Articolo", zh: "阅读全文", ja: "全文を読む", ko: "전체 기사 읽기", ar: "اقرأ المقال كاملاً" },
  "hero.technology": { en: "Technology", pt: "Tecnologia", es: "Tecnología", fr: "Technologie", de: "Technologie", it: "Tecnologia", zh: "科技", ja: "テクノロジー", ko: "기술", ar: "تكنولوجيا" },
  "hero.techTitle": { en: "OpenAI Unveils GPT-5 with Autonomous Agent Capabilities", pt: "OpenAI Revela GPT-5 com Capacidades de Agente Autônomo", es: "OpenAI Presenta GPT-5 con Capacidades de Agente Autónomo", fr: "OpenAI Dévoile GPT-5 avec des Capacités d'Agent Autonome", de: "OpenAI Stellt GPT-5 mit Autonomen Agenten Vor", it: "OpenAI Svela GPT-5 con Capacità di Agente Autonomo", zh: "OpenAI发布具有自主代理能力的GPT-5", ja: "OpenAIが自律エージェント機能搭載のGPT-5を発表", ko: "OpenAI, 자율 에이전트 기능을 갖춘 GPT-5 공개", ar: "OpenAI تكشف عن GPT-5 مع إمكانيات الوكيل المستقل" },
  "hero.climate": { en: "Climate", pt: "Clima", es: "Clima", fr: "Climat", de: "Klima", it: "Clima", zh: "气候", ja: "気候", ko: "기후", ar: "مناخ" },
  "hero.climateTitle": { en: "Carbon Capture Breakthrough Could Reshape Energy Policy", pt: "Avanço em Captura de Carbono Pode Reformular Política Energética", es: "Avance en Captura de Carbono Podría Reformar la Política Energética", fr: "Percée en Capture de Carbone Pourrait Remodeler la Politique Énergétique", de: "Durchbruch bei CO₂-Abscheidung Könnte Energiepolitik Verändern", it: "Svolta nella Cattura del Carbonio Potrebbe Riformare la Politica Energetica", zh: "碳捕获突破可能重塑能源政策", ja: "炭素回収の画期的進歩がエネルギー政策を変える可能性", ko: "탄소 포집 돌파구, 에너지 정책 재편 가능성", ar: "اختراق احتجاز الكربون قد يعيد تشكيل سياسة الطاقة" },

  // ========== BREAKING BAR ==========
  "breaking.breaking": { en: "Breaking", pt: "Urgente", es: "Último Momento", fr: "Flash", de: "Eilmeldung", it: "Ultima Ora", zh: "突发", ja: "速報", ko: "속보", ar: "عاجل" },
  "breaking.trending": { en: "Trending", pt: "Em Alta", es: "Tendencia", fr: "Tendance", de: "Trend", it: "Tendenza", zh: "热门", ja: "トレンド", ko: "트렌딩", ar: "رائج" },
  "breaking.featured": { en: "Featured", pt: "Destaque", es: "Destacado", fr: "À la Une", de: "Empfohlen", it: "In Evidenza", zh: "精选", ja: "注目", ko: "추천", ar: "مميز" },
  "breaking.new": { en: "New", pt: "Novo", es: "Nuevo", fr: "Nouveau", de: "Neu", it: "Nuovo", zh: "新", ja: "新着", ko: "새로운", ar: "جديد" },
  "breaking.1": { en: "EU Approves Landmark AI Regulation Framework", pt: "UE Aprova Marco Regulatório Histórico para IA", es: "La UE Aprueba Marco Regulatorio Histórico de IA", fr: "L'UE Approuve un Cadre Réglementaire Historique sur l'IA", de: "EU Genehmigt Wegweisendes KI-Regulierungsrahmenwerk", it: "L'UE Approva Quadro Normativo Storico sull'IA", zh: "欧盟批准里程碑式AI监管框架", ja: "EUが画期的なAI規制枠組みを承認", ko: "EU, 획기적인 AI 규제 프레임워크 승인", ar: "الاتحاد الأوروبي يوافق على إطار تنظيم الذكاء الاصطناعي" },
  "breaking.2": { en: "Bitcoin Surpasses $150K Amid Institutional Surge", pt: "Bitcoin Supera US$ 150 Mil com Avanço Institucional", es: "Bitcoin Supera $150K con Auge Institucional", fr: "Le Bitcoin Dépasse 150 000 $ Grâce à l'Afflux Institutionnel", de: "Bitcoin Überschreitet 150.000 $ bei Institutionellem Anstieg", it: "Bitcoin Supera i $150K con l'Afflusso Istituzionale", zh: "比特币突破15万美元，机构资金涌入", ja: "ビットコインが機関投資家の急増で15万ドルを突破", ko: "비트코인, 기관 투자 급증으로 $150K 돌파", ar: "البيتكوين يتجاوز 150 ألف دولار مع تدفق المؤسسات" },
  "breaking.3": { en: "World Economic Forum 2026 Opens in Davos", pt: "Fórum Econômico Mundial 2026 Abre em Davos", es: "Foro Económico Mundial 2026 se Inaugura en Davos", fr: "Le Forum Économique Mondial 2026 Ouvre à Davos", de: "Weltwirtschaftsforum 2026 Eröffnet in Davos", it: "Forum Economico Mondiale 2026 Apre a Davos", zh: "2026年世界经济论坛在达沃斯开幕", ja: "2026年世界経済フォーラムがダボスで開幕", ko: "2026 세계경제포럼 다보스 개막", ar: "المنتدى الاقتصادي العالمي 2026 ينطلق في دافوس" },
  "breaking.4": { en: "SpaceX Completes First Commercial Lunar Cargo Mission", pt: "SpaceX Conclui Primeira Missão Comercial de Carga Lunar", es: "SpaceX Completa Primera Misión Comercial de Carga Lunar", fr: "SpaceX Achève sa Première Mission Cargo Lunaire Commerciale", de: "SpaceX Schließt Erste Kommerzielle Mond-Frachtmission Ab", it: "SpaceX Completa la Prima Missione Cargo Lunare Commerciale", zh: "SpaceX完成首次商业月球货运任务", ja: "SpaceXが初の商業月面貨物ミッションを完了", ko: "SpaceX, 첫 상업 달 화물 미션 완료", ar: "SpaceX تكمل أول مهمة شحن تجارية إلى القمر" },

  // ========== FEATURED STORIES ==========
  "featured.label": { en: "Featured Reports", pt: "Reportagens em Destaque", es: "Reportajes Destacados", fr: "Reportages à la Une", de: "Empfohlene Berichte", it: "Reportage in Evidenza", zh: "精选报道", ja: "注目レポート", ko: "추천 리포트", ar: "تقارير مميزة" },
  "featured.title": { en: "Stories That Matter", pt: "Histórias que Importam", es: "Historias que Importan", fr: "Les Articles qui Comptent", de: "Geschichten, die Zählen", it: "Storie che Contano", zh: "重要故事", ja: "重要な記事", ko: "중요한 스토리", ar: "قصص مهمة" },
  "featured.viewAll": { en: "View All", pt: "Ver Tudo", es: "Ver Todo", fr: "Voir Tout", de: "Alle Ansehen", it: "Vedi Tutto", zh: "查看全部", ja: "すべて見る", ko: "모두 보기", ar: "عرض الكل" },
  "featured.live": { en: "Live", pt: "Ao Vivo", es: "En Vivo", fr: "En Direct", de: "Live", it: "In Diretta", zh: "直播", ja: "ライブ", ko: "실시간", ar: "مباشر" },
  "featured.mainTitle": { en: "The Q3 Strategy: Precision in Motion", pt: "Estratégia Q3: Precisão em Movimento", es: "Estrategia Q3: Precisión en Movimiento", fr: "Stratégie Q3 : Précision en Mouvement", de: "Q3-Strategie: Präzision in Bewegung", it: "Strategia Q3: Precisione in Movimento", zh: "Q3战略：精准行动", ja: "Q3戦略：精密な動き", ko: "Q3 전략: 정밀한 움직임", ar: "استراتيجية الربع الثالث: الدقة في الحركة" },
  "featured.mainDesc": { en: "A comprehensive analysis of the strategic pivots reshaping our market position and the emerging corridors of exponential growth.", pt: "Uma análise abrangente dos pivôs estratégicos que estão remodelando nossa posição de mercado e os corredores emergentes de crescimento exponencial.", es: "Un análisis integral de los giros estratégicos que remodelan nuestra posición de mercado y los corredores emergentes de crecimiento exponencial.", fr: "Une analyse complète des pivots stratégiques remodelant notre position sur le marché.", de: "Eine umfassende Analyse der strategischen Neuausrichtungen, die unsere Marktposition verändern.", it: "Un'analisi completa dei pivot strategici che stanno rimodellando la nostra posizione di mercato.", zh: "全面分析正在重塑我们市场地位的战略转向和新兴的指数增长通道。", ja: "市場ポジションを変革する戦略的転換の包括的分析。", ko: "시장 포지션을 재편하는 전략적 전환에 대한 종합 분석.", ar: "تحليل شامل للتحولات الاستراتيجية التي تعيد تشكيل موقعنا في السوق." },
  "featured.innovation": { en: "Innovation", pt: "Inovação", es: "Innovación", fr: "Innovation", de: "Innovation", it: "Innovazione", zh: "创新", ja: "イノベーション", ko: "혁신", ar: "ابتكار" },
  "featured.innovTitle": { en: "Digital Sovereignty & The New Enterprise Stack", pt: "Soberania Digital e a Nova Stack Empresarial", es: "Soberanía Digital y la Nueva Pila Empresarial", fr: "Souveraineté Numérique et la Nouvelle Stack", de: "Digitale Souveränität & der Neue Enterprise-Stack", it: "Sovranità Digitale e il Nuovo Stack Aziendale", zh: "数字主权与新企业技术栈", ja: "デジタル主権と新エンタープライズスタック", ko: "디지털 주권과 새로운 엔터프라이즈 스택", ar: "السيادة الرقمية والمجموعة المؤسسية الجديدة" },
  "featured.architecture": { en: "Architecture", pt: "Arquitetura", es: "Arquitectura", fr: "Architecture", de: "Architektur", it: "Architettura", zh: "架构", ja: "アーキテクチャ", ko: "아키텍처", ar: "هندسة معمارية" },
  "featured.archTitle": { en: "Building for the Next Decade of Scale", pt: "Construindo para a Próxima Década de Escala", es: "Construyendo para la Próxima Década de Escala", fr: "Construire pour la Prochaine Décennie", de: "Bauen für das Nächste Jahrzehnt des Wachstums", it: "Costruire per il Prossimo Decennio di Scala", zh: "为下一个十年规模而建", ja: "次の10年のスケールに向けて構築", ko: "다음 10년의 스케일을 위한 구축", ar: "البناء للعقد القادم من النمو" },

  // ========== NEWS GRID ==========
  "news.label": { en: "Latest Updates", pt: "Últimas Atualizações", es: "Últimas Actualizaciones", fr: "Dernières Mises à Jour", de: "Neueste Updates", it: "Ultimi Aggiornamenti", zh: "最新更新", ja: "最新アップデート", ko: "최신 업데이트", ar: "آخر التحديثات" },
  "news.title": { en: "The Newsroom", pt: "A Redação", es: "La Redacción", fr: "La Rédaction", de: "Der Newsroom", it: "La Redazione", zh: "新闻编辑室", ja: "ニュースルーム", ko: "뉴스룸", ar: "غرفة الأخبار" },
  "news.error": { en: "Unable to load news at the moment. Please try again later.", pt: "Não foi possível carregar as notícias. Tente novamente mais tarde.", es: "No se pueden cargar las noticias. Intente de nuevo más tarde.", fr: "Impossible de charger les actualités. Réessayez plus tard.", de: "Nachrichten konnten nicht geladen werden. Versuchen Sie es später erneut.", it: "Impossibile caricare le notizie. Riprova più tardi.", zh: "暂时无法加载新闻。请稍后重试。", ja: "ニュースを読み込めません。後でもう一度お試しください。", ko: "뉴스를 불러올 수 없습니다. 나중에 다시 시도해주세요.", ar: "تعذر تحميل الأخبار. يرجى المحاولة لاحقاً." },
  "news.empty": { en: "No news articles available yet.", pt: "Nenhum artigo disponível ainda.", es: "No hay artículos disponibles aún.", fr: "Aucun article disponible pour le moment.", de: "Noch keine Nachrichtenartikel verfügbar.", it: "Nessun articolo disponibile al momento.", zh: "暂无新闻文章。", ja: "まだニュース記事がありません。", ko: "아직 뉴스 기사가 없습니다.", ar: "لا توجد مقالات إخبارية حتى الآن." },
  "news.category": { en: "News", pt: "Notícias", es: "Noticias", fr: "Actualités", de: "Nachrichten", it: "Notizie", zh: "新闻", ja: "ニュース", ko: "뉴스", ar: "أخبار" },

  // ========== EVENTS SECTION (HOME) ==========
  "section.upcoming": { en: "Upcoming", pt: "Próximos", es: "Próximos", fr: "À Venir", de: "Kommende", it: "Prossimi", zh: "即将举行", ja: "今後の", ko: "예정된", ar: "القادمة" },
  "section.events": { en: "Events", pt: "Eventos", es: "Eventos", fr: "Événements", de: "Veranstaltungen", it: "Eventi", zh: "活动", ja: "イベント", ko: "이벤트", ar: "فعاليات" },
  "events.nextUp": { en: "Next Up", pt: "Próximo", es: "Siguiente", fr: "Prochain", de: "Als Nächstes", it: "Prossimo", zh: "下一个", ja: "次の", ko: "다음", ar: "التالي" },
  "events.confirmed": { en: "Confirmed", pt: "Confirmado", es: "Confirmado", fr: "Confirmé", de: "Bestätigt", it: "Confermato", zh: "已确认", ja: "確定", ko: "확정", ar: "مؤكد" },
  "events.featured": { en: "Featured", pt: "Destaque", es: "Destacado", fr: "À la Une", de: "Empfohlen", it: "In Evidenza", zh: "精选", ja: "注目", ko: "추천", ar: "مميز" },

  // ========== EVENTS PAGE ==========
  "events.semester": { en: "1st Semester 2026", pt: "1º Semestre 2026", es: "1er Semestre 2026", fr: "1er Semestre 2026", de: "1. Halbjahr 2026", it: "1° Semestre 2026", zh: "2026年上半年", ja: "2026年上半期", ko: "2026년 상반기", ar: "النصف الأول 2026" },
  "events.title": { en: "Automotive Events — Florida", pt: "Eventos Automotivos — Flórida", es: "Eventos Automotrices — Florida", fr: "Événements Automobiles — Floride", de: "Automobil-Events — Florida", it: "Eventi Automobilistici — Florida", zh: "汽车活动 — 佛罗里达", ja: "自動車イベント — フロリダ", ko: "자동차 이벤트 — 플로리다", ar: "فعاليات السيارات — فلوريدا" },
  "events.description": { en: "Complete automotive events agenda in Florida: dealers, collectors, enthusiasts, aftermarket and premium visibility.", pt: "Agenda completa de eventos automotivos estratégicos na Flórida: dealers, collectors, entusiastas, aftermarket e visibilidade premium.", es: "Agenda completa de eventos automotrices estratégicos en Florida.", fr: "Agenda complète des événements automobiles en Floride.", de: "Komplette Automobil-Events-Agenda in Florida.", it: "Agenda completa degli eventi automobilistici in Florida.", zh: "佛罗里达完整汽车活动日程。", ja: "フロリダの完全な自動車イベントスケジュール。", ko: "플로리다 자동차 이벤트 전체 일정.", ar: "جدول فعاليات السيارات الكامل في فلوريدا." },
  "events.viewDetails": { en: "View details", pt: "Ver detalhes", es: "Ver detalles", fr: "Voir détails", de: "Details ansehen", it: "Vedi dettagli", zh: "查看详情", ja: "詳細を見る", ko: "상세보기", ar: "عرض التفاصيل" },
  "events.strategic": { en: "Strategic", pt: "Estratégico", es: "Estratégico", fr: "Stratégique", de: "Strategisch", it: "Strategico", zh: "战略性", ja: "戦略的", ko: "전략적", ar: "استراتيجي" },
  "events.registrationOpen": { en: "Registration Open", pt: "Inscrições Abertas", es: "Registro Abierto", fr: "Inscriptions Ouvertes", de: "Anmeldung Offen", it: "Iscrizioni Aperte", zh: "报名开放", ja: "登録受付中", ko: "등록 가능", ar: "التسجيل مفتوح" },
  "events.byInvitation": { en: "By Invitation", pt: "Por Convite", es: "Por Invitación", fr: "Sur Invitation", de: "Auf Einladung", it: "Su Invito", zh: "受邀参加", ja: "招待制", ko: "초대제", ar: "بالدعوة" },

  // ========== DRAWER ==========
  "drawer.about": { en: "About the Event", pt: "Sobre o Evento", es: "Sobre el Evento", fr: "À Propos de l'Événement", de: "Über das Event", it: "Info Evento", zh: "关于活动", ja: "イベントについて", ko: "이벤트 소개", ar: "عن الفعالية" },
  "drawer.highlights": { en: "Highlights", pt: "Destaques", es: "Destacados", fr: "Points Forts", de: "Highlights", it: "Highlights", zh: "亮点", ja: "ハイライト", ko: "하이라이트", ar: "أبرز النقاط" },
  "drawer.howTo": { en: "How to Participate", pt: "Como Participar", es: "Cómo Participar", fr: "Comment Participer", de: "Teilnahme", it: "Come Partecipare", zh: "如何参与", ja: "参加方法", ko: "참여 방법", ar: "كيفية المشاركة" },
  "drawer.tickets": { en: "Tickets & Registration", pt: "Ingressos & Inscrição", es: "Entradas & Registro", fr: "Billets & Inscription", de: "Tickets & Anmeldung", it: "Biglietti & Iscrizione", zh: "门票和注册", ja: "チケット＆登録", ko: "티켓 및 등록", ar: "التذاكر والتسجيل" },
  "drawer.visitSite": { en: "Visit Official Site", pt: "Visitar Site Oficial", es: "Visitar Sitio Oficial", fr: "Visiter le Site Officiel", de: "Offizielle Seite Besuchen", it: "Visita il Sito Ufficiale", zh: "访问官方网站", ja: "公式サイトへ", ko: "공식 사이트 방문", ar: "زيارة الموقع الرسمي" },

  // ========== CTA ==========
  "cta.label": { en: "Important", pt: "Importante", es: "Importante", fr: "Important", de: "Wichtig", it: "Importante", zh: "重要", ja: "重要", ko: "중요", ar: "مهم" },
  "cta.title1": { en: "Stay Ahead of", pt: "Fique à Frente do", es: "Mantente al Día con", fr: "Restez en Avance sur", de: "Bleiben Sie Voraus bei", it: "Resta in Vantaggio su", zh: "领先于", ja: "先を行く", ko: "앞서가기", ar: "ابق في المقدمة" },
  "cta.title2": { en: "What Matters.", pt: "Que Importa.", es: "Lo que Importa.", fr: "Ce qui Compte.", de: "Was Zählt.", it: "Ciò che Conta.", zh: "重要事项。", ja: "重要なこと。", ko: "중요한 것.", ar: "ما يهم." },
  "cta.description": { en: "Subscribe to receive exclusive reports, event invitations, and strategic insights directly to your inbox.", pt: "Inscreva-se para receber relatórios exclusivos, convites para eventos e insights estratégicos diretamente na sua caixa de entrada.", es: "Suscríbete para recibir reportes exclusivos, invitaciones a eventos e insights estratégicos directamente en tu bandeja.", fr: "Abonnez-vous pour recevoir des rapports exclusifs, des invitations et des analyses stratégiques.", de: "Abonnieren Sie exklusive Berichte, Event-Einladungen und strategische Einblicke direkt in Ihrem Posteingang.", it: "Iscriviti per ricevere report esclusivi, inviti ad eventi e insight strategici.", zh: "订阅接收独家报告、活动邀请和战略洞察。", ja: "独占レポート、イベント招待、戦略的インサイトを受け取れます。", ko: "독점 보고서, 이벤트 초대, 전략적 인사이트를 받아보세요.", ar: "اشترك لتلقي التقارير الحصرية ودعوات الفعاليات والرؤى الاستراتيجية." },
  "cta.emailPlaceholder": { en: "Enter your email", pt: "Digite seu email", es: "Ingrese su email", fr: "Votre email", de: "E-Mail eingeben", it: "Inserisci email", zh: "输入邮箱", ja: "メールアドレス", ko: "이메일 입력", ar: "أدخل بريدك الإلكتروني" },
  "cta.subscribe": { en: "Subscribe", pt: "Inscrever-se", es: "Suscribirse", fr: "S'abonner", de: "Abonnieren", it: "Iscriviti", zh: "订阅", ja: "登録", ko: "구독", ar: "اشترك" },

  // ========== FOOTER ==========
  "footer.rights": { en: "All rights reserved.", pt: "Todos os direitos reservados.", es: "Todos los derechos reservados.", fr: "Tous droits réservés.", de: "Alle Rechte vorbehalten.", it: "Tutti i diritti riservati.", zh: "版权所有。", ja: "全著作権所有。", ko: "모든 권리 보유.", ar: "جميع الحقوق محفوظة." },

  // ========== STORIES PAGE ==========
  "stories.label": { en: "Newsroom", pt: "Redação", es: "Redacción", fr: "Rédaction", de: "Newsroom", it: "Redazione", zh: "新闻编辑室", ja: "ニュースルーム", ko: "뉴스룸", ar: "غرفة الأخبار" },
  "stories.title": { en: "All Stories", pt: "Todas as Histórias", es: "Todas las Historias", fr: "Tous les Articles", de: "Alle Geschichten", it: "Tutte le Storie", zh: "所有故事", ja: "すべての記事", ko: "모든 스토리", ar: "جميع القصص" },
  "stories.description": { en: "Breaking coverage, deep analysis, and exclusive reports from the automotive world.", pt: "Cobertura em tempo real, análises profundas e reportagens exclusivas do mundo automotivo.", es: "Cobertura en vivo, análisis profundo y reportajes exclusivos del mundo automotriz.", fr: "Couverture en direct, analyses approfondies et rapports exclusifs du monde automobile.", de: "Live-Berichterstattung, tiefgehende Analysen und exklusive Berichte aus der Automobilwelt.", it: "Copertura in diretta, analisi approfondite e report esclusivi dal mondo automobilistico.", zh: "实时报道、深度分析和汽车界独家报告。", ja: "速報、深層分析、自動車界の独占レポート。", ko: "실시간 보도, 심층 분석, 자동차 세계의 독점 리포트.", ar: "تغطية عاجلة وتحليل معمق وتقارير حصرية من عالم السيارات." },
  "stories.error": { en: "Unable to load stories at the moment. Please try again later.", pt: "Não foi possível carregar as histórias. Tente novamente mais tarde.", es: "No se pueden cargar las historias. Intente de nuevo más tarde.", fr: "Impossible de charger les articles. Réessayez plus tard.", de: "Geschichten konnten nicht geladen werden. Versuchen Sie es später erneut.", it: "Impossibile caricare le storie. Riprova più tardi.", zh: "暂时无法加载故事。请稍后重试。", ja: "記事を読み込めません。後でもう一度お試しください。", ko: "스토리를 불러올 수 없습니다. 나중에 다시 시도해주세요.", ar: "تعذر تحميل القصص. يرجى المحاولة لاحقاً." },
  "stories.empty": { en: "No stories available yet. Check back soon.", pt: "Nenhuma história disponível ainda. Volte em breve.", es: "No hay historias disponibles aún. Vuelve pronto.", fr: "Aucun article disponible pour le moment.", de: "Noch keine Geschichten verfügbar. Schauen Sie bald wieder vorbei.", it: "Nessuna storia disponibile. Torna presto.", zh: "暂无故事。请稍后再来。", ja: "まだ記事がありません。しばらくしてからお戻りください。", ko: "아직 스토리가 없습니다. 곧 확인해주세요.", ar: "لا توجد قصص متاحة بعد. عد قريباً." },

  // ========== PRODUCTS PAGE ==========
  "products.label": { en: "Offerings", pt: "Ofertas", es: "Ofertas", fr: "Offres", de: "Angebote", it: "Offerte", zh: "产品服务", ja: "提供サービス", ko: "서비스", ar: "عروض" },
  "products.title": { en: "Products", pt: "Produtos", es: "Productos", fr: "Produits", de: "Produkte", it: "Prodotti", zh: "产品", ja: "製品", ko: "제품", ar: "منتجات" },
  "products.description": { en: "Tools and subscriptions for the informed reader.", pt: "Ferramentas e assinaturas para o leitor informado.", es: "Herramientas y suscripciones para el lector informado.", fr: "Outils et abonnements pour le lecteur informé.", de: "Tools und Abonnements für den informierten Leser.", it: "Strumenti e abbonamenti per il lettore informato.", zh: "为知情读者提供的工具和订阅。", ja: "情報通の読者向けツールとサブスクリプション。", ko: "정보에 밝은 독자를 위한 도구와 구독.", ar: "أدوات واشتراكات للقارئ المطلع." },
  "products.spotlight": { en: "Spotlight", pt: "Destaque", es: "Destacado", fr: "En Vedette", de: "Spotlight", it: "In Primo Piano", zh: "焦点", ja: "スポットライト", ko: "스포트라이트", ar: "تسليط الضوء" },
  "products.premiumTitle": { en: "NEWS Premium", pt: "NEWS Premium", es: "NEWS Premium", fr: "NEWS Premium", de: "NEWS Premium", it: "NEWS Premium", zh: "NEWS Premium", ja: "NEWS Premium", ko: "NEWS Premium", ar: "NEWS Premium" },
  "products.premiumDesc": { en: "Unlimited access to in-depth reports, exclusive interviews, and real-time breaking alerts across all verticals.", pt: "Acesso ilimitado a reportagens aprofundadas, entrevistas exclusivas e alertas em tempo real em todos os setores.", es: "Acceso ilimitado a reportajes en profundidad, entrevistas exclusivas y alertas en tiempo real.", fr: "Accès illimité aux rapports approfondis, interviews exclusives et alertes en temps réel.", de: "Unbegrenzter Zugang zu ausführlichen Berichten, exklusiven Interviews und Echtzeit-Alerts.", it: "Accesso illimitato a report approfonditi, interviste esclusive e alert in tempo reale.", zh: "无限访问深度报道、独家采访和实时突发新闻提醒。", ja: "深層レポート、独占インタビュー、リアルタイムアラートに無制限アクセス。", ko: "심층 리포트, 독점 인터뷰, 실시간 속보 알림 무제한 이용.", ar: "وصول غير محدود للتقارير المعمقة والمقابلات الحصرية والتنبيهات الفورية." },
  "products.subscribe": { en: "Subscribe", pt: "Assinar", es: "Suscribirse", fr: "S'abonner", de: "Abonnieren", it: "Iscriviti", zh: "订阅", ja: "登録", ko: "구독", ar: "اشترك" },
  "products.newLabel": { en: "New", pt: "Novo", es: "Nuevo", fr: "Nouveau", de: "Neu", it: "Nuovo", zh: "新", ja: "新着", ko: "새로운", ar: "جديد" },
  "products.briefingTitle": { en: "Daily Briefing", pt: "Resumo Diário", es: "Resumen Diario", fr: "Briefing Quotidien", de: "Tägliches Briefing", it: "Briefing Giornaliero", zh: "每日简报", ja: "デイリーブリーフィング", ko: "데일리 브리핑", ar: "الملخص اليومي" },
  "products.briefingDesc": { en: "Curated morning digest with the 10 stories that matter most, delivered before 7 AM.", pt: "Resumo matinal curado com as 10 histórias mais importantes, entregue antes das 7h.", es: "Resumen matutino curado con las 10 historias más importantes, entregado antes de las 7 AM.", fr: "Digest matinal avec les 10 articles les plus importants, livré avant 7h.", de: "Kuratierter Morgen-Digest mit den 10 wichtigsten Geschichten, vor 7 Uhr zugestellt.", it: "Digest mattutino con le 10 storie più importanti, consegnato prima delle 7.", zh: "精选晨间摘要，包含10篇最重要的文章，早上7点前送达。", ja: "最も重要な10記事のキュレーションされた朝のダイジェスト。午前7時前にお届け。", ko: "가장 중요한 10개 기사의 큐레이션된 아침 다이제스트. 오전 7시 전 전달.", ar: "ملخص صباحي منسق بأهم 10 قصص، يصل قبل الساعة 7 صباحاً." },
  "products.signUp": { en: "Sign Up", pt: "Cadastrar", es: "Registrarse", fr: "S'inscrire", de: "Anmelden", it: "Registrati", zh: "注册", ja: "登録", ko: "가입", ar: "سجل" },
  "products.popular": { en: "Popular", pt: "Popular", es: "Popular", fr: "Populaire", de: "Beliebt", it: "Popolare", zh: "热门", ja: "人気", ko: "인기", ar: "شائع" },
  "products.podcastTitle": { en: "Podcast Network", pt: "Rede de Podcasts", es: "Red de Podcasts", fr: "Réseau de Podcasts", de: "Podcast-Netzwerk", it: "Rete Podcast", zh: "播客网络", ja: "ポッドキャストネットワーク", ko: "팟캐스트 네트워크", ar: "شبكة البودكاست" },
  "products.podcastDesc": { en: "Long-form audio journalism featuring investigative series, expert interviews, and weekly analysis.", pt: "Jornalismo em áudio de longa duração com séries investigativas, entrevistas e análises semanais.", es: "Periodismo de audio de formato largo con series investigativas, entrevistas y análisis semanales.", fr: "Journalisme audio long format avec séries d'investigation et analyses hebdomadaires.", de: "Langform-Audio-Journalismus mit investigativen Serien und wöchentlichen Analysen.", it: "Giornalismo audio long-form con serie investigative e analisi settimanali.", zh: "长篇音频新闻，涵盖调查系列、专家访谈和每周分析。", ja: "調査シリーズ、専門家インタビュー、週間分析を特集する長編オーディオジャーナリズム。", ko: "탐사 시리즈, 전문가 인터뷰, 주간 분석을 다루는 장편 오디오 저널리즘.", ar: "صحافة صوتية طويلة تتضمن سلاسل تحقيقية ومقابلات وتحليلات أسبوعية." },
  "products.listenNow": { en: "Listen Now", pt: "Ouvir Agora", es: "Escuchar Ahora", fr: "Écouter", de: "Jetzt Hören", it: "Ascolta Ora", zh: "立即收听", ja: "今すぐ聴く", ko: "지금 듣기", ar: "استمع الآن" },
  "products.comingSoon": { en: "Coming Soon", pt: "Em Breve", es: "Próximamente", fr: "Bientôt", de: "Demnächst", it: "Prossimamente", zh: "即将推出", ja: "近日公開", ko: "곧 출시", ar: "قريباً" },
  "products.intelTitle": { en: "NEWS Intelligence", pt: "NEWS Intelligence", es: "NEWS Intelligence", fr: "NEWS Intelligence", de: "NEWS Intelligence", it: "NEWS Intelligence", zh: "NEWS Intelligence", ja: "NEWS Intelligence", ko: "NEWS Intelligence", ar: "NEWS Intelligence" },
  "products.intelDesc": { en: "AI-powered research assistant for professionals who need deeper context on breaking developments.", pt: "Assistente de pesquisa com IA para profissionais que precisam de contexto mais profundo sobre acontecimentos.", es: "Asistente de investigación con IA para profesionales que necesitan contexto más profundo.", fr: "Assistant de recherche IA pour les professionnels qui ont besoin de contexte approfondi.", de: "KI-gestützter Recherche-Assistent für Profis, die tieferen Kontext benötigen.", it: "Assistente di ricerca AI per professionisti che necessitano di contesto più approfondito.", zh: "为需要深入了解突发事件的专业人士提供的AI研究助手。", ja: "速報の深い背景を必要とするプロフェッショナル向けAIリサーチアシスタント。", ko: "속보에 대한 더 깊은 맥락이 필요한 전문가를 위한 AI 리서치 어시스턴트.", ar: "مساعد بحث بالذكاء الاصطناعي للمحترفين الذين يحتاجون سياقاً أعمق." },
  "products.joinWaitlist": { en: "Join Waitlist", pt: "Entrar na Lista", es: "Unirse a la Lista", fr: "Rejoindre la Liste", de: "Warteliste", it: "Lista d'Attesa", zh: "加入等候名单", ja: "ウェイトリストに参加", ko: "대기 목록 참가", ar: "انضم لقائمة الانتظار" },

  // ========== SEARCH ==========
  "search.placeholder": { en: "Search stories, events, topics...", pt: "Buscar histórias, eventos, tópicos...", es: "Buscar historias, eventos, temas...", fr: "Rechercher articles, événements, sujets...", de: "Suche Geschichten, Events, Themen...", it: "Cerca storie, eventi, argomenti...", zh: "搜索故事、活动、主题...", ja: "記事、イベント、トピックを検索...", ko: "스토리, 이벤트, 주제 검색...", ar: "ابحث عن قصص، فعاليات، مواضيع..." },

  // ========== SUBMIT CONTENT ==========
  "submit.button": { en: "Publish", pt: "Publicar", es: "Publicar", fr: "Publier", de: "Veröffentlichen", it: "Pubblica", zh: "发布", ja: "投稿", ko: "게시", ar: "نشر" },
  "submit.title": { en: "Publish Content", pt: "Publicar Conteúdo", es: "Publicar Contenido", fr: "Publier du Contenu", de: "Inhalt Veröffentlichen", it: "Pubblica Contenuto", zh: "发布内容", ja: "コンテンツを投稿", ko: "콘텐츠 게시", ar: "نشر المحتوى" },
  "submit.description": { en: "Share your news, event or product with our community.", pt: "Compartilhe sua notícia, evento ou produto com nossa comunidade.", es: "Comparte tu noticia, evento o producto con nuestra comunidad.", fr: "Partagez votre actualité, événement ou produit avec notre communauté.", de: "Teilen Sie Ihre Nachricht, Veranstaltung oder Ihr Produkt mit unserer Community.", it: "Condividi la tua notizia, evento o prodotto con la nostra community.", zh: "与我们的社区分享您的新闻、活动或产品。", ja: "ニュース、イベント、製品をコミュニティと共有しましょう。", ko: "뉴스, 이벤트 또는 제품을 커뮤니티와 공유하세요.", ar: "شارك أخبارك أو فعاليتك أو منتجك مع مجتمعنا." },
  "submit.typeNews": { en: "News", pt: "Notícia", es: "Noticia", fr: "Actualité", de: "Nachricht", it: "Notizia", zh: "新闻", ja: "ニュース", ko: "뉴스", ar: "خبر" },
  "submit.typeEvent": { en: "Event", pt: "Evento", es: "Evento", fr: "Événement", de: "Event", it: "Evento", zh: "活动", ja: "イベント", ko: "이벤트", ar: "فعالية" },
  "submit.typeProduct": { en: "Product", pt: "Produto", es: "Producto", fr: "Produit", de: "Produkt", it: "Prodotto", zh: "产品", ja: "製品", ko: "제품", ar: "منتج" },
  "submit.authorName": { en: "Your Name", pt: "Seu Nome", es: "Tu Nombre", fr: "Votre Nom", de: "Ihr Name", it: "Il Tuo Nome", zh: "您的姓名", ja: "お名前", ko: "이름", ar: "اسمك" },
  "submit.authorEmail": { en: "Email (optional)", pt: "Email (opcional)", es: "Email (opcional)", fr: "Email (facultatif)", de: "E-Mail (optional)", it: "Email (opzionale)", zh: "邮箱（可选）", ja: "メール（任意）", ko: "이메일 (선택)", ar: "البريد الإلكتروني (اختياري)" },
  "submit.contentTitle": { en: "Title", pt: "Título", es: "Título", fr: "Titre", de: "Titel", it: "Titolo", zh: "标题", ja: "タイトル", ko: "제목", ar: "العنوان" },
  "submit.contentDesc": { en: "Description", pt: "Descrição", es: "Descripción", fr: "Description", de: "Beschreibung", it: "Descrizione", zh: "描述", ja: "説明", ko: "설명", ar: "الوصف" },
  "submit.imageUrl": { en: "Image URL", pt: "URL da Imagem", es: "URL de Imagen", fr: "URL de l'Image", de: "Bild-URL", it: "URL Immagine", zh: "图片链接", ja: "画像URL", ko: "이미지 URL", ar: "رابط الصورة" },
  "submit.category": { en: "Category", pt: "Categoria", es: "Categoría", fr: "Catégorie", de: "Kategorie", it: "Categoria", zh: "分类", ja: "カテゴリ", ko: "카테고리", ar: "الفئة" },
  "submit.eventDetails": { en: "Event Details", pt: "Detalhes do Evento", es: "Detalles del Evento", fr: "Détails de l'Événement", de: "Event-Details", it: "Dettagli Evento", zh: "活动详情", ja: "イベント詳細", ko: "이벤트 세부정보", ar: "تفاصيل الفعالية" },
  "submit.eventDate": { en: "Event Date", pt: "Data do Evento", es: "Fecha del Evento", fr: "Date de l'Événement", de: "Eventdatum", it: "Data Evento", zh: "活动日期", ja: "イベント日", ko: "이벤트 날짜", ar: "تاريخ الفعالية" },
  "submit.eventEndDate": { en: "End Date (optional)", pt: "Data Final (opcional)", es: "Fecha Final (opcional)", fr: "Date de Fin (facultatif)", de: "Enddatum (optional)", it: "Data Fine (opzionale)", zh: "结束日期（可选）", ja: "終了日（任意）", ko: "종료 날짜 (선택)", ar: "تاريخ الانتهاء (اختياري)" },
  "submit.location": { en: "Location", pt: "Local", es: "Ubicación", fr: "Lieu", de: "Ort", it: "Luogo", zh: "地点", ja: "場所", ko: "장소", ar: "الموقع" },
  "submit.address": { en: "Address", pt: "Endereço", es: "Dirección", fr: "Adresse", de: "Adresse", it: "Indirizzo", zh: "地址", ja: "住所", ko: "주소", ar: "العنوان" },
  "submit.hours": { en: "Hours", pt: "Horário", es: "Horario", fr: "Horaires", de: "Öffnungszeiten", it: "Orari", zh: "时间", ja: "時間", ko: "시간", ar: "الساعات" },
  "submit.website": { en: "Website", pt: "Website", es: "Sitio Web", fr: "Site Web", de: "Webseite", it: "Sito Web", zh: "网站", ja: "ウェブサイト", ko: "웹사이트", ar: "الموقع الإلكتروني" },
  "submit.productDetails": { en: "Product Details", pt: "Detalhes do Produto", es: "Detalles del Producto", fr: "Détails du Produit", de: "Produktdetails", it: "Dettagli Prodotto", zh: "产品详情", ja: "製品詳細", ko: "제품 세부정보", ar: "تفاصيل المنتج" },
  "submit.price": { en: "Price", pt: "Preço", es: "Precio", fr: "Prix", de: "Preis", it: "Prezzo", zh: "价格", ja: "価格", ko: "가격", ar: "السعر" },
  "submit.ctaLabel": { en: "Button Label", pt: "Texto do Botão", es: "Texto del Botón", fr: "Libellé du Bouton", de: "Button-Text", it: "Testo Pulsante", zh: "按钮文字", ja: "ボタンテキスト", ko: "버튼 텍스트", ar: "نص الزر" },
  "submit.articleUrl": { en: "Article URL", pt: "URL do Artigo", es: "URL del Artículo", fr: "URL de l'Article", de: "Artikel-URL", it: "URL Articolo", zh: "文章链接", ja: "記事URL", ko: "기사 URL", ar: "رابط المقال" },
  "submit.publish": { en: "Publish Now", pt: "Publicar Agora", es: "Publicar Ahora", fr: "Publier Maintenant", de: "Jetzt Veröffentlichen", it: "Pubblica Ora", zh: "立即发布", ja: "今すぐ投稿", ko: "지금 게시", ar: "انشر الآن" },
  "submit.success": { en: "Content published successfully!", pt: "Conteúdo publicado com sucesso!", es: "¡Contenido publicado con éxito!", fr: "Contenu publié avec succès !", de: "Inhalt erfolgreich veröffentlicht!", it: "Contenuto pubblicato con successo!", zh: "内容发布成功！", ja: "コンテンツが投稿されました！", ko: "콘텐츠가 게시되었습니다!", ar: "تم نشر المحتوى بنجاح!" },
  "submit.error": { en: "Failed to publish. Please try again.", pt: "Falha ao publicar. Tente novamente.", es: "Error al publicar. Inténtalo de nuevo.", fr: "Échec de la publication. Réessayez.", de: "Veröffentlichung fehlgeschlagen. Bitte erneut versuchen.", it: "Pubblicazione fallita. Riprova.", zh: "发布失败。请重试。", ja: "投稿に失敗しました。もう一度お試しください。", ko: "게시에 실패했습니다. 다시 시도해주세요.", ar: "فشل النشر. حاول مرة أخرى." },
  "submit.community": { en: "Community", pt: "Comunidade", es: "Comunidad", fr: "Communauté", de: "Community", it: "Community", zh: "社区", ja: "コミュニティ", ko: "커뮤니티", ar: "مجتمع" },

  // ========== EVENT REMINDER ==========
  "reminder.title": { en: "Upcoming Community Events!", pt: "Eventos da Comunidade se Aproximando!", es: "¡Eventos de la Comunidad Próximos!", fr: "Événements Communautaires à Venir !", de: "Bevorstehende Community-Events!", it: "Eventi della Community in Arrivo!", zh: "即将举行的社区活动！", ja: "コミュニティイベントが近づいています！", ko: "다가오는 커뮤니티 이벤트!", ar: "فعاليات مجتمعية قادمة!" },
  "reminder.description": { en: "Don't miss these events happening soon!", pt: "Não perca esses eventos que acontecem em breve!", es: "¡No te pierdas estos eventos que ocurren pronto!", fr: "Ne manquez pas ces événements à venir !", de: "Verpassen Sie nicht diese bevorstehenden Events!", it: "Non perdere questi eventi in arrivo!", zh: "不要错过即将举行的活动！", ja: "間もなく開催されるイベントをお見逃しなく！", ko: "곧 열리는 이벤트를 놓치지 마세요!", ar: "لا تفوت هذه الفعاليات القادمة!" },
  "reminder.today": { en: "Today", pt: "Hoje", es: "Hoy", fr: "Aujourd'hui", de: "Heute", it: "Oggi", zh: "今天", ja: "今日", ko: "오늘", ar: "اليوم" },
  "reminder.tomorrow": { en: "Tomorrow", pt: "Amanhã", es: "Mañana", fr: "Demain", de: "Morgen", it: "Domani", zh: "明天", ja: "明日", ko: "내일", ar: "غداً" },
  "reminder.daysLeft": { en: "days left", pt: "dias restantes", es: "días restantes", fr: "jours restants", de: "Tage verbleibend", it: "giorni rimanenti", zh: "天后", ja: "日後", ko: "일 남음", ar: "أيام متبقية" },
  "reminder.by": { en: "by", pt: "por", es: "por", fr: "par", de: "von", it: "di", zh: "由", ja: "投稿者:", ko: "작성자:", ar: "بواسطة" },
  "reminder.viewMore": { en: "View More", pt: "Ver Mais", es: "Ver Más", fr: "Voir Plus", de: "Mehr Anzeigen", it: "Vedi Altro", zh: "查看更多", ja: "もっと見る", ko: "더 보기", ar: "عرض المزيد" },
  "reminder.dismiss": { en: "Got it, thanks!", pt: "Entendi, obrigado!", es: "¡Entendido, gracias!", fr: "Compris, merci !", de: "Verstanden, danke!", it: "Capito, grazie!", zh: "收到，谢谢！", ja: "了解しました！", ko: "확인했습니다!", ar: "فهمت، شكراً!" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  // Hydrate from localStorage on mount (SSR-safe)
  useEffect(() => {
    const saved = localStorage.getItem("app-language");
    if (saved && saved !== language) {
      setLanguageState(saved as Language);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("app-language", lang);
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  };

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, []);

  const t = (key: string): string => {
    return translations[key]?.[language] || translations[key]?.["en"] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
