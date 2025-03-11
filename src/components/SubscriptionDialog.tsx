
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const emailFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  company: z.string().optional(),
  role: z.string().optional(),
});

const linkedinFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  linkedinUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .refine((url) => url.includes("linkedin.com"), {
      message: "Please enter a valid LinkedIn URL",
    }),
  company: z.string().optional(),
  role: z.string().optional(),
});

type EmailFormData = z.infer<typeof emailFormSchema>;
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
  const [activeTab, setActiveTab] = useState<"email" | "linkedin">("email");
  const { toast } = useToast();

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
    },
  });

  const linkedinForm = useForm<LinkedinFormData>({
    resolver: zodResolver(linkedinFormSchema),
    defaultValues: {
      name: "",
      linkedinUrl: "",
      company: "",
      role: "",
    },
  });

  const onSubmitEmail = async (data: EmailFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Email form submitted:", data);
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: getSuccessTitle(),
      description: getSuccessDescription(data),
    });
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsSuccess(false);
      emailForm.reset();
      onOpenChange(false);
    }, 2000);
  };

  const onSubmitLinkedin = async (data: LinkedinFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("LinkedIn form submitted:", data);
    
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
      onOpenChange(false);
    }, 2000);
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
    const name = data.name;
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
            Connect with us using your email or LinkedIn profile.
          </DialogDescription>
        </DialogHeader>
        
        {isSuccess ? (
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-center">{getSuccessTitle()}</h3>
            <p className="text-center text-gray-500 mt-2">
              {getSuccessDescription(activeTab === "email" ? emailForm.getValues() : linkedinForm.getValues())}
            </p>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "email" | "linkedin")} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
            </TabsList>
            
            <TabsContent value="email">
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="space-y-4">
                  <FormField
                    control={emailForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={emailForm.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={emailForm.control}
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
            </TabsContent>
            
            <TabsContent value="linkedin">
              <Form {...linkedinForm}>
                <form onSubmit={linkedinForm.handleSubmit(onSubmitLinkedin)} className="space-y-4">
                  <FormField
                    control={linkedinForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={linkedinForm.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn Profile URL</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <div className="relative w-full">
                              <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                                <Linkedin className="h-4 w-4 text-gray-500" />
                              </div>
                              <Input 
                                placeholder="https://linkedin.com/in/yourprofile" 
                                className="pl-8" 
                                {...field} 
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={linkedinForm.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company" {...field} />
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
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
