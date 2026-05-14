CREATE TABLE IF NOT EXISTS homepage_options (
  option_id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(100),
  icon VARCHAR(100),
  display_order INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255),
  mobile VARCHAR(20),
  password_hash VARCHAR(255),
  profile_photo VARCHAR(255),
  bio TEXT,
  suburb VARCHAR(100),
  state VARCHAR(50),
  role ENUM('user','admin','organiser'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  status ENUM('active','inactive','banned')
);

CREATE TABLE IF NOT EXISTS user_preferences (
  preference_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  favourite_vibes JSON,
  preferred_budget VARCHAR(50),
  preferred_regions JSON,
  notification_settings JSON,
  privacy_settings JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS vibes (
  vibe_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  category VARCHAR(100),
  short_description VARCHAR(255),
  long_description TEXT,
  location VARCHAR(255),
  price_from DECIMAL(10,2),
  price_to DECIMAL(10,2),
  min_team_size INT,
  max_team_size INT,
  duration VARCHAR(100),
  featured_image VARCHAR(255),
  created_by INT,
  active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  expiry_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS vibe_tags (
  vibe_tag_id INT AUTO_INCREMENT PRIMARY KEY,
  vibe_id INT,
  tag VARCHAR(100),
  FOREIGN KEY (vibe_id) REFERENCES vibes(vibe_id)
);

CREATE TABLE IF NOT EXISTS vibe_images (
  image_id INT AUTO_INCREMENT PRIMARY KEY,
  vibe_id INT,
  image_path VARCHAR(255),
  image_order INT,
  FOREIGN KEY (vibe_id) REFERENCES vibes(vibe_id)
);

CREATE TABLE IF NOT EXISTS venues (
  venue_id INT AUTO_INCREMENT PRIMARY KEY,
  business_name VARCHAR(255),
  address VARCHAR(255),
  region VARCHAR(100),
  contact_person VARCHAR(100),
  contact_email VARCHAR(255),
  contact_mobile VARCHAR(20),
  website VARCHAR(255),
  venue_type VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active','inactive')
);

CREATE TABLE IF NOT EXISTS vibe_venues (
  vibe_venue_id INT AUTO_INCREMENT PRIMARY KEY,
  vibe_id INT,
  venue_id INT,
  FOREIGN KEY (vibe_id) REFERENCES vibes(vibe_id),
  FOREIGN KEY (venue_id) REFERENCES venues(venue_id)
);

CREATE TABLE IF NOT EXISTS bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  vibe_id INT,
  team_id INT,
  organiser_user_id INT,
  event_date DATE,
  people_count INT,
  total_price DECIMAL(10,2),
  booking_status ENUM('pending','confirmed','cancelled','completed'),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  FOREIGN KEY (vibe_id) REFERENCES vibes(vibe_id),
  FOREIGN KEY (organiser_user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS recommendation_addons (
  addon_id INT AUTO_INCREMENT PRIMARY KEY,
  addon_name VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2),
  category ENUM('entertainment','food','equipment','other'),
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recommendation_addon_selections (
  selection_id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT,
  addon_id INT,
  quantity INT DEFAULT 1,
  price_at_booking DECIMAL(10,2),
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),
  FOREIGN KEY (addon_id) REFERENCES recommendation_addons(addon_id)
);

CREATE TABLE IF NOT EXISTS communications (
  communication_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  type ENUM('sms','call','email','otp'),
  message TEXT,
  delivery_status ENUM('sent','delivered','failed'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
