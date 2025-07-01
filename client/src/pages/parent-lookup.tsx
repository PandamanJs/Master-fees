import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, User, Phone, CreditCard, Download } from "lucide-react";

const lookupSchema = z.object({
  phoneNumber: z.string().optional(),
  studentId: z.string().optional(),
  schoolCode: z.string().min(1, "School code is required"),
}).refine((data) => data.phoneNumber || data.studentId, {
  message: "Either phone number or student ID is required",
  path: ["phoneNumber"],
});

type LookupForm = z.infer<typeof lookupSchema>;

export default function ParentLookup() {
  const { toast } = useToast();
  const [lookupMethod, setLookupMethod] = useState<string>("phone");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const form = useForm<LookupForm>({
    resolver: zodResolver(lookupSchema),
    defaultValues: {
      phoneNumber: "",
      studentId: "",
      schoolCode: "",
    },
  });

  const lookupMutation = useMutation({
    mutationFn: async (data: LookupForm) => {
      const response = await apiRequest("POST", "/api/parent/lookup", data);
      return response.json();
    },
    onSuccess: (data) => {
      setSearchResults(data);
      if (data.length === 0) {
        toast({
          title: "No Results",
          description: "No students found with the provided information.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Students Found",
          description: `Found ${data.length} student(s) matching your search.`,
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Search Failed",
        description: error.message || "Failed to search for students. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LookupForm) => {
    lookupMutation.mutate(data);
  };

  const getTotalOwed = (fees: any[]) => {
    return fees?.reduce((total, fee) => total + parseFloat(fee.balance || 0), 0) || 0;
  };

  const getOverdueFees = (fees: any[]) => {
    const now = new Date();
    return fees?.filter(fee => 
      fee.status === 'overdue' || 
      (fee.dueDate && new Date(fee.dueDate) < now && fee.status !== 'paid')
    ) || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Parent Payment Portal
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Look up your child's fee information and make payments
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Find Student Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="schoolCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Code *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your school code (e.g., 001)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Tabs value={lookupMethod} onValueChange={setLookupMethod}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="phone">Search by Phone</TabsTrigger>
                      <TabsTrigger value="student">Search by Student ID</TabsTrigger>
                    </TabsList>

                    <TabsContent value="phone" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parent Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+234 801 234 5678"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>

                    <TabsContent value="student" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="studentId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Student ID</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="STU001, 2023/001"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={lookupMutation.isPending}
                  >
                    {lookupMutation.isPending ? "Searching..." : "Search Student Records"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Student Records</h2>
              
              {searchResults.map((student: any) => {
                const totalOwed = getTotalOwed(student.fees);
                const overdueFees = getOverdueFees(student.fees);
                
                return (
                  <Card key={student.id} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            {student.firstName} {student.lastName}
                          </CardTitle>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="outline">ID: {student.studentId}</Badge>
                            <Badge variant="outline">{student.grade}</Badge>
                            {student.class && <Badge variant="outline">{student.class}</Badge>}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600">
                            ₦{totalOwed.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Total Outstanding</div>
                          {overdueFees.length > 0 && (
                            <Badge variant="destructive" className="mt-1">
                              {overdueFees.length} Overdue
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Fee Breakdown:</h4>
                          <div className="space-y-2">
                            {student.fees?.map((fee: any) => (
                              <div key={fee.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                                <div>
                                  <div className="font-medium">{fee.name || `Fee #${fee.id}`}</div>
                                  <div className="text-sm text-gray-600">
                                    Due: ₦{parseFloat(fee.amountDue || 0).toLocaleString()} • 
                                    Paid: ₦{parseFloat(fee.amountPaid || 0).toLocaleString()}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium text-red-600">
                                    ₦{parseFloat(fee.balance || 0).toLocaleString()}
                                  </div>
                                  <Badge 
                                    variant={fee.status === 'paid' ? 'default' : fee.status === 'overdue' ? 'destructive' : 'secondary'}
                                  >
                                    {fee.status || 'pending'}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1" disabled>
                            <CreditCard className="w-4 h-4 mr-2" />
                            Pay with Card (Coming Soon)
                          </Button>
                          <Button variant="outline" className="flex-1" disabled>
                            <Phone className="w-4 h-4 mr-2" />
                            Mobile Money (Coming Soon)
                          </Button>
                          <Button variant="outline" disabled>
                            <Download className="w-4 h-4 mr-2" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Help Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><strong>Can't find your student?</strong> Make sure you're using the correct school code and phone number or student ID.</p>
                <p><strong>Payment Issues?</strong> Contact your school's finance office for assistance.</p>
                <p><strong>Multiple Children?</strong> Search for each child individually using their student ID.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}