
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-teal-500 rounded-md"></div>
          <span className="text-2xl font-bold">moneco</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="#" className={cn(
            "text-gray-700 hover:text-gray-900",
            "hidden md:inline-block" // Hide on mobile
          )}>
            Shareholders Relations Page
          </a>
          
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
            Share Investor Page
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
