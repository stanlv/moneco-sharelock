
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Heart, ThumbsUp, Trophy } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  source: string;
}

interface TestimonialsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  whatDoYouThinkText: string;
  supportLabel: string;
  insightfulLabel: string;
  celebrateLabel: string;
  testimonials: Testimonial[];
  testimonialsFeedback: string | null;
  onTestimonialsFeedback: (feedback: string) => void;
}

const TestimonialsDialog = ({
  open,
  onOpenChange,
  title,
  whatDoYouThinkText,
  supportLabel,
  insightfulLabel,
  celebrateLabel,
  testimonials,
  testimonialsFeedback,
  onTestimonialsFeedback
}: TestimonialsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              source={testimonial.source}
            />
          ))}
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">{whatDoYouThinkText}</h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className={`gap-2 ${testimonialsFeedback === "support" ? "bg-teal-50 border-teal-300 text-teal-700" : ""}`}
              onClick={() => onTestimonialsFeedback("support")}
            >
              <Heart className="h-4 w-4" />
              {supportLabel}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={`gap-2 ${testimonialsFeedback === "insightful" ? "bg-teal-50 border-teal-300 text-teal-700" : ""}`}
              onClick={() => onTestimonialsFeedback("insightful")}
            >
              <ThumbsUp className="h-4 w-4" />
              {insightfulLabel}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={`gap-2 ${testimonialsFeedback === "celebrate" ? "bg-teal-50 border-teal-300 text-teal-700" : ""}`}
              onClick={() => onTestimonialsFeedback("celebrate")}
            >
              <Trophy className="h-4 w-4" />
              {celebrateLabel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialsDialog;
