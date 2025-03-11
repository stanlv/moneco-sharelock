
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  source: string;
}

const TestimonialCard = ({ quote, author, source }: TestimonialCardProps) => {
  return (
    <Card className="p-6 border border-gray-200 rounded-xl relative overflow-hidden hover-lift animate-fade-in">
      {/* Decorative element */}
      <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-teal-500/10 z-0"></div>
      
      <div className="mb-4 relative pl-8 z-10">
        <Quote className="h-6 w-6 text-teal-500 absolute left-0 top-0 transform -translate-y-1" />
        <p className="text-gray-700 italic leading-relaxed">{quote}</p>
      </div>
      
      <div className="flex items-center mt-6 pt-4 border-t border-gray-100">
        <div className="h-10 w-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full mr-3 flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm">
          {author.substring(0, 1).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-gray-800">{author}</p>
          <p className="text-sm text-teal-600">{source}</p>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
