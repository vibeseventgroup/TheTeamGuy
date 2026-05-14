import twilio from 'twilio';
import { env } from '../config/env.js';

const enabled = Boolean(env.twilio.accountSid && env.twilio.authToken && env.twilio.phoneNumber);
const client = enabled ? twilio(env.twilio.accountSid, env.twilio.authToken) : null;

export async function sendSms(to, body) {
  if (!enabled) {
    return {
      sent: false,
      sid: null,
      providerStatus: 'disabled',
      info: 'Twilio is not configured; skipped send in local/dev environment.'
    };
  }

  const result = await client.messages.create({
    from: env.twilio.phoneNumber,
    to,
    body
  });

  return {
    sent: true,
    sid: result.sid,
    providerStatus: result.status || 'queued'
  };
}
