
import { useState } from "react";
import { Banknote, BadgeDollarSign, UserPlus, FileText, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SubscriptionDialog } from "@/components/SubscriptionDialog";
import { Language, translations } from "@/utils/translations";
import PageHeader from "@/components/PageHeader";
import StatsSection from "@/components/StatsSection";
import BriefSection from "@/components/BriefSection";
import CompaniesSection from "@/components/CompaniesSection";
import LeadershipSection from "@/components/LeadershipSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DocumentsSection from "@/components/DocumentsSection";
import AboutDialog from "@/components/AboutDialog";
import TestimonialsDialog from "@/components/TestimonialsDialog";

const Index = () => {
  const [showSubscriptionMessage, setShowSubscriptionMessage] = useState(false);
  const [showReadMoreDialog, setShowReadMoreDialog] = useState(false);
  const [showTestimonialsDialog, setShowTestimonialsDialog] = useState(false);
  
  const [briefFeedback, setBriefFeedback] = useState<string | null>(null);
  const [startedFeedback, setStartedFeedback] = useState<string | null>(null);
  const [visionFeedback, setVisionFeedback] = useState<string | null>(null);
  const [testimonialsFeedback, setTestimonialsFeedback] = useState<string | null>(null);
  
  const [selectedLeaderId, setSelectedLeaderId] = useState<number | null>(null);
  
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false);
  const [showRequestAccessDialog, setShowRequestAccessDialog] = useState(false);
  const [showFounderUpdatesDialog, setShowFounderUpdatesDialog] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  const stats = [
    {
      title: "$ 83 Billions",
      description: "Yearly financial transfers (Remittances) from Europe to Africa",
      source: "world bank",
      animate: false,
      icon: <Banknote className="h-5 w-5" />,
      sourceUrl: "https://www.worldbank.org/en/topic/migrationremittancesdiasporaissues/brief/migration-remittances-data",
      variant: "highlight" as const
    },
    {
      title: "Save $15",
      description: "Moneco customers save on average $15 on a $200 transfer, paying only 25¢ in fees.",
      source: "Moneco Website - Pricing",
      animate: false,
      icon: <BadgeDollarSign className="h-5 w-5" />,
      sourceUrl: "https://moneco.app/pricing",
      variant: "default" as const
    },
    {
      title: "24'000",
      description: "Accounts opened since 2023",
      source: "Mixpanel",
      animate: true,
      finalValue: 24357,
      animationDuration: 20000,
      icon: <UserPlus className="h-5 w-5" />,
      sourceUrl: "https://mixpanel.com",
      variant: "outlined" as const
    }
  ];

  const leaders = [
    {
      name: "Shams Badakaly",
      role: "Co-Founder",
      image: "/lovable-uploads/9f121106-7082-4599-8e55-b282061c34be.png",
      gradientVariant: "primary" as const
    },
    {
      name: "Jimmy Kwasi KUMAKO",
      role: "Co-Founder",
      image: "/lovable-uploads/8511c5d7-9c93-4ca5-95ed-ebcf7be428b4.png",
      gradientVariant: "secondary" as const
    },
    {
      name: "Bilal Dahlab",
      role: "Co-Founder",
      image: "/lovable-uploads/dafeaeae-e1af-4bfe-90d0-728fa23ae389.png",
      gradientVariant: "tertiary" as const
    }
  ];

  const allTestimonials = [
    {
      quote: "Professional, real-time instant transfer, lower fees compared to other banks, full of benefits, I am satisfied with Moneco's services. I recommend 10000%.",
      author: "youcef-udbylakoub",
      source: "Trust pilot | Translated from French"
    },
    {
      quote: "I recently discovered the Moneco app, and my experience has been very positive. Money transfers, whether sending or receiving funds, are done instantly without any hassle. Additionally, I was pleasantly surprised by how quickly my card was delivered, arriving in just 4 days. In summary, I find Moneco to be a reliable and convenient app for managing my finances effectively ❤️👌.",
      author: "Miloud Ferhati",
      source: "Trust pilot | Translated from French"
    },
    {
      quote: "The Moneco app has fundamentally changed how I send money back home. The fees are significantly lower than what I was paying with my previous provider, and the transfers are instantaneous.",
      author: "Emmanuel K.",
      source: "App Store Review"
    },
    {
      quote: "As someone who regularly sends money to family in Senegal, this app has been a game-changer. The exchange rates are transparent, and I can track every transaction in real-time.",
      author: "Fatou Diop",
      source: "Google Play Store"
    },
    {
      quote: "The customer service team deserves special recognition. When I had an issue with my first transfer, they resolved it within minutes through the in-app chat.",
      author: "Mohamed A.",
      source: "Trust pilot"
    },
    {
      quote: "I've been using Moneco for six months now, and it has completely replaced my traditional bank for international transfers. The app is intuitive, and the fees are significantly lower.",
      author: "Chioma O.",
      source: "Community Forum"
    },
    {
      quote: "What sets Moneco apart is how easy they've made it to manage multiple currencies. I can hold euros and CFA francs in the same account without excessive conversion fees.",
      author: "Jean-Pierre M.",
      source: "Trust pilot"
    },
    {
      quote: "After trying several competing apps, I've settled on Moneco for all my remittance needs. The combination of speed, low fees, and user-friendly interface makes it the clear winner.",
      author: "Sarah L.",
      source: "LinkedIn"
    },
    {
      quote: "The ability to schedule recurring transfers has been incredibly helpful for sending my monthly support to my parents in Morocco. It's one less thing I have to remember to do.",
      author: "Karim B.",
      source: "Instagram"
    },
    {
      quote: "What I appreciate most about Moneco is the transparency. No hidden fees, clear exchange rates, and detailed receipts for every transaction.",
      author: "Grace A.",
      source: "Facebook"
    },
    {
      quote: "The verification process was smooth and quick - much faster than other financial apps I've tried. I was able to make my first transfer within an hour of downloading the app.",
      author: "Omar S.",
      source: "Trust pilot"
    },
    {
      quote: "Moneco understands the specific needs of African diaspora. The app feels like it was built specifically for people like me who regularly send money back home.",
      author: "Amina T.",
      source: "Twitter"
    }
  ];

  const documents = [
    {
      title: "Pitch Deck",
      size: "1.5 MB",
      icon: <FileText className="h-5 w-5" />,
      type: "request" as const
    },
    {
      title: "Sales Pitch",
      size: "1.3 MB",
      icon: <FileText className="h-5 w-5" />,
      type: "download" as const
    },
    {
      title: "Regulator Licence",
      size: "1.3 MB",
      icon: <FileText className="h-5 w-5" />,
      type: "request" as const
    }
  ];

  const companies = {
    investors: [
      { name: "Y Combinator", logo: "/lovable-uploads/4f5c927e-4a2e-4a61-99f5-6185a67da702.png", type: "Investor" },
      { name: "Kima Ventures", logo: "/lovable-uploads/de02de06-e53e-4866-9e3c-952c8e369ac0.png", type: "Investor" },
      { name: "Soma Ventures", logo: "/lovable-uploads/536a7bfb-a16f-4f9e-be24-31f0af390667.png", type: "Investor" },
      { name: "de/ce ventures", logo: "/lovable-uploads/8e8ebfc7-a5ae-4493-b096-9baed4818ef0.png", type: "Investor" },
      { name: "Bpifrance", logo: "/lovable-uploads/c937a99f-56e5-44b0-8b6a-81c7e5cccd23.png", type: "Investor" },
      { name: "Digital Africa", logo: "/lovable-uploads/1b190ff0-6e3e-43d2-8171-b71db395b4a4.png", type: "Investor" },
    ],
    regulators: [
      { name: "ACPR", logo: "/lovable-uploads/06e65e90-337c-414d-a709-379d102e3861.png", type: "Regulator" },
    ]
  };

  const educationInstitutions = [
    { 
      name: "ESSEC Business School", 
      logo: "/lovable-uploads/18aa2c18-0c27-42f0-8d40-fe30cf8c9a9c.png",
      url: "https://www.linkedin.com/school/essec-business-school/" 
    },
    { 
      name: "Y Combinator", 
      logo: "/lovable-uploads/4f5c927e-4a2e-4a61-99f5-6185a67da702.png",
      url: "https://www.linkedin.com/school/y-combinator/" 
    },
    { 
      name: "Université Cheikh Anta Diop de Dakar", 
      logo: "/lovable-uploads/b54b1bf5-3ac6-484c-9a68-443036c99fd4.png",
      url: "https://www.linkedin.com/school/universit%C3%A9-cheikh-anta-diop-de-dakar/" 
    },
    { 
      name: "ESCP Business School", 
      logo: "/lovable-uploads/d32ea322-8c49-406e-8039-5a1999b02889.png",
      url: "https://www.linkedin.com/school/escp-business-school/" 
    },
    { 
      name: "University of St. Gallen", 
      logo: "/lovable-uploads/9ddc31e9-81d6-4a88-b941-79a24156f398.png",
      url: "https://www.linkedin.com/school/university-of-st-gallen/" 
    }
  ];

  const previousCompanies = [
    { 
      name: "Paystack", 
      url: "https://www.linkedin.com/company/paystack/",
      logo: "/lovable-uploads/900a9b36-6a42-4402-bddc-c24cf2e63762.png"
    },
    { 
      name: "CoinAfrique", 
      url: "https://www.linkedin.com/company/coinafrique/",
      logo: "/lovable-uploads/205ace63-228b-45bb-a619-2ff7d56df767.png"
    },
    { 
      name: "Boston Consulting Group", 
      url: "https://www.linkedin.com/company/boston-consulting-group/",
      logo: "/lovable-uploads/65baf527-81c0-43b5-862c-0b50ba7c1549.png"
    },
    { 
      name: "Société Générale CIB", 
      url: "https://www.linkedin.com/company/societegenerale-corporate-and-investment-banking/",
      logo: "/lovable-uploads/a8b528ed-38de-4353-b04b-53546fac0d11.png"
    },
    { 
      name: "Proparco", 
      url: "https://www.linkedin.com/company/proparco/",
      logo: "/lovable-uploads/fa9eff54-9889-44bf-9626-dca8265c06d5.png"
    },
    { 
      name: "ABB", 
      url: "https://www.linkedin.com/company/abb/",
      logo: "/lovable-uploads/1165f161-e7ab-47bb-b1c3-75dcd09e8485.png"
    },
    { 
      name: "Lombard Odier", 
      url: "https://www.linkedin.com/company/lombard-odier/",
      logo: "/lovable-uploads/3eba50ec-a606-4c16-8628-b9f0b54b5720.png"
    }
  ];

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

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language as Language);
  };

  const t = translations[currentLanguage];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl flex-grow">
        <section className="mb-10">
          <PageHeader 
            tagline={t.tagline}
            subtitle={t.subtitle}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />
          
          <StatsSection stats={stats} />
          
          <BriefSection 
            inBrief={t.inBrief}
            inBriefText={t.inBriefText}
            readMore={t.readMore}
            onReadMoreClick={() => setShowReadMoreDialog(true)}
          />
        </section>
        
        <CompaniesSection 
          title={t.theyWorkWithUs}
          companies={companies}
        />
        
        <LeadershipSection 
          title={t.leadershipTeam}
          subtitle={t.leadershipSubtitle}
          leaders={leaders}
          educationTitle={t.education}
          educationInstitutions={educationInstitutions}
          previousCompaniesTitle={t.previousCompanies}
          previousCompanies={previousCompanies}
          connectText={t.connectWithLeadership}
          subscribeText={t.subscribeForUpdates}
          onSubscribe={handleSubscribe}
          onFounderUpdates={handleFounderUpdates}
          selectedLeaderId={selectedLeaderId}
          setSelectedLeaderId={setSelectedLeaderId}
        />
        
        <TestimonialsSection 
          title={t.customerVerbatim}
          readOtherTestimonials={t.readOtherTestimonials}
          testimonials={allTestimonials}
          onReadMoreClick={() => setShowTestimonialsDialog(true)}
        />
        
        <DocumentsSection 
          title={t.investorDocuments}
          documents={documents}
          onRequestAccess={handleRequestAccess}
        />
      </main>
      
      <Footer />
      
      {/* Dialogs */}
      <AboutDialog 
        open={showReadMoreDialog}
        onOpenChange={setShowReadMoreDialog}
        aboutTitle={t.aboutMoneco}
        inBriefTitle={t.inBrief}
        inBriefFullText={t.inBriefFullText}
        howStartedTitle={t.howMonecoStarted}
        startedText={t.startedText}
        missionTitle={t.mission}
        missionText={t.missionText}
        visionText={t.vision}
        supportLabel={t.support}
        insightfulLabel={t.insightful}
        celebrateLabel={t.celebrate}
        briefFeedback={briefFeedback}
        startedFeedback={startedFeedback}
        visionFeedback={visionFeedback}
        onBriefFeedback={setBriefFeedback}
        onStartedFeedback={setStartedFeedback}
        onVisionFeedback={setVisionFeedback}
      />
      
      <TestimonialsDialog 
        open={showTestimonialsDialog}
        onOpenChange={setShowTestimonialsDialog}
        title={t.customerTestimonials}
        whatDoYouThinkText={t.whatDoYouThink}
        supportLabel={t.support}
        insightfulLabel={t.insightful}
        celebrateLabel={t.celebrate}
        testimonials={allTestimonials}
        testimonialsFeedback={testimonialsFeedback}
        onTestimonialsFeedback={setTestimonialsFeedback}
      />
      
      <SubscriptionDialog 
        open={showSubscribeDialog} 
        onOpenChange={setShowSubscribeDialog} 
      />
      
      <SubscriptionDialog
        open={showFounderUpdatesDialog}
        onOpenChange={setShowFounderUpdatesDialog}
        variant="founder"
      />
      
      <SubscriptionDialog
        open={showRequestAccessDialog}
        onOpenChange={setShowRequestAccessDialog}
        variant="request"
        documentTitle={currentDocument}
      />
    </div>
  );
};

export default Index;
