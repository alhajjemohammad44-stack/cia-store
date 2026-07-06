-- CIA Store D1 Database Schema
-- Initial migration: Create all tables

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  password_hash TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK(role IN ('customer', 'admin', 'superadmin')),
  avatar_url TEXT,
  is_verified INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  description_ar TEXT,
  image_url TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Sub Categories table
CREATE TABLE IF NOT EXISTS sub_categories (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_ar TEXT,
  slug TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES categories(id),
  sub_category_id TEXT REFERENCES sub_categories(id),
  name TEXT NOT NULL,
  name_ar TEXT,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  description_ar TEXT,
  price REAL NOT NULL,
  original_price REAL,
  currency TEXT NOT NULL DEFAULT 'USD',
  image_url TEXT,
  rarity TEXT CHECK(rarity IN ('Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythical')),
  product_type TEXT NOT NULL DEFAULT 'item' CHECK(product_type IN ('item', 'account', 'gamepass', 'robux', 'service')),
  in_stock INTEGER NOT NULL DEFAULT 1,
  stock_count INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  features TEXT,
  metadata TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  email TEXT NOT NULL,
  username TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'pending_review', 'waiting_customer', 'in_progress', 'delivering', 'processing', 'completed', 'cancelled', 'refunded')),
  total_amount REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  payment_method TEXT CHECK(payment_method IN ('stripe', 'paypal', 'usdt', 'manual', 'moyasar')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK(payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  stripe_payment_intent_id TEXT,
  paypal_order_id TEXT,
  usdt_tx_hash TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Order Items table
CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price REAL NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  product_id TEXT REFERENCES products(id),
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  comment TEXT,
  user_name TEXT NOT NULL,
  avatar_url TEXT,
  is_approved INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Carts table
CREATE TABLE IF NOT EXISTS carts (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  session_id TEXT,
  items TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Discount Codes table
CREATE TABLE IF NOT EXISTS discount_codes (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK(type IN ('percent', 'fixed')),
  value REAL NOT NULL,
  min_amount REAL NOT NULL DEFAULT 0,
  max_uses INTEGER NOT NULL DEFAULT 999,
  used_count INTEGER NOT NULL DEFAULT 0,
  applies_to TEXT NOT NULL DEFAULT 'all',
  expires_at TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Wallet table
CREATE TABLE IF NOT EXISTS wallets (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  balance REAL NOT NULL DEFAULT 0,
  cashback_total REAL NOT NULL DEFAULT 0,
  is_frozen INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Wallet Transactions table
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id TEXT PRIMARY KEY,
  wallet_id TEXT NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK(type IN ('deposit', 'withdrawal', 'purchase', 'refund', 'cashback', 'admin_adjust')),
  amount REAL NOT NULL,
  balance_before REAL NOT NULL,
  balance_after REAL NOT NULL,
  reference_type TEXT,
  reference_id TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Withdrawal Requests table
CREATE TABLE IF NOT EXISTS withdrawal_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  wallet_id TEXT NOT NULL REFERENCES wallets(id),
  amount REAL NOT NULL,
  fee REAL NOT NULL DEFAULT 0,
  net_amount REAL NOT NULL,
  bank_name TEXT,
  iban TEXT,
  account_number TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected', 'completed')),
  admin_notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Activity Log table
CREATE TABLE IF NOT EXISTS activity_log (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  details TEXT,
  ip_address TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id TEXT PRIMARY KEY,
  message TEXT NOT NULL,
  message_ar TEXT,
  type TEXT NOT NULL DEFAULT 'info' CHECK(type IN ('info', 'deal', 'warning')),
  link TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Payment Methods config table
CREATE TABLE IF NOT EXISTS payment_methods (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  enabled INTEGER NOT NULL DEFAULT 1,
  test_mode INTEGER NOT NULL DEFAULT 0,
  config TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Content Pages table
CREATE TABLE IF NOT EXISTS content_pages (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  title_ar TEXT,
  content TEXT,
  content_ar TEXT,
  meta_title TEXT,
  meta_description TEXT,
  is_published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Insert default payment methods
INSERT OR IGNORE INTO payment_methods (id, name, slug, enabled, test_mode, sort_order) VALUES
  ('pm-stripe', 'Stripe', 'stripe', 1, 0, 1),
  ('pm-paypal', 'PayPal', 'paypal', 1, 0, 2),
  ('pm-usdt', 'USDT (Crypto)', 'usdt', 1, 0, 3),
  ('pm-manual', 'Bank Transfer', 'manual', 0, 0, 4),
  ('pm-moyasar', 'Moyasar (Mada)', 'moyasar', 0, 1, 5);

-- Insert default content pages
INSERT OR IGNORE INTO content_pages (slug, title, title_ar, is_published) VALUES
  ('privacy', 'Privacy Policy', 'سياسة الخصوصية', 1),
  ('terms', 'Terms of Service', 'شروط الخدمة', 1),
  ('faq', 'Frequently Asked Questions', 'الأسئلة الشائعة', 1),
  ('about', 'About Us', 'من نحن', 1),
  ('delivery', 'Delivery Information', 'معلومات التوصيل', 1),
  ('refund', 'Refund Policy', 'سياسة الاسترداد', 1);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_carts_session ON carts(session_id);
CREATE INDEX IF NOT EXISTS idx_discounts_code ON discount_codes(code);
CREATE INDEX IF NOT EXISTS idx_wallet_user ON wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_tx_wallet ON wallet_transactions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_user ON withdrawal_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_log(created_at);
