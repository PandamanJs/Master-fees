import fetch from 'node-fetch';

interface QuickBooksConfig {
  clientId: string;
  clientSecret: string;
  sandboxBaseUrl: string;
  discoveryDocument: string;
  scope: string;
  redirectUri: string;
}

interface QuickBooksTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  x_refresh_token_expires_in: number;
  realmId: string;
}

interface QBCustomer {
  Id: string;
  Name: string;
  CompanyName?: string;
  GivenName?: string;
  FamilyName?: string;
  PrimaryEmailAddr?: {
    Address: string;
  };
  PrimaryPhone?: {
    FreeFormNumber: string;
  };
  BillAddr?: {
    Line1?: string;
    City?: string;
    CountrySubDivisionCode?: string;
    PostalCode?: string;
  };
  Active: boolean;
  MetaData: {
    CreateTime: string;
    LastUpdatedTime: string;
  };
}

interface QBItem {
  Id: string;
  Name: string;
  Description?: string;
  Type: 'Service' | 'Inventory' | 'NonInventory';
  UnitPrice?: number;
  IncomeAccountRef?: {
    value: string;
    name: string;
  };
  Active: boolean;
}

interface QBInvoice {
  Id: string;
  SyncToken: string;
  DocNumber: string;
  TxnDate: string;
  DueDate?: string;
  CustomerRef: {
    value: string;
    name: string;
  };
  Line: Array<{
    Id: string;
    LineNum: number;
    Amount: number;
    DetailType: string;
    SalesItemLineDetail?: {
      ItemRef: {
        value: string;
        name: string;
      };
      UnitPrice: number;
      Qty: number;
    };
  }>;
  TotalAmt: number;
  Balance: number;
  EmailStatus: string;
  PrintStatus: string;
  MetaData: {
    CreateTime: string;
    LastUpdatedTime: string;
  };
}

interface QBPayment {
  Id: string;
  SyncToken: string;
  TxnDate: string;
  TotalAmt: number;
  CustomerRef: {
    value: string;
    name: string;
  };
  Line: Array<{
    Amount: number;
    LinkedTxn: Array<{
      TxnId: string;
      TxnType: string;
    }>;
  }>;
  MetaData: {
    CreateTime: string;
    LastUpdatedTime: string;
  };
}

class QuickBooksService {
  private config: QuickBooksConfig;
  private tokens: QuickBooksTokens | null = null;

  constructor() {
    this.config = {
      clientId: process.env.QUICKBOOKS_CLIENT_ID || '',
      clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET || '',
      sandboxBaseUrl: 'https://sandbox-quickbooks.api.intuit.com',
      discoveryDocument: 'https://appcenter.intuit.com/api/v1/connection/oauth2',
      scope: 'com.intuit.quickbooks.accounting',
      redirectUri: process.env.QUICKBOOKS_REDIRECT_URI || 'https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl'
    };
  }

  // Initialize OAuth2 authorization URL
  getAuthorizationUrl(state: string = 'security_token'): string {
    const authUrl = new URL('https://appcenter.intuit.com/connect/oauth2');
    authUrl.searchParams.append('client_id', this.config.clientId);
    authUrl.searchParams.append('scope', this.config.scope);
    authUrl.searchParams.append('redirect_uri', this.config.redirectUri);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('access_type', 'offline');
    authUrl.searchParams.append('state', state);
    
    return authUrl.toString();
  }

