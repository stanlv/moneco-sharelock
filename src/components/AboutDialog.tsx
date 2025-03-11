
import { ReactNode } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Heart, ThumbsUp, Trophy } from "lucide-react";

interface FeedbackButtonProps {
  type: string;
  label: string;
  icon: ReactNode;
  selected: boolean;
  onSelect: () => void;
}

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  aboutTitle: string;
  inBriefTitle: string;
  inBriefFullText: string;
  howStartedTitle: string;
  startedText: string;
  missionTitle: string;
  missionText: string;
  visionText: string;
  supportLabel: string;
  insightfulLabel: string;
  celebrateLabel: string;
  briefFeedback: string | null;
  startedFeedback: string | null;
  visionFeedback: string | null;
  onBriefFeedback: (feedback: string) => void;
  onStartedFeedback: (feedback: string) => void;
  onVisionFeedback: (feedback: string) => void;
}

const FeedbackButton = ({ 
  type, 
  label, 
  icon, 
  selected, 
  onSelect 
}: FeedbackButtonProps) => (
  <button
    onClick={onSelect}
    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors
      ${selected 
        ? "bg-teal-100 text-teal-800 border border-teal-300" 
        : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent"
      }`}
  >
    {icon}
    {label}
  </button>
);

const AboutDialog = ({
  open,
  onOpenChange,
  aboutTitle,
  inBriefTitle,
  inBriefFullText,
  howStartedTitle,
  startedText,
  missionTitle,
  missionText,
  visionText,
  supportLabel,
  insightfulLabel,
  celebrateLabel,
  briefFeedback,
  startedFeedback,
  visionFeedback,
  onBriefFeedback,
  onStartedFeedback,
  onVisionFeedback
}: AboutDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold">{aboutTitle}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 py-4">
          <div>
            <h3 className="text-xl font-semibold mb-4">{inBriefTitle}</h3>
            <p className="text-gray-700 leading-relaxed">
              {inBriefFullText}
            </p>
            <div className="mt-4 flex gap-2">
              <FeedbackButton 
                type="support" 
                label={supportLabel} 
                icon={<Heart className="h-3 w-3" />} 
                selected={briefFeedback === "support"} 
                onSelect={() => onBriefFeedback("support")} 
              />
              <FeedbackButton 
                type="insightful" 
                label={insightfulLabel} 
                icon={<ThumbsUp className="h-3 w-3" />} 
                selected={briefFeedback === "insightful"} 
                onSelect={() => onBriefFeedback("insightful")} 
              />
              <FeedbackButton 
                type="celebrate" 
                label={celebrateLabel} 
                icon={<Trophy className="h-3 w-3" />} 
                selected={briefFeedback === "celebrate"} 
                onSelect={() => onBriefFeedback("celebrate")} 
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">{howStartedTitle}</h3>
            <p className="text-gray-700 leading-relaxed">
              {startedText}
            </p>
            <div className="mt-4 flex gap-2">
              <FeedbackButton 
                type="support" 
                label={supportLabel} 
                icon={<Heart className="h-3 w-3" />} 
                selected={startedFeedback === "support"} 
                onSelect={() => onStartedFeedback("support")} 
              />
              <FeedbackButton 
                type="insightful" 
                label={insightfulLabel} 
                icon={<ThumbsUp className="h-3 w-3" />} 
                selected={startedFeedback === "insightful"} 
                onSelect={() => onStartedFeedback("insightful")} 
              />
              <FeedbackButton 
                type="celebrate" 
                label={celebrateLabel} 
                icon={<Trophy className="h-3 w-3" />} 
                selected={startedFeedback === "celebrate"} 
                onSelect={() => onStartedFeedback("celebrate")} 
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">{missionTitle}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {missionText}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {visionText}
            </p>
            <div className="mt-4 flex gap-2">
              <FeedbackButton 
                type="support" 
                label={supportLabel} 
                icon={<Heart className="h-3 w-3" />} 
                selected={visionFeedback === "support"} 
                onSelect={() => onVisionFeedback("support")} 
              />
              <FeedbackButton 
                type="insightful" 
                label={insightfulLabel} 
                icon={<ThumbsUp className="h-3 w-3" />} 
                selected={visionFeedback === "insightful"} 
                onSelect={() => onVisionFeedback("insightful")} 
              />
              <FeedbackButton 
                type="celebrate" 
                label={celebrateLabel} 
                icon={<Trophy className="h-3 w-3" />} 
                selected={visionFeedback === "celebrate"} 
                onSelect={() => onVisionFeedback("celebrate")} 
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;
