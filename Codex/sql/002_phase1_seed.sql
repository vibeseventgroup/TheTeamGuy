INSERT INTO homepage_options (label, icon, display_order, is_active) VALUES
('We\'re planning a team night', 'calendar', 1, TRUE),
('Need team bonding ideas', 'users', 2, TRUE),
('Organising a work event', 'briefcase', 3, TRUE),
('Need venue suggestions', 'building', 4, TRUE)
ON DUPLICATE KEY UPDATE label = VALUES(label);

INSERT INTO recommendation_addons (addon_name, description, price, category) VALUES
('Karaoke Setup', 'Full karaoke system with 1000+ songs', 150.00, 'entertainment'),
('DJ (2 hours)', 'Professional DJ for 2 hours', 200.00, 'entertainment'),
('Trivia Host', 'Hosted trivia night for your group', 120.00, 'entertainment'),
('Photobooth', 'Photobooth with props for 3 hours', 100.00, 'entertainment')
ON DUPLICATE KEY UPDATE addon_name = VALUES(addon_name);
