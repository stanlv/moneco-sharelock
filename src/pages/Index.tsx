import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SubscriptionDialog } from "@/components/SubscriptionDialog";
import HeroSection from "@/components/sections/HeroSection";
import PartnersSection from "@/components/sections/PartnersSection";
import LeadershipSection from "@/components/sections/LeadershipSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import DocumentsSection from "@/components/sections/DocumentsSection";
import AboutDialog from "@/components/dialogs/AboutDialog";
import TestimonialsDialog from "@/components/dialogs/TestimonialsDialog";

interface IndexProps {
  onLanguageChangeStart?: () => void;
  onLanguageChangeEnd?: () => void;
}

const Index = ({ onLanguageChangeStart, onLanguageChangeEnd }: IndexProps) => {
  const [showReadMoreDialog, setShowReadMoreDialog] = useState(false);
  const [showTestimonialsDialog, setShowTestimonialsDialog] = useState(false);
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false);
  const [showRequestAccessDialog, setShowRequestAccessDialog] = useState(false);
  const [showFounderUpdatesDialog, setShowFounderUpdatesDialog] = useState(false);
  
  const [currentDocument, setCurrentDocument] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");

  const handleLanguageChange = (language: string) => {
    if (onLanguageChangeStart) {
      onLanguageChangeStart();
    }
    
    setCurrentLanguage(language);
    
    if (onLanguageChangeEnd) {
      onLanguageChangeEnd();
    }
  };

  const handleSubscribe = () => {
    setShowSubscribeDialog(true);
  };

  const handleFounderUpdates = () => {
    setShowFounderUpdatesDialog(true);
  };

  const handleRequestAccess = (documentTitle: string) => {
    setCurrentDocument(documentTitle);
    setShowRequestAccessDialog(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl flex-grow">
        <HeroSection 
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          onReadMoreClick={() => setShowReadMoreDialog(true)}
        />
        
        <PartnersSection />
        
        <LeadershipSection 
          onSubscribe={handleSubscribe}
          onFounderUpdates={handleFounderUpdates}
        />
        
        <TestimonialsSection 
          onViewAllClick={() => setShowTestimonialsDialog(true)}
        />
        
        <DocumentsSection 
          onRequestAccess={handleRequestAccess}
        />
      </main>

      <Footer />

      <AboutDialog 
        open={showReadMoreDialog}
        onOpenChange={setShowReadMoreDialog}
      />
      
      <TestimonialsDialog 
        open={showTestimonialsDialog}
        onOpenChange={setShowTestimonialsDialog}
      />
      
      <SubscriptionDialog
        open={showSubscribeDialog}
        onOpenChange={setShowSubscribeDialog}
        type="subscribe"
      />

      <SubscriptionDialog
        open={showRequestAccessDialog}
        onOpenChange={setShowRequestAccessDialog}
        type="requestAccess"
        documentTitle={currentDocument || undefined}
      />

      <SubscriptionDialog
        open={showFounderUpdatesDialog}
        onOpenChange={setShowFounderUpdatesDialog}
        type="founderUpdates"
      />
    </div>
  );
};

export default Index;
