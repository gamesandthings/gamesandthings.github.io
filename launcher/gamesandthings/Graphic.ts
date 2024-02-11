import IDestroyable from "./interfaces/IDestroyable";
import { Nullable } from "./types/Nullable"
export default class Graphic implements IDestroyable {
    public img: HTMLImageElement= new Image();
    public loaded: boolean = false;
    constructor(url: string = "", onload: (img: HTMLImageElement, ev?: Event) => any) {
        this.img.src = url;
        this.img.addEventListener("error",(ev)=>{
            this.img.src +="";
        })
        this.img.addEventListener("load", (ev) => {
            this.loaded = true;
            onload((this.img as HTMLImageElement), ev);
        });
    }
    destroy() {
        this.img.src = "";
        this.img.remove();
    }
}