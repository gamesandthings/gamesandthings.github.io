import LauncherState from "./gamesandthings/LauncherState";
import State from "./gamesandthings/State";
import MouseHandler from "./gamesandthings/MouseHandler";
import KeyboardHandler from "./gamesandthings/KeyboardHandler";
import DrawerHandler from "./gamesandthings/DrawerHandler";
import ContextMenuHandler from "./gamesandthings/ContextMenuHandler";
import { Game, GameVersion } from "./gamesandthings/Games";
import Vector2 from "./gamesandthings/types/Vector2";

export default class Launcher {
    public static state: State;
    public static mouse: MouseHandler;
    public static keyboard: KeyboardHandler;
    public static cnv: HTMLCanvasElement;
    public static ctx: CanvasRenderingContext2D;
    public static drawer: DrawerHandler;
    public static iframe: HTMLIFrameElement;
    public static iframeDiv: HTMLDivElement;
    public static game: Game | null;
    public static contextMenu: ContextMenuHandler;
    public static iframeMode: boolean = false;
    public static fullscreen: boolean = false;
    public static fullscreenByOS: boolean = false;
    public static performanceMode: boolean = false;
    static gameMediaStreams: MediaStream[] = [];
    static gameLogs: string[] = [];

    static init(state: State) {
        // canvas and iframe
        window.addEventListener("error", (ev: ErrorEvent) => {
            alert("Error!\n" + ev.message
                + "\nPlease report this bug in the games and things discord!\nAttempting to continue...");
            Launcher.update(0);
        })
        Launcher.iframeDiv = document.createElement("div");
        document.body.appendChild(Launcher.iframeDiv);
        Launcher.iframeDiv.id = "iframeDiv";
        Launcher.initIframe();
        // ContextMenu
        Launcher.contextMenu = new ContextMenuHandler();
        // Init Input and other Handlers
        document.body.style.margin = "0px";
        Launcher.mouse = new MouseHandler();
        Launcher.mouse.init();
        Launcher.keyboard = new KeyboardHandler();
        Launcher.keyboard.init();
        Launcher.drawer = new DrawerHandler(document.getElementById("slidymenu") as HTMLDivElement);
        Launcher.drawer.elem.style.left = "-150px";

        Launcher.cnv = (document.createElement("canvas") as HTMLCanvasElement)
        Launcher.cnv.id = "cnv";
        document.body.appendChild(Launcher.cnv);
        Launcher.ctx = (Launcher.cnv.getContext("2d", { desynchronized: true, preserveDrawingBuffer: true, willReadFrequently: false }) as CanvasRenderingContext2D);
        Launcher.ctx.imageSmoothingEnabled = false;
        Launcher.state = state;
        Launcher.state.create();
        this.initInject();
        (window as any).gameMediaStreams = [];
        Launcher.gameMediaStreams = (window as any).gameMediaStreams;
        (window as any).gameLogs = [];
        Launcher.gameLogs = (window as any).gameLogs;
    }
    public static initInject() {
        const url = "/iframe_inject.js"
        fetch(url)
            .then(r => r.text())
            .then((t) => {
                Launcher.injectScript = t;
                setInterval(Launcher.updateInjection, 1000 * 10);
                Launcher.update(0);
            })
    }
    public static finalInject() {
        //  Launcher.injectedScript = false;
        console.clear();
        window.eval("window.gameLogs = [];");
        (window as any).gameMediaStreams = [];
        Launcher.gameMediaStreams = (window as any).gameMediaStreams;
        (window as any).gameLogs = [];
        Launcher.gameLogs = (window as any).gameLogs;
        Launcher.updateInjection();
    }
    public static initIframe(recreate: boolean = true): void {
        if (recreate) {
            Launcher.iframe = (document.createElement("iframe") as HTMLIFrameElement);
            Launcher.iframeDiv.appendChild(Launcher.iframe);
        }
        Launcher.iframe.id = "gamewin";
        Launcher.iframe.setAttribute('frameborder', "0");
        Launcher.iframe.setAttribute('allowfullscreen', "true");
        Launcher.iframe.style.width = "100%";
        Launcher.iframe.style.height = "100%";
        Launcher.iframe.addEventListener("load", (ev) => {

            if (Launcher.game != null && Launcher.game.injectTime == 'load') {
                Launcher.finalInject();
            }
            else if (Launcher.game == null) {
                Launcher.finalInject();
            }
        });
        Launcher.iframe.addEventListener("DOMContentLoaded", (ev) => {
            if (Launcher.game != null && Launcher.game.injectTime == 'DOMContentLoaded') {
                Launcher.finalInject();
            }
        });
        Launcher.iframe.addEventListener("beforeunload", (ev: BeforeUnloadEvent) => {
            Launcher.injectedScript = false;
        });
    }
    static lastTimestep: number = 0;
    static lastShiftTabTimeStep: number = 0;
    static delta: number = 0;
    public static lastURL: string = "";
    public static refreshGame() {
        console.clear();
        window.eval("window.gameLogs = [];");
        window.eval("window.gameMediaStreams = [];");

        Launcher.iframe.src = Launcher.lastURL + '';
    }
    public static openGame(game: Game | null, version: GameVersion | null | undefined = null) {
        console.clear();
        window.eval("window.gameLogs = [];");
        window.eval("window.gameMediaStreams = [];");
        Launcher.injectedScript = false;
        if (game == null) return; // it will never be called if its null but typescript i guess
        if (game.fixes != null) {
            window.eval("window.gameData =" + JSON.stringify(game) + ";");
        }
        Launcher.game = game;
        document.title = game.title;
        if (game.screenmode != null) {
            Launcher.drawer.screenmode = game.screenmode;
        }
        else {
            Launcher.drawer.screenmode = "window";
        }
        Launcher.drawer.updateScreenMode();
        let link: string = game.prefix;
        if (version == null && game.versions == null) {
            link += "/";
        }
        else if (version == null && game.versions != null) {
            document.title += " - " + game.versions[0].title;
            link += game.versions[0].url;
        }
        else if (version != null) {
            document.title += " - " + version.title;
            link += version.url;
        }
        Launcher.openURL(link);
    }
    public static openURL(url: string) {
        Launcher.initIframe(false);
        Launcher.lastURL = url;
        if (this.lastURL != "") {
            Launcher.openIframeWindow();
            Launcher.iframe.src = url;
        }
    }
    public static openIframeWindow() {
        Launcher.keyboard.resetPressed();
        Launcher.iframeMode = true;
        //Launcher.drawer.isOut = false;
        // Launcher.iframe.src = url;
    }
    public static closeIframe(): void {
        Launcher.iframeMode = false;
    }
    public static toggleFullscreen(): void {
        let elem: HTMLElement = document.body;
        if (!!elem.requestFullscreen) {
            if (!document.fullscreenElement) {
                Launcher.fullscreen = true;
                elem.requestFullscreen().catch((err) => {
                    Launcher.fullscreen = false;
                });
                if ("keyboard" in window.navigator) {
                    eval("window.navigator.keyboard.lock()");
                }
            } else {
                Launcher.fullscreen = false;
                if ("keyboard" in window.navigator) {
                    eval("window.navigator.keyboard.unlock()");
                }
                document.exitFullscreen();
            }
        }
        Launcher.drawer.updateScreenMode();
    }
    static injectedScript: Boolean = false;
    static update(timestep: number) {
        Launcher.drawer.update(Launcher.delta);
        if ((document.body.offsetWidth >= window.screen.availWidth &&
            document.body.offsetHeight >= window.screen.availHeight)) {
            Launcher.fullscreen = true;
            if (document.fullscreenElement == null) {
                Launcher.fullscreenByOS = true;
            }
            else {
                Launcher.fullscreenByOS = false;
            }
        }
        else {
            Launcher.fullscreenByOS = false;
            Launcher.fullscreen = false;
        }
        Launcher.cnv.style.zIndex = "2";
        Launcher.iframe.style.zIndex = "1";
        Launcher.cnv.style.position = "relative";
        Launcher.iframe.style.position = "relative";
        if (Launcher.iframeMode) {
            Launcher.iframe.contentWindow?.focus();
            Launcher.cnv.style.display = "none";
            Launcher.cnv.style.top = "0px";
            Launcher.iframe.style.opacity = "1";
            Launcher.iframe.style.top = String(-Launcher.cnv.offsetHeight + ((document.body.offsetHeight - Launcher.iframe.offsetHeight) / 2)) + "px";
            Launcher.iframe.style.left = String((document.body.offsetWidth - Launcher.iframe.offsetWidth) / 2) + "px";
            //this.y = 
        }
        else {
            Launcher.cnv.style.display = "flex";
            Launcher.cnv.style.top = "-" + String(Launcher.iframe.offsetHeight) + "px";
            Launcher.iframe.style.display = "flex";
            Launcher.iframe.style.opacity = "0";
            Launcher.iframe.style.top = "0px";
        }

        //Launcher.ctx.reset();
        //Launcher.iframe.style.width = "100%";
        //Launcher.iframe.style.height = "100%";

        Launcher.iframe.setAttribute("width", Launcher.cnv.offsetWidth + "");
        Launcher.iframe.setAttribute("height", Launcher.cnv.offsetHeight + "");
        Launcher.cnv.style.width = "100%";
        Launcher.cnv.style.height = "100%";
        Launcher.cnv.setAttribute("width", Launcher.cnv.offsetWidth + "");
        Launcher.cnv.setAttribute("height", Launcher.cnv.offsetHeight + "");
        Launcher.delta = ((timestep - Launcher.lastTimestep) / 1000);
        Launcher.contextMenu.update(Launcher.delta);
        if (!Launcher.iframeMode) {
            document.title = "Games And Things";
            Launcher.ctx.fillStyle = "black";
            Launcher.ctx.fillRect(0, 0, Launcher.cnv.width, Launcher.cnv.height);
            Launcher.state.draw();
            Launcher.ctx.fillStyle = "white";
            Launcher.ctx.font = "15px sans-serif";
            Launcher.ctx.textBaseline = "hanging";
            Launcher.ctx.fillText("This is the new games and stuff, ", 0, 35);
            Launcher.ctx.fillText("currently in very early development.", 0, 55)
            Launcher.ctx.fillText("Mobile devices will be supported soon.", 0, 75)

            Launcher.state.update(Launcher.delta);
            Launcher.lastTimestep = timestep;
            Launcher.mouse.resetDeltas();
            requestAnimationFrame(Launcher.update);
        }
        else if (Launcher.performanceMode) {
            if (Launcher.iframe.contentDocument != null) {
                Launcher.iframe.contentDocument.querySelectorAll("*").forEach((elem) => {
                    if (Launcher.elemsToRemove.includes(elem.tagName.toLowerCase())) {
                        elem.remove();
                        return;
                    };
                });
            }
            setTimeout(Launcher.update, 1000 / 5);
        }
        else {
            requestAnimationFrame(Launcher.update);
        }
    }
    static injectScript: string = "";
    static elemsToOptimize: string[] = ["canvas", "p", "h1", "h2", "h3"];
    static elemsToRemove: string[] = ["title", "meta"];

