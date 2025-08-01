import twilio from 'twilio';

export async function sendJobApplicationSMS(
  phoneNumber: string,
  fullName: string,
  position: string
): Promise<boolean> {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
    console.log(`Job application SMS would be sent to ${phoneNumber}`);
    return true;
  }

  try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    await client.messages.create({
      body: `Hi ${fullName}! Your application for ${position} at Master Fees has been received. We'll review it and get back to you within 5 business days. Thank you for your interest in joining our team!`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    return true;
  } catch (error) {
    console.error('Job application SMS error:', error);
    return false;
  }
}