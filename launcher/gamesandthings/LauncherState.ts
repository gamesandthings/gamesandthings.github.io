import Launcher from "../Launcher";
import Graphic from "./Graphic";
import MouseHandler from "./MouseHandler";
import Sprite from "./Sprite";
import SText from "./SText";
import State from "./State";
import { Axes } from "./enums/Axes";
import { MouseButtons } from "./enums/MouseButtons";
import Games, { GameAssets } from "./Games";
import { ContextOption } from "./contextmenu/ContextOption";
import UniFont from "./UniFont";
export default class LauncherState extends State {
    logo: Sprite = new Sprite();
    logoPos: 'center' | 'default' = 'default';
    bg: Sprite = new Sprite();
    notice: SText = new SText("This is the new games and stuff,\ncurrently in very early development.\nMobile devices are supported now!", 15);
    chooseGame: SText = new SText("CHOOSE FROM GAME LIST", 32);

    create(): void {
        this.logo.loadGraphic("/assets/images/logo.png");
        this.bg.loadGraphic('/assets/images/logo.png');
        this.bg.alpha = 0;
        this.chooseGame.fontStyle = "bold";
        this.add(this.bg);
        this.add(this.logo);
        this.notice.y = 35;
        this.add(this.notice);
        this.add(this.chooseGame);
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
        this.notice.screenCenter();
        this.chooseGame.screenCenter();
        this.chooseGame.y = this.logo.y+this.logo.height + 10;
        if (this.chooseGame.y >= window.innerHeight || this.notice.overlaps(this.chooseGame)){
            this.chooseGame.y = this.notice.y+this.notice.height + 10;
        }
        if (this.chooseGame.overlapsPoint(Launcher.mouse.x, Launcher.mouse.y)) {
            this.chooseGame.color = "#A9A9A9";
            if (Launcher.mouse.justPressed(MouseButtons.PRIMARY)) {
                let gamesCtx: Array<ContextOption> = [];
                Games.games.forEach((game) => {
                    gamesCtx.push({
                        text: game.title,
                        desc: game.creator,
                        descFont: UniFont.ITALIC,
                        onselect: () => {
                            Launcher.openGame(game);
                        }
                    });
                });
                gamesCtx.push({
                    text: "Custom",
                    onselect: () => {
                        let debugPrompt: string | null = prompt("Enter URL to open:\n");
                        if (debugPrompt == null) return;
                        if (!(debugPrompt.startsWith("http://")) && !(debugPrompt.startsWith("https://"))) {
                            debugPrompt = "http://" + debugPrompt;
                        }
                        Launcher.game = null;
                        Launcher.openURL(debugPrompt);
                    }
                });
                Launcher.contextMenu.show(gamesCtx);

            }
        }
        else {
            this.chooseGame.color = "white";
        }
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