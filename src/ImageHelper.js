export class ImageHelper {
  static getNaturalDimensions(img) {
    const width = img && img.naturalWidth;
    const height = img && img.naturalHeight;

    return {
      width: width || null,
      height: height || null,
    };
  }

  static getImageFormat(img) {
    const { width, height } = this.getNaturalDimensions(img);

    if (width && height) {
      if (width > height) {
        return "landscape";
      } else if (width < height) {
        return "portrait";
      } else {
        return "square";
      }
    }
    return null;
  }

  static getImageSize(img) {
    const { width, height } = this.getNaturalDimensions(img);

    if (width && height) {
      if (width > 1200 || height > 1200) {
        return "lg";
      } else if (width > 600 || height > 600) {
        return "md";
      } else {
        return "sm";
      }
    }
    return null;
  }

  static classifyImage(img) {
    return {
      format: this.getImageFormat(img) || null,
      size: this.getImageSize(img) || null,
    };
  }

  static classifyImages(images) {
    if (Array.isArray(images) && images.length > 0) {
      images.forEach((img) => {
        const { format, size } = this.classifyImage(img);

        if (format) img.classList.add(`img-${format}`);
        if (size) img.classList.add(`img-${size}`);
      });
    }
  }
}
