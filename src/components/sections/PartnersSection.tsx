
import CompanyCard from "@/components/CompanyCard";

const PartnersSection = () => {
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

  return (
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
  );
};

export default PartnersSection;
