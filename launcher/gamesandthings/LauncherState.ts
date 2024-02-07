import Launcher from "../Launcher";
import Graphic from "./Graphic";
import MouseHandler from "./MouseHandler";
import ArrowSprite from "./ArrowSprite";
import Sprite from "./Sprite";
import State from "./State";
import { Axes } from "./enums/Axes";
import { MouseButtons } from "./enums/MouseButtons";
export default class LauncherState extends State {
    logo: Sprite = new Sprite();
    lArrow: ArrowSprite = new ArrowSprite();
    rArrow: ArrowSprite = new ArrowSprite();

    create(): void {
        this.logo.loadGraphic("/assets/images/logo.png");
        this.add(this.lArrow);
        this.add(this.rArrow);
        this.rArrow.flipX = true;
        this.add(this.logo);
    }
    update(elapsed: number): void {
        super.update(elapsed); // CALL BEFORE EVERYTHING
        if (this.logo.overlapsPoint(Launcher.mouse.x, Launcher.mouse.y)
            && Launcher.mouse.isMBDown(MouseButtons.PRIMARY)) {
            this.logo.angle += 5 * (elapsed * 60);
        }
        else {
            this.logo.angle = 0;
        }
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