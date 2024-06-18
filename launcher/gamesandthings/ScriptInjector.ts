import Launcher from "../Launcher";
export default class ScriptInjector {
    public static scripts: Map<string, string> = new Map();
    public static scriptsStatus: Map<string, boolean> = new Map();

    public static inject(id: string) {
        if (this.scriptsStatus.has(id) && this.scriptsStatus.get(id) === true) {
            return;
        }
        this.scriptsStatus.set(id, false);
        let scriptJS = this.scripts.get(id);
        if (scriptJS != undefined && scriptJS != null) {
            if (Launcher.iframe.contentWindow == null) return;
            Launcher.iframe.contentWindow.window.eval(scriptJS);
            this.scriptsStatus.set(id, true);
            console.log("[ScriptInjector] Injected " + id);

        }
        else {
            fetch(id)
                .then(r => r.text())
                .then((t) => {
                    ScriptInjector.scripts.set(id, t);
                    if (Launcher.iframe.contentWindow == null) return;
                    Launcher.iframe.contentWindow.window.eval(t);
                    this.scriptsStatus.set(id, true);
                    console.log("[ScriptInjector] Loaded & Injected " + id);
                });
        }
        Launcher.update(0);
    }
    public static load(id: string, onComplete: () => void = () => { }) {
        if (this.scripts.has(id)) {
            console.log("[ScriptInjector] Loaded " + id + " from cache");
            onComplete();
            return;
        }
        fetch(id)
            .then(r => r.text())
            .then((t) => {
                console.log("[ScriptInjector] Loaded " + id);
                ScriptInjector.scripts.set(id, t);
                Launcher.update(0);
                onComplete();
            });
    }
    public static loadMultiple(ids: Array<string>, onComplete: () => void = () => { }) {
        let i: number = 0;
        this.loadNext(ids,i,onComplete);
    }
    private static loadNext(ids: Array<string>, i: number, onComplete: () => void = () => { }) {
        this.load(ids[i], () => {
            i++;
            if (i != ids.length) {
                this.loadNext(ids, i, onComplete);
            }
            else {
                console.log(`[ScriptInjector] Loaded ${i} scripts successfully!`)
                onComplete();
            }
        });
    }
    public static reload() {
        this.scriptsStatus.clear();
    }
    public static update() {
        if (Launcher.iframe.contentWindow != null) {
            for (let script of this.scripts.keys()) {
                this.inject(script);
            }
        }
    }
}