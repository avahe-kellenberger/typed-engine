/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ts/entry.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/Game.ts":
/*!**********************!*\
  !*** ../src/Game.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst HeadlessGame_1 = __webpack_require__(/*! ./HeadlessGame */ \"../src/HeadlessGame.ts\");\nconst Vector2D_1 = __webpack_require__(/*! ./math/Vector2D */ \"../src/math/Vector2D.ts\");\nconst Camera_1 = __webpack_require__(/*! ./scene/Camera */ \"../src/scene/Camera.ts\");\nclass Game extends HeadlessGame_1.HeadlessGame {\n    constructor(ctx, content) {\n        super(content);\n        this.ctx = ctx;\n        const canvasSize = new Vector2D_1.Vector2D(ctx.canvas.width, ctx.canvas.height);\n        this.camera = new Camera_1.Camera(canvasSize);\n        const fitCanvas = () => {\n            const canvas = ctx.canvas;\n            const canvasParent = canvas.parentElement;\n            if (canvasParent !== null) {\n                const parentBounds = canvasParent.getBoundingClientRect();\n                if (canvas.width !== parentBounds.width || canvas.height !== parentBounds.height) {\n                    canvas.width = parentBounds.width;\n                    canvas.height = parentBounds.height;\n                }\n            }\n        };\n        window.addEventListener('load', fitCanvas);\n        window.addEventListener('resize', fitCanvas);\n    }\n    getContent() {\n        return this.content;\n    }\n    setContent(content) {\n        super.setContent(content);\n    }\n    getCamera() {\n        return this.camera;\n    }\n    update(deltaTime) {\n        super.update(deltaTime);\n        this.render(this.ctx, this.camera);\n    }\n    render(ctx, camera, callback) {\n        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);\n        if (this.content !== undefined) {\n            this.content.render(ctx, camera, callback);\n        }\n    }\n}\nexports.Game = Game;\n\n\n//# sourceURL=webpack:///../src/Game.ts?");

/***/ }),

/***/ "../src/GameEngine.ts":
/*!****************************!*\
  !*** ../src/GameEngine.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass GameEngine {\n    constructor(updatable) {\n        this.loop = () => {\n            if (!this.isLooping) {\n                return;\n            }\n            const now = performance.now();\n            if (this.lastTick === undefined) {\n                this.lastTick = now;\n            }\n            const elapsed = now - this.lastTick;\n            this.updatable.update(elapsed * 0.001);\n            this.lastTick = now;\n            requestAnimationFrame(this.loop);\n        };\n        this.updatable = updatable;\n        this.isLooping = false;\n    }\n    start() {\n        if (this.isLooping) {\n            return false;\n        }\n        this.isLooping = true;\n        this.loop();\n        return true;\n    }\n    stop() {\n        if (!this.isLooping) {\n            return false;\n        }\n        this.isLooping = false;\n        return true;\n    }\n    isRunning() {\n        return this.isLooping;\n    }\n}\nexports.GameEngine = GameEngine;\n\n\n//# sourceURL=webpack:///../src/GameEngine.ts?");

/***/ }),

/***/ "../src/HeadlessGame.ts":
/*!******************************!*\
  !*** ../src/HeadlessGame.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst GameEngine_1 = __webpack_require__(/*! ./GameEngine */ \"../src/GameEngine.ts\");\nclass HeadlessGame {\n    constructor(content) {\n        this.content = content;\n        this.engine = new GameEngine_1.GameEngine(this);\n    }\n    getContent() {\n        return this.content;\n    }\n    setContent(content) {\n        this.content = content;\n    }\n    start() {\n        return this.engine.start();\n    }\n    stop() {\n        return this.engine.stop();\n    }\n    update(deltaTime) {\n        if (this.content !== undefined) {\n            this.content.update(deltaTime);\n        }\n    }\n}\nexports.HeadlessGame = HeadlessGame;\n\n\n//# sourceURL=webpack:///../src/HeadlessGame.ts?");

/***/ }),

