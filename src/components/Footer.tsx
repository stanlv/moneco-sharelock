
import { Link2 } from "lucide-react";
import { format, subHours } from "date-fns";

const Footer = () => {
  // Get current date/time and subtract 2 hours
  const lastUpdatedDate = subHours(new Date(), 2);
  const formattedDate = format(lastUpdatedDate, "MMMM d, yyyy 'at' h:mm a");
  
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/b8b691e3-1cf2-49bd-ad98-97ca0397cbfe.png"
              alt="Moneco Logo" 
              className="h-6 w-auto"
            />
            <span className="text-gray-700 font-medium">Moneco</span>
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-2">
            <a 
              href="https://moneco.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1 group"
            >
              <span className="group-hover:underline">Visit moneco.app</span>
              <Link2 className="h-4 w-4" />
            </a>
            
            <p className="text-xs text-gray-500 italic">
              <span className="underline">Last updated:</span> {formattedDate}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
