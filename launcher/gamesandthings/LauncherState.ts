import Launcher from "../Launcher";
import Graphic from "./Graphic";
import MouseHandler from "./MouseHandler";
import Sprite from "./Sprite";
import State from "./State";
import { Axes } from "./enums/Axes";
export default class LauncherState extends State {
    logo: Sprite = new Sprite();
    create(): void {
        this.logo.loadGraphic("https://user-images.githubusercontent.com/68365423/199411065-61e6c76c-72c0-46f3-9e8d-195eb69f58f5.png");
        this.add(this.logo);
    }
    update(elapsed: number): void {
        this.logo.y = Launcher.cnv.offsetHeight * 0.25;
        this.logo.screenCenter(Axes.X)
        if (this.logo.overlapsPoint(Launcher.mouse.x, Launcher.mouse.y)) {
            this.logo.setGraphicSize(Launcher.cnv.width * 0.6);
        }
        else {
            this.logo.setGraphicSize(Launcher.cnv.width * 0.5);
        }
        super.update(elapsed);
    }
}