/*
  # FiveM Store System Database Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `icon` (text)
      - `created_at` (timestamp)
    - `subcategories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category_id` (uuid, foreign key)
      - `created_at` (timestamp)
    - `shops`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `location` (text)
      - `opening_hours` (text)
      - `owner_id` (uuid, foreign key to auth.users)
      - `is_active` (boolean)
      - `created_at` (timestamp)
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (numeric)
      - `category_id` (uuid, foreign key)
      - `subcategory_id` (uuid, foreign key)
      - `shop_id` (uuid, foreign key)
      - `description` (text)
      - `image_url` (text)
      - `in_stock` (boolean)
      - `stock_quantity` (integer)
      - `tags` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to products, categories, subcategories
    - Add policies for authenticated admin access to shops
    - Add policies for shop owners to manage their products

  3. Indexes
    - Add indexes for better query performance
    - Foreign key indexes for joins
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL DEFAULT 'grid3x3',
  created_at timestamptz DEFAULT now()
);

-- Create subcategories table
CREATE TABLE IF NOT EXISTS subcategories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Create shops table
CREATE TABLE IF NOT EXISTS shops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  location text DEFAULT '',
  opening_hours text DEFAULT '24/7',
  owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric(10,2) NOT NULL DEFAULT 0,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  subcategory_id uuid REFERENCES subcategories(id) ON DELETE SET NULL,
  shop_id uuid REFERENCES shops(id) ON DELETE SET NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  in_stock boolean DEFAULT true,
  stock_quantity integer DEFAULT 0,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for categories (public read)
CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Categories can be managed by authenticated users"
  ON categories
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for subcategories (public read)
CREATE POLICY "Subcategories are viewable by everyone"
  ON subcategories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Subcategories can be managed by authenticated users"
  ON subcategories
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for shops
CREATE POLICY "Shops are viewable by everyone"
  ON shops
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Shop owners can manage their shops"
  ON shops
  FOR ALL
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Authenticated users can create shops"
  ON shops
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

-- Create policies for products (public read)
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Shop owners can manage their products"
  ON products
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM shops 
      WHERE shops.id = products.shop_id 
      AND shops.owner_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can create products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM shops 
      WHERE shops.id = products.shop_id 
      AND shops.owner_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_subcategories_category_id ON subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_subcategory_id ON products(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_products_shop_id ON products(shop_id);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_shops_owner_id ON shops(owner_id);
CREATE INDEX IF NOT EXISTS idx_shops_is_active ON shops(is_active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_shops_updated_at 
  BEFORE UPDATE ON shops 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();