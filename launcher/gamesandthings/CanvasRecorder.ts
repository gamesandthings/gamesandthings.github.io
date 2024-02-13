// CanvasRecorder.js - smusamashah
// To record canvas effitiently using MediaRecorder
// https://webrtc.github.io/samples/src/content/capture/canvas-record/
// https://github.com/SMUsamaShah/CanvasRecorder/blob/master/CanvasRecorder.js

import Launcher from "../Launcher";
import fixWebmDuration from "fix-webm-duration";

// Modified and Converted to typescript by letsgoawaydev

export default class CanvasRecorder {
    stream: MediaStream | null | undefined;
    canvasStream!: MediaStream | null;
    startTime: number = 0;
    private recordedBlobs: Array<any> = [];
    private supportedType: string | undefined = undefined;
    private mediaRecorder: MediaRecorder | null = null;
    public recording: boolean = false;
    video_bits_per_sec!: number;
    constructor(stream?: MediaStream | null, video_bits_per_sec: number = 4000000) {
        this.stream = stream;
        this.recordedBlobs = [];
        this.supportedType = undefined;
        this.mediaRecorder = null;
        this.video_bits_per_sec = video_bits_per_sec;
    }
    setStream(stream: MediaStream) {
        this.stream = stream;
    }
    setCanvasStream(canvas: HTMLCanvasElement) {
        this.canvasStream = canvas.captureStream();
    }
    async startRecording() {

        if (MediaRecorder.isTypeSupported("video/webm")) {
            this.supportedType = "video/webm";
        }

        if (this.supportedType == null) {
            console.error("No supported type found for MediaRecorder");
            this.recording = false;
        }

        let options: MediaRecorderOptions = {
            mimeType: this.supportedType,
            videoBitsPerSecond: this.video_bits_per_sec,

        };
        this.recordedBlobs = [];

        let mediaStream: MediaStream = new MediaStream();
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
                    mediaStream.addTrack(this.stream.getAudioTracks()[0]);
                    this.stream.getAudioTracks()[0].onended = (ev) => {
                        this.stopRecording();
                    }
                }
            }
        } catch (e) {
            alert('MediaRecorder is not supported by this browser.');
            console.error('Exception while creating MediaRecorder:', e);
            return;
        }
        if (mediaStream == null) { console.error("Media stream is null!"); return; }
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
    }

    handleDataAvailable(ev: BlobEvent): void {
        if (ev.data != null && ev.data.size > 0) {
            this.recordedBlobs.push(ev.data);
        }


    }

    handleStop(ev: Event): void {
        this.recording = false;
        console.log('Recorder stopped: ', ev);
        this.download();
    }

    stopRecording(): void {
        this.recording = false;
        this.mediaRecorder?.stop();
        console.log('Recorded Blobs: ', this.recordedBlobs);
        this.stream = null;
    }

    download(file_name?: string): void {
        if (file_name == undefined) {
            file_name = "Games and Things - " + document.title + " " + new Date(Date.now()).toLocaleString() + ".webm";
        }
        const blob = new Blob(this.recordedBlobs, { type: this.supportedType });
        var duration = Date.now() - this.startTime;
        fixWebmDuration(blob, duration, { logger: false })
            .then(function (fixedBlob) {
                if (file_name == undefined) {return;}
                const url = window.URL.createObjectURL(fixedBlob);
                const a: HTMLAnchorElement = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = file_name;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                    a.remove();
                    window.URL.revokeObjectURL(url);
                }, 100);
            });

    }
}