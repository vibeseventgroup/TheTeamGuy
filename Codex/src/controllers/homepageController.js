import { pool } from '../db/pool.js';

export async function getHomepageOptions(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT option_id, label, icon, display_order
       FROM homepage_options
       WHERE is_active = TRUE
       ORDER BY display_order ASC`
    );

    res.json({ options: rows });
  } catch (error) {
    next(error);
  }
}
