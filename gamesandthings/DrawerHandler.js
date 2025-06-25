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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Launcher_1 = __importDefault(require("../Launcher"));
var UniFont_1 = __importDefault(require("./UniFont"));
var CanvasRecorder_1 = __importDefault(require("./CanvasRecorder"));
var Vector2_1 = __importDefault(require("./types/Vector2"));
var SettingsHandler_1 = __importDefault(require("./SettingsHandler"));
var Games_1 = __importDefault(require("./Games"));
var FilterHandler_1 = __importDefault(require("./FilterHandler"));
var DrawerHandler = /** @class */ (function () {
    function DrawerHandler(elem) {
        var _this = this;
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
        elem.querySelectorAll("*").forEach(function (b) {
            var button = b;
            _this.addMouseListeners(button);
        });
        window.addEventListener("resize", function (event) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.updateScreenMode();
                return [2 /*return*/];
            });
        }); });
    }
    DrawerHandler.prototype.addMouseListeners = function (button) {
        var _this = this;
        this.buttonsPressed.set(button.id, false);
        this.buttons.push(button);
        button.addEventListener("click", function (ev) {
            if (!Launcher_1.default.contextMenu.isOpen) {
                _this.clickX = ev.clientX;
                _this.clickY = ev.clientY;
            }
            if (_this.isOut) {
                _this.buttonsPressed.set(button.id, true);
            }
            else {
                if (button.id == "peekarrow") {
                    _this.buttonsPressed.set(button.id, true);
                }
            }
        });
        button.addEventListener("touchstart", function (ev) {
            if (ev.touches[0] == undefined)
                return;
            _this.clickX = ev.touches[0].clientX;
            _this.clickY = ev.touches[0].clientY;
        });
        button.addEventListener("touchend", function (ev) {
            if (ev.touches[0] == undefined)
                return;
            _this.clickX = ev.touches[0].clientX;
            _this.clickY = ev.touches[0].clientY;
            if (_this.isOut) {
                _this.buttonsPressed.set(button.id, true);
            }
            else {
                if (button.id == "peekarrow") {
                    _this.buttonsPressed.set(button.id, true);
                }
            }
        });
        button.addEventListener("dblclick", function (ev) {
            _this.buttonsContextMenu.set(button.id, true);
        });
        button.addEventListener("mouseover", function (ev) {
            _this.buttonsMouseOver.set(button.id, true);
        });
        button.addEventListener("mouseout", function (ev) {
            _this.buttonsMouseOver.set(button.id, false);
        });
        button.addEventListener("contextmenu", function (ev) {
            if (!Launcher_1.default.contextMenu.isOpen) {
                _this.clickX = ev.clientX;
                _this.clickY = ev.clientY;
            }
            _this.buttonsContextMenu.set(button.id, true);
            ev.preventDefault();
        });
        button.addEventListener("blur", function (ev) {
            _this.isOut = false;
        });
    };
    DrawerHandler.prototype.create = function () { };
    DrawerHandler.prototype.mouseOverCheck = function () {
        var _this = this;
        var _a;
        if (Launcher_1.default.iframeMode) {
            this.mouseOver = false;
            this.buttonsMouseOver.forEach(function (mOver, key) {
                if (mOver) {
                    _this.mouseOver = true;
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
    };
    DrawerHandler.prototype.aspectRatioFit = function (srcWidth, srcHeight, maxWidth, maxHeight) {
        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        var vector = new Vector2_1.default();
        vector.x = srcWidth * ratio;
        vector.y = srcHeight * ratio;
        return vector;
    };
    DrawerHandler.prototype.fixedResolutionContext = function () {
        var _this = this;
        Launcher_1.default.contextMenu.show([
            {
                text: "1080p", onselect: function () {
                    _this.screenmode = "1920x1080";
                    _this.updateScreenMode();
                },
            },
            {
                text: "720p", onselect: function () {
                    _this.screenmode = "1280x720";
                    _this.updateScreenMode();
                },
            },
            {
                text: "480p", onselect: function () {
                    _this.screenmode = "854x480";
                    _this.updateScreenMode();
                },
            },
            {
                text: "360p", onselect: function () {
                    _this.screenmode = "640x360";
                    _this.updateScreenMode();
                },
            },
            {
                text: "240p", onselect: function () {
                    _this.screenmode = "426x240";
                    _this.updateScreenMode();
                },
            },
            {
                text: "144p", onselect: function () {
                    _this.screenmode = "256x144";
                    _this.updateScreenMode();
                },
            },
            {
                text: "Custom", onselect: function () {
                    var prompt = window.prompt("Enter Resolution:\n(example 1920x1080)");
                    if (prompt == null)
                        return;
                    _this.screenmode = prompt;
                    _this.updateScreenMode();
                },
                hasSecondary: true
            }
        ], this.clickX, this.clickY);
    };
    DrawerHandler.prototype.updateScreenMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualHeight;
            return __generator(this, function (_a) {
                if (this == null)
                    return [2 /*return*/];
                if (this.screenmode.includes("/") || this.screenmode.includes(":")) {
                    this.screenmode = this.screenmode.replace(":", "/");
                    actualHeight = window.outerHeight;
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
                        return [2 /*return*/];
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
                return [2 /*return*/];
            });
        });
    };
    DrawerHandler.prototype.update = function (elapsed) {
        var _this = this;
        window.devicePixelRatio = 4;
        this.mouseOverCheck();
        //  if (Launcher.fullscreen) {
        this.updateScreenMode();
        //  }
        this.buttonsPressed.forEach(function (mdown, id) {
            var _a, _b, _c;
            if (mdown) {
                _this.buttonsPressed.set(id, false);
                var button = document.getElementById(id);
                // for some reason switch case didnt work here for me wtf
                if (id == "peekarrow") {
                    if (Launcher_1.default.iframeMode) {
                        _this.isOut = !_this.isOut;
                        if (_this.isOut) {
                            button.innerText = "close";
                        }
                        else {
                            button.innerText = "chevron_right";
                        }
                    }
                }
                if (!_this.isOut)
                    return;
                if (id == "fullscreen") {
                    if (!Launcher_1.default.fullscreenByOS) {
                        Launcher_1.default.toggleFullscreen();
                    }
                }
                else if (id == "refresh") {
                    if ((_a = _this.recorder) === null || _a === void 0 ? void 0 : _a.recording) {
                        _this.recorder.stopRecording();
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
                        var options = [];
                        options.push({
                            text: "Game List",
                            onselect: function () {
                                _this.showGameSelect();
                            },
                            hasSecondary: true,
                        });
                        if (!((_b = Launcher_1.default.game) === null || _b === void 0 ? void 0 : _b.forcescreenmode)) {
                            options.push({
                                text: "Screen Size",
                                onselect: function () {
                                    Launcher_1.default.contextMenu.show([
                                        {
                                            text: "4:3",
                                            onselect: function () {
                                                _this.screenmode = "4/3";
                                                _this.updateScreenMode();
                                            }
                                        },
                                        {
                                            text: "16:9",
                                            onselect: function () {
                                                _this.screenmode = "16/9";
                                                _this.updateScreenMode();
                                            }
                                        },
                                        {
                                            text: "16:10",
                                            onselect: function () {
                                                _this.screenmode = "16/10";
                                                _this.updateScreenMode();
                                            }
                                        },
                                        {
                                            text: "Fit to window",
                                            onselect: function () {
                                                _this.screenmode = "window";
                                                _this.updateScreenMode();
                                            }
                                        },
                                        {
                                            text: "Fixed Resolution",
                                            onselect: function () {
                                                _this.fixedResolutionContext();
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
                                onselect: function () {
                                    var _a;
                                    var versions = [];
                                    if (Launcher_1.default.game != null && ((_a = Launcher_1.default.game) === null || _a === void 0 ? void 0 : _a.versions) != null) {
                                        Launcher_1.default.game.versions.forEach(function (version) {
                                            versions.push({
                                                text: version.title,
                                                onselect: function () {
                                                    var _a;
                                                    if ((_a = _this.recorder) === null || _a === void 0 ? void 0 : _a.recording) {
                                                        _this.recorder.stopRecording();
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
                        options.push({
                            text: "Filters",
                            onselect: function () {
                                Launcher_1.default.contextMenu.show([
                                    {
                                        text: "Blur: " + Launcher_1.default.iframeFilterHandler.blur,
                                        onselect: function () {
                                            var value = prompt("Blur: ", Launcher_1.default.iframeFilterHandler.blur + "");
                                            if (value != null)
                                                Launcher_1.default.iframeFilterHandler.blur = parseFloat(value);
                                        }
                                    },
                                    {
                                        text: "Grayscale: " + (Launcher_1.default.iframeFilterHandler.grayscale ? "Yes" : "No"),
                                        onselect: function () {
                                            Launcher_1.default.iframeFilterHandler.grayscale = !Launcher_1.default.iframeFilterHandler.grayscale;
                                        }
                                    },
                                    {
                                        text: "Saturation: " + Launcher_1.default.iframeFilterHandler.saturate,
                                        onselect: function () {
                                            var value = prompt("Saturation: ", Launcher_1.default.iframeFilterHandler.saturate + "");
                                            if (value != null)
                                                Launcher_1.default.iframeFilterHandler.saturate = parseFloat(value);
                                        }
                                    },
                                    {
                                        text: "Contrast: " + Launcher_1.default.iframeFilterHandler.contrast,
                                        onselect: function () {
                                            var value = prompt("Contrast: ", Launcher_1.default.iframeFilterHandler.contrast + "");
                                            if (value != null)
                                                Launcher_1.default.iframeFilterHandler.contrast = parseFloat(value);
                                        }
                                    },
                                    {
                                        text: "Sepia: " + Launcher_1.default.iframeFilterHandler.sepia,
                                        onselect: function () {
                                            var value = prompt("Sepia: ", Launcher_1.default.iframeFilterHandler.sepia + "");
                                            if (value != null)
                                                Launcher_1.default.iframeFilterHandler.sepia = parseFloat(value);
                                        }
                                    },
                                    {
                                        text: "Invert: " + (Launcher_1.default.iframeFilterHandler.invert ? "Yes" : "No"),
                                        onselect: function () {
                                            Launcher_1.default.iframeFilterHandler.invert = !Launcher_1.default.iframeFilterHandler.invert;
                                        }
                                    },
                                    {
                                        text: "Reset",
                                        onselect: function () {
                                            Launcher_1.default.iframeFilterHandler = new FilterHandler_1.default();
                                        }
                                    },
                                ]);
                            },
                            hasSecondary: true,
                        });
                        if (((_c = Launcher_1.default.game) === null || _c === void 0 ? void 0 : _c.gameKeys) != undefined) {
                            options.push({
                                text: "Controls",
                                desc: "(rebinding coming soon!)",
                                hasSecondary: true,
                                onselect: function () {
                                    var _a, _b;
                                    var controls = [];
                                    (_b = (_a = Launcher_1.default.game) === null || _a === void 0 ? void 0 : _a.gameKeys) === null || _b === void 0 ? void 0 : _b.forEach(function (gameKey) {
                                        var top = gameKey.name;
                                        var bottom = "";
                                        if (!gameKey.disableOriginal) {
                                            var key = gameKey.key.key.replace('Arrow', '').replace(' ', 'Space').replace('Left', 'Left ').replace('Right', 'Right ');
                                            if (key.length == 1) {
                                                key = key.toUpperCase();
                                            }
                                            bottom = key;
                                        }
                                        gameKey.extraKeys.forEach(function (exkey, i) {
                                            if (bottom != "") {
                                                var key = exkey.key.replace('Arrow', '').replace(' ', 'Space').replace('Left', 'Left ').replace('Right', 'Right ');
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
                                        Launcher_1.default.contextMenu.show(controls);
                                    });
                                }
                            });
                        }
                        var switcherText = "Enable Performance Mode";
                        if (Launcher_1.default.performanceMode) {
                            switcherText = "Disable Performance Mode";
                        }
                        options.push({
                            text: switcherText,
                            desc: "Runs launcher menu at a low fps and other misc perf improvements.",
                            onselect: function () {
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
                            onselect: function () {
                                SettingsHandler_1.default.data.rawMouseInputEnabled = !SettingsHandler_1.default.data.rawMouseInputEnabled;
                                SettingsHandler_1.default.save();
                            }
                        });
                        options.push({
                            text: "Screenshot",
                            onselect: function () {
                                Launcher_1.default.screenshot();
                            }
                        });
                        if (_this.recorder == null)
                            _this.recorder = new CanvasRecorder_1.default();
                        if (!_this.recorder.recording) {
                            if ("chrome" in window) {
                                options.push({
                                    text: "Start Recording (with audio)",
                                    desc: "Choose your screen under screen tab and share system audio for audio to work.",
                                    onselect: function () { return __awaiter(_this, void 0, void 0, function () {
                                        var cnvs, displayMediaOptions, userMedia;
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (Launcher_1.default.iframe.contentWindow == null)
                                                        return [2 /*return*/];
                                                    cnvs = Launcher_1.default.iframe.contentWindow.document.getElementsByTagName("canvas");
                                                    displayMediaOptions = {
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
                                                    return [4 /*yield*/, navigator.mediaDevices.getDisplayMedia(displayMediaOptions)];
                                                case 1:
                                                    userMedia = _a.sent();
                                                    userMedia.addEventListener("removetrack", function (ev) { var _a; (_a = _this.recorder) === null || _a === void 0 ? void 0 : _a.stopRecording(); });
                                                    this.recorder = new CanvasRecorder_1.default(userMedia);
                                                    if (cnvs.length != 0) {
                                                        this.recorder.setCanvasStream(cnvs[0]);
                                                    }
                                                    this.recorder.startRecording();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }
                                });
                            }
                            options.push({
                                text: "Start Recording (without audio)",
                                onselect: function () { return __awaiter(_this, void 0, void 0, function () {
                                    var cnvs;
                                    return __generator(this, function (_a) {
                                        if (Launcher_1.default.iframe.contentWindow == null)
                                            return [2 /*return*/];
                                        cnvs = Launcher_1.default.iframe.contentWindow.document.getElementsByTagName("canvas");
                                        this.recorder = new CanvasRecorder_1.default();
                                        if (cnvs.length != 0) {
                                            this.recorder.setCanvasStream(cnvs[0]);
                                            this.recorder.startRecording();
                                        }
                                        else {
                                            alert("Game is loading, cannot record now!");
                                        }
                                        return [2 /*return*/];
                                    });
                                }); }
                            });
                        }
                        else {
                            options.push({
                                text: "Stop Recording",
                                onselect: function () {
                                    if (Launcher_1.default.iframe.contentWindow == null)
                                        return;
                                    if (_this.recorder != undefined) {
                                        _this.recorder.stopRecording();
                                    }
                                }
                            });
                        }
                        if (Launcher_1.default.contextMenu.isOpen) {
                            Launcher_1.default.contextMenu.show(options, _this.clickX, _this.clickY);
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
                            onselect: function () {
                                window.open("https://discord.com/invite/up7VmmCPhn");
                            }
                        }
                    ]);
                }
            }
        });
        this.buttons.forEach(function (button) {
            if (button.id == "peekarrow") {
                button.setAttribute("disabled", String(!Launcher_1.default.iframeMode));
                if (!Launcher_1.default.iframeMode) {
                    button.innerText = "close";
                }
                if (!_this.isOut && button.innerText == "close") {
                    button.innerText = "chevron_right";
                }
            }
            if (_this.isOut) {
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
                    var symbol = "fullscreen";
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
        this.buttonsContextMenu.forEach(function (rdown, id) {
            if (rdown) {
                _this.buttonsContextMenu.set(id, false);
                if (id == "peekarrow") {
                    if (Launcher_1.default.iframeMode) {
                        Launcher_1.default.contextMenu.show([{
                                text: "Force Quit Game",
                                desc: "⚠ Unsaved data will be lost.",
                                descFont: UniFont_1.default.ITALIC,
                                onselect: function () {
                                    Launcher_1.default.forceQuit();
                                }
                            }], _this.clickX, _this.clickY);
                    }
                }
                if (!_this.isOut)
                    return;
                if (id == "refresh") {
                    Launcher_1.default.contextMenu.show([
                        {
                            text: "Force Refresh All",
                            desc: "⚠ Unsaved data will be lost.",
                            descFont: UniFont_1.default.ITALIC,
                            onselect: function () {
                                var _a;
                                if ((_a = _this.recorder) === null || _a === void 0 ? void 0 : _a.recording) {
                                    _this.recorder.stopRecording();
                                }
                                Launcher_1.default.iframeDiv.removeChild(Launcher_1.default.iframe);
                                window.location.reload();
                            }
                        },
                    ], _this.clickX, _this.clickY);
                }
            }
        });
        this.elem.style.opacity = String(this.alpha);
        this.elem.style.left = String(this.x) + "px";
        this.elem.style.top = String(this.y) + "px";
    };
    DrawerHandler.prototype.showGameSelect = function () {
        var _this = this;
        var gamesCtx = [];
        var _loop_1 = function (i) {
            var game = Games_1.default.games[i];
            if (game == undefined)
                return "break";
            gamesCtx.push({
                text: game.title,
                desc: game.creator,
                descFont: UniFont_1.default.ITALIC,
                onselect: function () {
                    if (game.prefix == "app-dt") {
                        alert("NOTE: DO NOT CLICK CHAPTER SELECT IN GAME!\n\nChapter Select is available under the ⚙ Settings menu in the top left");
                    }
                    Launcher_1.default.openGame(game);
                }
            });
        };
        for (var i = this.currentPage * this.amountPerPage; i < (this.currentPage * this.amountPerPage) + this.amountPerPage; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break")
                break;
        }
        if (gamesCtx.length == this.amountPerPage) {
            gamesCtx.push({
                text: "Next Page",
                font: UniFont_1.default.BOLD,
                onselect: function () {
                    _this.currentPage++;
                    _this.showGameSelect();
                }
            });
        }
        if (this.currentPage != 0) {
            gamesCtx.splice(0, 0, {
                text: "Previous Page",
                font: UniFont_1.default.BOLD,
                onselect: function () {
                    _this.currentPage--;
                    _this.showGameSelect();
                }
            });
        }
        Launcher_1.default.contextMenu.show(gamesCtx);
    };
    DrawerHandler.prototype.destroy = function () {
        // throw new Error("Method not implemented.");
    };
    return DrawerHandler;
}());
exports.default = DrawerHandler;
