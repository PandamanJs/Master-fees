import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Users, FileText } from "lucide-react";

interface StudentImportStepProps {
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isCompleted: boolean;
}

export default function StudentImportStep({ onComplete }: StudentImportStepProps) {
  const [importMethod, setImportMethod] = useState<string>("manual");

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Import Students</h3>
        <p className="text-gray-600-gray-300">
          Choose how you'd like to add students to your system
        </p>
      </div>

      <Tabs value={importMethod} onValueChange={setImportMethod}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="csv">CSV Upload</TabsTrigger>
          <TabsTrigger value="api">API Import</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Manual Student Entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600-gray-300 mb-4">
                Add students one by one using our form interface. Best for smaller schools or initial setup.
              </p>
              <Button className="w-full" variant="outline">
                Start Adding Students Manually
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="csv" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                CSV File Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600-gray-300 mb-4">
                Upload a CSV file with student information. Ideal for bulk imports from existing systems.
              </p>
              <div className="space-y-4">
                <Button className="w-full" variant="outline">
                  Download CSV Template
                </Button>
                <Button className="w-full">
                  Upload Student CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                API Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600-gray-300 mb-4">
                Connect your existing student management system via API for seamless data synchronization.
              </p>
              <Button className="w-full" variant="outline">
                Configure API Integration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button onClick={handleContinue} className="w-full md:w-auto">
          Continue
        </Button>
      </div>
    </div>
  );
}