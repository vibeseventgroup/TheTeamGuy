import { sendSms } from '../services/twilioService.js';
import { logCommunication } from '../services/communicationsService.js';

export async function sendDirectSms(req, res, next) {
  try {
    const { user_id: userId, mobile, message } = req.body;
    if (!mobile || !message) return res.status(400).json({ error: 'mobile and message are required' });

    const smsResult = await sendSms(mobile, message);

    const communicationId = await logCommunication({
      userId: userId || null,
      type: 'sms',
      message,
      deliveryStatus: smsResult.sent ? 'sent' : 'failed'
    });

    res.status(201).json({
      communication_id: communicationId,
      provider_status: smsResult.providerStatus
    });
  } catch (error) {
    next(error);
  }
}
