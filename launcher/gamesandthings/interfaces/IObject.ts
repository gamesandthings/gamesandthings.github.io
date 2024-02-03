export default interface IObject {
    create():void;
    update(elapsed:number):void;
    destroy():void;
}