
import { Card } from "@/components/ui/card";
import { BriefcaseIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LeadershipCardProps {
  name: string;
  role: string;
  image: string;
  isSelected?: boolean;
  onSelect?: () => void;
  onSubscribe?: () => void;
}

const LeadershipCard = ({ 
  name, 
  role, 
  image, 
  isSelected = false,
  onSelect,
  onSubscribe
}: LeadershipCardProps) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer group",
        isSelected ? "ring-2 ring-teal-500 shadow-md" : "hover:translate-y-[-4px]"
      )}
      onClick={onSelect}
    >
      <div className="h-full">
        <div className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/90 to-emerald-600/90 opacity-85"></div>
          
          {/* Profile image */}
          <div className="relative pt-8 pb-4 px-6 flex justify-center">
            <div className={cn(
              "w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden transition-all duration-300",
              isSelected 
                ? "ring-4 ring-white shadow-lg scale-105" 
                : "ring-2 ring-white/70 group-hover:ring-4 group-hover:ring-white"
            )}>
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/150?text=Leader";
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Content area */}
        <div className="p-6 pt-4 bg-white">
          <div className="text-center mb-3">
            <h3 className="font-bold text-xl text-gray-800 mb-1 line-clamp-1">{name}</h3>
            <div className="flex items-center justify-center text-teal-600">
              <BriefcaseIcon className="h-4 w-4 mr-1.5" />
              <p className="font-medium text-sm">{role}</p>
            </div>
          </div>
          
          {/* Selected indicator */}
          {isSelected && (
            <div className="mt-4 space-y-4">
              <div className="pt-3 border-t border-gray-100 flex items-center justify-center text-green-600 font-medium">
                <div className="px-3 py-1 bg-green-50 rounded-full text-xs flex items-center">
                  <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1.5"></span>
                  Selected for contact
                </div>
              </div>
              
              {/* Subscribe button - mirrors the one at the bottom of the page */}
              <Button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the card's onClick
                  onSubscribe && onSubscribe();
                }}
                className="w-full bg-teal-600 hover:bg-teal-700 shadow-sm text-xs"
              >
                Subscribe to founder updates
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default LeadershipCard;
