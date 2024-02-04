import Launcher from "../Launcher";
import Graphic from "./Graphic";
import MouseHandler from "./MouseHandler";
import ArrowSprite from "./ArrowSprite";

import Sprite from "./Sprite";
import State from "./State";
import { Axes } from "./enums/Axes";
export default class LauncherState extends State {
    logo: Sprite = new Sprite();
    rArrow: ArrowSprite = new ArrowSprite();
    create(): void {
        this.logo.loadGraphic("https://user-images.githubusercontent.com/68365423/199411065-61e6c76c-72c0-46f3-9e8d-195eb69f58f5.png");
        this.add(this.rArrow);
        this.add(this.logo);
    }
    update(elapsed: number): void {
        super.update(elapsed); // CALL BEFORE EVERYTHING

        this.logo.y = Launcher.cnv.offsetHeight * 0.15;

        this.logo.screenCenter(Axes.X)
        if (Launcher.cnv.offsetWidth > Launcher.cnv.offsetHeight) {
            this.logo.setGraphicSize(Launcher.cnv.width * 0.5);

        }
        else {
            this.logo.setGraphicSize(0, Launcher.cnv.height * 0.05);
        }
    }
}