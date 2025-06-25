import SettingsHandler from "./gamesandthings/SettingsHandler";
import FilterHandler from "./gamesandthings/FilterHandler";
import SaveManager from "./gamesandthings/SaveManager";
import DrawerHandler from "./gamesandthings/DrawerHandler";
import ScriptInjector from "./gamesandthings/ScriptInjector";
import NativeContextMenuHandler from "./gamesandthings/contextmenu/NativeContextMenuHandler";
import CustomContextMenuHandler from "./gamesandthings/contextmenu/CustomContextMenuHandler";
import Games, { Game, GameVersion } from "./gamesandthings/Games";
import Vector2 from "./gamesandthings/types/Vector2";
import IContextMenu from "./gamesandthings/contextmenu/IContextMenu";

export default class Launcher {
    public static cnv: HTMLDivElement;
    public static drawer: DrawerHandler;
    public static iframe: HTMLIFrameElement;
    public static iframeFilterHandler: FilterHandler;
    public static iframeDiv: HTMLDivElement;
    public static game: Game | null;
    public static contextMenu: IContextMenu;
    public static iframeMode: boolean = false;
    public static fullscreen: boolean = false;
    public static fullscreenByOS: boolean = false;
    public static performanceMode: boolean = false;
    static gameMediaStreams: MediaStream[] = [];
    static gameLogs: string[] = [];
    public static runningInWebApp: boolean = false;
    public static mx: number;
    public static my: number;

