import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, School, Eye, CheckCircle2, Clock, User } from 'lucide-react';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  schoolName?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'resolved';
  isRead: boolean;
  createdAt: string;
}

export default function ContactMessages() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messagesData, isLoading } = useQuery({
    queryKey: ['/api/admin/contact-messages'],
    queryFn: async () => {
      const response = await fetch('/api/admin/contact-messages');
      if (!response.ok) throw new Error('Failed to fetch messages');
      return response.json();
    }
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/contact-messages/${id}/read`, {
        method: 'PUT',
      });
      if (!response.ok) throw new Error('Failed to mark as read');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contact-messages'] });
      toast({
        title: "Message marked as read",
        description: "The contact message status has been updated.",
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await fetch(`/api/admin/contact-messages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contact-messages'] });
      toast({
        title: "Status updated",
        description: "The contact message status has been updated.",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'read': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'replied': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'resolved': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock className="w-3 h-3" />;
      case 'read': return <Eye className="w-3 h-3" />;
      case 'replied': return <Mail className="w-3 h-3" />;
      case 'resolved': return <CheckCircle2 className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-2">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200 rounded w-full"></div>
                  <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const messages: ContactMessage[] = messagesData?.messages || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-slate-800 mb-2">Contact Messages</h1>
        <p className="text-slate-600">Manage and respond to contact form submissions</p>
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-semibold text-slate-800">
              {messages.length}
            </div>
            <div className="text-sm text-slate-600">Total Messages</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-semibold text-blue-600">
              {messages.filter(m => m.status === 'new').length}
            </div>
            <div className="text-sm text-slate-600">New Messages</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-semibold text-emerald-600">
              {messages.filter(m => m.status === 'replied').length}
            </div>
            <div className="text-sm text-slate-600">Replied</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-semibold text-slate-600">
              {messages.filter(m => m.status === 'resolved').length}
            </div>
            <div className="text-sm text-slate-600">Resolved</div>
          </div>
        </div>
      </div>

      {messages.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Mail className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No contact messages</h3>
            <p className="text-slate-600">Contact messages will appear here when users submit the contact form.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {messages.map((message) => (
            <Card key={message.id} className={`transition-all duration-200 hover:shadow-lg ${!message.isRead ? 'ring-2 ring-blue-200 border-blue-300' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className={`${getStatusColor(message.status)} flex items-center gap-1`}>
                    {getStatusIcon(message.status)}
                    {message.status}
                  </Badge>
                  <span className="text-xs text-slate-500">
                    {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <CardTitle className="text-lg font-medium text-slate-800 line-clamp-1">
                  {message.subject}
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {message.name}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Contact Information */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-3 h-3" />
                    <a href={`mailto:${message.email}`} className="hover:text-emerald-600 transition-colors">
                      {message.email}
                    </a>
                  </div>
                  
                  {message.phone && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="w-3 h-3" />
                      <a href={`tel:${message.phone}`} className="hover:text-emerald-600 transition-colors">
                        {message.phone}
                      </a>
                    </div>
                  )}
                  
                  {message.schoolName && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <School className="w-3 h-3" />
                      {message.schoolName}
                    </div>
                  )}
                </div>

                {/* Message Preview */}
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-sm text-slate-700 line-clamp-3">
                    {message.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {!message.isRead && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markAsReadMutation.mutate(message.id)}
                      disabled={markAsReadMutation.isPending}
                      className="flex-1"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Mark Read
                    </Button>
                  )}
                  
                  <select
                    value={message.status}
                    onChange={(e) => updateStatusMutation.mutate({ id: message.id, status: e.target.value })}
                    className="flex-1 px-3 py-1 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    disabled={updateStatusMutation.isPending}
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}