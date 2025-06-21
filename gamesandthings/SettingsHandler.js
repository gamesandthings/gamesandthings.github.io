"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SettingsHandler {
    static load() {
        let settingsData = window.localStorage.getItem('gat_settings');
        let defaults = {
            performanceModeEnabled: true,
            rawMouseInputEnabled: true,
        };
        if (settingsData == null || settingsData == 'undefined' || settingsData == undefined) {
            SettingsHandler.data = defaults;
            SettingsHandler.save();
        }
        else {
            let loadedData = JSON.parse(settingsData);
            Object.keys(defaults).forEach(function (k) {
                if (!loadedData.hasOwnProperty(k))
                    loadedData[k] = defaults[k];
            });
            SettingsHandler.data = loadedData;
            SettingsHandler.save();
        }
    }
    static save(data) {
        if (data != undefined) {
            Object.assign(SettingsHandler.data, data);
        }
        window.localStorage.setItem('gat_settings', JSON.stringify(SettingsHandler.data));
        window.gameConfig = SettingsHandler.data;
    }
}
exports.default = SettingsHandler;
