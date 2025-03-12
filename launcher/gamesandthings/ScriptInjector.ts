import Launcher from "../Launcher";
export default class ScriptInjector {
    public static inject(id: string) {
        if (Launcher.iframe.contentWindow == null) return;
        let s = Launcher.iframe.contentDocument?.createElement('script');
        if (s != undefined) {
            s.type = 'text/javascript';
            s.src = id;
            Launcher.iframe.contentDocument?.head.prepend(s);
            console.log("[ScriptInjector] Injected " + id);
        }
    }
}