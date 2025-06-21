"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Launcher_1 = __importDefault(require("../../Launcher"));
const UniFont_1 = __importDefault(require("../UniFont"));
class NativeContextMenuHandler {
    constructor() {
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
        this.contextMenuInput.addEventListener("input", (ev) => {
            var _a;
            if (this.contextMenuInput.value != null) {
                let val = this.contextMenuInput.value;
                this.contextMenuInput.value = "";
                (_a = this.ctxItemMap.get(val)) === null || _a === void 0 ? void 0 : _a.call(null);
                this.timesChanged++;
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        if (this.timesChanged == 4) { // chrome is weird and closes input list after 5 times displayed in a row until next user input
                            this.close();
                        }
                    });
                });
            }
        });
        this.contextMenuInput.addEventListener("focusout", (ev) => {
            this.close();
        });
        this.contextMenuInput.addEventListener("close", (ev) => {
            this.close();
        });
        this.contextMenuInput.addEventListener("blur", (ev) => {
            this.close();
        });
    }
    add(opt) {
        let text = opt.text;
        if (opt.hasSecondary != null) {
            if (opt.hasSecondary) {
                text = "\u2630\u2001" + text;
            }
        }
        if (opt.onselect == null) {
            opt.onselect = () => { };
        }
        if (opt.title != null) {
            if (opt.title) {
                opt.onselect = () => { this.show(this.contextOptions); };
            }
        }
        if (opt.font != null) {
            text = UniFont_1.default.make(text, opt.font);
        }
        this.ctxItemMap.set(text, opt.onselect);
        let optElem = document.createElement("option");
        optElem.value = text;
        if (opt.desc != null && opt.desc != "") {
            if (opt.descFont != null) {
                opt.desc = UniFont_1.default.make(opt.desc, opt.descFont);
            }
            optElem.innerHTML = opt.desc;
        }
        this.ctxMenuItems.appendChild(optElem);
    }
    create() { }
    update(delta) { }
    clear() {
        try {
            document.body.removeChild(this.ctxMenuItems);
        }
        catch (_a) { }
        this.ctxMenuItems = document.createElement("datalist");
        this.ctxMenuItems.id = Math.random().toString(36).substring(2, 5);
        this.contextMenuInput.setAttribute("list", this.ctxMenuItems.id);
        document.body.appendChild(this.ctxMenuItems);
        this.ctxItemMap.clear();
    }
    close() {
        this.isOpen = false;
        this.clear();
    }
    show(options, x, y) {
        requestAnimationFrame(() => {
            this.isOpen = true;
            this.contextOptions = options;
            this.clear();
            options.forEach((opt) => {
                this.add(opt);
            });
            this.add({
                text: "Close", font: UniFont_1.default.BOLD, onselect: () => {
                    this.close();
                }
            });
            if (x == null) {
                x = Launcher_1.default.mx;
            }
            if (y == null) {
                y = Launcher_1.default.my;
            }
            this.contextMenuInput.style.width = "50px";
            this.contextMenuInput.style.height = "50px";
            this.contextMenuInput.style.left = x - 20 + "px";
            this.contextMenuInput.style.top = y - 50 + "px";
            try {
                if ("showPicker" in this.contextMenuInput) {
                    this.contextMenuInput.showPicker();
                }
                else {
                    alert("Your browser does not support context menus at the moment,\n");
                    alert("Please join discord (chat icon) for updates.");
                }
            }
            catch (_a) { }
            // go away so it doesnt interfere with user input
            this.contextMenuInput.style.top = "-999px";
            this.contextMenuInput.style.left = "-999px";
            this.contextMenuInput.style.width = "0px";
            this.contextMenuInput.style.height = "0px";
        });
    }
    destroy() {
    }
}
exports.default = NativeContextMenuHandler;
