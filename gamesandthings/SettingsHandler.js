"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SettingsHandler = /** @class */ (function () {
    function SettingsHandler() {
    }
    SettingsHandler.load = function () {
        var settingsData = window.localStorage.getItem('gat_settings');
        var defaults = {
            performanceModeEnabled: true,
            rawMouseInputEnabled: true,
        };
        if (settingsData == null || settingsData == 'undefined' || settingsData == undefined) {
            SettingsHandler.data = defaults;
            SettingsHandler.save();
        }
        else {
            var loadedData_1 = JSON.parse(settingsData);
            Object.keys(defaults).forEach(function (k) {
                if (!loadedData_1.hasOwnProperty(k))
                    loadedData_1[k] = defaults[k];
            });
            SettingsHandler.data = loadedData_1;
            SettingsHandler.save();
        }
    };
    SettingsHandler.save = function (data) {
        if (data != undefined) {
            Object.assign(SettingsHandler.data, data);
        }
        window.localStorage.setItem('gat_settings', JSON.stringify(SettingsHandler.data));
        window.gameConfig = SettingsHandler.data;
    };
    return SettingsHandler;
}());
exports.default = SettingsHandler;
