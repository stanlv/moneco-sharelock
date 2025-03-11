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
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");

  const translations = {
    en: {
      tagline: "The financial application for the African diaspora",
      subtitle: "#technology #emergingmarkets #impact",
      inBrief: "In brief",
      inBriefText: "Moneco is a financial application designed primarily for the African diaspora, offering a range of financial services tailored to ease the financial integration and operations for Africans living abroad, especially in Europe. Moneco aims to provide a secure and convenient financial tool for Africans abroad, simplifying money management and enabling easy access to financial services both in their home countries and abroad.",
      readMore: "Read more",
      theyWorkWithUs: "They work with us",
      leadershipTeam: "Leadership Team",
      leadershipSubtitle: "Meet the brilliant minds behind Moneco",
      education: "Education",
      previousCompanies: "Previous Companies",
      connectWithLeadership: "Connect with Moneco's Leadership",
      subscribeForUpdates: "Subscribe for Direct Updates",
      customerVerbatim: "Customer Verbatim",
      readOtherTestimonials: "Read 10 other customer testimonials",
      investorDocuments: "Investors Documents",
      aboutMoneco: "About Moneco",
      howMonecoStarted: "How Moneco Started",
      mission: "Moneco Mission and Long-term Vision",
      missionText: "Moneco's mission is to empower the African diaspora with accessible, affordable, and inclusive financial services that bridge the gap between their host countries and home countries. By leveraging technology, Moneco aims to reduce the cost of remittances, provide transparent banking services, and create economic opportunities for Africans worldwide.",
      vision: "The long-term vision of Moneco is to become the leading financial platform for the global African community, facilitating not just money transfers but also investments, business financing, and wealth creation opportunities that contribute to the development of African economies while improving the financial well-being of the diaspora.",
      startedText: "Moneco was founded in 2022 by a team of African professionals with experience in fintech and banking who recognized the challenges faced by the African diaspora in accessing affordable financial services. The founders, having personally experienced the high costs and limitations of traditional banking systems for cross-border transactions, set out to create a solution that would specifically address these pain points. Starting with remittance services, Moneco has since expanded to offer a comprehensive suite of financial tools tailored to the unique needs of Africans living abroad.",
      inBriefFullText: "Moneco is a financial application designed primarily for the African diaspora, offering a range of financial services tailored to ease the financial integration and operations for Africans living abroad, especially in Europe. Moneco aims to provide a secure and convenient financial tool for Africans abroad, simplifying money management and enabling easy access to financial services both in their home countries and abroad. For more detailed information on their services and features.",
      support: "Support",
      insightful: "Insightful",
      celebrate: "Celebrate",
      customerTestimonials: "Customer Testimonials",
      whatDoYouThink: "What do you think about our customers' feedback?",
      download: "Download",
      requestAccess: "Request access",
      requested: "Requested"
    },
    fr: {
      tagline: "L'application financière pour la diaspora africaine",
      subtitle: "#technologie #marchésémergents #impact",
      inBrief: "En bref",
      inBriefText: "Moneco est une application financière conçue principalement pour la diaspora africaine, offrant une gamme de services financiers adaptés pour faciliter l'intégration et les opérations financières des Africains vivant à l'étranger, en particulier en Europe. Moneco vise à fournir un outil financier sécurisé et pratique pour les Africains à l'étranger, simplifiant la gestion de l'argent et permettant un accès facile aux services financiers dans leurs pays d'origine et à l'étranger.",
      readMore: "Lire plus",
      theyWorkWithUs: "Ils travaillent avec nous",
      leadershipTeam: "Équipe de Direction",
      leadershipSubtitle: "Rencontrez les brillants esprits derrière Moneco",
      education: "Éducation",
      previousCompanies: "Entreprises Précédentes",
      connectWithLeadership: "Connectez-vous avec la Direction de Moneco",
      subscribeForUpdates: "Abonnez-vous pour des Mises à Jour Directes",
      customerVerbatim: "Témoignages Clients",
      readOtherTestimonials: "Lire 10 autres témoignages clients",
      investorDocuments: "Documents des Investisseurs",
      aboutMoneco: "À propos de Moneco",
      howMonecoStarted: "Comment Moneco a Commencé",
      mission: "Mission de Moneco et Vision à Long Terme",
      missionText: "La mission de Moneco est de donner à la diaspora africaine les moyens d'accéder à des services financiers accessibles, abordables et inclusifs qui comblent le fossé entre leurs pays d'accueil et leurs pays d'origine. En tirant parti de la technologie, Moneco vise à réduire le coût des envois de fonds, à fournir des services bancaires transparents et à créer des opportunités économiques pour les Africains du monde entier.",
      vision: "La vision à long terme de Moneco est de devenir la principale plateforme financière pour la communauté africaine mondiale, facilitant non seulement les transferts d'argent mais aussi les investissements, le financement des entreprises et les opportunités de création de richesse qui contribuent au développement des économies africaines tout en améliorant le bien-être financier de la diaspora.",
      startedText: "Moneco a été fondé en 2022 par une équipe de professionnels africains ayant une expérience dans la fintech et la banque qui ont reconnu les défis auxquels est confrontée la diaspora africaine pour accéder à des services financiers abordables. Les fondateurs, ayant personnellement expérimenté les coûts élevés et les limitations des systèmes bancaires traditionnels pour les transactions transfrontalières, se sont lancés dans la création d'une solution qui répondrait spécifiquement à ces points douloureux. En commençant par les services de transfert de fonds, Moneco s'est depuis élargi pour offrir une suite complète d'outils financiers adaptés aux besoins uniques des Africains vivant à l'étranger.",
      inBriefFullText: "Moneco est une application financière conçue principalement pour la diaspora africaine, offrant une gamme de services financiers adaptés pour faciliter l'intégration et les opérations financières des Africains vivant à l'étranger, en particulier en Europe. Moneco vise à fournir un outil financier sécurisé et pratique pour les Africains à l'étranger, simplifiant la gestion de l'argent et permettant un accès facile aux services financiers dans leurs pays d'origine et à l'étranger. Pour plus d'informations détaillées sur leurs services et fonctionnalités.",
      support: "Soutien",
      insightful: "Perspicace",
      celebrate: "Célébrer",
      customerTestimonials: "Témoignages Clients",
      whatDoYouThink: "Que pensez-vous des commentaires de nos clients ?",
      download: "Télécharger",
      requestAccess: "Demander l'accès",
      requested: "Demandé"
    },
    it: {
      tagline: "L'applicazione finanziaria per la diaspora africana",
      subtitle: "#tecnologia #mercatiemergenti #impatto",
      inBrief: "In breve",
      inBriefText: "Moneco è un'applicazione finanziaria progettata principalmente per la diaspora africana, che offre una gamma di servizi finanziari su misura per facilitare l'integrazione finanziaria e le operazioni per gli africani che vivono all'estero, specialmente in Europa. Moneco mira a fornire uno strumento finanziario sicuro e conveniente per gli africani all'estero, semplificando la gestione del denaro e consentendo un facile accesso ai servizi finanziari sia nei loro paesi d'origine che all'estero.",
      readMore: "Leggi di più",
      theyWorkWithUs: "Lavorano con noi",
      leadershipTeam: "Team di Leadership",
      leadershipSubtitle: "Incontra le menti brillanti dietro Moneco",
      education: "Istruzione",
      previousCompanies: "Aziende Precedenti",
      connectWithLeadership: "Connettiti con la Leadership di Moneco",
      subscribeForUpdates: "Iscriviti per Aggiornamenti Diretti",
      customerVerbatim: "Testimonianze dei Clienti",
      readOtherTestimonials: "Leggi altre 10 testimonianze dei clienti",
      investorDocuments: "Documenti degli Investitori",
      aboutMoneco: "Riguardo Moneco",
      howMonecoStarted: "Come è iniziato Moneco",
      mission: "Missione di Moneco e Visione a Lungo Termine",
      missionText: "La missione di Moneco è di dare potere alla diaspora africana con servizi finanziari accessibili, convenienti e inclusivi che colmino il divario tra i loro paesi ospitanti e i paesi d'origine. Sfruttando la tecnologia, Moneco mira a ridurre il costo delle rimesse, fornire servizi bancari trasparenti e creare opportunità economiche per gli africani in tutto il mondo.",
      vision: "La visione a lungo termine di Moneco è di diventare la principale piattaforma finanziaria per la comunità africana globale, facilitando non solo i trasferimenti di denaro ma anche investimenti, finanziamenti aziendali e opportunità di creazione di ricchezza che contribuiscono allo sviluppo delle economie africane migliorando al contempo il benessere finanziario della diaspora.",
      startedText: "Moneco è stata fondata nel 2022 da un team di professionisti africani con esperienza in fintech e banking che hanno riconosciuto le sfide affrontate dalla diaspora africana nell'accesso a servizi finanziari convenienti. I fondatori, avendo personalmente sperimentato gli alti costi e le limitazioni dei sistemi bancari tradizionali per le transazioni transfrontaliere, si sono proposti di creare una soluzione che affrontasse specificamente questi punti dolenti. Iniziando con i servizi di rimessa, Moneco si è da allora espansa per offrire una suite completa di strumenti finanziari su misura per le esigenze uniche degli africani che vivono all'estero.",
      inBriefFullText: "Moneco è un'applicazione finanziaria progettata principalmente per la diaspora africana, che offre una gamma di servizi finanziari su misura per facilitare l'integrazione finanziaria e le operazioni per gli africani che vivono all'estero, specialmente in Europa. Moneco mira a fornire uno strumento finanziario sicuro e conveniente per gli africani all'estero, semplificando la gestione del denaro e consentendo un facile accesso ai servizi finanziari sia nei loro paesi d'origine che all'estero. Per informazioni più dettagliate sui loro servizi e funzionalità.",
      support: "Supporto",
      insightful: "Perspicace",
      celebrate: "Celebrare",
      customerTestimonials: "Testimonianze dei Clienti",
      whatDoYouThink: "Cosa pensi del feedback dei nostri clienti?",
      download: "Scarica",
      requestAccess: "Richiedi accesso",
      requested: "Richiesto"
    },
    de: {
      tagline: "Die Finanzanwendung für die afrikanische Diaspora",
      subtitle: "#technologie #schwellenmärkte #wirkung",
      inBrief: "Kurz gesagt",
      inBriefText: "Moneco ist eine Finanzanwendung, die hauptsächlich für die afrikanische Diaspora entwickelt wurde und eine Reihe von Finanzdienstleistungen anbietet, die auf die Erleichterung der finanziellen Integration und Operationen für Afrikaner im Ausland, insbesondere in Europa, zugeschnitten sind. Moneco zielt darauf ab, ein sicheres und bequemes Finanzinstrument für Afrikaner im Ausland anzubieten, das die Geldverwaltung vereinfacht und einen einfachen Zugang zu Finanzdienstleistungen sowohl in ihren Heimatländern als auch im Ausland ermöglicht.",
      readMore: "Mehr lesen",
      theyWorkWithUs: "Sie arbeiten mit uns",
      leadershipTeam: "Führungsteam",
      leadershipSubtitle: "Lernen Sie die brillanten Köpfe hinter Moneco kennen",
      education: "Bildung",
      previousCompanies: "Vorherige Unternehmen",
      connectWithLeadership: "Verbinden Sie sich mit der Führung von Moneco",
      subscribeForUpdates: "Abonnieren Sie für direkte Updates",
      customerVerbatim: "Kundenaussagen",
      readOtherTestimonials: "Lesen Sie 10 weitere Kundenbewertungen",
      investorDocuments: "Investorendokumente",
      aboutMoneco: "Über Moneco",
      howMonecoStarted: "Wie Moneco begann",
      mission: "Moneco Mission und langfristige Vision",
      missionText: "Die Mission von Moneco ist es, die afrikanische Diaspora mit zugänglichen, erschwinglichen und inklusiven Finanzdienstleistungen zu stärken, die die Lücke zwischen ihren Gastländern und Heimatländern schließen. Durch den Einsatz von Technologie zielt Moneco darauf ab, die Kosten für Überweisungen zu senken, transparente Bankdienstleistungen anzubieten und wirtschaftliche Möglichkeiten für Afrikaner weltweit zu schaffen.",
      vision: "Die langfristige Vision von Moneco ist es, die führende Finanzplattform für die globale afrikanische Gemeinschaft zu werden, die nicht nur Geldüberweisungen, sondern auch Investitionen, Unternehmensfinanzierungen und Möglichkeiten zur Schaffung von Wohlstand erleichtert, die zur Entwicklung afrikanischer Volkswirtschaften beitragen und gleichzeitig das finanzielle Wohlbefinden der Diaspora verbessern.",
      startedText: "Moneco wurde 2022 von einem Team afrikanischer Fachleute mit Erfahrung in Fintech und Banking gegründet, die die Herausforderungen erkannten, mit denen die afrikanische Diaspora beim Zugang zu erschwinglichen Finanzdienstleistungen konfrontiert ist. Die Gründer, die persönlich die hohen Kosten und Einschränkungen traditioneller Bankensysteme für grenzüberschreitende Transaktionen erlebt hatten, machten sich daran, eine Lösung zu schaffen, die speziell diese Schmerzpunkte anspricht. Beginnend mit Überweisungsdiensten hat Moneco seitdem sein Angebot auf eine umfassende Suite von Finanztools erweitert, die auf die einzigartigen Bedürfnisse von Afrikanern im Ausland zugeschnitten sind.",
      inBriefFullText: "Moneco ist eine Finanzanwendung, die hauptsächlich für die afrikanische Diaspora entwickelt wurde und eine Reihe von Finanzdienstleistungen anbietet, die auf die Erleichterung der finanziellen Integration und Operationen für Afrikaner im Ausland, insbesondere in Europa, zugeschnitten sind. Moneco zielt darauf ab, ein sicheres und bequemes Finanzinstrument für Afrikaner im Ausland anzubieten, das die Geldverwaltung vereinfacht und einen einfachen Zugang zu Finanzdienstleistungen sowohl in ihren Heimatländern als auch im Ausland ermöglicht. Für detailliertere Informationen zu ihren Dienstleistungen und Funktionen.",
      support: "Unterstützung",
      insightful: "Aufschlussreich",
      celebrate: "Feiern",
      customerTestimonials: "Kundenbewertungen",
      whatDoYouThink: "Was denken Sie über das Feedback unserer Kunden?",
      download: "Herunterladen",
      requestAccess: "Zugang anfordern",
      requested: "Angefordert"
    }
  };

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
    setCurrentLanguage(language);
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

  const t = translations[currentLanguage as keyof typeof translations];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl flex-grow">
        <section className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">{t.tagline}</h1>
              <p className="text-gray-500">{t.subtitle}</p>
            </div>
            <LanguageSelector 
              currentLanguage={currentLanguage} 
              onLanguageChange={handleLanguageChange} 
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {stats.map((stat, index) => (
              <StatCard 
                key={index} 
                title={stat.title} 
                description={stat.description} 
                source={stat.source} 
                animate={stat.animate}
                finalValue={stat.finalValue}
                animationDuration={stat.animationDuration}
                icon={stat.icon}
                sourceUrl={stat.sourceUrl}
                variant={stat.variant}
              />
            ))}
          </div>
          
          <Card className="p-5 bg-gray-50 border-0 shadow-none">
            <h2 className="font-medium text-lg mb-2">{t.inBrief}</h2>
            <p className="text-gray-600 text-sm">
              {t.inBriefText}
            </p>
            <Button 
              variant="link" 
              className="text-teal-600 p-0 mt-2 h-auto flex items-center text-sm"
              onClick={() => setShowReadMoreDialog(true)}
            >
              {t.readMore} <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </Card>
        </section>
        
        <Dialog open={showReadMoreDialog} onOpenChange={setShowReadMoreDialog}>
          <DialogContent className="max-w-3xl p-8 max-h-[90vh] overflow-y-auto">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold">{t.aboutMoneco}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-8 py-4">
              <div>
                <h3 className="text-xl font-semibold mb-4">{t.inBrief}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {t.inBriefFullText}
                </p>
                <div className="mt-4 flex gap-2">
                  <FeedbackButton 
                    type="support" 
                    label={t.support} 
                    icon={<Heart className="h-3 w-3" />} 
                    selected={briefFeedback === "support"} 
                    onSelect={() => setBriefFeedback("support")} 
                  />
                  <FeedbackButton 
                    type="insightful" 
                    label={t.insightful} 
                    icon={<ThumbsUp className="h-3 w-3" />} 
                    selected={briefFeedback === "insightful"} 
                    onSelect={() => setBriefFeedback("insightful")} 
                  />
                  <FeedbackButton 
                    type="celebrate" 
                    label={t.celebrate} 
                    icon={<Trophy className="h-3 w-3" />} 
                    selected={briefFeedback === "celebrate"} 
                    onSelect={() =>