    public static init() {
        Launcher.runningInWebApp = "standalone" in window.navigator || document.referrer.includes("android-app://") || window.matchMedia("(display-mode: standalone)").matches;
        // canvas and iframe
        SettingsHandler.load();
        SaveManager.init();
        Launcher.performanceMode = SettingsHandler.data.performanceModeEnabled;
        window.addEventListener("error", (ev: ErrorEvent) => {
            alert("Error!\n" + ev.message
                + "\nPlease report this bug in the games and things discord!\nAttempting to continue...");
            Launcher.update(0);
        })
        Launcher.iframeDiv = document.createElement("div");
        document.body.appendChild(Launcher.iframeDiv);
        Launcher.iframeDiv.id = "iframeDiv";
        Launcher.initIframe();
        Launcher.contextMenu = new CustomContextMenuHandler();
        document.body.style.margin = "0px";
        Launcher.drawer = new DrawerHandler(document.getElementById("slidymenu") as HTMLDivElement);
        Launcher.drawer.elem.style.left = "-150px";



        Launcher.cnv = (document.createElement("div") as HTMLDivElement)
        Launcher.cnv.id = "cnv";
        document.body.appendChild(Launcher.cnv);

        window.addEventListener("pointermove", (ev) => {
            Launcher.mx = ev.clientX;
            Launcher.my = ev.clientY;
        });

        setInterval(() => {
            SaveManager.update();
        }, 1000 / 5);

        (window as any).gameConfig = SettingsHandler.data;
        (window as any).gameKeys = [];
        (window as any).gameMediaStreams = [];
        Launcher.gameMediaStreams = (window as any).gameMediaStreams;
        (window as any).gameLogs = [];
        (window as any).gameData = {};
        Launcher.gameLogs = (window as any).gameLogs;

        // url parsing
        function parseQuery(queryString: string) {
            var query = {};
            var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split('=');
                (query as any)[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
            }
            return query;
        }

        let shouldOpenDefault = true;

        if (window.location.search != "") {
            let args = parseQuery(window.location.search.substring(1));
            if ("game" in args) {
                let game = Games.getGameByID(args.game as string);
                if (game != null) {
                    shouldOpenDefault = false;
                    if ("version" in args) {
                        let version = Games.getVersionByID(game, args.version as string)
                        if (version != null) {
                            Launcher.openGame(game, version);
                        }
                    }
                    else {
                        Launcher.openGame(game);
                    }
                }
            }

        }
        if (shouldOpenDefault) {
            Launcher.openGame(Games.games[0]);

            alert("PLEASE READ\n\n\nDue to some rewrites and cleanup, the game list selection has temporarily moved under the settings icon in the top left corner. \n All the games and your save data have not been affected. \n The launcher will boot by default into Minecraft 1.12.2.")
        }
    }
    public static finalInject() {
        Launcher.beginOpen();
        ScriptInjector.inject("/iframe_inject.js");
        if (Launcher.game != null && Launcher.game.fixScripts != null) {
            Launcher.game.fixScripts.forEach((script) => {
                ScriptInjector.inject(script);
            });
        }
        Launcher.updateInjection();
    }
    public static initIframe(recreate: boolean = true): void {
        //Launcher.initInject();
        if (recreate) {
            Launcher.iframe = (document.createElement("iframe") as HTMLIFrameElement);
            Launcher.iframeFilterHandler = new FilterHandler();
            Launcher.iframeDiv.appendChild(Launcher.iframe);
        }

        Launcher.iframe.id = "gamewin";
        Launcher.iframe.setAttribute('frameborder', "0");
        Launcher.iframe.setAttribute('allowfullscreen', "true");
        Launcher.iframe.style.width = "100%";
        Launcher.iframe.style.height = "100%";
    }
    static lastTimestep: number = 0;
    static lastShiftTabTimeStep: number = 0;
    static delta: number = 0;
    public static lastURL: string = "";
    public static curVersion: string = "";
    public static beginOpen() {
        (window as any).gameMediaStreams = [];
        Launcher.gameMediaStreams = (window as any).gameMediaStreams;
        (window as any).gameLogs = [];
        Launcher.gameLogs = (window as any).gameLogs;
    }
    public static refreshGame() {
        Launcher.beginOpen();
        Launcher.iframeDiv.removeChild(Launcher.iframe);
        Launcher.initIframe();
        Launcher.openGame(Launcher.game);
    }
    public static openGame(game: Game | null, version: GameVersion | null | undefined = null) {
        Launcher.beginOpen();
        if (Launcher.drawer.recorder?.recording) {
            Launcher.drawer.recorder.stopRecording();
        }
        Launcher.update(0);
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

        let link: string = window.location.protocol + '//' + window.location.host + "/" + game.prefix;
        if (version == null && game.versions == null) {
            Launcher.curVersion = "";
            link += "/";
        }
        else if (version == null && game.versions != null) {
            Launcher.curVersion = game.versions[0].title;
            if (Launcher.curVersion != game.title)
                document.title += " - " + game.versions[0].title.replace(game.title + " ", "").replace(game.title, "").replace("(", "").replace(")", "");
            link += '/' + game.versions[0].url;
        }
        else if (version != null) {
            Launcher.curVersion = version.title;
            document.title += " - " + version.title.replace(game.title + " ", "").replace(game.title, "").replace("(", "").replace(")", "");
            link += '/' + version.url;
        }
        if (game.gameKeys != undefined || game.gameKeys != null) {
            (window as any).gameKeys = game.gameKeys;
        }
        else {
            (window as any).gameKeys = [];
        }
        Launcher.drawer.updateScreenMode();
        if (game.title != "Doom")
            link += "/";
        Launcher.openURL(link);

        let URL: string = window.location.origin + `/?game=${encodeURIComponent(game.id)}`;
        if (version != null) {
            URL += `&version=${encodeURIComponent(version.id)}`
        }
        window.history.replaceState(null, "", URL)
    }
    public static openURL(url: string) {
        SaveManager.load();

        if (Launcher.drawer.recorder?.recording) {
            Launcher.drawer.recorder.stopRecording();
        }
        Launcher.initIframe(false);

        Launcher.lastURL = url;
        if (this.lastURL != "") {
            Launcher.openIframeWindow();
            Launcher.iframe.setAttribute('src', url);
        }
        Launcher.iframe.addEventListener("load", (ev) => {
            if (Launcher.game != null && Launcher.game.inject) {
                Launcher.finalInject();
            }
        });
    }
    public static openIframeWindow() {
        Launcher.iframeMode = true;
        //Launcher.drawer.isOut = false;
        // Launcher.iframe.src = url;
        Launcher.iframeFilterHandler.blur = 0.0;

    }
    public static closeIframe(): void {
        Launcher.iframeMode = false;
        Launcher.iframeFilterHandler.blur = 1.5;
    }
    public static forceQuit(): void {
        (window as any).gameData = {};
        Launcher.curVersion = "";
        if (this.drawer.recorder?.recording) {
            this.drawer.recorder.stopRecording();
        }
        Launcher.iframeDiv.removeChild(Launcher.iframe);
        Launcher.initIframe();
        Launcher.closeIframe();
        window.history.replaceState(null, "", window.location.origin);
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
    static update(timestep: number) {

        Launcher.runningInWebApp = "standalone" in window.navigator || document.referrer.includes("android-app://") || window.matchMedia("(display-mode: standalone)").matches;
        (window as any).gameConfig = SettingsHandler.data;
        if (Launcher.drawer.alpha != 0) {
            Launcher.drawer.update(Launcher.delta);
        }
        else {
            Launcher.drawer.mouseOverCheck();
        }
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

        Launcher.iframe.style.top = String(((document.body.offsetHeight - Launcher.iframe.offsetHeight) / 2)) + "px";
        Launcher.iframe.style.left = String((document.body.offsetWidth - Launcher.iframe.offsetWidth) / 2) + "px";

        if (Launcher.iframeMode) {
            Launcher.iframe.contentWindow?.focus();
            Launcher.cnv.style.display = "none";
            Launcher.cnv.style.top = "0px";
            Launcher.iframe.style.opacity = "1";
        }
        else {
            Launcher.cnv.style.display = "flex";
            Launcher.cnv.style.top = "0";
            Launcher.cnv.style.left = "0";

            Launcher.iframe.style.display = "flex";
            Launcher.iframe.style.opacity = "0.5";
            //  Launcher.iframe.style.top = "0px";
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
        if (!Launcher.iframeMode) {
            document.title = "Games And Things";
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
    static elemsToOptimize: string[] = ["canvas", "p", "h1", "h2", "h3"];
    static elemsToRemove: string[] = ["title", "meta"];

    public static updateInjection() {
        if (Launcher.iframe.contentDocument != null) {
            Launcher.iframe.contentDocument.querySelectorAll("*").forEach((elem) => {
                elem.getAttribute("style")?.trim();
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
            a.href = cnvs[0].toDataURL("image/png").replace("image/png", "image/octet-stream");
            a.click();
            a.remove();
        }
    }
}

Launcher.init();
const touchHandler = (ev: Event) => {
    if (ev.target instanceof HTMLDivElement) {
        if (Launcher.contextMenu instanceof CustomContextMenuHandler) {
            let customMenu = (Launcher.contextMenu as CustomContextMenuHandler);
            if (customMenu.ctxMenu == ev.target || customMenu.ctxMenuItems == ev.target) {
                return true;
            }
        }
    }
    if (ev.target instanceof HTMLIFrameElement || ev.target instanceof HTMLCanvasElement || ev.target instanceof HTMLBodyElement) {
        ev.preventDefault(); // Prevent text selection
    }
}
document.addEventListener('touchstart', touchHandler, { passive: false });
document.addEventListener('touchmove', touchHandler, { passive: false });
document.addEventListener('touchend', touchHandler, { passive: false });
document.addEventListener('touchcancel', touchHandler, { passive: false });