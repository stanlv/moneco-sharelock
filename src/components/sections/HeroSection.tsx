
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import StatCard from "@/components/StatCard";
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

  const stats = [
    {
      title: "$ 83 Billions",
      description: "Yearly financial transfers (Remittances) from Europe to Africa",
      source: "world bank",
      animate: false,
      icon: <div className="h-5 w-5 flex items-center justify-center">💵</div>,
      sourceUrl: "https://www.worldbank.org/en/topic/migrationremittancesdiasporaissues/brief/migration-remittances-data",
      variant: "highlight" as const,
      hasGraph: false
    },
    {
      title: "Save $15",
      description: "Moneco customers save on average $15 on a $200 transfer, paying only 25¢ in fees.",
      source: "Moneco Website - Pricing",
      animate: false,
      icon: <div className="h-5 w-5 flex items-center justify-center">💰</div>,
      sourceUrl: "https://moneco.app/pricing",
      variant: "default" as const,
      hasGraph: false
    },
    {
      title: "24'000",
      description: "Accounts opened since 2023",
      source: "Mixpanel",
      animate: true,
      finalValue: 24357,
      animationDuration: 20000,
      icon: <div className="h-5 w-5 flex items-center justify-center">👤</div>,
      sourceUrl: "https://mixpanel.com",
      variant: "outlined" as const,
      hasGraph: true
    }
  ];

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
      
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <StatCard 
            key={index} 
            title={stat.title} 
            description={stat.description} 
            source={stat.source} 
            animate={stat.animate}
            finalValue={stat.finalValue}
            animationDuration={stat.animationDuration}
            icon={stat.icon}
            sourceUrl={stat.sourceUrl}
            variant={stat.variant}
            hasGraph={stat.hasGraph}
          />
        ))}
      </div>
      
      <Card className="p-5 bg-gray-50 border-0 shadow-none">
        <h2 className="font-medium text-lg mb-2">In brief</h2>
        <p className="text-gray-600 text-sm">
          Moneco is the financial app for Africans in Europe. We go through the same difficulties as you, that's why we've developed a solution. Opening an account, dealing with the prefecture, finding a place to live without a guarantor, sending money back home - your challenges are also ours. Moneco enables users to open an account in just 5 minutes with only a passport (French IBAN), access an international Visa payment card, and process wire transfers at lower costs.
        </p>
        <Button 
          variant="link" 
          className="text-teal-600 p-0 mt-2 h-auto flex items-center text-sm"
          onClick={onReadMoreClick}
        >
          Read more <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </Card>
    </section>
  );
};

export default HeroSection;
