import Launcher from "../Launcher";
import Sprite from "./Sprite";
import { Axes } from "./enums/Axes";
export default class ArrowSprite extends Sprite {
    constructor() {
        super();
    }
    draw(): void {
        super.draw();
    }
    create() {
        this.loadGraphic("/assets/images/arrow.png");

    }
    onGraphicLoad(): void {
        this.setGraphicSize(0, Launcher.cnv.offsetHeight * 0.1);
    }
    update(elapsed: number): void {
        super.update(elapsed);
        this.x = 0;
        this.x += Launcher.cnv.offsetWidth / 32;
        if (this.overlapsPoint(Launcher.mouse.x, Launcher.mouse.y)) {
            this.setGraphicSize(0, Launcher.cnv.offsetHeight * 0.12);
        }
        else {
            this.setGraphicSize(0, Launcher.cnv.offsetHeight * 0.1);
        }
        this.screenCenter(Axes.Y);
    }
}