import { ServiceItem, ProjectItem, TestimonialItem } from "./types";

export const SERVICES_DATA: ServiceItem[] = [
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
];

export const PORTFOLIO_DATA: ProjectItem[] = [
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
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
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
    role: "Co-founder",
    text: "Necesitábamos una Landing Page rápida para promocionar nuestro reto online. El equipo nos la entregó en 5 días y la conversión ha sido excelente. El chatbot que nos implementaron nos ahorra horas de atención previa.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    rating: 5
  }
];

export const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/34600000000?text=Hola,%20vi%20su%20web%20y%20me%20gustaria%20cotizar%20un%20sitio%20web.",
  instagram: "https://instagram.com/estudiocreativoweb",
  linkedin: "https://linkedin.com/company/estudiocreativoweb",
  facebook: "https://facebook.com/estudiocreativoweb",
  twitter: "https://twitter.com/escreativoweb",
  email: "contacto@estudiocreativoweb.com"
};

export const ESTIMATOR_PRICE_MAP: Record<string, number> = {
  "diseno-web": 500,
  "landing-page": 250,
  "rediseno-web": 400,
  "seo-basico": 150,
  "branding-digital": 300,
  "mantenimiento-web": 50
};
