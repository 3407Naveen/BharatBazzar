import { Product } from '../context/ProductContext';

const categories = [
  'कपड़े / Clothing',
  'गहने / Jewelry', 
  'खाना / Food',
  'फर्नीचर / Furniture',
  'इलेक्ट्रॉनिक्स / Electronics',
  'किताबें / Books',
  'खिलौने / Toys',
  'सब्जी / Vegetables',
  'फल / Fruits',
  'हस्तशिल्प / Handicrafts'
];

const commonTags = [
  'हस्तनिर्मित', 'handmade', 'local', 'fresh', 'premium', 'traditional',
  'organic', 'pure', 'quality', 'affordable', 'authentic', 'village-made',
  'गाँव का', 'देसी', 'शुद्ध', 'ताज़ा', 'प्राकृतिक'
];

export function extractProductDetails(transcript: string): Partial<Product> {
  const text = transcript.toLowerCase();
  
  // Extract price using regex
  const priceMatches = text.match(/(\d+)\s*(रुपए|रुपये|rupees?|rs\.?|\₹)/i);
  const price = priceMatches ? parseInt(priceMatches[1]) : 0;
  
  // Extract colors
  const colorKeywords = {
    'लाल': 'red', 'red': 'red',
    'नीला': 'blue', 'blue': 'blue',
    'हरा': 'green', 'green': 'green',
    'पीला': 'yellow', 'yellow': 'yellow',
    'काला': 'black', 'black': 'black',
    'सफ़ेद': 'white', 'white': 'white',
    'गुलाबी': 'pink', 'pink': 'pink',
    'बैंगनी': 'purple', 'purple': 'purple'
  };
  
  let color = '';
  for (const [keyword, colorValue] of Object.entries(colorKeywords)) {
    if (text.includes(keyword)) {
      color = colorValue;
      break;
    }
  }
  
  // Extract materials
  const materialKeywords = {
    'सिल्क': 'silk', 'silk': 'silk',
    'कॉटन': 'cotton', 'cotton': 'cotton',
    'लकड़ी': 'wood', 'wood': 'wood',
    'प्लास्टिक': 'plastic', 'plastic': 'plastic',
    'मेटल': 'metal', 'metal': 'metal',
    'चमड़ा': 'leather', 'leather': 'leather'
  };
  
  let material = '';
  for (const [keyword, materialValue] of Object.entries(materialKeywords)) {
    if (text.includes(keyword)) {
      material = materialValue;
      break;
    }
  }
  
  // Extract size
  const sizeMatches = text.match(/(small|medium|large|xl|xxl|छोटा|मध्यम|बड़ा|\d+\s*(inch|cm|इंच|सेमी))/i);
  const size = sizeMatches ? sizeMatches[0] : '';
  
  // Extract quantity
  const quantityMatches = text.match(/(\d+)\s*(piece|pieces|kg|किलो|दर्जन|dozen)/i);
  const quantity = quantityMatches ? parseInt(quantityMatches[1]) : 1;
  
  // Determine category based on keywords
  let category = 'अन्य / Others';
  if (text.includes('साड़ी') || text.includes('saree') || text.includes('कपड़') || text.includes('shirt') || text.includes('dress')) {
    category = 'कपड़े / Clothing';
  } else if (text.includes('गहने') || text.includes('jewelry') || text.includes('नेकलेस') || text.includes('bracelet')) {
    category = 'गहने / Jewelry';
  } else if (text.includes('खाना') || text.includes('food') || text.includes('मिठाई') || text.includes('sweet')) {
    category = 'खाना / Food';
  } else if (text.includes('सब्जी') || text.includes('vegetable') || text.includes('टमाटर') || text.includes('onion')) {
    category = 'सब्जी / Vegetables';
  } else if (text.includes('फल') || text.includes('fruit') || text.includes('आम') || text.includes('apple')) {
    category = 'फल / Fruits';
  }
  
  // Generate title from the first few words or product keywords
  let title = 'New Product';
  const productKeywords = ['साड़ी', 'saree', 'shirt', 'dress', 'necklace', 'गहने', 'खाना', 'सब्जी', 'फल', 'chair', 'table'];
  
  for (const keyword of productKeywords) {
    if (text.includes(keyword)) {
      const words = transcript.split(' ').slice(0, 4).join(' ');
      title = words.charAt(0).toUpperCase() + words.slice(1);
      break;
    }
  }
  
  // Generate description
  const description = generateDescription(title, price, color, material, category);
  
  // Generate tags
  const tags = generateTags(text, category, color, material);
  
  return {
    id: Date.now().toString(),
    title,
    description,
    price,
    category,
    attributes: {
      color: color || undefined,
      size: size || undefined,
      quantity: quantity || 1,
      material: material || undefined
    },
    tags,
    createdAt: new Date().toISOString(),
    shareableLink: `${window.location.origin}/product/${Date.now()}`
  };
}

function generateDescription(title: string, price: number, color: string, material: string, category: string): string {
  const descriptions = [
    `Beautiful ${color} ${title.toLowerCase()} made with ${material || 'quality materials'}. Perfect for daily use and special occasions.`,
    `Premium quality ${title.toLowerCase()} available in ${color} color. Handcrafted with care using ${material || 'finest materials'}.`,
    `Authentic ${category.split('/')[1]?.trim() || 'product'} - ${title}. Available in attractive ${color} shade with excellent finish.`
  ];
  
  const baseDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
  const priceText = price > 0 ? ` Special price: ₹${price}` : '';
  
  return baseDescription + priceText;
}

function generateTags(text: string, category: string, color: string, material: string): string[] {
  const tags = new Set<string>();
  
  // Add category-based tags
  if (category.includes('Clothing')) {
    tags.add('fashion');
    tags.add('clothing');
    tags.add('wear');
  }
  
  // Add color tag
  if (color) {
    tags.add(color);
  }
  
  // Add material tag
  if (material) {
    tags.add(material);
  }
  
  // Add common tags based on text content
  const relevantTags = commonTags.filter(tag => 
    text.includes(tag) || Math.random() > 0.7
  );
  
  relevantTags.slice(0, 3).forEach(tag => tags.add(tag));
  
  // Ensure we have at least 3 tags
  while (tags.size < 3) {
    const randomTag = commonTags[Math.floor(Math.random() * commonTags.length)];
    tags.add(randomTag);
  }
  
  return Array.from(tags).slice(0, 5);
}