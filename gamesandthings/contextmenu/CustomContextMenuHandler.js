"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UniFont_1 = __importDefault(require("../UniFont"));
class CustomContextMenuHandler {
    constructor(x = 0, y = 0) {
        this.ctxItemMap = new Map();
        this.isOpen = false;
        this.contextOptions = [];
        this.x = x;
        this.y = y;
        this.ctxMenu = document.getElementById("ctxmenu");
        this.ctxMenuItems = document.getElementById("ctxbox");
    }
    create() {
    }
    update(elapsed) {
    }
    destroy() {
    }
    clear() {
        this.ctxItemMap.clear();
        this.ctxMenuItems.remove();
        this.ctxMenuItems = document.createElement('div');
        this.ctxMenuItems.id = 'ctxbox';
        this.ctxMenu.appendChild(this.ctxMenuItems);
    }
    close() {
        requestAnimationFrame(() => {
            this.isOpen = false;
            this.clear();
            this.ctxMenu.style.display = 'none';
            this.ctxMenuItems.style.display = 'none';
        });
    }
    show(options, mx, my) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.isOpen = true;
                this.ctxMenu.style.display = '';
                let cx = 0;
                let cy = 0;
                if (mx != undefined && my != undefined) {
                    cx = mx;
                    cy = my;
                    this.x = cx;
                    this.y = cy;
                }
                this.ctxMenu.style.left = this.x - 15 + 'px';
                this.ctxMenu.style.top = this.y + 'px';
                this.clear();
                options.forEach((opt) => {
                    this.add(opt, this.x, this.y);
                });
                this.add({
                    text: "Close", font: UniFont_1.default.BOLD, onselect: () => {
                        this.close();
                    }
                }, this.x, this.y);
            });
        });
        //setTimeout(() => { /this.ctxMenu.style.display = ''; }, 0);
    }
    add(opt, mx, my) {
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
                opt.onselect = () => { this.show(this.contextOptions, mx, my); };
            }
        }
        this.ctxItemMap.set(text, opt.onselect);
        let optElem = document.createElement("div");
        optElem.addEventListener("mouseup", (ev) => {
            if (opt.onselect == undefined)
                return;
            opt.onselect();
            if (opt.hasSecondary == undefined || opt.hasSecondary != true) {
                this.close();
            }
        });
        optElem.addEventListener("touchend", (ev) => {
            if (opt.onselect == undefined)
                return;
            opt.onselect();
            if (opt.hasSecondary == undefined || opt.hasSecondary != true) {
                this.close();
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
    }
}
exports.default = CustomContextMenuHandler;
