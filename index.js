import { ImageEmitter } from './src/ImageEmitter.js';

// Export for Node.js environment
if (typeof module === 'object' && module.exports) {
    module.exports = { ImageEmitter };
}

// Export for web environment
if (typeof window === 'object') {
    window.ImageEmitter = ImageEmitter;
}
