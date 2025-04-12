/*!
 * @danielhaim/imageemitter - v1.2.2 - 2025-04-12
 * git+https://github.com/danielhaim1/imageemitter.git
 * Copyright (c) 2025 Daniel Haim, Licensed MIT
 */(()=>{var e={215:(e,t)=>{var n;void 0===(n=function(e){"use strict";function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,o(r.key),r)}}function o(e){var t=function(e,t){if("object"!=n(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!=n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==n(t)?t:t+""}Object.defineProperty(e,"__esModule",{value:!0}),t.ImageHelper=void 0;t.ImageHelper=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.sizeDefinitions=t.sizeDefinitions||{sm:600,md:1200,lg:1/0},this.useClasses=t.useClasses||!1}return t=e,o=[{key:"getNaturalDimensions",value:function(e){return e instanceof HTMLImageElement?{width:e.naturalWidth||null,height:e.naturalHeight||null}:{width:null,height:null}}},{key:"getImageFormat",value:function(e){var t=this.getNaturalDimensions(e),n=t.width,r=t.height;return n&&r?n>r?"landscape":n<r?"portrait":"square":null}}],(n=[{key:"getImageSize",value:function(t){var n=e.getNaturalDimensions(t),r=n.width,o=n.height;if(!r||!o)return null;var i=this.sizeDefinitions;return r>=i.lg||o>=i.lg?"lg":r>i.md||o>i.md?"md":r>i.sm||o>i.sm?"sm":"xs"}},{key:"classifyImage",value:function(t){return t instanceof HTMLImageElement?{format:e.getImageFormat(t),size:this.getImageSize(t)}:{format:null,size:null}}},{key:"classifyImages",value:function(e){var t=this;Array.isArray(e)&&0!==e.length&&e.forEach((function(e){if(e instanceof HTMLImageElement){var n=t.classifyImage(e),r=n.format,o=n.size;t.useClasses?(r&&e.classList.add("img-".concat(r)),o&&e.classList.add("img-".concat(o))):(r&&e.setAttribute("data-img-format",r),o&&e.setAttribute("data-img-size",o))}}))}}])&&r(t.prototype,n),o&&r(t,o),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,n,o}()}.apply(t,[t]))||(e.exports=n)},890:(e,t)=>{var n;void 0===(n=function(e){"use strict";function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function r(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return o(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return u=e.done,e},e:function(e){s=!0,a=e},f:function(){try{u||null==n.return||n.return()}finally{if(s)throw a}}}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,a(r.key),r)}}function a(e){var t=function(e,t){if("object"!=n(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!=n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==n(t)?t:t+""}Object.defineProperty(e,"__esModule",{value:!0}),t.ImageEvents=void 0;t.ImageEvents=function(){return e=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._events={},this._onceEvents={}},t=[{key:"on",value:function(e,t){"string"==typeof e&&"function"==typeof t&&(this._events[e]||(this._events[e]=[]),this._events[e].includes(t)||this._events[e].push(t))}},{key:"once",value:function(e,t){"string"==typeof e&&"function"==typeof t&&(this.on(e,t),this._onceEvents[e]||(this._onceEvents[e]=new Set),this._onceEvents[e].add(t))}},{key:"off",value:function(e,t){if("string"==typeof e&&"function"==typeof t){var n=this._events[e];n&&(this._events[e]=n.filter((function(e){return e!==t}))),this._onceEvents[e]&&this._onceEvents[e].delete(t)}}},{key:"emitEvent",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if("string"==typeof e){var n,o=(this._events[e]||[]).slice(),i=this._onceEvents[e],a=r(o);try{for(a.s();!(n=a.n()).done;){var u=n.value;u.apply(this,t),i&&i.has(u)&&this.off(e,u)}}catch(e){a.e(e)}finally{a.f()}}}},{key:"allOff",value:function(){this._events={},this._onceEvents={}}}],t&&i(e.prototype,t),n&&i(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,t,n}()}.apply(t,[t]))||(e.exports=n)},954:(e,t,n)=>{var r,o;function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}r=[t,n(890)],void 0===(o=function(e,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,o(r.key),r)}}function o(e){var t=function(e,t){if("object"!=i(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=i(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==i(t)?t:t+""}function a(e,t,n){return t=s(t),function(e,t){if(t&&("object"==i(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(e,u()?Reflect.construct(t,n||[],s(e).constructor):t.apply(e,n))}function u(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(u=function(){return!!e})()}function s(e){return s=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},s(e)}function l(e,t){return l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},l(e,t)}Object.defineProperty(e,"__esModule",{value:!0}),t.ImageEmitter=void 0;t.ImageEmitter=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=a(this,t)).images=[],n.isComplete=!1,n.eventsBound=!1,n.elements=e instanceof NodeList?Array.from(e):Array.isArray(e)?e:[e],n.initImages(),n.checkImages(),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&l(e,t)}(t,e),n=t,(o=[{key:"initImages",value:function(){this.elements.forEach((function(e){"IMG"===e.tagName&&e.setAttribute("data-loaded","false")}))}},{key:"checkImages",value:function(){var e=this,t=this.elements.filter((function(e){return"IMG"===e.tagName})),n=this.elements.filter((function(t){return e.hasBackgroundImage(t)})),r=t.length+n.length,o=0;t.forEach((function(t){e.loadImageComplete(t).then((function(){t.setAttribute("data-loaded","true"),o++,e.progress(o,r)}))})),n.forEach((function(t){var n=e.getBackgroundImageUrl(t);n&&e.loadImageComplete({src:n}).then((function(){o++,e.progress(o,r)}))}))}},{key:"hasBackgroundImage",value:function(e){return"none"!==window.getComputedStyle(e).backgroundImage}},{key:"getBackgroundImageUrl",value:function(e){var t=window.getComputedStyle(e).backgroundImage;return"none"===t&&returnnull,t.slice(5,-2)}},{key:"loadImageComplete",value:function(e){return new Promise((function(t){var n=function(){e.onload=null,e.onerror=null,t(e)};e.complete&&0!==e.naturalHeight?n():(e.onload=n,e.onerror=n)}))}},{key:"loadBackgroundImage",value:function(e,t){var n=this,r=new Image;r.onload=function(){n.images.push({url:e,isLoaded:!0}),t()},r.onerror=function(){n.images.push({url:e,isLoaded:!1}),t()},r.src=e}},{key:"progress",value:function(e,t){if(e===t){this.isComplete=!0;var n=this.images.filter((function(e){return!e.isLoaded})).length;this.eventsBound||(0===n?this.emitEvent("done"):n===t&&this.emitEvent("fail"),this.emitEvent("always"),this.eventsBound=!0)}else this.emitEvent("progress",[e,t])}}])&&r(n.prototype,o),i&&r(n,i),Object.defineProperty(n,"prototype",{writable:!1}),n;var n,o,i}(n.ImageEvents)}.apply(t,r))||(e.exports=o)},987:(e,t,n)=>{var r,o;e=n.nmd(e),r=[n(954),n(215)],void 0===(o=function(t,n){"use strict";function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}"object"===r(e)&&e.exports&&(e.exports={ImageEmitter:t.ImageEmitter,ImageHelper:n.ImageHelper}),"object"===("undefined"==typeof window?"undefined":r(window))&&(window.ImageEmitter=t.ImageEmitter,window.ImageHelper=n.ImageHelper)}.apply(t,r))||(e.exports=o)}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,loaded:!1,exports:{}};return e[r](i,i.exports,n),i.loaded=!0,i.exports}n.nmd=e=>(e.paths=[],e.children||(e.children=[]),e);n(987)})();