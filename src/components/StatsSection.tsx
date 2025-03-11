
import StatCard from "@/components/StatCard";
import { ReactNode } from "react";

interface StatItem {
  title: string;
  description: string;
  source: string;
  animate: boolean;
  finalValue?: number;
  animationDuration?: number;
  icon: ReactNode;
  sourceUrl: string;
  variant: "highlight" | "default" | "outlined";
}

interface StatsSectionProps {
  stats: StatItem[];
}

const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat, index) => (
        <StatCard 
          key={index} 
          title={stat.title} 
          description={stat.description} 
          source={stat.source} 
          animate={stat.animate}
          finalValue={stat.finalValue}
          animationDuration={stat.animationDuration}
          icon={stat.icon}
          sourceUrl={stat.sourceUrl}
          variant={stat.variant}
        />
      ))}
    </div>
  );
};

export default StatsSection;
