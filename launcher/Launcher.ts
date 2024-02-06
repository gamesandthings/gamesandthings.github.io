import LauncherState from "./gamesandthings/LauncherState";
import State from "./gamesandthings/State";
import MouseHandler from "./gamesandthings/MouseHandler";
import KeyboardHandler from "./gamesandthings/KeyboardHandler";




export default class Launcher {
    public static state: State;
    public static mouse: MouseHandler;
    public static keyboard: KeyboardHandler;

    public static cnv: HTMLCanvasElement;
    public static ctx: CanvasRenderingContext2D;
    public static drawer: HTMLDivElement;
    public static iframe: HTMLIFrameElement;
    public static iframeMode: boolean = false;
    static init(state: State) {

        document.writeln('<iframe frameborder="0" allowfullscreen="true" id="gamewin"></iframe>');
        document.writeln('<canvas id="cnv"></canvas>');
        document.body.style.margin = "0px";
        Launcher.mouse = new MouseHandler();
        Launcher.mouse.init();
        Launcher.keyboard = new KeyboardHandler();
        Launcher.keyboard.init();
        Launcher.drawer = (document.getElementById("slidymenu") as HTMLDivElement);
        Launcher.drawer.style.left = "-150px";
        Launcher.drawer.addEventListener("mouseover", (ev: MouseEvent) => {
            Launcher.drawer.style.opacity = "1";
            Launcher.drawer.style.left = "0px";
            // window.focus();
            // Launcher.closeIframe();
            //Launcher.iframeMode=!Launcher.iframeMode;
        });
        Launcher.drawer.addEventListener("contextmenu", (ev: MouseEvent) => {
            ev.preventDefault();
        });
        Launcher.drawer.addEventListener("mouseout", (ev: MouseEvent) => {
            Launcher.drawer.style.left = "-150";
            Launcher.drawer.style.opacity = "0.25";
        });
        Launcher.drawer.addEventListener("mousedown", (ev: MouseEvent) => {
            Launcher.drawer.style.opacity = "1";
        });
        Launcher.cnv = (document.getElementById("cnv") as HTMLCanvasElement)
        Launcher.cnv.id = "cnv";
        Launcher.ctx = (Launcher.cnv.getContext("2d", { desynchronized: false }) as CanvasRenderingContext2D);
        Launcher.iframe = (document.getElementById("gamewin") as HTMLIFrameElement);
        Launcher.state = state;
        Launcher.state.create();
        Launcher.update(0);
    }
    static lastTimestep: number = 0;
    static lastShiftTabTimeStep: number = 0;

    static delta: number = 0;
    public static openURL(url: string) {
        Launcher.keyboard.resetPressed();
        Launcher.iframeMode = true;
        Launcher.iframe.src = url;
        window.onbeforeunload = () => {

        };
    }
    public static closeIframe() {
        Launcher.iframeMode = false;
    }
    static update(timestep: number) {
        Launcher.cnv.style.zIndex = "2";
        Launcher.iframe.style.zIndex = "1";
        Launcher.cnv.style.position = "relative";
        Launcher.iframe.style.position = "relative";
        if (Launcher.iframeMode) {
            Launcher.iframe.contentWindow?.focus();
            Launcher.cnv.style.display = "none";
            Launcher.iframe.style.display = "flex";
        }
        else {
            Launcher.cnv.style.display = "flex";
            Launcher.iframe.style.display = "none";
        }
        Launcher.ctx.reset();
        Launcher.iframe.style.width = "100%";
        Launcher.iframe.style.height = "100%";
        Launcher.iframe.setAttribute("width", Launcher.cnv.offsetWidth + "");
        Launcher.iframe.setAttribute("height", Launcher.cnv.offsetHeight + "");
        Launcher.cnv.style.width = "100%";
        Launcher.cnv.style.height = "100%";
        Launcher.cnv.setAttribute("width", Launcher.cnv.offsetWidth + "");
        Launcher.cnv.setAttribute("height", Launcher.cnv.offsetHeight + "");
        Launcher.delta = ((timestep - Launcher.lastTimestep) / 1000);
        if (!Launcher.iframeMode) {
            Launcher.ctx.fillRect(0, 0, Launcher.cnv.width, Launcher.cnv.height);
            Launcher.state.draw();
            Launcher.state.update(Launcher.delta);
        }
        Launcher.lastTimestep = timestep;
        Launcher.mouse.resetDeltas();
        requestAnimationFrame(Launcher.update);
    }

}
Launcher.init(new LauncherState());