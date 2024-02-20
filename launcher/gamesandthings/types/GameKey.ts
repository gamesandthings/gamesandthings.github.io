// For games that do not allow you to change controls via a gui.
import { Key } from "./Key";

export type GameKey = {
    name:string; // What this input does ("Forward") for show in guis etc.
    key:Key; // The key that the game allows for this input to be emulated. (eg. W = forward)
    extraKeys:Array<Key>; // The keys that emulate the original key. eg [W , NumpadUp] = ArrowUp
    disableOriginal:boolean;    
}