
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Language } from "@/utils/translations";

interface BriefSectionProps {
  inBrief: string;
  inBriefText: string;
  readMore: string;
  onReadMoreClick: () => void;
}

const BriefSection = ({ inBrief, inBriefText, readMore, onReadMoreClick }: BriefSectionProps) => {
  return (
    <Card className="p-5 bg-gray-50 border-0 shadow-none">
      <h2 className="font-medium text-lg mb-2">{inBrief}</h2>
      <p className="text-gray-600 text-sm">
        {inBriefText}
      </p>
      <Button 
        variant="link" 
        className="text-teal-600 p-0 mt-2 h-auto flex items-center text-sm"
        onClick={onReadMoreClick}
      >
        {readMore} <ChevronRight className="h-3 w-3 ml-1" />
      </Button>
    </Card>
  );
};

export default BriefSection;
