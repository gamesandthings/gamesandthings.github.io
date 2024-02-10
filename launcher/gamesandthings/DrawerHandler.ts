import Launcher from "../Launcher";
import UniFont from "./UniFont";
import { MouseButtons } from "./enums/MouseButtons"
import IPositionable from "./interfaces/IPositionable";
import Vector2 from "./types/Vector2";
export default class DrawerHandler implements IPositionable {
    buttonsPressed: Map<string, boolean> = new Map<string, boolean>();
    buttonsContextMenu: Map<string, boolean> = new Map<string, boolean>();
    hasClickedAtLeastOnce:boolean = false;
    buttonsMouseOver: Map<string, boolean> = new Map<string, boolean>();
    buttons: Array<HTMLElement> = [];
    mouseOver: Boolean = true;
    x: number = -150;
    y: number = 5;
    alpha: number = 1;
    elem: HTMLDivElement;
    isOut: boolean = false;
    constructor(elem: HTMLDivElement) {
        this.elem = elem;
        this.addMouseListeners(elem);
        elem.querySelectorAll("*").forEach((b) => {
            let button: HTMLElement = (b as HTMLElement);
            this.addMouseListeners(button);
        });
    }
    addMouseListeners(button: HTMLElement): void {
        this.buttonsPressed.set(button.id, false);
        this.buttons.push(button);
        button.addEventListener("click", (ev) => {
            if (this.isOut) {
                this.buttonsPressed.set(button.id, true);
            }
            else {
                if (button.id == "peekarrow") {
                    this.buttonsPressed.set(button.id, true);
                }
            }
        });
        button.addEventListener("mouseover", (ev) => {
            this.buttonsMouseOver.set(button.id, true);
        });
        button.addEventListener("mouseout", (ev) => {
            this.buttonsMouseOver.set(button.id, false);
        });
        button.addEventListener("contextmenu", (ev) => {
            this.buttonsContextMenu.set(button.id, true);
            ev.preventDefault();
        });
    }
    create(): void { }
    mouseOverCheck(): void {
        if (Launcher.iframeMode) {
            this.mouseOver = false;
            this.buttonsMouseOver.forEach((mOver: boolean, key: string) => {
                if (mOver) {
                    this.mouseOver = true;
                    return;
                }
            });
            if (this.mouseOver) {
                this.alpha = 1;
            }
            else {
                this.alpha = 0.5;
            }
        }
        else {
            this.alpha = 1;
            this.isOut = true;
        }
    }
    aspectRatioFit(srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number): Vector2 {
        var ratio: number = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        let vector: Vector2 = new Vector2();
        vector.x = srcWidth * ratio;
        vector.y = srcHeight * ratio;
        return vector;
    }
    screenmode: string = "window";
    updateScreenMode() {
        if (this.screenmode == "16:9") {
            let fitDimensions: Vector2 = this.aspectRatioFit(1280, 720, document.body.offsetWidth, document.body.offsetHeight);
            Launcher.iframe.style.width = fitDimensions.x + "px";
            Launcher.iframe.style.height = fitDimensions.y + "px";
        }
        else if (this.screenmode == "16:10") {
            let fitDimensions: Vector2 = this.aspectRatioFit(1680, 1050, document.body.offsetWidth, document.body.offsetHeight);
            Launcher.iframe.style.width = fitDimensions.x + "px";
            Launcher.iframe.style.height = fitDimensions.y + "px";
        }
        else if (this.screenmode == "4:3") {
            let fitDimensions: Vector2 = this.aspectRatioFit(800, 600, document.body.offsetWidth, document.body.offsetHeight);
            Launcher.iframe.style.width = fitDimensions.x + "px";
            Launcher.iframe.style.height = fitDimensions.y + "px";
        }
        else if (this.screenmode.includes("x")) {
            Launcher.iframe.style.width = this.screenmode.split("x")[0] + "px";
            Launcher.iframe.style.height = this.screenmode.split("x")[1] + "px";
        }
        else {
            Launcher.iframe.style.width = "100%";
            Launcher.iframe.style.height = "100%";
        }
    }
    update(elapsed: number): void {
        window.devicePixelRatio = 4;
        this.mouseOverCheck();
        this.updateScreenMode();
        this.buttons.forEach((button) => {
            if (button.getAttribute("disabled") == "true") {
                button.style.color = "rgba(255,255,255,0.25)";
            }
            else {
                button.style.color = "white";
            }
            if (button.id == "fullscreen") {
                button.setAttribute("title", "Makes games and things fullscreen.");
                let symbol: string = "fullscreen";
                if (Launcher.fullscreen) {
                    symbol = "fullscreen_exit";
                }
                if (button.innerText != symbol) {
                    button.innerText = symbol;
                }
            }
            else if (button.id == "arrow_back") {
                if (!Launcher.iframeMode) {
                    button.setAttribute("title", "Return to game.");
                    button.innerText = "play_arrow";
                }
                else {
                    button.setAttribute("title", "Return to games and st.");
                    button.innerText = "pause";
                }
            }
            else if (button.id == "peekarrow") {
                button.setAttribute("disabled", String(!Launcher.iframeMode));
                if (!Launcher.iframeMode) {
                    button.innerText = "close";
                }
                if (!this.isOut && button.innerText == "close") {
                    button.innerText = "chevron_right";
                }
            }
            else if (button.id == "settings") {
                button.setAttribute("disabled", String(!Launcher.iframeMode));
            }

        });
        if (!this.isOut) {
            this.x = -this.elem.offsetWidth + 25;
        }
        else {
            this.x = 5;
        }
        this.buttonsPressed.forEach((mdown: boolean, id: string) => {
            if (mdown) {
                this.hasClickedAtLeastOnce = true;
                this.buttonsPressed.set(id, false);
                let button: HTMLElement = (document.getElementById(id) as HTMLElement);
                // for some reason switch case didnt work here for me wtf
                if (id == "peekarrow") {
                    if (Launcher.iframeMode) {
                        this.isOut = !this.isOut;
                        if (this.isOut) {
                            button.innerText = "close";
                        }
                        else {
                            button.innerText = "chevron_right";
                        }
                    }
                }
                else if (id == "fullscreen") {
                    Launcher.toggleFullscreen();
                }
                else if (id == "refresh") {
                    Launcher.iframe.src += '';
                }
                else if (id == "arrow_back") {
                    if (Launcher.iframeMode) {
                        Launcher.closeIframe();
                    }
                    else {
                        Launcher.openIframeWindow();
                    }
                }
                else if (id == "settings") {
                    if (Launcher.iframeMode) {
                        Launcher.contextMenu.show([
                            {
                                text: "Settings ⸻",
                                title: true,
                                font: UniFont.SMALL_CAPS
                            }
                            ,{
                            text: "Aspect Ratio",
                            onselect: () => {
                                Launcher.contextMenu.show([
                                    {
                                        text: "4:3",
                                        onselect: () => {
                                            this.screenmode = "4:3";
                                        }
                                    },
                                    {
                                        text: "16:9",
                                        onselect: () => {
                                            this.screenmode = "16:9";
                                        }
                                    },
                                    {
                                        text: "16:10",
                                        onselect: () => {
                                            this.screenmode = "16:10";
                                        }
                                    },
                                    {
                                        text: "Default",
                                        onselect: () => {
                                            this.screenmode = "window";
                                        }
                                    },
                                    {
                                        text: "Custom Resolution",
                                        onselect: () => {
                                            let prompt: string | null = window.prompt("Enter Resolution:\n(example 1920x1080)");
                                            if (prompt == null) return;
                                            this.screenmode = (prompt as string);
                                        }
                                    },
                                ]);
                            },
                            hasSecondary: true,
                        }]);

                    }
                }
                else if (button.id == "forum") {
                    window.open("https://discord.com/invite/up7VmmCPhn");
                }
            }
        });
        this.buttonsContextMenu.forEach((rdown: boolean, id: string) => {
            if (rdown) {
                this.buttonsContextMenu.set(id, false);
                if (id == "refresh") {
                    if (Launcher.iframeMode) {
                        Launcher.contextMenu.show([{
                            text: "Refresh Games and Stuff", onselect: () => { window.location.reload(); }
                        }]);
                    }
                }
                else if (id == "peekarrow") {
                    if (this.isOut && Launcher.iframeMode) {
                        Launcher.contextMenu.show([{
                            text: "Force Quit Game", onselect: () => { Launcher.iframe.src = "about:blank"; }
                        }]);
                    }
                }
            }
        });
        this.elem.style.opacity = String(this.alpha);
        this.elem.style.left = String(this.x) + "px";
        this.elem.style.top = String(this.y) + "px";
    }
    destroy(): void {
        // throw new Error("Method not implemented.");
    }
}