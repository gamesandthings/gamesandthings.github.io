"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dexie_1 = __importDefault(require("dexie"));
const Launcher_1 = __importDefault(require("../Launcher"));
class SaveManager {
    static init() {
        SaveManager.db = new dexie_1.default('gamesAndThings_gameDATA');
        SaveManager.db.version(1).stores({
            games: 'name, localStorage'
        });
    }
    static load() {
        if (Launcher_1.default.game == null)
            return;
        let gameName = Launcher_1.default.game.title + "|" + Launcher_1.default.curVersion;
        window.localStorage_gat = {};
        SaveManager.db.table('games').get(gameName).then((game) => {
            var _a;
            Object.keys(window.localStorage).forEach((key) => {
                if (window.localStorage.getItem(key) != null && key != 'gat_settings') {
                    window.localStorage.removeItem(key);
                }
            });
            if (game == undefined)
                return;
            Object.keys(game.localStorage).forEach((key) => {
                window.localStorage.setItem(key, game.localStorage[key]);
            });
            if (((_a = Launcher_1.default.game) === null || _a === void 0 ? void 0 : _a.title) == "Subway Surfers") {
                window.localStorage.setItem("playerAge", '6');
            }
        });
    }
    static update() {
        if (Launcher_1.default.game == null)
            return;
        if (Launcher_1.default.iframe.src == '')
            return;
        let gameName = Launcher_1.default.game.title + "|" + Launcher_1.default.curVersion;
        if (JSON.stringify(window.localStorage_gat) == '{}' || window.localStorage_gat == undefined)
            return;
        SaveManager.db.table('games').put({
            name: gameName,
            localStorage: window.localStorage_gat,
        }, gameName);
    }
}
exports.default = SaveManager;
