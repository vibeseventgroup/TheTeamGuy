import { pool } from '../db/pool.js';

export async function logCommunication({ userId, type, message, deliveryStatus }) {
  const [result] = await pool.execute(
    `INSERT INTO communications (user_id, type, message, delivery_status)
     VALUES (?, ?, ?, ?)`,
    [userId || null, type, message, deliveryStatus]
  );

  return result.insertId;
}
