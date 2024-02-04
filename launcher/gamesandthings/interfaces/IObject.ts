import IDestroyable from "./IDestroyable";
export default interface IObject extends IDestroyable {
    create(): void;
    update(elapsed: number): void;
    destroy(): void;
}