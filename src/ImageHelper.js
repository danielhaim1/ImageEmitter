export class ImageHelper {
  /**
   * @param {Object} options - Configuration options for classifying images.
   * @param {Object} options.sizeDefinitions - Custom size definitions.
   * @param {boolean} options.useClasses - Whether to use CSS classes instead of data attributes.
   */
  constructor(options = {}) {
    this.sizeDefinitions = options.sizeDefinitions || { sm: 600, md: 1200, lg: Infinity };
    this.useClasses = options.useClasses || false;
  }

  /**
   * Get the natural dimensions of an image.
   * @param {HTMLImageElement} img - The image element.
   * @returns {{ width: number | null, height: number | null }} - The natural width and height of the image.
   */
  static getNaturalDimensions(img) {
    if (!(img instanceof HTMLImageElement)) return { width: null, height: null };
    return {
      width: img.naturalWidth || null,
      height: img.naturalHeight || null,
    };
  }

  /**
   * Determine the format of an image (landscape, portrait, or square).
   * @param {HTMLImageElement} img - The image element.
   * @returns {string | null} - The format of the image.
   */
  static getImageFormat(img) {
    const { width, height } = this.getNaturalDimensions(img);
    if (!width || !height) return null;

    if (width > height) return "landscape";
    if (width < height) return "portrait";
    return "square";
  }

  /**
   * Determine the size of an image based on its dimensions and custom size definitions.
   * @param {HTMLImageElement} img - The image element.
   * @returns {string | null} - The size of the image.
   */
  getImageSize(img) {
    const { width, height } = ImageHelper.getNaturalDimensions(img);
    if (!width || !height) return null;

    const sizeDefinitions = this.sizeDefinitions;

    if (width >= sizeDefinitions.lg || height >= sizeDefinitions.lg) return "lg";
    if (width > sizeDefinitions.md || height > sizeDefinitions.md) return "md";
    if (width > sizeDefinitions.sm || height > sizeDefinitions.sm) return "sm";
    return "xs"; // Assuming "xs" for dimensions smaller than "sm"
  }

  /**
   * Classify an image by format and size.
   * @param {HTMLImageElement} img - The image element.
   * @returns {{ format: string | null, size: string | null }} - The classification of the image.
   */
  classifyImage(img) {
    if (!(img instanceof HTMLImageElement)) return { format: null, size: null };
    return {
      format: ImageHelper.getImageFormat(img),
      size: this.getImageSize(img),
    };
  }

  /**
   * Classify multiple images by format and size and add corresponding attributes or classes.
   * @param {HTMLImageElement[]} images - The array of image elements.
   */
  classifyImages(images) {
    if (!Array.isArray(images) || images.length === 0) return;

    images.forEach((img) => {
      if (!(img instanceof HTMLImageElement)) return;
      const { format, size } = this.classifyImage(img);
      if (this.useClasses) {
        if (format) img.classList.add(`img-${format}`);
        if (size) img.classList.add(`img-${size}`);
      } else {
        if (format) img.setAttribute('data-img-format', format);
        if (size) img.setAttribute('data-img-size', size);
      }
    });
  }
}
