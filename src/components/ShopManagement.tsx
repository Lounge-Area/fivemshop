import React, { useState, useEffect } from 'react';
import { Shop } from '../types/product';
import { ProductService } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import { Edit, Trash2, Plus, Store, AlertCircle, MapPin, Clock, User } from 'lucide-react';

interface ShopManagementProps {
  onEditShop?: (shop: Shop) => void;
}

export const ShopManagement: React.FC<ShopManagementProps> = ({ onEditShop }) => {
  const { user } = useAuth();
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      setLoading(true);
      setError(null);
      const shopsData = await ProductService.getShops();
      setShops(shopsData);
    } catch (err) {
      console.error('Error loading shops:', err);
      setError(err instanceof Error ? err.message : 'Failed to load shops');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShop = async (shopId: string) => {
    if (!confirm('Are you sure you want to delete this shop? This will also delete all products in this shop.')) {
      return;
    }

    try {
      setDeletingId(shopId);
      await ProductService.deleteShop(shopId);
      setShops(shops.filter(s => s.id !== shopId));
    } catch (err) {
      console.error('Error deleting shop:', err);
      alert('Failed to delete shop. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddShop = () => {
    setEditingShop(null);
    setShowForm(true);
  };

  const handleEditShop = (shop: Shop) => {
    setEditingShop(shop);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingShop(null);
    loadShops(); // Refresh the list
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading shops...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Shops</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={loadShops}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (showForm) {
    return (
      <ShopForm
        shop={editingShop}
        onSave={handleCloseForm}
        onCancel={handleCloseForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Shop Management</h2>
        <button
          onClick={handleAddShop}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Shop</span>
        </button>
      </div>

      {shops.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Store className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Shops Found</h3>
          <p className="text-gray-600">Start by adding your first shop to the system.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <div key={shop.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Store className="w-8 h-8 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    shop.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {shop.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{shop.description}</p>
                
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{shop.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{shop.opening_hours}</span>
                  </div>
                  {shop.owner_id && (
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Owner: {shop.owner_id}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => handleEditShop(shop)}
                    className="text-blue-600 hover:text-blue-900 p-2 rounded transition-colors"
                    title="Edit shop"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteShop(shop.id)}
                    disabled={deletingId === shop.id}
                    className="text-red-600 hover:text-red-900 p-2 rounded transition-colors disabled:opacity-50"
                    title="Delete shop"
                  >
                    {deletingId === shop.id ? (
                      <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Shop Form Component
interface ShopFormProps {
  shop?: Shop | null;
  onSave: () => void;
  onCancel: () => void;
}

const ShopForm: React.FC<ShopFormProps> = ({ shop, onSave, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    opening_hours: '24/7',
    owner_id: '',
    is_active: true
  });

  useEffect(() => {
    if (shop) {
      setFormData({
        name: shop.name,
        description: shop.description,
        location: shop.location,
        opening_hours: shop.opening_hours,
        owner_id: shop.owner_id || '',
        is_active: shop.is_active
      });
    }
  }, [shop]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const shopData = {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        opening_hours: formData.opening_hours,
        owner_id: formData.owner_id || null,
        is_active: formData.is_active
      };

      if (shop) {
        await ProductService.updateShop(shop.id, shopData);
      } else {
        await ProductService.createShop(shopData);
      }

      onSave();
    } catch (err) {
      console.error('Error saving shop:', err);
      setError(err instanceof Error ? err.message : 'Failed to save shop');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {shop ? 'Edit Shop' : 'Add New Shop'}
        </h2>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Shop Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              placeholder="Enter shop name"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              placeholder="Enter location"
            />
          </div>

          <div>
            <label htmlFor="opening_hours" className="block text-sm font-medium text-gray-700 mb-2">
              Opening Hours *
            </label>
            <input
              type="text"
              id="opening_hours"
              name="opening_hours"
              required
              value={formData.opening_hours}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              placeholder="e.g., 9:00 AM - 10:00 PM"
            />
          </div>

          <div>
            <label htmlFor="owner_id" className="block text-sm font-medium text-gray-700 mb-2">
              Owner ID (Optional)
            </label>
            <input
              type="text"
              id="owner_id"
              name="owner_id"
              value={formData.owner_id}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              placeholder="Enter owner user ID"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            placeholder="Enter shop description"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={formData.is_active}
            onChange={handleInputChange}
            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <label htmlFor="is_active" className="ml-2 text-sm font-medium text-gray-700">
            Shop is active
          </label>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Shop'}
          </button>
        </div>
      </form>
    </div>
  );
};