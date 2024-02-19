import Launcher from "../Launcher";
import Graphic from "./Graphic";
import MouseHandler from "./MouseHandler";
import ArrowSprite from "./ArrowSprite";
import Sprite from "./Sprite";
import SText from "./SText";
import State from "./State";
import { Axes } from "./enums/Axes";
import { MouseButtons } from "./enums/MouseButtons";
import { GameAssets } from "./Games";
export default class LauncherState extends State {
    logo: Sprite = new Sprite();
    logoPos: 'center' | 'default' = 'default';
    bg: Sprite = new Sprite();
    notice:SText = new SText("This is the new games and stuff,\ncurrently in very early development.\nMobile devices are supported now!");
    lArrow: ArrowSprite = new ArrowSprite();
    rArrow: ArrowSprite = new ArrowSprite();

    create(): void {
        this.logo.loadGraphic("/assets/images/logo.png");
        this.bg.loadGraphic('/assets/images/logo.png');
        this.bg.alpha = 0;
        this.add(this.bg);
        this.add(this.logo);
        this.add(this.lArrow);
        this.add(this.rArrow);
        this.notice.y = 35;
        this.add(this.notice);
        this.rArrow.flipX = true;
    }
    update(elapsed: number): void {
        super.update(elapsed); // CALL BEFORE EVERYTHING
        //this.notice.y += Launcher.mouse.scrollY;
        if (this.logo.overlapsPoint(Launcher.mouse.x, Launcher.mouse.y)
            && Launcher.mouse.isMBDown(MouseButtons.PRIMARY)) {
            this.logo.angle += 5 * (elapsed * 60);
        }
        else {
            this.logo.angle = 0;
        }
        if (this.logoPos == 'default') {
            this.logo.y = Launcher.cnv.offsetHeight * 0.15;
            this.logo.screenCenter(Axes.X)
            this.logo.setGraphicSize(Launcher.cnv.width * 0.5);
        }
        else if (this.logoPos == 'center') {
            this.logo.setGraphicSize(0, window.innerHeight);
            this.logo.screenCenter();
        }

        let w: number = this.bg.imgWidth;
        let h: number = this.bg.imgHeight;

        this.bg.setGraphicSize(Math.ceil(w * Math.max(window.innerWidth / w, window.innerHeight / h)),
            Math.ceil(h * Math.max(window.innerWidth / w, window.innerHeight / h)));
        this.bg.screenCenter();

    }
    loadOriginalAssets() {
        this.logo.loadGraphic("/assets/images/logo.png");
        this.bg.loadGraphic('/assets/images/logo.png');
        this.bg.alpha = 0;
        this.logoPos = "default";
        this.logoPos = "default";
    }
    loadGameAssets(assets: GameAssets) {
        this.logo.loadGraphic("/assets/images/games/" + Launcher.game?.prefix.replace('/', '') + "/" + assets.logo);
        if (assets.bg != 'blank') {
            this.bg.loadGraphic("/assets/images/games/" + Launcher.game?.prefix.replace('/', '') + "/" + assets.bg);
            this.bg.alpha = 1;
        }
        else {
            this.bg.alpha = 0;
        }
        this.logoPos = assets.logoPos;
    }
}