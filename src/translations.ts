import { ServiceItem, ProjectItem, TestimonialItem } from "./types";

// Detect initial language based on the browser/device locale
export const getBrowserLanguage = (): "es" | "en" => {
  if (typeof window !== "undefined" && window.navigator) {
    const userLang = window.navigator.language || (window.navigator as any).userLanguage || "";
    if (userLang.toLowerCase().startsWith("en")) {
      return "en";
    }
  }
  return "es";
};

// UI Static Translations
export const UI_TRANSLATIONS = {
  es: {
    // Header & Navigation
    logoSubtitle: "Desarrollo de Alto Impacto",
    navInicio: "Inicio",
    navServicios: "Servicios",
    navCalculadora: "Calculadora ⚡",
    navPortafolio: "Portafolio",
    navTestimonios: "Testimonios",
    navContacto: "Contacto",
    
    // Banner/Notifications
    alertServiceConfigured: "Formulario configurado para:",
    alertBudgetImported: "Presupuesto de ${total} importado con éxito.",
    alertChatPrefill: "¡Datos copiados del Chatbot! Completa tu nombre y correo.",
    alertTestimonialSuccess: "¡Gracias por tu testimonio! Se ha publicado de inmediato.",
    
    // Hero Section
    heroBadge: "Estudio boutique de desarrollo full-stack",
    heroTitleFirst: "Hacemos Realidad la",
    heroTitleAccent: "Presence Digital",
    heroTitleEnd: "de tu Negocio",
    heroDescription: "Desarrollamos sitios web y landing pages profesionales a la medida de tu presupuesto. Diseños de alto impacto enfocados en atraer más clientes reales.",
    btnEstimateHero: "Calcula tu Presupuesto Express ⚡",
    btnWhatsappHero: "Hablemos por WhatsApp",
    
    // Live Feed Feed / Ecosystem Simulation
    feedTitle: "Novedades del Estudio en Vivo",
    feedDescription: "Ecosistema interactivo de leads y cotizaciones recibidas en tiempo real.",
    feedJustEstimated: "Un cliente acaba de calcular un presupuesto para",
    feedSubmitted: "se registró para",
    feedSourceForm: "Formulario Web",
    feedSourceChat: "Chatbot IA",
    feedVerifiedReviews: "Reseñas de clientes 100% verificadas por Google My Business",
    
    // Services Section
    servicesTitle: "Nuestros Servicios",
    servicesSubtitle: "Soluciones Web Profesionales de Alto Impacto",
    servicesDescription: "Creamos experiencias optimizadas para acelerar el crecimiento de tu negocio digital.",
    btnServiceQuote: "Cotizar ",
    
    // Estimator Section
    estimatorBadge: "Calculadora Interactiva",
    estimatorTitle: "Calcula el Presupuesto de tu Proyecto en Real-Time",
    estimatorDescription: "Selecciona los servicios que tu negocio necesita en este momento. Ofrecemos descuentos por volumen de pack para ayudarte a maximizar tu presupuesto digital.",
    estimatorStep1: "1. Elige uno o más servicios para tu pack:",
    estimatorStep2: "2. Plazo de Entrega y Prioridad:",
    estimatorTimelineRelaxed: "Flexible",
    estimatorTimelineRelaxedDesc: "Ahorra 10%",
    estimatorTimelineStandard: "Estándar",
    estimatorTimelineStandardDesc: "Plazo normal",
    estimatorTimelineFast: "Urgente",
    estimatorTimelineFastDesc: "+25% prioridad",
    estimatorSummaryTitle: "Resumen del Presupuesto",
    estimatorSummarySelected: "Servicios seleccionados:",
    estimatorSummaryUrgency: "Prioridad del plazo:",
    estimatorSummaryOriginalPrice: "Precio original base:",
    estimatorSummaryPackDiscount: "Descuento de Pack",
    estimatorSummaryTimelineFee: "Cargo por urgencia",
    estimatorSummaryTimelineDiscount: "Descuento por plazo flexible",
    estimatorSummaryEstimatedTotal: "Presupuesto Estimado Total",
    btnEstimatorExport: "Importar al Formulario de Contacto",
    estimatorDisclaimer: "Precios de referencia orientativos basados en requerimientos estándar. Al exportar, se autocompletará la solicitud de contacto con este resumen.",
    
    // Portfolio Section
    portfolioBadge: "Casos de Éxito",
    portfolioTitle: "Nuestros Proyectos Recientes",
    portfolioDescription: "Trabajos que combinan diseño sofisticado, velocidad inigualable y enfoque en conversión.",
    portfolioDemoLink: "Ver Enlace del Demo Demo",
    
    // Testimonials Section
    testimonialsBadge: "Testimonios",
    testimonialsTitle: "Lo que dicen nuestros clientes",
    testimonialsDescription: "Historias reales de negocios que transformaron su presencia digital con nosotros.",
    btnWriteTestimonial: "Escribir un Testimonio",
    modalTestimonialTitle: "Cuéntanos tu experiencia de trabajo",
    modalTestimonialSubtitle: "Tu opinión es clave para el crecimiento continuo de nuestro estudio.",
    formTestimonialName: "Nombre Completo *",
    formTestimonialCompany: "Empresa o Negocio",
    formTestimonialRole: "Cargo / Puesto",
    formTestimonialRolePlaceholder: "ej: Fundadora, Gerente, Colaborador",
    formTestimonialAvatar: "Elige tu avatar representativo:",
    formTestimonialReview: "Reseña / Experiencia de Servicio *",
    formTestimonialReviewPlaceholder: "Describe cómo fue trabajar con nosotros, la atención y los resultados de tu web...",
    formTestimonialRating: "Tu Calificación Estelar:",
    formTestimonialSubmit: "Publicar Mi Opinión Ahora",
    formTestimonialError: "Por favor, rellena los campos obligatorios (Nombre y Reseña).",
    
    // Contact Section
    contactBadge: "Cuéntanos Tu Idea",
    contactTitle: "Inicia tu Transformación Digital Hoy Mismo",
    contactSubtitle: "Completa el formulario y recibe una propuesta formal de diseño junto con un análisis de velocidad gratuito para tu competencia.",
    formContactLabelName: "Nombre Completo *",
    formContactPlaceholderName: "ej: Sofía Rodríguez",
    formContactLabelEmail: "Correo Electrónico *",
    formContactPlaceholderEmail: "ej: sofia@empresa.com",
    formContactLabelPhone: "Número de Celular / WhatsApp (Opcional)",
    formContactPlaceholderPhone: "ej: +34 600 000 000",
    formContactLabelService: "Servicio en el que estás interesado",
    formContactOptionCustomPack: "Pack de Servicios Personalizado",
    formContactLabelDescription: "Cuéntanos sobre tu negocio e idea del proyecto...",
    formContactPlaceholderDescription: "ej: Deseo lanzar un sitio para mi marca con reservas en línea, quiero que cargue rápido e indexe en Google...",
    formContactLabelBudget: "Propón tu Presupuesto Estimado",
    formContactBudgetSelectPlaceholder: "Mediano ($500 - $900)",
    btnContactSubmit: "Enviar Solicitud de Cotización",
    contactSuccessTitle: "¡Formulario Recibido con Éxito! 🚀",
    contactSuccessText: "Muchas gracias, tus datos han sido registrados en nuestro sistema. Un diseñador consultor revisará tu proyecto e idea para preparar un prototipo inicial de cortesía. Te contactaremos en menos de 24 horas por correo o WhatsApp.",
    contactSuccessBtnBack: "Volver a Cotizar",
    contactCardPhone: "Llámanos o escríbenos directamente",
    contactCardEmail: "Envíanos un correo",
    contactCardOffice: "Oficina Creativa Principal",
    contactCardPrivacy: "Tus datos están protegidos por leyes de cifrado. No compartimos spam.",
    
    // Chatbot UI Text (General)
    chatInputPlaceholder: "Escribe tu consulta sobre diseño web...",
    chatIntroTitle: "Asistente AI",
    chatStatusOnline: "En línea",
    chatFaqTitle: "Preguntas Frecuentes Rápidas:",
    chatFaqEstimate: "Cuánto cuesta una web?",
    chatFaqLanding: "Qué incluye una LandingPage?",
    chatFaqSEO: "Qué es el SEO básico?",
    chatFaqBranding: "Hacen diseño de marca/logo?",
    chatOfflineError: "Mil disculpas, estoy experimentando un breve problema para conectar con mi base de conocimientos. Puedes enviarnos un mensaje de WhatsApp directo para resolver tus dudas de inmediato.",
    
    // General
    loading: "Cargando...",
    footerRights: "Todos los derechos reservados. Diseñado con pasión de alto rendimiento."
  },
  en: {
    // Header & Navigation
    logoSubtitle: "High Impact Development",
    navInicio: "Home",
    navServicios: "Services",
    navCalculadora: "Calculator ⚡",
    navPortafolio: "Portfolio",
    navTestimonios: "Testimonials",
    navContacto: "Contact",
    
    // Banner/Notifications
    alertServiceConfigured: "Form configured for:",
    alertBudgetImported: "Budget of ${total} successfully imported.",
    alertChatPrefill: "Data copied from Chatbot! Please fill in your name and email.",
    alertTestimonialSuccess: "Thank you for your testimonial! It has been published immediately.",
    
    // Hero Section
    heroBadge: "Boutique full-stack development studio",
    heroTitleFirst: "We Bring Your Business's",
    heroTitleAccent: "Digital Presence",
    heroTitleEnd: "to Life",
    heroDescription: "We develop professional custom websites and landing pages styled to your exact budget. High-impact designs focused on attracting genuine customers.",
    btnEstimateHero: "Calculate Express Budget ⚡",
    btnWhatsappHero: "Let's Chat on WhatsApp",
    
    // Live Feed Feed / Ecosystem Simulation
    feedTitle: "Live Studio Updates",
    feedDescription: "Interactive ecosystem of leads and quotes received in real-time.",
    feedJustEstimated: "A client just calculated a custom quote for",
    feedSubmitted: "registered for",
    feedSourceForm: "Web Form",
    feedSourceChat: "AI Chatbot",
    feedVerifiedReviews: "100% verified customer reviews by Google My Business",
    
    // Services Section
    servicesTitle: "Our Services",
    servicesSubtitle: "Professional High-Impact Web Solutions",
    servicesDescription: "We create optimized experiences to accelerate the growth of your digital business.",
    btnServiceQuote: "Get Quote for ",
    
    // Estimator Section
    estimatorBadge: "Interactive Calculator",
    estimatorTitle: "Calculate Your Project Budget in Real-Time",
    estimatorDescription: "Select the services your business needs right now. We offer bundle discounts to help you maximize your digital budget.",
    estimatorStep1: "1. Choose one or more services for your bundle:",
    estimatorStep2: "2. Delivery Timeline & Priority:",
    estimatorTimelineRelaxed: "Flexible",
    estimatorTimelineRelaxedDesc: "Save 10%",
    estimatorTimelineStandard: "Standard",
    estimatorTimelineStandardDesc: "Normal timeline",
    estimatorTimelineFast: "Urgent",
    estimatorTimelineFastDesc: "+25% priority charge",
    estimatorSummaryTitle: "Budget Summary",
    estimatorSummarySelected: "Selected services:",
    estimatorSummaryUrgency: "Timeline priority:",
    estimatorSummaryOriginalPrice: "Original base price:",
    estimatorSummaryPackDiscount: "Bundle Discount",
    estimatorSummaryTimelineFee: "Urgency Fee",
    estimatorSummaryTimelineDiscount: "Flexible timeline discount",
    estimatorSummaryEstimatedTotal: "Total Estimated Budget",
    btnEstimatorExport: "Import into Contact Form",
    estimatorDisclaimer: "Reference pricing based on standard requirements. Exporting will auto-fill the contact form fields with this summary.",
    
    // Portfolio Section
    portfolioBadge: "Success Stories",
    portfolioTitle: "Our Recent Projects",
    portfolioDescription: "Work combining sophisticated design, unbeatable speed, and conversion focus.",
    portfolioDemoLink: "View Demo Link",
    
    // Testimonials Section
    testimonialsBadge: "Testimonials",
    testimonialsTitle: "What our clients say",
    testimonialsDescription: "Real stories from businesses that transformed their digital presence with us.",
    btnWriteTestimonial: "Write a Testimonial",
    modalTestimonialTitle: "Tell us about your project experience",
    modalTestimonialSubtitle: "Your feedback is key to our studio's continuous improvement.",
    formTestimonialName: "Full Name *",
    formTestimonialCompany: "Company or Business Name",
    formTestimonialRole: "Role / Position",
    formTestimonialRolePlaceholder: "e.g. Founder, Manager, Partner",
    formTestimonialAvatar: "Choose your display avatar:",
    formTestimonialReview: "Review / Service Experience *",
    formTestimonialReviewPlaceholder: "Describe how it was working with us, our attention, and the results of your new design...",
    formTestimonialRating: "Your Stellar Rating:",
    formTestimonialSubmit: "Publish My Review Now",
    formTestimonialError: "Please fill in the required fields (Name & Review).",
    
    // Contact Section
    contactBadge: "Tell Us Your Idea",
    contactTitle: "Start Your Digital Transformation Today",
    contactSubtitle: "Fill out the form to receive a formal design proposal along with a completely free speed analysis of your competitors.",
    formContactLabelName: "Full Name *",
    formContactPlaceholderName: "e.g. Sophia Rodriguez",
    formContactLabelEmail: "Email Address *",
    formContactPlaceholderEmail: "e.g. sophia@company.com",
    formContactLabelPhone: "Cell Phone / WhatsApp Number (Optional)",
    formContactPlaceholderPhone: "e.g. +34 600 000 000",
    formContactLabelService: "Service you are interested in",
    formContactOptionCustomPack: "Custom Bundle Pack",
    formContactLabelDescription: "Tell us about your business and your website concept...",
    formContactPlaceholderDescription: "e.g. I want to launch a website for my brand with online booking, I want it to load fast and be fully indexed on Google...",
    formContactLabelBudget: "Propose an Estimated Budget",
    formContactBudgetSelectPlaceholder: "Medium ($500 - $900)",
    btnContactSubmit: "Send Request for Quote",
    contactSuccessTitle: "Form Received Successfully! 🚀",
    contactSuccessText: "Thank you very much, your details have been logged in our system. A consulting designer will review your concept and prepare a complimentary design mockup. We will reach out within 24 hours via email or WhatsApp.",
    contactSuccessBtnBack: "Submit Another Request",
    contactCardPhone: "Call or write to us directly",
    contactCardEmail: "Send us an email",
    contactCardOffice: "Creative Headquarters Office",
    contactCardPrivacy: "Your data is stored securely. We never distribute spam.",
    
    // Chatbot UI Text (General)
    chatInputPlaceholder: "Ask about our high-speed designs...",
    chatIntroTitle: "AI Assistant",
    chatStatusOnline: "Online",
    chatFaqTitle: "Quick Frequent Questions:",
    chatFaqEstimate: "How much does a website cost?",
    chatFaqLanding: "What does a landing page include?",
    chatFaqSEO: "What is basic SEO?",
    chatFaqBranding: "Do you design logos and brand kits?",
    chatOfflineError: "Sincere apologies, I'm experiencing a brief connectivity glitch with my brain. Please send us a direct message on WhatsApp for immediate support.",
    
    // General
    loading: "Loading...",
    footerRights: "All rights reserved. Designed with high-performance passion."
  }
};

