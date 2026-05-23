import { useState, useEffect } from "react";
import { ServiceItem } from "../types";
import { ESTIMATOR_PRICE_MAP } from "../data";
import { SERVICES_DATA_TRANSLATED, UI_TRANSLATIONS } from "../translations";
import { Check, Info, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectEstimatorProps {
  onApplyEstimate: (selections: string[], textSummary: string, total: number) => void;
  language?: "es" | "en";
}

export default function ProjectEstimator({ onApplyEstimate, language = "es" }: ProjectEstimatorProps) {
  const t = UI_TRANSLATIONS[language];
  const servicesData = SERVICES_DATA_TRANSLATED[language];
  const [selectedServices, setSelectedServices] = useState<string[]>(["diseno-web"]);
  const [timeline, setTimeline] = useState<"standard" | "fast" | "relaxed">("standard");

  const [rawTotal, setRawTotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  // Recompute prices when selections or timeline changes
  useEffect(() => {
    let sum = 0;
    selectedServices.forEach((id) => {
      sum += ESTIMATOR_PRICE_MAP[id] || 0;
    });

    // Multi-service discounts
    let discountPercent = 0;
    if (selectedServices.length === 2) {
      discountPercent = 0.10; // 10% off
    } else if (selectedServices.length >= 3) {
      discountPercent = 0.15; // 15% off
    }

    let calculatedDiscount = Math.round(sum * discountPercent);
    let tempTotal = sum - calculatedDiscount;

    // Timeline multipliers
    if (timeline === "fast") {
      tempTotal = Math.round(tempTotal * 1.25); // 25% premium for urgent delivery
    } else if (timeline === "relaxed") {
      tempTotal = Math.round(tempTotal * 0.90); // 10% discount for flexible timelines
    }

    setRawTotal(sum);
    setDiscountAmount(calculatedDiscount);
    setFinalTotal(tempTotal);
  }, [selectedServices, timeline]);

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) { // keep at least one selected
        setSelectedServices(selectedServices.filter((item) => item !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleExport = () => {
    const serviceTitles = selectedServices.map(
      (id) => servicesData.find((s) => s.id === id)?.title || id
    );

    const timelineLabel = 
      language === "en" ? (
        timeline === "fast" ? "Exclusive / Urgent (1-2 weeks)" : 
        timeline === "relaxed" ? "Flexible (5-8 weeks)" : "Normal / Recommended (3-4 weeks)"
      ) : (
        timeline === "fast" ? "Exclusivo / Urgente (1-2 semanas)" : 
        timeline === "relaxed" ? "Flexible (5-8 semanas)" : "Normal / Recomendado (3-4 semanas)"
      );

    const summaryText = language === "en" ? (
      `Hello! I used your interactive price calculator. I'm interested in a bundle of services including:\n${serviceTitles.map(t2 => `• ${t2}`).join("\n")}\n\n- Desired timeline: ${timelineLabel}\n- Estimated budget: $${finalTotal} USD.`
    ) : (
      `Hola, he utilizado vuestro calculador interactivo. Estoy interesado en un paquete de servicios que incluye:\n${serviceTitles.map(t2 => `• ${t2}`).join("\n")}\n\n- Plazo deseado: ${timelineLabel}\n- Presupuesto estimado: $${finalTotal} USD.`
    );

    onApplyEstimate(serviceTitles, summaryText, finalTotal);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-10 shadow-xl border border-indigo-500/20" id="project-estimator">
      
      {/* Header info */}
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
          <Sparkles size={13} />
          <span>{t.estimatorBadge}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-white mb-2">
          {t.estimatorTitle}
        </h3>
        <p className="text-sm text-slate-300">
          {t.estimatorDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Services selector & Timeline */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Services List Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {t.estimatorStep1}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {servicesData.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`relative text-left p-4 rounded-xl border flex items-start gap-3 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-indigo-600/20 border-indigo-500 shadow-inner text-white"
                        : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 text-slate-300"
                    }`}
                    id={`estimator-item-${service.id}`}
                  >
                    <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      isSelected ? "bg-indigo-500 border-indigo-400 text-white" : "border-slate-600 text-transparent"
                    }`}>
                      {isSelected && <Check size={12} className="stroke-[3px]" />}
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm leading-tight mb-1">{service.title}</h5>
                      <span className="text-xs text-indigo-300 font-medium">{service.price}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
 
          {/* Plazo / Timeline Options */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {t.estimatorStep2}
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "relaxed", label: t.estimatorTimelineRelaxed, icon: "🌱", desc: t.estimatorTimelineRelaxedDesc },
                { id: "standard", label: t.estimatorTimelineStandard, icon: "⭐", desc: t.estimatorTimelineStandardDesc },
                { id: "fast", label: t.estimatorTimelineFast, icon: "⚡", desc: t.estimatorTimelineFastDesc },
              ].map((timeOpt) => (
                <button
                  key={timeOpt.id}
                  onClick={() => setTimeline(timeOpt.id as any)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    timeline === timeOpt.id
                      ? "bg-indigo-500/20 border-indigo-400 text-white font-medium"
                      : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                  id={`estimator-timeline-${timeOpt.id}`}
                >
                  <span className="text-lg mb-1">{timeOpt.icon}</span>
                  <span className="text-xs font-medium block leading-none">{timeOpt.label}</span>
                  <span className="text-[10px] text-slate-500 mt-1">{timeOpt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Price Display and Lead Magnet Trigger */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between self-stretch">
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-800">
              {t.estimatorSummaryTitle}
            </h4>

            {/* List selected item pricing */}
            <div className="space-y-2 mb-6 max-h-44 overflow-y-auto pr-1">
              {selectedServices.map((id) => {
                const s = servicesData.find((svc) => svc.id === id);
                if (!s) return null;
                return (
                  <div key={id} className="flex justify-between items-center text-xs text-slate-300">
                    <span className="truncate max-w-[70%]">{s.title}</span>
                    <span className="font-mono">{s.price}</span>
                  </div>
                );
              })}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 pb-4 border-b border-slate-800 mb-4 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>{language === "en" ? "Base sum:" : "Suma base:"}</span>
                <span className="font-mono">${rawTotal} USD</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span className="flex items-center gap-1">
                    <Sparkles size={11} />
                    {t.estimatorSummaryPackDiscount} ({selectedServices.length >= 3 ? "15%" : "10%"}):
                  </span>
                  <span className="font-mono">-${discountAmount} USD</span>
                </div>
              )}

              {timeline === "fast" && (
                <div className="flex justify-between text-amber-400">
                  <span>{t.estimatorSummaryTimelineFee}:</span>
                  <span>+25%</span>
                </div>
              )}

              {timeline === "relaxed" && (
                <div className="flex justify-between text-emerald-300">
                  <span>{t.estimatorSummaryTimelineDiscount}:</span>
                  <span>-10%</span>
                </div>
              )}
            </div>

            {/* Final Cost Box */}
            <div className="bg-indigo-950/40 rounded-xl p-4 mb-6 border border-indigo-500/10">
              <div className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest mb-1">
                {t.estimatorSummaryEstimatedTotal}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-extrabold font-mono text-white">
                  ${finalTotal}
                </span>
                <span className="text-slate-400 text-xs font-semibold">USD</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1.5 leading-tight">
                <Info size={11} className="flex-shrink-0 text-indigo-400" />
                <span>{language === "en" ? "VAT not incl. Final fee based on exact custom project scale." : "IVA no incl. El costo final dependerá del alcance acordado."}</span>
              </p>
            </div>
          </div>

          {/* Action Trigger */}
          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 py-4 px-5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer shadow-md"
            id="estimator-calc-button"
          >
            <span>{t.btnEstimatorExport}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
