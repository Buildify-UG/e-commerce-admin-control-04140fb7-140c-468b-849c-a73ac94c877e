-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO roles (name) VALUES ('super_admin'), ('admin'), ('seller'), ('customer') ON CONFLICT DO NOTHING;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role_id BIGINT REFERENCES roles(id),
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image_url TEXT,
  icon_url TEXT,
  description TEXT,
  parent_id BIGINT REFERENCES categories(id),
  status TEXT DEFAULT 'active',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create sellers table
CREATE TABLE IF NOT EXISTS sellers (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  store_name TEXT NOT NULL,
  store_slug TEXT UNIQUE NOT NULL,
  store_logo_url TEXT,
  store_banner_url TEXT,
  store_description TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'Nigeria',
  phone TEXT,
  commission_rate DECIMAL(5,2) DEFAULT 10.00,
  status TEXT DEFAULT 'pending',
  rating DECIMAL(3,2) DEFAULT 0,
  total_products INT DEFAULT 0,
  total_sales DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  seller_id BIGINT NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
  category_id BIGINT NOT NULL REFERENCES categories(id),
  brand_id BIGINT REFERENCES brands(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(15,2) NOT NULL,
  discount_price DECIMAL(15,2),
  cost_price DECIMAL(15,2),
  stock_quantity INT DEFAULT 0,
  low_stock_alert INT DEFAULT 10,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_best_seller BOOLEAN DEFAULT FALSE,
  is_new_arrival BOOLEAN DEFAULT FALSE,
  is_flash_sale BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create product images table
CREATE TABLE IF NOT EXISTS product_images (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create product variations table
CREATE TABLE IF NOT EXISTS product_variations (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  price DECIMAL(15,2),
  stock_quantity INT DEFAULT 0,
  attributes JSONB,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create carts table
CREATE TABLE IF NOT EXISTS carts (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id BIGSERIAL PRIMARY KEY,
  cart_id BIGINT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variation_id BIGINT REFERENCES product_variations(id),
  quantity INT NOT NULL DEFAULT 1,
  price DECIMAL(15,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  street_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT DEFAULT 'Nigeria',
  postal_code TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  seller_id BIGINT REFERENCES sellers(id),
  address_id BIGINT REFERENCES addresses(id),
  subtotal DECIMAL(15,2) NOT NULL,
  shipping_fee DECIMAL(15,2) DEFAULT 0,
  discount DECIMAL(15,2) DEFAULT 0,
  tax DECIMAL(15,2) DEFAULT 0,
  total_amount DECIMAL(15,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create order items table
CREATE TABLE IF NOT EXISTS order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id),
  variation_id BIGINT REFERENCES product_variations(id),
  quantity INT NOT NULL,
  price DECIMAL(15,2) NOT NULL,
  seller_id BIGINT NOT NULL REFERENCES sellers(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_id BIGINT REFERENCES orders(id),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT TRUE,
  helpful_count INT DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL,
  discount_value DECIMAL(15,2) NOT NULL,
  min_order_amount DECIMAL(15,2),
  max_discount DECIMAL(15,2),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  usage_limit INT,
  per_user_limit INT DEFAULT 1,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT,
  related_id BIGINT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create banners table
CREATE TABLE IF NOT EXISTS banners (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT,
  sort_order INT DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id BIGSERIAL PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_cart_user ON carts(user_id);
CREATE INDEX idx_wishlist_user ON wishlists(user_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_sellers_user ON sellers(user_id);

-- Insert demo data

-- Insert demo categories
INSERT INTO categories (name, slug, description, status, sort_order) VALUES
('Electronics', 'electronics', 'Phones, laptops, and gadgets', 'active', 1),
('Fashion', 'fashion', 'Clothing, shoes, and accessories', 'active', 2),
('Home & Kitchen', 'home-kitchen', 'Furniture and kitchen items', 'active', 3),
('Beauty', 'beauty', 'Cosmetics and skincare', 'active', 4),
('Sports', 'sports', 'Sports equipment and gear', 'active', 5)
ON CONFLICT DO NOTHING;

-- Insert demo brands
INSERT INTO brands (name, slug, description, status) VALUES
('Samsung', 'samsung', 'Premium electronics', 'active'),
('Apple', 'apple', 'Premium devices', 'active'),
('Nike', 'nike', 'Sports apparel', 'active'),
('Adidas', 'adidas', 'Sports brand', 'active'),
('LG', 'lg', 'Electronics manufacturer', 'active')
ON CONFLICT DO NOTHING;

-- Insert demo seller
INSERT INTO users (email, password_hash, full_name, phone, role_id, email_verified) 
SELECT 'seller@marketplace.com', 'hashed_password_seller', 'Demo Seller', '+234801234567', id, true
FROM roles WHERE name = 'seller'
ON CONFLICT DO NOTHING;

INSERT INTO sellers (user_id, store_name, store_slug, store_description, address, city, state, status)
SELECT u.id, 'Premium Store', 'premium-store', 'Your trusted online marketplace', 'Lagos', 'Lagos', 'Lagos', 'active'
FROM users u WHERE u.email = 'seller@marketplace.com'
ON CONFLICT (user_id) DO NOTHING;