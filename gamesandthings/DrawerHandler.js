"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Launcher_1 = __importDefault(require("../Launcher"));
const UniFont_1 = __importDefault(require("./UniFont"));
const CanvasRecorder_1 = __importDefault(require("./CanvasRecorder"));
const Vector2_1 = __importDefault(require("./types/Vector2"));
const SettingsHandler_1 = __importDefault(require("./SettingsHandler"));
const Games_1 = __importDefault(require("./Games"));
class DrawerHandler {
    constructor(elem) {
        this.buttonsPressed = new Map();
        this.buttonsContextMenu = new Map();
        this.buttonsMouseOver = new Map();
        this.recorder = undefined;
        this.buttons = [];
        this.mouseOver = true;
        this.x = -150;
        this.y = 5;
        this.alpha = 1;
        this.isOut = false;
        this.clickX = 0;
        this.clickY = 0;
        this.screenmode = "window";
        this.currentPage = 0;
        this.amountPerPage = 5;
        this.elem = elem;
        this.addMouseListeners(elem);
        elem.querySelectorAll("*").forEach((b) => {
            let button = b;
            this.addMouseListeners(button);
        });
        window.addEventListener("resize", (event) => __awaiter(this, void 0, void 0, function* () {
            this.updateScreenMode();
        }));
    }
    addMouseListeners(button) {
        this.buttonsPressed.set(button.id, false);
        this.buttons.push(button);
        button.addEventListener("click", (ev) => {
            if (!Launcher_1.default.contextMenu.isOpen) {
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
            if (ev.touches[0] == undefined)
                return;
            this.clickX = ev.touches[0].clientX;
            this.clickY = ev.touches[0].clientY;
        });
        button.addEventListener("touchend", (ev) => {
            if (ev.touches[0] == undefined)
                return;
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
            if (!Launcher_1.default.contextMenu.isOpen) {
                this.clickX = ev.clientX;
                this.clickY = ev.clientY;
            }
            this.buttonsContextMenu.set(button.id, true);
            ev.preventDefault();
        });
        button.addEventListener("blur", (ev) => {
            this.isOut = false;
        });
    }
    create() { }
    mouseOverCheck() {
        var _a;
        if (Launcher_1.default.iframeMode) {
            this.mouseOver = false;
            this.buttonsMouseOver.forEach((mOver, key) => {
                if (mOver) {
                    this.mouseOver = true;
                    return;
                }
            });
            if (this.mouseOver) {
                this.alpha = 1;
            }
            else if (((_a = Launcher_1.default.iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.pointerLockElement) != null) {
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
    aspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        let vector = new Vector2_1.default();
        vector.x = srcWidth * ratio;
        vector.y = srcHeight * ratio;
        return vector;
    }
    fixedResolutionContext() {
        Launcher_1.default.contextMenu.show([
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
                    let prompt = window.prompt("Enter Resolution:\n(example 1920x1080)");
                    if (prompt == null)
                        return;
                    this.screenmode = prompt;
                    this.updateScreenMode();
                },
                hasSecondary: true
            }
        ], this.clickX, this.clickY);
    }
    updateScreenMode() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this == null)
                return;
            if (this.screenmode.includes("/") || this.screenmode.includes(":")) {
                this.screenmode = this.screenmode.replace(":", "/");
                let actualHeight = window.outerHeight;
                Launcher_1.default.iframe.style.aspectRatio = this.screenmode;
                if (window.innerWidth >= actualHeight && !Launcher_1.default.iframe.style.left.includes("-")) {
                    Launcher_1.default.iframe.style.width = "auto";
                    Launcher_1.default.iframe.style.height = window.innerHeight + "";
                }
                else if (actualHeight >= window.innerWidth) {
                    Launcher_1.default.iframe.style.height = "auto";
                    Launcher_1.default.iframe.style.width = window.innerWidth + "";
                }
                // all of the code below this line is pure ass, but it works
                // doesnt fully make it ratio but whatever it fixes bouncing bug
                if (Launcher_1.default.iframe.offsetWidth == window.innerWidth)
                    return;
                if (Launcher_1.default.iframe.offsetWidth > window.innerWidth
                    || Launcher_1.default.iframe.offsetHeight > window.outerHeight) {
                    if (actualHeight > window.innerWidth) {
                        //Launcher.iframe.style.width = "100%";
                        Launcher_1.default.iframe.style.height = actualHeight + "px";
                    }
                    else {
                        Launcher_1.default.iframe.style.width = window.innerWidth + "px";
                        Launcher_1.default.iframe.style.height = "auto";
                    }
                    // Launcher.iframe.style.height = "100%";
                    // Launcher.iframe.style.aspectRatio = "";
                }
            }
            else if (this.screenmode.includes("x")) {
                Launcher_1.default.iframe.style.width = this.screenmode.split("x")[0] + "";
                Launcher_1.default.iframe.style.height = this.screenmode.split("x")[1] + "";
                Launcher_1.default.iframe.style.aspectRatio = "";
            }
            else {
                Launcher_1.default.iframe.style.width = "100%";
                Launcher_1.default.iframe.style.height = "100%";
                Launcher_1.default.iframe.style.aspectRatio = "";
            }
        });
    }
    update(elapsed) {
        window.devicePixelRatio = 4;
        this.mouseOverCheck();
        //  if (Launcher.fullscreen) {
        this.updateScreenMode();
        //  }
        this.buttonsPressed.forEach((mdown, id) => {
            var _a, _b, _c;
            if (mdown) {
                this.buttonsPressed.set(id, false);
                let button = document.getElementById(id);
                // for some reason switch case didnt work here for me wtf
                if (id == "peekarrow") {
                    if (Launcher_1.default.iframeMode) {
                        this.isOut = !this.isOut;
                        if (this.isOut) {
                            button.innerText = "close";
                        }
                        else {
                            button.innerText = "chevron_right";
                        }
                    }
                }
                if (!this.isOut)
                    return;
                if (id == "fullscreen") {
                    if (!Launcher_1.default.fullscreenByOS) {
                        Launcher_1.default.toggleFullscreen();
                    }
                }
                else if (id == "refresh") {
                    if ((_a = this.recorder) === null || _a === void 0 ? void 0 : _a.recording) {
                        this.recorder.stopRecording();
                    }
                    Launcher_1.default.iframeDiv.removeChild(Launcher_1.default.iframe);
                    Launcher_1.default.initIframe();
                    Launcher_1.default.openURL(Launcher_1.default.lastURL);
                }
                else if (id == "pause") {
                    if (Launcher_1.default.iframe.src != "") {
                        if (Launcher_1.default.iframeMode) {
                            Launcher_1.default.closeIframe();
                        }
                        else {
                            Launcher_1.default.openIframeWindow();
                        }
                    }
                }
                else if (id == "settings") {
                    if (Launcher_1.default.iframeMode) {
                        let options = [];
                        options.push({
                            text: "Game List",
                            onselect: () => {
                                this.showGameSelect();
                            },
                            hasSecondary: true,
                        });
                        if (!((_b = Launcher_1.default.game) === null || _b === void 0 ? void 0 : _b.forcescreenmode)) {
                            options.push({
                                text: "Screen Size",
                                onselect: () => {
                                    Launcher_1.default.contextMenu.show([
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
                        if (Launcher_1.default.game != null && Launcher_1.default.game.versions != null && Launcher_1.default.game.versions.length > 1) {
                            options.push({
                                text: Launcher_1.default.game.overrideVersionListName != null ? Launcher_1.default.game.overrideVersionListName : "Set Version",
                                desc: "⚠ If you change versions, unsaved data will be lost.",
                                descFont: UniFont_1.default.ITALIC,
                                hasSecondary: true,
                                onselect: () => {
                                    var _a;
                                    let versions = [];
                                    if (Launcher_1.default.game != null && ((_a = Launcher_1.default.game) === null || _a === void 0 ? void 0 : _a.versions) != null) {
                                        Launcher_1.default.game.versions.forEach((version) => {
                                            versions.push({
                                                text: version.title,
                                                onselect: () => {
                                                    var _a;
                                                    if ((_a = this.recorder) === null || _a === void 0 ? void 0 : _a.recording) {
                                                        this.recorder.stopRecording();
                                                    }
                                                    Launcher_1.default.iframeDiv.removeChild(Launcher_1.default.iframe);
                                                    Launcher_1.default.initIframe();
                                                    Launcher_1.default.openGame(Launcher_1.default.game, version);
                                                }
                                            });
                                        });
                                        Launcher_1.default.contextMenu.show(versions);
                                    }
                                }
                            });
                        }
                        if (((_c = Launcher_1.default.game) === null || _c === void 0 ? void 0 : _c.gameKeys) != undefined) {
                            options.push({
                                text: "Controls",
                                desc: "(rebinding coming soon!)",
                                onselect: () => {
                                    var _a, _b;
                                    let controls = [];
                                    (_b = (_a = Launcher_1.default.game) === null || _a === void 0 ? void 0 : _a.gameKeys) === null || _b === void 0 ? void 0 : _b.forEach((gameKey) => {
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
                                            text: top,
                                            desc: bottom,
                                        });
                                        Launcher_1.default.contextMenu.show(controls);
                                    });
                                }
                            });
                        }
                        let switcherText = "Enable Performance Mode";
                        if (Launcher_1.default.performanceMode) {
                            switcherText = "Disable Performance Mode";
                        }
                        options.push({
                            text: switcherText,
                            desc: "Runs launcher menu at a low fps and other misc perf improvements.",
                            onselect: () => {
                                Launcher_1.default.performanceMode = !Launcher_1.default.performanceMode;
                                SettingsHandler_1.default.save({ performanceModeEnabled: Launcher_1.default.performanceMode });
                            }
                        });
                        switcherText = "Enable Raw Mouse Input";
                        if (SettingsHandler_1.default.data.rawMouseInputEnabled) {
                            switcherText = "Disable Raw Mouse Input";
                        }
                        options.push({
                            text: switcherText,
                            desc: 'Makes your mouse more accurate by removing mouse accel when pointer-locked.',
                            onselect: () => {
                                SettingsHandler_1.default.data.rawMouseInputEnabled = !SettingsHandler_1.default.data.rawMouseInputEnabled;
                                SettingsHandler_1.default.save();
                            }
                        });
                        options.push({
                            text: "Screenshot",
                            onselect: () => {
                                Launcher_1.default.screenshot();
                            }
                        });
                        if (this.recorder == null)
                            this.recorder = new CanvasRecorder_1.default();
                        if (!this.recorder.recording) {
                            if ("chrome" in window) {
                                options.push({
                                    text: "Start Recording (with audio)",
                                    desc: "Choose your screen under screen tab and share system audio for audio to work.",
                                    onselect: () => __awaiter(this, void 0, void 0, function* () {
                                        if (Launcher_1.default.iframe.contentWindow == null)
                                            return;
                                        let cnvs = Launcher_1.default.iframe.contentWindow.document.getElementsByTagName("canvas");
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
                                        let userMedia = yield navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
                                        userMedia.addEventListener("removetrack", (ev) => { var _a; (_a = this.recorder) === null || _a === void 0 ? void 0 : _a.stopRecording(); });
                                        this.recorder = new CanvasRecorder_1.default(userMedia);
                                        if (cnvs.length != 0) {
                                            this.recorder.setCanvasStream(cnvs[0]);
                                        }
                                        this.recorder.startRecording();
                                    })
                                });
                            }
                            options.push({
                                text: "Start Recording (without audio)",
                                onselect: () => __awaiter(this, void 0, void 0, function* () {
                                    if (Launcher_1.default.iframe.contentWindow == null)
                                        return;
                                    let cnvs = Launcher_1.default.iframe.contentWindow.document.getElementsByTagName("canvas");
                                    this.recorder = new CanvasRecorder_1.default();
                                    if (cnvs.length != 0) {
                                        this.recorder.setCanvasStream(cnvs[0]);
                                        this.recorder.startRecording();
                                    }
                                    else {
                                        alert("Game is loading, cannot record now!");
                                    }
                                })
                            });
                        }
                        else {
                            options.push({
                                text: "Stop Recording",
                                onselect: () => {
                                    if (Launcher_1.default.iframe.contentWindow == null)
                                        return;
                                    if (this.recorder != undefined) {
                                        this.recorder.stopRecording();
                                    }
                                }
                            });
                        }
                        if (Launcher_1.default.contextMenu.isOpen) {
                            Launcher_1.default.contextMenu.show(options, this.clickX, this.clickY);
                        }
                        else {
                            Launcher_1.default.contextMenu.show(options, Launcher_1.default.mx, Launcher_1.default.my);
                        }
                    }
                }
                else if (button.id == "forum") {
                    Launcher_1.default.contextMenu.show([
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
                button.setAttribute("disabled", String(!Launcher_1.default.iframeMode));
                if (!Launcher_1.default.iframeMode) {
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
                    if (Launcher_1.default.fullscreenByOS) {
                        button.setAttribute("title", "Cannot exit fullscreen as fullscreen was toggled\nby your os or browser.");
                    }
                    button.setAttribute("disabled", String(Launcher_1.default.fullscreenByOS));
                    let symbol = "fullscreen";
                    if (Launcher_1.default.fullscreen || Launcher_1.default.fullscreenByOS) {
                        symbol = "fullscreen_exit";
                    }
                    if (button.innerText != symbol) {
                        button.innerText = symbol;
                    }
                }
                else if (button.id == "pause") {
                    button.setAttribute("disabled", String(Launcher_1.default.iframe.src == ""));
                    if (!Launcher_1.default.iframeMode) {
                        button.setAttribute("title", "Return to game.");
                        button.innerText = "play_arrow";
                    }
                    else {
                        button.setAttribute("title", "Return to games and things.");
                        button.innerText = "pause";
                    }
                }
                else if (button.id == "settings") {
                    button.setAttribute("disabled", String(!Launcher_1.default.iframeMode));
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
        this.buttonsContextMenu.forEach((rdown, id) => {
            if (rdown) {
                this.buttonsContextMenu.set(id, false);
                if (id == "peekarrow") {
                    if (Launcher_1.default.iframeMode) {
                        Launcher_1.default.contextMenu.show([{
                                text: "Force Quit Game",
                                desc: "⚠ Unsaved data will be lost.",
                                descFont: UniFont_1.default.ITALIC,
                                onselect: () => {
                                    var _a;
                                    window.gameData = {};
                                    Launcher_1.default.curVersion = "";
                                    if ((_a = this.recorder) === null || _a === void 0 ? void 0 : _a.recording) {
                                        this.recorder.stopRecording();
                                    }
                                    Launcher_1.default.iframeDiv.removeChild(Launcher_1.default.iframe);
                                    Launcher_1.default.initIframe();
                                    Launcher_1.default.closeIframe();
                                }
                            }], this.clickX, this.clickY);
                    }
                }
                if (!this.isOut)
                    return;
                if (id == "refresh") {
                    Launcher_1.default.contextMenu.show([
                        {
                            text: "Force Refresh All",
                            desc: "⚠ Unsaved data will be lost.",
                            descFont: UniFont_1.default.ITALIC,
                            onselect: () => {
                                var _a;
                                if ((_a = this.recorder) === null || _a === void 0 ? void 0 : _a.recording) {
                                    this.recorder.stopRecording();
                                }
                                Launcher_1.default.iframeDiv.removeChild(Launcher_1.default.iframe);
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
    showGameSelect() {
        let gamesCtx = [];
        for (let i = this.currentPage * this.amountPerPage; i < (this.currentPage * this.amountPerPage) + this.amountPerPage; i++) {
            let game = Games_1.default.games[i];
            if (game == undefined)
                break;
            gamesCtx.push({
                text: game.title,
                desc: game.creator,
                descFont: UniFont_1.default.ITALIC,
                onselect: () => {
                    if (game.prefix == "app-dt") {
                        alert("NOTE: DO NOT CLICK CHAPTER SELECT IN GAME!\n\nChapter Select is available under the ⚙ Settings menu in the top left");
                    }
                    Launcher_1.default.openGame(game);
                }
            });
        }
        if (gamesCtx.length == this.amountPerPage) {
            gamesCtx.push({
                text: "Next Page",
                font: UniFont_1.default.BOLD,
                onselect: () => {
                    this.currentPage++;
                    this.showGameSelect();
                }
            });
        }
        if (this.currentPage != 0) {
            gamesCtx.splice(0, 0, {
                text: "Previous Page",
                font: UniFont_1.default.BOLD,
                onselect: () => {
                    this.currentPage--;
                    this.showGameSelect();
                }
            });
        }
        Launcher_1.default.contextMenu.show(gamesCtx);
    }
    destroy() {
        // throw new Error("Method not implemented.");
    }
}
exports.default = DrawerHandler;