// --- DATA TRANSLATIONS ---

export const SERVICES_DATA_TRANSLATED: Record<"es" | "en", ServiceItem[]> = {
  es: [
    {
      id: "diseno-web",
      title: "Diseño Web Profesional",
      description: "Sitios corporativos a medida, modernos y rápidos. El escaparate digital perfecto para proyectar confianza, autoridad y captar clientes potenciales.",
      price: "Desde $500",
      iconName: "Laptop",
      features: [
        "Diseño responsive (móvil, tablet, PC)",
        "Optimización de velocidad de carga",
        "Estructura adaptable y escalable",
        "SEO Básico integrado de cortesía",
        "Formulario de contacto y contacto de WhatsApp"
      ],
      badge: "Más Demandado",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "landing-page",
      title: "Landing Pages",
      description: "Páginas de aterrizaje optimizadas al 100% para captación directa o lanzamientos de campañas. Estructuradas para guiar la decisión de tus clientes.",
      price: "Desde $250",
      iconName: "Rocket",
      features: [
        "Diseño de una sola página de alto impacto",
        "Redacción persuasiva (Copywriting enfocado)",
        "Llamadas a la acción (CTAs) estratégicas",
        "Integración de formularios y píxel de Facebook",
        "Entrega rápida en un plazo menor a 7 días"
      ],
      badge: "Conversión Líder",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "rediseno-web",
      title: "Rediseño Web",
      description: "Renueva tu web lenta, vieja o desactualizada. Modernizamos su estructura, mejoramos la experiencia de usuario y multiplicamos tus tasas de conversión.",
      price: "Desde $400",
      iconName: "RefreshCw",
      features: [
        "Revisión completa de arquitectura de la información",
        "Mejora radical de la velocidad y rendimiento",
        "UI/UX simplificada e interactiva",
        "Conservación de enlaces y posicionamiento previo",
        "Adaptación del contenido a la marca móvil actual"
      ],
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "seo-basico",
      title: "SEO Básico",
      description: "Optimización web técnica necesaria para posicionar en Google. Garantiza que tu negocio pueda ser encontrado por personas interesadas.",
      price: "Desde $150",
      iconName: "Search",
      features: [
        "Estudio inicial y selección de palabras clave clave",
        "Optimización de títulos, meta-etiquetas y jerarquías Alt",
        "Generación de sitemap.xml y robots.txt",
        "Indexación e integración de Google Search Console",
        "Sugerencias estratégicas de contenidos futuros"
      ],
      badge: "Crecimiento Orgánico",
      color: "from-violet-500 to-purple-600"
    },
    {
      id: "branding-digital",
      title: "Branding Digital",
      description: "Desarrollo completo de la identidad visual de tu marca adaptada al ecosistema web. Forja una imagen coherente, memorable y duradera.",
      price: "Desde $300",
      iconName: "Palette",
      features: [
        "Diseño de logotipo profesional (versiones web/print)",
        "Definición de paleta de colores corporativos",
        "Manual básico de tipografías y uso de marca",
        "Diseño de cabeceras para redes sociales",
        "Guía de estilo visual para assets digitales"
      ],
      color: "from-rose-500 to-pink-600"
    },
    {
      id: "mantenimiento-web",
      title: "Mantenimiento Web",
      description: "Soporte constante y auditorías de seguridad periódicas. Deja en nuestras manos las actualizaciones para que tú solo te enfoques en tu negocio.",
      price: "Desde $50/mes",
      iconName: "ShieldCheck",
      features: [
        "Copias de seguridad semanales alojadas en nube",
        "Actualización monitorizada de plugins, temas y core",
        "Resolución y parches rápidos de seguridad",
        "Soporte prioritario por chat para pequeños cambios",
        "Informes mensuales sencillos de rendimiento"
      ],
      color: "from-cyan-500 to-teal-600"
    }
  ],
  en: [
    {
      id: "diseno-web",
      title: "Professional Web Design",
      description: "Custom corporate websites, modern and lightweight. The perfect digital space to project confidence, authority, and capture prospective leads.",
      price: "From $500",
      iconName: "Laptop",
      features: [
        "Responsive design (mobile, tablet, desktop)",
        "Ultra-speed loading optimization",
        "Adaptable and scalable site code",
        "Complimentary basic SEO configuration",
        "Contact form and direct WhatsApp integration"
      ],
      badge: "Most Popular",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "landing-page",
      title: "Landing Pages",
      description: "Web landing pages optimized 100% for conversion and campaign funnels. Built precisely to guide your client's purchasing choices.",
      price: "From $250",
      iconName: "Rocket",
      features: [
        "Single-page design optimized for high visual impact",
        "Persuasive copywriting and content hooks",
        "Strategically aligned Call-to-Actions (CTAs)",
        "Form integration and Meta-Pixel tracking installation",
        "Rapid production delivered within 7 business days"
      ],
      badge: "Conversion King",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "rediseno-web",
      title: "Website Redesign",
      description: "Refresh a slow, aging, or outdated website. We modernize the structural framework, elevate user experience, and lift your conversion rates.",
      price: "From $400",
      iconName: "RefreshCw",
      features: [
        "Complete information architecture review",
        "Radical speed and structural performance upgrade",
        "Simplified and interactive, beautiful modern UI/UX",
        "Preservation of prior backlinks and search engine rankings",
        "Adaptation of contents to modern client branding"
      ],
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "seo-basico",
      title: "Basic SEO",
      description: "Fundamental organic search optimization to rank on Google. Ensures interested prospects can easily discover your business.",
      price: "From $150",
      iconName: "Search",
      features: [
        "Initial search keywords study and targeting",
        "HTML tag optimization, headers, and Alt layout tuning",
        "Dynamic sitemap.xml and robots.txt generation",
        "Instant index indexing with Google Search Console setup",
        "Strategic advice on long-term organic content"
      ],
      badge: "Organic Growth",
      color: "from-violet-500 to-purple-600"
    },
    {
      id: "branding-digital",
      title: "Digital Branding",
      description: "Full design of your brand's digital identity customized for web application systems. Forge a unified, memorable image.",
      price: "From $300",
      iconName: "Palette",
      features: [
        "Professional logo layout (vector assets formatted for print/SVG)",
        "Custom, high-contrast palette definition",
        "Basic manual for typography, contrast, and branding rules",
        "Social media headers and visual media banners",
        "Design assets layout reference style guide"
      ],
      color: "from-rose-500 to-pink-600"
    },
    {
      id: "mantenimiento-web",
      title: "Web Maintenance",
      description: "Consistent support and safety auditing. Let us maintain stability so you can concentrate exclusively on scaling your operations.",
      price: "From $50/mo",
      iconName: "ShieldCheck",
      features: [
        "Complimentary weekly cloud backups of your full codebase",
        "Monitored plugin, design theme, and package updates",
        "Rapid resolution of safety reports and firewalls",
        "Priority chat support for simple visual design tweaks",
        "Monthly simple load performance analytics emails"
      ],
      color: "from-cyan-500 to-teal-600"
    }
  ]
};

