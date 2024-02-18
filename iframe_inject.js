// Log Replace
if ("gatScriptInjected" in window) {

}
else {
    window.gatScriptInjected = true;
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
    if ("gameData" in window.top && window.top.gameData.title == "Sonic CD") {
        function convertDataURIToBinary(dataURI) {
            var BASE64_MARKER = ';base64,';
            var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
            var base64 = dataURI.substring(base64Index);
            var raw = window.atob(base64);
            var rawLength = raw.length;
            var array = new Uint8Array(new ArrayBuffer(rawLength));

            for (i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
            }
            console.log(array);
            return array;
        }
        let sonic_cd_save_file = window.localStorage.getItem('sonic_cd_save_file');
        if (sonic_cd_save_file != null) {
            FS.writeFile('/SData.bin', convertDataURIToBinary("data:application/octet-stream;base64," + sonic_cd_save_file));
        }
        window.setInterval(() => {
            if (FS.readdir('/').includes('SData.bin')) {
                var bb = new Blob([FS.readFile('/SData.bin')]);
                var f = new FileReader();
                f.onload = function (e) {
                    window.localStorage.setItem('sonic_cd_save_file', e.target.result.replace("data:application/octet-stream;base64,", ""))
                };
                f.readAsDataURL(bb);
            }
        });
    }
}