/***/ "../src/animation/Animation.ts":
/*!*************************************!*\
  !*** ../src/animation/Animation.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Animation {\n    constructor(frames) {\n        this.frames = frames;\n        let collectiveDuration = 0;\n        this.frames.forEach(frame => collectiveDuration += frame.duration);\n        this.animationDuration = collectiveDuration;\n    }\n    getFrameAtIndex(index) {\n        return this.frames[index];\n    }\n    getFrameAtTime(seconds) {\n        const timeSinceFirstFrame = seconds % this.animationDuration;\n        let elapsed = 0;\n        for (let i = 0; i < this.frames.length; i++) {\n            const currentFrame = this.frames[i];\n            elapsed += this.frames[i].duration;\n            if (elapsed >= timeSinceFirstFrame) {\n                return currentFrame;\n            }\n        }\n        throw new Error(`Given time \"${seconds}\" is invalid.`);\n    }\n    getFrameCount() {\n        return this.frames.length;\n    }\n    getDuration() {\n        return this.animationDuration;\n    }\n    static create(canvases, frameDuration = 1.0) {\n        const frames = [];\n        canvases.forEach(canvas => {\n            frames.push({\n                canvas: canvas,\n                duration: frameDuration\n            });\n        });\n        return new Animation(frames);\n    }\n}\nexports.Animation = Animation;\n\n\n//# sourceURL=webpack:///../src/animation/Animation.ts?");

/***/ }),

/***/ "../src/animation/Animator.ts":
/*!************************************!*\
  !*** ../src/animation/Animator.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Animator {\n    constructor() {\n        this.animationMap = new Map();\n        this.elapsedSeconds = 0;\n    }\n    getCurrentAnimation() {\n        return this.currentAnimation;\n    }\n    setCurrentAnimation(id) {\n        const anim = this.animationMap.get(id);\n        if (anim === undefined) {\n            throw new Error(`Unknown animation id \\\"${id}\\\"`);\n        }\n        if (anim === this.currentAnimation) {\n            return false;\n        }\n        this.currentAnimation = anim;\n        this.elapsedSeconds = 0;\n        return true;\n    }\n    getCurrentFrame() {\n        if (this.currentAnimation === undefined) {\n            return undefined;\n        }\n        return this.currentAnimation.getFrameAtTime(this.elapsedSeconds);\n    }\n    getAnimation(id) {\n        return this.animationMap.get(id);\n    }\n    hasAnimation(id) {\n        return this.animationMap.has(id);\n    }\n    setAnimation(id, animation) {\n        this.animationMap.set(id, animation);\n        if (this.animationMap.size === 1) {\n            this.currentAnimation = animation;\n        }\n    }\n    update(deltaTime) {\n        this.updateAnimationTime(deltaTime);\n    }\n    updateAnimationTime(deltaTime) {\n        if (this.currentAnimation === undefined) {\n            return;\n        }\n        this.elapsedSeconds += deltaTime;\n        this.elapsedSeconds %= this.currentAnimation.getDuration();\n    }\n}\nexports.Animator = Animator;\n\n\n//# sourceURL=webpack:///../src/animation/Animator.ts?");

/***/ }),

/***/ "../src/entity/AnimatedSprite.ts":
/*!***************************************!*\
  !*** ../src/entity/AnimatedSprite.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Animator_1 = __webpack_require__(/*! ../animation/Animator */ \"../src/animation/Animator.ts\");\nconst GameObject_1 = __webpack_require__(/*! ./GameObject */ \"../src/entity/GameObject.ts\");\nclass AnimatedSprite extends GameObject_1.GameObject {\n    constructor(animSets) {\n        super();\n        this.animator = new Animator_1.Animator();\n        animSets.forEach(animSet => {\n            this.animator.setAnimation(animSet[0], animSet[1]);\n        });\n    }\n    setCurrentAnimation(id) {\n        this.animator.setCurrentAnimation(id);\n    }\n    update(deltaTime) {\n        super.update(deltaTime);\n        this.animator.update(deltaTime);\n    }\n    render(ctx, camera) {\n        super.render(ctx, camera, () => {\n            const frame = this.animator.getCurrentFrame();\n            if (frame !== undefined) {\n                const offsetX = frame.canvas.width - 0.5;\n                const offsetY = frame.canvas.height - 0.5;\n                ctx.drawImage(frame.canvas, offsetX, offsetY);\n            }\n        });\n    }\n}\nexports.AnimatedSprite = AnimatedSprite;\n\n\n//# sourceURL=webpack:///../src/entity/AnimatedSprite.ts?");

