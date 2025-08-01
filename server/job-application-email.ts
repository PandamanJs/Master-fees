import { MailService } from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  const mailService = new MailService();
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function sendJobApplicationConfirmation(
  email: string,
  fullName: string,
  position: string
): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log(`Job application confirmation email would be sent to ${email} for ${position} position`);
    return true;
  }

  try {
    const mailService = new MailService();
    mailService.setApiKey(process.env.SENDGRID_API_KEY);

    await mailService.send({
      to: email,
      from: 'noreply@master-fees.com',
      subject: `Application Received - ${position} Position`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0f766e, #14b8a6); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Master Fees</h1>
            <p style="color: #a7f3d0; margin: 10px 0 0 0;">Education Technology Solutions</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #0f766e; margin-bottom: 20px;">Application Received!</h2>
            
            <p>Dear ${fullName},</p>
            
            <p>Thank you for your interest in joining Master Fees! We have successfully received your application for the <strong>${position}</strong> position.</p>
            
            <div style="background: #f0fdfa; border-left: 4px solid #14b8a6; padding: 15px; margin: 20px 0;">
              <h3 style="color: #0f766e; margin: 0 0 10px 0;">What happens next?</h3>
              <ul style="color: #134e4a; margin: 0; padding-left: 18px;">
                <li>Our HR team will review your application</li>
                <li>We'll contact you within 5 business days</li>
                <li>If selected, we'll schedule an interview</li>
                <li>You'll hear back from us regardless of the outcome</li>
              </ul>
            </div>
            
            <p>We're excited about the possibility of you joining our mission to make school fee management simple and accessible for every educational institution in Africa.</p>
            
            <p>If you have any questions, please don't hesitate to reach out to us at <a href="mailto:careers@master-fees.com" style="color: #14b8a6;">careers@master-fees.com</a></p>
            
            <p>Best regards,<br>
            <strong>The Master Fees Team</strong></p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error('Job application confirmation email error:', error);
    return false;
  }
}

export async function sendJobApplicationNotification(
  adminEmail: string,
  applicationData: any
): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.log(`Job application notification would be sent to ${adminEmail}`);
    return true;
  }

  try {
    const mailService = new MailService();
    mailService.setApiKey(process.env.SENDGRID_API_KEY);

    await mailService.send({
      to: adminEmail,
      from: 'noreply@master-fees.com',
      subject: `New Job Application - ${applicationData.position}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0f766e, #14b8a6); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Master Fees</h1>
            <p style="color: #a7f3d0; margin: 10px 0 0 0;">New Job Application</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #0f766e; margin-bottom: 20px;">New Application Received</h2>
            
            <div style="background: #f0fdfa; border: 1px solid #14b8a6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #0f766e; margin: 0 0 15px 0;">Applicant Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${applicationData.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${applicationData.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${applicationData.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Position:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${applicationData.position}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Experience:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${applicationData.experience}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Education:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${applicationData.education}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Availability:</td>
                  <td style="padding: 8px 0; color: #6b7280;">${applicationData.availability}</td>
                </tr>
              </table>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h4 style="color: #0f766e; margin: 0 0 10px 0;">Skills & Technologies:</h4>
              <p style="color: #374151; background: #f9fafb; padding: 15px; border-radius: 6px; margin: 0;">
                ${applicationData.skills}
              </p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h4 style="color: #0f766e; margin: 0 0 10px 0;">Motivation:</h4>
              <p style="color: #374151; background: #f9fafb; padding: 15px; border-radius: 6px; margin: 0;">
                ${applicationData.motivation}
              </p>
            </div>
            
            ${applicationData.resume ? `
            <div style="margin-bottom: 20px;">
              <h4 style="color: #0f766e; margin: 0 0 10px 0;">Resume:</h4>
              <a href="${applicationData.resume}" style="color: #14b8a6; text-decoration: none;">${applicationData.resume}</a>
            </div>
            ` : ''}
            
            ${applicationData.portfolio ? `
            <div style="margin-bottom: 20px;">
              <h4 style="color: #0f766e; margin: 0 0 10px 0;">Portfolio/LinkedIn:</h4>
              <a href="${applicationData.portfolio}" style="color: #14b8a6; text-decoration: none;">${applicationData.portfolio}</a>
            </div>
            ` : ''}
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #6b7280;">Please review the application and respond within 5 business days.</p>
            </div>
          </div>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error('Job application notification email error:', error);
    return false;
  }
}