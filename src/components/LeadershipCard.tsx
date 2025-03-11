
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
  gradientVariant?: 'green' | 'blue' | 'purple';
}

const LeadershipCard = ({ 
  name, 
  role, 
  image, 
  isSelected = false,
  onSelect,
  onSubscribe,
  gradientVariant = 'green'
}: LeadershipCardProps) => {
  
  // Gradient background variants with subtle variations and internal animations
  const gradients = {
    green: "bg-gradient-to-br from-teal-600/90 to-teal-700/90",
    blue: "bg-gradient-to-br from-teal-600/90 to-teal-700/85",
    purple: "bg-gradient-to-br from-teal-500/90 to-teal-600/90"
  };
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 cursor-pointer group animate-fade-in",
        isSelected 
          ? "ring-2 ring-teal-500 shadow-lg" 
          : "hover:shadow-xl hover:-translate-y-2"
      )}
      onClick={onSelect}
    >
      <div className="h-full">
        <div className="relative">
          {/* Background gradient */}
          <div className={cn(
            "absolute inset-0 opacity-90",
            gradients[gradientVariant]
          )}></div>
          
          {/* Animated elements inside the card */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Subtle floating circles animation */}
            <div className="absolute w-32 h-32 rounded-full bg-white/5 animate-float-slow top-0 -left-10"></div>
            <div className="absolute w-24 h-24 rounded-full bg-white/5 animate-float-medium -top-6 right-10"></div>
            <div className="absolute w-16 h-16 rounded-full bg-white/5 animate-float-fast bottom-6 -right-6"></div>
          </div>
          
          {/* Profile image */}
          <div className="relative pt-10 pb-6 px-6 flex justify-center">
            <div className={cn(
              "w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden transition-all duration-500",
              isSelected 
                ? "ring-4 ring-white shadow-lg scale-105" 
                : "ring-2 ring-white/70 group-hover:ring-4 group-hover:ring-white"
            )}>
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/150?text=Leader";
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Content area with subtle improvements */}
        <div className="p-6 pt-5 bg-white">
          <div className="text-center mb-4">
            <h3 className="font-bold text-xl text-gray-800 mb-1 line-clamp-1 group-hover:text-teal-700 transition-colors">{name}</h3>
            <div className="flex items-center justify-center text-teal-600">
              <BriefcaseIcon className="h-4 w-4 mr-1.5 text-teal-500" />
              <p className="font-medium text-sm">{role}</p>
            </div>
          </div>
          
          {/* Selected indicator with improved styling */}
          {isSelected && (
            <div className="mt-4 space-y-4 animate-scale-in">
              <div className="pt-3 border-t border-gray-100 flex items-center justify-center text-emerald-600 font-medium">
                <div className="px-3 py-1.5 bg-emerald-50 rounded-full text-xs flex items-center">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse-soft"></span>
                  Selected for contact
                </div>
              </div>
              
              {/* Subscribe button with improved styling */}
              <Button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the card's onClick
                  onSubscribe && onSubscribe();
                }}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 shadow-sm text-sm font-medium"
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
