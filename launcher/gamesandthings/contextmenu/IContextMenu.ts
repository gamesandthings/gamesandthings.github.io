import { ContextOption } from "./ContextOption";
export default interface IContextMenu {
    show(options: Array<ContextOption>, x?: number, y?: number):void;
}