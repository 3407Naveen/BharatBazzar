import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Eye, Share2, QrCode, Trash2, TrendingUp, Package, IndianRupee } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export function Dashboard() {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'सभी / All' },
    { value: 'कपड़े / Clothing', label: 'कपड़े / Clothing' },
    { value: 'गहने / Jewelry', label: 'गहने / Jewelry' },
    { value: 'खाना / Food', label: 'खाना / Food' },
    { value: 'सब्जी / Vegetables', label: 'सब्जी / Vegetables' },
    { value: 'फल / Fruits', label: 'फल / Fruits' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalRevenue = products.reduce((sum, product) => sum + product.price, 0);
  const avgPrice = products.length > 0 ? Math.round(totalRevenue / products.length) : 0;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              डैशबोर्ड / Dashboard
            </h1>
            <p className="text-gray-600">
              अपने सभी उत्पादों को देखें और मैनेज करें
            </p>
          </div>
          
          <Link
            to="/create"
            className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-green-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-green-600 transition-all mt-4 sm:mt-0"
          >
            <Plus size={20} />
            <span>नया उत्पाद / New Product</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">कुल उत्पाद / Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <IndianRupee size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">कुल मूल्य / Total Value</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">औसत कीमत / Avg Price</p>
                <p className="text-2xl font-bold text-gray-900">₹{avgPrice}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="उत्पाद खोजें / Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Package size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {products.length === 0 ? 'कोई उत्पाद नहीं मिला' : 'खोज में कुछ नहीं मिला'}
            </h3>
            <p className="text-gray-600 mb-6">
              {products.length === 0 
                ? 'अपना पहला उत्पाद जोड़ने के लिए नीचे दिए गए बटन पर क्लिक करें'
                : 'अपनी खोज को बदलकर दोबारा कोशिश करें'
              }
            </p>
            {products.length === 0 && (
              <Link
                to="/create"
                className="inline-flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all"
              >
                <Plus size={20} />
                <span>पहला उत्पाद जोड़ें</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Product Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-orange-100 to-green-100 flex items-center justify-center">
                  <Package size={48} className="text-orange-500" />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                      {product.title}
                    </h3>
                    <span className="text-xl font-bold text-green-600 ml-2">
                      ₹{product.price}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                      {product.category}
                    </span>
                    {product.attributes?.color && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {product.attributes.color}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link
                      to={`/preview/${product.id}`}
                      className="flex-1 flex items-center justify-center space-x-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all text-sm"
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </Link>
                    
                    <button className="flex items-center justify-center p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
                      <Share2 size={16} />
                    </button>
                    
                    <button className="flex items-center justify-center p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all">
                      <QrCode size={16} />
                    </button>
                  </div>
                </div>

                <div className="px-6 pb-4">
                  <p className="text-xs text-gray-500">
                    Created: {new Date(product.createdAt).toLocaleDateString('hi-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}