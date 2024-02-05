import LauncherState from "./gamesandthings/LauncherState";
import State from "./gamesandthings/State";
import MouseHandler from "./gamesandthings/MouseHandler";



export default class Launcher {
    public static state: State;
    public static mouse: MouseHandler;
    public static cnv: HTMLCanvasElement;
    public static ctx: CanvasRenderingContext2D;
    static init(state: State) {
        document.writeln('<canvas id="cnv"></canvas>');
        document.body.style.margin = "0px";
        this.mouse =  new MouseHandler();
        this.mouse.init();
        Launcher.cnv = (document.getElementById("cnv") as HTMLCanvasElement)
        Launcher.cnv.id = "cnv";
        Launcher.ctx = (Launcher.cnv.getContext("2d", { desynchronized: false }) as CanvasRenderingContext2D);
        Launcher.state = state;
        Launcher.state.create();
        Launcher.update(0);
    }
    static lastTimestep: number = 0;
    static delta: number = 0;

    static update(timestep: number) {
        Launcher.ctx.reset();
        Launcher.cnv.style.width = "100%";
        Launcher.cnv.style.height = "100%";
        Launcher.cnv.setAttribute("width", Launcher.cnv.offsetWidth + "");
        Launcher.cnv.setAttribute("height", Launcher.cnv.offsetHeight + "");
        Launcher.delta = ((timestep - Launcher.lastTimestep) / 1000);
        Launcher.ctx.fillRect(0, 0, Launcher.cnv.width, Launcher.cnv.height);
        Launcher.state.draw();
        Launcher.state.update(Launcher.delta);
        Launcher.lastTimestep = timestep;
        Launcher.mouse.resetDeltas();
        requestAnimationFrame(Launcher.update);
    }
}
Launcher.init(new LauncherState());