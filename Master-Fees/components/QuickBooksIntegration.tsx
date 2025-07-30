import { useState, useEffect } from 'react';
import { toast } from "sonner@2.0.3";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Alert, AlertDescription } from "./ui/alert";
import { Separator } from "./ui/separator";

interface QuickBooksConnection {
  isConnected: boolean;
  companyName?: string;
  lastSync?: string;
  accessToken?: string;
  refreshToken?: string;
  realmId?: string;
  error?: string;
}

interface SyncStatus {
  isLoading: boolean;
  lastSync: string | null;
  error: string | null;
  syncedItems: {
    customers: number;
    invoices: number;
    payments: number;
  };
}

interface QuickBooksIntegrationProps {
  schoolId: string;
  onConnectionChange?: (connected: boolean) => void;
}

export default function QuickBooksIntegration({ schoolId, onConnectionChange }: QuickBooksIntegrationProps) {
  const [connection, setConnection] = useState<QuickBooksConnection>({
    isConnected: false
  });
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isLoading: false,
    lastSync: null,
    error: null,
    syncedItems: { customers: 0, invoices: 0, payments: 0 }
  });
  const [autoSync, setAutoSync] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkConnectionStatus();
  }, [schoolId]);

  const checkConnectionStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/integrations/quickbooks/status?schoolId=${schoolId}`);
      
      if (response.ok) {
        const data = await response.json();
        setConnection(data.connection);
        setSyncStatus(data.syncStatus);
        setAutoSync(data.autoSync || false);
      } else {
        console.error('Failed to check QuickBooks connection status');
      }
    } catch (error) {
      console.error('Error checking QuickBooks connection:', error);
    } finally {
      setLoading(false);
    }
  };

  const initiateConnection = async () => {
    try {
      setLoading(true);
      
      // Create OAuth state parameter with school ID
      const state = btoa(JSON.stringify({ schoolId, timestamp: Date.now() }));
      
      // QuickBooks OAuth URL
      const baseUrl = 'https://appcenter.intuit.com/connect/oauth2';
      const clientId = process.env.NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID || 'your-client-id';
      const redirectUri = `${window.location.origin}/api/integrations/quickbooks/callback`;
      const scope = 'com.intuit.quickbooks.accounting';
      
      const authUrl = `${baseUrl}?` +
        `client_id=${clientId}&` +
        `scope=${scope}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `access_type=offline&` +
        `state=${state}`;
      
      // Open QuickBooks OAuth in popup
      const popup = window.open(
        authUrl,
        'quickbooks-oauth',
        'width=600,height=700,scrollbars=yes,resizable=yes'
      );
      
      // Listen for popup messages
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'QUICKBOOKS_OAUTH_SUCCESS') {
          popup?.close();
          window.removeEventListener('message', handleMessage);
          
          toast.success('Successfully connected to QuickBooks!');
          checkConnectionStatus();
          onConnectionChange?.(true);
        } else if (event.data.type === 'QUICKBOOKS_OAUTH_ERROR') {
          popup?.close();
          window.removeEventListener('message', handleMessage);
          
          toast.error('Failed to connect to QuickBooks. Please try again.');
          console.error('QuickBooks OAuth error:', event.data.error);
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // Check if popup was closed manually
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          setLoading(false);
        }
      }, 1000);
      
    } catch (error) {
      console.error('Error initiating QuickBooks connection:', error);
      toast.error('Failed to initiate QuickBooks connection');
      setLoading(false);
    }
  };

  const disconnectQuickBooks = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`/api/integrations/quickbooks/disconnect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schoolId })
      });
      
      if (response.ok) {
        setConnection({ isConnected: false });
        setSyncStatus({
          isLoading: false,
          lastSync: null,
          error: null,
          syncedItems: { customers: 0, invoices: 0, payments: 0 }
        });
        setAutoSync(false);
        
        toast.success('Successfully disconnected from QuickBooks');
        onConnectionChange?.(false);
      } else {
        const error = await response.json();
        toast.error(`Failed to disconnect: ${error.message}`);
      }
    } catch (error) {
      console.error('Error disconnecting QuickBooks:', error);
      toast.error('Failed to disconnect from QuickBooks');
    } finally {
      setLoading(false);
    }
  };

  const syncData = async (syncType: 'full' | 'incremental' = 'incremental') => {
    try {
      setSyncStatus(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch(`/api/integrations/quickbooks/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schoolId, syncType })
      });
      
      if (response.ok) {
        const data = await response.json();
        setSyncStatus({
          isLoading: false,
          lastSync: new Date().toISOString(),
          error: null,
          syncedItems: data.syncedItems
        });
        
        toast.success(`Successfully synced ${data.syncedItems.customers} customers, ${data.syncedItems.invoices} invoices, and ${data.syncedItems.payments} payments`);
      } else {
        const error = await response.json();
        setSyncStatus(prev => ({
          ...prev,
          isLoading: false,
          error: error.message
        }));
        
        toast.error(`Sync failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error syncing data:', error);
      setSyncStatus(prev => ({
        ...prev,
        isLoading: false,
        error: 'Network error during sync'
      }));
      
      toast.error('Failed to sync data with QuickBooks');
    }
  };

  const toggleAutoSync = async (enabled: boolean) => {
    try {
      const response = await fetch(`/api/integrations/quickbooks/auto-sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schoolId, enabled })
      });
      
      if (response.ok) {
        setAutoSync(enabled);
        toast.success(`Auto-sync ${enabled ? 'enabled' : 'disabled'}`);
      } else {
        const error = await response.json();
        toast.error(`Failed to update auto-sync: ${error.message}`);
      }
    } catch (error) {
      console.error('Error toggling auto-sync:', error);
      toast.error('Failed to update auto-sync settings');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            QuickBooks Integration
          </CardTitle>
          <CardDescription>
            Sync your financial data between Master-Fees and QuickBooks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading integration status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          QuickBooks Integration
          {connection.isConnected && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Connected
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Sync your financial data between Master-Fees and QuickBooks
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Connection Status */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Connection Status</h3>
              <p className="text-sm text-gray-600">
                {connection.isConnected 
                  ? `Connected to ${connection.companyName || 'QuickBooks'}`
                  : 'Not connected to QuickBooks'
                }
              </p>
            </div>
            
            {connection.isConnected ? (
              <Button 
                variant="outline" 
                onClick={disconnectQuickBooks}
                disabled={loading}
              >
                Disconnect
              </Button>
            ) : (
              <Button 
                onClick={initiateConnection}
                disabled={loading}
              >
                Connect to QuickBooks
              </Button>
            )}
          </div>
          
          {connection.error && (
            <Alert variant="destructive">
              <AlertDescription>{connection.error}</AlertDescription>
            </Alert>
          )}
        </div>

        {connection.isConnected && (
          <>
            <Separator />
            
            {/* Sync Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Data Synchronization</h3>
                  <p className="text-sm text-gray-600">
                    {syncStatus.lastSync 
                      ? `Last synced: ${formatDate(syncStatus.lastSync)}`
                      : 'No previous sync'
                    }
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => syncData('incremental')}
                    disabled={syncStatus.isLoading}
                  >
                    {syncStatus.isLoading ? 'Syncing...' : 'Sync Now'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => syncData('full')}
                    disabled={syncStatus.isLoading}
                  >
                    Full Sync
                  </Button>
                </div>
              </div>

              {syncStatus.error && (
                <Alert variant="destructive">
                  <AlertDescription>{syncStatus.error}</AlertDescription>
                </Alert>
              )}

              {/* Sync Statistics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {syncStatus.syncedItems.customers}
                  </div>
                  <div className="text-sm text-gray-600">Customers</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {syncStatus.syncedItems.invoices}
                  </div>
                  <div className="text-sm text-gray-600">Invoices</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {syncStatus.syncedItems.payments}
                  </div>
                  <div className="text-sm text-gray-600">Payments</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Auto-Sync Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Auto-Sync</h3>
                  <p className="text-sm text-gray-600">
                    Automatically sync data every hour
                  </p>
                </div>
                <Switch
                  checked={autoSync}
                  onCheckedChange={toggleAutoSync}
                />
              </div>

              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <strong>What gets synced:</strong>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Student records as QuickBooks customers</li>
                  <li>Fee invoices and billing information</li>
                  <li>Payment transactions and receipts</li>
                  <li>Financial reports and analytics</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}