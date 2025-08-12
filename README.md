# Bharat Bazar – Voice2Catalog for Rural Vendors

**Bharat Bazar** is an AI-powered, voice-first, mobile-friendly, and offline-ready web application that enables rural and digitally disadvantaged vendors to create and share digital product listings **using just their voice** in regional languages like **Hindi, Tamil, and English**.

---

## 🌟 Features

- **🎙️ Voice-First Interface**
  - Record product details in local languages (Hindi, Tamil, English).
  - Real-time transcription using **OpenAI Whisper API** or **Web Speech API**.
  
- **🤖 AI-Powered NLP Extraction**
  - Auto-extracts **title, price, attributes** (color, size, quantity).
  - Generates **customer-friendly descriptions**.
  - Suggests **3–5 relevant tags**.
  - Classifies product category automatically.

- **📱 Responsive & Mobile-Friendly**
  - Built with **React/Next.js** and **Tailwind CSS**.
  - Works seamlessly on smartphones, tablets, and desktops.

- **💾 Offline-First with PWA**
  - Works in low or no internet connectivity areas.
  - Installable web app via **“Download App”** button.
  - All key features work offline.

- **🛍️ Product Management**
  - Live **Product Preview Card** before saving.
  - Dashboard to view, edit, and manage saved products.

- **💳 Payment Integration**
  - Integrated **UPI** and **Razorpay** gateways.
  - Auto-generate **QR code** for each product.
  - One-click payment link sharing.

- **📤 Easy Sharing**
  - Share products via **WhatsApp** or **SMS** with product links.

---

## 🖼️ Pages Overview

1. **Home Page** – Introduction + "Start Voice Input" button.
2. **Create Listing** – Voice input interface with AI-filled product details.
3. **Product Preview** – Review listing before saving.
4. **Dashboard** – View all saved products with share and payment options.

---

## 🛠️ Tech Stack

- **Frontend**: React.js / Next.js, Tailwind CSS / Chakra UI
- **Backend**: Node.js, Express.js
- **Speech-to-Text**: OpenAI Whisper API / Web Speech API
- **Database**: MongoDB / Firebase
- **Offline Support**: Progressive Web App (PWA)
- **Payments**: UPI & Razorpay Integration
- **QR Codes**: `qrcode` npm package

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/bharat-bazar.git
cd bharat-bazar

2️⃣ Install dependencies
bash
Copy
Edit
npm install
3️⃣ Setup environment variables
Create a .env file in the root directory and add:

env
Copy
Edit
OPENAI_API_KEY=your_openai_key
MONGODB_URI=your_mongodb_connection
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
4️⃣ Run the app
bash
Copy
Edit
npm run dev

📱 PWA Installation
Visit the deployed site on Chrome or Edge.

Click the "Install App" icon in the address bar.

Use the app offline anytime.

🤝 Contributing
Contributions are welcome! Please fork the repo, create a branch, and submit a PR.

📄 License
This project is licensed under the MIT License.


---

If you want, I can also make you a **GitHub repo structure** with preconfigured **React + Node.js + PWA + Razorpay + Whisper API integration** so you can directly push it to GitHub and start development.  
