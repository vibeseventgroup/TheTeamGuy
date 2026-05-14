import crypto from 'crypto';
import { pool } from '../db/pool.js';
import { env } from '../config/env.js';
import { generateOtp, otpExpiresAt } from '../utils/otp.js';
import { sendSms } from '../services/twilioService.js';
import { logCommunication } from '../services/communicationsService.js';

const otpStore = new Map();

export async function requestOtp(req, res, next) {
  try {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ error: 'mobile is required' });

    const otp = generateOtp();
    const expiresAt = otpExpiresAt(env.twilio.otpExpiryMinutes);
    otpStore.set(mobile, { otp, expiresAt });

    const smsText = `Your The Team Guy verification code is ${otp}. Expires in ${env.twilio.otpExpiryMinutes} minutes.`;
    const smsResult = await sendSms(mobile, smsText);

    await logCommunication({
      userId: null,
      type: 'otp',
      message: smsText,
      deliveryStatus: smsResult.sent ? 'sent' : 'failed'
    });

    res.json({
      success: true,
      mobile,
      expires_in_minutes: env.twilio.otpExpiryMinutes,
      provider_status: smsResult.providerStatus
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyOtp(req, res, next) {
  try {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) return res.status(400).json({ error: 'mobile and otp are required' });

    const stored = otpStore.get(mobile);
    if (!stored) return res.status(401).json({ error: 'OTP not found for mobile' });
    if (new Date() > stored.expiresAt) return res.status(401).json({ error: 'OTP expired' });
    if (stored.otp !== otp) return res.status(401).json({ error: 'OTP invalid' });

    otpStore.delete(mobile);

    const [users] = await pool.execute('SELECT user_id, first_name, last_name, mobile, role, status FROM users WHERE mobile = ? LIMIT 1', [mobile]);

    let user = users[0];
    if (!user) {
      const [result] = await pool.execute(
        `INSERT INTO users (first_name, last_name, mobile, role, status)
         VALUES ('', '', ?, 'user', 'active')`,
        [mobile]
      );

      const [created] = await pool.execute(
        'SELECT user_id, first_name, last_name, mobile, role, status FROM users WHERE user_id = ? LIMIT 1',
        [result.insertId]
      );
      user = created[0];
    }

    const token = crypto.randomBytes(32).toString('hex');
    res.json({ success: true, token, user });
  } catch (error) {
    next(error);
  }
}
