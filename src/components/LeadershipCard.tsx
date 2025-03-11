
import { Card } from "@/components/ui/card";
import { BriefcaseIcon } from "lucide-react";

interface LeadershipCardProps {
  name: string;
  role: string;
  image: string;
}

const LeadershipCard = ({ name, role, image }: LeadershipCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="p-1 bg-gradient-to-r from-teal-400 to-emerald-400">
        <div className="p-4 bg-white rounded-sm">
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 overflow-hidden rounded-full mb-4 border-4 border-teal-50">
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback image if the provided image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/150?text=Leader";
                }}
              />
            </div>
            <h3 className="font-bold text-lg text-gray-800">{name}</h3>
            <div className="flex items-center mt-1 text-teal-600">
              <BriefcaseIcon className="h-4 w-4 mr-1" />
              <p className="font-medium">{role}</p>
            </div>
            
            <div className="mt-4 pt-4 border-t w-full text-center">
              <p className="text-sm text-gray-500">Connect on LinkedIn</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LeadershipCard;
