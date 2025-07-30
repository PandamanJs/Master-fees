import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { Hono } from "npm:hono"
import { cors } from "npm:hono/cors"
import { logger } from "npm:hono/logger"
import * as kv from './kv_store.tsx'

const app = new Hono()

// CORS middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['*'],
}))

// Logger middleware
app.use('*', logger())

// Error handler middleware
app.onError((err, c) => {
  console.error('Server error:', err)
  return c.json({ 
    success: false, 
    error: 'Internal server error', 
    details: err.message 
  }, 500)
})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
)

// Initialize school data structure
interface SchoolData {
  id: string
  schoolName: string
  institutionType: string
  country: string
  state: string
  town: string
  schoolEmail: string
  contactNumbers: string
  physicalAddress: string
  schoolCategories: string
  selectedGrades: string[]
  classesPerGrade: number
  exceptions: string
  selectedClasses: string[]
  productGroups: Array<{
    id: string
    name: string
    classes: string[]
  }>
  createdAt: string
  updatedAt: string
}

interface DashboardMetrics {
  totalStudents: number
  totalRevenue: number
  outstandingFees: number
  collectionRate: number
  overduePayments: number
  newEnrollments: number
}

interface Student {
  id: string
  schoolId: string
  firstName: string
  lastName: string
  className: string
  grade: string
  parentName: string
  parentPhone: string
  parentEmail: string
  enrollmentDate: string
  feesOwed: number
  feesPaid: number
  status: 'active' | 'inactive' | 'graduated'
}

interface Transaction {
  id: string
  schoolId: string
  studentId: string
  amount: number
  type: 'payment' | 'fee_charge' | 'penalty'
  status: 'pending' | 'completed' | 'failed'
  description: string
  paymentMethod: string
  transactionDate: string
}

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  timestamp: string
  read: boolean
}

interface UserAccount {
  id: string
  email: string
  hashedPassword: string
  schoolId: string
  schoolName: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

interface PasswordResetRequest {
  id: string
  email: string
  phone?: string
  code: string
  method: 'email' | 'sms'
  expiresAt: string
  createdAt: string
  isUsed: boolean
}

// Utility functions
const generateSecureCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const hashedInput = await hashPassword(password)
  return hashedInput === hashedPassword
}

const generateJWT = (payload: any): string => {
  // Simple JWT simulation for demo - in production use proper JWT library
  const header = btoa(JSON.stringify({ typ: 'JWT', alg: 'HS256' }))
  const body = btoa(JSON.stringify(payload))
  const signature = btoa(`${header}.${body}.secret`)
  return `${header}.${body}.${signature}`
}

// Twilio SMS function
const sendSMS = async (to: string, message: string): Promise<boolean> => {
  try {
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID')
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN')
    
    if (!accountSid || !authToken) {
      console.warn('Twilio credentials not configured. SMS will be simulated.')
      console.log(`SMS Simulation - To: ${to}, Message: ${message}`)
      return true // Simulate success for demo
    }

    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
    const auth = btoa(`${accountSid}:${authToken}`)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        From: '+1234567890', // Configure your Twilio phone number
        To: to,
        Body: message
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Twilio SMS error:', errorText)
      return false
    }

    console.log('SMS sent successfully to:', to)
    return true
  } catch (error) {
    console.error('SMS sending failed:', error)
    return false
  }
}

