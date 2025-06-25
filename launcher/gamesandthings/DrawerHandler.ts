import Launcher from "../Launcher";
import NativeContextMenuHandler from "./contextmenu/NativeContextMenuHandler";
import { ContextOption } from "./contextmenu/ContextOption";
import UniFont from "./UniFont";
import CanvasRecorder from "./CanvasRecorder";
import { MouseButtons } from "./enums/MouseButtons"
import IPositionable from "./interfaces/IPositionable";
import Vector2 from "./types/Vector2";
import SettingsHandler from "./SettingsHandler";
import SaveManager from "./SaveManager";
import Games, { Game, GameVersion } from "./Games";
import FilterHandler from "./FilterHandler";
export default class DrawerHandler implements IPositionable {
    buttonsPressed: Map<string, boolean> = new Map<string, boolean>();
    buttonsContextMenu: Map<string, boolean> = new Map<string, boolean>();
    buttonsMouseOver: Map<string, boolean> = new Map<string, boolean>();
    recorder: CanvasRecorder | undefined = undefined;
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
        window.addEventListener("resize", async (event) => {
            this.updateScreenMode();
        });
    }
    addMouseListeners(button: HTMLElement): void {
        this.buttonsPressed.set(button.id, false);
        this.buttons.push(button);
        button.addEventListener("click", (ev) => {
            if (!Launcher.contextMenu.isOpen) {
                this.clickX = ev.clientX;
                this.clickY = ev.clientY;
            }
            if (this.isOut) {
                this.buttonsPressed.set(button.id, true);
            }
            else {
                if (button.id == "peekarrow") {
                    this.buttonsPressed.set(button.id, true);
                }
            }
        });
        button.addEventListener("touchstart", (ev) => {
            if (ev.touches[0] == undefined) return;
            this.clickX = ev.touches[0].clientX;
            this.clickY = ev.touches[0].clientY;
        });
        button.addEventListener("touchend", (ev) => {
            if (ev.touches[0] == undefined) return;
            this.clickX = ev.touches[0].clientX;
            this.clickY = ev.touches[0].clientY;
            if (this.isOut) {
                this.buttonsPressed.set(button.id, true);
            }
            else {
                if (button.id == "peekarrow") {
                    this.buttonsPressed.set(button.id, true);
                }
            }
        });
        button.addEventListener("dblclick", (ev) => {
            this.buttonsContextMenu.set(button.id, true);
        });
        button.addEventListener("mouseover", (ev) => {
            this.buttonsMouseOver.set(button.id, true);
        });
        button.addEventListener("mouseout", (ev) => {
            this.buttonsMouseOver.set(button.id, false);
        });
        button.addEventListener("contextmenu", (ev) => {

            if (!Launcher.contextMenu.isOpen) {
                this.clickX = ev.clientX;
                this.clickY = ev.clientY;
            }
            this.buttonsContextMenu.set(button.id, true);
            ev.preventDefault();
        });
        button.addEventListener("blur", (ev: FocusEvent) => {
            this.isOut = false;
        });
    }
    create(): void { }
    clickX: number = 0;
    clickY: number = 0;

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
            else if (Launcher.iframe.contentDocument?.pointerLockElement != null) {
                this.alpha = 0;
                this.isOut = false;
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
    fixedResolutionContext() {
        Launcher.contextMenu.show([
            {
                text: "1080p", onselect: () => {
                    this.screenmode = "1920x1080";
                    this.updateScreenMode();
                },
            },
            {
                text: "720p", onselect: () => {
                    this.screenmode = "1280x720";
                    this.updateScreenMode();
                },
            },
            {
                text: "480p", onselect: () => {
                    this.screenmode = "854x480";
                    this.updateScreenMode();
                },
            },
            {
                text: "360p", onselect: () => {
                    this.screenmode = "640x360";
                    this.updateScreenMode();
                },
            },
            {
                text: "240p", onselect: () => {
                    this.screenmode = "426x240";
                    this.updateScreenMode();
                },
            },
            {
                text: "144p", onselect: () => {
                    this.screenmode = "256x144";
                    this.updateScreenMode();
                },
            },
            {
                text: "Custom", onselect: () => {
                    let prompt: string | null = window.prompt("Enter Resolution:\n(example 1920x1080)");
                    if (prompt == null) return;
                    this.screenmode = (prompt as string);
                    this.updateScreenMode();
                },
                hasSecondary: true
            }
        ], this.clickX, this.clickY);
    }
    screenmode: string = "window";
    async updateScreenMode() {
        if (this == null) return;


        if (this.screenmode.includes("/") || this.screenmode.includes(":")) {
            this.screenmode = this.screenmode.replace(":", "/");
            let actualHeight = window.outerHeight;
            Launcher.iframe.style.aspectRatio = this.screenmode;
            if (window.innerWidth >= actualHeight && !Launcher.iframe.style.left.includes("-")) {
                Launcher.iframe.style.width = "auto";
                Launcher.iframe.style.height = window.innerHeight + "";
            }
            else if (actualHeight >= window.innerWidth) {
                Launcher.iframe.style.height = "auto";
                Launcher.iframe.style.width = window.innerWidth + "";
            }
            // all of the code below this line is pure ass, but it works
            // doesnt fully make it ratio but whatever it fixes bouncing bug
            if (Launcher.iframe.offsetWidth == window.innerWidth)
                return;

            if (Launcher.iframe.offsetWidth > window.innerWidth
                || Launcher.iframe.offsetHeight > window.outerHeight) {
                if (actualHeight > window.innerWidth) {
                    //Launcher.iframe.style.width = "100%";
                    Launcher.iframe.style.height = actualHeight + "px";
                }
                else {
                    Launcher.iframe.style.width = window.innerWidth + "px";
                    Launcher.iframe.style.height = "auto";

                }
                // Launcher.iframe.style.height = "100%";
                // Launcher.iframe.style.aspectRatio = "";
            }

        }
        else if (this.screenmode.includes("x")) {
            Launcher.iframe.style.width = this.screenmode.split("x")[0] + "";
            Launcher.iframe.style.height = this.screenmode.split("x")[1] + "";
            Launcher.iframe.style.aspectRatio = "";
        }
        else {
            Launcher.iframe.style.width = "100%";
            Launcher.iframe.style.height = "100%";
            Launcher.iframe.style.aspectRatio = "";
        }
    }
    update(elapsed: number): void {
        window.devicePixelRatio = 4;
        this.mouseOverCheck();
        //  if (Launcher.fullscreen) {
        this.updateScreenMode();
        //  }
        this.buttonsPressed.forEach((mdown: boolean, id: string) => {
            if (mdown) {
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
                if (!this.isOut) return;
                if (id == "fullscreen") {
                    if (!Launcher.fullscreenByOS) {
                        Launcher.toggleFullscreen();
                    }
                }
                else if (id == "refresh") {
                    if (this.recorder?.recording) {
                        this.recorder.stopRecording();
                    }
                    Launcher.iframeDiv.removeChild(Launcher.iframe);
                    Launcher.initIframe();
                    Launcher.openURL(Launcher.lastURL);
                }
                else if (id == "pause") {
                    if (Launcher.iframe.src != "") {
                        if (Launcher.iframeMode) {
                            Launcher.closeIframe();
                        }
                        else {
                            Launcher.openIframeWindow();
                        }
                    }
                }
                else if (id == "settings") {
                    if (Launcher.iframeMode) {
                        let options: Array<ContextOption> = [];
                        options.push(
                            {
                                text: "Game List",
                                onselect: () => {
                                    this.showGameSelect();

                                },
                                hasSecondary: true,
                            },
                        );
                        if (!Launcher.game?.forcescreenmode) {
                            options.push(
                                {
                                    text: "Screen Size",
                                    onselect: () => {
                                        Launcher.contextMenu.show([
                                            {
                                                text: "4:3",
                                                onselect: () => {
                                                    this.screenmode = "4/3";
                                                    this.updateScreenMode();
                                                }
                                            },
                                            {
                                                text: "16:9",
                                                onselect: () => {
                                                    this.screenmode = "16/9";
                                                    this.updateScreenMode();
                                                }
                                            },
                                            {
                                                text: "16:10",
                                                onselect: () => {
                                                    this.screenmode = "16/10";
                                                    this.updateScreenMode();
                                                }
                                            },
                                            {
                                                text: "Fit to window",
                                                onselect: () => {
                                                    this.screenmode = "window";
                                                    this.updateScreenMode();
                                                }
                                            },
                                            {
                                                text: "Fixed Resolution",
                                                onselect: () => {
                                                    this.fixedResolutionContext();
                                                },
                                                hasSecondary: true
                                            },
                                        ]);
                                    },
                                    hasSecondary: true,
                                });
                        }
                        if (Launcher.game != null && Launcher.game.versions != null && Launcher.game.versions.length > 1) {
                            options.push({
                                text: Launcher.game.overrideVersionListName != null ? Launcher.game.overrideVersionListName : "Set Version",
                                desc: "⚠ If you change versions, unsaved data will be lost.",
                                descFont: UniFont.ITALIC,
                                hasSecondary: true,
                                onselect: () => {
                                    let versions: Array<ContextOption> = [];
                                    if (Launcher.game != null && Launcher.game?.versions != null) {
                                        Launcher.game.versions.forEach((version) => {
                                            versions.push(
                                                {
                                                    text: version.title,
                                                    onselect: () => {
                                                        if (this.recorder?.recording) {
                                                            this.recorder.stopRecording();
                                                        }
                                                        Launcher.iframeDiv.removeChild(Launcher.iframe);
                                                        Launcher.initIframe();
                                                        Launcher.openGame(Launcher.game, version);
                                                    }
                                                }
                                            );
                                        })
                                        Launcher.contextMenu.show(versions);
                                    }
                                }
                            });
                        }
                        options.push({
                            text: "Filters",
                            onselect: () => {
                                Launcher.contextMenu.show([
                                    {
                                        text: "Blur: " + Launcher.iframeFilterHandler.blur,
                                        onselect: () => {
                                            let value = prompt("Blur: ", Launcher.iframeFilterHandler.blur + "");
                                            if (value != null)
                                                Launcher.iframeFilterHandler.blur = parseFloat(value);
                                        }
                                    },
                                    {
                                        text: "Grayscale: " + (Launcher.iframeFilterHandler.grayscale ? "Yes" : "No"),
                                        onselect: () => {
                                            Launcher.iframeFilterHandler.grayscale = !Launcher.iframeFilterHandler.grayscale;
                                        }
                                    },
                                    {
                                        text: "Saturation: " + Launcher.iframeFilterHandler.saturate,
                                        onselect: () => {
                                            let value = prompt("Saturation: ", Launcher.iframeFilterHandler.saturate + "");
                                            if (value != null)
                                                Launcher.iframeFilterHandler.saturate = parseFloat(value);
                                        }
                                    },
                                    {
                                        text: "Contrast: " + Launcher.iframeFilterHandler.contrast,
                                        onselect: () => {
                                            let value = prompt("Contrast: ", Launcher.iframeFilterHandler.contrast + "");
                                            if (value != null)
                                                Launcher.iframeFilterHandler.contrast = parseFloat(value);
                                        }
                                    },
                                    {
                                        text: "Sepia: " + Launcher.iframeFilterHandler.sepia,
                                        onselect: () => {
                                            let value = prompt("Sepia: ", Launcher.iframeFilterHandler.sepia + "");
                                            if (value != null)
                                                Launcher.iframeFilterHandler.sepia = parseFloat(value);
                                        }
                                    },
                                                                        {
                                        text: "Invert: " + (Launcher.iframeFilterHandler.invert ? "Yes" : "No"),
                                        onselect: () => {
                                            Launcher.iframeFilterHandler.invert = !Launcher.iframeFilterHandler.invert;
                                        }
                                    },
                                    {
                                        text: "Reset",
                                        onselect: () => {
                                            Launcher.iframeFilterHandler = new FilterHandler();
                                        }
                                    },
                                ]);
                            },
                            hasSecondary: true,
                        });
                        if (Launcher.game?.gameKeys != undefined) {
                            options.push({
                                text: "Controls",
                                desc: "(rebinding coming soon!)",
                                hasSecondary: true,
                                onselect: () => {
                                    let controls: Array<ContextOption> = [];
                                    Launcher.game?.gameKeys?.forEach((gameKey) => {
                                        let top = gameKey.name;
                                        let bottom = "";
                                        if (!gameKey.disableOriginal) {
                                            let key = gameKey.key.key.replace('Arrow', '').replace(' ', 'Space').replace('Left', 'Left ').replace('Right', 'Right ');
                                            if (key.length == 1) {
                                                key = key.toUpperCase();
                                            }
                                            bottom = key;
                                        }
                                        gameKey.extraKeys.forEach((exkey, i) => {
                                            if (bottom != "") {
                                                let key = exkey.key.replace('Arrow', '').replace(' ', 'Space').replace('Left', 'Left ').replace('Right', 'Right ');
                                                if (key.length == 1) {
                                                    key = key.toUpperCase();
                                                }

                                                bottom += ", " + key;
                                            }
                                            else {
                                                bottom = exkey.key;
                                            }
                                        });
                                        controls.push({
                                            text: top + " - " + bottom,
                                            //  desc: bottom,
                                        });

                                        Launcher.contextMenu.show(controls);
                                    })
                                }
                            });
                        }

                        let switcherText: string = "Enable Performance Mode";
                        if (Launcher.performanceMode) {
                            switcherText = "Disable Performance Mode"
                        }
                        options.push({
                            text: switcherText,
                            desc: "Runs launcher menu at a low fps and other misc perf improvements.",
                            onselect: () => {
                                Launcher.performanceMode = !Launcher.performanceMode;
                                SettingsHandler.save({ performanceModeEnabled: Launcher.performanceMode });
                            }
                        })
                        switcherText = "Enable Raw Mouse Input";
                        if (SettingsHandler.data.rawMouseInputEnabled) {
                            switcherText = "Disable Raw Mouse Input";
                        }

                        options.push({
                            text: switcherText,
                            desc: 'Makes your mouse more accurate by removing mouse accel when pointer-locked.',
                            onselect: () => {
                                SettingsHandler.data.rawMouseInputEnabled = !SettingsHandler.data.rawMouseInputEnabled;
                                SettingsHandler.save();
                            }
                        });


                        options.push({
                            text: "Screenshot",
                            onselect: () => {
                                Launcher.screenshot();
                            }
                        });
                        if (this.recorder == null) this.recorder = new CanvasRecorder();
                        if (!this.recorder.recording) {
                            if ("chrome" in window) {
                                options.push({
                                    text: "Start Recording (with audio)",
                                    desc: "Choose your screen under screen tab and share system audio for audio to work.",
                                    onselect: async () => {
                                        if (Launcher.iframe.contentWindow == null) return;
                                        let cnvs: HTMLCollectionOf<HTMLCanvasElement> = Launcher.iframe.contentWindow.document.getElementsByTagName("canvas");
                                        const displayMediaOptions = {
                                            video: true,
                                            audio: {
                                                autoGainControl: false,
                                                googAutoGainControl: false,
                                                echoCancellation: false,
                                                noiseSuppression: false,
                                                sampleRate: 44100,
                                                suppressLocalAudioPlayback: false,
                                            },

                                            monitorTypeSurfaces: "include",
                                            surfaceSwitching: "include",
                                            selfBrowserSurface: "include",
                                            preferCurrentTab: false,
                                            systemAudio: "include",
                                        };
                                        let userMedia: MediaStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
                                        userMedia.addEventListener("removetrack", (ev) => { this.recorder?.stopRecording() })
                                        this.recorder = new CanvasRecorder(userMedia);
                                        if (cnvs.length != 0) {
                                            this.recorder.setCanvasStream(cnvs[0]);
                                        }
                                        this.recorder.startRecording();
                                    }
                                });
                            }
                            options.push({
                                text: "Start Recording (without audio)",
                                onselect: async () => {
                                    if (Launcher.iframe.contentWindow == null) return;
                                    let cnvs: HTMLCollectionOf<HTMLCanvasElement> = Launcher.iframe.contentWindow.document.getElementsByTagName("canvas");
                                    this.recorder = new CanvasRecorder();
                                    if (cnvs.length != 0) {
                                        this.recorder.setCanvasStream(cnvs[0]);
                                        this.recorder.startRecording();
                                    }
                                    else {
                                        alert("Game is loading, cannot record now!");
                                    }
                                }
                            });
                        }
                        else {
                            options.push({
                                text: "Stop Recording",
                                onselect: () => {
                                    if (Launcher.iframe.contentWindow == null) return;
                                    if (this.recorder != undefined) {
                                        this.recorder.stopRecording();
                                    }
                                }
                            });
                        }
                        if (Launcher.contextMenu.isOpen) {
                            Launcher.contextMenu.show(options, this.clickX, this.clickY);
                        }
                        else {
                            Launcher.contextMenu.show(options, Launcher.mx, Launcher.my);
                        }
                    }
                }
                else if (button.id == "forum") {
                    Launcher.contextMenu.show([
                        {
                            text: "Discord",
                            desc: 'Join the Games and Things Discord!',
                            onselect: () => {
                                window.open("https://discord.com/invite/up7VmmCPhn");
                            }
                        }
                    ]);

                }
            }
        });
        this.buttons.forEach((button) => {
            if (button.id == "peekarrow") {
                button.setAttribute("disabled", String(!Launcher.iframeMode));
                if (!Launcher.iframeMode) {
                    button.innerText = "close";
                }
                if (!this.isOut && button.innerText == "close") {
                    button.innerText = "chevron_right";
                }
            }
            if (this.isOut) {
                button.style.opacity = "1";
                if (button.getAttribute("disabled") == "true") {
                    button.style.color = "rgba(255,255,255,0.25)";
                }
                else {
                    button.style.color = "white";
                }
                if (button.id == "fullscreen") {
                    button.setAttribute("title", "Makes games and things fullscreen.");
                    if (Launcher.fullscreenByOS) {
                        button.setAttribute("title", "Cannot exit fullscreen as fullscreen was toggled\nby your os or browser.");

                    }
                    button.setAttribute("disabled", String(Launcher.fullscreenByOS));


                    let symbol: string = "fullscreen";
                    if (Launcher.fullscreen || Launcher.fullscreenByOS) {
                        symbol = "fullscreen_exit";
                    }
                    if (button.innerText != symbol) {
                        button.innerText = symbol;
                    }
                }
                else if (button.id == "pause") {
                    button.setAttribute("disabled", String(Launcher.iframe.src == ""));

                    if (!Launcher.iframeMode) {
                        button.setAttribute("title", "Return to game.");
                        button.innerText = "play_arrow";
                    }
                    else {
                        button.setAttribute("title", "Return to games and things.");
                        button.innerText = "pause";
                    }

                }
                else if (button.id == "settings") {
                    button.setAttribute("disabled", String(!Launcher.iframeMode));
                }
            }
            else {
                if (button.id != "peekarrow") {
                    button.style.opacity = "0";
                }
            }
        });
        if (!this.isOut) {
            this.x = -this.elem.offsetWidth + 25;
        }
        else {
            this.x = 5;
        }

        this.buttonsContextMenu.forEach((rdown: boolean, id: string) => {
            if (rdown) {
                this.buttonsContextMenu.set(id, false);
                if (id == "peekarrow") {
                    if (Launcher.iframeMode) {
                        Launcher.contextMenu.show([{
                            text: "Force Quit Game",
                            desc: "⚠ Unsaved data will be lost.",
                            descFont: UniFont.ITALIC,
                            onselect: () => {
                                Launcher.forceQuit();
                            }
                        }], this.clickX, this.clickY);
                    }
                }
                if (!this.isOut) return;
                if (id == "refresh") {
                    Launcher.contextMenu.show([
                        {
                            text: "Force Refresh All",
                            desc: "⚠ Unsaved data will be lost.",
                            descFont: UniFont.ITALIC,
                            onselect: () => {
                                if (this.recorder?.recording) {
                                    this.recorder.stopRecording();
                                }
                                Launcher.iframeDiv.removeChild(Launcher.iframe);
                                window.location.reload();
                            }
                        },
                    ], this.clickX, this.clickY);
                }
            }
        });
        this.elem.style.opacity = String(this.alpha);
        this.elem.style.left = String(this.x) + "px";
        this.elem.style.top = String(this.y) + "px";
    }
    currentPage: number = 0;
    amountPerPage: number = 5;
    showGameSelect() {
        let gamesCtx: Array<ContextOption> = [];

        for (let i = this.currentPage * this.amountPerPage; i < (this.currentPage * this.amountPerPage) + this.amountPerPage; i++) {
            let game: Game = Games.games[i];
            if (game == undefined)
                break;
            gamesCtx.push({
                text: game.title,
                desc: game.creator,
                descFont: UniFont.ITALIC,
                onselect: () => {
                    if (game.prefix == "app-dt") {
                        alert("NOTE: DO NOT CLICK CHAPTER SELECT IN GAME!\n\nChapter Select is available under the ⚙ Settings menu in the top left")
                    }
                    Launcher.openGame(game);
                }
            });
        }

        if (gamesCtx.length == this.amountPerPage) {
            gamesCtx.push({
                text: "Next Page",
                font: UniFont.BOLD,
                onselect: () => {
                    this.currentPage++;
                    this.showGameSelect();
                }
            });
        }
        if (this.currentPage != 0) {
            gamesCtx.splice(0, 0, {
                text: "Previous Page",
                font: UniFont.BOLD,
                onselect: () => {
                    this.currentPage--;
                    this.showGameSelect();
                }
            });
        }
        Launcher.contextMenu.show(gamesCtx);
    }
    destroy(): void {
        // throw new Error("Method not implemented.");
    }
}