import React, { useState } from 'react';
import { MapPin, Truck, CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    shippingMethod: 'standard',
    paymentMethod: 'card',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    navigate('/order-success');
  };

  const total = 77998;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate('/cart')} className="text-2xl font-bold text-primary">
            MarketHub
          </button>
          <h1 className="text-xl font-bold ml-8">Checkout</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="flex gap-4 mb-8">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className="flex items-center">
                  <button
                    onClick={() => setStep(s)}
                    className={`w-10 h-10 rounded-full font-bold flex items-center justify-center ${
                      s <= step
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {s < step ? '✓' : s}
                  </button>
                  {s < 4 && <div className={`h-1 w-8 mx-2 ${s < step ? 'bg-primary' : 'bg-muted'}`} />}
                </div>
              ))}
            </div>

            {/* Step 1: Customer Info */}
            {step === 1 && (
              <div className="bg-white border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="+234 801 234 5678"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Address */}
            {step === 2 && (
              <div className="bg-white border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MapPin size={24} className="text-primary" />
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Lagos"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Lagos"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="100001"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Shipping Method */}
            {step === 3 && (
              <div className="bg-white border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Truck size={24} className="text-primary" />
                  Delivery Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'standard', name: 'Standard Delivery', desc: '3-5 business days', price: '₦2,000' },
                    { id: 'express', name: 'Express Delivery', desc: '1-2 business days', price: '₦5,000' },
                    { id: 'same-day', name: 'Same Day Delivery', desc: 'Available in Lagos', price: '₦8,000' },
                  ].map(method => (
                    <label key={method.id} className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={method.id}
                        checked={formData.shippingMethod === method.id}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <div className="ml-4 flex-1">
                        <p className="font-semibold">{method.name}</p>
                        <p className="text-sm text-muted-foreground">{method.desc}</p>
                      </div>
                      <p className="font-semibold text-primary">{method.price}</p>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Payment Method */}
            {step === 4 && (
              <div className="bg-white border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard size={24} className="text-primary" />
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: 'card', name: 'Credit/Debit Card', desc: 'Visa, Mastercard, Verve' },
                    { id: 'bank', name: 'Bank Transfer', desc: 'Direct bank transfer' },
                    { id: 'wallet', name: 'Wallet', desc: 'Use your MarketHub wallet' },
                    { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when you receive' },
                  ].map(method => (
                    <label key={method.id} className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <div className="ml-4">
                        <p className="font-semibold">{method.name}</p>
                        <p className="text-sm text-muted-foreground">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handlePrevious}
                disabled={step === 1}
                className="flex-1 border border-border text-foreground py-3 rounded-lg font-semibold hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Previous
              </button>
              <button
                onClick={step === 4 ? handleSubmit : handleNext}
                className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-opacity-90"
              >
                {step === 4 ? 'Place Order' : 'Next'}
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-border rounded-lg p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span>2 items</span>
                  <span className="font-semibold">₦74,998</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="font-semibold text-success">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span className="font-semibold">₦3,000</span>
                </div>
              </div>
              <div className="flex justify-between mb-6">
                <span className="font-bold">Total</span>
                <span className="font-bold text-2xl text-primary">₦{total.toLocaleString()}</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-2">
                <p>✓ Secure checkout</p>
                <p>✓ Money-back guarantee</p>
                <p>✓ 24/7 support</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
