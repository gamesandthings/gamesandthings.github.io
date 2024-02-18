import Dexie, { Table } from 'dexie';
import { Game } from './Games'
export default class SaveManager {
    public static gameLaunch(game:Game){
        const db = new Dexie(game.prefix);
    }
}