import Launcher from "../Launcher";
export default class FilterHandler {
    _blur: number = 0;
    _grayscale: boolean = false;
    _sepia: number = 0;
    _saturate: number = 1;
    _contrast: number = 1;
    _invert: boolean = false;

    constructor() {
        this.updateFilterCSS();
    }

    public get blur() {
        return this._blur;
    }

    public set blur(value: number) {
        this._blur = value;
        this.updateFilterCSS();
    }

    public get grayscale() {
        return this._grayscale;
    }

    public set grayscale(state: boolean) {
        this._grayscale = state;
        this.updateFilterCSS();
    }

    public get saturate() {
        return this._saturate;
    }

    public set saturate(value: number) {
        this._saturate = value;
        this.updateFilterCSS();
    }

    public get sepia() {
        return this._sepia;
    }

    public set sepia(value: number) {
        this._sepia = value;
        this.updateFilterCSS();
    }


    public get contrast() {
        return this._contrast;
    }

    public set contrast(value: number) {
        this._contrast = value;
        this.updateFilterCSS();
    }

    public get invert() {
        return this._invert;
    }

    public set invert(state: boolean) {
        this._invert = state;
        this.updateFilterCSS();
    }

    updateFilterCSS() {
        Launcher.iframe.style.filter = this.generateFilterText();
    }

    generateFilterText(): string {
        let filterText = "";

        if (this._blur > 0) {
            filterText += `blur(${this._blur}rem)`;
        }

        if (this._grayscale) {
            filterText += `grayscale()`;
        }

        if (this._saturate != 1.0) {
            filterText += `saturate(${this._saturate})`;
        }

        if (this._contrast != 1.0) {
            filterText += `contrast(${this._contrast})`;
        }

        if (this._sepia > 0) {
            filterText += `sepia(${this._sepia})`;
        }

        if (this._invert) {
            filterText += `invert()`;
        }
        return filterText;
    }
}