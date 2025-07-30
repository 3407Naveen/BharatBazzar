import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  attributes: {
    color?: string;
    size?: string;
    quantity?: number;
    material?: string;
  };
  tags: string[];
  createdAt: string;
  voiceTranscript: string;
  imageUrl?: string;
  shareableLink: string;
}

interface ProductContextType {
  products: Product[];
  currentProduct: Partial<Product> | null;
  addProduct: (product: Product) => void;
  updateCurrentProduct: (product: Partial<Product>) => void;
  clearCurrentProduct: () => void;
  getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem('bharatbazzar-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bharatbazzar-products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateCurrentProduct = (product: Partial<Product>) => {
    setCurrentProduct(prev => ({ ...prev, ...product }));
  };

  const clearCurrentProduct = () => {
    setCurrentProduct(null);
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider value={{
      products,
      currentProduct,
      addProduct,
      updateCurrentProduct,
      clearCurrentProduct,
      getProductById
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}