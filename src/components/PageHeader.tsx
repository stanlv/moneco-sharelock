
import { Language } from "@/utils/translations";
import LanguageSelector from "@/components/LanguageSelector";

interface PageHeaderProps {
  tagline: string;
  subtitle: string;
  currentLanguage: Language;
  onLanguageChange: (language: string) => void;
}

const PageHeader = ({ 
  tagline, 
  subtitle, 
  currentLanguage, 
  onLanguageChange 
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">{tagline}</h1>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <LanguageSelector 
        currentLanguage={currentLanguage} 
        onLanguageChange={onLanguageChange} 
      />
    </div>
  );
};

export default PageHeader;
