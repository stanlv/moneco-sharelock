
import { Button } from "@/components/ui/button";
import LeadershipCard from "@/components/LeadershipCard";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, Briefcase } from "lucide-react";

interface Leader {
  name: string;
  role: string;
  image: string;
  gradientVariant: "primary" | "secondary" | "tertiary";
}

interface Institution {
  name: string;
  logo: string;
  url: string;
}

interface PreviousCompany {
  name: string;
  url: string;
  logo: string;
}

interface LeadershipSectionProps {
  title: string;
  subtitle: string;
  leaders: Leader[];
  educationTitle: string;
  educationInstitutions: Institution[];
  previousCompaniesTitle: string;
  previousCompanies: PreviousCompany[];
  connectText: string;
  subscribeText: string;
  onSubscribe: () => void;
  onFounderUpdates: () => void;
  selectedLeaderId: number | null;
  setSelectedLeaderId: (id: number | null) => void;
}

const LeadershipSection = ({
  title,
  subtitle,
  leaders,
  educationTitle,
  educationInstitutions,
  previousCompaniesTitle,
  previousCompanies,
  connectText,
  subscribeText,
  onSubscribe,
  onFounderUpdates,
  selectedLeaderId,
  setSelectedLeaderId
}: LeadershipSectionProps) => {
  return (
    <section className="mb-10">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {leaders.map((leader, index) => (
          <LeadershipCard 
            key={index}
            name={leader.name}
            role={leader.role}
            image={leader.image}
            isSelected={selectedLeaderId === index}
            onClick={() => setSelectedLeaderId(selectedLeaderId === index ? null : index)}
            gradientVariant={leader.gradientVariant}
          />
        ))}
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mt-8 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5 text-teal-600" />
            <h3 className="text-base font-medium text-gray-800">{educationTitle}</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {educationInstitutions.map((institution, index) => (
              <a 
                key={index}
                href={institution.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-center h-16 hover:shadow-md transition-all"
              >
                <img 
                  src={institution.logo} 
                  alt={institution.name} 
                  className="max-h-10 max-w-full object-contain" 
                />
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-5 w-5 text-teal-600" />
            <h3 className="text-base font-medium text-gray-800">{previousCompaniesTitle}</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previousCompanies.map((company, index) => (
              <a 
                key={index}
                href={company.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-center h-16 hover:shadow-md transition-all"
              >
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="max-h-10 max-w-full object-contain" 
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">{connectText}</h3>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="gradient" 
            className="flex-1"
            onClick={onSubscribe}
          >
            {subscribeText}
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-gray-300"
            onClick={onFounderUpdates}
          >
            Monthly Founder Updates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
