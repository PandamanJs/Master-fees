import { projectId, publicAnonKey } from './info'

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-0a4ed55a`

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  details?: string
}

// Mock data for fallback when server is unavailable
const mockMetrics = {
  totalStudents: 147,
  totalRevenue: 532000,
  outstandingFees: 87500,
  collectionRate: 84.2,
  overduePayments: 12,
  newEnrollments: 7
}

const mockNotifications = [
  {
    id: '1',
    title: 'Welcome to Master-Fees!',
    message: 'Your school account has been set up successfully. You can now start managing fees.',
    type: 'success',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: '2',
    title: 'Payment Reminder',
    message: 'Grade 10 Class A has 5 outstanding fee payments due this week.',
    type: 'warning',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: '3',
    title: 'System Update',
    message: 'Fee collection system has been updated with new features.',
    type: 'info',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    read: true
  }
]

class FeeMasterAPI {
  private accessToken: string | null = null

  setAccessToken(token: string | null) {
    console.log('🔐 API: Setting access token:', token ? `${token.substring(0, 10)}...` : 'null');
    this.accessToken = token
  }

  private async request<T = any>(
    endpoint: string, 
    method: string = 'GET',
    data?: any,
    useAuth: boolean = false
  ): Promise<ApiResponse<T>> {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': useAuth && this.accessToken 
          ? `Bearer ${this.accessToken}` 
          : `Bearer ${publicAnonKey}`,
      },
    }

    if (data) {
      options.body = JSON.stringify(data)
    }
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, options)

      const responseText = await response.text()
      
      // Try to parse as JSON
      let data
      try {
        data = JSON.parse(responseText)
      } catch {
        console.error('Non-JSON response:', responseText)
        return { success: false, error: 'Invalid server response', details: responseText }
      }
      
      if (!response.ok) {
        console.error(`API Error: ${response.status}`, data)
        
        // Handle specific error cases
        if (response.status === 401) {
          return { 
            success: false, 
            error: 'Authentication failed', 
            details: 'Token expired or invalid' 
          }
        }
        
        return { success: false, error: data.error || 'API request failed', details: data.details }
      }

      return data
    } catch (error) {
      console.error('API Request failed:', error)
      // Return mock data as fallback
      return this.getMockResponse(endpoint, method)
    }
  }

  private getMockResponse(endpoint: string, method: string): ApiResponse<any> {
    console.log('Using mock data for:', endpoint, method)
    
    if (endpoint.includes('/metrics')) {
      return { success: true, data: mockMetrics }
    }
    
    if (endpoint.includes('/notifications')) {
      if (method === 'POST') {
        return { success: true, data: { id: Date.now().toString() } }
      }
      return { success: true, data: mockNotifications }
    }
    
    if (endpoint.includes('/students') && method === 'POST') {
      return { success: true, data: [] }
    }
    
    return { success: true, data: {} }
  }

  // School management
  async createSchool(schoolData: any) {
    return this.request('/schools', 'POST', schoolData)
  }

  async getSchool(schoolId: string) {
    return this.request(`/schools/${schoolId}`)
  }

  async updateSchool(schoolId: string, updateData: any) {
    return this.request(`/schools/${schoolId}`, 'PUT', updateData)
  }

  // Dashboard metrics
  async getMetrics(schoolId: string) {
    return this.request(`/schools/${schoolId}/metrics`)
  }

  // Student management
  async createStudent(schoolId: string, studentData: any) {
    return this.request(`/schools/${schoolId}/students`, 'POST', studentData)
  }

  async getStudents(schoolId: string) {
    return this.request(`/schools/${schoolId}/students`)
  }

  async bulkCreateStudents(schoolId: string, studentsData: any[]) {
    return this.request(`/schools/${schoolId}/students/bulk`, 'POST', studentsData)
  }

  // Transaction management
  async createTransaction(schoolId: string, transactionData: any) {
    return this.request(`/schools/${schoolId}/transactions`, 'POST', transactionData)
  }

  async getTransactions(schoolId: string) {
    return this.request(`/schools/${schoolId}/transactions`)
  }

  // Notifications
  async getNotifications(schoolId: string) {
    return this.request(`/schools/${schoolId}/notifications`)
  }

  async createNotification(schoolId: string, notificationData: any) {
    return this.request(`/schools/${schoolId}/notifications`, 'POST', notificationData)
  }

  async markNotificationAsRead(schoolId: string, notificationId: string) {
    return this.request(`/schools/${schoolId}/notifications/${notificationId}/read`, 'PUT')
  }

  // Utility methods
  async sendPaymentReminders(schoolId: string) {
    // Create a notification about sending reminders
    return this.createNotification(schoolId, {
      title: 'Payment Reminders Sent',
      message: 'Fee payment reminders have been sent to students with outstanding balances',
      type: 'success'
    })
  }

  async generateSampleData(schoolId: string) {
    // Generate sample students
    const sampleStudents = [
      {
        firstName: 'John',
        lastName: 'Banda',
        className: 'Grade 10 Class A',
        grade: 'Grade 10',
        parentName: 'Mary Banda',
        parentPhone: '+260-97-123-4567',
        parentEmail: 'mary.banda@email.com',
        feesOwed: 15000,
        feesPaid: 10000,
        status: 'active'
      },
      {
        firstName: 'Grace',
        lastName: 'Mwale',
        className: 'Grade 11 Class B',
        grade: 'Grade 11',
        parentName: 'Peter Mwale',
        parentPhone: '+260-96-987-6543',
        parentEmail: 'peter.mwale@email.com',
        feesOwed: 18000,
        feesPaid: 18000,
        status: 'active'
      },
      {
        firstName: 'Daniel',
        lastName: 'Phiri',
        className: 'Grade 9 Class A',
        grade: 'Grade 9',
        parentName: 'Susan Phiri',
        parentPhone: '+260-95-555-1234',
        parentEmail: 'susan.phiri@email.com',
        feesOwed: 12000,
        feesPaid: 8000,
        status: 'active'
      }
    ]

    const studentsResult = await this.bulkCreateStudents(schoolId, sampleStudents)
    
    if (studentsResult.success && studentsResult.data) {
      // Create sample transactions for the students
      for (const student of studentsResult.data) {
        await this.createTransaction(schoolId, {
          studentId: student.id,
          amount: student.feesPaid,
          type: 'payment',
          status: 'completed',
          description: `Fee payment for ${student.firstName} ${student.lastName}`,
          paymentMethod: 'Bank Transfer',
        })
      }
    }

    return studentsResult
  }

  // Revenue breakdown
  async getRevenueBreakdown(schoolId: string, category?: string) {
    const endpoint = category 
      ? `/schools/${schoolId}/breakdown?category=${category}`
      : `/schools/${schoolId}/breakdown`;
    return this.request(endpoint)
  }

  // Real-time subscriptions
  async subscribeToUpdates(schoolId: string, onUpdate: (event: any) => void) {
    try {
      // Start polling for updates every 5 seconds
      const pollInterval = setInterval(async () => {
        try {
          const response = await this.request(`/schools/${schoolId}/recent-activity`);
          if (response.success && response.data) {
            response.data.forEach(onUpdate);
          }
        } catch (error) {
          console.error('Polling error:', error);
        }
      }, 5000);

      return {
        unsubscribe: () => clearInterval(pollInterval)
      };
    } catch (error) {
      console.error('Error setting up real-time subscription:', error);
      return { unsubscribe: () => {} };
    }
  }

  // Get recent activity
  async getRecentActivity(schoolId: string, since?: string) {
    const endpoint = since 
      ? `/schools/${schoolId}/recent-activity?since=${since}`
      : `/schools/${schoolId}/recent-activity`;
    return this.request(endpoint)
  }

  // Simulate payment event
  async simulatePayment(schoolId: string, studentId?: string, amount?: number) {
    // Get students first to pick a random one if not specified
    if (!studentId) {
      const studentsResponse = await this.getStudents(schoolId)
      if (studentsResponse.success && studentsResponse.data && studentsResponse.data.length > 0) {
        const randomStudent = studentsResponse.data[Math.floor(Math.random() * studentsResponse.data.length)]
        studentId = randomStudent.id
      } else {
        // Create a sample student if none exist
        await this.ensureSampleData(schoolId)
        const studentsResponse2 = await this.getStudents(schoolId)
        if (studentsResponse2.success && studentsResponse2.data && studentsResponse2.data.length > 0) {
          const randomStudent = studentsResponse2.data[Math.floor(Math.random() * studentsResponse2.data.length)]
          studentId = randomStudent.id
        } else {
          return { success: false, error: 'No students available for payment simulation' }
        }
      }
    }

    return this.request(`/schools/${schoolId}/simulate-payment`, 'POST', {
      studentId,
      amount: amount || Math.floor(Math.random() * 1000) + 100
    })
  }

  // Simulate student enrollment
  async simulateEnrollment(schoolId: string, studentData: any = {}) {
    return this.request(`/schools/${schoolId}/simulate-enrollment`, 'POST', studentData)
  }

  // Start demo events
  async startDemoEvents(schoolId: string) {
    // Ensure there's sample data first
    await this.ensureSampleData(schoolId)
    return this.request(`/schools/${schoolId}/start-demo-events`, 'POST', {})
  }

  // Stop demo events  
  async stopDemoEvents(schoolId: string) {
    return this.request(`/schools/${schoolId}/stop-demo-events`, 'POST', {})
  }

  // Ensure sample data exists
  async ensureSampleData(schoolId: string) {
    return this.request(`/schools/${schoolId}/ensure-sample-data`, 'POST', {})
  }

  // Health check
  async healthCheck() {
    return this.request('/health')
  }

  // QuickBooks Integration Methods
  async getQuickBooksStatus(schoolId: string) {
    return this.request(`/integrations/quickbooks/status?schoolId=${schoolId}`)
  }

  async disconnectQuickBooks(schoolId: string) {
    return this.request('/integrations/quickbooks/disconnect', 'POST', { schoolId })
  }

  async syncQuickBooksData(schoolId: string, syncType: 'full' | 'incremental' = 'incremental') {
    return this.request('/integrations/quickbooks/sync', 'POST', { schoolId, syncType })
  }

  async toggleQuickBooksAutoSync(schoolId: string, enabled: boolean) {
    return this.request('/integrations/quickbooks/auto-sync', 'POST', { schoolId, enabled })
  }

  async completeQuickBooksConnection(code: string, state: string, realmId: string) {
    return this.request('/integrations/quickbooks/callback', 'POST', { code, state, realmId })
  }

  // Authentication methods
  async signUp(email: string, password: string, schoolName: string) {
    return this.request('/auth/signup', 'POST', { email, password, schoolName })
  }

  async signIn(email: string, password: string) {
    console.log('🔑 API: Attempting sign in for:', email);
    const response = await this.request('/auth/signin', 'POST', { email, password })
    
    console.log('📋 API: Sign in response:', {
      success: response.success,
      hasData: !!response.data,
      hasAccessToken: !!(response.data as any)?.accessToken,
      error: response.error
    });
    
    if (response.success && response.data?.accessToken) {
      console.log('✅ API: Sign in successful, setting access token');
      this.setAccessToken(response.data.accessToken)
    }
    return response
  }

  async verifySession() {
    console.log('🔍 API: Verifying session with token:', this.accessToken ? `${this.accessToken.substring(0, 10)}...` : 'null');
    
    if (!this.accessToken) {
      console.log('❌ API: No access token available for verification');
      return { success: false, error: 'No access token available' }
    }
    
    try {
      console.log('📡 API: Making session verification request...');
      const response = await this.request('/auth/verify-session', 'POST', {}, true)
      
      console.log('📋 API: Session verification response:', {
        success: response.success,
        error: response.error,
        hasData: !!response.data
      });
      
      // Handle specific authentication errors
      if (!response.success && response.error === 'Authentication failed') {
        console.log('🔒 API: Authentication failed - token is invalid or expired');
        return { success: false, error: 'Token expired or invalid', expired: true }
      }
      
      // If the verify-session endpoint doesn't exist, try a simple health check with auth
      if (!response.success && (response.error?.includes('Not Found') || response.error?.includes('404'))) {
        console.log('⚠️ API: verify-session endpoint not found, trying health check fallback...');
        const fallbackResponse = await this.request('/health', 'GET', undefined, true)
        
        console.log('📋 API: Health check fallback response:', {
          success: fallbackResponse.success,
          error: fallbackResponse.error
        });
        
        if (fallbackResponse.success) {
          console.log('✅ API: Session verified via health check fallback');
          return { success: true, data: { valid: true } }
        } else if (fallbackResponse.error === 'Authentication failed') {
          console.log('🔒 API: Health check also failed - token is invalid');
          return { success: false, error: 'Token expired or invalid', expired: true }
        }
      }
      
      return response
    } catch (error) {
      console.error('💥 API: Session verification error:', error)
      return { success: false, error: 'Session verification failed' }
    }
  }

  signOut() {
    console.log('🚪 API: Signing out and clearing session data');
    this.setAccessToken(null)
    localStorage.removeItem('master_fees_access_token')
    localStorage.removeItem('master_fees_school_id')
    localStorage.removeItem('master_fees_school_name')
    localStorage.removeItem('master_fees_keep_logged_in')
  }

  // Password Reset Methods
  async requestPasswordReset(email: string, phone?: string, method: 'email' | 'sms' = 'email'): Promise<ApiResponse<{ message: string }>> {
    try {
      // Normalize email
      const normalizedEmail = email.toLowerCase().trim()
      
      console.log('API: Requesting password reset for:', { 
        email: normalizedEmail, 
        phone, 
        method 
      })
      
      const response = await this.request('/auth/request-password-reset', 'POST', { 
        email: normalizedEmail, 
        phone, 
        method 
      })
      
      console.log('API: Password reset request response:', response)
      
      // For demo purposes, show the code in a toast (remove in production)
      if (response.success && response.data && (response.data as any)._demoCode) {
        const demoCode = (response.data as any)._demoCode;
        const message = method === 'email' 
          ? `Demo: Check console for email code (${demoCode})`
          : `Demo: Check console for SMS code (${demoCode})`;
        setTimeout(() => {
          alert(`${message}\n\nIn production, you would receive this code via ${method}.`);
        }, 500);
      }

      return response
    } catch (error) {
      console.error('Password reset request error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  }

  async resetPassword(email: string, code: string, newPassword: string): Promise<ApiResponse<{ accessToken: string, schoolId: string, schoolName: string }>> {
    try {
      // Normalize email and code
      const normalizedEmail = email.toLowerCase().trim()
      const normalizedCode = code.toString().trim()
      
      console.log('API: Resetting password for:', { 
        email: normalizedEmail, 
        code: normalizedCode,
        codeLength: normalizedCode.length
      })
      
      const response = await this.request('/auth/reset-password', 'POST', { 
        email: normalizedEmail, 
        code: normalizedCode, 
        newPassword 
      })
      
      console.log('API: Password reset response:', response)
      
      if (response.success && response.data?.accessToken) {
        this.setAccessToken(response.data.accessToken)
      }

      return response
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  }

  // Transaction analysis methods
  async getTransactionsByTerm(schoolId: string, term: string) {
    try {
      const response = await fetch(`${API_BASE}/schools/${schoolId}/transactions/term/${encodeURIComponent(term)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken || publicAnonKey}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get transactions by term error:', error);
      
      // Return mock data based on term for fallback
      const termMultiplier = this.getTermMultiplier(term);
      const baseRevenue = mockMetrics.totalRevenue;
      const baseOutstanding = mockMetrics.outstandingFees;
      
      return { 
        success: true, 
        data: {
          transactions: [],
          totalRevenue: Math.floor(baseRevenue * termMultiplier),
          totalBalance: Math.floor((baseRevenue * termMultiplier) - (baseOutstanding * (2 - termMultiplier))),
          outstandingFees: Math.floor(baseOutstanding * (2 - termMultiplier)),
          term: term
        }
      };
    }
  }

  async getAllTransactions(schoolId: string) {
    try {
      const response = await fetch(`${API_BASE}/schools/${schoolId}/transactions`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken || publicAnonKey}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get all transactions error:', error);
      return { 
        success: true, 
        data: { 
          transactions: []
        }
      };
    }
  }

  private getTermMultiplier(term: string): number {
    switch (term) {
      case 'Term 1':
        return 0.85; // Term 1 typically has lower collection rates
      case 'Term 2':
        return 1.0; // Current term (baseline)
      case 'Term 3':
        return 1.15; // Term 3 often has higher collection due to year-end push
      default:
        return 1.0;
    }
  }
}

export const api = new FeeMasterAPI()