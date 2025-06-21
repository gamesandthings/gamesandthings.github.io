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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fix_webm_duration_1 = __importDefault(require("fix-webm-duration"));
// Modified and Converted to typescript by letsgoawaydev
class CanvasRecorder {
    constructor(stream, video_bits_per_sec = 4500000) {
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
    setStream(stream) {
        this.stream = stream;
    }
    setCanvasStream(canvas) {
        this.canvasStream = canvas.captureStream();
    }
    startRecording() {
        return __awaiter(this, void 0, void 0, function* () {
            let types = [
                "video/webm",
                'video/webm,codecs=vp9',
                "video/webm\;codecs=vp8",
                "video/webm\;codecs=daala",
                "video/webm\;codecs=h264",
            ];
            for (let i in types) {
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
            let options = {
                mimeType: this.supportedType,
                videoBitsPerSecond: this.video_bits_per_sec,
            };
            this.recordedBlobs = [];
            let mediaStream = new MediaStream();
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
                        this.stream.getAudioTracks()[0].onended = (ev) => {
                            this.stopRecording();
                        };
                    }
                    else {
                        this.handleStop(undefined);
                        window.alert("Audio permission was not granted!\nTry again with share system audio toggle on.");
                        return;
                    }
                }
            }
            catch (e) {
                alert('MediaRecorder is not supported by this browser.');
                console.error('Exception while creating MediaRecorder:', e);
                return;
            }
            if (mediaStream == null) {
                console.error("Media stream is null!");
                return;
            }
            this.mediaRecorder = new MediaRecorder(mediaStream, options);
            console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
            this.mediaRecorder.addEventListener("error", (ev) => {
                this.handleStop(ev);
            });
            this.mediaRecorder.addEventListener("stop", (ev) => {
                this.handleStop(ev);
            });
            this.mediaRecorder.addEventListener("dataavailable", (ev) => {
                this.handleDataAvailable(ev);
            });
            this.recording = true;
            this.mediaRecorder.start(100); // collect 100ms of data blobs
            this.startTime = Date.now();
            console.log('MediaRecorder started', this.mediaRecorder);
        });
    }
    handleDataAvailable(ev) {
        if (ev.data != null && ev.data.size > 0) {
            this.recordedBlobs.push(ev.data);
        }
    }
    handleStop(ev) {
        this.recording = false;
        console.log('Recorder stopped: ', ev);
        this.download();
        if (this.stream == null)
            return;
        this.stream.getTracks().forEach(function (track) {
            track.stop();
        });
    }
    stopRecording() {
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
    }
    download(file_name) {
        if (file_name == undefined) {
            file_name = "Games and Things - " + document.title.valueOf() + " " + new Date(this.startTime).toLocaleString() + ".webm";
        }
        if (!(this.recordedBlobs.length > 0))
            return;
        const blob = new Blob(this.recordedBlobs, { type: this.supportedType });
        var duration = Date.now() - this.startTime;
        (0, fix_webm_duration_1.default)(blob, duration, { logger: false })
            .then(function (fixedBlob) {
            const url = window.URL.createObjectURL(fixedBlob);
            if (file_name == undefined) {
                return;
            }
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = file_name;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                a.remove();
            }, 100);
        });
        this.recordedBlobs = [];
    }
}
exports.default = CanvasRecorder;
