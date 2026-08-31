import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample cart data
const initialCartItems = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 45999,
    originalPrice: 65999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    seller: 'TechHub Store',
  },
  {
    id: 2,
    name: 'Luxury Leather Handbag',
    price: 28999,
    originalPrice: 42999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop',
    seller: 'Fashion Elite',
  },
];

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? Math.floor(subtotal * 0.1) : 0;
  const shipping = subtotal > 50000 ? 0 : 2000;
  const tax = Math.floor((subtotal - discount) * 0.075);
  const total = subtotal - discount + shipping + tax;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setAppliedCoupon('SAVE10');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-2xl font-bold text-primary">
            MarketHub
          </button>
          <h1 className="text-xl font-bold">Shopping Cart</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-border rounded-lg overflow-hidden">
                {cartItems.map((item, idx) => (
                  <div key={item.id} className={`p-4 border-b border-border last:border-b-0 ${idx % 2 === 0 ? 'bg-muted' : ''}`}>
                    <div className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">by {item.seller}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div>
                            <p className="font-bold text-primary">₦{item.price.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground line-through">₦{item.originalPrice.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-border rounded">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="px-2 py-1 hover:bg-background"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-3 py-1 border-l border-r border-border">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="px-2 py-1 hover:bg-background"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-2 text-destructive hover:bg-destructive hover:bg-opacity-10 rounded"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="mt-6 bg-accent bg-opacity-10 border border-accent rounded-lg p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code (try: SAVE10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-lg"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-sm text-success mt-2">✓ Coupon {appliedCoupon} applied! 10% discount</p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4 pb-4 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-success">Discount (10%)</span>
                      <span className="font-semibold text-success">-₦{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={`font-semibold ${shipping === 0 ? 'text-success' : ''}`}>
                      {shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-semibold">₦{tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-primary">₦{total.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-opacity-90 mb-3"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="w-full border border-border text-foreground py-3 rounded-lg font-semibold hover:bg-muted flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={18} />
                  Continue Shopping
                </button>

                {/* Shipping Info */}
                <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground space-y-2">
                  <p>✓ Free shipping on orders above ₦50,000</p>
                  <p>✓ 30-day money-back guarantee</p>
                  <p>✓ Secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
