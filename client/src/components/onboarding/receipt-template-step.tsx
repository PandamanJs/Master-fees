import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Palette, Layout } from "lucide-react";

interface ReceiptTemplateStepProps {
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isCompleted: boolean;
}

export default function ReceiptTemplateStep({ onComplete }: ReceiptTemplateStepProps) {
  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Receipt & Invoice Templates</h3>
        <p className="text-gray-600-gray-300">
          Choose and customize your receipt and invoice templates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50-blue-950-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Default Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Badge variant="secondary">Recommended</Badge>
              <p className="text-sm text-gray-600-gray-300">
                Clean, professional template with school logo, payment details, and transaction summary.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Header Style:</span>
                  <span className="font-medium">Modern</span>
                </div>
                <div className="flex justify-between">
                  <span>Color Scheme:</span>
                  <span className="font-medium">Blue</span>
                </div>
                <div className="flex justify-between">
                  <span>Logo Position:</span>
                  <span className="font-medium">Top Left</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Custom Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Badge variant="outline">Coming Soon</Badge>
              <p className="text-sm text-gray-600-gray-300">
                Create your own custom receipt template with advanced styling options and branding.
              </p>
              <Button variant="outline" className="w-full" disabled>
                Customize Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="w-5 h-5" />
            Template Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white-gray-800 border rounded-lg p-6 space-y-4">
            <div className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg">Your School Name</h4>
                  <p className="text-sm text-gray-600">Payment Receipt</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Receipt #: RCP-001</p>
                  <p className="text-sm">Date: Jan 01, 2024</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Student Name:</span>
                <span className="font-medium">John Doe</span>
              </div>
              <div className="flex justify-between">
                <span>Class:</span>
                <span className="font-medium">Grade 5</span>
              </div>
              <div className="flex justify-between">
                <span>Fee Type:</span>
                <span className="font-medium">Tuition Fee</span>
              </div>
              <div className="flex justify-between">
                <span>Amount Paid:</span>
                <span className="font-medium">₦50,000</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-medium">Bank Transfer</span>
              </div>
            </div>

            <div className="border-t pt-4 text-center">
              <p className="text-sm text-gray-600">
                Thank you for your payment. Keep this receipt for your records.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={handleContinue} className="w-full md:w-auto">
          Use Default Template & Continue
        </Button>
      </div>
    </div>
  );
}