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
    { label: "Active Users", value: "4,328" },
    { label: "Daily Signups", value: "124" },
    { label: "Average Rating", value: "4.8" },
  ];

  const testimonials = [
    {
      text: "This platform has revolutionized our workflow. Highly recommended!",
      author: "Jane Doe, CEO",
    },
    {
      text: "Incredible customer support and a user-friendly interface.",
      author: "John Smith, CTO",
    },
  ];

  const leadership = [
    { name: "Alice Johnson", title: "Founder", imageUrl: "https://via.placeholder.com/150" },
    { name: "Bob Williams", title: "CEO", imageUrl: "https://via.placeholder.com/150" },
  ];

  const companies = [
    { name: "TechCorp", logoUrl: "https://via.placeholder.com/50" },
    { name: "InnoVision", logoUrl: "https://via.placeholder.com/50" },
  ];

  const documents = [
    { title: "Whitepaper", url: "#" },
    { title: "Case Study", url: "#" },
  ];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Navbar>
        <LanguageSelector
          currentLanguage={language}
          onLanguageChange={handleLanguageChange}
        />
      </Navbar>

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
              <StatCard key={index} label={stat.label} value={stat.value} />
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  text={testimonial.text}
                  author={testimonial.author}
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
                  title={leader.title}
                  imageUrl={leader.imageUrl}
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
                  logoUrl={company.logoUrl}
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
                  url={document.url}
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
