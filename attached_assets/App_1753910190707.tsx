import { useState, useEffect } from 'react';
import svgPaths from "./imports/svg-2g3736nywj";
import { toast } from "sonner@2.0.3";
import { api } from "./utils/supabase/api";
import { useRealTimeNotifications } from "./utils/hooks/useRealTimeNotifications";
import Group1000005059 from "./imports/Group1000005059";
import Frame1707478532 from "./imports/Frame1707478532";
import Frame1707478528 from "./imports/Frame1707478528";
import FeeMasterLoginPage from "./imports/FeeMasterLoginPage-62-2995";
import OnboardingPage from "./components/OnboardingPage";
import DetailedOnboardingPage from "./components/DetailedOnboardingPage";
import FinalOnboardingPage from "./components/FinalOnboardingPage";
import PricingStructurePage from "./components/PricingStructurePage";
import ClassSelectionPage from "./components/ClassSelectionPage";
import ProductGroupPage from "./components/ProductGroupPage";
import SignupPage from "./components/SignupPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import UserManagement from "./imports/UserManagement";
import Frame1707478669 from "./imports/Frame1707478669";
import Frame1707478670 from "./imports/Frame1707478670";
import Frame1707478602 from "./imports/Frame1707478528-42-1664";
import PaginationContainer from "./imports/PaginationContainer";
import Frame11 from "./imports/Frame11";
import Checkbox from "./imports/Checkbox-42-1932";
import Tasks from "./imports/Tasks-46-578";
import Frame1707478755 from "./imports/Frame1707478755";
import Frame1707478757 from "./imports/Frame1707478757";
import Frame1707478770 from "./imports/Frame1707478770";
import Frame1707478778 from "./imports/Frame1707478778";
import Frame1707478778New from "./imports/Frame1707478778-62-2031";
import Group1000005064 from "./imports/Group1000005064";
import Group1000005058 from "./imports/Group1000005058";
import Group1000005058New from "./imports/Group1000005058-62-1905";
import Group1000005064Wallet from "./imports/Group1000005064-60-1453";
import Group1000005063 from "./imports/Group1000005063";
import ConnectionsContainer from "./imports/ConnectionsContainer";
import Group1000005065 from "./imports/Group1000005065";
import Group1000005066 from "./imports/Group1000005066";
import QuickBooksIntegration from "./components/QuickBooksIntegration";

interface NavItem {
  id: string;
  label: string;
  icon: string;
  category: 'general' | 'support';
}

interface FormData {
  schoolName: string;
  institutionType: string;
  country: string;
  state: string;
  town: string;
}

interface ExtendedFormData {
  schoolName: string;
  institutionType: string;
  country: string;
  state: string;
  town: string;
  schoolEmail: string;
  contactNumbers: string;
  physicalAddress: string;
  schoolCategories: string;
  schoolLogo: File | null;
}

interface CompletePricingData {
  schoolName: string;
  institutionType: string;
  country: string;
  state: string;
  town: string;
  schoolEmail: string;
  contactNumbers: string;
  physicalAddress: string;
  schoolCategories: string;
  schoolLogo: File | null;
  selectedGrades: string[];
  classesPerGrade: number;
  exceptions: string;
}

interface ClassSelectionData {
  schoolName: string;
  institutionType: string;
  country: string;
  state: string;
  town: string;
  schoolEmail: string;
  contactNumbers: string;
  physicalAddress: string;
  schoolCategories: string;
  schoolLogo: File | null;
  selectedGrades: string[];
  classesPerGrade: number;
  exceptions: string;
  selectedClasses: string[];
}

interface ProductGroup {
  id: string;
  name: string;
  classes: string[];
}

interface FinalOnboardingData {
  schoolName: string;
  institutionType: string;
  country: string;
  state: string;
  town: string;
  schoolEmail: string;
  contactNumbers: string;
  physicalAddress: string;
  schoolCategories: string;
  schoolLogo: File | null;
  selectedGrades: string[];
  classesPerGrade: number;
  exceptions: string;
  selectedClasses: string[];
  productGroups: ProductGroup[];
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

interface DashboardMetrics {
  totalStudents: number;
  totalRevenue: number;
  outstandingFees: number;
  collectionRate: number;
  overduePayments: number;
  newEnrollments: number;
}

function Dashboard({ onLogout, schoolName, schoolId }: { onLogout: () => void, schoolName: string, schoolId: string }) {
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Term 2');
  const [selectedTransactionTerm, setSelectedTransactionTerm] = useState('Term 2');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [loading, setLoading] = useState(true);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [termMetrics, setTermMetrics] = useState<{[key: string]: {revenue: number, balance: number, outstanding: number}}>({});
  const [loadingTermMetrics, setLoadingTermMetrics] = useState(false);

  // Data from Supabase
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics>({
    totalStudents: 0,
    totalRevenue: 0,
    outstandingFees: 0,
    collectionRate: 0,
    overduePayments: 0,
    newEnrollments: 0
  });

  // Real-time notifications hook
  const {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    markAllAsRead,
    startDemoEvents,
    stopDemoEvents,
    simulatePayment,
    simulateEnrollment
  } = useRealTimeNotifications({
    schoolId,
    onNewNotification: (notification) => {
      // Auto-refresh dashboard metrics when payments are received
      if (notification.type === 'success' && notification.metadata?.amount) {
        setTimeout(() => {
          loadDashboardData();
        }, 1000);
      }
    },
    onPaymentReceived: (payment) => {
      // Update metrics immediately with the new payment
      setDashboardMetrics(prev => ({
        ...prev,
        totalRevenue: prev.totalRevenue + payment.amount,
        outstandingFees: Math.max(0, prev.outstandingFees - payment.amount)
      }));
      
      // Update term-specific metrics if payment relates to current term
      if (payment.term && payment.term === selectedTransactionTerm) {
        setTermMetrics(prev => ({
          ...prev,
          [payment.term]: {
            revenue: (prev[payment.term]?.revenue || 0) + payment.amount,
            balance: Math.max(0, ((prev[payment.term]?.revenue || 0) + payment.amount) - (prev[payment.term]?.outstanding || 0)),
            outstanding: Math.max(0, (prev[payment.term]?.outstanding || 0) - payment.amount)
          }
        }));
      }
      
      setLastRefresh(new Date());
    },
    onStudentEnrolled: (student) => {
      // Update student count immediately
      setDashboardMetrics(prev => ({
        ...prev,
        totalStudents: prev.totalStudents + 1,
        newEnrollments: prev.newEnrollments + 1
      }));
      setLastRefresh(new Date());
    }
  });

  const generalNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', category: 'general' },
    { id: 'transactions', label: 'Transactions', icon: 'receipt', category: 'general' },
    { id: 'customer-management', label: 'Student Management', icon: 'user', category: 'general' },
    { id: 'tasks', label: 'Tasks', icon: 'magic', category: 'general' },
    { id: 'wallet', label: 'Wallet', icon: 'wallet', category: 'general' },
  ];

