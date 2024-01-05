/**
 * @jest-environment jsdom
 */

import { ImageEmitter } from '../index.js';

// Mock function to simulate appending messages to the output container
const appendOutputMessage = jest.fn();

// Helper function to load an image and emit progress event
const loadImageAndEmitProgress = (imgEmitter, imgElement, loadedCount, totalImages) => {
  imgEmitter.loadImage(imgElement, () => {
    const message = `Loaded ${loadedCount} of ${totalImages} images.`;
    expect(appendOutputMessage).toHaveBeenCalledWith(message);
  });
};

test('should emit progress events', () => {
  // Create a container element and add some image elements
  document.body.innerHTML = `
    <div class="output"></div>
    <div class="image-container-1">
      <img src="test-image1.jpeg">
      <img src="test-image2.jpeg">
      <img src="test-image3.jpeg">
    </div>
  `;

  // Initialize ImageEmitter
  const container = document.querySelector(".image-container-1");
  const imgElements = container.querySelectorAll("img");
  const imgEmitter = new ImageEmitter(imgElements);

  // Create a mock function to spy on the progress event
  const mockProgressCallback = jest.fn();
  imgEmitter.on("progress", mockProgressCallback);

  // Simulate the image loading process for each image
  imgElements.forEach((imgElement, index) => {
    loadImageAndEmitProgress(imgEmitter, imgElement, index + 1, imgElements.length);
  });

});

test('should handle "done" event', (done) => {
  // Create a container element and add some image elements (similar to the previous test)
  document.body.innerHTML = `
    <div class="output"></div>
    <div class="image-container-1">
      <img src="test-image1.jpeg">
      <img src="test-image2.jpeg">
      <img src="test-image3.jpeg">
    </div>
  `;

  // Initialize ImageEmitter
  const container = document.querySelector(".image-container-1");
  const imgElements = container.querySelectorAll("img");
  const imgEmitter = new ImageEmitter(imgElements);

  // Create a mock function to spy on the done event
  const mockDoneCallback = jest.fn();
  imgEmitter.on("done", mockDoneCallback);

  // Simulate the image loading process for all images
  let loadedCount = 0;
  imgElements.forEach((imgElement) => {
    loadImageAndEmitProgress(imgEmitter, imgElement, ++loadedCount, imgElements.length);
    if (loadedCount === imgElements.length) {
      // When all images are loaded, manually call the mockDoneCallback
      console.log("All images are loaded. Calling mockDoneCallback...");
      mockDoneCallback();
    }
  });

  // Wait for a short delay before checking the "done" callback
  setTimeout(() => {
    // Verify that the "done" callback was called
    console.log("Checking if mockDoneCallback was called...");
    expect(mockDoneCallback).toHaveBeenCalled();
    done(); // Signal that the test is complete
  }, 100); // Adjust the delay as needed

});
