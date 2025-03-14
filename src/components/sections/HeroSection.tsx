
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";

interface HeroSectionProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  onReadMoreClick: () => void;
}

const HeroSection = ({ 
  currentLanguage, 
  onLanguageChange, 
  onReadMoreClick 
}: HeroSectionProps) => {
  const translations = {
    en: {
      tagline: "The financial application for the African diaspora",
      subtitle: "#technology #emergingmarkets #impact"
    },
    fr: {
      tagline: "L'application financière pour la diaspora africaine",
      subtitle: "#technologie #marchésémergents #impact"
    },
    it: {
      tagline: "L'applicazione finanziaria per la diaspora africana",
      subtitle: "#tecnologia #mercatiemergenti #impatto"
    },
    de: {
      tagline: "Die Finanzanwendung für die afrikanische Diaspora",
      subtitle: "#technologie #schwellenmärkte #wirkung"
    }
  };

  return (
    <section className="mb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            {translations[currentLanguage as keyof typeof translations].tagline}
          </h1>
          <p className="text-gray-500">
            {translations[currentLanguage as keyof typeof translations].subtitle}
          </p>
        </div>
        <LanguageSelector 
          currentLanguage={currentLanguage} 
          onLanguageChange={onLanguageChange} 
        />
      </div>
    </section>
  );
};

export default HeroSection;
