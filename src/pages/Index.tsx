
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import TestimonialCard from "@/components/TestimonialCard";
import LeadershipCard from "@/components/LeadershipCard";
import CompanyCard from "@/components/CompanyCard";
import DocumentCard from "@/components/DocumentCard";
import LanguageSelector from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Define the props interface for the Index component
interface IndexProps {
  onLanguageChangeStart?: () => void;
  onLanguageChangeEnd?: () => void;
}

// Make the component accept the IndexProps interface
const Index = ({ onLanguageChangeStart, onLanguageChangeEnd }: IndexProps) => {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (newLanguage: string) => {
    if (onLanguageChangeStart) onLanguageChangeStart();
    setLanguage(newLanguage);
    
    // Create and dispatch a custom event for language change
    const event = new CustomEvent('languageChange', { detail: { language: newLanguage } });
    window.dispatchEvent(event);
    
    // Notify the user about the language change
    toast.success(`Language changed to ${newLanguage.toUpperCase()}`);
    
    if (onLanguageChangeEnd) {
      setTimeout(() => onLanguageChangeEnd(), 300);
    }
  };

  const stats = [
    { title: "24'000 Accounts", description: "Active Users", source: "System Analytics", finalValue: 24000, hasGraph: true },
    { title: "124", description: "Daily Signups", source: "June 2023" },
    { title: "4.8", description: "Average Rating", source: "App Store" },
  ];

  const testimonials = [
    {
      quote: "This platform has revolutionized our workflow. Highly recommended!",
      author: "Jane Doe",
      source: "CEO, TechCorp",
    },
    {
      quote: "Incredible customer support and a user-friendly interface.",
      author: "John Smith",
      source: "CTO, InnoVision",
    },
  ];

  const leadership = [
    { name: "Alice Johnson", role: "Founder", image: "https://via.placeholder.com/150" },
    { name: "Bob Williams", role: "CEO", image: "https://via.placeholder.com/150" },
  ];

  const companies = [
    { name: "TechCorp", logo: "https://via.placeholder.com/50" },
    { name: "InnoVision", logo: "https://via.placeholder.com/50" },
  ];

  const documents = [
    { title: "Whitepaper", size: "1.2 MB", icon: <FileText className="h-5 w-5" />, type: "download" as const },
    { title: "Case Study", size: "2.4 MB", icon: <FileText className="h-5 w-5" />, type: "download" as const },
  ];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector
          currentLanguage={language}
          onLanguageChange={handleLanguageChange}
        />
      </div>

      <header className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Our Amazing Platform
        </h1>
        <p className="text-lg text-gray-600">
          Experience the future of innovation.
        </p>
        <Button className="mt-6">Get Started</Button>
      </header>

      <main className="flex-grow py-12">
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard 
                key={index} 
                title={stat.title} 
                description={stat.description} 
                source={stat.source}
                finalValue={stat.finalValue}
                hasGraph={stat.hasGraph}
              />
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  source={testimonial.source}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Our Leadership</h2>
            <div className="flex space-x-6 overflow-x-auto">
              {leadership.map((leader) => (
                <LeadershipCard
                  key={leader.name}
                  name={leader.name}
                  role={leader.role}
                  image={leader.image}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Our Partners</h2>
            <div className="flex space-x-6 overflow-x-auto">
              {companies.map((company) => (
                <CompanyCard
                  key={company.name}
                  name={company.name}
                  logo={company.logo}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-4">Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {documents.map((document) => (
                <DocumentCard
                  key={document.title}
                  title={document.title}
                  size={document.size}
                  icon={document.icon}
                  type={document.type}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