    public static updateInjection() {
        if (Launcher.iframe.contentWindow != null) {
            //console.log("updating iframe");
            if (!Launcher.injectedScript) {
                Launcher.injectedScript = true;
                if (Launcher.injectScript == "") {
                    const url = "/iframe_inject.js"
                    fetch(url)
                        .then(r => r.text())
                        .then((t) => {
                            Launcher.injectScript = t;
                            if (Launcher.iframe.contentWindow == null) return;
                            Launcher.iframe.contentWindow.window.eval(t);
                        });
                }
                else {
                    Launcher.iframe.contentWindow.window.eval(Launcher.injectScript);
                }
            }
        }
        if (Launcher.iframe.contentDocument != null) {
            Launcher.iframe.contentDocument.querySelectorAll("*").forEach((elem) => {
                elem.getAttribute("style")?.trim();
                if (elem.tagName.toLowerCase() == "script") {
                    let scriptTag: HTMLScriptElement = (elem as HTMLScriptElement);
                    if (scriptTag.innerText.includes("window.eaglercraftXClientSignature =")
                        && scriptTag.innerText.includes("window.eaglercraftXClientBundle =") && eval("document.getElementById('gamewin').contentWindow.window.__isEaglerX188Running") == "yes") {
                        scriptTag.remove();
                        return;
                    }
                    let type: string | null = elem.getAttribute("type")
                    if (type != null) {
                        elem.removeAttribute("type");
                    }
                }
                if (!Launcher.elemsToOptimize.includes(elem.tagName.toLowerCase())) return;
                let child: HTMLElement = (elem as HTMLElement);

                if (child.style.cursor != "normal") { // no uneccesary dom manip
                    child.style.cursor = "normal";
                }
                if (child.style.fontKerning != "none") {
                    child.style.fontKerning = "none";
                }
                if (child.style.imageRendering != "pixelated") {
                    child.style.imageRendering = "pixelated";
                }

            });
        }
    }
    public static screenshot(): void {
        if (Launcher.iframe.contentWindow != null && Launcher.iframeMode) {
            let cnvs: HTMLCollectionOf<HTMLCanvasElement> = Launcher.iframe.contentWindow.document.getElementsByTagName("canvas");
            if (cnvs.length == 0) return;
            let a: HTMLAnchorElement = document.createElement("a");
            a.download = "Games and Things - " + document.title + " " + new Date(Date.now()).toLocaleString() + ".png";
            for (let x = 0; x < cnvs.length; x += 1) {
                let offscreenCanvas = new OffscreenCanvas(cnvs[0].offsetWidth, cnvs[0].offsetHeight);
                const offscreenCtx: OffscreenCanvasRenderingContext2D | null = offscreenCanvas.getContext("2d");
                if (offscreenCtx == null) return;
                offscreenCtx.imageSmoothingEnabled = false;
                let ctx: OffscreenCanvasRenderingContext2D = (offscreenCtx as OffscreenCanvasRenderingContext2D);
                let cnvImage = new Image();
                cnvImage.src = cnvs[x].toDataURL("image/png");
                cnvImage.onload = (ev) => {
                    ctx.drawImage(cnvImage, 0, 0);
                    const data: Uint8ClampedArray = ctx.getImageData(0, 0,
                        offscreenCanvas.width, offscreenCanvas.height).data;
                    let lastColor: string = "";
                    let canTakeScreenshot: boolean = false;
                    for (let i = 0; i < data.length; i += 4) {
                        let arr: string = [data[i], data[i + 1], data[i + 2]].toString();
                        if (lastColor != "" && lastColor != arr) {
                            canTakeScreenshot = true;
                            break;
                        }
                        else {
                            lastColor = arr;
                        }

                    }
                    if (!canTakeScreenshot) {
                        console.log("could not save canvas id " + x)
                    }
                    else {
                        a.href = cnvs[x].toDataURL("image/png").replace("image/png", "image/octet-stream");
                        a.click();
                        a.remove();
                    }
                }
            }

        }
    }
}
Launcher.init(new LauncherState());