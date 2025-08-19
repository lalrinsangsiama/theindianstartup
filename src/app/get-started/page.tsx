'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { 
  CheckCircle, 
  ShoppingCart, 
  X, 
  Plus, 
  Minus,
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  Target,
  Shield,
  TrendingUp,
  Briefcase,
  Scale,
  DollarSign,
  MapPin,
  Database,
  Award,
  Megaphone,
  Lightbulb
} from 'lucide-react';

interface Product {
  code: string;
  title: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  duration: string;
  modules: number;
  category: string;
}

const products: Product[] = [
  {
    code: 'P1',
    title: '30-Day India Launch Sprint',
    description: 'Go from idea to incorporated startup with daily action plans',
    price: 4999,
    icon: <Target className="w-5 h-5" />,
    duration: '30 days',
    modules: 4,
    category: 'foundation'
  },
  {
    code: 'P2',
    title: 'Incorporation & Compliance Kit',
    description: 'Master Indian business incorporation with 150+ templates',
    price: 4999,
    icon: <Shield className="w-5 h-5" />,
    duration: '40 days',
    modules: 10,
    category: 'foundation'
  },
  {
    code: 'P3',
    title: 'Funding Mastery',
    description: 'Master the funding ecosystem from grants to VC',
    price: 5999,
    icon: <TrendingUp className="w-5 h-5" />,
    duration: '45 days',
    modules: 12,
    category: 'growth'
  },
  {
    code: 'P4',
    title: 'Finance Stack',
    description: 'Build world-class financial infrastructure',
    price: 6999,
    icon: <DollarSign className="w-5 h-5" />,
    duration: '45 days',
    modules: 12,
    category: 'growth'
  },
  {
    code: 'P5',
    title: 'Legal Stack',
    description: 'Bulletproof legal infrastructure with 300+ templates',
    price: 7999,
    icon: <Scale className="w-5 h-5" />,
    duration: '45 days',
    modules: 12,
    category: 'protection'
  },
  {
    code: 'P6',
    title: 'Sales & GTM',
    description: 'Transform into a revenue machine',
    price: 6999,
    icon: <Briefcase className="w-5 h-5" />,
    duration: '60 days',
    modules: 10,
    category: 'growth'
  },
  {
    code: 'P7',
    title: 'State Schemes Map',
    description: 'Master India\'s state ecosystem with 500+ schemes',
    price: 4999,
    icon: <MapPin className="w-5 h-5" />,
    duration: '30 days',
    modules: 10,
    category: 'foundation'
  },
  {
    code: 'P8',
    title: 'Data Room Mastery',
    description: 'Professional data room for fundraising',
    price: 9999,
    icon: <Database className="w-5 h-5" />,
    duration: '45 days',
    modules: 8,
    category: 'growth'
  },
  {
    code: 'P9',
    title: 'Government Schemes',
    description: 'Access ₹50L to ₹5Cr in government funding',
    price: 4999,
    icon: <Award className="w-5 h-5" />,
    duration: '21 days',
    modules: 4,
    category: 'foundation'
  },
  {
    code: 'P10',
    title: 'Patent Mastery',
    description: 'Master IP from filing to monetization',
    price: 7999,
    icon: <Lightbulb className="w-5 h-5" />,
    duration: '60 days',
    modules: 12,
    category: 'protection'
  },
  {
    code: 'P11',
    title: 'Branding & PR',
    description: 'Transform into industry leader',
    price: 7999,
    icon: <Megaphone className="w-5 h-5" />,
    duration: '54 days',
    modules: 12,
    category: 'growth'
  }
];

interface CartItem {
  product: Product;
  quantity: number;
}

