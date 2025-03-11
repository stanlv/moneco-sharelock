
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Bell, Eye, Key, FileText } from "lucide-react";

const subscriptionSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
});

const requestAccessSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  company: z.string().min(2, { message: "Company must be at least 2 characters" }),
  reason: z.string().min(10, { message: "Please provide a brief reason for your request" }),
});

type DialogType = "subscribe" | "requestAccess" | "founderUpdates";

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: DialogType;
  documentTitle?: string;
}

export function SubscriptionDialog({ 
  open, 
  onOpenChange, 
  type, 
  documentTitle 
}: SubscriptionDialogProps) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = React.useState(false);
  
  const subscribeForm = useForm<z.infer<typeof subscriptionSchema>>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const requestAccessForm = useForm<z.infer<typeof requestAccessSchema>>({
    resolver: zodResolver(requestAccessSchema),
    defaultValues: {
      email: "",
      name: "",
      company: "",
      reason: "",
    },
  });

  const getTitleAndDescription = () => {
    switch (type) {
      case "subscribe":
        return {
          title: "Subscribe to Updates",
          description: "Stay up to date with the latest news and updates from Moneco",
          icon: <Bell className="h-5 w-5 text-teal-600 mr-2" />,
        };
      case "requestAccess":
        return {
          title: `Request Access to ${documentTitle || "Document"}`,
          description: "Fill out the form below to request access to this document",
          icon: <Key className="h-5 w-5 text-teal-600 mr-2" />,
        };
      case "founderUpdates":
        return {
          title: "Subscribe to Founder Updates",
          description: "Get the latest news and insights directly from our founders",
          icon: <Mail className="h-5 w-5 text-teal-600 mr-2" />,
        };
    }
  };

  const { title, description, icon } = getTitleAndDescription();

  const onSubscribe = (data: z.infer<typeof subscriptionSchema>) => {
    console.log("Subscription data:", data);
    toast({
      title: "Subscription successful",
      description: "You've been subscribed to our updates",
    });
    setSubmitted(true);
    setTimeout(() => {
      onOpenChange(false);
      setSubmitted(false);
    }, 2000);
  };

  const onRequestAccess = (data: z.infer<typeof requestAccessSchema>) => {
    console.log("Request access data:", data);
    toast({
      title: "Request submitted",
      description: "We'll review your request and get back to you soon",
    });
    setSubmitted(true);
    setTimeout(() => {
      onOpenChange(false);
      setSubmitted(false);
    }, 2000);
  };

  const renderForm = () => {
    if (submitted) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-green-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-1">
            {type === "requestAccess" ? "Request Submitted" : "Subscription Successful"}
          </h3>
          <p className="text-sm text-gray-500">
            {type === "requestAccess" 
              ? "We'll review your request and get back to you soon." 
              : "Thank you for subscribing to our updates."}
          </p>
        </div>
      );
    }

    if (type === "subscribe" || type === "founderUpdates") {
      return (
        <form onSubmit={subscribeForm.handleSubmit(onSubscribe)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              placeholder="Your name" 
              {...subscribeForm.register("name")} 
            />
            {subscribeForm.formState.errors.name && (
              <p className="text-sm text-red-500">{subscribeForm.formState.errors.name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your.email@example.com" 
              {...subscribeForm.register("email")} 
            />
            {subscribeForm.formState.errors.email && (
              <p className="text-sm text-red-500">{subscribeForm.formState.errors.email.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
            {type === "founderUpdates" ? "Subscribe to Founder Updates" : "Subscribe"}
          </Button>
        </form>
      );
    }

    return (
      <form onSubmit={requestAccessForm.handleSubmit(onRequestAccess)} className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            placeholder="Your name" 
            {...requestAccessForm.register("name")} 
          />
          {requestAccessForm.formState.errors.name && (
            <p className="text-sm text-red-500">{requestAccessForm.formState.errors.name.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="your.email@example.com" 
            {...requestAccessForm.register("email")} 
          />
          {requestAccessForm.formState.errors.email && (
            <p className="text-sm text-red-500">{requestAccessForm.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input 
            id="company" 
            placeholder="Your company" 
            {...requestAccessForm.register("company")} 
          />
          {requestAccessForm.formState.errors.company && (
            <p className="text-sm text-red-500">{requestAccessForm.formState.errors.company.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Reason for request</Label>
          <Input 
            id="reason" 
            placeholder="Why do you need access to this document?"
            {...requestAccessForm.register("reason")} 
          />
          {requestAccessForm.formState.errors.reason && (
            <p className="text-sm text-red-500">{requestAccessForm.formState.errors.reason.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100">
          <FileText className="h-5 w-5 text-teal-600" />
          <span className="text-sm font-medium text-gray-700">{documentTitle || "Document"}</span>
        </div>

        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
          Request Access
        </Button>
      </form>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {icon}
            {title}
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </DialogHeader>
        {renderForm()}
      </DialogContent>
    </Dialog>
  );
}
