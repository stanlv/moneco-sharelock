import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, Users, Award, ChevronRight, Heart, ThumbsUp, Trophy, Coins, Link, Star, Shield, Briefcase, GraduationCap, Banknote, BadgeDollarSign, UserPlus, Quote, Globe, Languages } from "lucide-react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import LeadershipCard from "@/components/LeadershipCard";
import TestimonialCard from "@/components/TestimonialCard";
import DocumentCard from "@/components/DocumentCard";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import CompanyCard from "@/components/CompanyCard";
import { SubscriptionDialog } from "@/components/SubscriptionDialog";
import LanguageSelector from "@/components/LanguageSelector";

interface IndexProps {
  onLanguageChangeStart?: () => void;
  onLanguageChangeEnd?: () => void;
}

const Index = ({ onLanguageChangeStart, onLanguageChangeEnd }: IndexProps) => {
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
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");

  const translations = {
    en: {
      tagline: "The financial application for the African diaspora",
      subtitle: "#technology #emergingmarkets #impact",
      statsTitle: "They work with us",
      leadershipTitle: "Leadership Team",
      leadershipSubtitle: "Meet the brilliant minds behind Moneco",
      educationTitle: "Education",
      previousCompaniesTitle: "Previous Companies",
      connectTitle: "Connect with Moneco's Leadership",
      subscribeButton: "Subscribe for Direct Updates",
      testimonialsTitle: "Customer Verbatim",
      readMoreTestimonials: "Read 10 other customer testimonials",
      documentsTitle: "Investors Documents",
      inBrief: {
        title: "In brief",
        content: "Moneco is a financial application designed primarily for the African diaspora, offering a range of financial services tailored to ease the financial integration and operations for Africans living abroad, especially in Europe. Moneco aims to provide a secure and convenient financial tool for Africans abroad, simplifying money management and enabling easy access to financial services both in their home countries and abroad.",
        readMore: "Read more"
      },
      dialog: {
        aboutTitle: "About Moneco",
        inBriefTitle: "In Brief",
        inBriefContent: "Moneco is a financial application designed primarily for the African diaspora, offering a range of financial services tailored to ease the financial integration and operations for Africans living abroad, especially in Europe. Moneco aims to provide a secure and convenient financial tool for Africans abroad, simplifying money management and enabling easy access to financial services both in their home countries and abroad. For more detailed information on their services and features.",
        startedTitle: "How Moneco Started",
        startedContent: "Moneco was founded in 2022 by a team of African professionals with experience in fintech and banking who recognized the challenges faced by the African diaspora in accessing affordable financial services. The founders, having personally experienced the high costs and limitations of traditional banking systems for cross-border transactions, set out to create a solution that would specifically address these pain points. Starting with remittance services, Moneco has since expanded to offer a comprehensive suite of financial tools tailored to the unique needs of Africans living abroad.",
        visionTitle: "Moneco Mission and Long-term Vision",
        visionContent1: "Moneco's mission is to empower the African diaspora with accessible, affordable, and inclusive financial services that bridge the gap between their host countries and home countries. By leveraging technology, Moneco aims to reduce the cost of remittances, provide transparent banking services, and create economic opportunities for Africans worldwide.",
        visionContent2: "The long-term vision of Moneco is to become the leading financial platform for the global African community, facilitating not just money transfers but also investments, business financing, and wealth creation opportunities that contribute to the development of African economies while improving the financial well-being of the diaspora."
      },
      testimonials: {
        dialogTitle: "Customer Testimonials",
        feedbackQuestion: "What do you think about our customers' feedback?"
      },
      feedback: {
        support: "Support",
        insightful: "Insightful",
        celebrate: "Celebrate"
      },
      stats: [
        {
          title: "$ 83 Billions",
          description: "Yearly financial transfers (Remittances) from Europe to Africa",
          source: "world bank"
        },
        {
          title: "Save $15",
          description: "Moneco customers save on average $15 on a $200 transfer, paying only 25¢ in fees.",
          source: "Moneco Website - Pricing"
        },
        {
          title: "24'000",
          description: "Accounts opened since 2023",
          source: "Mixpanel"
        }
      ]
    },
    fr: {
      tagline: "L'application financière pour la diaspora africaine",
      subtitle: "#technologie #marchésémergents #impact",
      statsTitle: "Ils travaillent avec nous",
      leadershipTitle: "Équipe de direction",
      leadershipSubtitle: "Rencontrez les brillants esprits derrière Moneco",
      educationTitle: "Formation",
      previousCompaniesTitle: "Entreprises précédentes",
      connectTitle: "Connectez-vous avec les dirigeants de Moneco",
      subscribeButton: "S'abonner aux mises à jour directes",
      testimonialsTitle: "Témoignages clients",
      readMoreTestimonials: "Lire 10 autres témoignages clients",
      documentsTitle: "Documents pour investisseurs",
      inBrief: {
        title: "En bref",
        content: "Moneco est une application financière conçue principalement pour la diaspora africaine, offrant une gamme de services financiers adaptés pour faciliter l'intégration et les opérations financières des Africains vivant à l'étranger, en particulier en Europe. Moneco vise à fournir un outil financier sécurisé et pratique pour les Africains à l'étranger, simplifiant la gestion de l'argent et permettant un accès facile aux services financiers tant dans leurs pays d'origine qu'à l'étranger.",
        readMore: "Lire plus"
      },
      dialog: {
        aboutTitle: "À propos de Moneco",
        inBriefTitle: "En bref",
        inBriefContent: "Moneco est une application financière conçue principalement pour la diaspora africaine, offrant une gamme de services financiers adaptés pour faciliter l'intégration et les opérations financières des Africains vivant à l'étranger, en particulier en Europe. Moneco vise à fournir un outil financier sécurisé et pratique pour les Africains à l'étranger, simplifiant la gestion de l'argent et permettant un accès facile aux services financiers tant dans leurs pays d'origine qu'à l'étranger. Pour plus d'informations détaillées sur leurs services et fonctionnalités.",
        startedTitle: "Comment Moneco a commencé",
        startedContent: "Moneco a été fondée en 2022 par une équipe de professionnels africains ayant une expérience dans la fintech et la banque qui ont reconnu les défis auxquels est confrontée la diaspora africaine pour accéder à des services financiers abordables. Les fondateurs, ayant personnellement vécu les coûts élevés et les limitations des systèmes bancaires traditionnels pour les transactions transfrontalières, ont entrepris de créer une solution qui répondrait spécifiquement à ces points de douleur. En commençant par les services de transfert d'argent, Moneco s'est depuis étendu pour offrir une suite complète d'outils financiers adaptés aux besoins uniques des Africains vivant à l'étranger.",
        visionTitle: "Mission et vision à long terme de Moneco",
        visionContent1: "La mission de Moneco est de donner à la diaspora africaine des services financiers accessibles, abordables et inclusifs qui comblent le fossé entre leurs pays d'accueil et leurs pays d'origine. En tirant parti de la technologie, Moneco vise à réduire le coût des envois de fonds, à fournir des services bancaires transparents et à créer des opportunités économiques pour les Africains du monde entier.",
        visionContent2: "La vision à long terme de Moneco est de devenir la principale plateforme financière pour la communauté africaine mondiale, facilitant non seulement les transferts d'argent mais aussi les investissements, le financement des entreprises et les opportunités de création de richesse qui contribuent au développement des économies africaines tout en améliorant le bien-être financier de la diaspora."
      },
      testimonials: {
        dialogTitle: "Témoignages clients",
        feedbackQuestion: "Que pensez-vous des commentaires de nos clients ?"
      },
      feedback: {
        support: "Soutien",
        insightful: "Perspicace",
        celebrate: "Célébrer"
      },
      stats: [
        {
          title: "83 milliards $",
          description: "Transferts financiers annuels (Transferts d'argent) de l'Europe vers l'Afrique",
          source: "Banque mondiale"
        },
        {
          title: "Économisez 15 $",
          description: "Les clients de Moneco économisent en moyenne 15 $ sur un transfert de 200 $, en ne payant que 25 centimes de frais.",
          source: "Site Web Moneco - Prix"
        },
        {
          title: "24 000",
          description: "Comptes ouverts depuis 2023",
          source: "Mixpanel"
        }
      ]
    },
    it: {
      tagline: "L'applicazione finanziaria per la diaspora africana",
      subtitle: "#tecnologia #mercatiemergenti #impatto",
      statsTitle: "Lavorano con noi",
      leadershipTitle: "Team di leadership",
      leadershipSubtitle: "Incontra le menti brillanti dietro Moneco",
      educationTitle: "Formazione",
      previousCompaniesTitle: "Aziende precedenti",
      connectTitle: "Connettiti con la leadership di Moneco",
      subscribeButton: "Iscriviti per aggiornamenti diretti",
      testimonialsTitle: "Testimonianze dei clienti",
      readMoreTestimonials: "Leggi altre 10 testimonianze dei clienti",
      documentsTitle: "Documenti per investitori",
      inBrief: {
        title: "In breve",
        content: "Moneco è un'applicazione finanziaria progettata principalmente per la diaspora africana, che offre una gamma di servizi finanziari su misura per facilitare l'integrazione finanziaria e le operazioni per gli africani che vivono all'estero, specialmente in Europa. Moneco mira a fornire uno strumento finanziario sicuro e conveniente per gli africani all'estero, semplificando la gestione del denaro e consentendo un facile accesso ai servizi finanziari sia nei loro paesi d'origine che all'estero.",
        readMore: "Leggi di più"
      },
      dialog: {
        aboutTitle: "Su Moneco",
        inBriefTitle: "In breve",
        inBriefContent: "Moneco è un'applicazione finanziaria progettata principalmente per la diaspora africana, che offre una gamma di servizi finanziari su misura per facilitare l'integrazione finanziaria e le operazioni per gli africani che vivono all'estero, specialmente in Europa. Moneco mira a fornire uno strumento finanziario sicuro e conveniente per gli africani all'estero, semplificando la gestione del denaro e consentendo un facile accesso ai servizi finanziari sia nei loro paesi d'origine che all'estero. Per informazioni più dettagliate sui loro servizi e funzionalità.",
        startedTitle: "Come è iniziato Moneco",
        startedContent: "Moneco è stata fondata nel 2022 da un team di professionisti africani con esperienza in fintech e banking che hanno riconosciuto le sfide affrontate dalla diaspora africana nell'accedere a servizi finanziari a prezzi accessibili. I fondatori, avendo sperimentato personalmente gli alti costi e le limitazioni dei sistemi bancari tradizionali per le transazioni transfrontaliere, si sono prefissati di creare una soluzione che affrontasse specificamente questi punti dolenti. Partendo dai servizi di rimessa, Moneco ha da allora ampliato per offrire una suite completa di strumenti finanziari su misura per le esigenze uniche degli africani che vivono all'estero.",
        visionTitle: "Missione e visione a lungo termine di Moneco",
        visionContent1: "La missione di Moneco è di dare potere alla diaspora africana con servizi finanziari accessibili, convenienti e inclusivi che colmino il divario tra i loro paesi ospitanti e i paesi d'origine. Sfruttando la tecnologia, Moneco mira a ridurre il costo delle rimesse, fornire servizi bancari trasparenti e creare opportunità economiche per gli africani in tutto il mondo.",
        visionContent2: "La visione a lungo termine di Moneco è di diventare la piattaforma finanziaria leader per la comunità africana globale, facilitando non solo trasferimenti di denaro ma anche investimenti, finanziamenti aziendali e opportunità di creazione di ricchezza che contribuiscono allo sviluppo delle economie africane migliorando al contempo il benessere finanziario della diaspora."
      },
      testimonials: {
        dialogTitle: "Testimonianze dei clienti",
        feedbackQuestion: "Cosa ne pensi dei feedback dei nostri clienti?"
      },
      feedback: {
        support: "Supporto",
        insightful: "Perspicace",
        celebrate: "Celebrare"
      },
      stats: [
        {
          title: "83 miliardi $",
          description: "Trasferimenti finanziari annuali (rimesse) dall'Europa all'Africa",
          source: "Banca Mondiale"
        },
        {
          title: "Risparmia $15",
          description: "I clienti Moneco risparmiano in media $15 su un trasferimento di $200, pagando solo 25¢ di commissioni.",
          source: "Sito Web Moneco - Prezzi"
        },
        {
          title: "24'000",
          description: "Account aperti dal 2023",
          source: "Mixpanel"
        }
      ]
    },
    de: {
      tagline: "Die Finanzanwendung für die afrikanische Diaspora",
      subtitle: "#technologie #schwellenmärkte #wirkung",
      statsTitle: "Sie arbeiten mit uns",
      leadershipTitle: "Führungsteam",
      leadershipSubtitle: "Treffen Sie die brillanten Köpfe hinter Moneco",
      educationTitle: "Bildung",
      previousCompaniesTitle: "Frühere Unternehmen",
      connectTitle: "Verbinden Sie sich mit der Führung von Moneco",
      subscribeButton: "Abonnieren Sie direkte Updates",
      testimonialsTitle: "Kundenstimmen",
      readMoreTestimonials: "Lesen Sie 10 weitere Kundenbewertungen",
      documentsTitle: "Investorendokumente",
      inBrief: {
        title: "Kurz gesagt",
        content: "Moneco ist eine Finanzanwendung, die hauptsächlich für die afrikanische Diaspora entwickelt wurde und eine Reihe von Finanzdienstleistungen anbietet, die auf die finanzielle Integration und den Betrieb für Afrikaner im Ausland, insbesondere in Europa, zugeschnitten sind. Moneco zielt darauf ab, ein sicheres und bequemes Finanzwerkzeug für Afrikaner im Ausland bereitzustellen, die Geldverwaltung zu vereinfachen und einen einfachen Zugang zu Finanzdienstleistungen sowohl in ihren Heimatländern als auch im Ausland zu ermöglichen.",
        readMore: "Weiterlesen"
      },
      dialog: {
        aboutTitle: "Über Moneco",
        inBriefTitle: "Kurz gesagt",
        inBriefContent: "Moneco ist eine Finanzanwendung, die hauptsächlich für die afrikanische Diaspora entwickelt wurde und eine Reihe von Finanzdienstleistungen anbietet, die auf die finanzielle Integration und den Betrieb für Afrikaner im Ausland, insbesondere in Europa, zugeschnitten sind. Moneco zielt darauf ab, ein sicheres und bequemes Finanzwerkzeug für Afrikaner im Ausland bereitzustellen, die Geldverwaltung zu vereinfachen und einen einfachen Zugang zu Finanzdienstleistungen sowohl in ihren Heimatländern als auch im Ausland zu ermöglichen. Für detailliertere Informationen zu ihren Dienstleistungen und Funktionen.",
        startedTitle: "Wie Moneco begann",
        startedContent: "Moneco wurde 2022 von einem Team afrikanischer Fachleute mit Erfahrung in Fintech und Banking gegründet, die die Herausforderungen erkannten, mit denen die afrikanische Diaspora beim Zugang zu erschwinglichen Finanzdienstleistungen konfrontiert ist. Die Gründer, die persönlich die hohen Kosten und Einschränkungen traditioneller Bankensysteme für grenzüberschreitende Transaktionen erlebt hatten, machten sich daran, eine Lösung zu schaffen, die speziell diese Schmerzpunkte ansprechen würde. Beginnend mit Überweisungsdiensten hat Moneco seitdem erweitert, um eine umfassende Suite von Finanzwerkzeugen anzubieten, die auf die einzigartigen Bedürfnisse von Afrikanern im Ausland zugeschnitten sind.",
        visionTitle: "Monecos Mission und langfristige Vision",
        visionContent1: "Monecos Mission ist es, der afrikanischen Diaspora mit zugänglichen, erschwinglichen und inklusiven Finanzdienstleistungen zu stärken, die die Lücke zwischen ihren Gastländern und Heimatländern überbrücken. Durch den Einsatz von Technologie zielt Moneco darauf ab, die Kosten für Überweisungen zu senken, transparente Bankdienstleistungen anzubieten und wirtschaftliche Möglichkeiten für Afrikaner weltweit zu schaffen.",
        visionContent2: "Die langfristige Vision von Moneco ist es, die führende Finanzplattform für die globale afrikanische Gemeinschaft zu werden, die nicht nur Geldtransfers, sondern auch Investitionen, Unternehmensfinanzierungen und Möglichkeiten zur Vermögensbildung erleichtert, die zur Entwicklung afrikanischer Volkswirtschaften beitragen und gleichzeitig das finanzielle Wohlbefinden der Diaspora verbessern."
      },
      testimonials: {
        dialogTitle: "Kundenbewertungen",
        feedbackQuestion: "Was denken Sie über das Feedback unserer Kunden?"
      },
      feedback: {
        support: "Unterstützung",
        insightful: "Aufschlussreich",
        celebrate: "Feiern"
      },
      stats: [
        {
          title: "83 Milliarden $",
          description: "Jährliche Finanztransfers (Überweisungen) von Europa nach Afrika",
          source: "Weltbank"
        },
        {
          title: "Sparen Sie $15",
          description: "Moneco-Kunden sparen durchschnittlich $15 bei einer Überweisung von $200 und zahlen nur 25¢ an Gebühren.",
          source: "Moneco Website - Preisgestaltung"
        },
        {
          title: "24'000",
          description: "Konten eröffnet seit 2023",
          source: "Mixpanel"
        }
      ]
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

  const handleLanguageChange = (language: string) => {
    // Dispatch custom event to trigger the fade effect in App.tsx
    const event = new CustomEvent('languageChange');
    window.dispatchEvent(event);
    
    // Handle the language change
    if (onLanguageChangeStart) {
      onLanguageChangeStart();
    }
    
    setCurrentLanguage(language);
    
    if (onLanguageChangeEnd) {
      setTimeout(() => onLanguageChangeEnd(), 300);
    }
  };

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
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl flex-grow">
        <section className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">{translations[currentLanguage as keyof typeof translations].tagline}</h1>
              <p className="text-gray-500">{translations[currentLanguage as keyof typeof translations].subtitle}</p>
            </div>
            <LanguageSelector 
              currentLanguage={currentLanguage} 
              onLanguageChange={handleLanguageChange} 
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {translations[currentLanguage as keyof typeof translations].stats.map((stat, index) => (
              <StatCard 
                key={index} 
                title={stat.title} 
                description={stat.description} 
                source={stat.source} 
                animate={stats[index].animate}
                finalValue={stats[index].finalValue}
                animationDuration={stats[index].animationDuration}
                icon={stats[index].icon}
                sourceUrl={stats[index].sourceUrl}
                variant={stats[index].variant}
              />
            ))}
          </div>
          
          <Card className="p-5 bg-gray-50 border-0 shadow-none">
            <h2 className="font-medium text-lg mb-2">{translations[currentLanguage as keyof typeof translations].inBrief.title}</h2>
            <p className="text-gray-600 text-sm">
              {translations[currentLanguage as keyof typeof translations].inBrief.content}
            </p>
            <Button 
              variant="link" 
              className="text-teal-600 p-0 mt-2 h-auto flex items-center text-sm"
              onClick={() => setShowReadMoreDialog(true)}
            >
              {translations[currentLanguage as keyof typeof translations].inBrief.readMore} <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </Card>
        </section>
        
        <Dialog open={showReadMoreDialog} onOpenChange={setShowReadMoreDialog}>
          <DialogContent className="max-w-3xl p-8 max-h-[90vh] overflow-y-auto">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold">{translations[currentLanguage as keyof typeof translations].dialog.aboutTitle}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-8 py-4">
              <div>
                <h3 className="text-xl font-semibold mb-4">{translations[currentLanguage as keyof typeof translations].dialog.inBriefTitle}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {translations[currentLanguage as keyof typeof translations].dialog.inBriefContent}
                </p>
                <div className="mt-4 flex gap-2">
                  <FeedbackButton 
                    type="support" 
                    label={translations[currentLanguage as keyof typeof translations].feedback.support} 
                    icon={<Heart className="h-3 w-3" />} 
                    selected={briefFeedback === "support"} 
                    onSelect={() => setBriefFeedback("support")} 
                  />
                  <FeedbackButton 
                    type="insightful" 
                    label={translations[currentLanguage as keyof typeof translations].feedback.insightful} 
                    icon={<ThumbsUp className="h-3 w-3" />} 
                    selected={briefFeedback === "insightful"} 
                    onSelect={() => setBriefFeedback("insightful")} 
                  />
                  <FeedbackButton 
                    type="celebrate" 
                    label={translations[currentLanguage as keyof typeof translations].feedback.celebrate} 
                    icon={<Trophy className="h-3 w-3" />} 
                    selected={briefFeedback === "celebrate"} 
                    onSelect={() => setBriefFeedback("celebrate")} 
                  />
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-xl font-semibold mb-4">{translations[currentLanguage as keyof typeof translations].dialog.startedTitle}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {translations[currentLanguage as keyof typeof translations].dialog.startedContent}
                </p>
                <div className="mt-4 flex gap-2">
                  <FeedbackButton 
                    type="support" 
                    label={translations[currentLanguage as keyof typeof translations].feedback.support} 
                    icon={<Heart className="h-3 w-3" />} 
                    selected={startedFeedback === "support"} 
                    onSelect={() => setStartedFeedback("support")} 
                  />
                  <FeedbackButton 
                    type="insightful" 
                    label={translations[currentLanguage as keyof typeof translations].feedback.insightful} 
                    icon={<ThumbsUp className="h-3 w-3" />} 
                    selected={startedFeedback === "insightful"} 
                    onSelect={() => setStartedFeedback("insightful")} 
                  />
                  <FeedbackButton 
                    type="celebrate" 
                    label={translations[currentLanguage as keyof typeof translations].feedback.celebrate} 
                    icon={<Trophy className="h-3 w-3" />} 
                    selected={startedFeedback === "celebrate"} 
                    onSelect={() => setStartedFeedback("celebrate")} 
                  />
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-xl font-semibold mb-4">{translations[currentLanguage as keyof typeof translations].dialog.visionTitle}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {translations[currentLanguage as keyof typeof translations].dialog.visionContent1}
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  {translations[currentLanguage as keyof typeof translations].dialog.visionContent2}
                </p>
                <div className="mt-4 flex gap-2">
                  <FeedbackButton 
                    type="support" 
                    label={translations[currentLanguage as keyof typeof translations].feedback.support} 
                    icon={<Heart className="h-3 w-3" />} 
                    selected={visionFeedback === "support"} 
                    onSelect={() => setVisionFeedback("support")} 
                  />
                  <FeedbackButton 
                    type="insightful" 
                    label={translations[currentLanguage as keyof typeof translations].feedback.insightful} 
                    icon={<ThumbsUp className="h-3 w-3" />} 
                    selected={visionFeedback === "insightful"} 
                    onSelect={() => setVisionFeedback("insightful")} 
                  />
                  <FeedbackButton 
                    type="celebrate" 
                    label={translations[currentLanguage as keyof typeof translations].feedback.celebrate} 
                    icon={<Trophy className="h-3 w-3" />} 
                    selected={visionFeedback === "celebrate"} 
                    onSelect={() => setVisionFeedback("celebrate")} 
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{translations[currentLanguage as keyof typeof translations].statsTitle}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {Object.values(companies).flat().map((company, idx) => (
              <CompanyCard 
                key={`company-${idx}`} 
                name={company.name} 
                logo={company.logo} 
                type={company.type}
                website={(company as any).website}
              />
            ))}
          </div>
        </section>
        
        <section className="mb-12 overflow-hidden rounded-xl shadow-sm">
          <div className="bg-gradient-to-br from-teal-50 to-green-50 py-12 px-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">{translations[currentLanguage as keyof typeof translations].leadershipTitle}</h2>
            <p className="text-center text-gray-600 mb-10">{translations[currentLanguage as keyof typeof translations].leadershipSubtitle}</p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {leaders.map((leader, index) => (
                <LeadershipCard 
                  key={index} 
                  name={leader.name} 
                  role={leader.role} 
                  image={leader.image}
                  gradientVariant={leader.gradientVariant}
                  isSelected={selectedLeaderId === index}
                  onSelect={() => setSelectedLeaderId(index)}
                  onSubscribe={handleFounderUpdates}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-gray-100/70 p-6">
            <h2 className="text-lg font-medium mb-4 text-gray-700">{translations[currentLanguage as keyof typeof translations].educationTitle}</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {educationInstitutions.map((institution, i) => (
                <a 
                  key={i} 
                  href={institution.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/70 p-2 rounded-lg shadow-sm flex items-center space-x-2 hover:bg-gray-50 transition-colors border border-gray-200/50"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {institution.logo ? (
                      <img 
                        src={institution.logo} 
                        alt={institution.name} 
                        className="h-full w-full object-cover opacity-80"
                      />
                    ) : (
                      <GraduationCap className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                  <span className="font-medium text-gray-600 text-xs">{institution.name}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-100/40 p-6">
            <h2 className="text-lg font-medium mb-4 text-gray-700">{translations[currentLanguage as keyof typeof translations].previousCompaniesTitle}</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {previousCompanies.map((company, i) => (
                <a 
                  key={i} 
                  href={company.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/70 p-2 rounded-lg shadow-sm flex items-center space-x-2 hover:bg-gray-50 transition-colors border border-gray-200/50"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {company.logo ? (
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="h-full w-full object-cover opacity-80"
                      />
                    ) : (
                      <Briefcase className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                  <span className="font-medium text-gray-600 text-xs">{company.name}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 p-6 rounded-b-xl">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h3 className="text-xl font-semibold text-gray-800">{translations[currentLanguage as keyof typeof translations].connectTitle}</h3>
              <Button 
                onClick={handleFounderUpdates}
                variant="moneco"
              >
                {translations[currentLanguage as keyof typeof translations].subscribeButton}
              </Button>
            </div>
            {showSubscriptionMessage && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                Thank you for subscribing to our updates!
              </div>
            )}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{translations[currentLanguage as keyof typeof translations].testimonialsTitle}</h2>
          
          <div className="space-y-
