import { MailService } from '@sendgrid/mail';

const mailService = new MailService();
const sendgridApiKey = process.env.SENDGRID_API_KEY;

if (!sendgridApiKey) {
  console.warn("SENDGRID_API_KEY environment variable not set. Email notifications will be disabled.");
} else {
  mailService.setApiKey(sendgridApiKey);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!sendgridApiKey) {
    console.log('Email would be sent:', params);
    return true; // Return true for demo purposes
  }

  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendContactNotification(contactData: {
  name: string;
  email: string;
  phone?: string;
  schoolName?: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0f172a 0%, #164e63 100%); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">New Contact Message</h1>
        <p style="color: #a7f3d0; margin: 5px 0;">Master Fees Platform</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2 style="color: #0f172a; margin-bottom: 20px;">Contact Details</h2>
        
        <div style="margin-bottom: 15px;">
          <strong style="color: #374151;">Name:</strong> ${contactData.name}
        </div>
        
        <div style="margin-bottom: 15px;">
          <strong style="color: #374151;">Email:</strong> ${contactData.email}
        </div>
        
        ${contactData.phone ? `
        <div style="margin-bottom: 15px;">
          <strong style="color: #374151;">Phone:</strong> ${contactData.phone}
        </div>
        ` : ''}
        
        ${contactData.schoolName ? `
        <div style="margin-bottom: 15px;">
          <strong style="color: #374151;">School:</strong> ${contactData.schoolName}
        </div>
        ` : ''}
        
        <div style="margin-bottom: 15px;">
          <strong style="color: #374151;">Subject:</strong> ${contactData.subject}
        </div>
        
        <div style="margin-bottom: 20px;">
          <strong style="color: #374151;">Message:</strong>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 4px solid #10b981;">
            ${contactData.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px;">
            This message was sent through the Master Fees contact form.
          </p>
        </div>
      </div>
    </div>
  `;

  const emailText = `
New Contact Message - Master Fees Platform

Name: ${contactData.name}
Email: ${contactData.email}
${contactData.phone ? `Phone: ${contactData.phone}` : ''}
${contactData.schoolName ? `School: ${contactData.schoolName}` : ''}
Subject: ${contactData.subject}

Message:
${contactData.message}

This message was sent through the Master Fees contact form.
  `;

  return await sendEmail({
    to: 'admin@masterfees.com', // Replace with actual admin email
    from: 'noreply@masterfees.com', // Replace with verified SendGrid sender
    subject: `New Contact Message: ${contactData.subject}`,
    text: emailText,
    html: emailHtml
  });
}

export async function sendContactConfirmation(contactData: {
  name: string;
  email: string;
  subject: string;
}): Promise<boolean> {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0f172a 0%, #164e63 100%); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Thank You for Contacting Us</h1>
        <p style="color: #a7f3d0; margin: 5px 0;">Master Fees Platform</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2 style="color: #0f172a;">Hello ${contactData.name},</h2>
        
        <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
          Thank you for reaching out to us regarding "<strong>${contactData.subject}</strong>". 
          We have received your message and will get back to you within 24 hours.
        </p>
        
        <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
          Our team is committed to helping educational institutions streamline their fee management 
          processes, and we're excited to learn more about your needs.
        </p>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
          <h3 style="color: #0f172a; margin-top: 0;">What's Next?</h3>
          <ul style="color: #374151; margin: 0; padding-left: 20px;">
            <li>Our team will review your message</li>
            <li>We'll respond within 24 hours</li>
            <li>If needed, we'll schedule a demo call</li>
          </ul>
        </div>
        
        <p style="color: #374151; line-height: 1.6;">
          In the meantime, feel free to explore our platform features and see how Master Fees 
          can transform your school's fee management experience.
        </p>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px;">
            Best regards,<br>
            The Master Fees Team
          </p>
        </div>
      </div>
    </div>
  `;

  const emailText = `
Thank You for Contacting Us - Master Fees Platform

Hello ${contactData.name},

Thank you for reaching out to us regarding "${contactData.subject}". 
We have received your message and will get back to you within 24 hours.

Our team is committed to helping educational institutions streamline their fee management 
processes, and we're excited to learn more about your needs.

What's Next?
- Our team will review your message
- We'll respond within 24 hours
- If needed, we'll schedule a demo call

In the meantime, feel free to explore our platform features and see how Master Fees 
can transform your school's fee management experience.

Best regards,
The Master Fees Team
  `;

  return await sendEmail({
    to: contactData.email,
    from: 'noreply@masterfees.com', // Replace with verified SendGrid sender
    subject: 'Thank you for contacting Master Fees',
    text: emailText,
    html: emailHtml
  });
}