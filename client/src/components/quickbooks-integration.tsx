import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Building2, 
  Users, 
  FileText, 
  CreditCard, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle,
  Download,
  Upload
} from 'lucide-react';

interface QuickBooksStatus {
  connected: boolean;
  companyId?: string;
  connectedAt?: string;
  message: string;
}

interface QBSyncData {
  customers: any[];
  items: any[];
  invoices: any[];
  payments: any[];
  syncTimestamp: string;
}

export function QuickBooksIntegration({ schoolId }: { schoolId: number }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [syncData, setSyncData] = useState<QBSyncData | null>(null);

  // Check QuickBooks connection status
  const { data: qbStatus, isLoading: statusLoading } = useQuery({
    queryKey: [`/api/quickbooks/status/${schoolId}`],
    queryFn: async (): Promise<QuickBooksStatus> => {
      const response = await fetch(`/api/quickbooks/status/${schoolId}`);
      if (!response.ok) throw new Error('Failed to fetch QuickBooks status');
      return response.json();
    }
  });

  // Connect to QuickBooks
  const connectMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/quickbooks/auth?schoolId=${schoolId}`);
      if (!response.ok) throw new Error('Failed to get authorization URL');
      const { authUrl } = await response.json();
      window.open(authUrl, '_blank', 'width=600,height=600');
      return authUrl;
    },
    onSuccess: () => {
      toast({
        title: "QuickBooks Authorization",
        description: "Please complete the authorization in the new window.",
      });
    },
    onError: () => {
      toast({
        title: "Connection Failed",
        description: "Failed to initiate QuickBooks connection. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Sync data from QuickBooks
  const syncMutation = useMutation({
    mutationFn: async (): Promise<QBSyncData> => {
      const response = await fetch(`/api/quickbooks/sync/${schoolId}`);
      if (!response.ok) throw new Error('Failed to sync QuickBooks data');
      const result = await response.json();
      return result.data;
    },
    onSuccess: (data) => {
      setSyncData(data);
      queryClient.invalidateQueries({ queryKey: [`/api/quickbooks/status/${schoolId}`] });
      toast({
        title: "Sync Successful",
        description: `Synced ${data.customers.length} customers, ${data.items.length} items, ${data.invoices.length} invoices, and ${data.payments.length} payments.`,
      });
    },
    onError: () => {
      toast({
        title: "Sync Failed",
        description: "Failed to sync data from QuickBooks. Please check your connection.",
        variant: "destructive",
      });
    }
  });

  // Disconnect QuickBooks
  const disconnectMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/quickbooks/disconnect/${schoolId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to disconnect QuickBooks');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/quickbooks/status/${schoolId}`] });
      setSyncData(null);
      toast({
        title: "Disconnected",
        description: "QuickBooks has been disconnected successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Disconnect Failed",
        description: "Failed to disconnect QuickBooks. Please try again.",
        variant: "destructive",
      });
    }
  });

  const isConnected = qbStatus?.connected;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Building2 className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">QuickBooks Integration</h1>
          <p className="text-slate-600">Connect and sync school financial data with QuickBooks</p>
        </div>
      </div>

      {/* Connection Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Connection Status
              </CardTitle>
              <CardDescription>
                {qbStatus?.message || "Checking connection status..."}
              </CardDescription>
            </div>
            <Badge 
              className={isConnected 
                ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                : "bg-orange-100 text-orange-700 border-orange-200"
              }
            >
              {statusLoading ? (
                "Loading..."
              ) : isConnected ? (
                <>
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Connected
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Not Connected
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {isConnected ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Company ID:</span>
                  <p className="text-slate-800 font-mono">{qbStatus.companyId}</p>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Status:</span>
                  <p className="text-slate-800">{qbStatus.connectedAt}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => syncMutation.mutate()}
                  disabled={syncMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {syncMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Sync Data
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={() => disconnectMutation.mutate()}
                  disabled={disconnectMutation.isPending}
                  variant="outline"
                >
                  {disconnectMutation.isPending ? "Disconnecting..." : "Disconnect"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-600">
                Connect Master Fees to QuickBooks to automatically sync customer data, 
                invoices, and payment records between both systems.
              </p>
              
              <Button
                onClick={() => connectMutation.mutate()}
                disabled={connectMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {connectMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Connect to QuickBooks
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sync Data Overview */}
      {syncData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-800">{syncData.customers.length}</p>
                  <p className="text-sm text-slate-600">Customers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-800">{syncData.items.length}</p>
                  <p className="text-sm text-slate-600">Fee Items</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-800">{syncData.invoices.length}</p>
                  <p className="text-sm text-slate-600">Invoices</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-800">{syncData.payments.length}</p>
                  <p className="text-sm text-slate-600">Payments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Integration Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Import from QuickBooks
            </CardTitle>
            <CardDescription>
              Import existing customer and financial data from QuickBooks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">Customer profiles and contact information</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">Fee categories as QuickBooks items</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">Historical invoices and payment records</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">Account balances and outstanding amounts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Export to QuickBooks
            </CardTitle>
            <CardDescription>
              Automatically sync Master Fees data to QuickBooks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">Create customers from parent profiles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">Generate invoices for school fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">Record payment transactions automatically</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">Maintain synchronized financial records</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {syncData && (
        <Card>
          <CardHeader>
            <CardTitle>Last Sync Details</CardTitle>
            <CardDescription>
              Data synchronized on {new Date(syncData.syncTimestamp).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-600">
              <p>Successfully synced financial data between Master Fees and QuickBooks. 
              All customer profiles, fee categories, invoices, and payment records are now up to date.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}