
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
  sourceUrl
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
          className="flex items-center justify-center gap-1 text-gray-500 text-sm hover:text-teal-600 transition-colors group mt-auto"
        >
          <span className="group-hover:underline">{source}</span>
          <Link2 className="h-3 w-3" />
        </a>
      );
    }
    
    return <div className="text-gray-500 text-sm text-center mt-auto">{source}</div>;
  };
  
  return (
    <Card className={cn("p-6 flex flex-col h-full", className)}>
      <div className="flex-1">
        <div className="flex items-center justify-center mb-4">
          {icon && <div className="text-teal-600 mr-2">{icon}</div>}
          <h3 className="text-2xl md:text-3xl font-bold text-center">{displayValue}</h3>
        </div>
        <p className="text-gray-600 text-center mb-6">{description}</p>
      </div>
      {renderSource()}
    </Card>
  );
};

export default StatCard;
