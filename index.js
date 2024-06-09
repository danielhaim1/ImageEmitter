import { ImageEmitter } from './src/index.js';
import { ImageHelper } from './src/ImageHelper.js';

// Export for Node.js environment
if (typeof module === 'object' && module.exports) {
  module.exports = { ImageEmitter, ImageHelper };
}

// Export for web environment
if (typeof window === 'object') {
  window.ImageEmitter = ImageEmitter;
  window.ImageHelper = ImageHelper;
}