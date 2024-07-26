import {
  ImageEvents
} from './ImageEvents.js';

export class ImageEmitter extends ImageEvents {

  /**
   * @param {NodeList|Array} elements - The elements to be observed.
   */
  constructor(elements) {
    super();
    this.images = [];
    this.isComplete = false;
    this.eventsBound = false; // Added new flag to prevent multiple bindings
    this.elements = elements instanceof NodeList ?
      Array.from(elements) :
      Array.isArray(elements) ?
      elements :
      [elements];
    this.initImages();
    this.checkImages();
  }

  /**
   * Initialize images by setting data-loaded attribute to false.
   */
  initImages() {
    this.elements.forEach(element => {
      if (element.tagName === "IMG") {
        element.setAttribute("data-loaded", "false");
      }
    });
  }

  /**
   * Check all images and background images, and start loading them.
   */
  checkImages() {
    const imgElements = this.elements.filter(element => element.tagName === "IMG");
    const bgElements = this.elements.filter(element => this.hasBackgroundImage(element));
    const totalImages = imgElements.length + bgElements.length;
    let loadedCount = 0;

    imgElements.forEach(element => {
      this.loadImageComplete(element).then(() => {
        element.setAttribute("data-loaded", "true");
        loadedCount++;
        this.progress(loadedCount, totalImages);
      });
    });

    bgElements.forEach(element => {
      const imageUrl = this.getBackgroundImageUrl(element);
      if (imageUrl) {
        this.loadImageComplete({
          src: imageUrl
        }).then(() => {
          loadedCount++;
          this.progress(loadedCount, totalImages);
        });
      }
    });
  }

  /**
   * Check if the element has a background image.
   * @param {HTMLElement} element - The element to check.
   * @returns {boolean} - True if the element has a background image, otherwise false.
   */
  hasBackgroundImage(element) {
    return window.getComputedStyle(element).backgroundImage !== "none";
  }

  /**
   * Get the background image URL of an element.
   * @param {HTMLElement} element - The element to get the background image URL from.
   * @returns {string|null} - The background image URL, or null if not found.
   */
  getBackgroundImageUrl(element) {
    const backgroundImage = window.getComputedStyle(element).backgroundImage;
    if (backgroundImage === "none") returnnull;

    return backgroundImage.slice(5, -2);
  }

  /**
   * Load an image and call the callback once loaded.
   * @param {HTMLImageElement} imgElement - The image element to load.
   * @param {Function} callback - The callback to call once loaded.
   */
  loadImageComplete(imgElement) {
    return new Promise(resolve => {
      const resolveOnce = () => {
        imgElement.onload = null;
        imgElement.onerror = null;
        resolve(imgElement);
      };

      if (imgElement.complete && imgElement.naturalHeight !== 0) {
        resolveOnce();
      } else {
        imgElement.onload = resolveOnce;
        imgElement.onerror = resolveOnce;
      }
    });
  }

  /**
   * Load a background image and call the callback once loaded.
   * @param {string} url - The background image URL to load.
   * @param {Function} callback - The callback to call once loaded.
   */
  loadBackgroundImage(url, callback) {
    const img = new Image();
    img.onload = () => {
      this.images.push({
        url,
        isLoaded: true
      });
      callback();
    };
    img.onerror = () => {
      this.images.push({
        url,
        isLoaded: false
      });
      callback();
    };
    img.src = url;
  }

  /**
   * Update the progress and emit events accordingly.
   * @param {number} loadedCount - The number of images that have loaded.
   * @param {number} totalImages - The total number of images to load.
   */
  progress(loadedCount, totalImages) {
    if (loadedCount === totalImages) {
      this.isComplete = true;
      const failed = this.images.filter(image => !image.isLoaded).length;
      if (!this.eventsBound) {
        if (failed === 0) {
          this.emitEvent("done");
        } else if (failed === totalImages) {
          this.emitEvent("fail");
        }
        this.emitEvent("always");
        this.eventsBound = true; // Set flag after emitting events
      }
    } else {
      this.emitEvent("progress", [loadedCount, totalImages]);
    }
  }
}