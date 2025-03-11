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
          className="flex items-center gap-1 text-gray-400 text-xs hover:text-gray-500 transition-colors"
        >
          <span>{source}</span>
          <Link2 className="h-3 w-3" />
        </a>
      );
    }
    
    return <div className="text-gray-400 text-xs">{source}</div>;
  };

  const getCardClasses = () => {
    const baseClasses = "p-6 flex flex-col h-full transition-all duration-300 border";
    
    switch (variant) {
      case "highlight":
        return cn(baseClasses, "border-gray-200 bg-white", className);
      case "outlined":
        return cn(baseClasses, "border-gray-200 bg-white", className);
      default:
        return cn(baseClasses, "border-gray-200 bg-white", className);
    }
  };
  
  return (
    <Card className={getCardClasses()}>
      <div className="flex-1">
        {icon && <div className="text-gray-600 mb-3">{icon}</div>}
        <h3 className="text-xl font-normal text-gray-800 mb-2">{displayValue}</h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      </div>
      {renderSource()}
    </Card>
  );
};

export default StatCard;
