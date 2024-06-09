/**
 * @jest-environment jsdom
 */

import { ImageHelper } from "../index.js";

const defaultSizeDefinitions = {
  sm: 600,
  md: 1200,
  lg: Infinity
};

// Mock function to simulate appending messages to the output container
const appendOutputMessage = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  global.Image = class {
    constructor() {
      setTimeout(() => {
        this.onload(); // Simulate image load
      }, 0);
    }

    set src(value) {
      const { width, height } = imageDimensions[value];
      this.naturalWidth = width;
      this.naturalHeight = height;
    }
  };
});

// Mock image dimensions based on src
const imageDimensions = {
  "test-image1.jpeg": { width: 3958, height: 2639 },
  "test-image2.jpeg": { width: 4587, height: 6881 },
  "test-image3.jpeg": { width: 4587, height: 6881 },
  "test-image4.jpeg": { width: 400, height: 400 },
  "test-image5.jpeg": { width: 355, height: 205 },
};

test("should classify multiple images by format and size using data attributes", () => {
  document.body.innerHTML = `
    <img id="img1" src="test-image1.jpeg">
    <img id="img2" src="test-image2.jpeg">
    <img id="img3" src="test-image3.jpeg">
    <img id="img4" src="test-image4.jpeg">
    <img id="img5" src="test-image5.jpeg">
  `;

  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");
  const img4 = document.getElementById("img4");
  const img5 = document.getElementById("img5");

  const images = [img1, img2, img3, img4, img5];
  const imageHelper = new ImageHelper({ useClasses: false });
  imageHelper.classifyImages(images);

  setTimeout(() => {
    expect(img1.getAttribute('data-img-format')).toBe("landscape");
    expect(img1.getAttribute('data-img-size')).toBe("lg");

    expect(img2.getAttribute('data-img-format')).toBe("portrait");
    expect(img2.getAttribute('data-img-size')).toBe("lg");

    expect(img3.getAttribute('data-img-format')).toBe("portrait");
    expect(img3.getAttribute('data-img-size')).toBe("lg");

    expect(img4.getAttribute('data-img-format')).toBe("square");
    expect(img4.getAttribute('data-img-size')).toBe("sm");

    expect(img5.getAttribute('data-img-format')).toBe("landscape");
    expect(img5.getAttribute('data-img-size')).toBe("sm");
  }, 0);
});

test("should classify multiple images by format and size using CSS classes", () => {
  document.body.innerHTML = `
    <img id="img1" src="test-image1.jpeg">
    <img id="img2" src="test-image2.jpeg">
    <img id="img3" src="test-image3.jpeg">
    <img id="img4" src="test-image4.jpeg">
    <img id="img5" src="test-image5.jpeg">
  `;

  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");
  const img4 = document.getElementById("img4");
  const img5 = document.getElementById("img5");

  const images = [img1, img2, img3, img4, img5];
  const imageHelper = new ImageHelper({ useClasses: true });
  imageHelper.classifyImages(images);

  setTimeout(() => {
    expect(img1.classList.contains('img-landscape')).toBe(true);
    expect(img1.classList.contains('img-lg')).toBe(true);

    expect(img2.classList.contains('img-portrait')).toBe(true);
    expect(img2.classList.contains('img-lg')).toBe(true);

    expect(img3.classList.contains('img-portrait')).toBe(true);
    expect(img3.classList.contains('img-lg')).toBe(true);

    expect(img4.classList.contains('img-square')).toBe(true);
    expect(img4.classList.contains('img-sm')).toBe(true);

    expect(img5.classList.contains('img-landscape')).toBe(true);
    expect(img5.classList.contains('img-sm')).toBe(true);
  }, 0);
});

test("should classify images using custom size definitions", () => {
  const customSizeDefinitions = {
    sm: 500,
    md: 1000,
    lg: 1500,
    xl: Infinity // Define your own logic for "xl"
  };

  document.body.innerHTML = `
    <img id="img1" src="test-image1.jpeg">
    <img id="img2" src="test-image2.jpeg">
    <img id="img3" src="test-image3.jpeg">
    <img id="img4" src="test-image4.jpeg">
    <img id="img5" src="test-image5.jpeg">
  `;

  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");
  const img4 = document.getElementById("img4");
  const img5 = document.getElementById("img5");

  const images = [img1, img2, img3, img4, img5];
  const imageHelper = new ImageHelper({ sizeDefinitions: customSizeDefinitions, useClasses: false });
  imageHelper.classifyImages(images);

  setTimeout(() => {
    expect(img1.getAttribute('data-img-format')).toBe("landscape");
    expect(img1.getAttribute('data-img-size')).toBe("lg");

    expect(img2.getAttribute('data-img-format')).toBe("portrait");
    expect(img2.getAttribute('data-img-size')).toBe("xl");

    expect(img3.getAttribute('data-img-format')).toBe("portrait");
    expect(img3.getAttribute('data-img-size')).toBe("xl");

    expect(img4.getAttribute('data-img-format')).toBe("square");
    expect(img4.getAttribute('data-img-size')).toBe("sm");

    expect(img5.getAttribute('data-img-format')).toBe("landscape");
    expect(img5.getAttribute('data-img-size')).toBe("xs");
  }, 0);
});
