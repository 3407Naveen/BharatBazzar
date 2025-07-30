import React, { useEffect, useRef } from 'react';
import { X, Download } from 'lucide-react';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  product: any;
  onClose: () => void;
}

export function QRCodeDisplay({ product, onClose }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const paymentUrl = `upi://pay?pa=merchant@paytm&pn=BharatBazzar&am=${product.price}&tn=Payment for ${product.title}`;
      
      QRCode.toCanvas(canvasRef.current, paymentUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    }
  }, [product]);

  const downloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `${product.title}-qr-code.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Payment QR Code
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="text-center">
          <div className="bg-gray-50 p-6 rounded-xl mb-4">
            <canvas ref={canvasRef} className="mx-auto" />
          </div>
          
          <div className="mb-6">
            <h4 className="font-bold text-gray-900 mb-2">{product.title}</h4>
            <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
            <p className="text-sm text-gray-600 mt-2">
              ग्राहक इस QR कोड को स्कैन करके भुगतान कर सकते हैं
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={downloadQR}
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all"
            >
              <Download size={18} />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}