
import { Heart, ThumbsUp, Trophy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AboutDialog = ({ open, onOpenChange }: AboutDialogProps) => {
  const [briefFeedback, setBriefFeedback] = useState<string | null>(null);
  const [startedFeedback, setStartedFeedback] = useState<string | null>(null);
  const [visionFeedback, setVisionFeedback] = useState<string | null>(null);

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
          <DialogTitle className="text-2xl font-bold">About Moneco</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 py-4">
          <div>
            <h3 className="text-xl font-semibold mb-4">In Brief</h3>
            <p className="text-gray-700 leading-relaxed">
              Moneco is a financial application designed primarily for the African diaspora, offering a range of financial services tailored to ease the financial integration and operations for Africans living abroad, especially in Europe. Moneco aims to provide a secure and convenient financial tool for Africans abroad, simplifying money management and enabling easy access to financial services both in their home countries and abroad. For more detailed information on their services and features.
            </p>
            <div className="mt-4 flex gap-2">
              <FeedbackButton 
                type="support" 
                label="Support" 
                icon={<Heart className="h-3 w-3" />} 
                selected={briefFeedback === "support"} 
                onSelect={() => setBriefFeedback("support")} 
              />
              <FeedbackButton 
                type="insightful" 
                label="Insightful" 
                icon={<ThumbsUp className="h-3 w-3" />} 
                selected={briefFeedback === "insightful"} 
                onSelect={() => setBriefFeedback("insightful")} 
              />
              <FeedbackButton 
                type="celebrate" 
                label="Celebrate" 
                icon={<Trophy className="h-3 w-3" />} 
                selected={briefFeedback === "celebrate"} 
                onSelect={() => setBriefFeedback("celebrate")} 
              />
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div>
            <h3 className="text-xl font-semibold mb-4">How Moneco Started</h3>
            <p className="text-gray-700 leading-relaxed">
              Moneco was founded in 2022 by a team of African professionals with experience in fintech and banking who recognized the challenges faced by the African diaspora in accessing affordable financial services. The founders, having personally experienced the high costs and limitations of traditional banking systems for cross-border transactions, set out to create a solution that would specifically address these pain points. Starting with remittance services, Moneco has since expanded to offer a comprehensive suite of financial tools tailored to the unique needs of Africans living abroad.
            </p>
            <div className="mt-4 flex gap-2">
              <FeedbackButton 
                type="support" 
                label="Support" 
                icon={<Heart className="h-3 w-3" />} 
                selected={startedFeedback === "support"} 
                onSelect={() => setStartedFeedback("support")} 
              />
              <FeedbackButton 
                type="insightful" 
                label="Insightful" 
                icon={<ThumbsUp className="h-3 w-3" />} 
                selected={startedFeedback === "insightful"} 
                onSelect={() => setStartedFeedback("insightful")} 
              />
              <FeedbackButton 
                type="celebrate" 
                label="Celebrate" 
                icon={<Trophy className="h-3 w-3" />} 
                selected={startedFeedback === "celebrate"} 
                onSelect={() => setStartedFeedback("celebrate")} 
              />
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Moneco Mission and Long-term Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              Moneco's mission is to empower the African diaspora with accessible, affordable, and inclusive financial services that bridge the gap between their host countries and home countries. By leveraging technology, Moneco aims to reduce the cost of remittances, provide transparent banking services, and create economic opportunities for Africans worldwide.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              The long-term vision of Moneco is to become the leading financial platform for the global African community, facilitating not just money transfers but also investments, business financing, and wealth creation opportunities that contribute to the development of African economies while improving the financial well-being of the diaspora.
            </p>
            <div className="mt-4 flex gap-2">
              <FeedbackButton 
                type="support" 
                label="Support" 
                icon={<Heart className="h-3 w-3" />} 
                selected={visionFeedback === "support"} 
                onSelect={() => setVisionFeedback("support")} 
              />
              <FeedbackButton 
                type="insightful" 
                label="Insightful" 
                icon={<ThumbsUp className="h-3 w-3" />} 
                selected={visionFeedback === "insightful"} 
                onSelect={() => setVisionFeedback("insightful")} 
              />
              <FeedbackButton 
                type="celebrate" 
                label="Celebrate" 
                icon={<Trophy className="h-3 w-3" />} 
                selected={visionFeedback === "celebrate"} 
                onSelect={() => setVisionFeedback("celebrate")} 
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;
