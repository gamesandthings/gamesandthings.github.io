import Dexie, { Table } from 'dexie';
import { Game } from './Games'
import Launcher from "../Launcher";
import { prefetch } from 'webpack';

export default class SaveManager {
    static db: Dexie;
    public static init() {
        SaveManager.db = new Dexie('gamesAndThings_gameDATA');
        SaveManager.db.version(1).stores({
            games: 'name, localStorage'
        });
    }
    public static load() {
        if (Launcher.game == null) return;
        let gameName: string = Launcher.game.title + "|" + Launcher.curVersion;
        (window as any).localStorage_gat = {};

        SaveManager.db.table('games').get(gameName).then((game) => {
            Object.keys(window.localStorage).forEach((key) => {
                if (window.localStorage.getItem(key) != null && key != 'gat_settings') {
                    window.localStorage.removeItem(key);
                }
            });
            if (game == undefined) return;
            Object.keys(game.localStorage).forEach((key) => {
                window.localStorage.setItem(key, game.localStorage[key])
            });
        });

    }
    public static update() {
        if (Launcher.game == null) return;
        if (Launcher.iframe.src == '') return;
        let gameName: string = Launcher.game.title + "|" + Launcher.curVersion;

        if (JSON.stringify((window as any).localStorage_gat) == '{}' || (window as any).localStorage_gat == undefined) return;
        SaveManager.db.table('games').put({
            name: gameName,
            localStorage: (window as any).localStorage_gat,
        }, gameName);
    }
}