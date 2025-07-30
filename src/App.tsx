import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CreateListing } from './pages/CreateListing';
import { ProductPreview } from './pages/ProductPreview';
import { Dashboard } from './pages/Dashboard';
import { ProductProvider } from './context/ProductContext';
import './App.css';

function App() {
  return (
    <ProductProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateListing />} />
            <Route path="/preview/:id" element={<ProductPreview />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
    </ProductProvider>
  );
}

export default App;