export default function GetStartedPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check auth status
  useEffect(() => {
    const checkAuth = async () => {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // If logged in, redirect to pricing page
        router.push('/pricing');
      } else {
        setCheckingAuth(false);
      }
      setUser(user);
    };
    
    checkAuth();
  }, [router]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('preSignupCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('preSignupCart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('preSignupCart');
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.code === product.code);
      if (existing) {
        return prev.map(item => 
          item.product.code === product.code 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setShowCart(true);
  };

  const removeFromCart = (productCode: string) => {
    setCart(prev => prev.filter(item => item.product.code !== productCode));
  };

  const updateQuantity = (productCode: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productCode);
    } else {
      setCart(prev => prev.map(item => 
        item.product.code === productCode 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const discount = cart.length > 1 ? subtotal * 0.05 : 0; // 5% discount for multiple courses
    return {
      subtotal,
      discount,
      total: subtotal - discount
    };
  };

  const calculateAllAccessSavings = () => {
    const individualTotal = products.reduce((sum, p) => sum + p.price, 0);
    const allAccessPrice = 54999;
    return {
      individualTotal,
      allAccessPrice,
      savings: individualTotal - allAccessPrice,
      savingsPercent: Math.round(((individualTotal - allAccessPrice) / individualTotal) * 100)
    };
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      // Save early bird flag
      localStorage.setItem('earlyBirdPurchase', 'true');
      router.push('/signup');
    }
  };

  const handleSkipToSignup = () => {
    localStorage.removeItem('preSignupCart');
    localStorage.removeItem('earlyBirdPurchase');
    router.push('/signup');
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const { subtotal, discount, total } = calculateTotal();
  const { allAccessPrice, savings, savingsPercent } = calculateAllAccessSavings();

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <Text color="muted">Loading...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-black hover:opacity-80 transition-opacity">
              <Logo variant="full" className="h-8" />
            </Link>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCart(!showCart)}
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSkipToSignup}
              >
                Skip to Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="bg-green-100 text-green-700 mb-4">
            🎯 Early Bird Special - 5% Off Multiple Courses
          </Badge>
          <Heading as="h1" variant="h2" className="mb-4">
            Start Your Startup Journey Today
          </Heading>
          <Text size="lg" color="muted" className="max-w-2xl mx-auto mb-8">
            Choose the courses that match your needs, or get everything with our All-Access Bundle. 
            Build your startup portfolio as you learn - every activity creates your professional business profile.
          </Text>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Portfolio Builds Itself</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Investor-Ready Exports</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>5% Multi-Course Discount</span>
            </div>
          </div>
        </div>

        {/* All Access Bundle Highlight */}
        <div className="mb-8 p-6 bg-black text-white rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <Heading as="h3" variant="h4" className="text-white">
                  All-Access Bundle
                </Heading>
              </div>
              <Text className="text-gray-300 mb-3">
                Get all 11 courses and save {savingsPercent}%
              </Text>
              <div className="flex items-center gap-4">
                <Text className="text-3xl font-bold">
                  ₹{allAccessPrice.toLocaleString('en-IN')}
                </Text>
                <Badge className="bg-yellow-400 text-black">
                  Save ₹{savings.toLocaleString('en-IN')}
                </Badge>
              </div>
            </div>
            <Button
              variant="outline"
              className="bg-white text-black hover:bg-gray-100"
              onClick={() => {
                localStorage.setItem('preSignupCart', JSON.stringify([{
                  product: {
                    code: 'ALL_ACCESS',
                    title: 'All-Access Bundle',
                    description: 'Get all 11 courses',
                    price: allAccessPrice,
                    icon: <Sparkles className="w-5 h-5" />,
                    duration: '365 days',
                    modules: 100,
                    category: 'bundle'
                  },
                  quantity: 1
                }]));
                router.push('/signup');
              }}
            >
              Get All-Access Bundle
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button
            size="sm"
            variant={selectedCategory === 'all' ? 'primary' : 'outline'}
            onClick={() => setSelectedCategory('all')}
          >
            All Courses
          </Button>
          <Button
            size="sm"
            variant={selectedCategory === 'foundation' ? 'primary' : 'outline'}
            onClick={() => setSelectedCategory('foundation')}
          >
            Foundation
          </Button>
          <Button
            size="sm"
            variant={selectedCategory === 'growth' ? 'primary' : 'outline'}
            onClick={() => setSelectedCategory('growth')}
          >
            Growth
          </Button>
          <Button
            size="sm"
            variant={selectedCategory === 'protection' ? 'primary' : 'outline'}
            onClick={() => setSelectedCategory('protection')}
          >
            Protection
          </Button>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProducts.map((product) => {
            const inCart = cart.find(item => item.product.code === product.code);
            
            return (
              <Card key={product.code} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center">
                    {product.icon}
                  </div>
                  <Badge variant="outline">{product.code}</Badge>
                </div>
                
                <Heading as="h4" variant="h5" className="mb-2">
                  {product.title}
                </Heading>
                <Text size="sm" color="muted" className="mb-4">
                  {product.description}
                </Text>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{product.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{product.modules} modules</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Text className="text-xl font-bold">
                    ₹{product.price.toLocaleString('en-IN')}
                  </Text>
                  {inCart ? (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(product.code, inCart.quantity - 1)}
                        className="p-1"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{inCart.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(product.code, inCart.quantity + 1)}
                        className="p-1"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-96 bg-white border-l border-gray-200 transform transition-transform duration-300 z-50 ${
        showCart ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <Heading as="h3" variant="h5">Your Cart</Heading>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCart(false)}
              className="p-1"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <Text color="muted">Your cart is empty</Text>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.code} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Text weight="medium">{item.product.title}</Text>
                        <Text size="sm" color="muted">{item.product.code}</Text>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.product.code)}
                        className="p-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.product.code, item.quantity - 1)}
                          className="p-1"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.product.code, item.quantity + 1)}
                          className="p-1"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <Text weight="medium">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <Text color="muted">Subtotal</Text>
                  <Text>₹{subtotal.toLocaleString('en-IN')}</Text>
                </div>
                {cart.length > 1 && (
                  <div className="flex justify-between text-green-600">
                    <Text>Early Bird Discount (5%)</Text>
                    <Text>-₹{discount.toLocaleString('en-IN')}</Text>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <Text>Total</Text>
                  <Text>₹{total.toLocaleString('en-IN')}</Text>
                </div>
              </div>
              
              <Button
                variant="primary"
                className="w-full"
                onClick={handleCheckout}
              >
                Proceed to Sign Up
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Text size="xs" color="muted" className="text-center mt-2">
                You'll create your account before payment
              </Text>
            </div>
          )}
        </div>
      </div>

      {/* Cart Overlay */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowCart(false)}
        />
      )}

      {/* Sticky Bottom Bar */}
      {cart.length > 0 && !showCart && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <Text weight="medium">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} courses selected
              </Text>
              <Text size="sm" color="muted">
                Total: ₹{total.toLocaleString('en-IN')}
                {cart.length > 1 && <span className="text-green-600 ml-2">(5% off)</span>}
              </Text>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowCart(true)}
              >
                View Cart
              </Button>
              <Button
                variant="primary"
                onClick={handleCheckout}
              >
                Proceed to Sign Up
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}