
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  // Create a global event listener for language changes
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      setIsChangingLanguage(true);
      setTimeout(() => setIsChangingLanguage(false), 500);
    };

    window.addEventListener('languageChange' as any, handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange' as any, handleLanguageChange);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className={`transition-opacity duration-300 ease-in-out ${isChangingLanguage ? 'opacity-0' : 'opacity-100'}`}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index 
                onLanguageChangeStart={() => setIsChangingLanguage(true)} 
                onLanguageChangeEnd={() => setIsChangingLanguage(false)} 
              />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