  // Exchange authorization code for access tokens
  async exchangeCodeForTokens(code: string, realmId: string, state: string): Promise<QuickBooksTokens> {
    const tokenUrl = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
    
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.config.redirectUri
    });

    const authHeader = Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString('base64');

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: params
    });

    if (!response.ok) {
      throw new Error(`Failed to exchange code for tokens: ${response.statusText}`);
    }

    const tokenData = await response.json() as any;
    
    this.tokens = {
      ...tokenData,
      realmId: realmId
    };

    return this.tokens;
  }

  // Refresh access token using refresh token
  async refreshAccessToken(): Promise<QuickBooksTokens> {
    if (!this.tokens?.refresh_token) {
      throw new Error('No refresh token available');
    }

    const tokenUrl = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
    
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: this.tokens.refresh_token
    });

    const authHeader = Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString('base64');

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: params
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.statusText}`);
    }

    const tokenData = await response.json() as any;
    
    this.tokens = {
      ...this.tokens,
      ...tokenData
    };

    return this.tokens;
  }

  // Make authenticated API request
  private async makeApiRequest(endpoint: string, method: 'GET' | 'POST' | 'PUT' = 'GET', body?: any): Promise<any> {
    if (!this.tokens) {
      throw new Error('Not authenticated. Please complete OAuth flow first.');
    }

    const url = `${this.config.sandboxBaseUrl}/v3/company/${this.tokens.realmId}/${endpoint}`;
    
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${this.tokens.access_token}`,
      'Accept': 'application/json'
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Try to refresh token
        try {
          await this.refreshAccessToken();
          // Retry the request
          return this.makeApiRequest(endpoint, method, body);
        } catch (refreshError) {
          throw new Error('Authentication failed. Please re-authenticate.');
        }
      }
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Get all customers (schools/parents)
  async getCustomers(): Promise<QBCustomer[]> {
    const response = await this.makeApiRequest("query?query=SELECT * FROM Customer");
    return response.QueryResponse?.Customer || [];
  }

  // Get customer by ID
  async getCustomerById(customerId: string): Promise<QBCustomer | null> {
    const response = await this.makeApiRequest(`customers/${customerId}`);
    return response.QueryResponse?.Customer?.[0] || null;
  }

  // Create new customer (school/parent)
  async createCustomer(customerData: {
    name: string;
    companyName?: string;
    givenName?: string;
    familyName?: string;
    email?: string;
    phone?: string;
    address?: {
      line1?: string;
      city?: string;
      state?: string;
      postalCode?: string;
    };
  }): Promise<QBCustomer> {
    const customer = {
      Name: customerData.name,
      CompanyName: customerData.companyName,
      GivenName: customerData.givenName,
      FamilyName: customerData.familyName,
      PrimaryEmailAddr: customerData.email ? { Address: customerData.email } : undefined,
      PrimaryPhone: customerData.phone ? { FreeFormNumber: customerData.phone } : undefined,
      BillAddr: customerData.address ? {
        Line1: customerData.address.line1,
        City: customerData.address.city,
        CountrySubDivisionCode: customerData.address.state,
        PostalCode: customerData.address.postalCode
      } : undefined
    };

    const response = await this.makeApiRequest('customers', 'POST', customer);
    return response.QueryResponse?.Customer?.[0];
  }

  // Get all items (fee categories)
  async getItems(): Promise<QBItem[]> {
    const response = await this.makeApiRequest("query?query=SELECT * FROM Item");
    return response.QueryResponse?.Item || [];
  }

  // Create new item (fee category)
  async createItem(itemData: {
    name: string;
    description?: string;
    unitPrice?: number;
    incomeAccountRef?: string;
  }): Promise<QBItem> {
    const item = {
      Name: itemData.name,
      Description: itemData.description,
      Type: 'Service',
      UnitPrice: itemData.unitPrice,
      IncomeAccountRef: itemData.incomeAccountRef ? { value: itemData.incomeAccountRef } : undefined
    };

    const response = await this.makeApiRequest('items', 'POST', item);
    return response.QueryResponse?.Item?.[0];
  }

  // Get all invoices
  async getInvoices(): Promise<QBInvoice[]> {
    const response = await this.makeApiRequest("query?query=SELECT * FROM Invoice");
    return response.QueryResponse?.Invoice || [];
  }

  // Get invoices for specific customer
  async getInvoicesByCustomer(customerId: string): Promise<QBInvoice[]> {
    const response = await this.makeApiRequest(`query?query=SELECT * FROM Invoice WHERE CustomerRef = '${customerId}'`);
    return response.QueryResponse?.Invoice || [];
  }

  // Create new invoice
  async createInvoice(invoiceData: {
    customerId: string;
    customerName: string;
    lines: Array<{
      itemId: string;
      itemName: string;
      quantity: number;
      unitPrice: number;
      description?: string;
    }>;
    dueDate?: string;
    docNumber?: string;
  }): Promise<QBInvoice> {
    const invoice = {
      CustomerRef: {
        value: invoiceData.customerId,
        name: invoiceData.customerName
      },
      DueDate: invoiceData.dueDate,
      DocNumber: invoiceData.docNumber,
      Line: invoiceData.lines.map((line, index) => ({
        Id: (index + 1).toString(),
        LineNum: index + 1,
        Amount: line.quantity * line.unitPrice,
        DetailType: 'SalesItemLineDetail',
        SalesItemLineDetail: {
          ItemRef: {
            value: line.itemId,
            name: line.itemName
          },
          UnitPrice: line.unitPrice,
          Qty: line.quantity,
          ServiceDate: new Date().toISOString().split('T')[0]
        }
      }))
    };

    const response = await this.makeApiRequest('invoices', 'POST', invoice);
    return response.QueryResponse?.Invoice?.[0];
  }

  // Get all payments
  async getPayments(): Promise<QBPayment[]> {
    const response = await this.makeApiRequest("query?query=SELECT * FROM Payment");
    return response.QueryResponse?.Payment || [];
  }

  // Create payment record
  async createPayment(paymentData: {
    customerId: string;
    customerName: string;
    totalAmount: number;
    invoiceId?: string;
    txnDate?: string;
  }): Promise<QBPayment> {
    const payment = {
      CustomerRef: {
        value: paymentData.customerId,
        name: paymentData.customerName
      },
      TotalAmt: paymentData.totalAmount,
      TxnDate: paymentData.txnDate || new Date().toISOString().split('T')[0],
      Line: [{
        Amount: paymentData.totalAmount,
        LinkedTxn: paymentData.invoiceId ? [{
          TxnId: paymentData.invoiceId,
          TxnType: 'Invoice'
        }] : []
      }]
    };

    const response = await this.makeApiRequest('payments', 'POST', payment);
    return response.QueryResponse?.Payment?.[0];
  }

  // Set tokens manually (for stored tokens)
  setTokens(tokens: QuickBooksTokens): void {
    this.tokens = tokens;
  }

  // Get current tokens
  getTokens(): QuickBooksTokens | null {
    return this.tokens;
  }

  // Check if service is authenticated
  isAuthenticated(): boolean {
    return this.tokens !== null && this.tokens.access_token !== '';
  }

  // Sync school data from QuickBooks
  async syncSchoolData(schoolId: number): Promise<{
    customers: QBCustomer[];
    items: QBItem[];
    invoices: QBInvoice[];
    payments: QBPayment[];
  }> {
    const [customers, items, invoices, payments] = await Promise.all([
      this.getCustomers(),
      this.getItems(),
      this.getInvoices(),
      this.getPayments()
    ]);

    return {
      customers,
      items,
      invoices,
      payments
    };
  }
}

export { QuickBooksService, type QuickBooksTokens, type QBCustomer, type QBItem, type QBInvoice, type QBPayment };
export default QuickBooksService;