
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ReactNode, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DocumentCardProps {
  title: string;
  size: string;
  icon: ReactNode;
  type: "download" | "request";
  onRequestAccess?: () => void;
}

const DocumentCard = ({ title, size, icon, type, onRequestAccess }: DocumentCardProps) => {
  const [requested, setRequested] = useState(false);
  const { toast } = useToast();

  const handleAction = () => {
    if (type === "download") {
      toast({
        title: "Download started",
        description: `${title} (${size}) is downloading...`,
      });
    } else if (onRequestAccess) {
      onRequestAccess();
    } else {
      setRequested(true);
      toast({
        title: "Access requested",
        description: "We'll review your request and get back to you shortly.",
      });
    }
  };

  return (
    <Card className="p-4 border border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {icon}
          <div className="ml-3">
            <h3 className="font-medium text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{size}</p>
          </div>
        </div>
        
        <Button 
          onClick={handleAction}
          variant={type === "download" ? "outline" : "secondary"}
          className={type === "download" ? "border-gray-300" : "bg-gray-700 hover:bg-gray-800 text-white"}
          disabled={type === "request" && requested && !onRequestAccess}
        >
          {type === "download" ? (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download
            </>
          ) : requested && !onRequestAccess ? (
            "Requested"
          ) : (
            "Request access"
          )}
        </Button>
      </div>
    </Card>
  );
};

export default DocumentCard;
