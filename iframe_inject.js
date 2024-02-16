// Log Replace
console.log = ((origFn) => {
    return function (v) {
        if ("gameData" in window.top && (v + "") != "[object Object]") {
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
        if ("gameData" in window.top && (v + "") != "[object Object]") {
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

Object.defineProperty(HTMLAudioElement.prototype, 'srcObject', {
    configurable: true,
    get: function () {
        console.log(this.constructor.name);
        return this.srcObject;

    }.bind(window),
    set: function (value) {
        console.log(this.constructor.name);
        this.srcObject = value;

    }.bind(window)
});
