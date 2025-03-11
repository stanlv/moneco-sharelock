
import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link2 } from "lucide-react";

interface StatCardProps {
  title: string;
  description: string;
  source: string;
  className?: string;
  animate?: boolean;
  animationDuration?: number;
  finalValue?: number;
  icon?: React.ReactNode;
  sourceUrl?: string;
  variant?: "default" | "highlight" | "outlined";
  gradient?: string;
}

const StatCard = ({ 
  title, 
  description, 
  source, 
  className,
  animate = false,
  animationDuration = 2000,
  finalValue,
  icon,
  sourceUrl,
  variant = "default",
  gradient
}: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(title);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Only run animation if animate is true and we have a numeric final value
    if (!animate || !finalValue) return;
    
    // Extract the numeric part for animation, assuming title might have non-numeric characters
    const numericFinalValue = parseInt(String(finalValue).replace(/\D/g, ''));
    const initialNumericValue = 0;
    
    // Format the final value to match the title format (e.g., "$ 83 Billions")
    const prefix = title.match(/^[^\d]*/)?.[0] || '';
    const suffix = title.match(/[^\d]*$/)?.[0] || '';
    
    const animateCounter = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Apply easing function to create slow start and fast finish effect
      // Using cubic easing: progress^3 accelerates more dramatically toward the end
      const easedProgress = progress < 0.5 
        ? 4 * Math.pow(progress, 3) 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      const currentValue = Math.floor(initialNumericValue + easedProgress * (numericFinalValue - initialNumericValue));
      
      // Format the current value with commas for thousands
      const formattedValue = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
      
      setDisplayValue(`${prefix}${formattedValue}${suffix}`);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateCounter);
      }
    };
    
    animationRef.current = requestAnimationFrame(animateCounter);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, title, finalValue, animationDuration]);
  
  const renderSource = () => {
    if (sourceUrl) {
      return (
        <a 
          href={sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 text-gray-400 text-xs hover:text-gray-600 transition-colors mt-auto"
        >
          <span>{source}</span>
          <Link2 className="h-3 w-3" />
        </a>
      );
    }
    
    return <div className="text-gray-400 text-xs text-center mt-auto">{source}</div>;
  };

  const getCardClasses = () => {
    const baseClasses = "p-5 flex flex-col h-full transition-all duration-300 border-0 bg-white";
    
    if (gradient) {
      return cn(baseClasses, "shadow-none", className);
    }
    
    switch (variant) {
      case "highlight":
        return cn(baseClasses, "border-l-2 border-l-gray-800 bg-white shadow-none", className);
      case "outlined":
        return cn(baseClasses, "border border-gray-100 bg-white shadow-none", className);
      default:
        return cn(baseClasses, "shadow-none", className);
    }
  };

  const getIconClass = () => {
    return "text-gray-800";
  };

  const getTitleClass = () => {
    return "font-medium text-gray-900";
  };

  const getDescriptionClass = () => {
    return "text-gray-500";
  };
  
  const cardStyle = gradient ? { background: "white", borderLeft: "2px solid #e5e7eb" } : {};
  
  return (
    <Card className={getCardClasses()} style={cardStyle}>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          {icon && <div className={cn(getIconClass())}>{icon}</div>}
          <h3 className={cn("text-xl md:text-2xl", getTitleClass())}>{displayValue}</h3>
        </div>
        <p className={cn("mb-4 text-sm", getDescriptionClass())}>{description}</p>
      </div>
      {renderSource()}
    </Card>
  );
};

export default StatCard;
