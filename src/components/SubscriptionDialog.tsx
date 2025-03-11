
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  company: z.string().optional(),
  role: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

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
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", data);
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: getSuccessTitle(),
      description: getSuccessDescription(data),
    });
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsSuccess(false);
      form.reset();
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

  const getSuccessDescription = (data: FormData) => {
    switch (type) {
      case "subscribe":
        return `Thank you for subscribing, ${data.name}!`;
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
        </DialogHeader>
        
        {isSuccess ? (
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-center">{getSuccessTitle()}</h3>
            <p className="text-center text-gray-500 mt-2">{getSuccessDescription(form.getValues())}</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
      </DialogContent>
    </Dialog>
  );
}
