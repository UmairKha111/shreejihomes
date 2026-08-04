import { Product } from '../types';

/**
 * Formats a number to Indian Rupee currency format
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

/**
 * Generates an elegant, high-converting WhatsApp message link for a product
 */
export const getWhatsAppOrderLink = (
  phone: string,
  product: Product,
  selectedSize?: string,
  selectedColor?: string,
  currentUrl?: string
): string => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const referralUrl = currentUrl || window.location.href;
  
  const priceString = formatPrice(product.price);
  
  let text = `Hello Shreeji Homes,\n\n`;
  text += `I would like to order the following premium home textile item:\n\n`;
  text += `*Product:* ${product.name}\n`;
  text += `*Price:* ${priceString}\n`;
  
  if (selectedSize) {
    text += `*Selected Size:* ${selectedSize}\n`;
  }
  if (selectedColor) {
    text += `*Selected Color:* ${selectedColor}\n`;
  }
  
  text += `*Link:* ${referralUrl}\n\n`;
  text += `Please confirm availability and guide me through the shipping and payment process. Thank you!`;
  
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
};

/**
 * Generates an elegant, general WhatsApp enquiry link
 */
export const getWhatsAppGeneralLink = (phone: string, subject: string): string => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const text = `Hello Shreeji Homes,\n\nI have a general enquiry regarding: ${subject}.\n\nPlease assist. Thank you!`;
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
};
