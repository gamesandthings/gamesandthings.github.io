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
            attributes = Object.assign({}, attributes, {
                antialias: false,
            });
        }

        console.log(attributes);
        return origFn.call(this, type, attributes);
    };
})(HTMLCanvasElement.prototype.getContext);
AudioContext.prototype.createScriptProcessor = ((origFn) => {
    return function (bufferSize, numberOfInputChannels, numberOfOutputChannels) {
        window.top.gameAudioContexts.push(this);
        return origFn.call(this, bufferSize, numberOfInputChannels, numberOfOutputChannels);
    };
})(AudioContext.prototype.createScriptProcessor);
AudioContext.prototype.createMediaStreamSource = ((origFn) => {
    return function (element) {
        window.top.gameAudioContexts.push(this);
        return origFn.call(this, element);
    };
})(AudioContext.prototype.createMediaStreamSource);

OfflineAudioContext.prototype.createScriptProcessor = ((origFn) => {
    return function (bufferSize, numberOfInputChannels, numberOfOutputChannels) {
        window.top.gameAudioContexts.push(this);
        return origFn.call(this, bufferSize, numberOfInputChannels, numberOfOutputChannels);
    };
})(OfflineAudioContext.prototype.createScriptProcessor);
OfflineAudioContext.prototype.createBuffer = ((origFn) => {
    return function (numberOfChannels, length, sampleRate) {
        window.top.gameAudioContexts.push(this);
        return origFn.call(this, numberOfChannels, length, sampleRate);
    };
})(OfflineAudioContext.prototype.createBuffer);


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