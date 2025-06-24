"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UniFont_1 = __importDefault(require("../UniFont"));
var CustomContextMenuHandler = /** @class */ (function () {
    function CustomContextMenuHandler(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.ctxItemMap = new Map();
        this.isOpen = false;
        this.contextOptions = [];
        this.x = x;
        this.y = y;
        this.ctxMenu = document.getElementById("ctxmenu");
        this.ctxMenuItems = document.getElementById("ctxbox");
    }
    CustomContextMenuHandler.prototype.create = function () {
    };
    CustomContextMenuHandler.prototype.update = function (elapsed) {
    };
    CustomContextMenuHandler.prototype.destroy = function () {
    };
    CustomContextMenuHandler.prototype.clear = function () {
        this.ctxItemMap.clear();
        this.ctxMenuItems.remove();
        this.ctxMenuItems = document.createElement('div');
        this.ctxMenuItems.id = 'ctxbox';
        this.ctxMenu.appendChild(this.ctxMenuItems);
    };
    CustomContextMenuHandler.prototype.close = function () {
        var _this = this;
        requestAnimationFrame(function () {
            _this.isOpen = false;
            _this.clear();
            _this.ctxMenu.style.display = 'none';
            _this.ctxMenuItems.style.display = 'none';
        });
    };
    CustomContextMenuHandler.prototype.show = function (options, mx, my) {
        var _this = this;
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                _this.isOpen = true;
                _this.ctxMenu.style.display = '';
                var cx = 0;
                var cy = 0;
                if (mx != undefined && my != undefined) {
                    cx = mx;
                    cy = my;
                    _this.x = cx;
                    _this.y = cy;
                }
                _this.ctxMenu.style.left = _this.x - 15 + 'px';
                _this.ctxMenu.style.top = _this.y + 'px';
                _this.clear();
                options.forEach(function (opt) {
                    _this.add(opt, _this.x, _this.y);
                });
                _this.add({
                    text: "Close", font: UniFont_1.default.BOLD, onselect: function () {
                        _this.close();
                    }
                }, _this.x, _this.y);
            });
        });
        //setTimeout(() => { /this.ctxMenu.style.display = ''; }, 0);
    };
    CustomContextMenuHandler.prototype.add = function (opt, mx, my) {
        var _this = this;
        var text = opt.text;
        if (opt.hasSecondary != null) {
            if (opt.hasSecondary) {
                text = "\u2630\u2001" + text;
            }
        }
        if (opt.onselect == null) {
            opt.onselect = function () { };
        }
        if (opt.title != null) {
            if (opt.title) {
                opt.onselect = function () { _this.show(_this.contextOptions, mx, my); };
            }
        }
        this.ctxItemMap.set(text, opt.onselect);
        var optElem = document.createElement("div");
        optElem.addEventListener("mouseup", function (ev) {
            if (opt.onselect == undefined)
                return;
            opt.onselect();
            if (opt.hasSecondary == undefined || opt.hasSecondary != true) {
                _this.close();
            }
        });
        optElem.addEventListener("touchend", function (ev) {
            if (opt.onselect == undefined)
                return;
            opt.onselect();
            if (opt.hasSecondary == undefined || opt.hasSecondary != true) {
                _this.close();
            }
        });
        optElem.setAttribute("class", "ctxitem");
        if (opt.font == UniFont_1.default.BOLD) {
            optElem.innerHTML = "<b>" + text + "</b>";
        }
        else if (opt.font == UniFont_1.default.ITALIC) {
            optElem.innerHTML = "<i>" + text + "</i>";
        }
        else if (opt.font != null) {
            text = UniFont_1.default.make(text, opt.font);
            optElem.innerText = text;
        }
        else {
            optElem.innerText = text;
        }
        this.ctxMenuItems.appendChild(optElem);
    };
    return CustomContextMenuHandler;
}());
exports.default = CustomContextMenuHandler;
