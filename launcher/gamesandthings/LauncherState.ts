import Launcher from "../Launcher";
import Graphic from "./Graphic";
import MouseHandler from "./MouseHandler";
import Sprite from "./Sprite";
import SText from "./SText";
import State from "./State";
import { Axes } from "./enums/Axes";
import { MouseButtons } from "./enums/MouseButtons";
import Games, { Game, GameAssets } from "./Games";
import { ContextOption } from "./contextmenu/ContextOption";
import UniFont from "./UniFont";
export default class LauncherState extends State {
    logo: Sprite = new Sprite();
    logoPos: 'center' | 'default' = 'default';
    bg: Sprite = new Sprite();
    notice: SText = new SText("This is the new games and stuff, currently in very early development.\n" +
        "\nNews:\n\n(20 June 2024)\n - Added Minecraft Beta 1.7.3 to the Minecraft versions list.\n - New Font\n(18 June 2024)\n - NEW GAMES: RUN 1, 2, and 3 \n - Added mobile support to Minecraft \n(17 June 2024)\n- Updated Minecraft 1.8.8 to the latest Eaglercraft version.\nYou can now use capes, and performance should be improved.", 15);
    chooseGame: SText = new SText("CHOOSE FROM GAME LIST", 32);
    updateTicks: number = 0;
    currentPage: number = 0;
    amountPerPage: number = 5;
    create(): void {
        this.logo.loadGraphic("/assets/images/logo.png");
        this.bg.loadGraphic('/assets/images/logo.png');
        this.bg.alpha = 0;
        this.chooseGame.font = "Fredoka";
        this.chooseGame.fontStyle = 450;
        this.notice.font = "monospace";
        this.add(this.bg);
        this.add(this.logo);
        this.notice.y = 35;
        this.add(this.notice);
        this.add(this.chooseGame);
    }
    update(elapsed: number): void {
        let dt = elapsed * 60;
        this.updateTicks += 1 * dt;
        this.updateTicks = this.updateTicks % 65535;
        super.update(elapsed); // CALL BEFORE EVERYTHING

        //this.notice.y += Launcher.mouse.scrollY;
        if (this.logo.overlapsPoint(Launcher.mouse.x, Launcher.mouse.y)
            && Launcher.mouse.isMBDown(MouseButtons.PRIMARY)) {
            this.logo.angle += 5 * dt;
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
        this.chooseGame.screenCenter();
        let baseSizeScreen: number = (Launcher.cnv.width + Launcher.cnv.height) / 2;
        let baseSizeWidth: number = (Launcher.cnv.width);

        this.notice.screenCenter();
        this.notice.y = this.chooseGame.y + this.chooseGame.height;
        this.notice.size = baseSizeScreen * 0.015;
        this.chooseGame.size = baseSizeWidth * 0.030;
        if (this.logoPos == 'default') {
            this.chooseGame.y = this.logo.y + this.logo.height + baseSizeScreen * 0.020;
        }
        else {
            this.chooseGame.screenCenter(Axes.X);
            this.chooseGame.y = baseSizeWidth * 0.080;
        }
        if (this.chooseGame.overlapsPoint(Launcher.mouse.x, Launcher.mouse.y)) {
            this.chooseGame.color = "#A9A9A9";
            if (Launcher.mouse.justPressed(MouseButtons.PRIMARY)) {
                this.showGameSelect();
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
        this.notice.text = "";
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
    showGameSelect() {
        let gamesCtx: Array<ContextOption> = [];

        for (let i = this.currentPage * this.amountPerPage; i < (this.currentPage * this.amountPerPage) + this.amountPerPage; i++) {
            let game: Game = Games.games[i];
            if (game == undefined)
                break;
            gamesCtx.push({
                text: game.title,
                desc: game.creator,
                descFont: UniFont.ITALIC,
                onselect: () => {
                    Launcher.openGame(game);
                }
            });
        }

        if (gamesCtx.length == this.amountPerPage) {
            gamesCtx.push({
                text: "Next Page",
                font: UniFont.BOLD,
                onselect: () => {
                    this.currentPage++;
                    this.showGameSelect();
                }
            });
        }
        if (this.currentPage != 0) {
            gamesCtx.splice(0, 0, {
                text: "Previous Page",
                font: UniFont.BOLD,
                onselect: () => {
                    this.currentPage--;
                    this.showGameSelect();
                }
            });
        }
        Launcher.contextMenu.show(gamesCtx);
    }
}