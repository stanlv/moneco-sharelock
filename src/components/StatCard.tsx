
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  description: string;
  source: string;
  className?: string;
}

const StatCard = ({ title, description, source, className }: StatCardProps) => {
  return (
    <Card className={cn("p-6 flex flex-col h-full", className)}>
      <div className="flex-1">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-2">{title}</h3>
        <p className="text-gray-600 text-center mb-6">{description}</p>
      </div>
      <div className="text-gray-500 text-sm text-center mt-auto">{source}</div>
    </Card>
  );
};

export default StatCard;
