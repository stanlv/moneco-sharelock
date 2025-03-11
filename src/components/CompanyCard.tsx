
import { Card } from "@/components/ui/card";

interface CompanyCardProps {
  name: string;
  logo: string;
  type?: string;
}

const CompanyCard = ({ name, logo, type }: CompanyCardProps) => {
  return (
    <Card className="flex flex-col items-center p-4 bg-white hover:shadow-md transition-shadow cursor-pointer">
      <div className="w-16 h-16 mb-3 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
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
    </Card>
  );
};

export default CompanyCard;