/***/ }),

/***/ "../src/entity/Entity.ts":
/*!*******************************!*\
  !*** ../src/entity/Entity.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Vector2D_1 = __webpack_require__(/*! ../math/Vector2D */ \"../src/math/Vector2D.ts\");\nclass Entity {\n    constructor(location = Vector2D_1.Vector2D.ZERO) {\n        this.location = location;\n    }\n    getLocation() {\n        return this.location;\n    }\n    move(distance) {\n        this.setLocation(this.location.add(distance));\n    }\n    setLocation(location) {\n        if (this.location.equals(location)) {\n            return;\n        }\n        const delta = location.subtract(this.location);\n        this.location = location;\n        if (this.locationListeners !== undefined) {\n            this.locationListeners.forEach(listener => listener(this.location, delta));\n        }\n    }\n    addLocationListener(listener) {\n        if (this.locationListeners === undefined) {\n            this.locationListeners = new Set();\n        }\n        return this.locationListeners.size !== this.locationListeners.add(listener).size;\n    }\n    containsLocationListener(listener) {\n        return this.locationListeners !== undefined &&\n            this.locationListeners.has(listener);\n    }\n    removeLocationListener(listener) {\n        return this.locationListeners !== undefined &&\n            this.locationListeners.delete(listener);\n    }\n}\nexports.Entity = Entity;\n\n\n//# sourceURL=webpack:///../src/entity/Entity.ts?");

/***/ }),

/***/ "../src/entity/GameObject.ts":
/*!***********************************!*\
  !*** ../src/entity/GameObject.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Entity_1 = __webpack_require__(/*! ./Entity */ \"../src/entity/Entity.ts\");\nclass GameObject extends Entity_1.Entity {\n    update(deltaTime) { }\n    render(ctx, camera, callback) {\n        if (callback != null) {\n            const location = this.getLocation();\n            ctx.translate(location.x, location.y);\n            callback(ctx, camera);\n            ctx.translate(-location.x, -location.y);\n        }\n    }\n}\nexports.GameObject = GameObject;\n\n\n//# sourceURL=webpack:///../src/entity/GameObject.ts?");

/***/ }),

/***/ "../src/entity/Renderable.ts":
/*!***********************************!*\
  !*** ../src/entity/Renderable.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Renderable;\n(function (Renderable) {\n    function isInstance(obj) {\n        return obj.render !== void 0;\n    }\n    Renderable.isInstance = isInstance;\n})(Renderable = exports.Renderable || (exports.Renderable = {}));\n\n\n//# sourceURL=webpack:///../src/entity/Renderable.ts?");

/***/ }),

/***/ "../src/entity/Updatable.ts":
/*!**********************************!*\
  !*** ../src/entity/Updatable.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Updatable;\n(function (Updatable) {\n    function isInstance(obj) {\n        return obj.update !== void 0;\n    }\n    Updatable.isInstance = isInstance;\n})(Updatable = exports.Updatable || (exports.Updatable = {}));\n\n\n//# sourceURL=webpack:///../src/entity/Updatable.ts?");

/***/ }),

