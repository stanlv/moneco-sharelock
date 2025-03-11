
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface CompanyCardProps {
  name: string;
  logo: string;
  type?: string;
  website?: string;
}

const CompanyCard = ({ name, logo, type, website }: CompanyCardProps) => {
  return (
    <Card className="flex flex-col items-center p-4 bg-white hover:shadow-md transition-shadow cursor-pointer relative">
      <div className="w-24 h-16 mb-3 overflow-hidden flex items-center justify-center">
        <img 
          src={logo} 
          alt={`${name} logo`} 
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/150?text=Logo";
          }}
        />
      </div>
      <h4 className="text-sm font-medium text-gray-800 text-center line-clamp-2">{name}</h4>
      {type && (
        <span className="text-xs text-gray-500 mt-1">{type}</span>
      )}
      {website && (
        <a 
          href={website} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="absolute top-2 right-2 text-gray-400 hover:text-teal-600 transition-colors"
          aria-label={`Visit ${name} website`}
        >
          <ExternalLink size={14} />
        </a>
      )}
    </Card>
  );
};

export default CompanyCard;
