"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Launcher_1 = __importDefault(require("../Launcher"));
var FilterHandler = /** @class */ (function () {
    function FilterHandler() {
        this._blur = 0;
        this._grayscale = false;
        this._sepia = 0;
        this._saturate = 1;
        this._contrast = 1;
        this._invert = false;
        this.updateFilterCSS();
    }
    Object.defineProperty(FilterHandler.prototype, "blur", {
        get: function () {
            return this._blur;
        },
        set: function (value) {
            this._blur = value;
            this.updateFilterCSS();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FilterHandler.prototype, "grayscale", {
        get: function () {
            return this._grayscale;
        },
        set: function (state) {
            this._grayscale = state;
            this.updateFilterCSS();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FilterHandler.prototype, "saturate", {
        get: function () {
            return this._saturate;
        },
        set: function (value) {
            this._saturate = value;
            this.updateFilterCSS();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FilterHandler.prototype, "sepia", {
        get: function () {
            return this._sepia;
        },
        set: function (value) {
            this._sepia = value;
            this.updateFilterCSS();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FilterHandler.prototype, "contrast", {
        get: function () {
            return this._contrast;
        },
        set: function (value) {
            this._contrast = value;
            this.updateFilterCSS();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FilterHandler.prototype, "invert", {
        get: function () {
            return this._invert;
        },
        set: function (state) {
            this._invert = state;
            this.updateFilterCSS();
        },
        enumerable: false,
        configurable: true
    });
    FilterHandler.prototype.updateFilterCSS = function () {
        Launcher_1.default.iframe.style.filter = this.generateFilterText();
    };
    FilterHandler.prototype.generateFilterText = function () {
        var filterText = "";
        if (this._blur > 0) {
            filterText += "blur(".concat(this._blur, "rem)");
        }
        if (this._grayscale) {
            filterText += "grayscale()";
        }
        if (this._saturate != 1.0) {
            filterText += "saturate(".concat(this._saturate, ")");
        }
        if (this._contrast != 1.0) {
            filterText += "contrast(".concat(this._contrast, ")");
        }
        if (this._sepia > 0) {
            filterText += "sepia(".concat(this._sepia, ")");
        }
        if (this._invert) {
            filterText += "invert()";
        }
        return filterText;
    };
    return FilterHandler;
}());
exports.default = FilterHandler;
