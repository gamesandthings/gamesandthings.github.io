import IDestroyable from "./interfaces/IDestroyable";
import { Nullable } from "./types/Nullable"
export default class Graphic implements IDestroyable {
    public img: Nullable<HTMLImageElement> = new Image();
    public loaded: boolean = false;
    constructor(url: string = "", onload: (img: HTMLImageElement, ev?: Event) => any) {
        (this.img as HTMLImageElement).src = url;
        (this.img as HTMLImageElement).addEventListener("load", (ev) => {
            this.loaded = true;
            onload((this.img as HTMLImageElement), ev);
        });
    }
    destroy() {
        (this.img as HTMLImageElement).src = "";
        this.img = null;
    }
}