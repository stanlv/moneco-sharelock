
import { useState } from "react";
import { Heart, ThumbsUp, Trophy, Quote } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TestimonialCard from "@/components/TestimonialCard";
import { cn } from "@/lib/utils";

interface TestimonialsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TestimonialsDialog = ({ open, onOpenChange }: TestimonialsDialogProps) => {
  const [testimonialsFeedback, setTestimonialsFeedback] = useState<string | null>(null);

  const allTestimonials = [
    {
      quote: "The Moneco app has fundamentally changed how I send money back home. The fees are significantly lower than what I was paying with my previous provider, and the transfers are instantaneous.",
      author: "Emmanuel K.",
      source: "App Store Review"
    },
    {
      quote: "As someone who regularly sends money to family in Senegal, this app has been a game-changer. The exchange rates are transparent, and I can track every transaction in real-time.",
      author: "Fatou Diop",
      source: "Google Play Store"
    },
    {
      quote: "The customer service team deserves special recognition. When I had an issue with my first transfer, they resolved it within minutes through the in-app chat.",
      author: "Mohamed A.",
      source: "Trust pilot"
    },
    {
      quote: "I've been using Moneco for six months now, and it has completely replaced my traditional bank for international transfers. The app is intuitive, and the fees are significantly lower.",
      author: "Chioma O.",
      source: "Community Forum"
    },
    {
      quote: "What sets Moneco apart is how easy they've made it to manage multiple currencies. I can hold euros and CFA francs in the same account without excessive conversion fees.",
      author: "Jean-Pierre M.",
      source: "Trust pilot"
    },
    {
      quote: "After trying several competing apps, I've settled on Moneco for all my remittance needs. The combination of speed, low fees, and user-friendly interface makes it the clear winner.",
      author: "Sarah L.",
      source: "LinkedIn"
    },
    {
      quote: "The ability to schedule recurring transfers has been incredibly helpful for sending my monthly support to my parents in Morocco. It's one less thing I have to remember to do.",
      author: "Karim B.",
      source: "Instagram"
    },
    {
      quote: "What I appreciate most about Moneco is the transparency. No hidden fees, clear exchange rates, and detailed receipts for every transaction.",
      author: "Grace A.",
      source: "Facebook"
    },
    {
      quote: "The verification process was smooth and quick - much faster than other financial apps I've tried. I was able to make my first transfer within an hour of downloading the app.",
      author: "Omar S.",
      source: "Trust pilot"
    },
    {
      quote: "Moneco understands the specific needs of African diaspora. The app feels like it was built specifically for people like me who regularly send money back home.",
      author: "Amina T.",
      source: "Twitter"
    }
  ];

  const FeedbackButton = ({ 
    type, 
    label, 
    icon, 
    selected, 
    onSelect 
  }: { 
    type: string, 
    label: string, 
    icon: React.ReactNode, 
    selected: boolean, 
    onSelect: () => void 
  }) => (
    <button
      onClick={onSelect}
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors",
        selected 
          ? "bg-teal-100 text-teal-800 border border-teal-300" 
          : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent"
      )}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Quote className="h-5 w-5 text-teal-600" />
            Customer Testimonials
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 py-4">
          {allTestimonials.map((testimonial, index) => (
            <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
              <TestimonialCard 
                quote={testimonial.quote} 
                author={testimonial.author} 
                source={testimonial.source} 
              />
            </div>
          ))}
          
          <div className="mt-8 pt-4 border-t border-gray-100">
            <h3 className="text-lg font-medium mb-3">What do you think about our customers' feedback?</h3>
            <div className="flex gap-2">
              <FeedbackButton 
                type="support" 
                label="Support" 
                icon={<Heart className="h-3 w-3" />} 
                selected={testimonialsFeedback === "support"} 
                onSelect={() => setTestimonialsFeedback("support")} 
              />
              <FeedbackButton 
                type="insightful" 
                label="Insightful" 
                icon={<ThumbsUp className="h-3 w-3" />} 
                selected={testimonialsFeedback === "insightful"} 
                onSelect={() => setTestimonialsFeedback("insightful")} 
              />
              <FeedbackButton 
                type="celebrate" 
                label="Celebrate" 
                icon={<Trophy className="h-3 w-3" />} 
                selected={testimonialsFeedback === "celebrate"} 
                onSelect={() => setTestimonialsFeedback("celebrate")} 
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialsDialog;