  const supportNavItems: NavItem[] = [
    { id: 'integrations', label: 'Integrations', icon: 'receipt', category: 'support' },
    { id: 'customer-care', label: 'Support Center', icon: 'grammerly', category: 'support' },
    { id: 'settings', label: 'Settings', icon: 'setting', category: 'support' },
    { id: 'logout', label: 'Logout', icon: 'logout', category: 'support' },
  ];

  // Load dashboard data on mount
  useEffect(() => {
    loadDashboardData();
  }, [schoolId]);

  // Load term-specific metrics when term changes
  useEffect(() => {
    if (schoolId && selectedTransactionTerm) {
      loadTermMetrics(selectedTransactionTerm);
    }
  }, [schoolId, selectedTransactionTerm]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load metrics with retry logic
      const metricsResponse = await api.getMetrics(schoolId);
      if (metricsResponse.success && metricsResponse.data) {
        setDashboardMetrics(metricsResponse.data);
      } else {
        console.warn('Failed to load metrics:', metricsResponse.error);
        toast.error('Unable to load dashboard metrics. Please refresh the page.');
      }

      // If no data exists, generate sample data for new schools
      if (metricsResponse.success && metricsResponse.data?.totalStudents === 0) {
        await initializeSchoolData();
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Unable to connect to the server. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const initializeSchoolData = async () => {
    try {
      toast.info('Setting up your school account...');
      
      const result = await api.generateSampleData(schoolId);
      
      if (result.success) {
        toast.success('School account setup completed successfully!');
        
        // Add welcome notification
        await api.createNotification(schoolId, {
          title: 'Welcome to Master-Fees',
          message: 'Your school account has been successfully configured. You can now start managing student fees and tracking payments.',
          type: 'success'
        });

        // Reload dashboard data and term metrics
        await loadDashboardData();
        await loadTermMetrics(selectedTransactionTerm);
      } else {
        toast.error('Failed to initialize school data. Please contact support if this issue persists.');
      }
    } catch (error) {
      console.error('Error initializing school data:', error);
      toast.error('Unable to complete school setup. Please try again or contact support.');
    }
  };

  const handleNavClick = (itemId: string) => {
    if (itemId === 'logout') {
      handleLogout();
      return;
    }
    setActiveNavItem(itemId);
    
    // More professional navigation messages
    const navLabels = {
      'dashboard': 'Dashboard',
      'transactions': 'Transactions',
      'customer-management': 'Student Management',
      'tasks': 'Tasks',
      'wallet': 'Wallet',
      'integrations': 'Integrations',
      'customer-care': 'Support Center',
      'settings': 'Settings'
    };
    
    const label = navLabels[itemId as keyof typeof navLabels] || itemId;
    console.log(`Navigated to ${label}`);
  };

  const handleWalletClick = () => {
    setActiveNavItem('wallet');
    console.log("Accessed wallet");
  };

  const handleWithdraw = () => {
    toast.success("Withdrawal request initiated. You will be redirected to the withdrawal form.");
  };

  const handleLogout = () => {
    toast.info("Signing out...");
    onLogout();
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to update notifications");
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markAsRead(notificationId);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleCompare = () => {
    const newPeriod = selectedPeriod === 'Term 2' ? 'Term 1' : 'Term 2';
    setSelectedPeriod(newPeriod);
    toast.info(`Comparing with ${newPeriod} data`);
  };

  const handleSettings = () => {
    toast.info("Opening chart configuration options");  
  };

  const handleMaximize = () => {
    toast.info("Expanding chart to detailed analytics view");
  };

  const handleQuickAction = async (action: string) => {
    if (isLoadingAction) return; // Prevent multiple simultaneous actions
    
    try {
      setIsLoadingAction(true);
      
      switch (action) {
        case 'send-reminders':
          const reminderResult = await api.sendPaymentReminders(schoolId);
          if (reminderResult.success) {
            toast.success("Payment reminders have been sent to students with outstanding balances");
            await loadDashboardData();
          } else {
            throw new Error(reminderResult.error || 'Failed to send reminders');
          }
          break;
          
        case 'generate-report':
          toast.info("Generating financial report...");
          const reportResult = await api.createNotification(schoolId, {
            title: 'Financial Report Generated',
            message: 'Monthly financial report has been generated and is ready for download',
            type: 'success'
          });
          if (reportResult.success) {
            setTimeout(() => {
              toast.success("Financial report has been generated successfully");
              loadDashboardData();
            }, 2000);
          }
          break;
          
        case 'add-student':
          setActiveNavItem('customer-management');
          toast.info("Redirected to Student Management for new enrollment");
          break;
          
        case 'process-payment':
          setActiveNavItem('transactions');
          toast.info("Redirected to Transactions for payment processing");
          break;
          
        default:
          toast.info(`${action} feature is currently under development`);
      }
    } catch (error) {
      console.error(`Error handling ${action}:`, error);
      toast.error(`Failed to ${action}. Please try again or contact support.`);
    } finally {
      setIsLoadingAction(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const loadTermMetrics = async (term: string) => {
    if (!schoolId) return;
    
    try {
      setLoadingTermMetrics(true);
      
      const response = await api.getTransactionsByTerm(schoolId, term);
      
      if (response.success && response.data) {
        setTermMetrics(prev => ({
          ...prev,
          [term]: {
            revenue: response.data.totalRevenue || 0,
            balance: response.data.totalBalance || 0,
            outstanding: response.data.outstandingFees || 0
          }
        }));
        
        console.log(`✅ Loaded ${term} metrics:`, {
          revenue: response.data.totalRevenue,
          balance: response.data.totalBalance,
          outstanding: response.data.outstandingFees
        });
      } else {
        console.warn(`Failed to load metrics for ${term}:`, response.error);
      }
    } catch (error) {
      console.error(`Error loading ${term} metrics:`, error);
    } finally {
      setLoadingTermMetrics(false);
    }
  };

  // Get real term-specific metrics from API data
  const getTermSpecificMetrics = (term: string) => {
    // Check if we have real data for this term
    if (termMetrics[term]) {
      return termMetrics[term];
    }
    
    // Fallback to calculated metrics if no real data yet
    const baseRevenue = dashboardMetrics.totalRevenue;
    const baseOutstanding = dashboardMetrics.outstandingFees;
    
    // Use realistic variations as fallback
    let termMultiplier = 1;
    switch (term) {
      case 'Term 1':
        termMultiplier = 0.85; // Term 1 typically has lower collection rates
        break;
      case 'Term 2':
        termMultiplier = 1.0; // Current term (baseline)
        break;
      case 'Term 3':
        termMultiplier = 1.15; // Term 3 often has higher collection due to year-end push
        break;
      default:
        termMultiplier = 1.0;
    }
    
    const termRevenue = Math.floor(baseRevenue * termMultiplier);
    const termOutstanding = Math.floor(baseOutstanding * (2 - termMultiplier)); // Inverse relationship
    const termBalance = Math.max(0, termRevenue - termOutstanding);
    
    return {
      revenue: termRevenue,
      outstanding: termOutstanding,
      balance: termBalance
    };
  };

  const refreshDashboard = async () => {
    try {
      setLoading(true);
      await loadDashboardData();
      toast.success("Dashboard data refreshed");
    } catch (error) {
      toast.error("Failed to refresh dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const renderNavIcon = (iconType: string, isActive: boolean = false) => {
    const iconProps = {
      className: "w-[15px] h-[15px]",
      fill: "none",
      preserveAspectRatio: "none" as const,
      viewBox: "0 0 15 15"
    };

    const strokeColor = isActive ? "#003049" : "#171717";

    switch (iconType) {
      case 'dashboard':
        return (
          <svg {...iconProps} viewBox="0 0 12 12">
            <path d={svgPaths.p1fd7ae00} fill={isActive ? "#003049" : "#00454E"} />
          </svg>
        );
      case 'receipt':
        return (
          <svg {...iconProps}>
            <path d={svgPaths.pf77f300} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" />
            <path d={svgPaths.p3234b080} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" />
            <path d="M5.625 8.13125H7.5" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.625 5.63125H7.5" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.74725 8.125H3.75287" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.74725 5.625H3.75287" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'user':
        return (
          <svg {...iconProps}>
            <path d={svgPaths.p1600ff00} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p3f89be70} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p1be00680} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'magic':
        return (
          <svg {...iconProps}>
            <path d={svgPaths.p256bf880} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p75f1480} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p1fbb9ef0} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
            <path d={svgPaths.pbf9100} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
            <path d={svgPaths.p13bbac80} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" />
          </svg>
        );
      case 'wallet':
        return (
          <svg {...iconProps}>
            <path d="M8.125 5.625H4.375" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p30bcfb80} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p2e9f0c00} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'grammerly':
        return (
          <svg {...iconProps}>
            <path d={svgPaths.p276b9800} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p2b623880} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'setting':
        return (
          <svg {...iconProps}>
            <path d={svgPaths.p66e3e00} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" />
            <path d={svgPaths.p2c65c400} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" />
          </svg>
        );
      case 'logout':
        return (
          <svg {...iconProps} viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#e91f63" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="16,17 21,12 16,7" stroke="#e91f63" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="21" y1="12" x2="9" y2="12" stroke="#e91f63" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = activeNavItem === item.id;
    const isLogout = item.id === 'logout';
    
    return (
      <button
        key={item.id}
        onClick={() => handleNavClick(item.id)}
        className={`relative rounded-[10px] shrink-0 w-full transition-all duration-200 ${
          isLogout ? 'hover:bg-red-50' : 
          isActive ? 'bg-[#ffffff] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)]' : 'hover:bg-white/50'
        }`}
        aria-label={`Navigate to ${item.label}`}
      >
        <div className="flex flex-row items-center relative size-full">
          <div className={`box-border content-stretch flex flex-row gap-[11px] items-center justify-start pl-[15px] py-[11px] relative w-full ${
            sidebarCollapsed ? 'pr-[15px]' : 'pr-4'
          }`}>
            {renderNavIcon(item.icon, isLogout ? false : isActive)}
            {!sidebarCollapsed && (
              <div className={`flex flex-col font-['IBM_Plex_Sans_Devanagari:${isActive ? 'Medium' : 'Regular'}',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-left text-nowrap ${
                isLogout ? 'text-[#e91f63]' :
                isActive ? 'text-[#003049]' : 'text-[#000000]'
              }`}>
                <p className="block leading-[1.2] whitespace-pre">{item.label}</p>
              </div>
            )}
          </div>
        </div>
      </button>
    );
  };

  const renderMainContent = () => {
    if (loading) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003049] mx-auto mb-4"></div>
            <div className="text-gray-600 text-sm">Loading dashboard...</div>
            <div className="text-gray-400 text-xs mt-2">Please wait while we fetch your data</div>
          </div>
        </div>
      );
    }

    if (activeNavItem === 'integrations') {
      return (
        <div className="flex-1 overflow-hidden">
          <div className="h-full w-full flex flex-col">
            <div className="flex-1 overflow-y-auto bg-background">
              <div className="min-h-full p-6">
                <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
                  {/* Page Header */}
                  <div className="flex-shrink-0">
                    <h1 className="font-['IBM_Plex_Sans_Devanagari:Bold',_sans-serif] text-[#1f1f20] text-[24px] mb-2">
                      Integrations
                    </h1>
                    <p className="text-gray-600 text-sm">
                      Connect Master-Fees with your existing business tools and accounting software
                    </p>
                  </div>
                  
                  {/* QuickBooks Integration */}
                  <div className="relative flex-shrink-0">
                    <QuickBooksIntegration 
                      schoolId={schoolId}
                      onConnectionChange={(connected) => {
                        console.log(`QuickBooks connection status changed: ${connected ? 'connected' : 'disconnected'}`);
                      }}
                    />
                  </div>
                  
                  {/* Placeholder for future integrations */}
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="text-gray-500 mb-2">
                      <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">More Integrations Coming Soon</h3>
                    <p className="text-gray-500 text-sm">
                      We're working on integrations with Xero, Sage, Stripe, and other popular business tools.
                    </p>
                  </div>
                  
                  {/* Extra spacing to ensure scroll */}
                  <div className="h-4 flex-shrink-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeNavItem === 'customer-care') {
      return (
        <div className="flex-1 bg-white">
          {/* Empty customer care page */}
        </div>
      );
    }

    if (activeNavItem === 'transactions') {
      return (
        <div className="flex-1 overflow-hidden">
          <div className="h-full w-full flex flex-col gap-3 p-4">
            <div className="flex-shrink-0">
              <Frame1707478532 
                selectedTerm={selectedTransactionTerm}
                onTermChange={async (term) => {
                  setSelectedTransactionTerm(term);
                  console.log(`Transactions term changed to: ${term}`);
                  toast.info(`Loading ${term} financial data...`);
                  await loadTermMetrics(term);
                }}
                onSettingsClick={() => {
                  setActiveNavItem('settings');
                  console.log("Navigated to Settings from Transactions header");
                }}
                totalRevenue={getTermSpecificMetrics(selectedTransactionTerm).revenue}
                totalBalance={getTermSpecificMetrics(selectedTransactionTerm).balance}
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <Frame1707478528 />
            </div>
          </div>
        </div>
      );
    }

    if (activeNavItem === 'customer-management') {
      return (
        <div className="flex-1 overflow-hidden">
          <div className="h-full w-full flex flex-col">
            {/* Fixed Header */}
            <div className="flex-shrink-0 px-6 py-4 bg-white border-b border-gray-200">
              <div className="mb-4">
                <h1 className="font-['IBM_Plex_Sans_Devanagari:Bold',_sans-serif] text-[#1f1f20] text-[24px]">
                  Student Management
                </h1>
              </div>
              <Frame1707478669 />
            </div>
            
            {/* Fixed Filters */}
            <div className="flex-shrink-0 px-6 py-3 bg-white border-b border-gray-100">
              <Frame1707478670 />
            </div>
            
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <Frame1707478602 />
              </div>
            </div>
            
            {/* Fixed Footer */}
            <div className="flex-shrink-0 px-6 py-4 bg-white border-t border-gray-100">
              <div className="h-8 w-full">
                <PaginationContainer />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeNavItem === 'tasks') {
      return (
        <div className="flex-1 overflow-hidden">
          <div className="h-full w-full flex flex-col">
            <div className="flex-1 overflow-y-auto bg-background">
              <div className="min-h-full p-6">
                <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
                  {/* Tasks Header */}
                  <div className="relative w-full flex-shrink-0" style={{ height: '50px' }}>
                    <Group1000005066 />
                  </div>
                  
                  {/* Calendar Tasks Component */}
                  <div className="relative w-full flex-shrink-0" style={{ height: '320px' }}>
                    <Frame1707478778New />
                  </div>
                  
                  {/* Task Management Component */}
                  <div className="relative w-full flex-shrink-0" style={{ height: '300px' }}>
                    <Group1000005058New />
                  </div>
                  
                  {/* Extra spacing to ensure scroll */}
                  <div className="h-4 flex-shrink-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeNavItem === 'wallet') {
      return (
        <div className="flex-1 overflow-hidden">
          <div className="h-full w-full flex flex-col">
            <div className="flex-1 overflow-y-auto bg-[#f8f8f8]">
              <div className="min-h-full p-6">
                <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
                  {/* Wallet Card */}
                  <div className="relative h-[240px] w-full flex-shrink-0">
                    <Group1000005064Wallet />
                  </div>
                  
                  {/* Transaction History Table */}
                  <div className="relative w-full flex-shrink-0" style={{ height: '700px' }}>
                    <Group1000005063 />
                  </div>
                  
                  {/* Extra spacing to ensure scroll */}
                  <div className="h-4 flex-shrink-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeNavItem === 'settings') {
      return (
        <div className="flex-1 overflow-hidden">
          <div className="h-full w-full flex flex-col">
            <div className="flex-1 overflow-y-auto bg-background">
              <div className="min-h-full p-6">
                <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
                  {/* Search Settings Header */}
                  <div className="flex-shrink-0">
                    <ConnectionsContainer />
                  </div>
                  
                  {/* Account Settings Form */}
                  <div className="relative flex-shrink-0" style={{ height: '620px' }}>
                    <Group1000005065 />
                  </div>
                  
                  {/* Extra spacing to ensure scroll */}
                  <div className="h-4 flex-shrink-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Enhanced dashboard content with real data
    return (
      <div className="flex-1 p-4">
        <div className="flex gap-4 h-full min-h-0">
          {/* Left Section - Charts and Metrics */}
          <div className="flex-[1] min-w-0 flex flex-col gap-4">
            {/* Revenue Chart Section */}
            <div className="flex-1 bg-[rgba(239,234,234,1)] rounded-[3px]">
              {/* Revenue Recovery Chart */}
              <div className="relative w-full h-[280px] bg-white shadow-lg rounded-lg mx-auto">
                {/* Chart Header */}
                <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-3 items-center text-[16px]">
                      <button
                        onClick={() => setSelectedPeriod(selectedPeriod === 'Term 2' ? 'Term 1' : 'Term 2')}
                        className="font-['Inter:Bold',_sans-serif] font-bold hover:text-[#003049] transition-colors"
                        aria-label={`Switch to ${selectedPeriod === 'Term 2' ? 'Term 1' : 'Term 2'}`}
                      >
                        {selectedPeriod}
                      </button>
                      <button
                        onClick={() => setSelectedYear(selectedYear === '2025' ? '2024' : '2025')}
                        className="font-['Inter:Regular',_sans-serif] hover:text-[#003049] transition-colors"
                        aria-label={`Switch to year ${selectedYear === '2025' ? '2024' : '2025'}`}
                      >
                        {selectedYear}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={handleCompare}
                      className="bg-[#e9f1ef] px-2.5 py-1 rounded-md hover:bg-[#d0e7e1] transition-colors"
                      aria-label="Compare with previous period"
                    >
                      <div className="font-['Inter:Medium',_sans-serif] text-[#025864] text-[8px]">Compare</div>
                    </button>
                    <button 
                      onClick={handleSettings} 
                      className="size-[13px] hover:opacity-70 transition-opacity"
                      aria-label="Chart settings"
                    >
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
                        <path d={svgPaths.p1f4f2480} fill="#025864" />
                        <path d={svgPaths.p217b6f00} fill="#025864" />
                      </svg>
                    </button>
                    <button 
                      onClick={handleMaximize} 
                      className="size-[13px] hover:opacity-70 transition-opacity"
                      aria-label="Maximize chart"
                    >
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
                        <path d="M11.375 4.875V1.625H8.125" stroke="#025864" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
                        <path d="M1.625 8.125V11.375H4.875" stroke="#025864" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
                        <path d="M11.375 1.625L7.3125 5.6875" stroke="#025864" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
                        <path d="M5.6875 7.3125L1.625 11.375" stroke="#025864" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Chart Title */}
                <div className="absolute top-4 left-6">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="size-2.5 rotate-90 scale-y-[-100%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                        <path d={svgPaths.pcb65b60} stroke="#171717" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" />
                      </svg>
                    </div>
                    <div className="font-['Inter:Semi_Bold',_sans-serif] text-[18px]">Revenue Recovery</div>
                    <div className="size-2.5 rotate-90">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                        <path d={svgPaths.pcb65b60} stroke="#171717" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex gap-1.5 items-center ml-4">
                    <div className="bg-[#c0f1e5] px-2 py-0.5 rounded-[20px]">
                      <div className="font-['Inter:Extra_Bold',_sans-serif] text-[#02424b] text-[8px]">
                        {selectedPeriod === 'Term 2' ? '+8%' : '+5%'}
                      </div>
                    </div>
                    <div className="bg-[#c0f1e5] px-2 py-[3px] rounded-[20px] flex items-center gap-2">
                      <div className="size-1.5">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
                          <circle cx="3" cy="3" fill="white" r="2.5" stroke="#025864" />
                        </svg>
                      </div>
                      <div className="font-['Inter:Semi_Bold',_sans-serif] text-[#025964] text-[8px]">
                        Collected: {formatCurrency(dashboardMetrics.totalRevenue)}
                      </div>
                      <div className="font-['Inter:Semi_Bold',_sans-serif] text-[#025964] text-[8px]">
                        Outstanding: {formatCurrency(dashboardMetrics.outstandingFees)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Chart Bars */}
                <div className="absolute bottom-16 left-14 right-14 top-24">
                  <div className="relative h-full">
                    {['Jan', 'Feb', 'Mar', 'April'].map((month, index) => {
                      const heights = selectedPeriod === 'Term 2' 
                        ? ['20%', '25%', '30%', '75%'] 
                        : ['15%', '20%', '25%', '60%'];
                      const height = heights[index];
                      const isActive = index === 3; // April is active
                      
                      return (
                        <button
                          key={month}
                          onClick={() => toast.info(`Viewing ${month} ${selectedYear} revenue details`)}
                          className={`absolute bottom-0 w-[8%] rounded-lg transition-all hover:opacity-80 ${
                            isActive 
                              ? 'bg-[#025964] border border-[#003049]' 
                              : 'bg-[#eaedf1] hover:bg-[#d0d4d9]'
                          }`}
                          style={{ 
                            height, 
                            left: `${10 + index * 20}%`
                          }}
                          aria-label={`View ${month} revenue data`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Y-Axis Labels */}
                <div className="absolute left-2 top-20 bottom-20 w-12 flex flex-col justify-between">
                  {['100%', '90%', '80%', '70%', '60%', '50%', '40%', '30%', '20%', '10%'].map((percentage) => (
                    <div key={percentage} className="font-['Inter:Regular',_sans-serif] text-[#808080] text-[8px]">
                      {percentage}
                    </div>
                  ))}
                </div>

                {/* X-Axis Labels */}
                <div className="absolute bottom-4 left-14 right-14 flex justify-around">
                  {['Jan', 'Feb', 'Mar', 'April'].map((month) => (
                    <div key={month} className="font-['Inter:Regular',_sans-serif] text-[8px]">
                      {month}
                    </div>
                  ))}
                </div>

                {/* Goal Indicators */}
                <div className="absolute left-6 top-24">
                  <div className="bg-[#ecf3f1] px-[7px] py-[3px] rounded-[10px] mb-12">
                    <div className="font-['Inter:Semi_Bold',_sans-serif] text-[#025864] text-[8px]">Target: 95%</div>
                  </div>
                  <div className="bg-[#025864] px-[7px] py-[3px] rounded-[10px]">
                    <div className="font-['Inter:Semi_Bold',_sans-serif] text-white text-[8px]">
                      Current: {dashboardMetrics.collectionRate}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Breakdown Component */}
              <div className="w-full mt-3">
                <Group1000005059 
                  schoolId={schoolId}
                  totalRevenue={dashboardMetrics.totalRevenue}
                  outstandingFees={dashboardMetrics.outstandingFees}
                  onViewTransactions={() => {
                    setActiveNavItem('transactions');
                    console.log('Navigated to Transactions from breakdown');
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Section - Updates and Notifications */}
          <div className="flex-[1] bg-white rounded-lg shadow-sm min-w-0">
            <div className="relative h-[520px] w-full">
              {/* Updates Header */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="font-['IBM_Plex_Sans_Devanagari:Bold',_sans-serif] text-[#1f1f20] text-[18px]">
                    Live Updates
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[8px] ${
                    isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                    }`}></div>
                    {isConnected ? 'Online' : 'Offline'}
                  </div>
                  <button
                    onClick={refreshDashboard}
                    className="text-xs text-gray-500 hover:text-gray-700 underline ml-2"
                    disabled={loading}
                    aria-label="Refresh dashboard data"
                  >
                    {loading ? 'Refreshing...' : 'Refresh'}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMarkAllAsRead}
                    className="bg-[#025864] text-white px-3 py-1.5 rounded-md hover:opacity-80 transition-opacity"
                    disabled={unreadCount === 0}
                    aria-label="Mark all notifications as read"
                  >
                    <div className="font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] text-[10px] whitespace-nowrap">
                      Mark all read
                    </div>
                  </button>
                  <div className="bg-[#e91f63] text-white px-2 py-0.5 rounded-[19px] min-w-[25px] text-center">
                    <div className="font-['Roboto:Bold',_sans-serif] text-[9px]">{unreadCount}</div>
                  </div>
                </div>
              </div>

              {/* Notifications List */}
              <div className="absolute top-20 left-6 right-6 bottom-6 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <div className="mb-4">
                      <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM9.586 14.414l.707-.707A2 2 0 0111.414 13H14a2 2 0 012 2v3a2 2 0 01-2 2h-2.586l-.707-.707A2 2 0 019.586 18.586L8.172 17.172a2 2 0 010-2.828l1.414-1.414z" />
                      </svg>
                    </div>
                    <p className="text-sm mb-2">No notifications</p>
                    <p className="text-xs text-gray-400 mb-4">Real-time notifications will appear here when students make payments or enroll</p>
                    <p className="text-xs text-gray-400">Last updated: {formatTimeAgo(lastRefresh.toISOString())}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <button
                        key={notification.id}
                        onClick={() => handleMarkAsRead(notification.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-all hover:shadow-sm transform hover:scale-[1.02] ${
                          notification.read 
                            ? 'bg-gray-50 border-gray-200 opacity-75' 
                            : 'bg-white border-gray-300 shadow-sm ring-1 ring-blue-100'
                        }`}
                        aria-label={`Mark ${notification.title} as read`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className={`text-[12px] font-medium flex items-center gap-2 ${
                            notification.type === 'error' ? 'text-red-600' :
                            notification.type === 'warning' ? 'text-orange-600' :
                            notification.type === 'success' ? 'text-green-600' :
                            'text-blue-600'
                          }`}>
                            {notification.type === 'success' && (
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                            {notification.type === 'info' && (
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                            )}
                            {notification.type === 'warning' && (
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            )}
                            {notification.title}
                          </div>
                          <div className="text-[10px] text-gray-500">
                            {formatTimeAgo(notification.timestamp)}
                          </div>
                        </div>
                        <div className="text-[11px] text-gray-700 leading-relaxed">
                          {notification.message}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className={`w-2 h-2 rounded-full ${
                            notification.type === 'error' ? 'bg-red-400' :
                            notification.type === 'warning' ? 'bg-orange-400' :
                            notification.type === 'success' ? 'bg-green-400' :
                            'bg-blue-400'
                          }`} />
                          <div className="flex items-center gap-2">
                            {notification.metadata?.amount && (
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[8px]">
                                {formatCurrency(notification.metadata.amount)}
                              </span>
                            )}
                            {!notification.read && (
                              <div className="w-2 h-2 bg-[#e91f63] rounded-full animate-pulse" />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f8f8f8] h-screen w-screen overflow-hidden flex max-w-full">
      {/* Sidebar */}
      <div className={`bg-[#f5f7f9] border-r border-[#e8e8e8] flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-56'
      } min-w-0`}>
        {/* Logo and Hamburger */}
        <div className="flex items-center justify-between p-3 border-b border-[#e8e8e8]">
          <div className="flex items-center gap-3">
            <div className="size-[22px] flex-shrink-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                <path d={svgPaths.p2b19d800} fill="#003049" />
                <path d={svgPaths.p30679380} stroke="#5DFCAF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
              </svg>
            </div>
            {!sidebarCollapsed && (
              <div className="font-['Baloo_Bhaina:Regular',_sans-serif] text-[#003049] text-[20px]">
                Master-Fees
              </div>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1.5 hover:bg-gray-200 rounded-md transition-colors"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="#003049" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          {/* General Navigation */}
          <div className="p-3">
            <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] justify-center leading-[0] not-italic text-[#9ca0a4] text-[11px] text-left mb-3">
              {!sidebarCollapsed && <p className="block leading-[1.2]">GENERAL</p>}
            </div>
            <div className="space-y-1">
              {generalNavItems.map(renderNavItem)}
            </div>
          </div>

          {/* Support Navigation */}
          <div className="p-4">
            <div className="flex flex-col font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] justify-center leading-[0] not-italic text-[#9ca0a4] text-[11px] text-left mb-3">
              {!sidebarCollapsed && <p className="block leading-[1.2]">SUPPORT</p>}
            </div>
            <div className="space-y-1">
              {supportNavItems.map(renderNavItem)}
            </div>
          </div>
        </div>

        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-[#e8e8e8]">
            <div className="text-center font-['Microsoft_Sans_Serif:Regular',_sans-serif] text-[#707479] text-[8px]">
              <p className="block leading-[1.2]">
                © 2025 Master-Fees Ltd.
                <br />
                All Rights Reserved
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Hide on integrations and customer-care pages */}
        {activeNavItem !== 'integrations' && activeNavItem !== 'customer-care' && (
          <header className="bg-[#f8f8f8] p-3" role="banner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="font-['IBM_Plex_Sans_Devanagari:Medium',_sans-serif] text-[#000000] text-[16px]">
                  {schoolName}
                </div>
                {isConnected && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 text-[10px]">Live</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Wallet Info */}
                <button
                  onClick={handleWalletClick}
                  className="flex items-center gap-2.5 px-2.5 py-1 hover:bg-gray-50 transition-colors rounded-lg"
                  aria-label="View wallet details"
                >
                  <div className="size-5">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <path d="M10.8333 7.5H5.83333" stroke="#003049" strokeLinecap="round" strokeLinejoin="round" />
                      <path d={svgPaths.pf0d1800} stroke="#003049" strokeLinecap="round" strokeLinejoin="round" />
                      <path d={svgPaths.p224d6600} stroke="#003049" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="text-[#003049] text-left">
                    <div className="font-['IBM_Plex_Sans_Devanagari:SemiBold',_sans-serif] text-[14px] whitespace-nowrap">
                      {formatCurrency(dashboardMetrics.totalRevenue)}
                    </div>
                    <div className="font-['Inter:Light',_sans-serif] text-[8px]">
                      Available Balance
                    </div>
                  </div>
                  <div className="size-3">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="#003049" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {/* Withdraw Button */}
                <button
                  onClick={handleWithdraw}
                  className="bg-[#003049] text-white px-2.5 py-2.5 hover:bg-[#004060] transition-colors rounded"
                  disabled={isLoadingAction}
                  aria-label="Initiate withdrawal"
                >
                  <div className="font-['Inter:Semi_Bold',_sans-serif] text-[12px] whitespace-nowrap">
                    {isLoadingAction ? 'Processing...' : 'Withdraw'}
                  </div>
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden bg-[rgba(255,255,255,0)]" role="main">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [appState, setAppState] = useState<'login' | 'signup' | 'forgot-password' | 'reset-password' | 'onboarding' | 'detailed-onboarding' | 'final-onboarding' | 'pricing-structure' | 'class-selection' | 'product-groups' | 'dashboard'>('login');
  const [schoolName, setSchoolName] = useState('Twalumbu Education Centre');
  const [schoolId, setSchoolId] = useState<string>('');
  const [tempSchoolName, setTempSchoolName] = useState('');
  const [basicFormData, setBasicFormData] = useState<FormData>({
    schoolName: '',
    institutionType: '',
    country: '',
    state: '',
    town: ''
  });
  const [extendedFormData, setExtendedFormData] = useState<ExtendedFormData>({
    schoolName: '',
    institutionType: '',
    country: '',
    state: '',
    town: '',
    schoolEmail: '',
    contactNumbers: '',
    physicalAddress: '',
    schoolCategories: '',
    schoolLogo: null
  });
  const [completePricingData, setCompletePricingData] = useState<CompletePricingData>({
    schoolName: '',
    institutionType: '',
    country: '',
    state: '',
    town: '',
    schoolEmail: '',
    contactNumbers: '',
    physicalAddress: '',
    schoolCategories: '',
    schoolLogo: null,
    selectedGrades: [],
    classesPerGrade: 0,
    exceptions: ''
  });
  const [classSelectionData, setClassSelectionData] = useState<ClassSelectionData>({
    schoolName: '',
    institutionType: '',
    country: '',
    state: '',
    town: '',
    schoolEmail: '',
    contactNumbers: '',
    physicalAddress: '',
    schoolCategories: '',
    schoolLogo: null,
    selectedGrades: [],
    classesPerGrade: 0,
    exceptions: '',
    selectedClasses: []
  });

  // Forgot password state
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordPhone, setForgotPasswordPhone] = useState('');
  const [forgotPasswordMethod, setForgotPasswordMethod] = useState<'email' | 'sms'>('email');

  // Check for existing school session on mount
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    console.log('🔍 Checking existing session...');
    
    try {
      const savedAccessToken = localStorage.getItem('master_fees_access_token');
      const savedSchoolId = localStorage.getItem('master_fees_school_id');
      const savedSchoolName = localStorage.getItem('master_fees_school_name');
      const keepLoggedIn = localStorage.getItem('master_fees_keep_logged_in') === 'true';
      
      console.log('📊 Session data found:', {
        hasAccessToken: !!savedAccessToken,
        hasSchoolId: !!savedSchoolId,
        hasSchoolName: !!savedSchoolName,
        keepLoggedIn,
        accessTokenLength: savedAccessToken?.length || 0
      });
      
      // Only restore session if user previously chose to stay logged in
      if (savedAccessToken && savedSchoolId && savedSchoolName && keepLoggedIn) {
        console.log('✅ All session data present and keepLoggedIn is true, attempting to restore...');
        
        // Set the access token in the API
        api.setAccessToken(savedAccessToken);
        
        console.log('🔐 Verifying session validity...');
        // Verify the session is still valid
        const response = await api.verifySession();
        
        console.log('📋 Session verification response:', response);
        
        if (response.success) {
          console.log('✅ Session verified successfully, restoring user session');
          setSchoolId(savedSchoolId);
          setSchoolName(savedSchoolName);
          setAppState('dashboard');
          toast.success(`Welcome back to ${savedSchoolName}`);
        } else {
          console.log('❌ Session verification failed:', response.error);
          
          // Check if the error is due to expired/invalid token
          if (response.error === 'Token expired or invalid' || (response as any).expired) {
            console.log('🔒 Token is expired or invalid, clearing session and showing appropriate message');
            clearStoredSession();
            toast.info("Your session has expired. Please sign in again.");
          } else {
            console.log('💥 Other verification error, clearing session');
            clearStoredSession();
            toast.error("Session verification failed. Please sign in again.");
          }
        }
      } else if (savedAccessToken && !keepLoggedIn) {
        console.log('🗑️ Found session data but keepLoggedIn is false, clearing session');
        // Clear session data if user didn't choose to stay logged in
        clearStoredSession();
      } else {
        console.log('ℹ️ No complete session data found or user chose not to stay logged in');
        console.log('Missing components:', {
          accessToken: !savedAccessToken,
          schoolId: !savedSchoolId,
          schoolName: !savedSchoolName,
          keepLoggedIn: !keepLoggedIn
        });
      }
    } catch (error) {
      console.error('💥 Session verification failed with error:', error);
      clearStoredSession();
      toast.error("Unable to verify session. Please sign in again.");
    }
  };

  const clearStoredSession = () => {
    console.log('🧹 Clearing all stored session data');
    localStorage.removeItem('master_fees_access_token');
    localStorage.removeItem('master_fees_school_id');
    localStorage.removeItem('master_fees_school_name');
    localStorage.removeItem('master_fees_keep_logged_in');
  };

  const handleLogin = (schoolId: string, schoolName: string, accessToken: string, keepLoggedIn: boolean = false) => {
    console.log('🔑 handleLogin called with:', {
      schoolId,
      schoolName,
      accessTokenLength: accessToken.length,
      keepLoggedIn
    });
    
    try {
      // Set the access token in the API for authenticated requests
      api.setAccessToken(accessToken);
      
      setSchoolId(schoolId);
      setSchoolName(schoolName);
      setAppState('dashboard');
      
      // Only save to localStorage if user wants to stay logged in
      if (keepLoggedIn) {
        console.log('💾 Saving session data to localStorage (keepLoggedIn: true)');
        localStorage.setItem('master_fees_access_token', accessToken);
        localStorage.setItem('master_fees_school_id', schoolId);
        localStorage.setItem('master_fees_school_name', schoolName);
        localStorage.setItem('master_fees_keep_logged_in', 'true');
        
        // Verify storage was successful
        const stored = {
          accessToken: localStorage.getItem('master_fees_access_token'),
          schoolId: localStorage.getItem('master_fees_school_id'),
          schoolName: localStorage.getItem('master_fees_school_name'),
          keepLoggedIn: localStorage.getItem('master_fees_keep_logged_in')
        };
        console.log('✅ Session data saved to localStorage:', stored);
        
        toast.success("Successfully signed in - you will stay logged in");
      } else {
        console.log('🚫 User chose not to stay logged in, clearing any existing session data');
        // Clear any existing session data if user doesn't want to stay logged in
        clearStoredSession();
        toast.success("Successfully signed in");
      }
    } catch (error) {
      console.error('💥 Login error:', error);
      toast.error("An error occurred during sign in. Please try again.");
    }
  };

  const handleSignup = () => {
    setAppState('signup');
    console.log("Navigated to signup");
  };

  const handleSignupComplete = (schoolId: string, schoolName: string, accessToken: string) => {
    try {
      // Set the access token in the API for authenticated requests
      api.setAccessToken(accessToken);
      
      setSchoolId(schoolId);
      setSchoolName(schoolName);
      setAppState('dashboard');
      
      // For new signups, default to keeping logged in for better user experience
      localStorage.setItem('master_fees_access_token', accessToken);
      localStorage.setItem('master_fees_school_id', schoolId);
      localStorage.setItem('master_fees_school_name', schoolName);
      localStorage.setItem('master_fees_keep_logged_in', 'true');
      
      toast.success(`Welcome to Master-Fees, ${schoolName}!`);
    } catch (error) {
      console.error('Signup completion error:', error);
      toast.error("An error occurred during account setup. Please try again.");
    }
  };

  const handleBackToLogin = () => {
    setAppState('login');
  };

  const handleForgotPassword = () => {
    setAppState('forgot-password');
    console.log("Navigated to password reset");
  };

  const handleForgotPasswordCodeSent = (email: string, phone: string, method: 'email' | 'sms') => {
    setForgotPasswordEmail(email);
    setForgotPasswordPhone(phone);
    setForgotPasswordMethod(method);
    setAppState('reset-password');
    toast.success(`Reset code sent via ${method}`);
  };

  const handlePasswordReset = (schoolId: string, schoolName: string, accessToken: string) => {
    try {
      // Set the access token in the API for authenticated requests
      api.setAccessToken(accessToken);
      
      setSchoolId(schoolId);
      setSchoolName(schoolName);
      setAppState('dashboard');
      
      // For password resets, default to keeping logged in for better user experience
      localStorage.setItem('master_fees_access_token', accessToken);
      localStorage.setItem('master_fees_school_id', schoolId);
      localStorage.setItem('master_fees_school_name', schoolName);
      localStorage.setItem('master_fees_keep_logged_in', 'true');
      
      toast.success(`Password reset successful. Welcome back to ${schoolName}.`);
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error("An error occurred during password reset. Please try again.");
    }
  };

  const handleResendCode = () => {
    setAppState('forgot-password');
    toast.info("Please request a new reset code");
  };

  const handleOnboardingNext = (enteredSchoolName: string) => {
    setTempSchoolName(enteredSchoolName);
    setAppState('detailed-onboarding');
    console.log("Proceeding to detailed onboarding");
  };

  const handleDetailedOnboardingComplete = (formData: FormData) => {
    setBasicFormData(formData);
    setAppState('final-onboarding');
    console.log("Proceeding to final onboarding");
  };

  const handleFinalOnboardingComplete = (formData: ExtendedFormData) => {
    setExtendedFormData(formData);
    setAppState('pricing-structure');
    console.log("Proceeding to pricing structure");
  };

  const handlePricingStructureComplete = (formData: CompletePricingData) => {
    setCompletePricingData(formData);
    setAppState('class-selection');
    console.log("Proceeding to class selection");
  };

  const handleClassSelectionComplete = (formData: ClassSelectionData) => {
    setClassSelectionData(formData);
    setAppState('product-groups');
    console.log("Proceeding to product groups");
  };

  const handleProductGroupComplete = async (formData: FinalOnboardingData) => {
    try {
      toast.info("Creating your school account...");
      
      // Create school in Supabase
      const response = await api.createSchool({
        schoolName: formData.schoolName,
        institutionType: formData.institutionType,
        country: formData.country,
        state: formData.state,
        town: formData.town,
        schoolEmail: formData.schoolEmail,
        contactNumbers: formData.contactNumbers,
        physicalAddress: formData.physicalAddress,
        schoolCategories: formData.schoolCategories,
        selectedGrades: formData.selectedGrades,
        classesPerGrade: formData.classesPerGrade,
        exceptions: formData.exceptions,
        selectedClasses: formData.selectedClasses,
        productGroups: formData.productGroups
      });

      if (response.success && response.schoolId) {
        setSchoolId(response.schoolId);
        setSchoolName(formData.schoolName);
        setAppState('dashboard');
        
        // Save to localStorage for persistence
        localStorage.setItem('master_fees_school_id', response.schoolId);
        localStorage.setItem('master_fees_school_name', formData.schoolName);
        
        toast.success(`Onboarding completed successfully! Welcome to Master-Fees, ${formData.schoolName}!`);
      } else {
        throw new Error(response.error || 'Failed to create school account');
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast.error('Failed to complete onboarding. Please try again or contact support.');
    }
  };

  const handleBackToOnboarding = () => {
    setAppState('onboarding');
  };

  const handleBackToDetailedOnboarding = () => {
    setAppState('detailed-onboarding');
  };

  const handleBackToFinalOnboarding = () => {
    setAppState('final-onboarding');
  };

  const handleBackToPricingStructure = () => {
    setAppState('pricing-structure');
  };

  const handleBackToClassSelection = () => {
    setAppState('class-selection');
  };

  const handleStartOnboarding = () => {
    setAppState('onboarding');
    console.log("Started onboarding flow");
  };

  const handleLogout = () => {
    console.log('🚪 Logout initiated');
    
    // Sign out from API and clear localStorage
    api.signOut();
    
    // Clear all stored session data
    clearStoredSession();
    
    setAppState('login');
    setSchoolName('Twalumbu Education Centre'); // Reset to default
    setSchoolId('');
    setTempSchoolName('');
    
    // Reset all form data
    setBasicFormData({
      schoolName: '',
      institutionType: '',
      country: '',
      state: '',
      town: ''
    });
    setExtendedFormData({
      schoolName: '',
      institutionType: '',
      country: '',
      state: '',
      town: '',
      schoolEmail: '',
      contactNumbers: '',
      physicalAddress: '',
      schoolCategories: '',
      schoolLogo: null
    });
    setCompletePricingData({
      schoolName: '',
      institutionType: '',
      country: '',
      state: '',
      town: '',
      schoolEmail: '',
      contactNumbers: '',
      physicalAddress: '',
      schoolCategories: '',
      schoolLogo: null,
      selectedGrades: [],
      classesPerGrade: 0,
      exceptions: ''
    });
    setClassSelectionData({
      schoolName: '',
      institutionType: '',
      country: '',
      state: '',
      town: '',
      schoolEmail: '',
      contactNumbers: '',
      physicalAddress: '',
      schoolCategories: '',
      schoolLogo: null,
      selectedGrades: [],
      classesPerGrade: 0,
      exceptions: '',
      selectedClasses: []
    });
    
    console.log("User signed out successfully");
  };

  if (appState === 'login') {
    return (
      <div className="relative w-screen h-screen max-w-[1366px] max-h-[780px] overflow-hidden mx-auto">
        <FeeMasterLoginPage onLogin={handleLogin} onSignup={handleSignup} onForgotPassword={handleForgotPassword} />
      </div>
    );
  }

  if (appState === 'signup') {
    return (
      <div className="relative w-screen h-screen max-w-[1366px] max-h-[780px] overflow-hidden mx-auto">
        <SignupPage onSignup={handleSignupComplete} onBack={handleBackToLogin} />
      </div>
    );
  }

  if (appState === 'forgot-password') {
    return (
      <div className="relative w-screen h-screen max-w-[1366px] max-h-[780px] overflow-hidden mx-auto">
        <ForgotPasswordPage onCodeSent={handleForgotPasswordCodeSent} onBack={handleBackToLogin} />
      </div>
    );
  }

  if (appState === 'reset-password') {
    return (
      <div className="relative w-screen h-screen max-w-[1366px] max-h-[780px] overflow-hidden mx-auto">
        <ResetPasswordPage 
          email={forgotPasswordEmail}
          phone={forgotPasswordPhone}
          method={forgotPasswordMethod}
          onPasswordReset={handlePasswordReset}
          onBack={() => setAppState('forgot-password')}
          onResendCode={handleResendCode}
        />
      </div>
    );
  }

  if (appState === 'onboarding') {
    return (
      <div className="relative w-screen h-screen max-w-[1366px] max-h-[780px] overflow-hidden mx-auto">
        <OnboardingPage onComplete={handleOnboardingNext} onBack={handleStartOnboarding} />
      </div>
    );
  }

  if (appState === 'detailed-onboarding') {
    return (
      <div className="relative w-screen h-screen max-w-[1366px] max-h-[780px] overflow-hidden mx-auto">
        <DetailedOnboardingPage 
          onComplete={handleDetailedOnboardingComplete} 
          onBack={handleBackToOnboarding}
          initialSchoolName={tempSchoolName}
        />
      </div>
    );
  }

  if (appState === 'final-onboarding') {
    return (
      <div className="relative w-screen h-screen max-w-[1366px] max-h-[780px] overflow-hidden mx-auto">
        <FinalOnboardingPage 
          onComplete={handleFinalOnboardingComplete} 
          onBack={handleBackToDetailedOnboarding}
          basicFormData={basicFormData}
        />
      </div>
    );
  }

  if (appState === 'pricing-structure') {
    return (
      <div className="relative w-screen h-screen max-w-[1366px] max-h-[780px] overflow-hidden mx-auto">
        <PricingStructurePage 
          onComplete={handlePricingStructureComplete} 
          onBack={handleBackToFinalOnboarding}
          extendedFormData={extendedFormData}
        />
      </div>
    );
  }

  if (appState === 'class-selection') {
    return (
      <div className="relative w-screen h-screen max-w-[1366px] max-h-[780px] overflow-hidden mx-auto">
        <ClassSelectionPage 
          onComplete={handleClassSelectionComplete} 
          onBack={handleBackToPricingStructure}
          completePricingData={completePricingData}
        />
      </div>
    );
  }

  if (appState === 'product-groups') {
    return (
      <div className="relative w-screen h-screen max-w-[1366px] max-h-[780px] overflow-hidden mx-auto">
        <ProductGroupPage 
          onComplete={handleProductGroupComplete} 
          onBack={handleBackToClassSelection}
          completePricingData={classSelectionData}
        />
      </div>
    );
  }

  return <Dashboard onLogout={handleLogout} schoolName={schoolName} schoolId={schoolId} />;
}