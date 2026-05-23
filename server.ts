import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Simple in-memory storage for contact leads
interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  projectDescription: string;
  budget?: string;
  source: "form" | "chatbot";
  date: string;
}

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  text: string;
  image: string;
  rating: number;
  date: string;
}

const leads: Lead[] = [
  {
    id: "lead-1",
    name: "Sofía Rodríguez",
    email: "sofia.rod@example.com",
    phone: "+34 612 345 678",
    service: "Diseño Web Profesional",
    projectDescription: "Buscamos crear un sitio web profesional para un restaurante de alta cocina con reserva de mesas y menú digital.",
    budget: "$500 - $800",
    source: "form",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "lead-2",
    name: "Carlos Gómez",
    email: "carlos@gomezconsulting.es",
    phone: "+34 699 888 777",
    service: "Landing Pages",
    projectDescription: "Necesito una landing page súper optimizada y rápida para lanzar mi producto saas el próximo mes.",
    budget: "Básico ($250)",
    source: "chatbot",
    date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  }
];

const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Alba Jiménez",
    company: "EcoBelleza",
    role: "Fundadora",
    text: "Trabajar con ellos para nuestra web corporativa fue un antes y un después. No solo captaron la esencia estética de nuestra marca, sino que la velocidad del sitio y el formulario de agendamiento nos ha permitido duplicar consultas en tres meses.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "test-2",
    name: "Juan Manuel Ortiz",
    company: "Ortiz Legal AS",
    role: "Socio Director",
    text: "El servicio de diseño web profesional superó mis expectativas. Buscábamos algo sobrio, moderno y veloz. Además, gracias al SEO básico que nos integraron, ya estamos recibiendo llamadas directamente desde las búsquedas de Google.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "test-3",
    name: "Marta Valenzuela",
    company: "FitLife Academy",
    role: "Co-fundadora",
    text: "Necesitábamos una Landing Page rápida para promocionar nuestro reto online. El equipo nos la entregó en 5 días y la conversión ha sido excelente. El chatbot que nos implementaron nos ahorra horas de atención previa.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API ROUTES ---

  // Get all leads (useful for testing and showing how leads are captured)
  app.get("/api/leads", (req, res) => {
    res.json(leads);
  });

  // Get all testimonials
  app.get("/api/testimonials", (req, res) => {
    res.json(testimonials);
  });

  // Submit a new testimonial
  app.post("/api/testimonials", (req, res) => {
    const { name, company, role, text, rating, image } = req.body;

    if (!name || !text || !rating) {
      return res.status(400).json({ error: "Faltan campos obligatorios (nombre, reseña y puntuación estrella)." });
    }

    const defaultImages = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    ];

    const randomDefault = defaultImages[Math.floor(Math.random() * defaultImages.length)];

    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      name,
      company: company || "",
      role: role || "Cliente Satisfecho",
      text,
      image: image || randomDefault,
      rating: Number(rating) || 5,
      date: new Date().toISOString(),
    };

    testimonials.unshift(newTestimonial); // Add to beginning
    res.status(201).json({ success: true, testimonial: newTestimonial });
  });

  // Submit a new lead
  app.post("/api/leads", (req, res) => {
    const { name, email, phone, service, projectDescription, budget, source } = req.body;
    
    if (!name || !email || !service || !projectDescription) {
      return res.status(400).json({ error: "Faltan campos obligatorios (nombre, email, servicio, descripción)." });
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name,
      email,
      phone: phone || "",
      service,
      projectDescription,
      budget: budget || "No especificado",
      source: source || "form",
      date: new Date().toISOString(),
    };

    leads.push(newLead);
    res.status(201).json({ success: true, lead: newLead });
  });

  // Chatbot endpoint with lazy Gemini client initialization
  app.post("/api/chat", async (req, res) => {
    const { message, history, lang } = req.body;
    const isEn = lang === "en";

    if (!message) {
      return res.status(400).json({ error: isEn ? "Message is required." : "El mensaje es requerido." });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Graceful fallback if no Gemini API Key is configured
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      console.warn("GEMINI_API_KEY is missing. Using high-quality offline agent response simulation.");
      
      // Simulate highly specific responses based on message keywords
      const msgLower = message.toLowerCase();
      let simulatedReply = "";

      if (isEn) {
        if (msgLower.includes("price") || msgLower.includes("cost") || msgLower.includes("how much") || msgLower.includes("budget") || msgLower.includes("quote")) {
          simulatedReply = "Hi! At **Estudio Creativo Web** we have standard rates tailored to each project scale. Here is a reference:\n\n" +
            "• **Landing Page**: From $250 - Ideal for rapid campaign leads.\n" +
            "• **Professional Web Design**: From $500 - Complete corporate business portals.\n" +
            "• **Web Redesign**: From $400 - We fully modernize your current look.\n\n" +
            "Plus, all our design projects include complimentary **Basic SEO** setup. Do you have a specific concept in mind you'd like to discuss?";
        } else if (msgLower.includes("landing") || msgLower.includes("landing page") || msgLower.includes("landings")) {
          simulatedReply = "Our **Landing Pages** are engineered with a single goal in mind: **converting visitors into registered customers**. We include custom responsive styling, ultra-fast load times, persuasive copywriting, and direct form connections. We build them starting at $250. Would you write us further specs to prepare a quote?";
        } else if (msgLower.includes("seo") || msgLower.includes("rank") || msgLower.includes("google") || msgLower.includes("search")) {
          simulatedReply = "Basic Organic Optimization (**Basic SEO**) is critical. We audit loading speeds, build clean meta tag hierarchies, generate sitemaps, and hook up Google Search Console to guarantee fast indexing. This comes included at $0 inside all our business redesign packages. Ready to gain organical visibility?";
        } else if (msgLower.includes("branding") || msgLower.includes("logo") || msgLower.includes("brand") || msgLower.includes("design")) {
          simulatedReply = "Our **Digital Branding** pack designs a cohesive aesthetic identity: custom vector logos, clean style palettes, pairing guides, and digital visual assets ready for websites or social channels starting from $300. Do you already have a logo, or would we map one from scratch?";
        } else if (msgLower.includes("hello") || msgLower.includes("hi") || msgLower.includes("hey")) {
          simulatedReply = "Hello! Welcome to **Estudio Creativo Web** 🚀. I am your custom virtual assistant. I can guide you through our professional solutions:\n\n" +
            "1. **Professional Web Design** 🖥️\n" +
            "2. **Conversion Landing Pages** 📈\n" +
            "3. **Web Redesigns** 🔄\n" +
            "4. **Basic SEO** 🔍\n" +
            "5. **Digital Branding** 🎨\n" +
            "6. **Web Maintenance Support** 🛠️\n\n" +
            "Which of these fits your immediate commercial needs? Let me know, or submit your email to request a free 15-minute consult.";
        } else {
          simulatedReply = "Excellent question! At **Estudio Creativo Web** we build robust web and design frameworks custom-fitted to boost your sales. We supply custom designs, lightning pages, search indexing, and continuous support.\n\nCould you describe what you're working on? I'll recommend the ideal package, or collect your email to book a free call.";
        }
      } else {
        if (msgLower.includes("precio") || msgLower.includes("cuanto cuesta") || msgLower.includes("costo") || msgLower.includes("presupuesto") || msgLower.includes("gasto")) {
          simulatedReply = "¡Hola! En **Estudio Creativo Web** tenemos tarifas adaptadas para cada nivel de proyecto. Aquí tienes una referencia:\n\n" +
            "• **Landing Page**: Desde $250 - Ideal para captar leads rápidos.\n" +
            "• **Diseño Web Profesional**: Desde $500 - Sitios web completos para empresas.\n" +
            "• **Rediseño Web**: Desde $400 - Modernizamos tu web actual.\n\n" +
            "Además, todos nuestros proyectos de diseño incluyen **SEO Básico** de cortesía. ¿Tienes en mente algún proyecto en particular sobre el que te gustaría conversar?";
        } else if (msgLower.includes("landing") || msgLower.includes("landing page") || msgLower.includes("landings")) {
          simulatedReply = "Nuestras **Landing Pages** están diseñadas con un solo objetivo en mente: **convertir visitantes en clientes**. Incluimos un diseño responsivo adaptado a móviles, velocidad de carga ultrarrápida, textos persuasivos (copywriting) e integración directa con tu CRM o correo. Las realizamos desde $250. ¿Te gustaría cotizar una?";
        } else if (msgLower.includes("seo") || msgLower.includes("posiciona") || msgLower.includes("google") || msgLower.includes("buscar")) {
          simulatedReply = "La optimización en buscadores (**SEO Básico**) es fundamental. Realizamos optimización técnica del sitio, velocidad de carga, optimización de meta-etiquetas y registro en Google Search Console para asegurar su indexación correcta. Esto viene incorporado en todos nuestros desarrollos corporativos. ¿Quieres que tu negocio aparezca en los primeros puestos?";
        } else if (msgLower.includes("branding") || msgLower.includes("diseno grafico") || msgLower.includes("logo") || msgLower.includes("marca")) {
          simulatedReply = "El **Branding Digital** define cómo te perciben tus clientes. Diseñamos logotipos limpios y modernos, seleccionamos tu paleta de colores corporativa y tipografías, y te entregamos un manual de marca digital para que mantengas consistencia en tus redes sociales y web. Está disponible desde $300. ¿Ya cuentas con un logo o empezaríamos desde cero?";
        } else if (msgLower.includes("hola") || msgLower.includes("buenas") || msgLower.includes("saludos") || msgLower.includes("buen dia")) {
          simulatedReply = "¡Hola! Bienvenido/a a **Estudio Creativo Web** 🚀. Soy tu asistente virtual inteligente. Te puedo ayudar con información sobre nuestros servicios:\n\n" +
            "1. **Diseño Web Profesional** 🖥️\n" +
            "2. **Landing Pages de Conversión** 📈\n" +
            "3. **Rediseño Web** 🔄\n" +
            "4. **SEO Básico** 🔍\n" +
            "5. **Branding Digital** 🎨\n" +
            "6. **Mantenimiento Web Continuo** 🛠️\n\n" +
            "¿Sobre cuál de estos temas te gustaría recibir asesoramiento o una cotización aproximada? También puedes dejar tus datos para que uno de nuestros diseñadores te contacte.";
        } else {
          simulatedReply = "Excelente pregunta. En **Estudio Creativo Web** creamos soluciones web a medida enfocadas en aumentar los clientes de tu negocio. Ofrecemos diseño web profesional, landing pages, SEO básico, branding y mantenimiento técnico mensual.\n\n¿Por qué no me describes brevemente lo que necesitas y te asesoro sobre la mejor opción para tu negocio? O si lo prefieres, dame tu nombre y correo para agendar una llamada de cortesía de 15 minutos.";
        }
      }

      // Stagger responses to simulate typing
      await new Promise((resolve) => setTimeout(resolve, 800));
      return res.json({ response: simulatedReply, note: `Simulated response in offline mode (lang: ${isEn ? "en" : "es"}).` });
    }

    try {
      // Lazy initialization of Gemini SDK
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // System instruction explaining the agency business, details, pricing, services and guiding lead capture
      const systemInstruction = isEn ?
        `You are the Intelligent Virtual Assistant of "Estudio Creativo Web", a leading web development and design agency specializing in bespoke web design, landing pages, website redesigns, basic SEO, branding, and technical maintenance. Your main objective is to assist users query services and naturally gather leads.
\nDetails of our services to promote in English:
1. **Professional Web Design**: Customized corporate sites, elegant responsive structure, superior speeds. Rates starting from $500.
2. **Landing Pages**: Custom lead capture design optimized for sales conversion campaigns. Rates starting from $250.
3. **Website Redesign**: Interface modernization, UI/UX audits, radical speed boosts. Rates starting from $400.
4. **Basic SEO**: Speed checks, sitemaps, indexing with Google Search Console. Included completely of charge inside corporate web design, or $150 separate.
5. **Digital Branding**: Corporate logo vector layouts, paired fonts, tailored brand books. Rates starting from $300.
6. **Web Maintenance Support**: Priority chats, cloud backups, security updates. Starting at $50/mo.
\nYour behavioral instructions:
- Answer in simple, crisp ENGLISH. Use list bullet-points and clean markdown bold text highlights.
- Keep the tone polite, consultative, sales-oriented, and warmly welcoming.
- Naturally ask for Name and Email if they show any project intent, informing them a designer will follow up within 24 hours with a free speed score of their competition.` :
        `Eres el Asistente Virtual Inteligente de "Estudio Creativo Web", una agencia líder en desarrollo y diseño web profesional, landing pages, rediseño web, SEO básico, branding digital y mantenimiento web. Tu objetivo principal es ayudar a los visitantes a entender y elegir nuestros servicios para así atraer más clientes.

Aquí tienes los detalles de nuestros servicios que debes promover con entusiasmo y conocimiento técnico-comercial:
1. **Diseño Web Profesional**: Sitios corporativos modernos, responsivos y súper veloces. Ideal para empresas que quieren proyectar confianza. Precio inicial: desde $500.
2. **Landing Pages**: Páginas orientadas 100% a la conversión de leads o ventas para campañas específicas. Precio inicial: desde $250.
3. **Rediseño Web**: Renovación visual y de experiencia de usuario (UI/UX) para sitios lentos o desactualizados. Precio inicial: desde $400.
4. **SEO Básico**: Optimización de meta-etiquetas, velocidad de carga web, estructura semántica de contenidos y registro en Google Search Console para aparecer en búsquedas. Viene INCLUIDO gratis en proyectos de Diseño Web, o solo por $150 independiente.
5. **Branding Digital**: Creación de identidad de marca, logotipos, paleta de colores y tipografías listas para web y redes sociales. Precio inicial: desde $300.
6. **Mantenimiento Web**: Soporte mensual técnico, copias de seguridad semanales, actualizaciones de plugins/seguridad y pequeños retoques de diseño. Precio inicial: desde $50 al mes.

**Tus pautas de comportamiento:**
- Mantén un tono sumamente amable, profesional, cercano, vendedor y proactivo.
- Responde siempre de forma estructurada usando viñetas y formato Markdown limpio.
- Cuando discutas costos, ofrece rangos estimativos informándole al usuario que los presupuestos finales se adaptan a su necesidad exacta.
- Intenta captar leads de forma natural. Si el usuario muestra interés, pregúntale de forma amigable su Nombre, Email y qué servicio le interesa, indicándole que guardaremos sus datos para que un agente humano lo contacte y le brinde una consultoría gratuita de 15 minutos.
- Si el usuario dice que desea registrarse, cotizar, o te da sus datos directamente, infórmale con alegría que has registrado su solicitud correctamente.`;

      // Build chat logic with custom formatting
      // Map history to contents
      const formattedContents: any[] = [];
      const safeHistory = Array.isArray(history) ? history : [];
      
      for (const msg of safeHistory) {
        formattedContents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      }
      
      // Append newest user message
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "Lo siento, ha ocurrido un error al procesar tu solicitud. ¿Podrías volver a intentarlo?";
      res.json({ response: replyText });

    } catch (err: any) {
      console.error("Gemini API Error in /api/chat:", err);
      res.status(500).json({ error: "No se pudo comunicar con el asistente virtual", details: err.message });
    }
  });

  // --- VITE MIDDLEWARE SETUP ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
