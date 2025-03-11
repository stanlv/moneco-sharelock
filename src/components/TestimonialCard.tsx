
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  source: string;
}

const TestimonialCard = ({ quote, author, source }: TestimonialCardProps) => {
  return (
    <Card className="p-6 border border-gray-200 rounded-lg relative">
      <div className="mb-4 relative pl-6">
        <Quote className="h-5 w-5 text-gray-400 absolute left-0 top-0 transform -translate-y-1" />
        <p className="text-gray-700 italic">{quote}</p>
      </div>
      <div className="flex items-center">
        <div className="h-8 w-8 bg-gray-200 rounded-full mr-3 flex-shrink-0"></div>
        <div>
          <p className="font-medium text-gray-800">{author}</p>
          <p className="text-sm text-gray-500">{source}</p>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
