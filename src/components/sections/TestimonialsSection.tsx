
import { Button } from "@/components/ui/button";
import TestimonialCard from "@/components/TestimonialCard";

interface TestimonialsSectionProps {
  onViewAllClick: () => void;
}

const TestimonialsSection = ({ onViewAllClick }: TestimonialsSectionProps) => {
  const featuredTestimonials = [
    {
      quote: "Professional, real-time instant transfer, lower fees compared to other banks, full of benefits, I am satisfied with Moneco's services. I recommend 10000%.",
      author: "youcef-udbylakoub",
      source: "Trust pilot | Translated from French"
    },
    {
      quote: "I recently discovered the Moneco app, and my experience has been very positive. Money transfers, whether sending or receiving funds, are done instantly without any hassle. Additionally, I was pleasantly surprised by how quickly my card was delivered, arriving in just 4 days. In summary, I find Moneco to be a reliable and convenient app for managing my finances effectively ❤️👌.",
      author: "Miloud Ferhati",
      source: "Trust pilot | Translated from French"
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Customer Verbatim</h2>
      
      <div className="space-y-6 mb-6">
        {featuredTestimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={index} 
            quote={testimonial.quote} 
            author={testimonial.author} 
            source={testimonial.source} 
          />
        ))}
      </div>
      
      <div className="text-center">
        <Button 
          variant="outline" 
          className="border-gray-300 hover:bg-gray-100"
          onClick={onViewAllClick}
        >
          Read 10 other customer testimonials
        </Button>
      </div>
    </section>
  );
};

export default TestimonialsSection;
