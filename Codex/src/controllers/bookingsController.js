import { pool } from '../db/pool.js';

export async function createBooking(req, res, next) {
  const connection = await pool.getConnection();
  try {
    const {
      vibe_id: vibeId,
      team_id: teamId,
      organiser_user_id: organiserUserId,
      event_date: eventDate,
      people_count: peopleCount,
      total_price: totalPrice,
      notes,
      addon_selections: addonSelections = []
    } = req.body;

    if (!vibeId || !organiserUserId || !eventDate || !peopleCount) {
      return res.status(400).json({
        error: 'vibe_id, organiser_user_id, event_date, people_count are required'
      });
    }

    await connection.beginTransaction();

    const [bookingResult] = await connection.execute(
      `INSERT INTO bookings
       (vibe_id, team_id, organiser_user_id, event_date, people_count, total_price, booking_status, notes, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, NOW())`,
      [vibeId, teamId || null, organiserUserId, eventDate, peopleCount, totalPrice || 0, notes || null]
    );

    const bookingId = bookingResult.insertId;

    for (const item of addonSelections) {
      await connection.execute(
        `INSERT INTO recommendation_addon_selections
         (booking_id, addon_id, quantity, price_at_booking)
         VALUES (?, ?, ?, ?)`,
        [bookingId, item.addon_id, item.quantity || 1, item.price_at_booking || 0]
      );
    }

    await connection.commit();

    res.status(201).json({
      booking_id: bookingId,
      confirmation: 'Booking enquiry received. The Team Guy will follow up shortly.'
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
}
