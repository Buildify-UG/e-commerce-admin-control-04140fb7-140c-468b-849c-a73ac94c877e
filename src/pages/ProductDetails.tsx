import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Share2, ChevronDown } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

// Sample product data
const allProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 45999,
    originalPrice: 65999,
    rating: 4.8,
    reviews: 324,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    seller: 'TechHub Store',
    stock: 12,
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day wear.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop',
    ],
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Warranty': '2 years',
      'Color': 'Black, White, Blue',
    },
    shipping: 'Free shipping on orders above ₦50,000',
    returns: '30-day money-back guarantee',
  },
  {
    id: 2,
    name: 'Luxury Leather Handbag',
    price: 28999,
    originalPrice: 42999,
    rating: 4.6,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop',
    seller: 'Fashion Elite',
    stock: 5,
    description: 'Elegant leather handbag crafted from premium Italian leather. Perfect for work or casual outings with multiple compartments for organization.',
    specifications: {
      'Material': 'Genuine Leather',
      'Dimensions': '35 x 28 x 12 cm',
      'Weight': '800g',
      'Warranty': '1 year',
    },
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = allProducts.find(p => p.id === parseInt(id || '1')) || allProducts[0];
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-2xl font-bold text-primary">
            MarketHub
          </button>
          <button onClick={() => navigate('/cart')} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-opacity-90">
            <ShoppingCart size={20} />
            Cart
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-muted rounded-lg overflow-hidden mb-4">
              <img src={product.images?.[selectedImage] || product.image} alt={product.name} className="w-full h-96 object-cover" />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {(product.images || [product.image]).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${selectedImage === idx ? 'border-primary' : 'border-border'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-muted p-4 rounded-lg mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
                <span className="text-xl text-muted-foreground line-through">₦{product.originalPrice.toLocaleString()}</span>
                <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm font-semibold">-{discount}%</span>
              </div>
              <p className="text-sm text-success font-semibold">Save ₦{(product.originalPrice - product.price).toLocaleString()}</p>
            </div>

            {/* Seller & Stock */}
            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-sm text-muted-foreground mb-2">Sold by: <span className="font-semibold text-foreground">{product.seller}</span></p>
              <p className={`text-sm font-semibold ${product.stock > 5 ? 'text-success' : product.stock > 0 ? 'text-warning' : 'text-destructive'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            </div>

            {/* Quantity & Actions */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3">Quantity</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-muted">−</button>
                  <span className="px-4 py-2 border-l border-r border-border">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-muted">+</button>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-opacity-90 flex items-center justify-center gap-2">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`px-4 py-3 rounded-lg border-2 font-semibold ${isWishlisted ? 'border-destructive bg-destructive bg-opacity-10 text-destructive' : 'border-border text-foreground hover:border-primary'}`}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3 bg-muted p-4 rounded-lg">
              <div className="flex gap-3">
                <Truck className="text-primary flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-sm">{product.shipping}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Shield className="text-success flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-sm">{product.returns}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <RotateCcw className="text-warning flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-sm">Easy returns and exchanges</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Specifications</h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {Object.entries(product.specifications || {}).map(([key, value], idx) => (
                <div key={idx} className={`flex border-b border-border last:border-b-0 ${idx % 2 === 0 ? 'bg-muted' : ''}`}>
                  <div className="w-1/3 px-4 py-3 font-semibold text-sm">{key}</div>
                  <div className="w-2/3 px-4 py-3 text-sm text-muted-foreground">{value}</div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-xl font-bold mb-4">Related Products</h2>
            <div className="space-y-3">
              {allProducts.filter(p => p.id !== product.id).slice(0, 3).map(p => (
                <button
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="w-full text-left bg-card border border-border rounded-lg p-3 hover:border-primary transition"
                >
                  <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded mb-2" />
                  <p className="font-semibold text-sm line-clamp-2">{p.name}</p>
                  <p className="text-primary font-bold text-sm">₦{p.price.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
