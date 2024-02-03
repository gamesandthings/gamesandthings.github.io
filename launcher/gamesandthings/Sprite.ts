import Launcher from "../Launcher";
import IDrawable from "./interfaces/IDrawable";

export default class Sprite implements IDrawable {
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;

    graphic!: HTMLImageElement;
    draw(): void {
        if (this.graphic != null){
            this.graphic.width = this.width;
            this.graphic.height = this.height;
            Launcher.ctx.drawImage(this.graphic,this.x,this.y,this.width,this.height); 
        }
    }
    loadGraphic(img: HTMLImageElement) {
        img.addEventListener("load", (ev: Event) => {
            this.graphic = img;
            this.width = img.width;
            this.height = img.height;
        });
    }
    create(): void {

    }
    update(elapsed: number): void {

    }
    destroy(): void {

    }

}