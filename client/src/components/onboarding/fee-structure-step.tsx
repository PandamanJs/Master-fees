import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { insertFeeStructureSchema, type InsertFeeStructure } from "@shared/schema";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";

interface FeeStructureStepProps {
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isCompleted: boolean;
}

export default function FeeStructureStep({ onComplete }: FeeStructureStepProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  // Get existing fee structures
  const { data: existingFees = [], isLoading } = useQuery({
    queryKey: ["/api/fee-structures"],
    retry: false,
  });

  const form = useForm<InsertFeeStructure>({
    resolver: zodResolver(insertFeeStructureSchema.omit({ schoolId: true })),
    defaultValues: {
      name: "",
      category: "",
      amount: "",
      currency: "NGN",
      grade: "",
      term: "",
      academic_year: new Date().getFullYear().toString(),
      allowPartPayment: true,
      minimumPayment: "",
      dueDate: undefined,
    },
  });

  const createFeeMutation = useMutation({
    mutationFn: async (data: InsertFeeStructure) => {
      await apiRequest("POST", "/api/fee-structures", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/fee-structures"] });
      toast({
        title: "Fee Structure Added",
        description: "New fee structure has been created successfully.",
      });
      form.reset();
      setShowForm(false);
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
        description: "Failed to create fee structure. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertFeeStructure) => {
    createFeeMutation.mutate(data);
  };

  const handleContinue = () => {
    if (existingFees.length === 0) {
      toast({
        title: "Add Fee Structures",
        description: "Please add at least one fee structure before continuing.",
        variant: "destructive",
      });
      return;
    }
    onComplete();
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
      {/* Existing Fee Structures */}
      {existingFees.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Current Fee Structures</h3>
          <div className="grid gap-4">
            {existingFees.map((fee: any) => (
              <Card key={fee.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{fee.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{fee.category}</Badge>
                        <Badge variant="outline">{fee.grade}</Badge>
                        <Badge variant="outline">{fee.term}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₦{fee.amount}</div>
                      {fee.allowPartPayment && (
                        <div className="text-sm text-gray-500">
                          Min: ₦{fee.minimumPayment || "0"}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add New Fee Structure Button */}
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="w-full"
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Fee Structure
        </Button>
      )}

      {/* Fee Structure Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Fee Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fee Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Tuition Fee" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="tuition">Tuition</SelectItem>
                            <SelectItem value="library">Library</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="transport">Transport</SelectItem>
                            <SelectItem value="uniform">Uniform</SelectItem>
                            <SelectItem value="examination">Examination</SelectItem>
                            <SelectItem value="development">Development</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (NGN) *</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="50000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade/Class</FormLabel>
                        <FormControl>
                          <Input placeholder="Grade 1, SS1, JSS2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="term"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Term</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select term" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Term 1">Term 1</SelectItem>
                            <SelectItem value="Term 2">Term 2</SelectItem>
                            <SelectItem value="Term 3">Term 3</SelectItem>
                            <SelectItem value="Annual">Annual</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="academic_year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Academic Year</FormLabel>
                        <FormControl>
                          <Input placeholder="2024" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="allowPartPayment"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Allow Part Payment</FormLabel>
                        <FormDescription>
                          Students can pay this fee in installments
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("allowPartPayment") && (
                  <FormField
                    control={form.control}
                    name="minimumPayment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Payment (NGN)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="10000" {...field} />
                        </FormControl>
                        <FormDescription>
                          Minimum amount that must be paid initially
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createFeeMutation.isPending}
                  >
                    {createFeeMutation.isPending ? "Adding..." : "Add Fee Structure"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          className="w-full md:w-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}