export const PORTFOLIO_DATA_TRANSLATED: Record<"es" | "en", ProjectItem[]> = {
  es: [
    {
      id: "port-5",
      title: "Sabor & Brasa - Restaurante Gourmet",
      category: "Diseño Web Profesional",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      description: "Sitio táctil e interactivo para restaurante de alta cocina con sistema de reserva de mesas online en tiempo real, menú digital interactivo QR y galerías fotográficas optimizadas de alta resolución.",
      badge: "Reservas Digitales",
      tags: ["Menú QR", "Reserva Online", "Gourmet Design"]
    },
    {
      id: "port-6",
      title: "Clínica Médica Integral Sanasur",
      category: "Diseño Web Profesional + Sistema de Citas",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      description: "Plataforma web médica corporativa. Permite agendamiento automatizado de citas de telemedicina o presenciales, directorio interactivo de especialistas y portal informativo seguro para pacientes.",
      badge: "Gestión Sanitaria",
      tags: ["Portal Pacientes", "Citas Médicas", "Filtro Especialidades"]
    },
    {
      id: "port-7",
      title: "RentDrive - Alquiler de Vehículos",
      category: "Herramienta Web Avanzada",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
      description: "Aplicación de autoservicio de alquiler de vehículos turísticos e institucionales, con cálculo dinámico de tarifas por días de uso, pasarela de apartado y reserva garantizada en línea.",
      badge: "Flota Protegida",
      tags: ["Buscador de Flota", "Reserva de Autos", "Reserva Online"]
    },
    {
      id: "port-2",
      title: "Plataforma Consultoría Legal",
      category: "Diseño Web Profesional",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      description: "Portal profesional para bufete corporativo. Incluye sistema dinámico de reserva de consultas e integración con Google Calendar.",
      tags: ["Custom Design", "SEO Técnico", "Reservas"]
    },
    {
      id: "port-3",
      title: "Landing Lanzamiento Nutrición",
      category: "Landing Pages",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
      description: "Landing page corporativa de altísima conversión para un nuevo programa de coaching nutricional, con tasa de registro del 28%.",
      badge: "28% Conversión",
      tags: ["Landing Pro", "Copywriting", "Mailchimp"]
    },
    {
      id: "port-4",
      title: "Rediseño Portal Inmobiliario",
      category: "Rediseño Web + SEO",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      description: "Rediseño integral de interfaz lenta a una moderna experiencia mobile-first, acelerando la carga un 150% y subiendo posiciones en SEO.",
      tags: ["UI/UX", "Mobile-First", "Velocidad"]
    }
  ],
  en: [
    {
      id: "port-5",
      title: "Sabor & Brasa - Gourmet Restaurant",
      category: "Professional Web Design",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      description: "Responsive highly immersive portal for fine dining restaurant featuring an online real-time table reservation module, custom QR menu layouts, and fast loading visual galleries.",
      badge: "Digital Bookings",
      tags: ["QR Menu", "Online Booking", "Gourmet Design"]
    },
    {
      id: "port-6",
      title: "Sanasur Comprehensive Health Center",
      category: "Web Design + Booking System",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      description: "Healthcare platform for teleconsultations and live scheduling, featuring secure specialist lookups, medical team bio boards, and an educational medical knowledge base.",
      badge: "Health Logistics",
      tags: ["Patient Portal", "Appoinments", "Specialist Lookup"]
    },
    {
      id: "port-7",
      title: "RentDrive - Premium Vehicle Rentals",
      category: "Advanced Web Application",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
      description: "Self-service car booking tool featuring responsive calendars for rental pick-ups, dynamic multi-day budget calculators, secure deposits gateway, and checkout confirmation.",
      badge: "Protected Fleet",
      tags: ["Fleet Search", "Car Reservations", "Online Rental"]
    },
    {
      id: "port-2",
      title: "Legal Advisory Firm Portal",
      category: "Professional Web Design",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      description: "Sleek, high-authority platform built for premium corporate law firms. Features automatic meeting schedules synced directly with Google Calendar.",
      tags: ["Custom Design", "Technical SEO", "Schedules"]
    },
    {
      id: "port-3",
      title: "Nutritional Challenge Campaign",
      category: "Landing Pages",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
      description: "Lead generation, single-page landing built with high-conversion tactics. Reached an audited user signup rate of 28% for a key coaching event.",
      badge: "28% Conversion",
      tags: ["Landing Pro", "Copywriting", "Mailchimp"]
    },
    {
      id: "port-4",
      title: "Real Estate System Redesign",
      category: "Redesign + SEO",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      description: "Full modernization of an outdated, sluggish web property. Boosted mobile render times by 150% and yielded stable gains in search classifications.",
      tags: ["UI/UX", "Mobile-First", "High Performance"]
    }
  ]
};

