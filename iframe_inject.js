// Log Replace
console.log = ((origFn) => {
    return function (v) {
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
console.log("Succesfully injected script!");
/* Use raw input for better feeling mouse */
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