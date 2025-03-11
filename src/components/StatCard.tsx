
import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link2, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  hasGraph?: boolean;
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
  hasGraph = false
}: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(title);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [showGraphDialog, setShowGraphDialog] = useState(false);
  
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
    const baseClasses = "p-6 flex flex-col h-full transition-all duration-300 border";
    
    switch (variant) {
      case "highlight":
        return cn(baseClasses, "border-teal-500 bg-white", className);
      case "outlined":
        return cn(baseClasses, "border-gray-200 bg-white", className);
      default:
        return cn(baseClasses, "border-gray-200 bg-white hover:border-teal-200", className);
    }
  };
  
  const generateGrowthData = () => {
    // Generate data from January 2023 to current month
    const startDate = new Date(2023, 0, 1); // January 2023
    const currentDate = new Date();
    const months = [];
    const values = [];
    
    // Calculate the number of months between Jan 2023 and now
    const totalMonths = 
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 + 
      (currentDate.getMonth() - startDate.getMonth()) + 1;
    
    for (let i = 0; i < totalMonths; i++) {
      const date = new Date(2023, i, 1);
      const monthName = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      months.push(`${monthName} ${year}`);
      
      // Create an exponential growth curve that starts slow and accelerates
      // This formula creates a gradual acceleration that reaches the final value
      const progress = i / (totalMonths - 1);
      // Using an exponential function with a slow start
      const value = Math.round(Math.pow(progress, 2) * (finalValue || 24000));
      values.push(value);
    }
    
    return { months, values };
  };
  
  const renderGrowthChart = () => {
    const { months, values } = generateGrowthData();
    const maxValue = Math.max(...values);
    
    // Chart dimensions
    const height = 300;
    const width = 600;
    const padding = 40;
    
    // Calculate positions for points
    const points = months.map((month, i) => {
      const x = padding + (i / (months.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((values[i] / maxValue) * (height - 2 * padding));
      return { x, y, value: values[i], label: month };
    });
    
    // Create SVG path data string for the line
    const pathData = points.map((point, i) => 
      (i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`)
    ).join(' ');
    
    return (
      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px]">
          <h3 className="text-center text-gray-700 mb-6">Account Growth Since January 2023</h3>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            width={width} 
            height={height}
            className="mx-auto"
          >
            {/* X and Y axes */}
            <line 
              x1={padding} 
              y1={height - padding} 
              x2={width - padding} 
              y2={height - padding} 
              stroke="#ccc" 
              strokeWidth="1"
            />
            <line 
              x1={padding} 
              y1={padding} 
              x2={padding} 
              y2={height - padding} 
              stroke="#ccc" 
              strokeWidth="1"
            />
            
            {/* Growth curve */}
            <path 
              d={pathData} 
              fill="none" 
              stroke="#0d9488" 
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {points.map((point, i) => (
              <circle 
                key={i}
                cx={point.x} 
                cy={point.y} 
                r="4" 
                fill="#0d9488"
              />
            ))}
            
            {/* X-axis labels (months) - show every 3rd month to avoid crowding */}
            {points.filter((_, i) => i % 3 === 0).map((point, i) => (
              <text 
                key={i}
                x={point.x} 
                y={height - padding + 20} 
                textAnchor="middle" 
                fontSize="12"
                fill="#666"
              >
                {point.label}
              </text>
            ))}
            
            {/* Y-axis labels */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const value = Math.round(maxValue * ratio);
              const y = height - padding - (ratio * (height - 2 * padding));
              return (
                <text 
                  key={i}
                  x={padding - 10} 
                  y={y + 5} 
                  textAnchor="end" 
                  fontSize="12"
                  fill="#666"
                >
                  {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    );
  };
  
  return (
    <>
      <Card className={getCardClasses()}>
        <div className="flex-1">
          {icon && <div className="text-teal-600 mb-3">{icon}</div>}
          <h3 className="text-xl font-normal text-gray-800 mb-2">{displayValue}</h3>
          <p className="text-sm text-gray-500 mb-4">{description}</p>
        </div>
        <div className="flex justify-between items-center">
          {renderSource()}
          {hasGraph && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-gray-400 hover:text-teal-600" 
              onClick={() => setShowGraphDialog(true)}
              title="Show growth chart"
            >
              <LineChart className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
      
      {hasGraph && (
        <Dialog open={showGraphDialog} onOpenChange={setShowGraphDialog}>
          <DialogContent className="max-w-3xl p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                <LineChart className="h-5 w-5 text-teal-600" />
                {title} - Growth Chart
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              {renderGrowthChart()}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default StatCard;
