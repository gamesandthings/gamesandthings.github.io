import Launcher from "../Launcher";
import { MouseButtons } from "./enums/MouseButtons";
export default class MouseHandler {
    public x: number = 0;
    public y: number = 0;
    public deltaX: number = 0;
    public deltaY: number = 0;
    private mouseMap: Map<MouseButtons, boolean> = new Map();
    private justPressedMap: Map<MouseButtons, boolean> = new Map();


    init(): void {
        window.addEventListener("mousedown", (ev) => { this.onMouseDown(ev) });
        window.addEventListener("mouseenter", (ev) => { this.onMouseEnter(ev) });
        window.addEventListener("mouseleave", (ev) => { this.onMouseLeave(ev) });
        window.addEventListener("mousemove", (ev) => { this.onMouseMove(ev) });
        window.addEventListener("mouseout", (ev) => { this.onMouseOut(ev) });
        window.addEventListener("mouseover", (ev) => { this.onMouseOver(ev) });
        window.addEventListener("mouseup", (ev) => { this.onMouseUp(ev) });
        window.addEventListener("contextmenu", (ev) => {
            this.onContextMenu(ev);
            return false;
        });
    }
    onMouseDown(ev: MouseEvent) {
        
            this.mouseMap.set(ev.button, true);
            this.getPosFromEvent(ev);
        
    }
    onMouseEnter(ev: MouseEvent) {
        this.getPosFromEvent(ev);
    }
    onMouseLeave(ev: MouseEvent) {
        this.getPosFromEvent(ev);
    }
    onMouseMove(ev: MouseEvent) {
        this.getPosFromEvent(ev);
    }
    onMouseOut(ev: MouseEvent) {
        this.getPosFromEvent(ev);
    }
    onMouseOver(ev: MouseEvent) {
        this.getPosFromEvent(ev);
    }
    onMouseUp(ev: MouseEvent) {
        this.mouseMap.set(ev.button, false);
        this.justPressedMap.set(ev.button, true);
        this.getPosFromEvent(ev);
    }
    onContextMenu(ev: MouseEvent) {
        //ev.preventDefault();
        this.getPosFromEvent(ev);
    }
    isMBDown(button: MouseButtons): boolean {
        if (!this.mouseMap.has(button)) {
            return false;
        }
        else {
            return (this.mouseMap.get(button) as boolean);
        }
    }
    justPressed(button: MouseButtons): boolean {
        if (!this.justPressedMap.has(button)) {
            return false;
        }
        else {
            return (this.justPressedMap.get(button) as boolean);
        }
    }
    getPosFromEvent(ev: MouseEvent) {
        this.x = ev.x;
        this.y = ev.y;
        this.deltaX = ev.movementX;
        this.deltaY = ev.movementY;
    }
    resetDeltas() {
        this.deltaX = 0;
        this.deltaY = 0;
        this.justPressedMap.clear();
    }
}