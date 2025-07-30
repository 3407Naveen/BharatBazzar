import React from 'react';
import { X, MessageCircle, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareModalProps {
  product: any;
  onClose: () => void;
}

export function ShareModal({ product, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  
  const shareText = `🛍️ ${product.title}\n\n${product.description}\n\n💰 कीमत: ₹${product.price}\n\n📱 BharatBazzar से ऑर्डर करें:\n${product.shareableLink}`;

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const shareViaSMS = () => {
    const url = `sms:?body=${encodeURIComponent(shareText)}`;
    window.open(url);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareViaWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: shareText,
          url: product.shareableLink
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            उत्पाद साझा करें / Share Product
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Product Preview */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-bold text-gray-900 mb-2">{product.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-bold text-green-600">₹{product.price}</p>
        </div>

        {/* Share Options */}
        <div className="space-y-3">
          <button
            onClick={shareOnWhatsApp}
            className="w-full flex items-center space-x-3 bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-all"
          >
            <MessageCircle size={24} />
            <span className="font-medium">WhatsApp पर साझा करें</span>
          </button>

          <button
            onClick={shareViaSMS}
            className="w-full flex items-center space-x-3 bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-all"
          >
            <MessageCircle size={24} />
            <span className="font-medium">SMS से भेजें</span>
          </button>

          {navigator.share && (
            <button
              onClick={shareViaWebShare}
              className="w-full flex items-center space-x-3 bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-all"
            >
              <Share2 size={24} />
              <span className="font-medium">अन्य ऐप्स में साझा करें</span>
            </button>
          )}

          <button
            onClick={copyToClipboard}
            className="w-full flex items-center space-x-3 border-2 border-gray-300 p-4 rounded-lg hover:bg-gray-50 transition-all"
          >
            {copied ? <Check size={24} className="text-green-500" /> : <Copy size={24} />}
            <span className="font-medium">
              {copied ? 'कॉपी हो गया!' : 'टेक्स्ट कॉपी करें'}
            </span>
          </button>
        </div>

        {/* Share Text Preview */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">साझा करने का टेक्स्ट:</p>
          <p className="text-xs text-gray-800 whitespace-pre-line">
            {shareText}
          </p>
        </div>
      </div>
    </div>
  );
}