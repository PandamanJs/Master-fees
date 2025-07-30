import twilio from 'twilio';

// Initialize Twilio client
let twilioClient: twilio.Twilio | null = null;

const initializeTwilio = () => {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.log('Twilio credentials not found. SMS notifications will be disabled.');
    return null;
  }
  
  if (!twilioClient) {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }
  
  return twilioClient;
};

interface SMSParams {
  to: string;
  message: string;
  type?: 'contact' | 'payment' | 'reminder' | 'general';
}

export async function sendSMS(params: SMSParams): Promise<boolean> {
  const client = initializeTwilio();
  
  if (!client || !process.env.TWILIO_PHONE_NUMBER) {
    console.log('Twilio not configured. SMS not sent.');
    return false;
  }

  try {
    const message = await client.messages.create({
      body: params.message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: params.to
    });

    console.log(`SMS sent successfully: ${message.sid}`);
    return true;
  } catch (error) {
    console.error('Failed to send SMS:', error);
    return false;
  }
}

// Predefined SMS templates
export const smsTemplates = {
  contactConfirmation: (name: string, subject: string) => 
    `Hi ${name}! Thanks for contacting Master Fees about "${subject}". We've received your message and will respond within 24 hours. For urgent matters, call our support line.`,
    
  paymentConfirmation: (studentName: string, amount: number, receiptId: string) =>
    `Payment Confirmed! ₹${amount} received for ${studentName}. Receipt ID: ${receiptId}. Thank you for using Master Fees. Download your receipt from the app.`,
    
  paymentReminder: (studentName: string, amount: number, dueDate: string) =>
    `Fee Reminder: ₹${amount} is due for ${studentName} on ${dueDate}. Pay now via Master Fees app to avoid late fees. Login at your school portal.`,
    
  welcomeMessage: (parentName: string, schoolName: string) =>
    `Welcome to Master Fees, ${parentName}! Your ${schoolName} account is ready. Download the app and login with your credentials to start managing fees easily.`,
    
  feeStructureUpdate: (studentName: string, schoolName: string) =>
    `Fee Structure Updated: New fee details available for ${studentName} at ${schoolName}. Login to Master Fees app to view updated amounts and due dates.`,
    
  lowBalance: (studentName: string, balance: number) =>
    `Low Balance Alert: ₹${balance} remaining in ${studentName}'s account. Add funds via Master Fees app to ensure smooth fee payments.`
};

// SMS notification functions for different use cases
export async function sendContactFormSMS(name: string, phone: string, subject: string): Promise<boolean> {
  const message = smsTemplates.contactConfirmation(name, subject);
  return await sendSMS({
    to: phone,
    message,
    type: 'contact'
  });
}

export async function sendPaymentConfirmationSMS(
  phone: string, 
  studentName: string, 
  amount: number, 
  receiptId: string
): Promise<boolean> {
  const message = smsTemplates.paymentConfirmation(studentName, amount, receiptId);
  return await sendSMS({
    to: phone,
    message,
    type: 'payment'
  });
}

export async function sendPaymentReminderSMS(
  phone: string,
  studentName: string,
  amount: number,
  dueDate: string
): Promise<boolean> {
  const message = smsTemplates.paymentReminder(studentName, amount, dueDate);
  return await sendSMS({
    to: phone,
    message,
    type: 'reminder'
  });
}

export async function sendWelcomeSMS(phone: string, parentName: string, schoolName: string): Promise<boolean> {
  const message = smsTemplates.welcomeMessage(parentName, schoolName);
  return await sendSMS({
    to: phone,
    message,
    type: 'general'
  });
}

export async function sendFeeStructureUpdateSMS(
  phone: string,
  studentName: string,
  schoolName: string
): Promise<boolean> {
  const message = smsTemplates.feeStructureUpdate(studentName, schoolName);
  return await sendSMS({
    to: phone,
    message,
    type: 'general'
  });
}

// Admin notification SMS
export async function sendAdminNotificationSMS(
  adminPhone: string,
  message: string
): Promise<boolean> {
  return await sendSMS({
    to: adminPhone,
    message: `[Master Fees Admin] ${message}`,
    type: 'general'
  });
}