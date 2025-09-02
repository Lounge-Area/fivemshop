/*
  # Seed Initial Data for FiveM Store System

  1. Categories
    - Weapons, Ammunition, Weapon Attachments, Explosives
    - Vehicles, Vehicle Modifications, Clothing & Accessories
    - Medical Supplies, Food & Drinks, Electronics
    - Tools & Equipment, Drugs & Contraband, Real Estate
    - Business Licenses & Permits

  2. Subcategories
    - Detailed subcategories for each main category

  3. Sample Shop
    - Default shop for initial products

  4. Sample Products
    - Representative products for each category
*/

-- Insert Categories
INSERT INTO categories (id, name, icon) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Weapons', 'zap'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Ammunition', 'target'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Weapon Attachments', 'settings'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Explosives', 'bomb'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Vehicles', 'car'),
  ('550e8400-e29b-41d4-a716-446655440006', 'Vehicle Modifications', 'wrench'),
  ('550e8400-e29b-41d4-a716-446655440007', 'Clothing & Accessories', 'shirt'),
  ('550e8400-e29b-41d4-a716-446655440008', 'Medical Supplies', 'heart'),
  ('550e8400-e29b-41d4-a716-446655440009', 'Food & Drinks', 'apple'),
  ('550e8400-e29b-41d4-a716-446655440010', 'Electronics', 'smartphone'),
  ('550e8400-e29b-41d4-a716-446655440011', 'Tools & Equipment', 'tool'),
  ('550e8400-e29b-41d4-a716-446655440012', 'Drugs & Contraband', 'flask'),
  ('550e8400-e29b-41d4-a716-446655440013', 'Real Estate', 'home'),
  ('550e8400-e29b-41d4-a716-446655440014', 'Business Licenses', 'file-text')
ON CONFLICT (id) DO NOTHING;

-- Insert Subcategories
INSERT INTO subcategories (id, name, category_id) VALUES
  -- Weapons
  ('660e8400-e29b-41d4-a716-446655440001', 'Pistols', '550e8400-e29b-41d4-a716-446655440001'),
  ('660e8400-e29b-41d4-a716-446655440002', 'Rifles', '550e8400-e29b-41d4-a716-446655440001'),
  ('660e8400-e29b-41d4-a716-446655440003', 'Shotguns', '550e8400-e29b-41d4-a716-446655440001'),
  ('660e8400-e29b-41d4-a716-446655440004', 'Melee Weapons', '550e8400-e29b-41d4-a716-446655440001'),
  
  -- Ammunition
  ('660e8400-e29b-41d4-a716-446655440005', '9mm Rounds', '550e8400-e29b-41d4-a716-446655440002'),
  ('660e8400-e29b-41d4-a716-446655440006', '5.56mm Rounds', '550e8400-e29b-41d4-a716-446655440002'),
  ('660e8400-e29b-41d4-a716-446655440007', '12 Gauge Shells', '550e8400-e29b-41d4-a716-446655440002'),
  
  -- Weapon Attachments
  ('660e8400-e29b-41d4-a716-446655440008', 'Scopes', '550e8400-e29b-41d4-a716-446655440003'),
  ('660e8400-e29b-41d4-a716-446655440009', 'Silencers', '550e8400-e29b-41d4-a716-446655440003'),
  ('660e8400-e29b-41d4-a716-446655440010', 'Grips', '550e8400-e29b-41d4-a716-446655440003'),
  ('660e8400-e29b-41d4-a716-446655440011', 'Extended Magazines', '550e8400-e29b-41d4-a716-446655440003'),
  
  -- Vehicles
  ('660e8400-e29b-41d4-a716-446655440012', 'Cars', '550e8400-e29b-41d4-a716-446655440005'),
  ('660e8400-e29b-41d4-a716-446655440013', 'Motorcycles', '550e8400-e29b-41d4-a716-446655440005'),
  ('660e8400-e29b-41d4-a716-446655440014', 'Boats', '550e8400-e29b-41d4-a716-446655440005'),
  ('660e8400-e29b-41d4-a716-446655440015', 'Aircraft', '550e8400-e29b-41d4-a716-446655440005'),
  
  -- Vehicle Modifications
  ('660e8400-e29b-41d4-a716-446655440016', 'Engines', '550e8400-e29b-41d4-a716-446655440006'),
  ('660e8400-e29b-41d4-a716-446655440017', 'Brakes', '550e8400-e29b-41d4-a716-446655440006'),
  ('660e8400-e29b-41d4-a716-446655440018', 'Suspension', '550e8400-e29b-41d4-a716-446655440006'),
  ('660e8400-e29b-41d4-a716-446655440019', 'Cosmetics', '550e8400-e29b-41d4-a716-446655440006'),
  
  -- Food & Drinks
  ('660e8400-e29b-41d4-a716-446655440020', 'Beverages', '550e8400-e29b-41d4-a716-446655440009'),
  ('660e8400-e29b-41d4-a716-446655440021', 'Snacks', '550e8400-e29b-41d4-a716-446655440009'),
  ('660e8400-e29b-41d4-a716-446655440022', 'Meals', '550e8400-e29b-41d4-a716-446655440009')
ON CONFLICT (id) DO NOTHING;

