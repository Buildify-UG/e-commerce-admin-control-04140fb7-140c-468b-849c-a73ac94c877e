import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Star,
  Clock,
  Zap,
  TrendingUp,
  ChevronRight,
  Mail,
} from 'lucide-react';

// ============================================================================
// SAMPLE DATA
// ============================================================================

const categories = [
  { id: 1, name: 'Electronics', icon: '📱', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
  { id: 2, name: 'Fashion', icon: '👕', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=300&fit=crop' },
  { id: 3, name: 'Home & Garden', icon: '🏠', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
  { id: 4, name: 'Beauty', icon: '💄', image: 'https://images.unsplash.com/photo-1596462502278-af3c41e3a298?w=400&h=300&fit=crop' },
  { id: 5, name: 'Sports', icon: '⚽', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop' },
  { id: 6, name: 'Books', icon: '📚', image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=300&fit=crop' },
];

const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 45999,
    originalPrice: 65999,
    rating: 4.8,
    reviews: 324,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    badge: 'Flash Deal',
    stock: 12,
    seller: 'TechHub Store',
  },
  {
    id: 2,
    name: 'Luxury Leather Handbag',
    price: 28999,
    originalPrice: 42999,
    rating: 4.6,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    badge: 'Trending',
    stock: 8,
    seller: 'Fashion Elite',
  },
  {
    id: 3,
    name: 'Smart Watch Pro',
    price: 34999,
    originalPrice: 49999,
    rating: 4.7,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    badge: 'Best Seller',
    stock: 25,
    seller: 'ElectroMart',
  },
  {
    id: 4,
    name: 'Organic Skincare Set',
    price: 15999,
    originalPrice: 24999,
    rating: 4.9,
    reviews: 512,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    badge: 'New',
    stock: 45,
    seller: 'Beauty Naturals',
  },
  {
    id: 5,
    name: 'Running Shoes Ultra',
    price: 19999,
    originalPrice: 29999,
    rating: 4.5,
    reviews: 278,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    badge: 'Flash Deal',
    stock: 32,
    seller: 'Sports World',
  },
  {
    id: 6,
    name: 'Ceramic Coffee Maker',
    price: 12999,
    originalPrice: 18999,
    rating: 4.4,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=400&h=400&fit=crop',
    badge: 'Trending',
    stock: 18,
    seller: 'Home Essentials',
  },
  {
    id: 7,
    name: 'Bestselling Novel Bundle',
    price: 8999,
    originalPrice: 14999,
    rating: 4.8,
    reviews: 623,
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=400&fit=crop',
    badge: 'Best Seller',
    stock: 67,
    seller: 'Book Paradise',
  },
  {
    id: 8,
    name: '4K Webcam HD',
    price: 22999,
    originalPrice: 32999,
    rating: 4.6,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
    badge: 'New',
    stock: 14,
    seller: 'Tech Solutions',
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

interface CountdownTimerProps {
  endTime: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center gap-2 text-sm font-bold">
      <Clock className="w-4 h-4 text-destructive" />
      <span className="text-destructive">
        {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

interface ProductCardProps {
  product: typeof products[0];
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div onClick={() => navigate(`/product/${product.id}`)} className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-muted h-64 sm:h-56">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Badge */}
        <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
          {product.badge}
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-lg text-xs font-bold">
            -{discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
        >
          <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Seller */}
        <p className="text-xs text-muted-foreground mb-1">{product.seller}</p>

        {/* Name */}
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5"
                fill={i < Math.floor(product.rating) ? 'hsl(var(--accent))' : 'hsl(var(--muted))'}
                stroke={i < Math.floor(product.rating) ? 'hsl(var(--accent))' : 'hsl(var(--muted))'}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-primary">₦{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">₦{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Stock Status */}
        <p className="text-xs text-muted-foreground mb-3">
          {product.stock > 10 ? '✓ In Stock' : `Only ${product.stock} left`}
        </p>

        {/* Add to Cart Button */}
        <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 active:scale-95">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

interface CategoryCardProps {
  category: typeof categories[0];
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => (
  <div className="group cursor-pointer">
    <div className="relative overflow-hidden rounded-xl h-40 sm:h-48 mb-3 shadow-card hover:shadow-elevated transition-all duration-300">
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
        <span className="text-4xl">{category.icon}</span>
      </div>
    </div>
    <h3 className="font-semibold text-center text-foreground group-hover:text-primary transition-colors">
      {category.name}
    </h3>
  </div>
);

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function Index() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const flashDealEnd = new Date(Date.now() + 5 * 60 * 60 * 1000); // 5 hours from now

  return (
    <div className="min-h-screen bg-background">
      {/* ====== HEADER ====== */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-secondary w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                🛍️
              </div>
              <span className="hidden sm:block font-bold text-xl text-foreground">MarketHub</span>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 mx-8 max-w-md">
              <div className="w-full relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Mobile */}
              <button className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors">
                <Search className="w-5 h-5 text-foreground" />
              </button>

              {/* Wishlist */}
              <button className="hidden sm:flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors">
                <Heart className="w-5 h-5 text-foreground" />
                <span className="hidden lg:block text-sm font-medium">Wishlist</span>
              </button>

              {/* Account */}
              <button className="hidden sm:flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors">
                <User className="w-5 h-5 text-foreground" />
                <span className="hidden lg:block text-sm font-medium">Account</span>
              </button>

              {/* Cart */}
              <button onClick={() => navigate('/cart')} className="relative p-2 hover:bg-muted rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu */}
              <button
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-4 py-4 space-y-3">
              <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
                <Heart className="w-5 h-5" /> Wishlist
              </button>
              <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
                <User className="w-5 h-5" /> Account
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ====== HERO BANNER ====== */}
      <section className="relative h-64 sm:h-96 md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&h=600&fit=crop"
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-md">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Summer Sale
              </h1>
              <p className="text-white/90 text-sm sm:text-base mb-6">
                Get up to 70% off on selected items. Limited time offer!
              </p>
              <button className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 active:scale-95">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====== MAIN CONTENT ====== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ====== CATEGORIES ====== */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Shop by Category</h2>
            <a href="#" className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* ====== FLASH DEALS ====== */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-destructive/10 to-accent/10 rounded-2xl p-6 sm:p-8 mb-8 border border-destructive/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-destructive animate-pulseGlow" />
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Flash Deals</h2>
              </div>
              <CountdownTimer endTime={flashDealEnd} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* ====== BEST SELLERS ====== */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Best Sellers</h2>
            </div>
            <a href="#" className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ====== NEW ARRIVALS ====== */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">New Arrivals</h2>
            <a href="#" className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(4, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ====== FEATURED BANNER ====== */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl overflow-hidden shadow-elevated">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Exclusive Member Deals
                </h2>
                <p className="text-primary-foreground/90 mb-6 text-lg">
                  Join our loyalty program and get exclusive discounts, early access to sales, and special rewards.
                </p>
                <button className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 active:scale-95">
                  Join Now
                </button>
              </div>
              <div className="hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&h=400&fit=crop"
                  alt="Exclusive Deals"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====== NEWSLETTER ====== */}
        <section className="mb-16">
          <div className="bg-muted rounded-2xl p-8 md:p-12 text-center">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Stay Updated</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Subscribe to our newsletter for exclusive deals, new arrivals, and insider tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 active:scale-95 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ====== FOOTER ====== */}
      <footer className="bg-foreground text-primary-foreground mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-accent w-8 h-8 rounded-lg flex items-center justify-center text-foreground font-bold">
                  🛍️
                </div>
                <h3 className="font-bold text-lg">MarketHub</h3>
              </div>
              <p className="text-primary-foreground/70 text-sm">
                Your trusted online marketplace for quality products and great deals.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Sitemap</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-primary-foreground/20 pt-8">
            <p className="text-center text-sm text-primary-foreground/70">
              © 2024 MarketHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ====== STICKY CART BUTTON (Mobile) ====== */}
      <button onClick={() => navigate('/cart')} className="md:hidden fixed bottom-6 right-6 bg-primary text-primary-foreground w-14 h-14 rounded-full shadow-elevated flex items-center justify-center font-bold text-lg hover:bg-opacity-90 transition-all duration-200 active:scale-95 z-30">
        {cartCount}
      </button>
    </div>
  );
}
