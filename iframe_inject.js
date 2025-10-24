function isMobile() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}
// Log Replace
if (!("gatScriptInjected" in window)) {
    if ("gameData" in window.top) {
        let prefix = "[" + window.top.gameData.title + "]";
        console.log(prefix);
    }
    window.gatScriptInjected = true;
    window.top.localStorage_gat = {};
    console.log = ((origFn) => {
        return function (v) {
            if ("gameConfig" in window.top
                && window.top.gameConfig.performanceModeEnabled) {
                return;
            }
            if ("gameData" in window.top && v.constructor.name.toLowerCase() == "string") {
                let prefix = "[" + window.top.gameData.title + "]";
                if ("gameLogs" in window.top) {
                    window.top.gameLogs.push(v);
                }
                v = prefix + " " + v.replace(prefix, "");
            }
            return origFn.call(this, v);
        };
    })(console.log);
    console.info = ((origFn) => {
        return function (v) {
            if ("gameConfig" in window.top
                && window.top.gameConfig.performanceModeEnabled) {
                return;
            }
            if ("gameData" in window.top && v.constructor.name.toLowerCase() == "string") {
                let prefix = "[" + window.top.gameData.title + "]";
                if ("gameLogs" in window.top) {
                    window.top.gameLogs.push(v);
                }
                v = prefix + " " + v.replace(prefix, "");
            }
            return origFn.call(this, v);
        };
    })(console.info);
    /* Use raw input for better feeling mouse */
    if (!isMobile()) {
        HTMLCanvasElement.prototype.requestPointerLock = ((origFn) => {
            return function (options) {
                if ("gameConfig" in window.top) {
                    if (window.top.gameConfig.rawMouseInputEnabled) {
                        if (options == null || options == undefined) {
                            options = {};
                        }
                        options = Object.assign({}, options, {
                            unadjustedMovement: true,
                        });
                    }
                }

                return new Promise((resolve, reject) => {
                    origFn.call(this, options).then(() => {
                        resolve();
                    }).catch(() => {
                        resolve(origFn.call(this, {}));
                    });
                });
            };
        })(HTMLCanvasElement.prototype.requestPointerLock);
    }
    else {
        const touchHandler = (ev) => {
            if (ev.target instanceof HTMLIFrameElement) {
                ev.preventDefault(); // Prevent text selection
            }
        }
        document.addEventListener('touchstart', touchHandler, { passive: false });
        document.addEventListener('touchmove', touchHandler, { passive: false });
        document.addEventListener('touchend', touchHandler, { passive: false });
        document.addEventListener('touchcancel', touchHandler, { passive: false });
    }
    EventTarget.prototype.addEventListener = ((origFn) => {
        return function (type, callback, options) {
            if (type == "mousemove" && "onpointerrawupdate" in window) {
                if ("gameConfig" in window.top) {
                    if (window.top.gameConfig.rawMouseInputEnabled) {
                        type = "pointerrawupdate";
                    }
                }
            }
            console.log(type);
            return origFn.call(this, type, callback, options);
        };
    })(EventTarget.prototype.addEventListener);
    HTMLCanvasElement.prototype.getContext = ((origFn) => {
        return function (type, attributes) {
            if ("fixes" in window.top.gameData) {
                if (window.top.gameData.fixes.runsAtSetFrameRate) {
                    attributes = Object.assign({}, attributes, {
                        desynchronized: false,
                    });
                }
                if (window.top.gameData.fixes.preserveDrawingBuffer) {
                    attributes = Object.assign({}, attributes, {
                        preserveDrawingBuffer: true,
                    });
                }
                if (window.top.gameData.fixes.alpha != undefined) {
                    attributes = Object.assign({}, attributes, {
                        alpha: window.top.gameData.fixes.alpha,
                    });
                }
                if (window.top.gameData.fixes.removeVsync) {
                    attributes = Object.assign({}, attributes, {
                        desynchronized: true,
                    });
                }
                attributes = Object.assign({}, attributes, {
                    antialias: false,
                    powerPreference: "high-performance",
                    preferLowPowerToHighPerformance: false,
                });
                if (window.top.gameData.fixes.pointerLockFix) {
                    this.addEventListener("click", async () => {
                        await this.requestPointerLock();
                    });
                }
            }

            console.log(attributes);
            return origFn.call(this, type, attributes);
        };
    })(HTMLCanvasElement.prototype.getContext);
    // Keybinding fix
    Window.prototype.addEventListener = ((origFn) => {
        return function (type, callback, options) {
            if (type == "keydown" || type == "keyup" || type == "keypress") {
                callback = ((origCall) => {
                    return function (ev) {
                        let dontCall = false;
                        if (window.top.gameKeys != []) {
                            window.top.gameKeys.forEach((gKey) => {
                                let k = gKey.key;
                                if (gKey.disableOriginal && k.key == ev.key && k.keyCode == ev.keyCode && k.code == ev.code) {
                                    ev.preventDefault();
                                    dontCall = true;
                                    return;
                                }
                                gKey.extraKeys.forEach((key) => {
                                    let k = key;
                                    if (k.key == ev.key && k.keyCode == ev.keyCode && k.code == ev.code) {
                                        // console.log(gKey);
                                        ev = new KeyboardEvent(type, {
                                            key: gKey.key.key,
                                            code: gKey.key.code,
                                            keyCode: gKey.key.keyCode,
                                            timestep: ev.timestep,
                                        });
                                    }
                                });
                            });
                        }
                        if (!dontCall) {
                            return origCall.call(this, ev);
                        }
                    };
                })(callback);
            }
            return origFn.call(this, type, callback, options);

        };
    })(Window.prototype.addEventListener);

    let lastTime = 0;

    requestAnimationFrame = ((origFn) => {
        return function (callback) {
            let v = document.timeline.currentTime - lastTime;
            if (v != 0) {
                window.top.gat_delta = v;
            }
            lastTime = document.timeline.currentTime;
            return origFn.call(this, callback);
        };
    })(requestAnimationFrame);

    setTimeout = ((origFn) => {
        return function (callback, time) {
            return origFn.call(this, callback, time);
        };
    })(setTimeout);


    // Save data storing (we save it to indexeddb)
    function saveData_Gat() {
        Object.keys(window.localStorage).forEach((key) => {
            let item = window.localStorage.getItem(key);
            if (item != null && key != 'gat_settings') {
                window.top.localStorage_gat[key] = item;
            }
        });
        console.info("storage update");

    };
    setInterval(saveData_Gat, 1000 / 5);

    var style = document.createElement('style');
    document.head.appendChild(style);
    style.innerHTML =
        "canvas{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0;-webkit-tap-highlight-color:rgba(255,255,255,0)}" +
        "body{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0}";

    function createHandler(func, timeout) {

        let timer = null;
        let pressed = false;

        return function () {

            if (timer) {
                clearTimeout(timer);
            }

            if (pressed) {
                if (func) {
                    func.apply(this, arguments);
                }
                clear();
            } else {
                pressed = true;
                setTimeout(clear, timeout || 500);
            }

        };

        function clear() {
            timeout = null;
            pressed = false;
        }

    }

    // ....
    // And you would use it like this:

    const ignore = createHandler((e) => e.preventDefault(), 500);
    document.body.addEventListener('touchstart', ignore, { passive: false })
}
