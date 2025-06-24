"use strict";
// CanvasRecorder.js - smusamashah
// To record canvas effitiently using MediaRecorder
// https://webrtc.github.io/samples/src/content/capture/canvas-record/
// https://github.com/SMUsamaShah/CanvasRecorder/blob/master/CanvasRecorder.js
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
var fix_webm_duration_1 = __importDefault(require("fix-webm-duration"));
// Modified and Converted to typescript by letsgoawaydev
var CanvasRecorder = /** @class */ (function () {
    function CanvasRecorder(stream, video_bits_per_sec) {
        if (video_bits_per_sec === void 0) { video_bits_per_sec = 4500000; }
        this.startTime = 0;
        this.recordedBlobs = [];
        this.supportedType = undefined;
        this.mediaRecorder = null;
        this.recording = false;
        this.stream = stream;
        this.recordedBlobs = [];
        this.supportedType = undefined;
        this.mediaRecorder = null;
        this.video_bits_per_sec = video_bits_per_sec;
    }
    CanvasRecorder.prototype.setStream = function (stream) {
        this.stream = stream;
    };
    CanvasRecorder.prototype.setCanvasStream = function (canvas) {
        this.canvasStream = canvas.captureStream();
    };
    CanvasRecorder.prototype.startRecording = function () {
        return __awaiter(this, void 0, void 0, function () {
            var types, i, options, mediaStream;
            var _this = this;
            return __generator(this, function (_a) {
                types = [
                    "video/webm",
                    'video/webm,codecs=vp9',
                    "video/webm\;codecs=vp8",
                    "video/webm\;codecs=daala",
                    "video/webm\;codecs=h264",
                ];
                for (i in types) {
                    if (MediaRecorder.isTypeSupported(types[i])) {
                        console.log(types[i]);
                        this.supportedType = types[i];
                        //break;
                    }
                }
                if (this.supportedType == null) {
                    console.error("No supported type found for MediaRecorder");
                    this.recording = false;
                }
                options = {
                    mimeType: this.supportedType,
                    videoBitsPerSecond: this.video_bits_per_sec,
                };
                this.recordedBlobs = [];
                mediaStream = new MediaStream();
                try {
                    if (this.stream == null && this.canvasStream != null) {
                        mediaStream = new MediaStream(this.canvasStream);
                    }
                    else if (this.canvasStream == null && this.stream != null) {
                        mediaStream = new MediaStream(this.stream);
                    }
                    else if (this.canvasStream != null && this.stream != null) {
                        mediaStream = new MediaStream(this.canvasStream);
                        if (this.stream.getAudioTracks().length != 0) {
                            this.stream.getVideoTracks()[0].stop();
                            mediaStream.addTrack(this.stream.getAudioTracks()[0]);
                            this.stream.getAudioTracks()[0].onended = function (ev) {
                                _this.stopRecording();
                            };
                        }
                        else {
                            this.handleStop(undefined);
                            window.alert("Audio permission was not granted!\nTry again with share system audio toggle on.");
                            return [2 /*return*/];
                        }
                    }
                }
                catch (e) {
                    alert('MediaRecorder is not supported by this browser.');
                    console.error('Exception while creating MediaRecorder:', e);
                    return [2 /*return*/];
                }
                if (mediaStream == null) {
                    console.error("Media stream is null!");
                    return [2 /*return*/];
                }
                this.mediaRecorder = new MediaRecorder(mediaStream, options);
                console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
                this.mediaRecorder.addEventListener("error", function (ev) {
                    _this.handleStop(ev);
                });
                this.mediaRecorder.addEventListener("stop", function (ev) {
                    _this.handleStop(ev);
                });
                this.mediaRecorder.addEventListener("dataavailable", function (ev) {
                    _this.handleDataAvailable(ev);
                });
                this.recording = true;
                this.mediaRecorder.start(100); // collect 100ms of data blobs
                this.startTime = Date.now();
                console.log('MediaRecorder started', this.mediaRecorder);
                return [2 /*return*/];
            });
        });
    };
    CanvasRecorder.prototype.handleDataAvailable = function (ev) {
        if (ev.data != null && ev.data.size > 0) {
            this.recordedBlobs.push(ev.data);
        }
    };
    CanvasRecorder.prototype.handleStop = function (ev) {
        this.recording = false;
        console.log('Recorder stopped: ', ev);
        this.download();
        if (this.stream == null)
            return;
        this.stream.getTracks().forEach(function (track) {
            track.stop();
        });
    };
    CanvasRecorder.prototype.stopRecording = function () {
        var _a;
        this.recording = false;
        (_a = this.mediaRecorder) === null || _a === void 0 ? void 0 : _a.stop();
        if (this.stream == null)
            return;
        this.stream.getTracks().forEach(function (track) {
            track.stop();
        });
        console.log('Recorded Blobs: ', this.recordedBlobs);
        this.stream = null;
    };
    CanvasRecorder.prototype.download = function (file_name) {
        if (file_name == undefined) {
            file_name = "Games and Things - " + document.title.valueOf() + " " + new Date(this.startTime).toLocaleString() + ".webm";
        }
        if (!(this.recordedBlobs.length > 0))
            return;
        var blob = new Blob(this.recordedBlobs, { type: this.supportedType });
        var duration = Date.now() - this.startTime;
        (0, fix_webm_duration_1.default)(blob, duration, { logger: false })
            .then(function (fixedBlob) {
            var url = window.URL.createObjectURL(fixedBlob);
            if (file_name == undefined) {
                return;
            }
            var a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = file_name;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                a.remove();
            }, 100);
        });
        this.recordedBlobs = [];
    };
    return CanvasRecorder;
}());
exports.default = CanvasRecorder;
