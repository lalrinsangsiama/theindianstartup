'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Input } from '@/components/ui';
import { Textarea } from '@/components/ui';
import { Badge } from '@/components/ui';
import { 
  Edit, 
  Plus, 
  Trash2, 
  Save,
  BookOpen,
  Calendar,
  DollarSign,
  Users
} from 'lucide-react';
import { Modal } from '@/components/ui';

interface Product {
  id: string;
  code: string;
  title: string;
  description: string;
  price: number;
  estimatedDays?: number;
  isBundle: boolean;
  bundleProducts?: string[];
  _count?: {
    modules: number;
    purchases: number;
  };
}

interface ProductForm {
  code: string;
  title: string;
  description: string;
  price: number;
  estimatedDays?: number;
  isBundle: boolean;
  bundleProducts?: string[];
}

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<ProductForm>({
    code: '',
    title: '',
    description: '',
    price: 0,
    estimatedDays: 30,
    isBundle: false,
    bundleProducts: []
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      logger.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setProductForm({
      code: '',
      title: '',
      description: '',
      price: 0,
      estimatedDays: 30,
      isBundle: false,
      bundleProducts: []
    });
    setShowProductModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      code: product.code,
      title: product.title,
      description: product.description,
      price: product.price,
      estimatedDays: product.estimatedDays,
      isBundle: product.isBundle,
      bundleProducts: product.bundleProducts || []
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = async () => {
    try {
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products';
      
      const method = editingProduct ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm)
      });
      
      if (response.ok) {
        await fetchProducts();
        setShowProductModal(false);
      }
    } catch (error) {
      logger.error('Failed to save product:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product? This will also delete all associated modules and lessons.')) return;
    
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchProducts();
      }
    } catch (error) {
      logger.error('Failed to delete product:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Product Management</CardTitle>
            <Button onClick={handleCreateProduct}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="relative">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant={product.isBundle ? 'default' : 'outline'} className="mb-2">
                        {product.code}
                      </Badge>
                      <CardTitle className="text-lg">{product.title}</CardTitle>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {product.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span>₹{(product.price / 100).toLocaleString()}</span>
                    </div>
                    {product.estimatedDays && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{product.estimatedDays} days</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span>{product._count?.modules || 0} modules</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{product._count?.purchases || 0} sales</span>
                    </div>
                  </div>

                  {product.isBundle && product.bundleProducts && (
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1">INCLUDES:</div>
                      <div className="flex flex-wrap gap-1">
                        {product.bundleProducts.map((code) => (
                          <Badge key={code} variant="outline" className="text-xs">
                            {code}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Form Modal */}
      {showProductModal && (
        <Modal
          isOpen={showProductModal}
          onClose={() => setShowProductModal(false)}
          className="max-w-4xl"
        >
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Create Product'}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Product Code</label>
                <Input
                  value={productForm.code}
                  onChange={(e) => setProductForm({ ...productForm, code: e.target.value })}
                  placeholder="P1, P2, ALL_ACCESS, etc."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Price (₹)</label>
                <Input
                  type="number"
                  value={productForm.price / 100}
                  onChange={(e) => setProductForm({ 
                    ...productForm, 
                    price: parseInt(e.target.value) * 100 
                  })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={productForm.title}
                onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                placeholder="30-Day India Launch Sprint"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                placeholder="Detailed product description..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Estimated Days</label>
                <Input
                  type="number"
                  value={productForm.estimatedDays || ''}
                  onChange={(e) => setProductForm({ 
                    ...productForm, 
                    estimatedDays: e.target.value ? parseInt(e.target.value) : undefined 
                  })}
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="isBundle"
                  checked={productForm.isBundle}
                  onChange={(e) => setProductForm({ ...productForm, isBundle: e.target.checked })}
                />
                <label htmlFor="isBundle" className="text-sm font-medium">
                  Is Bundle Product
                </label>
              </div>
            </div>

            {productForm.isBundle && (
              <div>
                <label className="text-sm font-medium">Bundle Products (comma-separated)</label>
                <Input
                  value={(productForm.bundleProducts || []).join(', ')}
                  onChange={(e) => setProductForm({
                    ...productForm,
                    bundleProducts: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="P1, P2, P3, P4..."
                />
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={handleSaveProduct} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                {editingProduct ? 'Update Product' : 'Create Product'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowProductModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}