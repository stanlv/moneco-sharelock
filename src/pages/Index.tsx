
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, Users, Award, ChevronRight, Heart, ThumbsUp, Trophy, Coins, Link, Star, Shield, Briefcase, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import LeadershipCard from "@/components/LeadershipCard";
import TestimonialCard from "@/components/TestimonialCard";
import DocumentCard from "@/components/DocumentCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import CompanyCard from "@/components/CompanyCard";

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
      image: "/lovable-uploads/8511c5d7-9c93-4ca5-95ed-ebcf7be428b4.png"
    },
    {
      name: "Bilal Dahlab",
      role: "Co-Founder",
      image: "/lovable-uploads/dafeaeae-e1af-4bfe-90d0-728fa23ae389.png"
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

  const companies = {
    investors: [
      { name: "Y Combinator", logo: "/lovable-uploads/4f5c927e-4a2e-4a61-99f5-6185a67da702.png", type: "Investor" },
      { name: "Kima Ventures", logo: "/lovable-uploads/de02de06-e53e-4866-9e3c-952c8e369ac0.png", type: "Investor" },
      { name: "Soma Ventures", logo: "/lovable-uploads/536a7bfb-a16f-4f9e-be24-31f0af390667.png", type: "Investor" },
      { name: "de/ce ventures", logo: "/lovable-uploads/8e8ebfc7-a5ae-4493-b096-9baed4818ef0.png", type: "Investor" },
      { name: "Bpifrance", logo: "/lovable-uploads/c937a99f-56e5-44b0-8b6a-81c7e5cccd23.png", type: "Investor" },
      { name: "Digital Africa", logo: "/lovable-uploads/1b190ff0-6e3e-43d2-8171-b71db395b4a4.png", type: "Investor" },
    ],
    regulators: [
      { name: "ACPR", logo: "/lovable-uploads/06e65e90-337c-414d-a709-379d102e3861.png", type: "Regulator" },
    ]
  };

  const educationInstitutions = [
    { 
      name: "ESSEC Business School", 
      logo: "/lovable-uploads/18aa2c18-0c27-42f0-8d40-fe30cf8c9a9c.png",
      url: "https://www.linkedin.com/school/essec-business-school/" 
    },
    { 
      name: "Y Combinator", 
      logo: "/lovable-uploads/4f5c927e-4a2e-4a61-99f5-6185a67da702.png",
      url: "https://www.linkedin.com/school/y-combinator/" 
    },
    { 
      name: "Université Cheikh Anta Diop de Dakar", 
      logo: "/lovable-uploads/b54b1bf5-3ac6-484c-9a68-443036c99fd4.png",
      url: "https://www.linkedin.com/school/universit%C3%A9-cheikh-anta-diop-de-dakar/" 
    },
    { 
      name: "ESCP Business School", 
      logo: "/lovable-uploads/d32ea322-8c49-406e-8039-5a1999b02889.png",
      url: "https://www.linkedin.com/school/escp-business-school/" 
    },
    { 
      name: "University of St. Gallen", 
      logo: "/lovable-uploads/9ddc31e9-81d6-4a88-b941-79a24156f398.png",
      url: "https://www.linkedin.com/school/university-of-st-gallen/" 
    }
  ];

  const previousCompanies = [
    { 
      name: "Paystack", 
      url: "https://www.linkedin.com/company/paystack/",
      logo: "/lovable-uploads/900a9b36-6a42-4402-bddc-c24cf2e63762.png"
    },
    { 
      name: "CoinAfrique", 
      url: "https://www.linkedin.com/company/coinafrique/",
      logo: "/lovable-uploads/205ace63-228b-45bb-a619-2ff7d56df767.png"
    },
    { 
      name: "Boston Consulting Group", 
      url: "https://www.linkedin.com/company/boston-consulting-group/",
      logo: "/lovable-uploads/65baf527-81c0-43b5-862c-0b50ba7c1549.png"
    },
    { 
      name: "Société Générale CIB", 
      url: "https://www.linkedin.com/company/societegenerale-corporate-and-investment-banking/",
      logo: "/lovable-uploads/a8b528ed-38de-4353-b04b-53546fac0d11.png"
    },
    { 
      name: "Proparco", 
      url: "https://www.linkedin.com/company/proparco/",
      logo: "/lovable-uploads/fa9eff54-9889-44bf-9626-dca8265c06d5.png"
    },
    { 
      name: "ABB", 
      url: "https://www.linkedin.com/company/abb/",
      logo: "/lovable-uploads/1165f161-e7ab-47bb-b1c3-75dcd09e8485.png"
    },
    { 
      name: "Lombard Odier", 
      url: "https://www.linkedin.com/company/lombard-odier/",
      logo: "/lovable-uploads/3eba50ec-a606-4c16-8628-b9f0b54b5720.png"
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
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">They work with us</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {Object.values(companies).flat().map((company, idx) => (
              <CompanyCard 
                key={`company-${idx}`} 
                name={company.name} 
                logo={company.logo} 
                type={company.type}
                website={(company as any).website}
              />
            ))}
          </div>
        </section>
        
        <section className="mb-12 overflow-hidden rounded-xl shadow-sm">
          <div className="bg-gradient-to-br from-teal-50 to-green-50 py-12 px-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">Leadership Team</h2>
            <p className="text-center text-gray-600 mb-10">Meet the brilliant minds behind Moneco</p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {leaders.map((leader, index) => (
                <LeadershipCard 
                  key={index} 
                  name={leader.name} 
                  role={leader.role} 
                  image={leader.image}
                  isSelected={selectedLeaderId === index}
                  onSelect={() => setSelectedLeaderId(index)}
                  onSubscribe={handleSubscribe}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-white p-8">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Education</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {educationInstitutions.map((institution, i) => (
                <a 
                  key={i} 
                  href={institution.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {institution.logo ? (
                      <img 
                        src={institution.logo} 
                        alt={institution.name} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <GraduationCap className="h-5 w-5 text-teal-500" />
                    )}
                  </div>
                  <span className="font-medium text-gray-700">{institution.name}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-8">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Previous Companies</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {previousCompanies.map((company, i) => (
                <a 
                  key={i} 
                  href={company.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {company.logo ? (
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/150?text=Logo";
                        }}
                      />
                    ) : (
                      <Briefcase className="h-5 w-5 text-teal-500" />
                    )}
                  </div>
                  <span className="font-medium text-gray-700">{company.name}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 p-6 rounded-b-xl">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h3 className="text-xl font-semibold text-gray-800">Want access to founders updates?</h3>
              <Button 
                onClick={handleSubscribe}
                className="bg-teal-600 hover:bg-teal-700 shadow-sm"
              >
                Subscribe
              </Button>
            </div>
            {showSubscriptionMessage && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
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
