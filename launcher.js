/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./launcher/Launcher.ts":
/*!******************************!*\
  !*** ./launcher/Launcher.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst LauncherState_1 = __importDefault(__webpack_require__(/*! ./gamesandthings/LauncherState */ \"./launcher/gamesandthings/LauncherState.ts\"));\nconst MouseHandler_1 = __importDefault(__webpack_require__(/*! ./gamesandthings/MouseHandler */ \"./launcher/gamesandthings/MouseHandler.ts\"));\nclass Launcher {\n    static init(state) {\n        document.writeln('<canvas id=\"cnv\"></canvas>');\n        document.body.style.margin = \"0px\";\n        this.mouse = new MouseHandler_1.default();\n        this.mouse.init();\n        Launcher.cnv = document.getElementById(\"cnv\");\n        Launcher.cnv.id = \"cnv\";\n        Launcher.ctx = Launcher.cnv.getContext(\"2d\", { desynchronized: true });\n        Launcher.state = state;\n        Launcher.state.create();\n        Launcher.update(0);\n    }\n    static update(timestep) {\n        Launcher.cnv.style.width = \"100%\";\n        Launcher.cnv.style.height = \"100%\";\n        Launcher.cnv.setAttribute(\"width\", Launcher.cnv.offsetWidth + \"\");\n        Launcher.cnv.setAttribute(\"height\", Launcher.cnv.offsetHeight + \"\");\n        Launcher.delta = ((timestep - Launcher.lastTimestep) / 1000);\n        Launcher.ctx.fillRect(0, 0, Launcher.cnv.width, Launcher.cnv.height);\n        Launcher.state.draw();\n        Launcher.state.update(Launcher.delta);\n        Launcher.lastTimestep = timestep;\n        Launcher.mouse.resetDeltas();\n        requestAnimationFrame(Launcher.update);\n    }\n}\nLauncher.lastTimestep = 0;\nLauncher.delta = 0;\nexports[\"default\"] = Launcher;\nLauncher.init(new LauncherState_1.default());\n\n\n//# sourceURL=webpack:///./launcher/Launcher.ts?");

/***/ }),

/***/ "./launcher/gamesandthings/LauncherState.ts":
/*!**************************************************!*\
  !*** ./launcher/gamesandthings/LauncherState.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Sprite_1 = __importDefault(__webpack_require__(/*! ./Sprite */ \"./launcher/gamesandthings/Sprite.ts\"));\nconst State_1 = __importDefault(__webpack_require__(/*! ./State */ \"./launcher/gamesandthings/State.ts\"));\nclass LauncherState extends State_1.default {\n    constructor() {\n        super(...arguments);\n        this.logo = new Sprite_1.default();\n    }\n    create() {\n        let img = new Image();\n        img.src = \"https://user-images.githubusercontent.com/68365423/199411065-61e6c76c-72c0-46f3-9e8d-195eb69f58f5.png\";\n        img.style.display = \"none\";\n        document.body.appendChild(img);\n        this.logo.loadGraphic(img);\n        this.add(this.logo);\n    }\n    update(elapsed) {\n        super.update(elapsed);\n    }\n}\nexports[\"default\"] = LauncherState;\n\n\n//# sourceURL=webpack:///./launcher/gamesandthings/LauncherState.ts?");

/***/ }),

