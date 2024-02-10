import LauncherState from "./gamesandthings/LauncherState";
import State from "./gamesandthings/State";
import MouseHandler from "./gamesandthings/MouseHandler";
import KeyboardHandler from "./gamesandthings/KeyboardHandler";
import DrawerHandler from "./gamesandthings/DrawerHandler";
import ContextMenuHandler from "./gamesandthings/ContextMenuHandler";





export default class Launcher {
    public static state: State;
    public static mouse: MouseHandler;
    public static keyboard: KeyboardHandler;

    public static cnv: HTMLCanvasElement;
    public static ctx: CanvasRenderingContext2D;
    public static drawer: DrawerHandler;
    public static iframe: HTMLIFrameElement;
    public static contextMenu: ContextMenuHandler;
    public static iframeMode: boolean = false;
    public static fullscreen: boolean = false;
    public static fullscreenByOS: boolean = false;
    static init(state: State) {
        // canvas and iframe
        window.addEventListener("error", (ev: ErrorEvent) => {
            alert("Error!\n" + ev.message);
        })


        Launcher.iframe = (document.createElement("iframe") as HTMLIFrameElement);
        document.body.appendChild(Launcher.iframe);
        Launcher.iframe.id = "gamewin";
        Launcher.iframe.setAttribute('frameborder', "0");
        Launcher.iframe.setAttribute('allowfullscreen', "true");
        Launcher.iframe.style.width = "100%";
        Launcher.iframe.style.height = "100%";

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
        Launcher.ctx = (Launcher.cnv.getContext("2d", { desynchronized: false }) as CanvasRenderingContext2D);
        Launcher.state = state;
        Launcher.state.create();
        Launcher.update(0);
    }
    static lastTimestep: number = 0;
    static lastShiftTabTimeStep: number = 0;

    static delta: number = 0;
    public static openURL(url: string) {
        Launcher.openIframeWindow();
        Launcher.iframe.src = url;
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
                eval("window.navigator.keyboard.lock()");
            } else {
                Launcher.fullscreen = false;
                eval("window.navigator.keyboard.unlock()");
                document.exitFullscreen();
            }
        }
    }
    static update(timestep: number) {
        if (document.body.offsetWidth == window.screen.availWidth &&
            document.body.offsetHeight == window.screen.availHeight) {
            Launcher.fullscreen = true;
            if (document.fullscreenElement == null) {
                Launcher.fullscreenByOS = true;
            }
            else {
                Launcher.fullscreenByOS = false;
            }
        }
        else {
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
        Launcher.drawer.update(Launcher.delta);
        Launcher.contextMenu.update(Launcher.delta);
        if (!Launcher.iframeMode) {
            Launcher.ctx.fillStyle = "black";
            Launcher.ctx.fillRect(0, 0, Launcher.cnv.width, Launcher.cnv.height);
            Launcher.state.draw();
            Launcher.ctx.fillStyle = "white";
            Launcher.ctx.font = "25px sans-serif";
            Launcher.ctx.textBaseline = "hanging";
            Launcher.ctx.fillText("This is the new games and stuff, ", 0, 35);
            Launcher.ctx.fillText("currently in very early development.", 0, 65)
            Launcher.ctx.fillText("Mobile devices will be supported soon.", 0, 95)

            Launcher.state.update(Launcher.delta);
            if (Launcher.iframe.contentDocument != null) {
                Launcher.iframe.contentDocument.querySelectorAll("*").forEach((elem) => {
                    let child: HTMLElement = (elem as HTMLElement);
                    child.style.cursor = "normal";
                });
            }
        }
        Launcher.lastTimestep = timestep;
        Launcher.mouse.resetDeltas();
        requestAnimationFrame(Launcher.update);
    }

}
Launcher.init(new LauncherState());