import Launcher from "../Launcher";
import MouseHandler from "./MouseHandler";
import Sprite from "./Sprite";
import State from "./State";
import { MouseButtons } from "./enums/MouseButtons";
export default class LauncherState extends State {
    logo: Sprite = new Sprite();
    create(): void {
        let img = new Image();
        img.src = "https://user-images.githubusercontent.com/68365423/199411065-61e6c76c-72c0-46f3-9e8d-195eb69f58f5.png";
        img.style.display = "none";
        document.body.appendChild(img);
        this.logo.loadGraphic(img);
        this.add(this.logo);
    }
    update(elapsed: number): void {

        super.update(elapsed);
    }
}