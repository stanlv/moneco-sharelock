
import { Card } from "@/components/ui/card";

interface LeadershipCardProps {
  name: string;
  role: string;
  image: string;
}

const LeadershipCard = ({ name, role, image }: LeadershipCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 overflow-hidden rounded-md mb-3">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback image if the provided image fails to load
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/150?text=Leader";
          }}
        />
      </div>
      <h3 className="font-semibold text-gray-800">{role}</h3>
      <p className="text-gray-600">{name}</p>
    </div>
  );
};

export default LeadershipCard;
