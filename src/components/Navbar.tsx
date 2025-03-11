
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/b8b691e3-1cf2-49bd-ad98-97ca0397cbfe.png"
            alt="Moneco Logo" 
            className="h-8 w-auto"
          />
          <span className="font-semibold text-xl text-gray-800">Moneco</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="#" className={cn(
            "text-gray-700 hover:text-gray-900",
            "hidden md:inline-block" // Hide on mobile
          )}>
            Shareholders Relations Page
          </a>
          
          <Button 
            variant="moneco" 
            className="shadow-sm group transition-all duration-300"
          >
            <Share2 className="w-4 h-4 mr-1 transition-transform group-hover:rotate-12" />
            Share Investor Page
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
