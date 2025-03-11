
import { FileText } from "lucide-react";
import DocumentCard from "@/components/DocumentCard";
import { ReactNode } from "react";

interface Document {
  title: string;
  size: string;
  icon: ReactNode;
  type: "download" | "request";
}

interface DocumentsSectionProps {
  title: string;
  documents: Document[];
  onRequestAccess: (documentTitle: string) => void;
}

const DocumentsSection = ({ title, documents, onRequestAccess }: DocumentsSectionProps) => {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-5 w-5 text-teal-600" />
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      
      <div className="space-y-4">
        {documents.map((document, index) => (
          <DocumentCard 
            key={index}
            title={document.title}
            size={document.size}
            icon={document.icon}
            type={document.type}
            onRequestAccess={() => onRequestAccess(document.title)}
          />
        ))}
      </div>
    </section>
  );
};

export default DocumentsSection;