-- Insert Default Shop
INSERT INTO shops (id, name, description, location, opening_hours, is_active) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', 'Los Santos General Store', 'Your one-stop shop for all essentials in Los Santos', 'Downtown Los Santos', '24/7', true)
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Products
INSERT INTO products (id, name, price, category_id, subcategory_id, shop_id, description, image_url, in_stock, stock_quantity, tags) VALUES
  -- Weapons
  ('880e8400-e29b-41d4-a716-446655440001', 'Glock 17', 850.00, '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'Reliable 9mm pistol for personal protection', 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg', true, 15, '{"pistol", "9mm", "reliable"}'),
  
  ('880e8400-e29b-41d4-a716-446655440002', 'AK-47', 2500.00, '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440001', 'Powerful assault rifle with high damage output', 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg', true, 8, '{"rifle", "assault", "powerful"}'),
  
  ('880e8400-e29b-41d4-a716-446655440003', 'Pump Shotgun', 1200.00, '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440001', 'Close-range combat shotgun', 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg', true, 12, '{"shotgun", "close-range", "combat"}'),
  
  -- Ammunition
  ('880e8400-e29b-41d4-a716-446655440004', '9mm Ammo Box (50 rounds)', 25.00, '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440001', 'Standard 9mm ammunition for pistols', 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg', true, 100, '{"ammo", "9mm", "pistol"}'),
  
  ('880e8400-e29b-41d4-a716-446655440005', '5.56mm Ammo Box (30 rounds)', 45.00, '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440006', '770e8400-e29b-41d4-a716-446655440001', 'High-velocity rifle ammunition', 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg', true, 75, '{"ammo", "rifle", "high-velocity"}'),
  
  -- Weapon Attachments
  ('880e8400-e29b-41d4-a716-446655440006', 'Red Dot Sight', 150.00, '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440008', '770e8400-e29b-41d4-a716-446655440001', 'Precision red dot sight for improved accuracy', 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg', true, 25, '{"scope", "red-dot", "accuracy"}'),
  
  ('880e8400-e29b-41d4-a716-446655440007', 'Suppressor', 300.00, '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440009', '770e8400-e29b-41d4-a716-446655440001', 'Sound suppressor for stealth operations', 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg', true, 18, '{"silencer", "stealth", "quiet"}'),
  
  -- Vehicles
  ('880e8400-e29b-41d4-a716-446655440008', 'Sultan RS', 95000.00, '550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440012', '770e8400-e29b-41d4-a716-446655440001', 'High-performance sports sedan', 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg', true, 3, '{"car", "sports", "sedan"}'),
  
  ('880e8400-e29b-41d4-a716-446655440009', 'Akuma Motorcycle', 15000.00, '550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440013', '770e8400-e29b-41d4-a716-446655440001', 'Fast and agile motorcycle for city travel', 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg', true, 7, '{"motorcycle", "fast", "agile"}'),
  
  -- Medical Supplies
  ('880e8400-e29b-41d4-a716-446655440010', 'First Aid Kit', 50.00, '550e8400-e29b-41d4-a716-446655440008', null, '770e8400-e29b-41d4-a716-446655440001', 'Complete first aid kit for emergency medical care', 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg', true, 50, '{"medical", "first-aid", "emergency"}'),
  
  ('880e8400-e29b-41d4-a716-446655440011', 'Painkillers', 15.00, '550e8400-e29b-41d4-a716-446655440008', null, '770e8400-e29b-41d4-a716-446655440001', 'Pain relief medication', 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg', true, 80, '{"medical", "painkillers", "relief"}'),
  
  -- Food & Drinks
  ('880e8400-e29b-41d4-a716-446655440012', 'Energy Drink', 5.00, '550e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440020', '770e8400-e29b-41d4-a716-446655440001', 'Boost your energy with this refreshing drink', 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg', true, 200, '{"drink", "energy", "refreshing"}'),
  
  ('880e8400-e29b-41d4-a716-446655440013', 'Burger', 12.00, '550e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440022', '770e8400-e29b-41d4-a716-446655440001', 'Delicious beef burger to restore health', 'https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg', true, 150, '{"food", "burger", "health"}'),
  
  -- Electronics
  ('880e8400-e29b-41d4-a716-446655440014', 'Smartphone', 800.00, '550e8400-e29b-41d4-a716-446655440010', null, '770e8400-e29b-41d4-a716-446655440001', 'Latest smartphone for communication and apps', 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg', true, 30, '{"phone", "communication", "apps"}'),
  
  ('880e8400-e29b-41d4-a716-446655440015', 'GPS Device', 200.00, '550e8400-e29b-41d4-a716-446655440010', null, '770e8400-e29b-41d4-a716-446655440001', 'Portable GPS navigation device', 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg', true, 40, '{"gps", "navigation", "portable"}'),
  
  -- Tools & Equipment
  ('880e8400-e29b-41d4-a716-446655440016', 'Lockpick Set', 75.00, '550e8400-e29b-41d4-a716-446655440011', null, '770e8400-e29b-41d4-a716-446655440001', 'Professional lockpicking tools', 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg', true, 35, '{"lockpick", "tools", "professional"}'),
  
  ('880e8400-e29b-41d4-a716-446655440017', 'Repair Kit', 120.00, '550e8400-e29b-41d4-a716-446655440011', null, '770e8400-e29b-41d4-a716-446655440001', 'Vehicle repair kit for emergency fixes', 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg', true, 25, '{"repair", "vehicle", "emergency"})
ON CONFLICT (id) DO NOTHING;