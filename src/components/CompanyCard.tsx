
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
    <Card className="flex flex-col items-center p-4 bg-white hover:shadow-md transition-all duration-300 cursor-pointer relative group rounded-xl overflow-hidden hover:border-teal-200 animate-fade-in">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-50/0 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="w-24 h-16 mb-3 overflow-hidden flex items-center justify-center relative z-10">
        <img 
          src={logo} 
          alt={`${name} logo`} 
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/150?text=Logo";
          }}
        />
      </div>
      
      <h4 className="text-sm font-medium text-gray-800 text-center line-clamp-2 group-hover:text-teal-700 transition-colors relative z-10">{name}</h4>
      
      {type && (
        <span className="text-xs text-gray-500 mt-1 px-2 py-0.5 bg-gray-100 rounded-full group-hover:bg-teal-100 group-hover:text-teal-700 transition-colors relative z-10">{type}</span>
      )}
      
      {website && (
        <a 
          href={website} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="absolute top-2 right-2 text-gray-400 hover:text-teal-600 transition-colors p-1 rounded-full hover:bg-teal-50"
          aria-label={`Visit ${name} website`}
        >
          <ExternalLink size={14} />
        </a>
      )}
    </Card>
  );
};

export default CompanyCard;