/***/ "../src/math/Vector2D.ts":
/*!*******************************!*\
  !*** ../src/math/Vector2D.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Vector2D {\n    constructor(x = 0, y = 0) {\n        this.x = x;\n        this.y = y;\n    }\n    add(vectorOrX, y) {\n        if (vectorOrX instanceof Vector2D) {\n            return this.add(vectorOrX.x, vectorOrX.y);\n        }\n        else if (y !== undefined) {\n            return new Vector2D(this.x + vectorOrX, this.y + y);\n        }\n        else {\n            throw new Error(`Illegal argument y: ${y}`);\n        }\n    }\n    subtract(vectorOrX, y) {\n        if (vectorOrX instanceof Vector2D) {\n            return this.add(-vectorOrX.x, -vectorOrX.y);\n        }\n        else if (y !== undefined) {\n            return this.add(-vectorOrX, -y);\n        }\n        else {\n            throw new Error(`Illegal argument y: ${y}`);\n        }\n    }\n    scale(scalar) {\n        return new Vector2D(this.x * scalar, this.y * scalar);\n    }\n    toFixed(digitCount) {\n        return new Vector2D(Number.parseFloat(this.x.toFixed(digitCount)), Number.parseFloat(this.y.toFixed(digitCount)));\n    }\n    ceil() {\n        return new Vector2D(Math.ceil(this.x), Math.ceil(this.y));\n    }\n    floor() {\n        return new Vector2D(Math.floor(this.x), Math.floor(this.y));\n    }\n    normalize(scalar = 1) {\n        const magnitude = this.getMagnitude();\n        return new Vector2D((this.x / magnitude) * scalar, (this.y / magnitude) * scalar);\n    }\n    getMagnitude() {\n        return Math.sqrt(this.x * this.x + this.y * this.y);\n    }\n    equals(v) {\n        return this.x === v.x && this.y === v.y;\n    }\n    toString() {\n        return `(${this.x}, ${this.y})`;\n    }\n    static createRandom(maxMagnitude) {\n        const randomVector = new Vector2D(Math.random() * 2 - 1.0, Math.random() * 2 - 1.0);\n        return randomVector.normalize(maxMagnitude);\n    }\n}\nVector2D.ZERO = new Vector2D(0, 0);\nVector2D.ONE = new Vector2D(1, 1);\nexports.Vector2D = Vector2D;\n\n\n//# sourceURL=webpack:///../src/math/Vector2D.ts?");

/***/ }),

/***/ "../src/math/geom/Rectangle.ts":
/*!*************************************!*\
  !*** ../src/math/geom/Rectangle.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Vector2D_1 = __webpack_require__(/*! ../Vector2D */ \"../src/math/Vector2D.ts\");\nclass Rectangle {\n    constructor(topLeft, sizeOrWidth, height) {\n        if (sizeOrWidth instanceof Vector2D_1.Vector2D) {\n            this.size = sizeOrWidth;\n        }\n        else if (height !== undefined) {\n            this.size = new Vector2D_1.Vector2D(sizeOrWidth, height);\n        }\n        else {\n            throw new Error(`Illegal argument height: ${height}`);\n        }\n        this.halfSize = this.size.scale(0.5);\n        this.center = topLeft.add(this.halfSize);\n    }\n    getLocation() {\n        return this.center;\n    }\n    getLeft() {\n        return this.center.x - this.halfSize.x;\n    }\n    getRight() {\n        return this.center.x + this.halfSize.x;\n    }\n    getTop() {\n        return this.center.y - this.halfSize.y;\n    }\n    getBottom() {\n        return this.center.y + this.halfSize.y;\n    }\n    getTopLeft() {\n        return this.center.subtract(this.halfSize);\n    }\n    getTopRight() {\n        return this.center.add(this.halfSize.x, -this.halfSize.y);\n    }\n    getCenter() {\n        return this.getLocation();\n    }\n    getBottomLeft() {\n        return this.center.add(-this.halfSize.x, this.halfSize.y);\n    }\n    getBottomRight() {\n        return this.center.add(this.halfSize);\n    }\n    getHalfSize() {\n        return this.halfSize;\n    }\n    getSize() {\n        return this.size;\n    }\n    getWidth() {\n        return this.size.x;\n    }\n    getHeight() {\n        return this.size.y;\n    }\n    contains(point) {\n        const distance = this.center.subtract(point);\n        return distance.x <= this.halfSize.x && distance.y <= this.halfSize.y;\n    }\n}\nexports.Rectangle = Rectangle;\n\n\n//# sourceURL=webpack:///../src/math/geom/Rectangle.ts?");

/***/ }),

