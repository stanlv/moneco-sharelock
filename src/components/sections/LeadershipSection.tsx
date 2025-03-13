
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase } from "lucide-react";
import LeadershipCard from "@/components/LeadershipCard";
import { format, subDays } from "date-fns";

interface LeadershipSectionProps {
  onSubscribe: () => void;
  onFounderUpdates: () => void;
}

const LeadershipSection = ({ onSubscribe, onFounderUpdates }: LeadershipSectionProps) => {
  const [selectedLeaderId, setSelectedLeaderId] = useState<number | null>(null);
  const [showSubscriptionMessage, setShowSubscriptionMessage] = useState(false);

  const messageDate = subDays(new Date(), 27);
  const formattedDate = format(messageDate, "MMMM d, yyyy");

  const leaders = [
    {
      name: "Shams Badakaly",
      role: "Co-Founder",
      image: "/lovable-uploads/9f121106-7082-4599-8e55-b282061c34be.png",
      gradientVariant: "primary" as const
    },
    {
      name: "Jimmy Kwasi KUMAKO",
      role: "Co-Founder",
      image: "/lovable-uploads/8511c5d7-9c93-4ca5-95ed-ebcf7be428b4.png",
      gradientVariant: "secondary" as const
    },
    {
      name: "Bilal Dahlab",
      role: "Co-Founder",
      image: "/lovable-uploads/dafeaeae-e1af-4bfe-90d0-728fa23ae389.png",
      gradientVariant: "tertiary" as const
    }
  ];

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

  return (
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
              gradientVariant={leader.gradientVariant}
              isSelected={selectedLeaderId === index}
              onSelect={() => setSelectedLeaderId(index)}
              onSubscribe={onFounderUpdates}
            />
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 border-t border-teal-100">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-teal-200">
              <img 
                src="/lovable-uploads/9f121106-7082-4599-8e55-b282061c34be.png" 
                alt="Shams Badakaly" 
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center">
                Message from Shams to Investors
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-800">
                  Co-Founder
                </span>
              </h3>
              <div className="text-xs text-gray-500 mb-2">{formattedDate}</div>
              <div className="prose text-gray-700">
                <p className="italic text-gray-600 mb-4">
                  "Having lived the challenges of cross-border finance firsthand, we founded Moneco with a clear vision: to transform how the African diaspora manages money across continents. This isn't merely a business opportunity, it's a mission deeply rooted in our lived experiences and commitment to financial inclusion."
                </p>
                <p className="text-gray-700 mb-4">
                  Our metrics demonstrate exceptional product-market fit for our ICP. We've built a scalable infrastructure that generates revenue from day one creating a sustainable growth model with strong unit economics.
                </p>
                <p className="text-gray-700">
                  With the €83 billion annual remittance market from Europe to Africa as our foundation, we're executing a clear strategy to expand. Our team combines deep financial expertise with authentic cultural understanding, a unique advantage in this specialized market. We recognize that our progress is not just a result of our internal team's hard work, but also the confidence and resources that you, as our investors and partners, have invested in us. Thank you once again for your trust and commitment. We are excited to keep you updated on our progress and to continue this journey together, achieving new heights and creating lasting value. 
                </p>
              </div>
              <Button 
                onClick={onSubscribe}
                variant="outline" 
                className="mt-4 bg-white hover:bg-gray-50 border-teal-200"
              >
                Connect with Shams
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100/70 p-6">
        <h2 className="text-lg font-medium mb-4 text-gray-700">Education</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {educationInstitutions.map((institution, i) => (
            <a 
              key={i} 
              href={institution.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/70 p-2 rounded-lg shadow-sm flex items-center space-x-2 hover:bg-gray-50 transition-colors border border-gray-200/50"
            >
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {institution.logo ? (
                  <img 
                    src={institution.logo} 
                    alt={institution.name} 
                    className="h-full w-full object-cover opacity-80"
                  />
                ) : (
                  <GraduationCap className="h-4 w-4 text-gray-500" />
                )}
              </div>
              <span className="font-medium text-gray-600 text-xs">{institution.name}</span>
            </a>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-100/40 p-6">
        <h2 className="text-lg font-medium mb-4 text-gray-700">Previous Companies</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {previousCompanies.map((company, i) => (
            <a 
              key={i} 
              href={company.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/70 p-2 rounded-lg shadow-sm flex items-center space-x-2 hover:bg-gray-50 transition-colors border border-gray-200/50"
            >
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {company.logo ? (
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="h-full w-full object-cover opacity-80"
                  />
                ) : (
                  <Briefcase className="h-4 w-4 text-gray-500" />
                )}
              </div>
              <span className="font-medium text-gray-600 text-xs">{company.name}</span>
            </a>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 p-6 rounded-b-xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h3 className="text-xl font-semibold text-gray-800">Connect with Moneco's Leadership</h3>
          <Button 
            onClick={onFounderUpdates}
            variant="moneco"
          >
            Subscribe for Direct Updates
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
  );
};

export default LeadershipSection;
