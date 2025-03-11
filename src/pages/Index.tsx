
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, Users, Award, ChevronRight, Heart, ThumbsUp, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import LeadershipCard from "@/components/LeadershipCard";
import TestimonialCard from "@/components/TestimonialCard";
import DocumentCard from "@/components/DocumentCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const Index = () => {
  const [showSubscriptionMessage, setShowSubscriptionMessage] = useState(false);
  const [showReadMoreDialog, setShowReadMoreDialog] = useState(false);
  
  const [briefFeedback, setBriefFeedback] = useState<string | null>(null);
  const [startedFeedback, setStartedFeedback] = useState<string | null>(null);
  const [visionFeedback, setVisionFeedback] = useState<string | null>(null);
  
  const [selectedLeaderId, setSelectedLeaderId] = useState<number | null>(null);

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
      image: "/lovable-uploads/9f121106-7082-4599-8e55-b282061c34be.png"
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

  const FeedbackButton = ({ 
    type, 
    label, 
    icon, 
    selected, 
    onSelect 
  }: { 
    type: string, 
    label: string, 
    icon: React.ReactNode, 
    selected: boolean, 
    onSelect: () => void 
  }) => (
    <button
      onClick={onSelect}
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors",
        selected 
          ? "bg-teal-100 text-teal-800 border border-teal-300" 
          : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent"
      )}
    >
      {icon}
      {label}
    </button>
  );

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
              Moneco is a financial application designed primarily for the African diaspora, offering a range of financial services tailored to ease the financial integration and operations for Africans living abroad, especially in Europe. Moneco aims to provide a secure and convenient financial tool for Africans abroad, simplifying money management and enabling easy access to financial services both in their home countries and abroad.
            </p>
            <Button 
              variant="link" 
              className="text-teal-600 p-0 mt-2 h-auto flex items-center"
              onClick={() => setShowReadMoreDialog(true)}
            >
              Read more <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Card>
        </section>
        
        <Dialog open={showReadMoreDialog} onOpenChange={setShowReadMoreDialog}>
          <DialogContent className="max-w-3xl p-8 max-h-[90vh] overflow-y-auto">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold">About Moneco</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-8 py-4">
              <div>
                <h3 className="text-xl font-semibold mb-4">In Brief</h3>
                <p className="text-gray-700 leading-relaxed">
                  Moneco is a financial application designed primarily for the African diaspora, offering a range of financial services tailored to ease the financial integration and operations for Africans living abroad, especially in Europe. Moneco aims to provide a secure and convenient financial tool for Africans abroad, simplifying money management and enabling easy access to financial services both in their home countries and abroad. For more detailed information on their services and features.
                </p>
                <div className="mt-4 flex gap-2">
                  <FeedbackButton 
                    type="support" 
                    label="Support" 
                    icon={<Heart className="h-3 w-3" />} 
                    selected={briefFeedback === "support"} 
                    onSelect={() => setBriefFeedback("support")} 
                  />
                  <FeedbackButton 
                    type="insightful" 
                    label="Insightful" 
                    icon={<ThumbsUp className="h-3 w-3" />} 
                    selected={briefFeedback === "insightful"} 
                    onSelect={() => setBriefFeedback("insightful")} 
                  />
                  <FeedbackButton 
                    type="celebrate" 
                    label="Celebrate" 
                    icon={<Trophy className="h-3 w-3" />} 
                    selected={briefFeedback === "celebrate"} 
                    onSelect={() => setBriefFeedback("celebrate")} 
                  />
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-xl font-semibold mb-4">How Moneco Started</h3>
                <p className="text-gray-700 leading-relaxed">
                  Moneco was founded in 2022 by a team of African professionals with experience in fintech and banking who recognized the challenges faced by the African diaspora in accessing affordable financial services. The founders, having personally experienced the high costs and limitations of traditional banking systems for cross-border transactions, set out to create a solution that would specifically address these pain points. Starting with remittance services, Moneco has since expanded to offer a comprehensive suite of financial tools tailored to the unique needs of Africans living abroad.
                </p>
                <div className="mt-4 flex gap-2">
                  <FeedbackButton 
                    type="support" 
                    label="Support" 
                    icon={<Heart className="h-3 w-3" />} 
                    selected={startedFeedback === "support"} 
                    onSelect={() => setStartedFeedback("support")} 
                  />
                  <FeedbackButton 
                    type="insightful" 
                    label="Insightful" 
                    icon={<ThumbsUp className="h-3 w-3" />} 
                    selected={startedFeedback === "insightful"} 
                    onSelect={() => setStartedFeedback("insightful")} 
                  />
                  <FeedbackButton 
                    type="celebrate" 
                    label="Celebrate" 
                    icon={<Trophy className="h-3 w-3" />} 
                    selected={startedFeedback === "celebrate"} 
                    onSelect={() => setStartedFeedback("celebrate")} 
                  />
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Moneco Mission and Long-term Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  Moneco's mission is to empower the African diaspora with accessible, affordable, and inclusive financial services that bridge the gap between their host countries and home countries. By leveraging technology, Moneco aims to reduce the cost of remittances, provide transparent banking services, and create economic opportunities for Africans worldwide.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  The long-term vision of Moneco is to become the leading financial platform for the global African community, facilitating not just money transfers but also investments, business financing, and wealth creation opportunities that contribute to the development of African economies while improving the financial well-being of the diaspora.
                </p>
                <div className="mt-4 flex gap-2">
                  <FeedbackButton 
                    type="support" 
                    label="Support" 
                    icon={<Heart className="h-3 w-3" />} 
                    selected={visionFeedback === "support"} 
                    onSelect={() => setVisionFeedback("support")} 
                  />
                  <FeedbackButton 
                    type="insightful" 
                    label="Insightful" 
                    icon={<ThumbsUp className="h-3 w-3" />} 
                    selected={visionFeedback === "insightful"} 
                    onSelect={() => setVisionFeedback("insightful")} 
                  />
                  <FeedbackButton 
                    type="celebrate" 
                    label="Celebrate" 
                    icon={<Trophy className="h-3 w-3" />} 
                    selected={visionFeedback === "celebrate"} 
                    onSelect={() => setVisionFeedback("celebrate")} 
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
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
        
        <section className="mb-12 rounded-lg overflow-hidden">
          <div className="bg-teal-50 p-8 rounded-t-lg">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">Our Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {leaders.map((leader, index) => (
                <LeadershipCard 
                  key={index} 
                  name={leader.name} 
                  role={leader.role} 
                  image={leader.image}
                  isSelected={selectedLeaderId === index}
                  onSelect={() => setSelectedLeaderId(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-teal-100/50 p-8">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Education</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Award className="h-5 w-5 text-teal-500" />
                  </div>
                  <span className="font-medium text-gray-700">Top University {i+1}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-teal-50 p-8 rounded-b-lg">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Previous Companies</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-5 w-5 text-teal-500" />
                  </div>
                  <span className="font-medium text-gray-700">Company {i+1}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-b-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Do you want access to founders updates?</h3>
              <Button 
                onClick={handleSubscribe}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Yes
              </Button>
            </div>
            {showSubscriptionMessage && (
              <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">
                Thank you for subscribing to our updates!
              </div>
            )}
          </div>
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
