
import { Button } from "@/components/ui/button";
import TestimonialCard from "@/components/TestimonialCard";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  source: string;
}

interface TestimonialsSectionProps {
  title: string;
  readOtherTestimonials: string;
  testimonials: Testimonial[];
  onReadMoreClick: () => void;
}

const TestimonialsSection = ({
  title,
  readOtherTestimonials,
  testimonials,
  onReadMoreClick
}: TestimonialsSectionProps) => {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Quote className="h-5 w-5 text-teal-600" />
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        <Button 
          variant="link" 
          className="text-teal-600" 
          onClick={onReadMoreClick}
        >
          {readOtherTestimonials}
        </Button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.slice(0, 3).map((testimonial, index) => (
          <TestimonialCard 
            key={index}
            quote={testimonial.quote}
            author={testimonial.author}
            source={testimonial.source}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