export const TESTIMONIALS_DATA_TRANSLATED: Record<"es" | "en", TestimonialItem[]> = {
  es: [
    {
      id: "test-1",
      name: "Alba Jiménez",
      company: "EcoBelleza",
      role: "Fundadora",
      text: "Trabajar con ellos para nuestra web corporativa fue un antes y un después. No solo captaron la esencia estética de nuestra marca, sino que la velocidad del sitio y el formulario de agendamiento nos ha permitido duplicar consultas en tres meses.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: "test-2",
      name: "Juan Manuel Ortiz",
      company: "Ortiz Legal AS",
      role: "Socio Director",
      text: "El servicio de diseño web profesional superó mis expectativas. Buscábamos algo sobrio, moderno y veloz. Además, gracias al SEO básico que nos integraron, ya estamos recibiendo llamadas directamente desde las búsquedas de Google.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: "test-3",
      name: "Marta Valenzuela",
      company: "FitLife Academy",
      role: "Co-fundadora",
      text: "Necesitábamos una Landing Page rápida para promocionar nuestro reto online. El equipo nos la entregó en 5 días y la conversión ha sido excelente. El chatbot que nos implementaron nos ahorra horas de atención previa.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      rating: 5
    }
  ],
  en: [
    {
      id: "test-1",
      name: "Alba Jimenez",
      company: "EcoBelleza",
      role: "Founder",
      text: "Working with them on our new company portal was a game changer. They adapted perfectly to our aesthetics, and the custom appointment configuration has driven a 2x increase in client consults in just 90 days.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: "test-2",
      name: "Juan Manuel Ortiz",
      company: "Ortiz Legal AS",
      role: "Managing Partner",
      text: "Their web design expertise completely surpassed my standards. We aimed for an elegant, lightning-fast design, and backed by the custom SEO strategies they supplied, we are actively collecting direct calls via Google.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5
    },
    {
      id: "test-3",
      name: "Marta Valenzuela",
      company: "FitLife Academy",
      role: "Co-founder",
      text: "We needed an express promotional landing to market an upcoming challenge. They deployed the completed link in just 5 working days with prime conversion. The interactive bot saves us dozens of triage hours.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      rating: 5
    }
  ]
};
