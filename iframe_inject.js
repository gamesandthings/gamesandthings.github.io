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
                //console.log(options);
                return origFn.call(this, options);
            };
        })(HTMLCanvasElement.prototype.requestPointerLock);
    }
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
    function raf(timestep) {
        Object.keys(window.localStorage).forEach((key) => {
            let item = window.localStorage.getItem(key);
            if (item != null && key != 'gat_settings') {
                window.top.localStorage_gat[key] = item;
            }
        });
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

}
