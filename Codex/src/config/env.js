import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 8080),
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'test',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'u873997170_vibes'
  },
  sessionSecret: process.env.SESSION_SECRET || 'change_me',
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
    otpExpiryMinutes: Number(process.env.OTP_EXPIRY_MINUTES || 10)
  }
};
