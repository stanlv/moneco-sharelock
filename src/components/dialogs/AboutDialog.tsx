
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
              Moneco is the financial app for Africans in Europe. We go through the same difficulties as you, that's why we've developed a solution. Opening an account, dealing with the prefecture, finding a place to live without a guarantor, sending money back home - your challenges are also ours. Moneco enables users to open an account in just 5 minutes with only a passport (French IBAN), access an international Visa payment card, and process wire transfers at lower costs. In addition, Moneco eases the settlement of Africans in France with its free tool, Destination France, which maps all the migration procedures. We've also developed partnerships to answer basic settlement needs (garant, housing insurance, sim card, etc).
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
              Through our personal and professional backgrounds, we are particularly familiar with the challenges of French-speaking Africa and the difficulties associated with migration. Some of us have spent our entire lives on the continent, others have migrated to Europe, and others were born in Europe from families of the diaspora - the Moneco team represents all the specificities of the diaspora. This diversity of experiences gives us unique insights into the challenges faced by Africans in Europe and has driven us to create solutions that address these specific needs.
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
              Moneco's mission is to empower the African diaspora in Europe with accessible, affordable, and inclusive financial services that address their unique challenges. By leveraging technology, Moneco aims to reduce the cost of remittances, provide transparent banking services, and create economic opportunities for Africans in Europe while maintaining their connection to home.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              The long-term vision of Moneco extends beyond just financial services. We aim to become a comprehensive platform that supports the entire journey of Africans in Europe - from the initial settlement process to building financial stability and creating wealth for future generations. Through tools like Destination France and partnerships focused on essential needs, we're working to remove barriers and create pathways to success for the African diaspora.
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
