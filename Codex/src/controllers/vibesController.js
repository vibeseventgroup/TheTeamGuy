import { pool } from '../db/pool.js';

export async function recommendVibes(req, res, next) {
  try {
    const { vibe_type: vibeType, group_size: groupSize, budget, location } = req.query;

    const filters = ['v.active = TRUE'];
    const params = [];

    if (vibeType) {
      filters.push('v.category = ?');
      params.push(vibeType);
    }
    if (groupSize) {
      filters.push('v.min_team_size <= ? AND v.max_team_size >= ?');
      params.push(Number(groupSize), Number(groupSize));
    }
    if (budget) {
      filters.push('v.price_from <= ?');
      params.push(Number(budget));
    }
    if (location) {
      filters.push('v.location LIKE ?');
      params.push(`%${location}%`);
    }

    const [rows] = await pool.execute(
      `SELECT v.vibe_id, v.title, v.category, v.short_description, v.location,
              v.price_from, v.price_to, v.duration, v.featured_image,
              GROUP_CONCAT(DISTINCT vt.tag) AS tags
       FROM vibes v
       LEFT JOIN vibe_tags vt ON vt.vibe_id = v.vibe_id
       WHERE ${filters.join(' AND ')}
       GROUP BY v.vibe_id
       ORDER BY v.featured DESC, v.created_at DESC`,
      params
    );

    res.json({ vibes: rows });
  } catch (error) {
    next(error);
  }
}

export async function getVibeById(req, res, next) {
  try {
    const vibeId = Number(req.params.id);

    const [vibes] = await pool.execute('SELECT * FROM vibes WHERE vibe_id = ? LIMIT 1', [vibeId]);
    if (!vibes.length) return res.status(404).json({ error: 'Vibe not found' });

    const [tags] = await pool.execute('SELECT vibe_tag_id, tag FROM vibe_tags WHERE vibe_id = ?', [vibeId]);
    const [images] = await pool.execute('SELECT image_id, image_path, image_order FROM vibe_images WHERE vibe_id = ? ORDER BY image_order', [vibeId]);
    const [venues] = await pool.execute(
      `SELECT ve.venue_id, ve.business_name, ve.address, ve.region, ve.contact_email, ve.contact_mobile, ve.website
       FROM vibe_venues vv
       INNER JOIN venues ve ON ve.venue_id = vv.venue_id
       WHERE vv.vibe_id = ?`,
      [vibeId]
    );

    res.json({ vibe: vibes[0], tags, images, venues });
  } catch (error) {
    next(error);
  }
}

export async function getVibeAddons(req, res, next) {
  try {
    const [addons] = await pool.execute(
      `SELECT addon_id, addon_name, description, price, category
       FROM recommendation_addons
       WHERE is_available = TRUE
       ORDER BY addon_name ASC`
    );

    res.json({ addons });
  } catch (error) {
    next(error);
  }
}
