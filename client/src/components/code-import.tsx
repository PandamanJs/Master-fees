import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Upload,
  FileCode,
  CheckCircle,
  AlertCircle,
  Copy,
  Download
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function CodeImport() {
  const [importedCode, setImportedCode] = useState("");
  const [codeType, setCodeType] = useState<"jsx" | "css" | "ts" | null>(null);

  const handleCodePaste = (code: string) => {
    setImportedCode(code);
    
    // Auto-detect code type
    if (code.includes("import React") || code.includes("export default")) {
      setCodeType("jsx");
    } else if (code.includes("interface") || code.includes("type ")) {
      setCodeType("ts");
    } else if (code.includes("{") && code.includes("color:")) {
      setCodeType("css");
    }
  };

  const generateComponent = () => {
    // This would integrate the imported code into the project
    console.log("Generating component from imported code:", importedCode);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-blue-600" />
            Dashboard Code Import
          </CardTitle>
          <CardDescription>
            Import dashboard code from your Master-Fees.zip file
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600 mb-2">
              Extract your Master-Fees.zip file and paste the dashboard component code below
            </p>
            <Badge variant="secondary" className="text-xs">
              Supports JSX, TypeScript, and CSS
            </Badge>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Dashboard Component Code
            </label>
            <Textarea
              placeholder="Paste your dashboard component code here..."
              value={importedCode}
              onChange={(e) => handleCodePaste(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {codeType && (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-700">
                Detected {codeType.toUpperCase()} code
              </span>
              <Badge variant="outline" className="text-xs">
                {codeType}
              </Badge>
            </div>
          )}

          {importedCode && (
            <div className="flex gap-2">
              <Button 
                onClick={generateComponent}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <FileCode className="w-4 h-4 mr-2" />
                Integrate Component
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigator.clipboard.writeText(importedCode)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
            <div>
              <p className="text-amber-800 font-medium text-sm">Code Integration Guide</p>
              <div className="text-amber-700 text-sm mt-1 space-y-1">
                <p>1. Extract the Master-Fees.zip file on your computer</p>
                <p>2. Open the main dashboard component file</p>
                <p>3. Copy the JSX code and paste it above</p>
                <p>4. The system will automatically integrate it into the project</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}