// Email function (mock - replace with actual email service like SendGrid)
const sendEmail = async (to: string, subject: string, message: string): Promise<boolean> => {
  try {
    // Mock email sending - replace with actual email service
    console.log(`Email Simulation - To: ${to}, Subject: ${subject}, Message: ${message}`)
    
    // In production, integrate with services like:
    // - SendGrid
    // - AWS SES
    // - Mailgun
    // - Postmark
    
    return true // Simulate success
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
}

// Authentication Routes

// Sign up
app.post('/make-server-0a4ed55a/auth/signup', async (c) => {
  try {
    const { email, password, schoolName } = await c.req.json()
    
    if (!email || !password || !schoolName) {
      return c.json({ 
        success: false, 
        error: 'Missing required fields: email, password, and school name are required' 
      }, 400)
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim()
    
    // Check if user already exists
    const existingUser = await kv.get(`auth:user:${normalizedEmail}`)
    if (existingUser) {
      return c.json({ 
        success: false, 
        error: 'An account with this email address already exists' 
      }, 409)
    }

    // Hash password
    const hashedPassword = await hashPassword(password)
    
    // Create school ID
    const schoolId = `school_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Create user account
    const userAccount: UserAccount = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: normalizedEmail,
      hashedPassword,
      schoolId,
      schoolName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    }
    
    // Save user account
    await kv.set(`auth:user:${normalizedEmail}`, userAccount)
    await kv.set(`auth:school:${schoolId}`, { email: normalizedEmail, schoolName })
    
    // Create initial school data
    const schoolData: SchoolData = {
      id: schoolId,
      schoolName,
      institutionType: '',
      country: '',
      state: '',
      town: '',
      schoolEmail: normalizedEmail,
      contactNumbers: '',
      physicalAddress: '',
      schoolCategories: '',
      selectedGrades: [],
      classesPerGrade: 0,
      exceptions: '',
      selectedClasses: [],
      productGroups: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(`school:${schoolId}`, schoolData)
    
    // Initialize default metrics
    const defaultMetrics: DashboardMetrics = {
      totalStudents: 0,
      totalRevenue: 0,
      outstandingFees: 0,
      collectionRate: 0,
      overduePayments: 0,
      newEnrollments: 0
    }
    
    await kv.set(`school:${schoolId}:metrics`, defaultMetrics)
    
    // Generate access token
    const accessToken = generateJWT({
      userId: userAccount.id,
      email: normalizedEmail,
      schoolId,
      schoolName,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    })
    
    console.log(`User account created successfully: ${normalizedEmail}`)
    
    return c.json({
      success: true,
      message: 'Account created successfully',
      data: {
        accessToken,
        schoolId,
        schoolName,
        email: normalizedEmail
      }
    })
    
  } catch (error) {
    console.error(`Error creating user account: ${error}`)
    return c.json({ 
      success: false, 
      error: 'Failed to create account', 
      details: error.message 
    }, 500)
  }
})

// Sign in
app.post('/make-server-0a4ed55a/auth/signin', async (c) => {
  try {
    const { email, password } = await c.req.json()
    
    if (!email || !password) {
      return c.json({ 
        success: false, 
        error: 'Email and password are required' 
      }, 400)
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim()
    
    // Check for hardcoded admin credentials for demo
    if (normalizedEmail === 'charleysiwale@gmail.com' && password === 'Panda007') {
      const adminSchoolId = 'admin_school_demo'
      const adminSchoolName = 'Twalumbu Education Centre'
      
      const accessToken = generateJWT({
        userId: 'admin_user',
        email: normalizedEmail,
        schoolId: adminSchoolId,
        schoolName: adminSchoolName,
        exp: Date.now() + (24 * 60 * 60 * 1000)
      })
      
      return c.json({
        success: true,
        message: 'Sign in successful',
        data: {
          accessToken,
          schoolId: adminSchoolId,
          schoolName: adminSchoolName,
          email: normalizedEmail
        }
      })
    }
    
    // Get user account
    const userAccount = await kv.get(`auth:user:${normalizedEmail}`)
    if (!userAccount) {
      return c.json({ 
        success: false, 
        error: 'Invalid email or password' 
      }, 401)
    }
    
    if (!userAccount.isActive) {
      return c.json({ 
        success: false, 
        error: 'Account is deactivated. Please contact support.' 
      }, 401)
    }
    
    // Verify password
    const isValidPassword = await verifyPassword(password, userAccount.hashedPassword)
    if (!isValidPassword) {
      return c.json({ 
        success: false, 
        error: 'Invalid email or password' 
      }, 401)
    }
    
    // Generate access token
    const accessToken = generateJWT({
      userId: userAccount.id,
      email: normalizedEmail,
      schoolId: userAccount.schoolId,
      schoolName: userAccount.schoolName,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    })
    
    console.log(`User signed in successfully: ${normalizedEmail}`)
    
    return c.json({
      success: true,
      message: 'Sign in successful',
      data: {
        accessToken,
        schoolId: userAccount.schoolId,
        schoolName: userAccount.schoolName,
        email: normalizedEmail
      }
    })
    
  } catch (error) {
    console.error(`Error during sign in: ${error}`)
    return c.json({ 
      success: false, 
      error: 'Sign in failed', 
      details: error.message 
    }, 500)
  }
})

// Verify session
app.post('/make-server-0a4ed55a/auth/verify-session', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    
    if (!accessToken) {
      return c.json({ 
        success: false, 
        error: 'No access token provided' 
      }, 401)
    }
    
    // Simple token validation - in production use proper JWT verification
    try {
      const [header, payload, signature] = accessToken.split('.')
      const decodedPayload = JSON.parse(atob(payload))
      
      if (decodedPayload.exp < Date.now()) {
        return c.json({ 
          success: false, 
          error: 'Token expired' 
        }, 401)
      }
      
      return c.json({
        success: true,
        data: {
          userId: decodedPayload.userId,
          email: decodedPayload.email,
          schoolId: decodedPayload.schoolId,
          schoolName: decodedPayload.schoolName
        }
      })
      
    } catch (tokenError) {
      return c.json({ 
        success: false, 
        error: 'Invalid token format' 
      }, 401)
    }
    
  } catch (error) {
    console.error(`Error verifying session: ${error}`)
    return c.json({ 
      success: false, 
      error: 'Session verification failed', 
      details: error.message 
    }, 500)
  }
})

// Request password reset
app.post('/make-server-0a4ed55a/auth/request-password-reset', async (c) => {
  try {
    const { email, phone, method } = await c.req.json()
    
    if (!email) {
      return c.json({ 
        success: false, 
        error: 'Email address is required' 
      }, 400)
    }
    
    if (method === 'sms' && !phone) {
      return c.json({ 
        success: false, 
        error: 'Phone number is required for SMS verification' 
      }, 400)
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim()
    
    // Check if user exists
    const userAccount = await kv.get(`auth:user:${normalizedEmail}`)
    if (!userAccount) {
      // Don't reveal if user exists or not for security
      return c.json({
        success: true,
        message: 'If an account exists with this email, a reset code has been sent',
        data: { _demoCode: 'N/A' } // No code for non-existent users
      })
    }
    
    // Generate secure reset code
    const resetCode = generateSecureCode()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes
    
    // Store reset request
    const resetRequest: PasswordResetRequest = {
      id: `reset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: normalizedEmail,
      phone,
      code: resetCode,
      method: method || 'email',
      expiresAt,
      createdAt: new Date().toISOString(),
      isUsed: false
    }
    
    await kv.set(`auth:reset:${normalizedEmail}:${resetCode}`, resetRequest)
    
    // Send reset code
    let sendSuccess = false
    
    if (method === 'sms' && phone) {
      const message = `Your Master-Fees password reset code is: ${resetCode}. This code expires in 15 minutes. If you didn't request this, please ignore this message.`
      sendSuccess = await sendSMS(phone, message)
    } else {
      const message = `Your Master-Fees password reset code is: ${resetCode}. This code expires in 15 minutes. If you didn't request this reset, please ignore this email.`
      sendSuccess = await sendEmail(
        normalizedEmail, 
        'Master-Fees Password Reset Code', 
        message
      )
    }
    
    if (!sendSuccess) {
      console.error(`Failed to send ${method} reset code to ${method === 'sms' ? phone : normalizedEmail}`)
      return c.json({ 
        success: false, 
        error: `Failed to send reset code via ${method}. Please try again or contact support.` 
      }, 500)
    }
    
    console.log(`Password reset code sent via ${method} for: ${normalizedEmail}`)
    
    return c.json({
      success: true,
      message: `Password reset code has been sent via ${method}`,
      data: {
        method,
        expiresIn: 15, // minutes
        _demoCode: resetCode // For demo purposes - remove in production
      }
    })
    
  } catch (error) {
    console.error(`Error requesting password reset: ${error}`)
    return c.json({ 
      success: false, 
      error: 'Failed to process password reset request', 
      details: error.message 
    }, 500)
  }
})

// Reset password
app.post('/make-server-0a4ed55a/auth/reset-password', async (c) => {
  try {
    const { email, code, newPassword } = await c.req.json()
    
    if (!email || !code || !newPassword) {
      return c.json({ 
        success: false, 
        error: 'Email, reset code, and new password are required' 
      }, 400)
    }
    
    if (newPassword.length < 6) {
      return c.json({ 
        success: false, 
        error: 'Password must be at least 6 characters long' 
      }, 400)
    }

    // Normalize inputs
    const normalizedEmail = email.toLowerCase().trim()
    const normalizedCode = code.toString().trim()
    
    // Get reset request
    const resetRequest = await kv.get(`auth:reset:${normalizedEmail}:${normalizedCode}`)
    if (!resetRequest) {
      return c.json({ 
        success: false, 
        error: 'Invalid or expired reset code' 
      }, 400)
    }
    
    // Check if code is expired
    if (new Date(resetRequest.expiresAt) < new Date()) {
      await kv.del(`auth:reset:${normalizedEmail}:${normalizedCode}`)
      return c.json({ 
        success: false, 
        error: 'Reset code has expired. Please request a new one.' 
      }, 400)
    }
    
    // Check if code is already used
    if (resetRequest.isUsed) {
      return c.json({ 
        success: false, 
        error: 'Reset code has already been used' 
      }, 400)
    }
    
    // Get user account
    const userAccount = await kv.get(`auth:user:${normalizedEmail}`)
    if (!userAccount) {
      return c.json({ 
        success: false, 
        error: 'User account not found' 
      }, 404)
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(newPassword)
    
    // Update user password
    const updatedAccount = {
      ...userAccount,
      hashedPassword,
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(`auth:user:${normalizedEmail}`, updatedAccount)
    
    // Mark reset request as used
    await kv.set(`auth:reset:${normalizedEmail}:${normalizedCode}`, {
      ...resetRequest,
      isUsed: true
    })
    
    // Generate new access token
    const accessToken = generateJWT({
      userId: userAccount.id,
      email: normalizedEmail,
      schoolId: userAccount.schoolId,
      schoolName: userAccount.schoolName,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    })
    
    console.log(`Password reset successfully for: ${normalizedEmail}`)
    
    return c.json({
      success: true,
      message: 'Password has been reset successfully',
      data: {
        accessToken,
        schoolId: userAccount.schoolId,
        schoolName: userAccount.schoolName,
        email: normalizedEmail
      }
    })
    
  } catch (error) {
    console.error(`Error resetting password: ${error}`)
    return c.json({ 
      success: false, 
      error: 'Failed to reset password', 
      details: error.message 
    }, 500)
  }
})

// Health check
app.get('/make-server-0a4ed55a/health', (c) => {
  return c.json({ 
    success: true, 
    message: 'Master-Fees API is running', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// QuickBooks Integration Routes

interface QuickBooksConnection {
  schoolId: string
  accessToken: string
  refreshToken: string
  realmId: string
  companyName: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  lastSync?: string
  autoSync: boolean
}

// QuickBooks API helper functions
const getQuickBooksAPIUrl = (realmId: string) => {
  return `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}`
}

const refreshQuickBooksToken = async (refreshToken: string) => {
  try {
    const clientId = Deno.env.get('QUICKBOOKS_CLIENT_ID')
    const clientSecret = Deno.env.get('QUICKBOOKS_CLIENT_SECRET')
    
    if (!clientId || !clientSecret) {
      throw new Error('QuickBooks credentials not configured')
    }

    const response = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
    })

    if (!response.ok) {
      throw new Error('Failed to refresh QuickBooks token')
    }

    const data = await response.json()
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in
    }
  } catch (error) {
    console.error('Error refreshing QuickBooks token:', error)
    throw error
  }
}

const makeQuickBooksRequest = async (connection: QuickBooksConnection, endpoint: string, method: string = 'GET', body?: any) => {
  try {
    const url = `${getQuickBooksAPIUrl(connection.realmId)}/${endpoint}`
    
    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${connection.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    })

    if (response.status === 401) {
      // Token expired, try to refresh
      const refreshResult = await refreshQuickBooksToken(connection.refreshToken)
      
      // Update stored connection with new tokens
      const updatedConnection = {
        ...connection,
        accessToken: refreshResult.accessToken,
        refreshToken: refreshResult.refreshToken,
        updatedAt: new Date().toISOString()
      }
      
      await kv.set(`quickbooks:connection:${connection.schoolId}`, updatedConnection)
      
      // Retry the request with new token
      const retryResponse = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${refreshResult.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
      })

      if (!retryResponse.ok) {
        throw new Error(`QuickBooks API error: ${retryResponse.status}`)
      }

      return retryResponse.json()
    }

    if (!response.ok) {
      throw new Error(`QuickBooks API error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('QuickBooks API request failed:', error)
    throw error
  }
}

// Check QuickBooks connection status
app.get('/make-server-0a4ed55a/integrations/quickbooks/status', async (c) => {
  try {
    const schoolId = c.req.query('schoolId')
    
    if (!schoolId) {
      return c.json({ error: 'School ID is required' }, 400)
    }

    const connection = await kv.get(`quickbooks:connection:${schoolId}`)
    const syncStatus = await kv.get(`quickbooks:sync:${schoolId}`) || {
      isLoading: false,
      lastSync: null,
      error: null,
      syncedItems: { customers: 0, invoices: 0, payments: 0 }
    }

    return c.json({
      success: true,
      connection: {
        isConnected: !!connection,
        companyName: connection?.companyName,
        lastSync: connection?.lastSync,
        error: connection?.isActive === false ? 'Connection expired' : null
      },
      syncStatus,
      autoSync: connection?.autoSync || false
    })
  } catch (error) {
    console.error('Error checking QuickBooks status:', error)
    return c.json({ error: 'Failed to check connection status' }, 500)
  }
})

// Handle QuickBooks OAuth callback
app.post('/make-server-0a4ed55a/integrations/quickbooks/callback', async (c) => {
  try {
    const { code, state, realmId } = await c.req.json()
    
    if (!code || !state || !realmId) {
      return c.json({ error: 'Missing required OAuth parameters' }, 400)
    }

    // Decode state to get school ID
    const stateData = JSON.parse(atob(state))
    const schoolId = stateData.schoolId

    const clientId = Deno.env.get('QUICKBOOKS_CLIENT_ID')
    const clientSecret = Deno.env.get('QUICKBOOKS_CLIENT_SECRET')
    
    if (!clientId || !clientSecret) {
      return c.json({ error: 'QuickBooks credentials not configured' }, 500)
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: `${c.req.url.split('/api')[0]}/api/integrations/quickbooks/callback`
      })
    })

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text()
      console.error('QuickBooks token exchange failed:', error)
      return c.json({ error: 'Failed to exchange authorization code' }, 400)
    }

    const tokenData = await tokenResponse.json()

    // Get company info
    const companyInfoResponse = await fetch(`${getQuickBooksAPIUrl(realmId)}/companyinfo/${realmId}`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    })

    let companyName = 'QuickBooks Company'
    if (companyInfoResponse.ok) {
      const companyData = await companyInfoResponse.json()
      companyName = companyData.QueryResponse?.CompanyInfo?.[0]?.CompanyName || companyName
    }

    // Store connection
    const connection: QuickBooksConnection = {
      schoolId,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      realmId,
      companyName,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      autoSync: false
    }

    await kv.set(`quickbooks:connection:${schoolId}`, connection)

    console.log(`QuickBooks connected for school: ${schoolId}`)
    return c.json({ success: true, companyName })
  } catch (error) {
    console.error('Error handling QuickBooks callback:', error)
    return c.json({ error: 'Failed to complete QuickBooks connection' }, 500)
  }
})

// Disconnect QuickBooks
app.post('/make-server-0a4ed55a/integrations/quickbooks/disconnect', async (c) => {
  try {
    const { schoolId } = await c.req.json()
    
    if (!schoolId) {
      return c.json({ error: 'School ID is required' }, 400)
    }

    // Remove connection
    await kv.del(`quickbooks:connection:${schoolId}`)
    await kv.del(`quickbooks:sync:${schoolId}`)

    console.log(`QuickBooks disconnected for school: ${schoolId}`)
    return c.json({ success: true })
  } catch (error) {
    console.error('Error disconnecting QuickBooks:', error)
    return c.json({ error: 'Failed to disconnect QuickBooks' }, 500)
  }
})

// Sync data with QuickBooks
app.post('/make-server-0a4ed55a/integrations/quickbooks/sync', async (c) => {
  try {
    const { schoolId, syncType } = await c.req.json()
    
    if (!schoolId) {
      return c.json({ error: 'School ID is required' }, 400)
    }

    const connection = await kv.get(`quickbooks:connection:${schoolId}`)
    if (!connection) {
      return c.json({ error: 'QuickBooks not connected' }, 400)
    }

    // Update sync status
    await kv.set(`quickbooks:sync:${schoolId}`, {
      isLoading: true,
      lastSync: null,
      error: null,
      syncedItems: { customers: 0, invoices: 0, payments: 0 }
    })

    try {
      // Get school data
      const students = await kv.getByPrefix(`school:${schoolId}:student:`) || []
      const transactions = await kv.getByPrefix(`school:${schoolId}:transaction:`) || []

      let syncedItems = { customers: 0, invoices: 0, payments: 0 }

      // Sync students as customers
      for (const student of students) {
        try {
          // Check if customer already exists
          const customerQuery = await makeQuickBooksRequest(
            connection,
            `customers?where=CompanyName='${student.firstName} ${student.lastName}'`
          )

          if (customerQuery.QueryResponse?.Customer?.length === 0) {
            // Create new customer
            const customerData = {
              Name: `${student.firstName} ${student.lastName}`,
              CompanyName: `${student.firstName} ${student.lastName}`,
              PrimaryEmailAddr: {
                Address: student.parentEmail
              },
              PrimaryPhone: {
                FreeFormNumber: student.parentPhone
              },
              BillAddr: {
                Line1: 'Student Address',
                City: 'City',
                Country: 'Country'
              }
            }

            await makeQuickBooksRequest(connection, 'customers', 'POST', customerData)
            syncedItems.customers++
          }
        } catch (error) {
          console.error(`Error syncing student ${student.id}:`, error)
        }
      }

      // Sync transactions as invoices/payments
      for (const transaction of transactions) {
        try {
          if (transaction.type === 'payment') {
            // Create payment record
            const paymentData = {
              CustomerRef: {
                value: "1" // This would need to be mapped to actual customer ID
              },
              TotalAmt: transaction.amount,
              TxnDate: transaction.transactionDate.split('T')[0],
              PaymentMethodRef: {
                value: "1" // This would need to be mapped to actual payment method
              }
            }

            await makeQuickBooksRequest(connection, 'payments', 'POST', paymentData)
            syncedItems.payments++
          }
        } catch (error) {
          console.error(`Error syncing transaction ${transaction.id}:`, error)
        }
      }

      // Update connection with last sync time
      await kv.set(`quickbooks:connection:${schoolId}`, {
        ...connection,
        lastSync: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })

      // Update sync status
      await kv.set(`quickbooks:sync:${schoolId}`, {
        isLoading: false,
        lastSync: new Date().toISOString(),
        error: null,
        syncedItems
      })

      console.log(`QuickBooks sync completed for school: ${schoolId}`)
      return c.json({ success: true, syncedItems })

    } catch (syncError) {
      // Update sync status with error
      await kv.set(`quickbooks:sync:${schoolId}`, {
        isLoading: false,
        lastSync: null,
        error: syncError.message,
        syncedItems: { customers: 0, invoices: 0, payments: 0 }
      })

      throw syncError
    }
  } catch (error) {
    console.error('Error syncing with QuickBooks:', error)
    return c.json({ error: 'Failed to sync data with QuickBooks' }, 500)
  }
})

// Toggle auto-sync
app.post('/make-server-0a4ed55a/integrations/quickbooks/auto-sync', async (c) => {
  try {
    const { schoolId, enabled } = await c.req.json()
    
    if (!schoolId) {
      return c.json({ error: 'School ID is required' }, 400)
    }

    const connection = await kv.get(`quickbooks:connection:${schoolId}`)
    if (!connection) {
      return c.json({ error: 'QuickBooks not connected' }, 400)
    }

    // Update auto-sync setting
    await kv.set(`quickbooks:connection:${schoolId}`, {
      ...connection,
      autoSync: enabled,
      updatedAt: new Date().toISOString()
    })

    console.log(`QuickBooks auto-sync ${enabled ? 'enabled' : 'disabled'} for school: ${schoolId}`)
    return c.json({ success: true })
  } catch (error) {
    console.error('Error toggling auto-sync:', error)
    return c.json({ error: 'Failed to update auto-sync setting' }, 500)
  }
})

// School onboarding routes
app.post('/make-server-0a4ed55a/schools', async (c) => {
  try {
    const schoolData: Omit<SchoolData, 'id' | 'createdAt' | 'updatedAt'> = await c.req.json()
    
    const schoolId = `school_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()
    
    const fullSchoolData: SchoolData = {
      id: schoolId,
      ...schoolData,
      createdAt: now,
      updatedAt: now
    }
    
    await kv.set(`school:${schoolId}`, fullSchoolData)
    
    // Initialize default metrics for the school
    const defaultMetrics: DashboardMetrics = {
      totalStudents: 0,
      totalRevenue: 0,
      outstandingFees: 0,
      collectionRate: 0,
      overduePayments: 0,
      newEnrollments: 0
    }
    
    await kv.set(`school:${schoolId}:metrics`, defaultMetrics)
    
    console.log(`School created successfully: ${schoolId}`)
    return c.json({ 
      success: true, 
      schoolId,
      message: 'School created successfully',
      data: fullSchoolData
    })
  } catch (error) {
    console.log(`Error creating school: ${error}`)
    return c.json({ error: 'Failed to create school', details: error.message }, 500)
  }
})

app.get('/make-server-0a4ed55a/schools/:id', async (c) => {
  try {
    const schoolId = c.req.param('id')
    const schoolData = await kv.get(`school:${schoolId}`)
    
    if (!schoolData) {
      return c.json({ error: 'School not found' }, 404)
    }
    
    return c.json({ success: true, data: schoolData })
  } catch (error) {
    console.log(`Error fetching school: ${error}`)
    return c.json({ error: 'Failed to fetch school', details: error.message }, 500)
  }
})

app.put('/make-server-0a4ed55a/schools/:id', async (c) => {
  try {
    const schoolId = c.req.param('id')
    const updateData = await c.req.json()
    
    const existingSchool = await kv.get(`school:${schoolId}`)
    if (!existingSchool) {
      return c.json({ error: 'School not found' }, 404)
    }
    
    const updatedSchool = {
      ...existingSchool,
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    
    await kv.set(`school:${schoolId}`, updatedSchool)
    
    return c.json({ success: true, data: updatedSchool })
  } catch (error) {
    console.log(`Error updating school: ${error}`)
    return c.json({ error: 'Failed to update school', details: error.message }, 500)
  }
})

// Dashboard metrics routes
app.get('/make-server-0a4ed55a/schools/:id/metrics', async (c) => {
  try {
    const schoolId = c.req.param('id')
    
    // Get stored metrics or calculate from data
    let metrics = await kv.get(`school:${schoolId}:metrics`)
    
    if (!metrics) {
      // Calculate metrics from actual data
      const students = await kv.getByPrefix(`school:${schoolId}:student:`) || []
      const transactions = await kv.getByPrefix(`school:${schoolId}:transaction:`) || []
      
      const totalStudents = students.length
      const totalRevenue = transactions
        .filter(t => t.type === 'payment' && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0)
      
      const outstandingFees = students.reduce((sum, s) => sum + (s.feesOwed - s.feesPaid), 0)
      const collectionRate = totalRevenue > 0 ? (totalRevenue / (totalRevenue + outstandingFees)) * 100 : 0
      
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      const newEnrollments = students.filter(s => s.enrollmentDate > oneWeekAgo).length
      
      const overduePayments = students.filter(s => s.feesOwed > s.feesPaid).length
      
      metrics = {
        totalStudents,
        totalRevenue,
        outstandingFees,
        collectionRate: Math.round(collectionRate * 10) / 10,
        overduePayments,
        newEnrollments
      }
      
      await kv.set(`school:${schoolId}:metrics`, metrics)
    }
    
    return c.json({ success: true, data: metrics })
  } catch (error) {
    console.log(`Error fetching metrics: ${error}`)
    return c.json({ error: 'Failed to fetch metrics', details: error.message }, 500)
  }
})

// Student management routes
app.post('/make-server-0a4ed55a/schools/:id/students', async (c) => {
  try {
    const schoolId = c.req.param('id')
    const studentData: Omit<Student, 'id' | 'schoolId'> = await c.req.json()
    
    const studentId = `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const student: Student = {
      id: studentId,
      schoolId,
      ...studentData,
      enrollmentDate: studentData.enrollmentDate || new Date().toISOString()
    }
    
    await kv.set(`school:${schoolId}:student:${studentId}`, student)
    
    // Update metrics
    const metrics = await kv.get(`school:${schoolId}:metrics`) || {}
    metrics.totalStudents = (metrics.totalStudents || 0) + 1
    metrics.newEnrollments = (metrics.newEnrollments || 0) + 1
    await kv.set(`school:${schoolId}:metrics`, metrics)
    
    return c.json({ success: true, studentId, data: student })
  } catch (error) {
    console.log(`Error creating student: ${error}`)
    return c.json({ error: 'Failed to create student', details: error.message }, 500)
  }
})

app.get('/make-server-0a4ed55a/schools/:id/students', async (c) => {
  try {
    const schoolId = c.req.param('id')
    const students = await kv.getByPrefix(`school:${schoolId}:student:`) || []
    
    return c.json({ success: true, data: students })
  } catch (error) {
    console.log(`Error fetching students: ${error}`)
    return c.json({ error: 'Failed to fetch students', details: error.message }, 500)
  }
})

// Transaction routes
app.post('/make-server-0a4ed55a/schools/:id/transactions', async (c) => {
  try {
    const schoolId = c.req.param('id')
    const transactionData: Omit<Transaction, 'id' | 'schoolId'> = await c.req.json()
    
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const transaction: Transaction = {
      id: transactionId,
      schoolId,
      ...transactionData,
      transactionDate: transactionData.transactionDate || new Date().toISOString()
    }
    
    await kv.set(`school:${schoolId}:transaction:${transactionId}`, transaction)
    
    // Update student fees if it's a payment
    if (transaction.type === 'payment' && transaction.status === 'completed') {
      const student = await kv.get(`school:${schoolId}:student:${transaction.studentId}`)
      if (student) {
        student.feesPaid = (student.feesPaid || 0) + transaction.amount
        await kv.set(`school:${schoolId}:student:${transaction.studentId}`, student)
      }
      
      // Update metrics
      const metrics = await kv.get(`school:${schoolId}:metrics`) || {}
      metrics.totalRevenue = (metrics.totalRevenue || 0) + transaction.amount
      await kv.set(`school:${schoolId}:metrics`, metrics)
    }
    
    return c.json({ success: true, transactionId, data: transaction })
  } catch (error) {
    console.log(`Error creating transaction: ${error}`)
    return c.json({ error: 'Failed to create transaction', details: error.message }, 500)
  }
})

app.get('/make-server-0a4ed55a/schools/:id/transactions', async (c) => {
  try {
    const schoolId = c.req.param('id')
    const transactions = await kv.getByPrefix(`school:${schoolId}:transaction:`) || []
    
    return c.json({ success: true, data: transactions })
  } catch (error) {
    console.log(`Error fetching transactions: ${error}`)
    return c.json({ error: 'Failed to fetch transactions', details: error.message }, 500)
  }
})

// Get transactions by term
app.get('/make-server-0a4ed55a/schools/:schoolId/transactions/term/:term', async (c) => {
  try {
    const schoolId = c.req.param('schoolId')
    const term = decodeURIComponent(c.req.param('term'))
    
    console.log(`📊 Getting transactions for school ${schoolId}, term: ${term}`)
    
    // Get all transactions for the school
    const allTransactions = await kv.getByPrefix(`school:${schoolId}:transaction:`) || []
    
    // Filter transactions by term (this would be based on transaction dates or term field)
    const termTransactions = allTransactions.filter(transaction => {
      // For demo purposes, we'll calculate term-based metrics
      // In a real app, you'd filter by actual transaction.term or date ranges
      return true; // Include all for now, but calculate term-specific totals
    })
    
    // Calculate term-specific metrics based on multipliers
    const termMultiplier = getTermMultiplier(term)
    
    // Get school metrics to use as base
    const schoolMetrics = await kv.get(`school:${schoolId}:metrics`)
    const baseRevenue = schoolMetrics?.totalRevenue || 532000
    const baseOutstanding = schoolMetrics?.outstandingFees || 87500
    
    const termRevenue = Math.floor(baseRevenue * termMultiplier)
    const termOutstanding = Math.floor(baseOutstanding * (2 - termMultiplier))
    const termBalance = Math.max(0, termRevenue - termOutstanding)
    
    console.log(`✅ Term ${term} metrics calculated:`, {
      revenue: termRevenue,
      balance: termBalance,
      outstanding: termOutstanding,
      multiplier: termMultiplier
    })
    
    return c.json({
      success: true,
      data: {
        transactions: termTransactions,
        totalRevenue: termRevenue,
        totalBalance: termBalance,
        outstandingFees: termOutstanding,
        term: term
      }
    })
  } catch (error) {
    console.error('Get transactions by term error:', error)
    return c.json({ success: false, error: 'Failed to get term transactions' }, 500)
  }
})

function getTermMultiplier(term: string): number {
  switch (term) {
    case 'Term 1':
      return 0.85 // Term 1 typically has lower collection rates
    case 'Term 2':
      return 1.0 // Current term (baseline)
    case 'Term 3':
      return 1.15 // Term 3 often has higher collection due to year-end push
    default:
      return 1.0
  }
}

// Notifications routes
app.get('/make-server-0a4ed55a/schools/:id/notifications', async (c) => {
  try {
    const schoolId = c.req.param('id')
    const notifications = await kv.get(`school:${schoolId}:notifications`) || []
    
    return c.json({ success: true, data: notifications })
  } catch (error) {
    console.log(`Error fetching notifications: ${error}`)
    return c.json({ error: 'Failed to fetch notifications', details: error.message }, 500)
  }
})

app.post('/make-server-0a4ed55a/schools/:id/notifications', async (c) => {
  try {
    const schoolId = c.req.param('id')
    const notificationData = await c.req.json()
    
    const notifications = await kv.get(`school:${schoolId}:notifications`) || []
    const newNotification: Notification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...notificationData,
      timestamp: new Date().toISOString(),
      read: false
    }
    
    notifications.unshift(newNotification)
    
    // Keep only last 50 notifications
    if (notifications.length > 50) {
      notifications.splice(50)
    }
    
    await kv.set(`school:${schoolId}:notifications`, notifications)
    
    return c.json({ success: true, data: newNotification })
  } catch (error) {
    console.log(`Error creating notification: ${error}`)
    return c.json({ error: 'Failed to create notification', details: error.message }, 500)
  }
})

app.put('/make-server-0a4ed55a/schools/:id/notifications/:notificationId/read', async (c) => {
  try {
    const schoolId = c.req.param('id')
    const notificationId = c.req.param('notificationId')
    
    const notifications = await kv.get(`school:${schoolId}:notifications`) || []
    const updatedNotifications = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    )
    
    await kv.set(`school:${schoolId}:notifications`, updatedNotifications)
    
    return c.json({ success: true })
  } catch (error) {
    console.log(`Error marking notification as read: ${error}`)
    return c.json({ error: 'Failed to mark notification as read', details: error.message }, 500)
  }
})

// Bulk operations
app.post('/make-server-0a4ed55a/schools/:id/students/bulk', async (c) => {
  try {
    const schoolId = c.req.param('id')
    const studentsData = await c.req.json()
    
    const createdStudents = []
    
    for (const studentData of studentsData) {
      const studentId = `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const student: Student = {
        id: studentId,
        schoolId,
        ...studentData,
        enrollmentDate: studentData.enrollmentDate || new Date().toISOString()
      }
      
      await kv.set(`school:${schoolId}:student:${studentId}`, student)
      createdStudents.push(student)
    }
    
    // Update metrics
    const metrics = await kv.get(`school:${schoolId}:metrics`) || {}
    metrics.totalStudents = (metrics.totalStudents || 0) + createdStudents.length
    metrics.newEnrollments = (metrics.newEnrollments || 0) + createdStudents.length
    await kv.set(`school:${schoolId}:metrics`, metrics)
    
    return c.json({ success: true, count: createdStudents.length, data: createdStudents })
  } catch (error) {
    console.log(`Error bulk creating students: ${error}`)
    return c.json({ error: 'Failed to bulk create students', details: error.message }, 500)
  }
})

// Revenue breakdown routes
app.get('/make-server-0a4ed55a/schools/:id/breakdown', async (c) => {
  try {
    const schoolId = c.req.param('id')
    const category = c.req.query('category')
    
    const students = await kv.getByPrefix(`school:${schoolId}:student:`) || []
    const transactions = await kv.getByPrefix(`school:${schoolId}:transaction:`) || []
    
    // Group by grade or other categories
    const breakdown = students.reduce((acc, student) => {
      const gradeKey = student.grade || 'Unknown'
      if (!acc[gradeKey]) {
        acc[gradeKey] = {
          category: gradeKey,
          budgeted: 0,
          collected: 0,
          outstanding: 0,
          percentage: 0,
          studentCount: 0
        }
      }
      
      acc[gradeKey].budgeted += student.feesOwed || 0
      acc[gradeKey].collected += student.feesPaid || 0
      acc[gradeKey].outstanding += (student.feesOwed || 0) - (student.feesPaid || 0)
      acc[gradeKey].studentCount += 1
      
      return acc
    }, {})
    
    // Calculate percentages
    Object.values(breakdown).forEach((item: any) => {
      item.percentage = item.budgeted > 0 ? (item.collected / item.budgeted) * 100 : 0
      item.percentage = Math.round(item.percentage * 10) / 10
    })
    
    const result = Object.values(breakdown)
    
    // Filter by category if specified
    if (category && category !== 'all') {
      const filtered = result.filter((item: any) => item.category === category)
      return c.json({ success: true, data: filtered })
    }
    
    return c.json({ success: true, data: result })
  } catch (error) {
    console.log(`Error fetching breakdown: ${error}`)
    return c.json({ error: 'Failed to fetch breakdown', details: error.message }, 500)
  }
})

// Real-time activity tracking
app.get('/make-server-0a4ed55a/schools/:id/recent-activity', async (c) => {
  try {
    const schoolId = c.req.param('id')
    const since = c.req.query('since')
    
    // Get recent events from activity log
    const activityLog = await kv.getByPrefix(`school:${schoolId}:activity:`) || []
    
    // Filter by timestamp if 'since' parameter is provided
    let recentActivity = activityLog
    if (since) {
      const sinceTimestamp = new Date(since).getTime()
      recentActivity = activityLog.filter(activity => {
        const activityTime = new Date(activity.timestamp).getTime()
        return activityTime > sinceTimestamp
      })
    }
    
    // Sort by timestamp descending (most recent first)
    recentActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
    return c.json({ success: true, data: recentActivity.slice(0, 10) })
  } catch (error) {
    console.log(`Error fetching recent activity: ${error}`)
    return c.json({ error: 'Failed to fetch recent activity', details: error.message }, 500)
  }
})

// Production-ready demonstration endpoints (remove demo simulation endpoints for production)

// Demo simulation endpoints (keep for development/testing only)
app.post('/make-server-0a4ed55a/schools/:id/simulate-payment', async (c) => {
  try {
    const schoolId = c.req.param('id')
    const { studentId, amount } = await c.req.json()
    
    // Get student data
    const student = await kv.get(`school:${schoolId}:student:${studentId}`)
    if (!student) {
      return c.json({ error: 'Student not found' }, 404)
    }
    
    // Create payment transaction
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const transaction = {
      id: transactionId,
      studentId,
      studentName: student.firstName + ' ' + student.lastName,
      amount,
      type: 'payment',
      status: 'completed',
      method: 'Bank Transfer',
      timestamp: new Date().toISOString(),
      description: `Fee payment from ${student.firstName} ${student.lastName}`
    }
    
    // Save transaction
    await kv.set(`school:${schoolId}:transaction:${transactionId}`, transaction)
    
    // Update student payment record
    const updatedStudent = {
      ...student,
      feesPaid: (student.feesPaid || 0) + amount,
      lastPaymentDate: new Date().toISOString()
    }
    await kv.set(`school:${schoolId}:student:${studentId}`, updatedStudent)
    
    // Create notification
    const notifications = await kv.get(`school:${schoolId}:notifications`) || []
    const notificationId = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const notification = {
      id: notificationId,
      title: 'Payment Received',
      message: `${student.firstName} ${student.lastName} has made a payment of ${new Intl.NumberFormat('en-ZM', { style: 'currency', currency: 'ZMW' }).format(amount)}`,
      type: 'success',
      timestamp: new Date().toISOString(),
      read: false,
      metadata: {
        studentId,
        amount,
        transactionId
      }
    }
    notifications.unshift(notification)
    
    // Keep only last 50 notifications
    if (notifications.length > 50) {
      notifications.splice(50)
    }
    
    await kv.set(`school:${schoolId}:notifications`, notifications)
    
    return c.json({ 
      success: true, 
      data: { 
        transaction, 
        notification, 
        updatedStudent 
      }
    })
  } catch (error) {
    console.log(`Error simulating payment: ${error}`)
    return c.json({ error: 'Failed to simulate payment', details: error.message }, 500)
  }
})

// Start the server
Deno.serve(app.fetch)