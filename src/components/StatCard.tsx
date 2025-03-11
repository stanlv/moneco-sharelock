
import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link2, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
    const width = 800;
    const padding = { top: 20, right: 30, bottom: 40, left: 50 };
    
    // Calculate positions for points
    const points = months.map((month, i) => {
      const x = padding.left + (i / (months.length - 1)) * (width - padding.left - padding.right);
      const y = height - padding.bottom - ((values[i] / maxValue) * (height - padding.top - padding.bottom));
      return { x, y, value: values[i], label: month };
    });
    
    // Create SVG path data string for the line
    const pathData = points.map((point, i) => 
      (i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`)
    ).join(' ');
    
    // Create the area fill below the line
    const areaPathData = `
      ${pathData} 
      L ${points[points.length - 1].x},${height - padding.bottom} 
      L ${points[0].x},${height - padding.bottom} 
      Z
    `;
    
    // Choose a subset of months to display as labels to avoid crowding
    const xAxisLabels = points.filter((_, i) => i % 3 === 0);
    
    // Generate nice round numbers for y-axis labels
    const yAxisValues = [0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue];
    const yAxisLabels = yAxisValues.map(value => {
      const y = height - padding.bottom - ((value / maxValue) * (height - padding.top - padding.bottom));
      // Format with apostrophes for thousands
      const formattedValue = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
      return { y, value: formattedValue };
    });
    
    return (
      <div className="w-full overflow-x-hidden">
        <div className="mx-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            width="100%" 
            height={height}
            className="mx-auto"
            style={{ maxWidth: "100%" }}
          >
            {/* Grid lines */}
            {yAxisLabels.map((label, i) => (
              <line 
                key={`grid-${i}`}
                x1={padding.left} 
                y1={label.y} 
                x2={width - padding.right} 
                y2={label.y} 
                stroke="#f1f1f4" 
                strokeWidth="1"
              />
            ))}
            
            {/* X-axis */}
            <line 
              x1={padding.left} 
              y1={height - padding.bottom} 
              x2={width - padding.right} 
              y2={height - padding.bottom} 
              stroke="#e2e2e7" 
              strokeWidth="1"
            />
            
            {/* Y-axis */}
            <line 
              x1={padding.left} 
              y1={padding.top} 
              x2={padding.left} 
              y2={height - padding.bottom} 
              stroke="#e2e2e7" 
              strokeWidth="1"
            />
            
            {/* Area fill below the line */}
            <path 
              d={areaPathData} 
              fill="url(#teal-gradient)" 
              opacity="0.2"
            />
            
            {/* Define the gradient for area fill */}
            <defs>
              <linearGradient id="teal-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
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
                stroke="white"
                strokeWidth="2"
              />
            ))}
            
            {/* X-axis labels (months) */}
            {xAxisLabels.map((point, i) => (
              <text 
                key={i}
                x={point.x} 
                y={height - padding.bottom + 20} 
                textAnchor="middle" 
                fontSize="12"
                fill="#6b7280"
              >
                {point.label}
              </text>
            ))}
            
            {/* Y-axis labels */}
            {yAxisLabels.map((label, i) => (
              <text 
                key={i}
                x={padding.left - 10} 
                y={label.y + 5} 
                textAnchor="end" 
                fontSize="12"
                fill="#6b7280"
              >
                {label.value}
              </text>
            ))}
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
          <DialogContent className="max-w-4xl p-6">
            <DialogHeader className="mb-2">
              <DialogTitle className="text-xl font-medium flex items-center gap-2">
                <LineChart className="h-5 w-5 text-teal-600" />
                {title} - Growth Chart
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-2">
              <h3 className="text-center text-gray-700 text-lg font-medium mb-6">Account Growth Since January 2023</h3>
              {renderGrowthChart()}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default StatCard;
