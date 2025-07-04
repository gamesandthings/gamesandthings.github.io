import { ContextOption } from "./ContextOption";
import IPositionable from "../interfaces/IPositionable";
import IContextMenu from "./IContextMenu";
import UniFont from "../UniFont";
import Launcher from "../../Launcher";
export default class CustomContextMenuHandler implements IPositionable, IContextMenu {
    x: number;
    y: number;
    ctxMenu: HTMLDivElement;
    ctxMenuItems: HTMLDivElement;
    ctxItemMap: Map<string, () => void> = new Map<string, () => void>();
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
        this.ctxMenu = (document.getElementById("ctxmenu") as HTMLDivElement);

        this.ctxMenuItems = (document.getElementById("ctxbox") as HTMLDivElement);
    }
    isOpen: boolean = false;
    create(): void {

    }
    update(elapsed: number): void {
    }
    destroy(): void {
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
    show(options: Array<ContextOption>, mx?: number, my?: number) {
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
                })
                this.add({
                    text: "Close", font: UniFont.BOLD, onselect: () => {
                        this.close();
                    }
                }, this.x, this.y);
            });
        });
        //setTimeout(() => { /this.ctxMenu.style.display = ''; }, 0);
    }
    contextOptions: Array<ContextOption> = [];
    add(opt: ContextOption, mx: number, my: number) {
        let text: string = opt.text;
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
                opt.onselect = () => { this.show(this.contextOptions, mx, my) };
            }
        }
        this.ctxItemMap.set(text, opt.onselect);
        let optElem: HTMLDivElement = (document.createElement("div") as HTMLDivElement);
        optElem.addEventListener("mouseup", (ev) => {
            if (opt.onselect == undefined) return;
            opt.onselect();
            if (opt.hasSecondary == undefined || opt.hasSecondary != true) {
                this.close();
            }
        });
        optElem.addEventListener("touchend", (ev) => {
            if (opt.onselect == undefined) return;
            opt.onselect();
            if (opt.hasSecondary == undefined || opt.hasSecondary != true) {
                this.close();
            }
        });
        optElem.setAttribute("class", "ctxitem");
        if (opt.desc != null) {
            optElem.setAttribute("title", opt.desc);
        }
        if (opt.font == UniFont.BOLD) {
            optElem.innerHTML = "<b>" + text + "</b>";
        }
        else if (opt.font == UniFont.ITALIC) {
            optElem.innerHTML = "<i>" + text + "</i>";
        }
        else if (opt.font != null) {
            text = UniFont.make(text, opt.font);
            optElem.innerText = text;
        }
        else {
            optElem.innerText = text;
        }
        this.ctxMenuItems.appendChild(optElem);
    }
}