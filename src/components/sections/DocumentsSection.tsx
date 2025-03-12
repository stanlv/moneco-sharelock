
import { FileText } from "lucide-react";
import DocumentCard from "@/components/DocumentCard";

interface DocumentsSectionProps {
  onRequestAccess: (documentTitle: string) => void;
}

const DocumentsSection = ({ onRequestAccess }: DocumentsSectionProps) => {
  const documents = [
    {
      title: "Pitch Deck",
      size: "1.5 MB",
      icon: <FileText className="h-5 w-5" />,
      type: "request" as const,
      format: "PDF"
    },
    {
      title: "Sales Pitch",
      size: "1.3 MB",
      icon: <FileText className="h-5 w-5" />,
      type: "download" as const,
      format: "PDF"
    },
    {
      title: "Regulator Licence",
      size: "1.3 MB",
      icon: <FileText className="h-5 w-5" />,
      type: "request" as const,
      format: "PDF"
    },
    {
      title: "Business Plan",
      size: "3.2 MB",
      icon: <FileText className="h-5 w-5" />,
      type: "request" as const,
      format: "PDF"
    },
    {
      title: "Audited Financial Statements",
      size: "5.7 MB",
      icon: <FileText className="h-5 w-5" />,
      type: "request" as const,
      format: "XLS"
    },
    {
      title: "ESG Report",
      size: "2.8 MB",
      icon: <FileText className="h-5 w-5" />,
      type: "download" as const,
      format: "PDF"
    },
    {
      title: "Articles of Incorporation",
      size: "1.2 MB",
      icon: <FileText className="h-5 w-5" />,
      type: "request" as const,
      format: "PDF"
    },
    {
      title: "Bylaws",
      size: "1.8 MB",
      icon: <FileText className="h-5 w-5" />,
      type: "request" as const,
      format: "PDF"
    },
    {
      title: "Shareholder Agreements",
      size: "4.3 MB",
      icon: <FileText className="h-5 w-5" />,
      type: "request" as const,
      format: "PDF"
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Investors Documents</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {documents.map((doc, index) => (
          <DocumentCard 
            key={index} 
            title={doc.title} 
            size={`${doc.size} ${doc.format}`} 
            icon={doc.icon} 
            type={doc.type}
            onRequestAccess={() => onRequestAccess(doc.title)}
          />
        ))}
      </div>
    </section>
  );
};

export default DocumentsSection;
