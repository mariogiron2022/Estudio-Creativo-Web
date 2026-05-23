export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  iconName: string;
  features: string[];
  badge?: string;
  color: string;
}

export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  badge?: string;
  tags: string[];
}

export interface LeadSubmission {
  name: string;
  email: string;
  phone?: string;
  service: string;
  projectDescription: string;
  budget?: string;
  source: "form" | "chatbot";
}

export interface LeadResponse {
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

export interface TestimonialItem {
  id: string;
  name: string;
  company: string;
  role: string;
  text: string;
  image: string;
  rating: number;
}