/***/ "./launcher/gamesandthings/MouseHandler.ts":
/*!*************************************************!*\
  !*** ./launcher/gamesandthings/MouseHandler.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass MouseHandler {\n    constructor() {\n        this.x = 0;\n        this.y = 0;\n        this.deltaX = 0;\n        this.deltaY = 0;\n        this.mouseMap = new Map();\n    }\n    init() {\n        window.addEventListener(\"mousedown\", (ev) => { this.onMouseDown(ev); });\n        window.addEventListener(\"mouseenter\", (ev) => { this.onMouseEnter(ev); });\n        window.addEventListener(\"mouseleave\", (ev) => { this.onMouseLeave(ev); });\n        window.addEventListener(\"mousemove\", (ev) => { this.onMouseMove(ev); });\n        window.addEventListener(\"mouseout\", (ev) => { this.onMouseOut(ev); });\n        window.addEventListener(\"mouseover\", (ev) => { this.onMouseOver(ev); });\n        window.addEventListener(\"mouseup\", (ev) => { this.onMouseUp(ev); });\n        window.addEventListener(\"contextmenu\", (ev) => {\n            this.onContextMenu(ev);\n            return false;\n        });\n    }\n    onMouseDown(ev) {\n        this.mouseMap.set(ev.button, true);\n        this.getPosFromEvent(ev);\n    }\n    onMouseEnter(ev) {\n        this.getPosFromEvent(ev);\n    }\n    onMouseLeave(ev) {\n        this.getPosFromEvent(ev);\n    }\n    onMouseMove(ev) {\n        this.getPosFromEvent(ev);\n    }\n    onMouseOut(ev) {\n        this.getPosFromEvent(ev);\n    }\n    onMouseOver(ev) {\n        this.getPosFromEvent(ev);\n    }\n    onMouseUp(ev) {\n        this.mouseMap.set(ev.button, false);\n        this.getPosFromEvent(ev);\n    }\n    onContextMenu(ev) {\n        ev.preventDefault();\n        this.getPosFromEvent(ev);\n    }\n    isMBDown(button) {\n        if (!this.mouseMap.has(button)) {\n            return false;\n        }\n        else {\n            return !!(this.mouseMap.get(button));\n        }\n    }\n    getPosFromEvent(ev) {\n        this.x = ev.x;\n        this.y = ev.y;\n        this.deltaX = ev.movementX;\n        this.deltaY = ev.movementY;\n    }\n    resetDeltas() {\n        this.deltaX = 0;\n        this.deltaY = 0;\n    }\n}\nexports[\"default\"] = MouseHandler;\n\n\n//# sourceURL=webpack:///./launcher/gamesandthings/MouseHandler.ts?");

/***/ }),

/***/ "./launcher/gamesandthings/Sprite.ts":
/*!*******************************************!*\
  !*** ./launcher/gamesandthings/Sprite.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Launcher_1 = __importDefault(__webpack_require__(/*! ../Launcher */ \"./launcher/Launcher.ts\"));\nclass Sprite {\n    constructor() {\n        this.x = 0;\n        this.y = 0;\n        this.width = 0;\n        this.height = 0;\n    }\n    draw() {\n        if (this.graphic != null) {\n            this.graphic.width = this.width;\n            this.graphic.height = this.height;\n            Launcher_1.default.ctx.drawImage(this.graphic, this.x, this.y, this.width, this.height);\n        }\n    }\n    loadGraphic(img) {\n        img.addEventListener(\"load\", (ev) => {\n            this.graphic = img;\n            this.width = img.width;\n            this.height = img.height;\n        });\n    }\n    create() {\n    }\n    update(elapsed) {\n    }\n    destroy() {\n    }\n}\nexports[\"default\"] = Sprite;\n\n\n//# sourceURL=webpack:///./launcher/gamesandthings/Sprite.ts?");

/***/ }),

/***/ "./launcher/gamesandthings/State.ts":
/*!******************************************!*\
  !*** ./launcher/gamesandthings/State.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass State {\n    constructor() {\n        this.members = [];\n    }\n    create() {\n    }\n    draw() {\n        this.members.forEach((drawable) => { drawable.draw(); });\n    }\n    update(elapsed) {\n        this.members.forEach((sprite) => {\n            sprite.update(elapsed);\n        });\n    }\n    destroy() {\n    }\n    add(member) {\n        this.members.push(member);\n        member.create();\n    }\n}\nexports[\"default\"] = State;\n\n\n//# sourceURL=webpack:///./launcher/gamesandthings/State.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./launcher/Launcher.ts");
/******/ 	
/******/ })()
;