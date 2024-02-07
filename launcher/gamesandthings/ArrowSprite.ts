import Launcher from "../Launcher";
import Sprite from "./Sprite";
import { Axes } from "./enums/Axes";
import { MouseButtons } from "./enums/MouseButtons";
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
        if (!this.flipX) {
            this.x = 0;
            this.x += Launcher.cnv.offsetWidth / 32;
        }
        else {
            this.x = Launcher.cnv.offsetWidth;
            this.x -= (Launcher.cnv.offsetWidth / 32) + this.width;
        }
        if (this.overlapsPoint(Launcher.mouse.x, Launcher.mouse.y)) {
            this.setGraphicSize(0, Launcher.cnv.offsetHeight * 0.12);
            if (Launcher.mouse.justPressed(MouseButtons.PRIMARY)) {
                let debugPrompt: string = (prompt("Enter URL to open:\n(<link>,mc1.8,mc1.5,mcBETA1.3_01,mc_classic)") as string);
                if (debugPrompt == "mc1.8") {
                    debugPrompt = "https://gamesandthings.github.io/mc/1.8";
                }
                else if (debugPrompt == "mc1.5") {
                    debugPrompt = "https://gamesandthings.github.io/mc/1.5";
                }
                else if (debugPrompt == "mcBETA1.3_01") {
                    debugPrompt = "https://gamesandthings.github.io/mc/1.3";
                }
                else if (debugPrompt == "mc_classic") {
                    debugPrompt = "https://gamesandthings.github.io/mc/classic";
                }
                else if (!debugPrompt.startsWith("http://") || !debugPrompt.startsWith("https://")) {
                    debugPrompt = "http://" + debugPrompt;
                }
                Launcher.openURL(debugPrompt);
            }
        }
        else {
            this.setGraphicSize(0, Launcher.cnv.offsetHeight * 0.1);
        }
        this.screenCenter(Axes.Y);
    }
}