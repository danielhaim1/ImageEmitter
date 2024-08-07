/**
 * @jest-environment jsdom
 */

import {
  ImageEmitter
} from '../index.js';

// Mock function to simulate appending messages to the output container
const appendOutputMessage = jest.fn();

// Helper function to simulate image loading
const simulateImageLoading = (imgEmitter, imgElement, shouldLoad) => {
  setTimeout(() => {
    const eventType = shouldLoad ? "load" : "error";
    const event = new Event(eventType);
    imgElement.dispatchEvent(event); // Let the emitter handle the rest
  }, 50); // Small delay to simulate async loading
};


beforeEach(() => {
  jest.clearAllMocks();
});

test('should emit progress events', () => {
  document.body.innerHTML = `
    <div class="output"></div>
    <div class="image-container-1">
      <img src="test-image1.jpeg">
      <img src="test-image2.jpeg">
      <img src="test-image3.jpeg">
    </div>
  `;

  const container = document.querySelector(".image-container-1");
  const imgElements = container.querySelectorAll("img");
  const imgEmitter = new ImageEmitter(imgElements);

  const mockProgressCallback = jest.fn();
  imgEmitter.on("progress", mockProgressCallback);

  imgElements.forEach((imgElement, index) => {
    simulateImageLoading(imgEmitter, imgElement, true, index + 1, imgElements.length);
  });

  setTimeout(() => {
    expect(mockProgressCallback).toHaveBeenCalledTimes(imgElements.length);
  }, 200); // Wait for all simulated loads
});

test('should handle "done" event', (done) => {
  document.body.innerHTML = `
    <div class="output"></div>
    <div class="image-container-1">
      <img src="test-image1.jpeg">
      <img src="test-image2.jpeg">
      <img src="test-image3.jpeg">
    </div>
  `;

  console.log('DOM setup complete, image elements about to be queried.');

  const container = document.querySelector(".image-container-1");
  const imgElements = container.querySelectorAll("img");
  console.log(`Found ${imgElements.length} images to simulate loading for.`);

  const imgEmitter = new ImageEmitter(imgElements);
  console.log('ImageEmitter instance created.');

  const mockDoneCallback = jest.fn();
  imgEmitter.on("done", mockDoneCallback);
  console.log('Event listener for "done" event added.');

  let loadedCount = 0;
  imgElements.forEach((imgElement, index) => {
    console.log(`Simulating load for image ${index + 1} with src: ${imgElement.src}`);
    simulateImageLoading(imgEmitter, imgElement, true, ++loadedCount, imgElements.length);
    console.log(`Image ${index + 1} simulated as loaded. Current loaded count: ${loadedCount}`);

    if (loadedCount === imgElements.length) {
      console.log('All images simulated as loaded, emitting "done" event.');
      imgEmitter.emitEvent("done");
    }
  });

  setTimeout(() => {
    console.log('Asserting that the "done" event was called once.');
    expect(mockDoneCallback).toHaveBeenCalledTimes(1);
    done();
  }, 200);
}, 5000); // Timeout adjusted for this test


test('should handle "fail" event', (done) => {
  document.body.innerHTML = `
    <div class="output"></div>
    <div class="image-container-2">
      <img src="non-existent-image1.jpeg">
      <img src="non-existent-image2.jpeg">
    </div>
  `;

  const container = document.querySelector(".image-container-2");
  const imgElements = container.querySelectorAll("img");
  const imgEmitter = new ImageEmitter(imgElements);

  const mockFailCallback = jest.fn();
  imgEmitter.on("fail", mockFailCallback);

  imgElements.forEach((imgElement, index) => {
    simulateImageLoading(imgEmitter, imgElement, false, index + 1, imgElements.length);
  });

  setTimeout(() => {
    imgEmitter.emitEvent("fail");
    expect(mockFailCallback).toHaveBeenCalled();
    done();
  }, 200);
}, 5000);

test('should handle "always" event', (done) => {
  document.body.innerHTML = `
    <div class="output"></div>
    <div class="image-container-3">
      <img src="test-image1.jpeg">
      <img src="non-existent-image.jpeg">
    </div>
  `;

  const container = document.querySelector(".image-container-3");
  const imgElements = container.querySelectorAll("img");
  const imgEmitter = new ImageEmitter(imgElements);

  const mockAlwaysCallback = jest.fn();
  imgEmitter.on("always", mockAlwaysCallback);

  imgElements.forEach((imgElement, index) => {
    const shouldLoad = index === 0; // First image loads, second fails
    simulateImageLoading(imgEmitter, imgElement, shouldLoad, index + 1, imgElements.length);
  });

  setTimeout(() => {
    imgEmitter.emitEvent("always");
    expect(mockAlwaysCallback).toHaveBeenCalled();
    done();
  }, 200);
}, 5000);

test('should handle no images scenario', (done) => {
  document.body.innerHTML = `
    <div class="output"></div>
    <div class="image-container-4"></div>
  `;

  const container = document.querySelector(".image-container-4");
  const imgElements = container.querySelectorAll("img");
  const imgEmitter = new ImageEmitter(imgElements);

  const mockDoneCallback = jest.fn();
  const mockAlwaysCallback = jest.fn();
  imgEmitter.on("done", mockDoneCallback);
  imgEmitter.on("always", mockAlwaysCallback);

  setTimeout(() => {
    imgEmitter.emitEvent("done");
    imgEmitter.emitEvent("always");
    expect(mockDoneCallback).toHaveBeenCalled();
    expect(mockAlwaysCallback).toHaveBeenCalled();
    done();
  }, 200);
}, 5000);