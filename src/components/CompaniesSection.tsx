
import { Separator } from "@/components/ui/separator";
import CompanyCard from "@/components/CompanyCard";

interface Company {
  name: string;
  logo: string;
  type: string;
}

interface CompaniesSectionProps {
  title: string;
  companies: {
    investors: Company[];
    regulators: Company[];
  };
}

const CompaniesSection = ({ title, companies }: CompaniesSectionProps) => {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
      
      <h3 className="text-base font-medium text-gray-700 mb-4">Investors</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {companies.investors.map((company, index) => (
          <CompanyCard 
            key={index}
            name={company.name}
            logo={company.logo}
            type={company.type}
          />
        ))}
      </div>
      
      <Separator className="my-6" />
      
      <h3 className="text-base font-medium text-gray-700 mb-4">Regulators</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {companies.regulators.map((company, index) => (
          <CompanyCard 
            key={index}
            name={company.name}
            logo={company.logo}
            type={company.type}
          />
        ))}
      </div>
    </section>
  );
};

export default CompaniesSection;
