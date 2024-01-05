import { ImageEvents } from './ImageEvents.js';

export class ImageEmitter extends ImageEvents {
    constructor(elements) {
        super();
        this.images = [];
        this.isComplete = false;
        this.elements =
            elements instanceof NodeList ? Array.from(elements) : [elements];
        this.initImages();
        this.checkImages();
    }

    initImages() {
        this.elements.forEach((element) => {
            if (element.tagName === "IMG") {
                element.setAttribute("data-loaded", "false");
            }
        });
    }

    checkImages() {
        const totalImages =
            this.elements.filter((element) => element.tagName === "IMG").length +
            this.elements.filter(
                (element) => window.getComputedStyle(element).backgroundImage !== "none"
            ).length;

        let loadedCount = 0;

        this.elements.forEach((element) => {
            if (element.tagName === "IMG") {
                this.loadImage(element, () => {
                    loadedCount++;
                    element.setAttribute("data-loaded", "true");
                    this.progress(loadedCount, totalImages);
                });
            } else {
                // Check for background image
                const backgroundImage = window.getComputedStyle(element).backgroundImage;
                if (backgroundImage !== "none") {
                    const imageUrl = backgroundImage.slice(5, -2); // Removing url(" and ")
                    this.loadBackgroundImage(imageUrl, () => {
                        loadedCount++;
                        this.progress(loadedCount, totalImages);
                    });
                }
            }
        });
    }

    loadImage(imgElement, callback) {
        const img = new Image();
        img.onload = () => {
            this.images.push({ imgElement, isLoaded: true });
            callback();
        };
        img.onerror = () => {
            this.images.push({ imgElement, isLoaded: false });
            callback();
        };
        img.src = imgElement.src;
    }

    loadBackgroundImage(url, callback) {
        const img = new Image();
        img.onload = () => {
            this.images.push({ url, isLoaded: true });
            callback();
        };
        img.onerror = () => {
            this.images.push({ url, isLoaded: false });
            callback();
        };
        img.src = url;
    }

    progress(loadedCount, totalImages) {
        if (loadedCount === totalImages) {
            this.isComplete = true;
            const failed = this.images.filter((image) => !image.isLoaded).length;
            if (failed === 0) {
                this.emitEvent("done");
            } else if (failed === totalImages) {
                this.emitEvent("fail");
            }
            this.emitEvent("always");
        } else {
            this.emitEvent("progress", [loadedCount, totalImages]); // Notice the array for arguments
        }
    }
}