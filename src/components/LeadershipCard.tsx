
import { Card } from "@/components/ui/card";
import { BriefcaseIcon, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeadershipCardProps {
  name: string;
  role: string;
  image: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

const LeadershipCard = ({ 
  name, 
  role, 
  image, 
  isSelected = false,
  onSelect
}: LeadershipCardProps) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover:shadow-md cursor-pointer",
        isSelected && "ring-2 ring-teal-500"
      )}
      onClick={onSelect}
    >
      <div className={cn(
        "p-1",
        isSelected 
          ? "bg-gradient-to-r from-teal-500 to-green-500" 
          : "bg-gradient-to-r from-teal-400 to-emerald-400"
      )}>
        <div className="p-4 bg-white rounded-sm">
          <div className="flex flex-col items-center">
            <div className={cn(
              "w-28 h-28 overflow-hidden rounded-full mb-4",
              isSelected 
                ? "border-4 border-green-100" 
                : "border-4 border-teal-50"
            )}>
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
              {isSelected ? (
                <div className="flex items-center justify-center text-green-600 font-medium">
                  <UserCheck className="h-4 w-4 mr-1" />
                  <span>Selected for contact</span>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Connect on LinkedIn</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LeadershipCard;