/***/ "../src/scene/Camera.ts":
/*!******************************!*\
  !*** ../src/scene/Camera.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Entity_1 = __webpack_require__(/*! ../entity/Entity */ \"../src/entity/Entity.ts\");\nconst Rectangle_1 = __webpack_require__(/*! ../math/geom/Rectangle */ \"../src/math/geom/Rectangle.ts\");\nconst Vector2D_1 = __webpack_require__(/*! ../math/Vector2D */ \"../src/math/Vector2D.ts\");\nclass Camera extends Entity_1.Entity {\n    constructor(viewportSize, location = Vector2D_1.Vector2D.ZERO, zOrder = 0) {\n        super(location);\n        this.viewport = this.createViewport(viewportSize);\n        this.zOrder = zOrder;\n        this.addLocationListener((_, delta) => this.moveViewport(delta));\n    }\n    moveViewport(distance) {\n        const newLocation = this.viewport.getLocation().add(distance);\n        this.viewport = new Rectangle_1.Rectangle(newLocation, this.viewport.getSize());\n    }\n    createViewport(size) {\n        const viewportLoc = this.getLocation().subtract(size.scale(0.5));\n        return new Rectangle_1.Rectangle(viewportLoc, size);\n    }\n    getViewport() {\n        return this.viewport;\n    }\n    setViewportSize(newSize) {\n        const oldViewportSize = this.viewport.getSize();\n        if (oldViewportSize.equals(newSize)) {\n            return false;\n        }\n        this.viewport = this.createViewport(newSize);\n        return true;\n    }\n    getZOrder() {\n        return this.zOrder;\n    }\n    setZOrder(z) {\n        if (this.zOrder === z) {\n            return;\n        }\n        const oldZ = this.zOrder;\n        this.zOrder = z;\n        if (this.zOrderListeners !== undefined) {\n            this.zOrderListeners.forEach(listener => listener(oldZ, this.zOrder));\n        }\n    }\n    addZOrderListener(listener) {\n        if (this.zOrderListeners === undefined) {\n            this.zOrderListeners = new Set();\n        }\n        return this.zOrderListeners.size !== this.zOrderListeners.add(listener).size;\n    }\n    containsZOrderListener(listener) {\n        return this.zOrderListeners !== undefined &&\n            this.zOrderListeners.has(listener);\n    }\n    removeZOrderListener(listener) {\n        return this.zOrderListeners !== undefined &&\n            this.zOrderListeners.delete(listener);\n    }\n}\nexports.Camera = Camera;\n\n\n//# sourceURL=webpack:///../src/scene/Camera.ts?");

/***/ }),

/***/ "../src/scene/Layer.ts":
/*!*****************************!*\
  !*** ../src/scene/Layer.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Renderable_1 = __webpack_require__(/*! ../entity/Renderable */ \"../src/entity/Renderable.ts\");\nconst Updatable_1 = __webpack_require__(/*! ../entity/Updatable */ \"../src/entity/Updatable.ts\");\nclass Layer {\n    constructor(zOrder = 1) {\n        this.zOrder = zOrder;\n        this.updatables = new Set();\n        this.renderables = new Set();\n    }\n    addObject(object) {\n        let added = false;\n        if (Updatable_1.Updatable.isInstance(object)) {\n            added = this.updatables.size !== this.updatables.add(object).size;\n        }\n        if (Renderable_1.Renderable.isInstance(object)) {\n            added = this.renderables.size !== this.renderables.add(object).size || added;\n        }\n        return added;\n    }\n    containsObject(object) {\n        return (Updatable_1.Updatable.isInstance(object) && this.updatables.has(object)) ||\n            (Renderable_1.Renderable.isInstance(object) && this.renderables.has(object));\n    }\n    removeObject(object) {\n        let removed = false;\n        if (Updatable_1.Updatable.isInstance(object)) {\n            removed = this.updatables.delete(object);\n        }\n        if (Renderable_1.Renderable.isInstance(object)) {\n            removed = this.renderables.delete(object) || removed;\n        }\n        return removed;\n    }\n    removeAllObjects() {\n        this.updatables.clear();\n        this.renderables.clear();\n    }\n    getZOrder() {\n        return this.zOrder;\n    }\n    setZOrder(z) {\n        this.zOrder = z;\n    }\n    addZOrderListener(listener) {\n        if (this.zOrderListeners === undefined) {\n            this.zOrderListeners = new Set();\n        }\n        return this.zOrderListeners.size !== this.zOrderListeners.add(listener).size;\n    }\n    containsZOrderListener(listener) {\n        return this.zOrderListeners != undefined && this.zOrderListeners.has(listener);\n    }\n    removeZOrderListener(listener) {\n        return this.zOrderListeners != undefined && this.zOrderListeners.delete(listener);\n    }\n    update(deltaTime) {\n        this.updatables.forEach(obj => obj.update(deltaTime));\n    }\n    render(ctx, camera, callback) {\n        const relativeZOrder = this.getZOrder() - camera.getZOrder();\n        if (relativeZOrder <= 0) {\n            return;\n        }\n        this.renderables.forEach(obj => obj.render(ctx, camera, callback));\n        if (callback !== undefined) {\n            callback(ctx, camera);\n        }\n    }\n}\nexports.Layer = Layer;\n\n\n//# sourceURL=webpack:///../src/scene/Layer.ts?");

