
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Only using the LinkedIn schema now
const linkedinFormSchema = z.object({
  company: z.string().optional(),
  role: z.string().min(1, { message: "Please select your investor type" }),
  // Fields for LinkedIn auth data
  profileId: z.string().optional(),
  profileUrl: z.string().optional(),
  profilePicture: z.string().optional(),
  name: z.string().optional(),
});

type LinkedinFormData = z.infer<typeof linkedinFormSchema>;

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "subscribe" | "requestAccess" | "founderUpdates";
  documentTitle?: string;
}

const investorTypes = [
  "Business Angel",
  "Venture Capitalist",
  "Private Equity",
  "Family Office",
  "Corporate Investor",
  "Impact Investor",
  "Institutional Investor",
  "Seed Fund",
  "Startup Advisor",
  "Strategic Investor"
];

export function SubscriptionDialog({ open, onOpenChange, type, documentTitle }: SubscriptionDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [linkedinAuthState, setLinkedinAuthState] = useState<"initial" | "authenticating" | "authenticated">("initial");
  const [linkedinProfile, setLinkedinProfile] = useState<{
    id?: string;
    name?: string;
    profileUrl?: string;
    pictureUrl?: string;
    company?: string;
    position?: string;
  } | null>(null);
  const { toast } = useToast();

  const linkedinForm = useForm<LinkedinFormData>({
    resolver: zodResolver(linkedinFormSchema),
    defaultValues: {
      company: "",
      role: "",
      profileId: "",
      profileUrl: "",
      profilePicture: "",
      name: "",
    },
  });

  // Update LinkedIn form with profile data when authenticated
  useEffect(() => {
    if (linkedinProfile && linkedinAuthState === "authenticated") {
      linkedinForm.setValue("name", linkedinProfile.name || "");
      linkedinForm.setValue("company", linkedinProfile.company || "");
      linkedinForm.setValue("profileId", linkedinProfile.id || "");
      linkedinForm.setValue("profileUrl", linkedinProfile.profileUrl || "");
      linkedinForm.setValue("profilePicture", linkedinProfile.pictureUrl || "");
      
      // If the profile includes a position, try to match it with our investor types
      if (linkedinProfile.position) {
        const matchedRole = investorTypes.find(type => 
          linkedinProfile.position?.toLowerCase().includes(type.toLowerCase())
        );
        if (matchedRole) {
          linkedinForm.setValue("role", matchedRole);
        }
      }
    }
  }, [linkedinProfile, linkedinAuthState, linkedinForm]);

  const onSubmitLinkedin = async (data: LinkedinFormData) => {
    setIsSubmitting(true);
    
    // Add LinkedIn profile data to the submission
    const enrichedData = {
      ...data,
      linkedinProfileId: linkedinProfile?.id,
      linkedinProfileUrl: linkedinProfile?.profileUrl,
      linkedinPictureUrl: linkedinProfile?.pictureUrl,
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("LinkedIn form submitted with profile:", enrichedData);
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: getSuccessTitle(),
      description: getSuccessDescription(data),
    });
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsSuccess(false);
      linkedinForm.reset();
      setLinkedinAuthState("initial");
      setLinkedinProfile(null);
      onOpenChange(false);
    }, 2000);
  };

  const handleLinkedinAuth = () => {
    setLinkedinAuthState("authenticating");
    
    // Simulate LinkedIn OAuth authentication flow
    setTimeout(() => {
      // Simulate successful authentication with mock profile data
      const mockProfile = {
        id: "linkedin-" + Math.random().toString(36).substring(2, 10),
        name: "John Investment",
        profileUrl: "https://linkedin.com/in/john-investment",
        pictureUrl: "https://randomuser.me/api/portraits/men/" + Math.floor(Math.random() * 100) + ".jpg",
        company: "Venture Partners",
        position: "Venture Capitalist at Venture Partners",
      };
      
      setLinkedinProfile(mockProfile);
      setLinkedinAuthState("authenticated");
      
      toast({
        title: "LinkedIn Authentication Successful",
        description: "Your LinkedIn profile has been connected.",
      });
    }, 1500);
  };

  const getTitle = () => {
    switch (type) {
      case "subscribe":
        return "Subscribe";
      case "requestAccess":
        return `Request Access to ${documentTitle}`;
      case "founderUpdates":
        return "Subscribe to Founder Updates";
      default:
        return "Subscribe";
    }
  };

  const getSuccessTitle = () => {
    switch (type) {
      case "subscribe":
        return "Successfully subscribed";
      case "requestAccess":
        return "Access requested";
      case "founderUpdates":
        return "Subscribed to founder updates";
      default:
        return "Successfully submitted";
    }
  };

  const getSuccessDescription = (data: any) => {
    const name = linkedinProfile?.name || data.name || "Investor";
    switch (type) {
      case "subscribe":
        return `Thank you for subscribing, ${name}!`;
      case "requestAccess":
        return `We'll review your request for ${documentTitle} and get back to you shortly.`;
      case "founderUpdates":
        return `You'll now receive updates from our founders.`;
      default:
        return "Thank you for your submission!";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>
            {type === "requestAccess" 
              ? "Please authenticate with your LinkedIn account to request access."
              : "Connect with us using your LinkedIn account."}
          </DialogDescription>
        </DialogHeader>
        
        {isSuccess ? (
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-center">{getSuccessTitle()}</h3>
            <p className="text-center text-gray-500 mt-2">
              {getSuccessDescription(linkedinForm.getValues())}
            </p>
          </div>
        ) : (
          <>
            {linkedinAuthState === "initial" ? (
              <div className="flex flex-col items-center py-6 space-y-4">
                <p className="text-center text-gray-600 mb-2">
                  {type === "requestAccess" 
                    ? "Please sign in with LinkedIn to request access to this document."
                    : "Connect your LinkedIn profile to continue."}
                </p>
                <Button 
                  onClick={handleLinkedinAuth} 
                  className="bg-[#0A66C2] hover:bg-[#084482] w-full max-w-xs"
                  disabled={isSubmitting}
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  Sign in with LinkedIn
                </Button>
              </div>
            ) : linkedinAuthState === "authenticating" ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A66C2]"></div>
                <p className="text-center text-gray-600">Connecting to LinkedIn...</p>
              </div>
            ) : (
              <Form {...linkedinForm}>
                <form onSubmit={linkedinForm.handleSubmit(onSubmitLinkedin)} className="space-y-4">
                  <div className="flex items-center space-x-4 py-2 mb-2 border-b">
                    {linkedinProfile?.pictureUrl && (
                      <img 
                        src={linkedinProfile.pictureUrl} 
                        alt="LinkedIn profile" 
                        className="h-12 w-12 rounded-full border border-gray-200" 
                      />
                    )}
                    <div>
                      <p className="font-medium">{linkedinProfile?.name}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Linkedin className="h-3 w-3 mr-1 text-[#0A66C2]" />
                        Connected
                      </p>
                    </div>
                  </div>
                  
                  <FormField
                    control={linkedinForm.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <input 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Your company" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={linkedinForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investor Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full bg-white">
                              <SelectValue placeholder="Select your investor type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            {investorTypes.map((type) => (
                              <SelectItem key={type} value={type} className="cursor-pointer">
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-teal-600 hover:bg-teal-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
