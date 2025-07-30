import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Bell, Phone, Check, X, Settings } from 'lucide-react';

interface SMSPreferences {
  paymentConfirmations: boolean;
  feeReminders: boolean;
  welcomeMessages: boolean;
  adminNotifications: boolean;
  phoneNumber: string;
}

export function SMSSettings() {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<SMSPreferences>({
    paymentConfirmations: true,
    feeReminders: true,
    welcomeMessages: false,
    adminNotifications: true,
    phoneNumber: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [testSMSLoading, setTestSMSLoading] = useState(false);

  const handlePreferenceChange = (key: keyof SMSPreferences, value: boolean | string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      // Here you would typically save to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "SMS Preferences Saved",
        description: "Your SMS notification preferences have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save SMS preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestSMS = async () => {
    if (!preferences.phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number to send a test SMS.",
        variant: "destructive",
      });
      return;
    }

    setTestSMSLoading(true);
    try {
      // Here you would call your test SMS endpoint
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      toast({
        title: "Test SMS Sent",
        description: `A test message has been sent to ${preferences.phoneNumber}`,
      });
    } catch (error) {
      toast({
        title: "Test SMS Failed",
        description: "Failed to send test SMS. Please check your phone number and try again.",
        variant: "destructive",
      });
    } finally {
      setTestSMSLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as +91 XXXXX XXXXX for Indian numbers
    if (digits.length >= 10) {
      const formatted = `+91 ${digits.slice(-10, -5)} ${digits.slice(-5)}`;
      return formatted;
    }
    
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    handlePreferenceChange('phoneNumber', formatted);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">SMS Notifications</h1>
          <p className="text-slate-600">Manage your SMS notification preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SMS Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              SMS Service Status
            </CardTitle>
            <CardDescription>
              Current status of SMS notifications for Master Fees
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Service Status</span>
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                <Check className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Provider</span>
              <span className="text-sm text-slate-600">Twilio SMS</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Supported Regions</span>
              <span className="text-sm text-slate-600">India, Global</span>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Your Phone Number
                </Label>
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={preferences.phoneNumber}
                onChange={handlePhoneChange}
                className="mb-3"
              />
              <Button
                onClick={handleTestSMS}
                disabled={testSMSLoading || !preferences.phoneNumber}
                variant="outline"
                size="sm"
                className="w-full"
              >
                {testSMSLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mr-2" />
                    Sending Test SMS...
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Test SMS
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Choose which SMS notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Payment Confirmations</Label>
                  <p className="text-xs text-slate-600">
                    Receive SMS when payments are processed
                  </p>
                </div>
                <Switch
                  checked={preferences.paymentConfirmations}
                  onCheckedChange={(checked) => handlePreferenceChange('paymentConfirmations', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Fee Reminders</Label>
                  <p className="text-xs text-slate-600">
                    Get reminded about upcoming due dates
                  </p>
                </div>
                <Switch
                  checked={preferences.feeReminders}
                  onCheckedChange={(checked) => handlePreferenceChange('feeReminders', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Welcome Messages</Label>
                  <p className="text-xs text-slate-600">
                    Receive welcome SMS for new accounts
                  </p>
                </div>
                <Switch
                  checked={preferences.welcomeMessages}
                  onCheckedChange={(checked) => handlePreferenceChange('welcomeMessages', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Admin Notifications</Label>
                  <p className="text-xs text-slate-600">
                    Important updates from school administration
                  </p>
                </div>
                <Switch
                  checked={preferences.adminNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange('adminNotifications', checked)}
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button
                onClick={handleSavePreferences}
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Save Preferences
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SMS Templates Preview */}
      <Card>
        <CardHeader>
          <CardTitle>SMS Template Examples</CardTitle>
          <CardDescription>
            Preview of the SMS messages you'll receive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-600">Payment Confirmation</span>
              </div>
              <p className="text-sm text-slate-700">
                "Payment Confirmed! ₹2,500 received for John Doe. Receipt ID: RCP-1234567890. Thank you for using Master Fees. Download your receipt from the app."
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-600">Fee Reminder</span>
              </div>
              <p className="text-sm text-slate-700">
                "Fee Reminder: ₹3,000 is due for John Doe on 2025-08-15. Pay now via Master Fees app to avoid late fees. Login at your school portal."
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Contact Confirmation</span>
              </div>
              <p className="text-sm text-slate-700">
                "Hi John! Thanks for contacting Master Fees about 'Payment Issues'. We've received your message and will respond within 24 hours."
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Welcome Message</span>
              </div>
              <p className="text-sm text-slate-700">
                "Welcome to Master Fees, John! Your ABC School account is ready. Download the app and login with your credentials to start managing fees easily."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}