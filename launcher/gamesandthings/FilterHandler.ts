import Launcher from "../Launcher";
import IObject from "./interfaces/IObject";
export default class FilterHandler implements IObject {
    _blur: number;
    grayscale: boolean;
    saturate: number;
    create(): void {
        this._blur = 0;
        this.grayscale = false;
        this.saturate = 1;
    }

    public get blur() {
        return this._blur;
    }

    public set blur(blur: number) {
        this._blur = blur;
        this.updateFilterCSS();
    }
    updateFilterCSS() {

    }

    update(elapsed: number): void {
       // throw new Error("Method not implemented.");
    }
    destroy(): void {
       // throw new Error("Method not implemented.");
    }
}