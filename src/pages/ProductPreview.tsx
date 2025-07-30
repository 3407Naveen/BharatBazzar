import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Share2, Edit3, QrCode, IndianRupee, Tag, Package, Palette } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { QRCodeDisplay } from '../components/QRCodeDisplay';
import { ShareModal } from '../components/ShareModal';

export function ProductPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentProduct, addProduct, getProductById, clearCurrentProduct } = useProducts();
  const [showQR, setShowQR] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(currentProduct || {});

  const product = id === 'new' ? currentProduct : getProductById(id!);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">उत्पाद नहीं मिला / Product Not Found</h2>
          <button
            onClick={() => navigate('/create')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            नया उत्पाद बनाएं / Create New Product
          </button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (id === 'new' && currentProduct) {
      const newProduct = {
        ...currentProduct,
        id: Date.now().toString(),
        shareableLink: `${window.location.origin}/product/${Date.now()}`
      } as any;
      
      addProduct(newProduct);
      clearCurrentProduct();
      navigate('/dashboard');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProduct(product);
  };

  const handleSaveEdit = () => {
    // In a real app, this would update the product in the database
    setIsEditing(false);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const productData = isEditing ? editedProduct : product;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              उत्पाद पूर्वावलोकन / Product Preview
            </h1>
            <p className="text-gray-600">
              {id === 'new' ? 'अपने उत्पाद की जानकारी देखें और सेव करें' : 'अपने उत्पाद का विवरण देखें'}
            </p>
          </div>
          
          <div className="flex space-x-3 mt-4 sm:mt-0">
            {id === 'new' ? (
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all"
              >
                <Save size={20} />
                <span>सेव करें / Save</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleEdit}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  <Edit3 size={18} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                >
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Card */}
          <div className="product-card bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Product Image Placeholder */}
            <div className="h-64 bg-gradient-to-br from-orange-100 to-green-100 flex items-center justify-center">
              <div className="text-center">
                <Package size={64} className="text-orange-500 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">उत्पाद की फोटो / Product Image</p>
                <p className="text-sm text-gray-500 mt-2">जल्द ही फोटो अपलोड करने की सुविधा</p>
              </div>
            </div>

            <div className="p-6">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editedProduct.title || ''}
                    onChange={(e) => setEditedProduct({...editedProduct, title: e.target.value})}
                    className="w-full text-xl font-bold p-2 border rounded-lg"
                    placeholder="Product Title"
                  />
                  <textarea
                    value={editedProduct.description || ''}
                    onChange={(e) => setEditedProduct({...editedProduct, description: e.target.value})}
                    className="w-full p-2 border rounded-lg resize-none"
                    rows={3}
                    placeholder="Product Description"
                  />
                  <input
                    type="number"
                    value={editedProduct.price || 0}
                    onChange={(e) => setEditedProduct({...editedProduct, price: parseInt(e.target.value)})}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Price"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {productData.title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {productData.description}
                  </p>
                  <div className="flex items-center space-x-2 mb-4">
                    <IndianRupee size={24} className="text-green-600" />
                    <span className="text-3xl font-bold text-green-600">
                      {productData.price}
                    </span>
                  </div>
                </>
              )}

              {/* Product Attributes */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {productData.attributes?.color && (
                  <div className="flex items-center space-x-2">
                    <Palette size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {productData.attributes.color}
                    </span>
                  </div>
                )}
                {productData.attributes?.size && (
                  <div className="flex items-center space-x-2">
                    <Package size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {productData.attributes.size}
                    </span>
                  </div>
                )}
                {productData.category && (
                  <div className="flex items-center space-x-2 col-span-2">
                    <Tag size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {productData.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {productData.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {productData.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {isEditing ? (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowQR(true)}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  <QrCode size={20} />
                  <span>QR कोड देखें / View QR Code</span>
                </button>
              )}
            </div>
          </div>

          {/* Voice Transcript & Details */}
          <div className="space-y-6">
            {/* Voice Transcript */}
            {productData.voiceTranscript && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span>आपकी आवाज़ / Your Voice Input</span>
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed">
                    "{productData.voiceTranscript}"
                  </p>
                </div>
              </div>
            )}

            {/* AI Extraction Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">AI</span>
                </div>
                <span>AI द्वारा निकाली गई जानकारी</span>
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <p className="font-medium text-gray-900">{productData.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Price</p>
                    <p className="font-medium text-green-600">₹{productData.price}</p>
                  </div>
                </div>
                
                {productData.attributes && Object.keys(productData.attributes).length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Attributes</p>
                    <div className="space-y-1">
                      {Object.entries(productData.attributes).map(([key, value]) => (
                        value && (
                          <div key={key} className="flex justify-between">
                            <span className="text-sm text-gray-600 capitalize">{key}:</span>
                            <span className="text-sm font-medium text-gray-900">{value}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-orange-500 to-green-500 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">त्वरित कार्य / Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleShare}
                  className="w-full bg-white bg-opacity-20 backdrop-blur-sm py-3 rounded-lg hover:bg-opacity-30 transition-all"
                >
                  WhatsApp पर साझा करें / Share on WhatsApp
                </button>
                <button className="w-full bg-white bg-opacity-20 backdrop-blur-sm py-3 rounded-lg hover:bg-opacity-30 transition-all">
                  SMS से भेजें / Send via SMS
                </button>
                <button className="w-full bg-white bg-opacity-20 backdrop-blur-sm py-3 rounded-lg hover:bg-opacity-30 transition-all">
                  लिंक कॉपी करें / Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <QRCodeDisplay
          product={productData}
          onClose={() => setShowQR(false)}
        />
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          product={productData}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}