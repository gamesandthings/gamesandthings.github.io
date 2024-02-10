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
                Launcher.contextMenu.show([
                    {
                        text: "Minecraft 1.8.8",
                        onselect: () => {
                            Launcher.openURL("mc/1.8.8");
                        }
                    },
                    {
                        text: "Minecraft 1.5.2",
                        onselect: () => {
                            Launcher.openURL("mc/1.5.2");
                        }
                    },
                    {
                        text: "Minecraft b1.3_01",
                        onselect: () => {
                            Launcher.openURL("mc/b1.3_01");
                        }
                    },
                    {
                        text: "Minecraft a1.2.6",
                        onselect: () => {
                            Launcher.openURL("mc/a1.2.6");
                        }
                    },
                    {
                        text: "Minecraft Indev-20100223",
                        onselect: () => {
                            Launcher.openURL("mc/indev-20100223");
                        }
                    },
                    
                    {
                        text: "Minecraft c0.30",
                        onselect: () => {
                            Launcher.openURL("mc/c0.30");
                        }
                    },
                    {
                        text: "Minecraft c0.0.23a_01",
                        onselect: () => {
                            Launcher.openURL("mc/c0.0.23a_01");
                        }
                    },
                    {
                        text: "Custom",
                        onselect: () => {
                            let debugPrompt: string = (prompt("Enter URL to open:\n") as string);
                            if (!debugPrompt.startsWith("http://") || !debugPrompt.startsWith("https://")) {
                                debugPrompt = "http://" + debugPrompt;
                            }
                            Launcher.openURL(debugPrompt);
                        }
                    },

                ]);
            
            }
        }
        else {
            this.setGraphicSize(0, Launcher.cnv.offsetHeight * 0.1);
        }
        this.screenCenter(Axes.Y);
    }
}