import React, { useState, useEffect } from "react";
import { 
  Laptop, Rocket, ShoppingCart, RefreshCw, Search, Palette, ShieldCheck,
  Mail, Phone, MapPin, CheckCircle2, MessageSquare, Menu, X, 
  ArrowRight, Star, ExternalLink, Send, Sparkles, AlertCircle, 
  Linkedin, Instagram, Facebook, Share2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES_DATA, PORTFOLIO_DATA, TESTIMONIALS_DATA, SOCIAL_LINKS } from "./data";
import { LeadResponse, LeadSubmission } from "./types";
import ServiceCard from "./components/ServiceCard";
import ProjectEstimator from "./components/ProjectEstimator";
import ChatBot from "./components/ChatBot";

const AVATAR_OPTIONS = [
  { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", name: "Femenino Ejecutivo" },
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", name: "Masculino Directivo" },
  { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", name: "Femenino Dinámico" },
  { url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", name: "Masculino Tecnológico" },
  { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80", name: "Femenino Directora" },
  { url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80", name: "Masculino Emprendedor" }
];

export default function App() {
  // Navigation & Theme controls
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("inicio");

  // Leads & Contact state
  const [leads, setLeads] = useState<LeadResponse[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>(TESTIMONIALS_DATA);
  const [contactForm, setContactForm] = useState<LeadSubmission>({
    name: "",
    email: "",
    phone: "",
    service: "Diseño Web Profesional",
    projectDescription: "",
    budget: "Mediano ($500 - $900)",
    source: "form",
  });
  
  // Testimonial submission form state
  const [testFormOpen, setTestFormOpen] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);
  const [testError, setTestError] = useState("");
  const [submittingTestimonial, setSubmittingTestimonial] = useState(false);
  const [testForm, setTestForm] = useState({
    name: "",
    company: "",
    role: "Cliente Satisfecho",
    text: "",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newLeadNotification, setNewLeadNotification] = useState<string | null>(null);

  // Fetch initial leads from database for live feed
  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("No se pudieron cargar los leads para el feed en vivo:", err);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (err) {
      console.error("No se pudieron cargar los testimonios:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchTestimonials();
    // Poll for new leads every 30 seconds to simulate a live active agency ecosystem
    const interval = setInterval(() => {
      fetchLeads();
      fetchTestimonials();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testForm.name.trim() || !testForm.text.trim()) {
      setTestError("Por favor, rellena los campos obligatorios (Nombre y Reseña).");
      return;
    }

    setSubmittingTestimonial(true);
    setTestError("");

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testForm),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Algo salió mal.");
      }

      setTestSuccess(true);
      setTestForm({
        name: "",
        company: "",
        role: "Cliente Satisfecho",
        text: "",
        rating: 5,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
      });
      
      fetchTestimonials();
      setNewLeadNotification("¡Gracias por tu testimonio! Se ha publicado de inmediato.");
      setTimeout(() => setNewLeadNotification(null), 4000);
      
      setTimeout(() => {
        setTestSuccess(false);
        setTestFormOpen(false);
      }, 3000);

    } catch (err: any) {
      setTestError(err.message || "Error al enviar.");
    } finally {
      setSubmittingTestimonial(false);
    }
  };

  // Handler for Service select buttons (cotizar)
  const handleServiceQuote = (serviceTitle: string) => {
    setContactForm((prev) => ({
      ...prev,
      service: serviceTitle,
      projectDescription: `Hola Estudio Creativo, me interesa solicitar información detallada y una cotización personalizada para el servicio de: **${serviceTitle}**.\n\nDescripción breve de mi negocio: `,
    }));

    // Smooth scroll to contact form section
    const contactSection = document.getElementById("contactform-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Trigger a brief alert/toast effect
    setNewLeadNotification(`Formulario configurado para: ${serviceTitle}`);
    setTimeout(() => setNewLeadNotification(null), 4000);
  };

  // Handler for Estimator exports
  const handleEstimateApply = (selections: string[], textSummary: string, total: number) => {
    setContactForm((prev) => ({
      ...prev,
      service: selections[0] || "Pack de Servicios",
      projectDescription: textSummary,
      budget: `Personalizado ($${total})`,
    }));

    const contactSection = document.getElementById("contactform-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setNewLeadNotification(`Presupuesto de $${total} importado con éxito.`);
    setTimeout(() => setNewLeadNotification(null), 4000);
  };

  // ChatBot pre-fill handler
  const handleChatBotPreFill = (serviceTitle: string, details: string) => {
    setContactForm((prev) => ({
      ...prev,
      service: serviceTitle,
      projectDescription: details,
    }));
    
    // Direct alert to focus
    setNewLeadNotification(`¡Datos copiados del Chatbot! Completa tu nombre y correo.`);
    setTimeout(() => setNewLeadNotification(null), 5000);
  };

  // Form Submission
  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.projectDescription.trim()) {
      setErrorMessage("Por favor, rellena todos los campos obligatorios (nombre, correo y descripción).");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Ocurrió un error inesperado al enviar.");
      }

      setSubmitSuccess(true);
      // Reset main fields
      setContactForm({
        name: "",
        email: "",
        phone: "",
        service: "Diseño Web Profesional",
        projectDescription: "",
        budget: "Mediano ($500 - $900)",
        source: "form",
      });
      
      // Refresh lead list
      fetchLeads();

    } catch (err: any) {
      setErrorMessage(err.message || "No se pudo conectar con el servidor. Reintente en un momento.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col selection:bg-indigo-600 selection:text-white antialiased">
      
      {/* Top Banner / Pulse Alert */}
      <AnimatePresence>
        {newLeadNotification && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-indigo-600 text-white text-xs md:text-sm font-semibold px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-indigo-400"
          >
            <Sparkles size={16} className="text-amber-300 animate-spin" />
            <span>{newLeadNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 lg:px-12 h-20 flex items-center justify-between transition-all shadow-sm">
        <div className="flex items-center gap-3">
          {/* Logo Geometry from Theme */}
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="w-4 h-4 border-2 border-white rotate-45 flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
              Estudio Creativo
            </span>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-600 mt-1">
              Desarrollo de Alto Impacto
            </span>
          </div>
        </div>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <a href="#hero" className="hover:text-indigo-600 transition-colors">Inicio</a>
          <a href="#servicios" className="hover:text-indigo-600 transition-colors">Servicios</a>
          <a href="#estimador" className="hover:text-indigo-600 transition-colors">Calculadora ⚡</a>
          <a href="#proyectos" className="hover:text-indigo-600 transition-colors">Portafolio</a>
          <a href="#opiniones" className="hover:text-indigo-600 transition-colors">Testimonios</a>
          <a href="#contacto" className="text-indigo-600 hover:text-indigo-800 transition-colors font-semibold">Contacto</a>
        </nav>

        {/* Social interactions in Header */}
        <div className="hidden lg:flex items-center gap-4 text-slate-400">
          <a 
            href={SOCIAL_LINKS.instagram} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-indigo-600 transition-colors p-1"
            title="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a 
            href={SOCIAL_LINKS.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-indigo-600 transition-colors p-1"
            title="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a 
            href={SOCIAL_LINKS.whatsapp} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-indigo-600 transition-colors p-1"
            title="WhatsApp Agencias"
          >
            <MessageSquare size={18} />
          </a>

          <a 
            href="#contacto"
            className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold text-xs px-5 py-2.5 rounded-full shadow-md shadow-indigo-200 transition-all cursor-pointer"
          >
            Consulta Gratis
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden px-6 py-4 space-y-3 z-30"
          >
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-700 hover:text-indigo-600 font-medium">Inicio</a>
            <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-700 hover:text-indigo-600 font-medium">Servicios</a>
            <a href="#estimador" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-indigo-650 font-bold">Calculadora de Packs (Real-Time)</a>
            <a href="#proyectos" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-700 hover:text-indigo-600 font-medium">Portafolio</a>
            <a href="#opiniones" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-700 hover:text-indigo-600 font-medium">Testimonios</a>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-indigo-600">Formulario de Contacto</a>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-4 text-slate-400">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 font-medium text-xs flex items-center gap-1.5"><Instagram size={16} /> Instagram</a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 font-medium text-xs flex items-center gap-1.5"><Linkedin size={16} /> LinkedIn</a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 font-medium text-xs flex items-center gap-1.5"><MessageSquare size={16} /> WhatsApp</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Body */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <section id="hero" className="relative px-6 py-12 md:py-20 lg:px-12 bg-white overflow-hidden border-b border-slate-100">
          {/* Subtle backgrounds visual accents */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-10 right-10 w-96 h-96 bg-blue-50/50 rounded-full blur-2xl -z-10"></div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={13} className="text-indigo-600" />
                <span>Diseño Web de Alto Impacto</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
                Creamos sitios web diseñados para <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">atraer clientes</span>.
              </h1>

              <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
                No hacemos solo páginas bonitas. Construimos soluciones digitales responsivas, rápidas y optimizadas para Google, que transforman tus visitas en llamadas de ventas periódicas. 
              </p>

              {/* Highlights tags */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {[
                  "✓ Estructura UX/UI",
                  "✓ Velocidad de Carga",
                  "✓ SEO Básico Incluido",
                  "✓ 100% Autogestionable",
                  "✓ Integrado con Redes",
                  "✓ Chatbot de Ventas"
                ].map((tag, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-150 px-3 py-2.5 rounded-xl">
                    <span className="text-emerald-500">✔</span>
                    <span>{tag}</span>
                  </div>
                ))}
              </div>

              {/* Core Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <a 
                  href="#servicios" 
                  className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-7 py-4 rounded-xl shadow-lg transition-all text-center cursor-pointer"
                >
                  <span>Ver Servicios</span>
                  <ArrowRight size={16} />
                </a>
                
                <a 
                  href="#estimador" 
                  className="flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-sm px-7 py-4 rounded-xl border border-indigo-200 shadow-sm transition-all text-center cursor-pointer"
                >
                  <span>Calculadora Express ⚡</span>
                </a>
              </div>

              {/* Quick Trust Factor Banner */}
              <div className="pt-6 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" alt="Avatar Alba" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Avatar Juan" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" alt="Avatar Marta" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <span className="text-slate-800 ml-1">5.0 / 5.0</span>
                  </div>
                  <p>Opiniones de clientes que ya están captando clientes.</p>
                </div>
              </div>

            </div>

            {/* Hero Right Column: Dynamic Live Ecosystem Leads Panel & Quick Contact */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                  Agencia en tiempo real
                </span>
                <span className="inline-flex items-center gap-1 bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  En Llamadas
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 font-sans">Ecosistema Activo</h3>
              <p className="text-xs text-slate-300 mb-6">
                Mira las últimas consultas de clientes recibidas en Estudio Creativo. ¡Tu negocio podría ser el siguiente en duplicar ventas!
              </p>

              {/* Real-time Leads list mock showing active database values */}
              <div className="space-y-3.5 mb-6">
                {leads.length === 0 ? (
                  <div className="text-xs text-slate-500 py-4 text-center">Iniciando feed en vivo...</div>
                ) : (
                  leads.slice(0, 3).map((lead) => (
                    <div 
                      key={lead.id} 
                      className="bg-slate-950/50 hover:bg-slate-900/60 transition-colors border border-slate-800/80 rounded-xl p-3.5 flex items-start gap-3 text-xs"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0 font-bold">
                        {lead.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline gap-2 mb-0.5">
                          <span className="font-semibold text-slate-100 truncate">{lead.name}</span>
                          <span className="text-[9px] text-indigo-300 font-semibold shrink-0 uppercase tracking-wider">{lead.service}</span>
                        </div>
                        <p className="text-slate-300 line-clamp-1 italic">"{lead.projectDescription}"</p>
                        <div className="flex justify-between items-center mt-1.5 text-[9px] text-slate-500">
                          <span>Presupuesto preliminar: <b className="text-slate-300">{lead.budget || "Básico"}</b></span>
                          <span>Hace poco</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pitch to Contact */}
              <div className="bg-indigo-300/10 border border-indigo-400/20 rounded-xl p-4 text-xs text-indigo-200">
                <p className="font-semibold mb-1 text-slate-100">¿Quieres un presupuesto personalizado inmediato?</p>
                Puedes usar nuestra calculadora interactiva rápida para agendar tu proyecto o conversar en directo con nuestro Asistente Inteligente en la esquina inferior.
              </div>

              <a 
                href="#estimador" 
                className="w-full mt-4 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors text-center"
              >
                <span>Ir al Optimizador de Packs</span>
                <ArrowRight size={13} />
              </a>

            </div>

          </div>
        </section>

        {/* Services Showcase Section */}
        <section id="servicios" className="py-16 md:py-24 px-6 lg:px-12 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            
            {/* Design header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
                <span>Nuestras Especialidades digitales</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                7 Palancas de Negocio impulsadas por la Excelencia Web
              </h2>
              <p className="text-base text-slate-600">
                Ofrecemos un portafolio de servicios 100% coordinados para cubrir toda tu comunicación digital. Desde la Landing más específica hasta el Branding completo.
              </p>
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES_DATA.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onSelect={handleServiceQuote} 
                />
              ))}
            </div>

          </div>
        </section>

        {/* Project Estimator Tool */}
        <section id="estimador" className="py-16 md:py-24 px-6 lg:px-12 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto">
            <ProjectEstimator onApplyEstimate={handleEstimateApply} />
          </div>
        </section>

        {/* Real Portfolio Section (Client Showcase) */}
        <section id="proyectos" className="py-16 md:py-24 px-6 lg:px-12 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                  <span>Proyectos Reales</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  Casos de Éxito de Nuestros Clientes
                </h2>
                <p className="text-sm text-slate-600">
                  Explora algunos de nuestros últimos desarrollos web diseñados para maximizar la conversión y optimizar la experiencia de usuario.
                </p>
              </div>

              {/* Simple count validation */}
              <div className="shrink-0 bg-white border border-slate-200 px-5 py-4 rounded-2xl shadow-sm text-center">
                <p className="text-2xl font-black text-indigo-600 leading-none">100%</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Garantía de Satisfacción</p>
              </div>
            </div>

            {/* Client Portfolio Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PORTFOLIO_DATA.map((proj) => (
                <div 
                  key={proj.id} 
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                  id={`portfolio-item-${proj.id}`}
                >
                  <div className="relative h-64 md:h-72 overflow-hidden">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {proj.badge && (
                      <span className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] uppercase font-extrabold tracking-wider px-3 py-1.5 rounded-lg shadow-md">
                        {proj.badge}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-semibold flex items-center gap-1">
                        Ver Enlace del Demo Demo <ExternalLink size={12} />
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-600 mb-1 block">
                        {proj.category}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-indigo-600 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {proj.description}
                      </p>
                    </div>

                    {/* Tags footer */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                      {proj.tags.map((tag, i) => (
                        <span key={i} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2.5 py-1 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Social Proof & Testimonials Section */}
        <section id="opiniones" className="py-16 md:py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-600">Opiniones Reales</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                  La experiencia de nuestros clientes
                </h2>
                <p className="text-sm text-slate-500">
                  Descubre las reseñas reales de dueños de negocios y marcas digitales que ya han optimizado su alcance y captación de clientes digitales junto a nosotros.
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setTestFormOpen(!testFormOpen)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-sm hover:shadow active:scale-[0.98]"
                >
                  <MessageSquare size={14} />
                  {testFormOpen ? "Cerrar Formulario" : "Dejar un Testimonio"}
                </button>
              </div>
            </div>

            {/* Testimonial Submission Form in AnimatePresence */}
            <AnimatePresence>
              {testFormOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mb-12"
                >
                  <form 
                    onSubmit={handleSubmitTestimonial}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto space-y-5 shadow-sm"
                  >
                    <div className="flex justify-between items-center pb-2 border-b">
                      <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                        <Sparkles size={16} className="text-amber-500" />
                        Cuéntanos tu experiencia
                      </h3>
                      <button 
                        type="button" 
                        onClick={() => setTestFormOpen(false)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {testSuccess ? (
                      <div className="py-6 text-center space-y-2">
                        <div className="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <CheckCircle2 size={32} />
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg">¡Muchas gracias por tu reseña!</h4>
                        <p className="text-xs text-slate-500">Tu opinión se ha registrado y publicado con éxito en el muro de testimonios.</p>
                      </div>
                    ) : (
                      <>
                        {testError && (
                          <div className="bg-red-50 text-red-700 text-xs p-3.5 rounded-lg border border-red-100 flex items-center gap-2">
                            <AlertCircle size={15} />
                            <span>{testError}</span>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Nombre Completo *
                            </label>
                            <input
                              type="text"
                              required
                              value={testForm.name}
                              onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                              placeholder="Ej. Sofía Valenzuela"
                              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-250 focus:border-indigo-500 bg-white placeholder-slate-400 focus:outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Empresa o Marca (Opcional)
                            </label>
                            <input
                              type="text"
                              value={testForm.company}
                              onChange={(e) => setTestForm({ ...testForm, company: e.target.value })}
                              placeholder="Ej. EcoBelleza s.l."
                              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-250 focus:border-indigo-500 bg-white placeholder-slate-400 focus:outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Cargo o Rol (Opcional)
                            </label>
                            <input
                              type="text"
                              value={testForm.role}
                              onChange={(e) => setTestForm({ ...testForm, role: e.target.value })}
                              placeholder="Ej. Directora General, Cliente"
                              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-250 focus:border-indigo-500 bg-white placeholder-slate-400 focus:outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Calificación del Servicio
                            </label>
                            <div className="flex items-center gap-2 py-2">
                              {[1, 2, 3, 4, 5].map((starVal) => (
                                <button
                                  key={starVal}
                                  type="button"
                                  onClick={() => setTestForm({ ...testForm, rating: starVal })}
                                  className="text-amber-400 hover:scale-110 transition-transform focus:outline-none"
                                >
                                  <Star 
                                    size={20} 
                                    fill={starVal <= testForm.rating ? "currentColor" : "none"} 
                                    stroke="currentColor" 
                                  />
                                </button>
                              ))}
                              <span className="text-xs text-slate-500 font-semibold ml-2">
                                ({testForm.rating} / 5 estrellas)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white border border-slate-200/80 rounded-xl p-4 space-y-2.5">
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                            Selecciona una Imagen/Avatar de Perfil
                          </label>
                          <div className="flex flex-wrap gap-3">
                            {AVATAR_OPTIONS.map((avatar, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setTestForm({ ...testForm, image: avatar.url })}
                                className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all relative group ${
                                  testForm.image === avatar.url 
                                    ? "border-indigo-600 scale-105 ring-4 ring-indigo-50" 
                                    : "border-slate-200 hover:border-slate-400 hover:scale-[1.03]"
                                }`}
                                title={avatar.name}
                              >
                                <img 
                                  src={avatar.url} 
                                  alt={avatar.name} 
                                  className="w-full h-full object-cover" 
                                  referrerPolicy="no-referrer" 
                                />
                                {testForm.image === avatar.url && (
                                  <div className="absolute inset-0 bg-indigo-600/15 flex items-center justify-center">
                                    <span className="text-[9px] text-white font-extrabold bg-indigo-600 rounded-full w-4 h-4 flex items-center justify-center shadow-md border border-white">
                                      ✓
                                    </span>
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Tu Reseña *
                          </label>
                          <textarea
                            required
                            rows={3}
                            value={testForm.text}
                            onChange={(e) => setTestForm({ ...testForm, text: e.target.value })}
                            placeholder="Describe cómo fue trabajar con nosotros, la atención y los resultados logrados..."
                            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-250 focus:border-indigo-500 bg-white placeholder-slate-400 focus:outline-none transition-all resize-none"
                          />
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            type="submit"
                            disabled={submittingTestimonial}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs font-bold transition-all shadow active:scale-[0.98]"
                          >
                            {submittingTestimonial ? (
                              <span>Enviando...</span>
                            ) : (
                              <>
                                <Send size={13} />
                                <span>Publicar Reseña</span>
                              </>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Testimonials Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((test) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={test.id} 
                  className="bg-slate-50 border border-slate-150 rounded-2xl p-6 relative flex flex-col justify-between hover:border-slate-300 transition-all shadow-sm hover:shadow"
                  id={`testimonial-card-${test.id}`}
                >
                  <div>
                    {/* Stars indicator */}
                    <div className="flex items-center gap-1 text-amber-550 mb-4">
                      {Array.from({ length: test.rating || 5 }).map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" className="stroke-amber-550" />
                      ))}
                    </div>
                    <p className="text-xs md:text-sm text-slate-700 italic leading-relaxed mb-6">
                      "{test.text}"
                    </p>
                  </div>

                  {/* Profile info */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200">
                    {test.image && test.image.startsWith("http") ? (
                      <img 
                        src={test.image} 
                        alt={test.name} 
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-700 font-bold text-xs uppercase border border-indigo-200 select-none">
                        {test.name ? test.name.charAt(0) : "U"}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">{test.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {test.role || "Cliente"} {test.company ? <span> — <span className="font-semibold text-indigo-600">{test.company}</span></span> : null}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* Lead Magnet CTA Form Section */}
        <section id="contacto" className="py-16 md:py-24 px-6 lg:px-12 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto" id="contactform-section">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Form Info Panel left side */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold leading-none uppercase">
                  <span>Contacto Directo</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug">
                  ¿Listo para multiplicar tus clientes?
                </h2>

                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  Completa tu solicitud para agendar una consultoría estratégica de diseño de 15 minutos absolutamente gratuita. Nuestro equipo resolverá tus dudas de inmediato y estructurará una propuesta de costos a tu medida.
                </p>

                {/* Direct info list */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-white border text-indigo-600">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Envia un correo directo</h4>
                      <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-xs text-indigo-600 hover:underline">{SOCIAL_LINKS.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-white border text-indigo-600">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Teléfono & WhatsApp de Soporte</h4>
                      <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-650 font-semibold hover:underline">
                        Enviar mensaje de WhatsApp instantáneo
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-white border text-indigo-600">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Ubicación de Oficinas</h4>
                      <p className="text-xs text-slate-600">Madrid, España — Cobertura Digital de Proyectos en toda Latinoamérica</p>
                    </div>
                  </div>
                </div>

                {/* Social integrations icons */}
                <div className="pt-6 border-t border-slate-200">
                  <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-3">Síguenos en Redes Sociales</h4>
                  <div className="flex gap-3">
                    {[
                      { icon: <Facebook size={18} />, url: SOCIAL_LINKS.facebook, name: "Facebook" },
                      { icon: <Instagram size={18} />, url: SOCIAL_LINKS.instagram, name: "Instagram" },
                      { icon: <Linkedin size={18} />, url: SOCIAL_LINKS.linkedin, name: "LinkedIn" },
                      { icon: <Share2 size={18} />, url: SOCIAL_LINKS.twitter, name: "Twitter" }
                    ].map((soc, idx) => (
                      <a 
                        key={idx} 
                        href={soc.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 bg-white hover:bg-indigo-600 hover:text-white text-slate-500 border border-slate-200 rounded-xl flex items-center justify-center transition-all shadow-sm"
                        title={soc.name}
                      >
                        {soc.icon}
                      </a>
                    ))}
                  </div>
                </div>

              </div>

              {/* Contact Form card block right side */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl relative">
                
                {submitSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 size={36} className="stroke-[2.5px]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-slate-900">¡Tu Solicitud está en Marcha!</h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto">
                        Hemos registrado tu proyecto con éxito. Un Web Designer experto de Estudio Creativo se pondrá en contacto contigo en las próximas 2 horas.
                      </p>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-xs text-slate-700 max-w-sm mx-auto">
                      <b>¿Tienes prisa?</b> Mientras respondemos, puedes abrir nuestro chatbot en la esquina inferior y programar las primeras pautas.
                    </div>
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="text-indigo-600 text-xs font-extrabold hover:underline block mx-auto pt-4"
                    >
                      Enviar otra solicitud o corregir datos
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitContact} className="space-y-5">
                    
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Cotiza tu Proyecto Digital</h3>
                      <p className="text-xs text-slate-500">
                        Completa el formulario y te enviaremos una estimación personalizada.
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-xs flex items-center gap-2">
                        <AlertCircle size={15} className="flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Nombre Completo *</label>
                        <input 
                          type="text" 
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          placeholder="p. ej. Mario Miguel"
                          className="w-full bg-slate-50 border border-slate-200 text-xs py-3 px-4 rounded-xl outline-none focus:bg-white focus:border-indigo-600 transition-all text-slate-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Correo Electrónico *</label>
                        <input 
                          type="email" 
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          placeholder="mario@example.com"
                          className="w-full bg-slate-50 border border-slate-200 text-xs py-3 px-4 rounded-xl outline-none focus:bg-white focus:border-indigo-600 transition-all text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Teléfono de contacto (Opcional)</label>
                        <input 
                          type="text" 
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                          placeholder="p. ej. +34 600 00 00 00"
                          className="w-full bg-slate-50 border border-slate-200 text-xs py-3 px-4 rounded-xl outline-none focus:bg-white focus:border-indigo-600 transition-all text-slate-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Servicio Principal del Negocio *</label>
                        <select 
                          value={contactForm.service}
                          onChange={(e) => setContactForm({...contactForm, service: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 text-xs py-3 px-4 rounded-xl outline-none focus:bg-white focus:border-indigo-600 transition-all text-slate-800 cursor-pointer"
                        >
                          <option value="Diseño Web Profesional">Diseño Web Profesional</option>
                          <option value="Landing Pages">Landing Pages</option>
                          <option value="Rediseño Web">Rediseño Web</option>
                          <option value="SEO Básico">SEO Básico</option>
                          <option value="Branding Digital">Branding Digital</option>
                          <option value="Mantenimiento Web">Mantenimiento Web</option>
                          <option value="Pack de Servicios">Pack Completo Múltiple</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Rango de Presupuesto Aproximado</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          "Básico ($250 - $500)",
                          "Mediano ($500 - $900)",
                          "Avanzado ($1200+)",
                        ].map((bValue) => {
                          const isSelected = contactForm.budget === bValue;
                          return (
                            <button
                              key={bValue}
                              type="button"
                              onClick={() => setContactForm({...contactForm, budget: bValue})}
                              className={`py-2 px-1 rounded-lg border text-center text-[10px] font-bold transition-all cursor-pointer ${
                                isSelected 
                                  ? "bg-indigo-600/10 border-indigo-500 text-indigo-700" 
                                  : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                              }`}
                            >
                              {bValue.split(" ")[0]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-baseline">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Cuéntanos sobre tu negocio o proyecto *</label>
                        <span className="text-[9px] text-gray-400">Requerido</span>
                      </div>
                      <textarea 
                        required
                        rows={4}
                        value={contactForm.projectDescription}
                        onChange={(e) => setContactForm({...contactForm, projectDescription: e.target.value})}
                        placeholder="Por favor, describe qué vende tu negocio, qué objetivos esperas lograr con el nuevo sitio web, y cualquier detalle técnico o estético relevante..."
                        className="w-full bg-slate-50 border border-slate-200 text-xs py-3 px-4 rounded-xl outline-none focus:bg-white focus:border-indigo-600 transition-all text-slate-800 resize-none font-sans"
                      ></textarea>
                    </div>

                    {/* Submitting button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-750 text-white font-bold text-xs hover:shadow-lg disabled:opacity-45 transition-all cursor-pointer"
                      id="contact-form-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full block"></span>
                          <span>Registrando datos...</span>
                        </>
                      ) : (
                        <>
                          <span>Enviar Solicitud de Consultoría</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-center text-slate-400">
                      Garantizamos confidencialidad total. Tus datos nunca serán compartidos con terceros.
                    </p>

                  </form>
                )}

              </div>

            </div>

          </div>
        </section>

      </main>

      {/* Styled Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-white py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8 text-xs">
          
          {/* Column 1 Logo */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <div className="w-3.5 h-3.5 border-2 border-white rotate-45"></div>
              </div>
              <span className="text-lg font-bold tracking-tight">Estudio Creativo Web</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Agencia boutique de diseño y desarrollo web profesional enfocada en optimización de conversiones, experiencias móviles y soporte continuo.
            </p>
          </div>

          {/* Column 2 Services lists navigation links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-slate-200 font-extrabold uppercase tracking-widest text-[10px]">Temas cubiertos</h4>
            <ul className="space-y-2 grid grid-cols-2 text-slate-400">
              <li><a href="#servicios" className="hover:text-white transition-colors">Diseño Web</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Landing Pages</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Tiendas Online</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Rediseño Web</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">SEO Básico</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Branding Digital</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Mantenimiento</a></li>
            </ul>
          </div>

          {/* Column 3 Agency information */}
          <div className="md:col-span-4 space-y-3 text-slate-400">
            <h4 className="text-slate-200 font-extrabold uppercase tracking-widest text-[10px]">Contacto del Estudio</h4>
            <p>📧 Correo: <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-white hover:underline">{SOCIAL_LINKS.email}</a></p>
            <p>💬 Teléfono: <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">WhatsApp soporte</a></p>
            <p>📍 Dirección: Madrid, España — Conexiones Digitales 24/7</p>
          </div>

        </div>

        {/* Outer credit frame links */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
          <div>
            © 2026 Estudio Creativo Web. Todos los derechos reservados.
          </div>
          <div className="flex gap-4">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <span className="text-slate-700 select-none">|</span>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <span className="text-slate-700 select-none">|</span>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </footer>

      {/* Persistent AI ChatBot floating in the corner */}
      <ChatBot onPreFillLead={handleChatBotPreFill} />

    </div>
  );
}
