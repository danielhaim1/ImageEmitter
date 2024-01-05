/**
 * @jest-environment jsdom
 */

import { ImageHelper } from "../index.js";

// Mock function to simulate appending messages to the output container
const appendOutputMessage = jest.fn();

test("should get natural dimensions of an image", () => {
  // Create an image element
  const img = document.createElement("img");

  // Mock the naturalWidth and naturalHeight properties
  Object.defineProperty(img, "naturalWidth", { value: 800, writable: true });
  Object.defineProperty(img, "naturalHeight", { value: 600, writable: true });

  const dimensions = ImageHelper.getNaturalDimensions(img);

  expect(dimensions).toEqual({ width: 800, height: 600 });
});

test("should determine image format", () => {
  // Create an image element
  const img = document.createElement("img");

  // Mock the naturalWidth and naturalHeight properties
  Object.defineProperty(img, "naturalWidth", { value: 800, writable: true });
  Object.defineProperty(img, "naturalHeight", { value: 600, writable: true });

  // Determine the format
  const format = ImageHelper.getImageFormat(img);

  expect(format).toEqual("landscape");
});

test("should classify image size", () => {
  // Create an image element
  const img = document.createElement("img");

  // Mock the naturalWidth and naturalHeight properties
  Object.defineProperty(img, "naturalWidth", { value: 800, writable: true });
  Object.defineProperty(img, "naturalHeight", { value: 600, writable: true });

  // Classify the image size
  const size = ImageHelper.getImageSize(img);

  expect(size).toEqual("md");
});
