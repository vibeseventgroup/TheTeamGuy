# The Team Guy - Phase 1 API Contract

GET /api/homepage/options
Params: none
Returns: { options: [{ option_id: number, label: string, icon: string, display_order: number }] }
Example: { "options": [{ "option_id": 1, "label": "We're planning a team night", "icon": "calendar", "display_order": 1 }] }

POST /api/auth/request-otp
Params: mobile (string)
Returns: { success: boolean, mobile: string, expires_in_minutes: number, provider_status: string }
Example: { "success": true, "mobile": "+61412345678", "expires_in_minutes": 10, "provider_status": "queued" }

POST /api/auth/verify-otp
Params: mobile (string), otp (string)
Returns: { success: boolean, token: string, user: { user_id: number, first_name: string, last_name: string, mobile: string, role: string, status: string } }
Example: { "success": true, "token": "3a...", "user": { "user_id": 7, "first_name": "", "last_name": "", "mobile": "+61412345678", "role": "user", "status": "active" } }

GET /api/vibes/recommend
Params: vibe_type (string), group_size (number), budget (number), location (string)
Returns: { vibes: [{ vibe_id: number, title: string, category: string, short_description: string, location: string, price_from: number, price_to: number, duration: string, featured_image: string, tags: string }] }
Example: { "vibes": [{ "vibe_id": 12, "title": "Karaoke Night", "category": "Party", "short_description": "Private room + songs", "location": "Wollongong", "price_from": 45, "price_to": 65, "duration": "2.5 hrs", "featured_image": "/images/karaoke.jpg", "tags": "music,private room" }] }

GET /api/vibes/:id
Params: id (number path param)
Returns: { vibe: object, tags: array, images: array, venues: array }
Example: { "vibe": { "vibe_id": 12, "title": "Karaoke Night" }, "tags": [{ "vibe_tag_id": 1, "tag": "music" }], "images": [{ "image_id": 4, "image_path": "/images/karaoke-1.jpg", "image_order": 1 }], "venues": [{ "venue_id": 9, "business_name": "South Coast Karaoke" }] }

GET /api/vibes/:id/addons
Params: id (number path param)
Returns: { addons: [{ addon_id: number, addon_name: string, description: string, price: number, category: string }] }
Example: { "addons": [{ "addon_id": 1, "addon_name": "Karaoke Setup", "description": "Full karaoke system with 1000+ songs", "price": 150, "category": "entertainment" }] }

POST /api/bookings/create
Params: vibe_id (number), team_id (number|null), organiser_user_id (number), event_date (date string), people_count (number), total_price (number), notes (string), addon_selections (array)
Returns: { booking_id: number, confirmation: string }
Example: { "booking_id": 104, "confirmation": "Booking enquiry received. The Team Guy will follow up shortly." }

POST /api/communications/sms
Params: user_id (number|null), mobile (string), message (string)
Returns: { communication_id: number, provider_status: string }
Example: { "communication_id": 88, "provider_status": "queued" }
