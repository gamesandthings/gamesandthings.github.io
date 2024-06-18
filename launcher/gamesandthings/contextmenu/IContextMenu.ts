import { ContextOption } from "./ContextOption";
export default interface IContextMenu {
    isOpen:boolean,
    show(options: Array<ContextOption>, x?: number, y?: number):void;
    close():void;
}