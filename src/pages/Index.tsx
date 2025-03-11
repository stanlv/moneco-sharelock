import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, Users, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import LeadershipCard from "@/components/LeadershipCard";
import TestimonialCard from "@/components/TestimonialCard";
import DocumentCard from "@/components/DocumentCard";

const Index = () => {
  const [showSubscriptionMessage, setShowSubscriptionMessage] = useState(false);

  const stats = [
    {
      title: "$ 83 Billions",
      description: "Yearly financial transfers (Remittances) from Europe to Africa",
      source: "world bank"
    },
    {
      title: "$15",
      description: "Moneco customers save on average $15.35 on a $200 transfer, paying just $9.25 in fees.",
      source: "Moneco Website - Pricing"
    },
    {
      title: "24'000",
      description: "Accounts opened since 2023",
      source: "Mixpanel"
    }
  ];

  const leaders = [
    {
      name: "Shams Badakaly",
      role: "Co-Founder",
      image: "/lovable-uploads/410b7fba-9bdf-4c2e-8d8c-1b5eaa71c55a.png"
    },
    {
      name: "Jimmy Kwasi KUMAKO",
      role: "Co-Founder",
      image: "/lovable-uploads/410b7fba-9bdf-4c2e-8d8c-1b5eaa71c55a.png"
    },
    {
      name: "Bilal Dahlab",
      role: "Co-Founder",
      image: "/lovable-uploads/410b7fba-9bdf-4c2e-8d8c-1b5eaa71c55a.png"
    }
  ];

  const testimonials = [
    {
      quote: "Professional, real-time instant transfer, lower fees compared to other banks, full of benefits, I am satisfied with Moneco's services. I recommend 10000%.",
      author: "youcef-udbylakoub",
      source: "Trust pilot | Translated from French"
    },
    {
      quote: "I recently discovered the Moneco app, and my experience has been very positive. Money transfers, whether sending or receiving funds, are done instantly without any hassle. Additionally, I was pleasantly surprised by how quickly my card was delivered, arriving in just 4 days. In summary, I find Moneco to be a reliable and convenient app for managing my finances effectively ❤️👌.",
      author: "Miloud Ferhati",
      source: "Trust pilot | Translated from French"
    }
  ];

  const documents = [
    {
      title: "Pitch Deck",
      size: "1.5 MB",
      icon: <FileText className="h-5 w-5 text-teal-500" />,
      type: "request" as const
    },
    {
      title: "Sales Pitch",
      size: "1.3 MB",
      icon: <FileText className="h-5 w-5 text-teal-500" />,
      type: "download" as const
    },
    {
      title: "Regulator Licence",
      size: "1.3 MB",
      icon: <FileText className="h-5 w-5 text-teal-500" />,
      type: "request" as const
    }
  ];

  const handleSubscribe = () => {
    setShowSubscriptionMessage(true);
    setTimeout(() => {
      setShowSubscriptionMessage(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <section className="mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">The financial application for the African diaspora</h1>
          <p className="text-gray-600 mb-8">#technology #emergingmarkets #impact</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => (
              <StatCard 
                key={index} 
                title={stat.title} 
                description={stat.description} 
                source={stat.source} 
              />
            ))}
          </div>
          
          <Card className="p-6 bg-gray-100">
            <h2 className="font-semibold text-xl mb-2">In brief</h2>
            <p className="text-gray-700">
              Moneco is a financial application designed primarily for the African diaspora, offering a range of financial services tailored to ease the financial integration and operations for Africans living abroad, especially in Europe. Moneco aims to provide a secure and convenient financial tool for Africans abroad, simplifying money management and enabling easy access to financial services both in their home countries and abroad. For more detailed information on their services and features.
            </p>
          </Card>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">They work with us</h2>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                  <Users className="h-10 w-10 text-gray-400" />
                </div>
                <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">Investor</span>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-12 bg-gray-100 p-6 rounded-lg">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Leadership</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {leaders.map((leader, index) => (
                <LeadershipCard 
                  key={index} 
                  name={leader.name} 
                  role={leader.role} 
                  image={leader.image} 
                />
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Education</h2>
            <div className="flex flex-wrap gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 w-12 rounded-full bg-gray-200"></div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Previous companies</h2>
            <div className="flex flex-wrap gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-12 w-12 rounded-full bg-gray-200"></div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <h3 className="text-xl font-semibold">Do you want access to founders updates?</h3>
            <Button 
              onClick={handleSubscribe}
              className="bg-gray-600 hover:bg-gray-700"
            >
              Yes
            </Button>
          </div>
          {showSubscriptionMessage && (
            <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">
              Thank you for subscribing to our updates!
            </div>
          )}
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Customer Verbatim</h2>
          
          <div className="space-y-6 mb-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index} 
                quote={testimonial.quote} 
                author={testimonial.author} 
                source={testimonial.source} 
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" className="border-gray-300 hover:bg-gray-100">
              Read 10 other customer testimonials
            </Button>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Investors Documents</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {documents.map((doc, index) => (
              <DocumentCard 
                key={index} 
                title={doc.title} 
                size={doc.size} 
                icon={doc.icon} 
                type={doc.type} 
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;

