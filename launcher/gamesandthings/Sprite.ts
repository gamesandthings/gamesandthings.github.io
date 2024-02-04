import Launcher from "../Launcher";
import IDrawable from "./interfaces/IDrawable";
import { Axes } from "./enums/Axes";
import Vector2 from "./types/Vector2";
import Rectangle from "./types/Rectangle";
import Graphic from "./Graphic";


export default class Sprite extends Rectangle implements IDrawable {
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public scale: Vector2 = new Vector2(1, 1);
    public graphic!: Graphic;
    constructor(x: number = 0, y: number = 0) {
        super();
        this.x = x;
        this.y = y;
    }
    draw(): void {
        if (this.graphic != null) {
            let img: HTMLImageElement = (this.graphic.img as HTMLImageElement);
            Launcher.ctx.drawImage(img, this.x, this.y, this.width, this.height);
        }
    }
    loadGraphic(path: string) {
        this.graphic = new Graphic(path, (img, ev) => {
            this.graphic.img = img;
            this.width = img.width;
            this.height = img.height;
            this.onGraphicLoad();
        });

    }
    onGraphicLoad() { }
    screenCenter(axis: Axes) {
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
    setGraphicSize(width: number = 0.0, height: number = 0.0) {
        if (width <= 0 && height <= 0)
            return;

        var newScaleX: number = width / (this.graphic.img as HTMLImageElement).width;
        var newScaleY: number = height / (this.graphic.img as HTMLImageElement).height;
        this.scale.set(newScaleX, newScaleY);

        if (width <= 0)
            this.scale.x = newScaleY;
        else if (height <= 0)
            this.scale.y = newScaleX;
    }
    create(): void {

    }
    update(elapsed: number): void {
        if (this.graphic != null) {
            let img: HTMLImageElement = (this.graphic.img as HTMLImageElement);
            this.width = img.width * this.scale.x;
            this.height = img.height * this.scale.y;
        }
    }
    destroy(): void {
        this.graphic.destroy();
    }

}