/***/ }),

/***/ "../src/util/CanvasUtils.ts":
/*!**********************************!*\
  !*** ../src/util/CanvasUtils.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Rectangle_1 = __webpack_require__(/*! ../math/geom/Rectangle */ \"../src/math/geom/Rectangle.ts\");\nconst Vector2D_1 = __webpack_require__(/*! ../math/Vector2D */ \"../src/math/Vector2D.ts\");\nclass CanvasUtils {\n    static create(width, height, callback) {\n        const canvas = document.createElement('canvas');\n        canvas.width = width;\n        canvas.height = height;\n        if (callback !== undefined) {\n            callback(canvas.getContext(\"2d\"));\n        }\n        return canvas;\n    }\n    static getSubCanvas(canvas, dest) {\n        const width = dest.getWidth();\n        const height = dest.getHeight();\n        return this.create(width, height, ctx => {\n            const topLeft = dest.getTopLeft();\n            ctx.drawImage(canvas, topLeft.x, topLeft.y, width, height, 0, 0, width, height);\n        });\n    }\n    static imageToCanvas(image) {\n        return CanvasUtils.create(image.width, image.height, ctx => {\n            ctx.drawImage(image, 0, 0);\n        });\n    }\n    static split(canvas, columns, rows) {\n        const canvases = [];\n        const size = new Vector2D_1.Vector2D(Math.floor(canvas.width / columns), Math.floor(canvas.height / rows));\n        for (let y = 0; y < rows; y++) {\n            for (let x = 0; x < columns; x++) {\n                const dest = new Rectangle_1.Rectangle(new Vector2D_1.Vector2D(x * size.x, y * size.y), size);\n                canvases.push(CanvasUtils.getSubCanvas(canvas, dest));\n            }\n        }\n        return canvases;\n    }\n}\nexports.CanvasUtils = CanvasUtils;\n\n\n//# sourceURL=webpack:///../src/util/CanvasUtils.ts?");

/***/ }),

/***/ "../src/util/asset/AssetLoader.ts":
/*!****************************************!*\
  !*** ../src/util/asset/AssetLoader.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst CanvasUtils_1 = __webpack_require__(/*! ../CanvasUtils */ \"../src/util/CanvasUtils.ts\");\nclass AssetLoader {\n    static loadImageFile(url) {\n        return new Promise((resolve, reject) => {\n            const image = new Image();\n            image.onload = () => {\n                resolve(CanvasUtils_1.CanvasUtils.imageToCanvas(image));\n            };\n            image.onerror = (e) => {\n                reject(e);\n            };\n            image.src = url;\n        });\n    }\n}\nexports.AssetLoader = AssetLoader;\n\n\n//# sourceURL=webpack:///../src/util/asset/AssetLoader.ts?");

/***/ }),

/***/ "./src/ts/asset/Assets.ts":
/*!********************************!*\
  !*** ./src/ts/asset/Assets.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst AssetLoader_1 = __webpack_require__(/*! ../../../../src/util/asset/AssetLoader */ \"../src/util/asset/AssetLoader.ts\");\nclass Assets {\n    static loadAll() {\n        const promises = [];\n        const playerSheetPath = `${Assets.imageDir}/spritesheets/platformerPack_character.png`;\n        promises.push(AssetLoader_1.AssetLoader.loadImageFile(playerSheetPath).then(canvas => {\n            Assets.SHEET_PLAYER = canvas;\n        }));\n        return Promise.all(promises).then(() => { });\n    }\n}\nAssets.imageDir = '../resources/images';\nexports.Assets = Assets;\n\n\n//# sourceURL=webpack:///./src/ts/asset/Assets.ts?");

