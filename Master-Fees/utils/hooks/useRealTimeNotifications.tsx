import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { api } from '../supabase/api';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
  metadata?: any;
}

interface UseRealTimeNotificationsOptions {
  schoolId: string;
  onNewNotification?: (notification: Notification) => void;
  onPaymentReceived?: (payment: any) => void;
  onStudentEnrolled?: (student: any) => void;
  enabled?: boolean;
}

export function useRealTimeNotifications({
  schoolId,
  onNewNotification,
  onPaymentReceived,
  onStudentEnrolled,
  enabled = true
}: UseRealTimeNotificationsOptions) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastActivityTimestamp, setLastActivityTimestamp] = useState<string>('');
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);
  const processedEventsRef = useRef<Set<string>>(new Set());

  // Load initial notifications
  useEffect(() => {
    if (!enabled || !schoolId) return;

    const loadInitialNotifications = async () => {
      try {
        const response = await api.getNotifications(schoolId);
        if (response.success && response.data) {
          setNotifications(response.data);
          setLastActivityTimestamp(new Date().toISOString());
        }
      } catch (error) {
        console.error('Error loading initial notifications:', error);
      }
    };

    loadInitialNotifications();
  }, [schoolId, enabled]);

  // Set up real-time subscription
  useEffect(() => {
    if (!enabled || !schoolId) return;

    const setupRealtimeSubscription = async () => {
      try {
        setIsConnected(false);
        
        // Start real-time subscription
        const subscription = await api.subscribeToUpdates(schoolId, (activity) => {
          // Prevent processing the same event multiple times
          if (processedEventsRef.current.has(activity.id)) {
            return;
          }
          processedEventsRef.current.add(activity.id);

          // Handle different types of activities
          switch (activity.type) {
            case 'payment_received':
              handlePaymentReceived(activity);
              break;
            case 'student_enrolled':
              handleStudentEnrolled(activity);
              break;
            case 'fee_update':
              handleFeeUpdate(activity);
              break;
            case 'overdue_reminder':
              handleOverdueReminder(activity);
              break;
            default:
              handleGenericActivity(activity);
          }

          // Update last activity timestamp
          setLastActivityTimestamp(new Date().toISOString());
        });

        subscriptionRef.current = subscription;
        setIsConnected(true);
        
        console.log('Real-time notifications connected for school:', schoolId);
      } catch (error) {
        console.error('Error setting up real-time subscription:', error);
        setIsConnected(false);
      }
    };

    setupRealtimeSubscription();

    // Cleanup subscription on unmount
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [schoolId, enabled]);

  const handlePaymentReceived = (activity: any) => {
    const notification: Notification = {
      id: `notif_${activity.id}`,
      title: activity.title,
      message: activity.message,
      type: 'success',
      timestamp: activity.timestamp,
      read: false,
      metadata: activity.metadata
    };

    // Add to notifications list
    setNotifications(prev => [notification, ...prev]);

    // Show toast notification
    toast.success(activity.title, {
      description: activity.message,
      duration: 5000,
    });

    // Call custom handler
    onNewNotification?.(notification);
    onPaymentReceived?.(activity.metadata);
  };

  const handleStudentEnrolled = (activity: any) => {
    const notification: Notification = {
      id: `notif_${activity.id}`,
      title: activity.title,
      message: activity.message,
      type: 'info',
      timestamp: activity.timestamp,
      read: false,
      metadata: activity.metadata
    };

    // Add to notifications list
    setNotifications(prev => [notification, ...prev]);

    // Show toast notification
    toast.info(activity.title, {
      description: activity.message,
      duration: 4000,
    });

    // Call custom handler
    onNewNotification?.(notification);
    onStudentEnrolled?.(activity.metadata);
  };

  const handleFeeUpdate = (activity: any) => {
    const notification: Notification = {
      id: `notif_${activity.id}`,
      title: activity.title,
      message: activity.message,
      type: 'info',
      timestamp: activity.timestamp,
      read: false,
      metadata: activity.metadata
    };

    // Add to notifications list
    setNotifications(prev => [notification, ...prev]);

    // Show toast notification
    toast.info(activity.title, {
      description: activity.message,
      duration: 4000,
    });

    onNewNotification?.(notification);
  };

  const handleOverdueReminder = (activity: any) => {
    const notification: Notification = {
      id: `notif_${activity.id}`,
      title: activity.title,
      message: activity.message,
      type: 'warning',
      timestamp: activity.timestamp,
      read: false,
      metadata: activity.metadata
    };

    // Add to notifications list
    setNotifications(prev => [notification, ...prev]);

    // Show toast notification
    toast.warning(activity.title, {
      description: activity.message,
      duration: 6000,
    });

    onNewNotification?.(notification);
  };

  const handleGenericActivity = (activity: any) => {
    const notification: Notification = {
      id: `notif_${activity.id}`,
      title: activity.title || 'System Update',
      message: activity.message || 'A new activity has occurred',
      type: 'info',
      timestamp: activity.timestamp,
      read: false,
      metadata: activity.metadata
    };

    // Add to notifications list
    setNotifications(prev => [notification, ...prev]);

    // Show toast notification
    toast.info(notification.title, {
      description: notification.message,
      duration: 3000,
    });

    onNewNotification?.(notification);
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await api.markNotificationAsRead(schoolId, notificationId);
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      
      for (const notification of unreadNotifications) {
        await api.markNotificationAsRead(schoolId, notification.id);
      }
      
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      toast.error('Failed to mark notifications as read');
    }
  };

  const startDemoEvents = async () => {
    try {
      const response = await api.startDemoEvents(schoolId);
      if (response.success) {
        toast.success('Demo events started - you\'ll see live notifications!');
      } else {
        toast.error(response.error || 'Failed to start demo events');
      }
    } catch (error) {
      console.error('Error starting demo events:', error);
      toast.error('Failed to start demo events');
    }
  };

  const stopDemoEvents = async () => {
    try {
      const response = await api.stopDemoEvents(schoolId);
      if (response.success) {
        toast.info('Demo events stopped');
      } else {
        toast.error(response.error || 'Failed to stop demo events');
      }
    } catch (error) {
      console.error('Error stopping demo events:', error);
      toast.error('Failed to stop demo events');
    }
  };

  const simulatePayment = async (studentId?: string, amount?: number) => {
    try {
      const response = await api.simulatePayment(
        schoolId, 
        studentId || `student_${Math.random().toString(36).substr(2, 9)}`, 
        amount || Math.floor(Math.random() * 1000) + 100
      );
      if (response.success) {
        toast.success('Payment simulation triggered');
      }
    } catch (error) {
      console.error('Error simulating payment:', error);
      toast.error('Failed to simulate payment');
    }
  };

  const simulateEnrollment = async (studentData?: any) => {
    try {
      const response = await api.simulateEnrollment(schoolId, studentData || {});
      if (response.success) {
        toast.success('Student enrollment simulation triggered');
      }
    } catch (error) {
      console.error('Error simulating enrollment:', error);
      toast.error('Failed to simulate enrollment');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    isConnected,
    lastActivityTimestamp,
    markAsRead,
    markAllAsRead,
    startDemoEvents,
    stopDemoEvents,
    simulatePayment,
    simulateEnrollment
  };
}