import React from "react";
import { ServiceItem } from "../types";
import { Laptop, Rocket, ShoppingCart, RefreshCw, Search, Palette, ShieldCheck, Check } from "lucide-react";
import { motion } from "motion/react";

interface ServiceCardProps {
  key?: string;
  service: ServiceItem;
  onSelect: (serviceTitle: string) => void;
  quoteLabel?: string;
}

const iconMap: Record<string, any> = {
  Laptop: Laptop,
  Rocket: Rocket,
  ShoppingCart: ShoppingCart,
  RefreshCw: RefreshCw,
  Search: Search,
  Palette: Palette,
  ShieldCheck: ShieldCheck,
};

export default function ServiceCard({ service, onSelect, quoteLabel }: ServiceCardProps) {
  const IconComponent = iconMap[service.iconName] || Laptop;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="relative flex flex-col justify-between bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300"
      id={`service-card-${service.id}`}
    >
      {service.badge && (
        <span className="absolute -top-3 right-6 bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {service.badge}
        </span>
      )}

      <div>
        {/* Icon & Background Accent */}
        <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-r ${service.color} text-white mb-5 shadow-inner`}>
          <IconComponent size={24} className="stroke-[2px]" />
        </div>

        {/* Title & Price */}
        <div className="mb-4">
          <h3 className="font-sans font-semibold text-xl text-gray-900 mb-1 leading-tight">
            {service.title}
          </h3>
          <p className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {service.price}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Bullet points */}
        <ul className="space-y-2.5 mb-8">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600">
              <span className="inline-flex items-center justify-center p-0.5 rounded-full bg-emerald-50 text-emerald-600 mt-0.5">
                <Check size={12} className="stroke-[3px]" />
              </span>
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action button */}
      <button
        onClick={() => onSelect(service.title)}
        className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-center border border-gray-200 hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 cursor-pointer"
        id={`btn-select-svc-${service.id}`}
      >
        {quoteLabel ? `${quoteLabel} ${service.title}` : `Cotizar ${service.title}`}
      </button>
    </motion.div>
  );
}
