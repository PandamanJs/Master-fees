import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Figma, 
  Download, 
  Palette, 
  Type, 
  Box, 
  Code, 
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export function FigmaIntegration() {
  const [fileKey, setFileKey] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const { toast } = useToast();

  // Test Figma connection
  const { data: connectionTest, isLoading: testingConnection } = useQuery({
    queryKey: ['/api/figma/test-connection'],
  });

  // Get file data when fileKey is provided
  const { data: fileData, isLoading: loadingFile, refetch: refetchFile } = useQuery({
    queryKey: ['/api/figma/file', fileKey],
    enabled: !!fileKey,
    queryFn: () => fetch(`/api/figma/file/${fileKey}`).then(res => res.json()),
  });

  // Sync design system mutation
  const syncDesignMutation = useMutation({
    mutationFn: (fileKey: string) => 
      apiRequest(`/api/figma/sync-design/${fileKey}`, { method: 'POST' }),
    onSuccess: (data) => {
      toast({
        title: "Design System Synced",
        description: `Found ${data.data.colorsFound} colors and ${data.data.textStylesFound} text styles`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/figma'] });
    },
    onError: (error: any) => {
      toast({
        title: "Sync Failed",
        description: error.message || "Failed to sync design system",
        variant: "destructive",
      });
    },
  });

  // Generate component mutation
  const generateComponentMutation = useMutation({
    mutationFn: ({ fileKey, nodeId }: { fileKey: string; nodeId: string }) =>
      apiRequest(`/api/figma/generate-component/${fileKey}`, {
        method: 'POST',
        body: JSON.stringify({ nodeId }),
        headers: { 'Content-Type': 'application/json' },
      }),
    onSuccess: (data) => {
      toast({
        title: "Component Generated",
        description: "React component code generated successfully",
      });
      // You could save this to a file or show in a modal
      console.log('Generated component:', data.data.code);
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate component",
        variant: "destructive",
      });
    },
  });

  const handleSyncDesign = () => {
    if (!fileKey) {
      toast({
        title: "File Key Required",
        description: "Please enter a Figma file key first",
        variant: "destructive",
      });
      return;
    }
    syncDesignMutation.mutate(fileKey);
  };

  const handleGenerateComponent = () => {
    if (!fileKey || !selectedNodeId) {
      toast({
        title: "Missing Information",
        description: "Please enter both file key and node ID",
        variant: "destructive",
      });
      return;
    }
    generateComponentMutation.mutate({ fileKey, nodeId: selectedNodeId });
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Figma className="w-5 h-5" />
            Figma Integration
          </CardTitle>
          <CardDescription>
            Connect to Figma designs and sync them with Master Fees components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            {testingConnection ? (
              <Badge variant="secondary">
                <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                Testing Connection...
              </Badge>
            ) : connectionTest?.success ? (
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            ) : (
              <Badge variant="destructive">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Disconnected
              </Badge>
            )}
            
            {connectionTest?.success && (
              <span className="text-sm text-slate-600">
                Connected as {connectionTest.data.user?.email}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File Input */}
      <Card>
        <CardHeader>
          <CardTitle>Figma File</CardTitle>
          <CardDescription>
            Enter your Figma file key to start working with designs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter Figma file key (e.g., abc123xyz)"
              value={fileKey}
              onChange={(e) => setFileKey(e.target.value)}
            />
            <Button onClick={() => refetchFile()} disabled={!fileKey || loadingFile}>
              {loadingFile ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          {fileData?.success && (
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-800 mb-2">
                {fileData.data.document.name}
              </h4>
              <p className="text-sm text-slate-600">
                {fileData.data.document.children?.length || 0} top-level frames
              </p>
            </div>
          )}
          
          {fileData?.success === false && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-800 mb-1">File Access Error</h4>
                  <p className="text-sm text-red-700 mb-3">{fileData.error}</p>
                  
                  {fileData.error?.includes("File type not supported") && (
                    <div className="bg-red-100 rounded-lg p-3 mb-3">
                      <p className="text-sm text-red-800 font-medium mb-2">This appears to be a FigJam or prototype file</p>
                      <p className="text-sm text-red-700">
                        The file key points to a file type that isn't supported for design import. 
                        Please use a regular Figma design file instead.
                      </p>
                    </div>
                  )}
                  
                  <div className="text-sm text-red-700">
                    <p className="font-medium mb-1">To fix this issue:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Make sure you're using a regular Figma design file (not FigJam)</li>
                      <li>Check that the file key is correct (from the URL after /file/)</li>
                      <li>Ensure the file is public or you have access to it</li>
                      <li>Try creating a new Figma design file if needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Integration Actions */}
      {fileData?.success && (
        <Tabs defaultValue="sync" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sync">Sync Design</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="generate">Generate</TabsTrigger>
          </TabsList>

          <TabsContent value="sync" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Design System Sync
                </CardTitle>
                <CardDescription>
                  Extract colors, typography, and styles from your Figma file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleSyncDesign}
                  disabled={syncDesignMutation.isPending}
                  className="w-full"
                >
                  {syncDesignMutation.isPending ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Syncing Design System...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Sync Design System
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Box className="w-5 h-5" />
                  Figma Components
                </CardTitle>
                <CardDescription>
                  View and import components from your Figma file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-slate-500">
                  Component import coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Generate React Component
                </CardTitle>
                <CardDescription>
                  Convert a Figma frame or component to React code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Enter node ID (e.g., 123:456)"
                  value={selectedNodeId}
                  onChange={(e) => setSelectedNodeId(e.target.value)}
                />
                <Button 
                  onClick={handleGenerateComponent}
                  disabled={generateComponentMutation.isPending}
                  className="w-full"
                >
                  {generateComponentMutation.isPending ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Component...
                    </>
                  ) : (
                    <>
                      <Code className="w-4 h-4 mr-2" />
                      Generate React Component
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <div className="flex items-start gap-2">
            <span className="font-medium text-slate-800">1.</span>
            <span>Create or open a regular Figma design file (not FigJam)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-slate-800">2.</span>
            <span>Get your file key from the URL (after /file/)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-slate-800">3.</span>
            <span>Enter the file key above and click download</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-slate-800">4.</span>
            <span>Use "Sync Design" to extract colors and styles</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-slate-800">5.</span>
            <span>Generate components by copying node IDs from Figma</span>
          </div>
          
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
              <div>
                <p className="text-amber-800 font-medium text-sm">Current File Issue</p>
                <p className="text-amber-700 text-sm">
                  The file key you provided (iETcOYVOVX4YMS9eunNhqK) points to a FigJam or prototype file. 
                  Please use a regular Figma design file instead.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <a 
              href="https://help.figma.com/hc/en-us/articles/360040328273-Finding-node-IDs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
            >
              Learn how to find node IDs in Figma
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}