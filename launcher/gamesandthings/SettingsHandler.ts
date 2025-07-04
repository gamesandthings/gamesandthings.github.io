import ISettingsData from "./interfaces/ISettingsData";
import ISettingsReplaceData from "./interfaces/ISettingsReplaceData";


export default class SettingsHandler {
    public static data: ISettingsData;


    public static load() {
        let settingsData = window.localStorage.getItem('gat_settings');
        let defaults: ISettingsData = {
            performanceModeEnabled: true,
            rawMouseInputEnabled: true,
            enableFpsCounter: false,
        };

        if (settingsData == null || settingsData == 'undefined' || settingsData == undefined) {
            SettingsHandler.data = defaults;
            SettingsHandler.save();
        }
        else {
            let loadedData = JSON.parse(settingsData);

            Object.keys(defaults).forEach(function(k) {
                if (!loadedData.hasOwnProperty(k)) loadedData[k] = defaults[k];
              });
            
            SettingsHandler.data = (loadedData as ISettingsData);
            SettingsHandler.save();
        }
    }
    public static save(data?:ISettingsReplaceData) {
        if (data != undefined){
            Object.assign(SettingsHandler.data, data);
        }
        window.localStorage.setItem('gat_settings', JSON.stringify(SettingsHandler.data));
        (window as any).gameConfig = SettingsHandler.data;
    }
}