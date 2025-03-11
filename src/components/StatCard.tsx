
import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link2, LineChart, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  hasChart?: boolean;
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
  gradient,
  hasChart = false
}: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(title);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [showChart, setShowChart] = useState(false);
  
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
          className="flex items-center gap-1 text-gray-400 text-xs hover:text-teal-500 transition-colors"
        >
          <span>{source}</span>
          <Link2 className="h-3 w-3" />
        </a>
      );
    }
    
    return <div className="text-gray-400 text-xs">{source}</div>;
  };

  const getCardClasses = () => {
    const baseClasses = "p-6 flex flex-col h-full transition-all duration-300 border relative";
    
    switch (variant) {
      case "highlight":
        return cn(baseClasses, "border-teal-500 bg-white", className);
      case "outlined":
        return cn(baseClasses, "border-gray-200 bg-white", className);
      default:
        return cn(baseClasses, "border-gray-200 bg-white hover:border-teal-200", className);
    }
  };

  const renderChart = () => {
    if (!hasChart || !showChart) return null;

    // Sample data for growth visualization
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return (
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
        <svg 
          viewBox="0 0 320 200" 
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Growth curve - using a simple exponential growth shape */}
          <path
            d="M0,200 C80,180 160,120 320,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-teal-500"
          />
          
          {/* Small circles for data points */}
          <circle cx="0" cy="200" r="2" className="fill-teal-500" />
          <circle cx="80" cy="180" r="2" className="fill-teal-500" />
          <circle cx="160" cy="120" r="2" className="fill-teal-500" />
          <circle cx="240" cy="60" r="2" className="fill-teal-500" />
          <circle cx="320" cy="20" r="2" className="fill-teal-500" />
        </svg>
      </div>
    );
  };
  
  return (
    <Card className={getCardClasses()}>
      {renderChart()}
      <div className="flex-1 z-10">
        {icon && <div className="text-teal-600 mb-3">{icon}</div>}
        <h3 className="text-xl font-normal text-gray-800 mb-2">{displayValue}</h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      </div>
      <div className="flex justify-between items-center z-10">
        {renderSource()}
        {hasChart && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-gray-400 hover:text-teal-600" 
            onClick={() => setShowChart(!showChart)}
            title={showChart ? "Hide chart" : "Show chart"}
          >
            {showChart ? <EyeOff className="h-4 w-4" /> : <LineChart className="h-4 w-4" />}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
