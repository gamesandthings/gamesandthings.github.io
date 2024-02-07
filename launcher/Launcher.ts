import LauncherState from "./gamesandthings/LauncherState";
import State from "./gamesandthings/State";
import MouseHandler from "./gamesandthings/MouseHandler";
import KeyboardHandler from "./gamesandthings/KeyboardHandler";
import DrawerHandler from "./gamesandthings/DrawerHandler";





export default class Launcher {
    public static state: State;
    public static mouse: MouseHandler;
    public static keyboard: KeyboardHandler;

    public static cnv: HTMLCanvasElement;
    public static ctx: CanvasRenderingContext2D;
    public static drawer: DrawerHandler;
    public static iframe: HTMLIFrameElement;
    public static iframeMode: boolean = false;
    public static fullscreen: boolean = false;
    static init(state: State) {
        document.writeln('<iframe frameborder="0" allowfullscreen="true" id="gamewin"></iframe>');
        document.writeln('<canvas id="cnv"></canvas>');
        document.body.style.margin = "0px";
        Launcher.mouse = new MouseHandler();
        Launcher.mouse.init();
        Launcher.keyboard = new KeyboardHandler();
        Launcher.keyboard.init();
        Launcher.drawer = new DrawerHandler(document.getElementById("slidymenu") as HTMLDivElement);
        Launcher.drawer.elem.style.left = "-150px";
        Launcher.cnv = (document.getElementById("cnv") as HTMLCanvasElement)
        Launcher.cnv.id = "cnv";
        Launcher.ctx = (Launcher.cnv.getContext("2d", { desynchronized: false }) as CanvasRenderingContext2D);
        Launcher.iframe = (document.getElementById("gamewin") as HTMLIFrameElement);
        Launcher.iframe.style.width = "100%";
        Launcher.iframe.style.height = "100%";
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
        Launcher.drawer.isOut = false;
        // Launcher.iframe.src = url;
    }
    public static closeIframe(): void {
        Launcher.iframeMode = false;
    }
    public static toggleFullscreen(): void {
        let elem: HTMLElement = document.body;

        if (!document.fullscreenElement) {
            Launcher.fullscreen = true;
            elem.requestFullscreen().catch((err) => {
                Launcher.fullscreen = false;
            });
        } else {
            Launcher.fullscreen = false;
            document.exitFullscreen();
        }
    }
    static update(timestep: number) {
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
        if (!Launcher.iframeMode) {
            Launcher.ctx.fillStyle = "black";
            Launcher.ctx.fillRect(0, 0, Launcher.cnv.width, Launcher.cnv.height);
            Launcher.state.draw();
            Launcher.ctx.fillStyle = "white";
            Launcher.ctx.font = "25px sans-serif";
            Launcher.ctx.textBaseline = "hanging";
            Launcher.ctx.fillText("This is the new games and stuff, ",0,35);
            Launcher.ctx.fillText("currently in very early development.",0,65)            
            Launcher.state.update(Launcher.delta);
            if (Launcher.iframe.contentDocument != null){
                Launcher.iframe.contentDocument.querySelectorAll("*").forEach((elem)=>{
                  let child:HTMLElement = (elem as HTMLElement);
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