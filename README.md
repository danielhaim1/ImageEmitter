# Image Emitter

[![npm version](https://img.shields.io/npm/v/@danielhaim/imageemitter)](https://www.npmjs.com/package/@danielhaim/imageemitter)
[![Downloads](https://img.shields.io/npm/dt/@danielhaim/imageemitter.svg)](https://www.npmjs.com/package/@danielhaim/imageemitter)
![GitHub](https://img.shields.io/github/license/danielhaim1/imageemitter)

<!-- TOC --><a name="image-emitter"></a>
ImageEmitter is a streamlined utility designed for image loading tasks through event-driven approach. The utility manages the loading of images and extends its functionality to categorize images based on their dimensions and format.

<!-- TOC --><a name="key-attributes"></a>
## Key Attributes
- Facilitates image loading with event-driven techniques.
- Includes basic event handling methods such as `done`, `progress`, `always`, and `fail`.
- Keeps track of image loading status including progress, completion, and potential errors.
- Built using JavaScript ES6 for improved functionality and ease of understanding.

<!-- TOC --><a name="demo"></a>
## Demo

<a target="_blank" href="https://codepen.io/danielhaim/pen/VwqqoKw">
    <img src="https://raw.githubusercontent.com/danielhaim1/image-emitter/main/__test__/demo.png" width="100%" height="auto" alt="Image Emitter Demo">
</a>

<!-- TOC --><a name="table-of-contents"></a>
<!-- TOC start -->
## Table of Contents
- [Image Emitter](#image-emitter)
   * [Key Attributes](#key-attributes)
   * [Demo](#demo)
   * [Table of Contents](#table-of-contents)
   * [Installation](#installation)
   * [Usage](#usage)
   * [API](#api)
      + [Classes and Methods](#classes-and-methods)
         - [`ImageEvents`](#imageevents)
         - [`ImageEmitter`](#imageemitter)
         - [`ImageHelper`](#imagehelper)
      + [Event Listeners](#event-listeners)
   * [Repository Structure](#repository-structure)
<!-- TOC end -->

<!-- TOC --><a name="installation"></a>
## Installation
You can install this module via npm:

```bash
$ npm i @danielhaim/image-emitter
```

<!-- TOC --><a name="usage"></a>
## Usage
```javascript
// For Node.js or build systems (Webpack, Rollup, etc.):
import { ImageEmitter, ImageHelper } from "@danielhaim/imageemitter";

// For direct browser usage via CDNs like esm.sh or unpkg:
// If the above doesn't work, you might need to import directly from the source:
// import { ImageEmitter } from "https://esm.sh/@danielhaim/imageemitter/src/index.js";
// import { ImageHelper } from "https://esm.sh/@danielhaim/imageemitter/src/ImageHelper.js";

// Initialize image loader for selected images
const images = document.querySelectorAll("img");
const imageEmitter = new ImageEmitter(images);

// Event Listener: Image Loading Progress
imageEmitter.on("progress", (loadedCount, totalImages) => {
    console.log(`Progress: ${loadedCount}/${totalImages} images loaded.`);
});

// Event Listener: All Images Successfully Loaded
imageEmitter.on("done", () => {
    console.log("Success: All images have been loaded.");
});

// Event Listener: Image Loading Failure
imageEmitter.on("fail", () => {
    console.error("Error: One or more images failed to load.");
});

// Event Listener: Image Loading Completion (Regardless of Success/Failure)
imageEmitter.on("always", () => {
    console.log("Info: Image loading process completed.");
});

// Optional: Use ImageHelper to classify images
const helper = new ImageHelper({ useClasses: true });
imageEmitter.on("done", () => { // Classify after loading is done
    helper.classifyImages(Array.from(images));
});
```

<!-- TOC --><a name="api"></a>
## API

<!-- TOC --><a name="classes-and-methods"></a>
### Classes and Methods

<!-- TOC --><a name="imageevents"></a>
#### `ImageEvents`
A foundational class for event handling.

- `constructor()`: Initializes the event and once-event handlers.
- `on(eventName, listener)`: Registers an event listener.
- `once(eventName, listener)`: Registers a one-time event listener.
- `off(eventName, listener)`: Removes an event listener.
- `emitEvent(eventName, args)`: Emits an event to all registered listeners.
- `allOff()`: Removes all event listeners.

<!-- TOC --><a name="imageemitter"></a>
#### `ImageEmitter`
Extends `ImageEvents` for image loading.

- `constructor(elements)`: Initializes with a set of DOM elements.
- `initImages()`: Prepares images for loading.
- `checkImages()`: Checks and starts the loading process for all images.
- `loadImage(imgElement, callback)`: Loads a single image.
- `loadBackgroundImage(url, callback)`: Loads a background image.
- `progress(loadedCount, totalImages)`: Tracks the progress of image loading.
- `hasBackgroundImage(element)`: Checks if an element has a background image.
- `getBackgroundImageUrl(element)`: Retrieves the background image URL of an element.

<!-- TOC --><a name="imagehelper"></a>
#### `ImageHelper`
A utility class for image analysis and classification.

- `constructor(options)`: Initializes the class with custom size definitions and an option to use CSS classes or data attributes.
  - `options.sizeDefinitions`: Custom size definitions for classifying images (e.g., { sm: 600, md: 1200, lg: 1500, xl: Infinity }).
  - `options.useClasses`: Boolean to choose between using CSS classes or data attributes.
- `static getNaturalDimensions(img)`: Returns the natural dimensions of an image.
- `static getImageFormat(img)`: Determines the format of an image (landscape, portrait, square).
- `getImageSize(img)`: Classifies the size of an image based on custom size definitions.
- `classifyImage(img)`: Returns the format and size classification of an image.
- `classifyImages(images)`: Applies format and size classification to a collection of images by either adding CSS classes or `data-img-format` and `data-img-size` attributes.

<!-- TOC --><a name="event-listeners"></a>
### Event Listeners

- `progress`: Triggered during the image loading process, provides the count of loaded images and the total.
- `done`: Triggered when all images are loaded successfully.
- `fail`: Triggered if any image fails to load.
- `always`: Triggered when the image loading process is completed, regardless of success or failure.

<!-- TOC --><a name="repository-structure"></a>
## Repository Structure
```
├── LICENSE
├── README.md
├── __test__
│   ├── ImageEmitter.test.js
│   ├── ImageHelper.test.js
│   ├── test-image1.jpeg
│   ├── test-image2.jpeg
│   └── test-image3.jpeg
├── babel.config.js
├── dist
│   ├── imageEmitter.amd.js
│   └── imageEmitter.js
├── index.js
├── jest.config.js
├── package-lock.json
├── package.json
├── src
│   ├── ImageEvents.js
│   ├── ImageHelper.js
│   └── index.js
└── webpack.config.js
```
