import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { insertBankingInfoSchema, type InsertBankingInfo } from "@shared/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BankingInfoStepProps {
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isCompleted: boolean;
}

export default function BankingInfoStep({ onComplete }: BankingInfoStepProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get existing banking data
  const { data: existingBanking, isLoading } = useQuery({
    queryKey: ["/api/banking/my"],
    retry: false,
  });

  const form = useForm<InsertBankingInfo>({
    resolver: zodResolver(insertBankingInfoSchema.omit({ schoolId: true })),
    defaultValues: {
      bankName: existingBanking?.bankName || "",
      accountNumber: existingBanking?.accountNumber || "",
      accountName: existingBanking?.accountName || "",
      routingNumber: existingBanking?.routingNumber || "",
      mobileMoneyNumber: existingBanking?.mobileMoneyNumber || "",
      mobileMoneyProvider: existingBanking?.mobileMoneyProvider || "",
      flutterwaveSecretKey: existingBanking?.flutterwaveSecretKey || "",
      flutterwavePublicKey: existingBanking?.flutterwavePublicKey || "",
    },
  });

  const createBankingMutation = useMutation({
    mutationFn: async (data: InsertBankingInfo) => {
      await apiRequest("POST", "/api/banking", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banking/my"] });
      toast({
        title: "Banking Information Saved",
        description: "Your payment details have been successfully configured.",
      });
      onComplete();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to save banking information. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBankingInfo) => {
    createBankingMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin w-6 h-6 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Bank Account Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Bank Account Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Bank of Nigeria" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input placeholder="School Account Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="routingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Routing Number</FormLabel>
                    <FormControl>
                      <Input placeholder="123456789" {...field} />
                    </FormControl>
                    <FormDescription>
                      Optional: Bank routing or sort code
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Mobile Money Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Mobile Money (Optional)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="mobileMoneyProvider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Money Provider</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                        <SelectItem value="airtel">Airtel Money</SelectItem>
                        <SelectItem value="vodafone">Vodafone Cash</SelectItem>
                        <SelectItem value="tigo">Tigo Cash</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobileMoneyNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Money Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+234 801 234 5678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Flutterwave Integration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Flutterwave Payment Gateway</h3>
            <p className="text-sm text-gray-600-gray-300">
              Configure Flutterwave to accept online payments. Get your keys from your Flutterwave dashboard.
            </p>
            
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="flutterwavePublicKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flutterwave Public Key</FormLabel>
                    <FormControl>
                      <Input placeholder="FLWPUBK_TEST-..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Your Flutterwave public key (starts with FLWPUBK_)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="flutterwaveSecretKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flutterwave Secret Key</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="FLWSECK_TEST-..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Your Flutterwave secret key (starts with FLWSECK_)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={createBankingMutation.isPending}
              className="w-full md:w-auto"
            >
              {createBankingMutation.isPending ? "Saving..." : "Save & Continue"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}