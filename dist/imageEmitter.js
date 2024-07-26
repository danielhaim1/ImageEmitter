/*!
 * @danielhaim/imageemitter - v1.2.0 - 2024-07-26
 * git+https://github.com/danielhaim1/imageemitter.git
 * Copyright (c) 2024 Daniel Haim, Licensed MIT
 */(()=>{"use strict";var e={987:(e,t,s)=>{var i=s(954),n=s(215);e.exports&&(e.exports={ImageEmitter:i.ImageEmitter,ImageHelper:n.ImageHelper}),"object"==typeof window&&(window.ImageEmitter=i.ImageEmitter,window.ImageHelper=n.ImageHelper)},890:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ImageEvents=void 0;t.ImageEvents=class{constructor(){this._events={},this._onceEvents={}}on(e,t){"string"==typeof e&&"function"==typeof t&&(this._events[e]||(this._events[e]=[]),this._events[e].includes(t)||this._events[e].push(t))}once(e,t){"string"==typeof e&&"function"==typeof t&&(this.on(e,t),this._onceEvents[e]||(this._onceEvents[e]=new Set),this._onceEvents[e].add(t))}off(e,t){if("string"!=typeof e||"function"!=typeof t)return;let s=this._events[e];s&&(this._events[e]=s.filter((e=>e!==t))),this._onceEvents[e]&&this._onceEvents[e].delete(t)}emitEvent(e,t=[]){if("string"!=typeof e)return;const s=(this._events[e]||[]).slice(),i=this._onceEvents[e];for(const n of s)n.apply(this,t),i&&i.has(n)&&this.off(e,n)}allOff(){this._events={},this._onceEvents={}}}},215:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ImageHelper=void 0;class s{constructor(e={}){this.sizeDefinitions=e.sizeDefinitions||{sm:600,md:1200,lg:1/0},this.useClasses=e.useClasses||!1}static getNaturalDimensions(e){return e instanceof HTMLImageElement?{width:e.naturalWidth||null,height:e.naturalHeight||null}:{width:null,height:null}}static getImageFormat(e){const{width:t,height:s}=this.getNaturalDimensions(e);return t&&s?t>s?"landscape":t<s?"portrait":"square":null}getImageSize(e){const{width:t,height:i}=s.getNaturalDimensions(e);if(!t||!i)return null;const n=this.sizeDefinitions;return t>=n.lg||i>=n.lg?"lg":t>n.md||i>n.md?"md":t>n.sm||i>n.sm?"sm":"xs"}classifyImage(e){if(!(e instanceof HTMLImageElement))return{format:null,size:null};return{format:s.getImageFormat(e),size:this.getImageSize(e)}}classifyImages(e){Array.isArray(e)&&0!==e.length&&e.forEach((e=>{if(!(e instanceof HTMLImageElement))return;const{format:t,size:s}=this.classifyImage(e);this.useClasses?(t&&e.classList.add(`img-${t}`),s&&e.classList.add(`img-${s}`)):(t&&e.setAttribute("data-img-format",t),s&&e.setAttribute("data-img-size",s))}))}}t.ImageHelper=s},954:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ImageEmitter=void 0;var i=s(890);class n extends i.ImageEvents{constructor(e){super(),this.images=[],this.isComplete=!1,this.eventsBound=!1,this.elements=e instanceof NodeList?Array.from(e):Array.isArray(e)?e:[e],this.initImages(),this.checkImages()}initImages(){this.elements.forEach((e=>{"IMG"===e.tagName&&e.setAttribute("data-loaded","false")}))}checkImages(){const e=this.elements.filter((e=>"IMG"===e.tagName)),t=this.elements.filter((e=>this.hasBackgroundImage(e))),s=e.length+t.length;let i=0;e.forEach((e=>{this.loadImageComplete(e).then((()=>{e.setAttribute("data-loaded","true"),i++,this.progress(i,s)}))})),t.forEach((e=>{const t=this.getBackgroundImageUrl(e);t&&this.loadImageComplete({src:t}).then((()=>{i++,this.progress(i,s)}))}))}hasBackgroundImage(e){return"none"!==window.getComputedStyle(e).backgroundImage}getBackgroundImageUrl(e){const t=window.getComputedStyle(e).backgroundImage;return"none"===t&&returnnull,t.slice(5,-2)}loadImageComplete(e){return new Promise((t=>{const s=()=>{e.onload=null,e.onerror=null,t(e)};e.complete&&0!==e.naturalHeight?s():(e.onload=s,e.onerror=s)}))}loadBackgroundImage(e,t){const s=new Image;s.onload=()=>{this.images.push({url:e,isLoaded:!0}),t()},s.onerror=()=>{this.images.push({url:e,isLoaded:!1}),t()},s.src=e}progress(e,t){if(e===t){this.isComplete=!0;const e=this.images.filter((e=>!e.isLoaded)).length;this.eventsBound||(0===e?this.emitEvent("done"):e===t&&this.emitEvent("fail"),this.emitEvent("always"),this.eventsBound=!0)}else this.emitEvent("progress",[e,t])}}t.ImageEmitter=n}},t={};var s=function s(i){var n=t[i];if(void 0!==n)return n.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,s),a.exports}(987);module.exports=s})();