import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";

interface ReminderConfigStepProps {
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isCompleted: boolean;
}

export default function ReminderConfigStep({ onComplete }: ReminderConfigStepProps) {
  const [reminders, setReminders] = useState({
    sms: true,
    email: true,
    whatsapp: false,
  });

  const handleToggleReminder = (type: string) => {
    setReminders(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev],
    }));
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Reminder Settings</h3>
        <p className="text-gray-600-gray-300">
          Configure automated reminders for fee payments and important notices
        </p>
      </div>

      <div className="grid gap-6">
        <Card className={`border-2 ${reminders.sms ? 'border-green-200 bg-green-50-green-950-green-800' : 'border-gray-200'}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                SMS Reminders
              </CardTitle>
              <Switch
                checked={reminders.sms}
                onCheckedChange={() => handleToggleReminder('sms')}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reminders.sms && <Badge variant="secondary">Active</Badge>}
              <p className="text-sm text-gray-600-gray-300">
                Send SMS notifications to parents for payment reminders, due dates, and confirmations.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Fee Due Reminder:</span>
                  <span className="font-medium">3 days before</span>
                </div>
                <div className="flex justify-between">
                  <span>Overdue Notice:</span>
                  <span className="font-medium">7 days after</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Confirmation:</span>
                  <span className="font-medium">Immediate</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 ${reminders.email ? 'border-green-200 bg-green-50-green-950-green-800' : 'border-gray-200'}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Reminders
              </CardTitle>
              <Switch
                checked={reminders.email}
                onCheckedChange={() => handleToggleReminder('email')}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reminders.email && <Badge variant="secondary">Active</Badge>}
              <p className="text-sm text-gray-600-gray-300">
                Send detailed email notifications with payment links and receipts to parents.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monthly Statement:</span>
                  <span className="font-medium">1st of each month</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Receipt:</span>
                  <span className="font-medium">Immediate</span>
                </div>
                <div className="flex justify-between">
                  <span>Term Reminder:</span>
                  <span className="font-medium">30 days before</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 ${reminders.whatsapp ? 'border-green-200 bg-green-50-green-950-green-800' : 'border-gray-200'}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                WhatsApp Notifications
              </CardTitle>
              <Switch
                checked={reminders.whatsapp}
                onCheckedChange={() => handleToggleReminder('whatsapp')}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Badge variant="outline">Coming Soon</Badge>
              <p className="text-sm text-gray-600-gray-300">
                Send WhatsApp messages for instant notifications and payment confirmations.
              </p>
              <div className="text-sm text-gray-500">
                WhatsApp Business API integration will be available in the next update.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Reminder Schedule Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm font-medium">Active Reminders:</div>
            <div className="space-y-2 text-sm">
              {reminders.sms && (
                <div className="flex items-center justify-between p-2 bg-blue-50-blue-950 rounded">
                  <span>SMS: Fee payment due in 3 days</span>
                  <Badge variant="outline">SMS</Badge>
                </div>
              )}
              {reminders.email && (
                <div className="flex items-center justify-between p-2 bg-green-50-green-950 rounded">
                  <span>Email: Monthly fee statement with payment link</span>
                  <Badge variant="outline">Email</Badge>
                </div>
              )}
              {!reminders.sms && !reminders.email && (
                <div className="text-gray-500 italic">No active reminders selected</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={handleContinue} className="w-full md:w-auto">
          Save Settings & Continue
        </Button>
      </div>
    </div>
  );
}