
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Linkedin, UserCheck } from "lucide-react";
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
      <DialogContent className="sm:max-w-[425px] rounded-xl p-0 overflow-hidden border-none shadow-xl animate-scale-in">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{getTitle()}</DialogTitle>
            <DialogDescription className="text-teal-50 mt-2">
              {type === "requestAccess" 
                ? "Please authenticate with your LinkedIn account to request access."
                : "Connect with us using your LinkedIn account."}
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="p-6">
          {isSuccess ? (
            <div className="py-6 flex flex-col items-center justify-center animate-fade-in">
              <div className="rounded-full bg-gradient-to-r from-teal-100 to-green-100 p-4 mb-5">
                <Check className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800">{getSuccessTitle()}</h3>
              <p className="text-center text-gray-600 mt-3 max-w-xs">
                {getSuccessDescription(linkedinForm.getValues())}
              </p>
            </div>
          ) : (
            <>
              {linkedinAuthState === "initial" ? (
                <div className="flex flex-col items-center py-8 space-y-6">
                  <div className="text-center mb-2 max-w-xs">
                    <p className="text-gray-700 mb-2">
                      {type === "requestAccess" 
                        ? "Sign in with LinkedIn to request access to this document."
                        : "Connect your LinkedIn profile to continue."}
                    </p>
                    <p className="text-sm text-gray-500">
                      We'll use your profile information to personalize your experience.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleLinkedinAuth} 
                    className="bg-[#0A66C2] hover:bg-[#084482] transition-all w-full max-w-xs shadow-md hover:shadow-lg"
                    disabled={isSubmitting}
                  >
                    <Linkedin className="mr-2 h-5 w-5" />
                    Sign in with LinkedIn
                  </Button>
                </div>
              ) : linkedinAuthState === "authenticating" ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full border-2 border-[#0A66C2] border-t-transparent animate-spin"></div>
                    <Linkedin className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#0A66C2] h-6 w-6" />
                  </div>
                  <p className="text-center text-gray-600 animate-pulse">Connecting to LinkedIn...</p>
                </div>
              ) : (
                <Form {...linkedinForm}>
                  <form onSubmit={linkedinForm.handleSubmit(onSubmitLinkedin)} className="space-y-5">
                    <div className="flex items-center space-x-4 py-3 px-4 bg-blue-50 rounded-lg border border-blue-100 mb-4">
                      {linkedinProfile?.pictureUrl && (
                        <img 
                          src={linkedinProfile.pictureUrl} 
                          alt="LinkedIn profile" 
                          className="h-12 w-12 rounded-full border-2 border-white shadow-sm" 
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-800">{linkedinProfile?.name}</p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <UserCheck className="h-3 w-3 mr-1 text-[#0A66C2]" />
                          LinkedIn Connected
                        </p>
                      </div>
                    </div>
                    
                    <FormField
                      control={linkedinForm.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Company</FormLabel>
                          <FormControl>
                            <input 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                          <FormLabel className="text-gray-700">Investor Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full bg-white">
                                <SelectValue placeholder="Select your investor type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white max-h-60">
                              {investorTypes.map((type) => (
                                <SelectItem key={type} value={type} className="cursor-pointer hover:bg-teal-50">
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter className="mt-6 pt-4 flex flex-col gap-2">
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition-all shadow-md"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Submitting...
                          </span>
                        ) : "Submit"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
