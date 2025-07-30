import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface QuickBooksCallbackProps {
  onComplete: (success: boolean, error?: string) => void;
}

export default function QuickBooksCallback({ onComplete }: QuickBooksCallbackProps) {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const realmId = urlParams.get('realmId');
        const error = urlParams.get('error');

        if (error) {
          setStatus('error');
          setError(`Authorization failed: ${error}`);
          onComplete(false, error);
          return;
        }

        if (!code || !state || !realmId) {
          setStatus('error');
          setError('Missing required parameters from QuickBooks');
          onComplete(false, 'Missing required parameters');
          return;
        }

        // Send callback data to server
        const response = await fetch('/api/integrations/quickbooks/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            state,
            realmId
          })
        });

        if (response.ok) {
          const data = await response.json();
          setStatus('success');
          
          // Notify parent window
          if (window.opener) {
            window.opener.postMessage({
              type: 'QUICKBOOKS_OAUTH_SUCCESS',
              data: data
            }, window.location.origin);
          }
          
          onComplete(true);
        } else {
          const errorData = await response.json();
          setStatus('error');
          setError(errorData.error || 'Failed to complete connection');
          
          // Notify parent window
          if (window.opener) {
            window.opener.postMessage({
              type: 'QUICKBOOKS_OAUTH_ERROR',
              error: errorData.error
            }, window.location.origin);
          }
          
          onComplete(false, errorData.error);
        }
      } catch (err) {
        console.error('Error processing QuickBooks callback:', err);
        setStatus('error');
        setError('An unexpected error occurred');
        
        // Notify parent window
        if (window.opener) {
          window.opener.postMessage({
            type: 'QUICKBOOKS_OAUTH_ERROR',
            error: 'An unexpected error occurred'
          }, window.location.origin);
        }
        
        onComplete(false, 'An unexpected error occurred');
      }
    };

    processCallback();
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            QuickBooks Integration
          </CardTitle>
          <CardDescription className="text-center">
            {status === 'processing' && 'Processing your QuickBooks connection...'}
            {status === 'success' && 'Successfully connected to QuickBooks!'}
            {status === 'error' && 'Connection failed'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center">
          {status === 'processing' && (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600">
                Please wait while we complete the connection process...
              </p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600">
                Your QuickBooks account has been successfully connected to Master-Fees.
              </p>
              <p className="text-sm text-gray-500">
                You can now close this window and return to Master-Fees.
              </p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="space-y-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-red-600 font-medium">{error}</p>
              <p className="text-sm text-gray-500">
                Please close this window and try connecting again.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}