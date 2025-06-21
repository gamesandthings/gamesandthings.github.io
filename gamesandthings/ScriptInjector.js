"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Launcher_1 = __importDefault(require("../Launcher"));
class ScriptInjector {
    static inject(id) {
        var _a, _b;
        if (Launcher_1.default.iframe.contentWindow == null)
            return;
        let s = (_a = Launcher_1.default.iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.createElement('script');
        if (s != undefined) {
            s.type = 'text/javascript';
            s.src = id;
            (_b = Launcher_1.default.iframe.contentDocument) === null || _b === void 0 ? void 0 : _b.head.prepend(s);
            console.log("[ScriptInjector] Injected " + id);
        }
    }
}
exports.default = ScriptInjector;
