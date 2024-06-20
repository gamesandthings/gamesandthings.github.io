import IDrawable from "./interfaces/IDrawable";
import Launcher from "../Launcher";
import IPositionable from "./interfaces/IPositionable";
import Rectangle from "./types/Rectangle";
import { Axes } from "./enums/Axes";
type FontStyle = "normal" | "italic" | "bold" | number;
export default class SText extends Rectangle implements IDrawable {
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public text: string = "";
    public size: number = 15;
    public font: string = "sans-serif";
    public fontKerning: CanvasFontKerning = "none";
    public textBaseline: CanvasTextBaseline = "hanging";
    public color: string | CanvasGradient | CanvasPattern = "white";
    public fontStyle: FontStyle = "normal";

    constructor(text: string = "", size: number = 15, fontStyle: FontStyle = "normal", color: string = "white", x: number = 0, y: number = 0) {
        super();
        this.text = text;
        this.size = size;
        this.color = color;
        this.fontStyle = fontStyle;
        this.x = x;
        this.y = y;
    }
    draw(): void {
        let lines = this.text.split('\n');
        this.width = 0;
        this.height = 0;

        lines.forEach((line, i) => {
            if (lines.length == 1) {
                this.height = this.size;
            }
            Launcher.ctx.save();
            Launcher.ctx.fillStyle = this.color;
            Launcher.ctx.font = `${this.fontStyle} ${this.size}px ${this.font}`;
            Launcher.ctx.textBaseline = this.textBaseline;
            Launcher.ctx.fontKerning = this.fontKerning;
            Launcher.ctx.translate(0, (this.size * (1 / 3)) * i);
            this.height += (this.size * (1 / 3)) * i;
            let lineDim = Launcher.ctx.measureText(line);
            let lineW = lineDim.actualBoundingBoxRight + lineDim.actualBoundingBoxLeft;
            if (lineW > this.width) {
                this.width = lineW;
            }
            this.height += (this.size);
            Launcher.ctx.translate(this.x, this.y);
            Launcher.ctx.fillText(line, 0, (this.size * i));
            Launcher.ctx.restore();
        });

    }
    create(): void {
    }
    update(elapsed: number): void {
    }
    destroy(): void {
    }
    screenCenter(axis?: Axes) {
        if (axis == Axes.X) {
            this.x = (Launcher.cnv.offsetWidth - this.width) / 2;
        }
        else if (axis == Axes.Y) {
            this.y = (Launcher.cnv.offsetHeight - this.height) / 2;
        }
        else {
            this.x = (Launcher.cnv.offsetWidth - this.width) / 2;
            this.y = (Launcher.cnv.offsetHeight - this.height) / 2;
        }
    }
}