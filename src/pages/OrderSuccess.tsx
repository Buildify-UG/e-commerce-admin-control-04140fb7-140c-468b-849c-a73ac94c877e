import React from 'react';
import { CheckCircle, Download, Package, Truck, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button onClick={() => navigate('/')} className="text-2xl font-bold text-primary">
            MarketHub
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-16">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-success bg-opacity-20 rounded-full blur-lg animate-pulse" />
              <CheckCircle size={80} className="text-success relative" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground">Thank you for your purchase</p>
        </div>

        {/* Order Details */}
        <div className="bg-white border border-border rounded-lg p-8 mb-8">
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order Number</p>
              <p className="text-2xl font-bold text-foreground">#ORD-2024-001234</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order Date</p>
              <p className="text-2xl font-bold text-foreground">Jan 15, 2024</p>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <h2 className="font-bold text-lg mb-4">Order Items</h2>
            <div className="space-y-4">
              {[
                { name: 'Premium Wireless Headphones', qty: 1, price: 45999 },
                { name: 'Luxury Leather Handbag', qty: 1, price: 28999 },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center pb-4 border-b border-border last:border-b-0">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
                  </div>
                  <p className="font-bold text-primary">₦{item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">₦74,998</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-success">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-semibold">₦3,000</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-bold bg-muted p-4 rounded-lg">
              <span>Total Amount</span>
              <span className="text-primary">₦77,998</span>
            </div>
          </div>
        </div>

        {/* Delivery Timeline */}
        <div className="bg-white border border-border rounded-lg p-8 mb-8">
          <h2 className="font-bold text-lg mb-6">Delivery Timeline</h2>
          <div className="space-y-6">
            {[
              { icon: CheckCircle, title: 'Order Placed', desc: 'Jan 15, 2024 - 2:30 PM', status: 'complete' },
              { icon: Package, title: 'Processing', desc: 'Your order is being prepared', status: 'active' },
              { icon: Truck, title: 'Shipped', desc: 'Expected Jan 17, 2024', status: 'pending' },
              { icon: Home, title: 'Delivered', desc: 'Expected Jan 19, 2024', status: 'pending' },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <Icon
                      size={32}
                      className={
                        step.status === 'complete'
                          ? 'text-success'
                          : step.status === 'active'
                            ? 'text-primary'
                            : 'text-muted-foreground'
                      }
                    />
                    {idx < 3 && (
                      <div
                        className={`w-1 h-12 my-2 ${
                          step.status === 'complete' ? 'bg-success' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                  <div className="pt-1">
                    <p className="font-semibold text-foreground">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white border border-border rounded-lg p-8 mb-8">
          <h2 className="font-bold text-lg mb-4">Delivery Address</h2>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-muted-foreground mt-1">
              123 Main Street<br />
              Lagos, Lagos 100001<br />
              Nigeria<br />
              +234 801 234 5678
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90"
          >
            Continue Shopping
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted">
            <Download size={18} />
            Download Invoice
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted">
            Track Order
          </button>
        </div>

        {/* Support */}
        <div className="mt-12 bg-accent bg-opacity-10 border border-accent rounded-lg p-6 text-center">
          <p className="text-foreground mb-2">Need help? We're here to support you!</p>
          <p className="text-sm text-muted-foreground">
            Contact our customer support team at <span className="font-semibold">support@markethub.com</span> or call <span className="font-semibold">+234 700 000 0000</span>
          </p>
        </div>
      </main>
    </div>
  );
}
