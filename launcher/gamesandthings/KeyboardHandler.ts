import Launcher from "../Launcher";

export default class KeyboardHandler {
    pressedMap: Map<string, boolean> = new Map();
    init() {
        window.addEventListener("keydown", (ev) => {
            this.onKeyDown(ev);
            return false;
        });
        window.addEventListener("keyup", (ev) => {
            this.onKeyUp(ev);
            return false;
        });
    }
    onKeyDown(ev: KeyboardEvent, preventDefault: boolean = true) {
        if (ev.key != null) {
            console.log(`public static ${ev.code.toUpperCase().replace('KEY','')}:Key = {key: '${ev.key}', code: '${ev.code}', keyCode: ${ev.keyCode},}; `);
            if (ev.key == "F11") {
                Launcher.toggleFullscreen();
            }
            this.pressedMap.set(ev.key.toLowerCase(), true);
            if (preventDefault) {
                ev.preventDefault();
            }
        }
    }
    onKeyUp(ev: KeyboardEvent, preventDefault: boolean = true) {
        if (ev.key != null) {
            this.pressedMap.set(ev.key.toLowerCase(), false);
            if (preventDefault) {
                ev.preventDefault();
            }
        }
    }
    isDown(button: string): boolean {
        if (!this.pressedMap.has(button.toLowerCase())) {
            return false;
        }
        else {
            return (this.pressedMap.get(button.toLowerCase()) as boolean);
        }
    }
    resetPressed() {
        this.pressedMap.clear();
    }
}