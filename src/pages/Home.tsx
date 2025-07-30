import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, Smartphone, Globe, Users, Zap, Shield } from 'lucide-react';

export function Home() {
  const features = [
    {
      icon: Mic,
      title: 'आवाज़ से बेचें / Voice Selling',
      description: 'अपनी आवाज़ में उत्पाद की जानकारी दें, हम बाकी संभाल लेंगे'
    },
    {
      icon: Smartphone,
      title: 'आसान उपयोग / Easy to Use',
      description: 'सिर्फ़ बोलें, हमारा AI आपके उत्पाद की सारी जानकारी निकाल देगा'
    },
    {
      icon: Globe,
      title: 'ऑनलाइन पहुंच / Online Reach',
      description: 'अपने उत्पादों को WhatsApp और SMS से साझा करें'
    },
    {
      icon: Users,
      title: 'ग्रामीण विक्रेता / Rural Vendors',
      description: 'गांव के विक्रेताओं के लिए विशेष रूप से डिज़ाइन किया गया'
    },
    {
      icon: Zap,
      title: 'त्वरित भुगतान / Quick Payment',
      description: 'UPI और QR कोड से तुरंत पैसे लें'
    },
    {
      icon: Shield,
      title: 'ऑफलाइन काम / Offline Support',
      description: 'इंटरनेट न हो तो भी काम करता है'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-green-500 to-blue-500 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="block">BharatBazzar</span>
              <span className="block text-3xl md:text-4xl font-medium mt-2 opacity-90">
                भारत बाज़ार
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              आवाज़ से बेचें, डिजिटल बनें
            </p>
            <p className="text-lg md:text-xl mb-8 opacity-80">
              Sell with Voice, Go Digital
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/create"
                className="flex items-center space-x-3 bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                <Mic size={24} />
                <span>अभी शुरू करें / Start Now</span>
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center space-x-3 border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-orange-600 transition-all"
              >
                <span>डैशबोर्ड देखें / View Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              विशेषताएं / Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ग्रामीण विक्रेताओं के लिए डिज़ाइन किया गया, आवाज़ की शक्ति के साथ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-orange-50 to-green-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-green-500 rounded-2xl flex items-center justify-center mb-6">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              कैसे काम करता है / How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              तीन आसान चरणों में अपने उत्पाद ऑनलाइन बेचना शुरू करें
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                बोलें / Speak
              </h3>
              <p className="text-gray-600">
                माइक दबाएं और अपने उत्पाद के बारे में बताएं - नाम, कीमत, रंग, साइज़
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                देखें / Review
              </h3>
              <p className="text-gray-600">
                हमारा AI आपकी बात को समझकर उत्पाद की जानकारी तैयार करेगा
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                साझा करें / Share
              </h3>
              <p className="text-gray-600">
                WhatsApp या SMS से अपने ग्राहकों के साथ उत्पाद साझा करें
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            आज ही शुरू करें / Start Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            अपने उत्पादों को डिजिटल तरीके से बेचना शुरू करें
          </p>
          <Link
            to="/create"
            className="inline-flex items-center space-x-3 bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            <Mic size={24} />
            <span>पहला उत्पाद जोड़ें / Add First Product</span>
          </Link>
        </div>
      </section>
    </div>
  );
}