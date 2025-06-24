"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Launcher_1 = __importDefault(require("../../Launcher"));
var UniFont_1 = __importDefault(require("../UniFont"));
var NativeContextMenuHandler = /** @class */ (function () {
    function NativeContextMenuHandler() {
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.ctxItemMap = new Map();
        this.isOpen = false;
        this.timesChanged = 0;
        this.contextOptions = [];
        // Context Menu
        this.contextMenuInput = document.createElement("input");
        this.contextMenuInput.setAttribute("type", 'list');
        /*
        Dead ass, this stupid shit fixed chrome saying "Would you like to use strong password?" even though IT IS A LIST ELEMENT
        WTF IT TOOK ME 1 HOUR
        */
        this.contextMenuInput.setAttribute("name", 'ContextMenu');
        this.contextMenuInput.style.width = "0px";
        this.contextMenuInput.style.height = "0px";
        this.contextMenuInput.style.position = "absolute";
        this.contextMenuInput.style.zIndex = "10";
        this.contextMenuInput.style.backgroundColor = "black";
        document.body.appendChild(this.contextMenuInput);
        this.clear();
        this.contextMenuInput.style.top = "-999px";
        this.contextMenuInput.style.left = "-999px";
        // On input  
        this.contextMenuInput.addEventListener("input", function (ev) {
            var _a;
            if (_this.contextMenuInput.value != null) {
                var val = _this.contextMenuInput.value;
                _this.contextMenuInput.value = "";
                (_a = _this.ctxItemMap.get(val)) === null || _a === void 0 ? void 0 : _a.call(null);
                _this.timesChanged++;
                requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                        if (_this.timesChanged == 4) { // chrome is weird and closes input list after 5 times displayed in a row until next user input
                            _this.close();
                        }
                    });
                });
            }
        });
        this.contextMenuInput.addEventListener("focusout", function (ev) {
            _this.close();
        });
        this.contextMenuInput.addEventListener("close", function (ev) {
            _this.close();
        });
        this.contextMenuInput.addEventListener("blur", function (ev) {
            _this.close();
        });
    }
    NativeContextMenuHandler.prototype.add = function (opt) {
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
                opt.onselect = function () { _this.show(_this.contextOptions); };
            }
        }
        if (opt.font != null) {
            text = UniFont_1.default.make(text, opt.font);
        }
        this.ctxItemMap.set(text, opt.onselect);
        var optElem = document.createElement("option");
        optElem.value = text;
        if (opt.desc != null && opt.desc != "") {
            if (opt.descFont != null) {
                opt.desc = UniFont_1.default.make(opt.desc, opt.descFont);
            }
            optElem.innerHTML = opt.desc;
        }
        this.ctxMenuItems.appendChild(optElem);
    };
    NativeContextMenuHandler.prototype.create = function () { };
    NativeContextMenuHandler.prototype.update = function (delta) { };
    NativeContextMenuHandler.prototype.clear = function () {
        try {
            document.body.removeChild(this.ctxMenuItems);
        }
        catch (_a) { }
        this.ctxMenuItems = document.createElement("datalist");
        this.ctxMenuItems.id = Math.random().toString(36).substring(2, 5);
        this.contextMenuInput.setAttribute("list", this.ctxMenuItems.id);
        document.body.appendChild(this.ctxMenuItems);
        this.ctxItemMap.clear();
    };
    NativeContextMenuHandler.prototype.close = function () {
        this.isOpen = false;
        this.clear();
    };
    NativeContextMenuHandler.prototype.show = function (options, x, y) {
        var _this = this;
        requestAnimationFrame(function () {
            _this.isOpen = true;
            _this.contextOptions = options;
            _this.clear();
            options.forEach(function (opt) {
                _this.add(opt);
            });
            _this.add({
                text: "Close", font: UniFont_1.default.BOLD, onselect: function () {
                    _this.close();
                }
            });
            if (x == null) {
                x = Launcher_1.default.mx;
            }
            if (y == null) {
                y = Launcher_1.default.my;
            }
            _this.contextMenuInput.style.width = "50px";
            _this.contextMenuInput.style.height = "50px";
            _this.contextMenuInput.style.left = x - 20 + "px";
            _this.contextMenuInput.style.top = y - 50 + "px";
            try {
                if ("showPicker" in _this.contextMenuInput) {
                    _this.contextMenuInput.showPicker();
                }
                else {
                    alert("Your browser does not support context menus at the moment,\n");
                    alert("Please join discord (chat icon) for updates.");
                }
            }
            catch (_a) { }
            // go away so it doesnt interfere with user input
            _this.contextMenuInput.style.top = "-999px";
            _this.contextMenuInput.style.left = "-999px";
            _this.contextMenuInput.style.width = "0px";
            _this.contextMenuInput.style.height = "0px";
        });
    };
    NativeContextMenuHandler.prototype.destroy = function () {
    };
    return NativeContextMenuHandler;
}());
exports.default = NativeContextMenuHandler;