/***/ }),

/***/ "./src/ts/entities/Player.ts":
/*!***********************************!*\
  !*** ./src/ts/entities/Player.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Animation_1 = __webpack_require__(/*! ../../../../src/animation/Animation */ \"../src/animation/Animation.ts\");\nconst AnimatedSprite_1 = __webpack_require__(/*! ../../../../src/entity/AnimatedSprite */ \"../src/entity/AnimatedSprite.ts\");\nconst CanvasUtils_1 = __webpack_require__(/*! ../../../../src/util/CanvasUtils */ \"../src/util/CanvasUtils.ts\");\nconst Assets_1 = __webpack_require__(/*! ../asset/Assets */ \"./src/ts/asset/Assets.ts\");\nclass Player extends AnimatedSprite_1.AnimatedSprite {\n    constructor() {\n        const canvases = CanvasUtils_1.CanvasUtils.split(Assets_1.Assets.SHEET_PLAYER, 4, 2);\n        const animations = [];\n        const idleAnim = Animation_1.Animation.create([canvases[0]]);\n        animations.push(['idle', idleAnim]);\n        const walkingFrameDuration = 0.25;\n        const walkingAnim = Animation_1.Animation.create([canvases[3], canvases[2]], walkingFrameDuration);\n        animations.push(['walking', walkingAnim]);\n        const jumpingAnim = Animation_1.Animation.create([canvases[1]]);\n        animations.push(['jumping', jumpingAnim]);\n        super(animations);\n        this.setCurrentAnimation('walking');\n    }\n}\nexports.Player = Player;\n\n\n//# sourceURL=webpack:///./src/ts/entities/Player.ts?");

/***/ }),

/***/ "./src/ts/entry.ts":
/*!*************************!*\
  !*** ./src/ts/entry.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Game_1 = __webpack_require__(/*! ../../../src/Game */ \"../src/Game.ts\");\nconst Assets_1 = __webpack_require__(/*! ./asset/Assets */ \"./src/ts/asset/Assets.ts\");\nconst MyLayer_1 = __webpack_require__(/*! ./scenes/MyLayer */ \"./src/ts/scenes/MyLayer.ts\");\nconst gameName = `My Game`;\nconsole.log(`[${gameName}] Loading assets...`);\nconst assetPromise = Assets_1.Assets.loadAll();\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\nconsole.log(`[${gameName}] Canvas loaded.`);\nassetPromise.then(() => {\n    console.log(`[${gameName}] Assets loaded.`);\n    const game = new Game_1.Game(ctx);\n    game.setContent(new MyLayer_1.MyLayer());\n    game.start();\n    console.log(`[${gameName}] Game Started.`);\n});\nassetPromise.catch(reason => {\n    console.error(`Failed to load assets!\\n${reason}`);\n});\n\n\n//# sourceURL=webpack:///./src/ts/entry.ts?");

/***/ }),

/***/ "./src/ts/scenes/MyLayer.ts":
/*!**********************************!*\
  !*** ./src/ts/scenes/MyLayer.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Vector2D_1 = __webpack_require__(/*! ../../../../src/math/Vector2D */ \"../src/math/Vector2D.ts\");\nconst Layer_1 = __webpack_require__(/*! ../../../../src/scene/Layer */ \"../src/scene/Layer.ts\");\nconst Player_1 = __webpack_require__(/*! ../entities/Player */ \"./src/ts/entities/Player.ts\");\nclass MyLayer extends Layer_1.Layer {\n    constructor() {\n        super();\n        this.player = new Player_1.Player();\n        this.player.setLocation(new Vector2D_1.Vector2D(300, 200));\n        this.addObject(this.player);\n    }\n}\nexports.MyLayer = MyLayer;\n\n\n//# sourceURL=webpack:///./src/ts/scenes/MyLayer.ts?");

/***/ })

/******/ });