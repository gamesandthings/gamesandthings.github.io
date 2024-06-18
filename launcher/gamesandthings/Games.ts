import { GameKey } from "./types/GameKey";
import { Key } from "./types/Key";
import Keys from "./Keys";

export type Game = {
    title: string,
    creator: string,
    prefix: string,
    injectTime: "DOMContentLoaded" | "load",
    screenmode?: string,
    forcescreenmode?: boolean,
    versions?: Array<GameVersion> | null,
    fixes?: Fixes | null,
    assets?: GameAssets,
    gameKeys?: Array<GameKey>,
    fixScripts?: Array<string>
}
export type GameAssets = {
    bg: string,
    logo: string,
    logoPos: 'center' | 'default',
}
export type GameVersion = {
    url: string,
    title: string,
}
export type Fixes = {
    runsAtSetFrameRate: boolean,
    preserveDrawingBuffer: boolean,
    removeVsync: boolean,
    pointerLockFix: boolean,
}
export default class Games {
    public static games: Array<Game> = [
        {
            title: "Minecraft",
            creator: "Mojang Studios",
            injectTime: 'load',
            prefix: "mc",
            screenmode: "window",
            fixScripts: ["/fixes/mc-mobile-fix.js"],
            versions: [
                {
                    url: "1.8.8",
                    title: "1.8.8"
                },
                {
                    url: "1.8.8-resent",
                    title: "1.8.8 Resent Client"
                },
                {
                    url: "1.5.2",
                    title: "1.5.2"
                },
                {
                    url: "b1.3_01",
                    title: "b1.3_01"
                },
                {
                    url: "a1.2.6",
                    title: "a1.2.6"
                },
                {
                    url: "indev-20100223",
                    title: "Indev-20100223"
                },
                {
                    url: "c0.30",
                    title: "c0.30"
                },
                {
                    url: "c0.0.23a_01",
                    title: "c0.0.23a_01"
                },
            ],
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: false,
                removeVsync: false,
                pointerLockFix: false,
            },
            assets: {
                bg: 'bg.png',
                logo: 'logo.svg',
                logoPos: 'default'
            }
        },
        {
            title: "Super Mario 64",
            creator: "Nintendo",
            prefix: "app-sm64",
            screenmode: "4/3",
            injectTime: 'load',
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: true,
                removeVsync: false,
                pointerLockFix: false,
            },
            assets: {
                bg: 'blank',
                logo: 'logo.png',
                logoPos: 'center'
            },
            gameKeys: [
                {
                    name: 'Forward',
                    key: Keys.W,
                    extraKeys: [
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Back',
                    key: Keys.S,
                    extraKeys: [
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Left',
                    key: Keys.A,
                    extraKeys: [
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Right',
                    key: Keys.D,
                    extraKeys: [
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Crouch (Z Trigger)',
                    key: Keys.K,
                    extraKeys: [
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Jump (A Button)',
                    key: Keys.L,
                    extraKeys: [
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Punch (B Button)',
                    key: Keys.COMMA,
                    extraKeys: [
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Pause (Start Button)',
                    key: Keys.SPACE,
                    extraKeys: [
                        Keys.ENTER,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Camera (R Button)',
                    key: Keys.RSHIFT,
                    extraKeys: [
                        Keys.LSHIFT,
                    ],
                    disableOriginal: false,
                },
            ]
        },
        {
            title: "Mari0",
            creator: "Stabyourself.net",
            prefix: "app-mari0",
            screenmode: "16/9",
            forcescreenmode: true,
            injectTime: 'load',
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: true,
                removeVsync: false,
                pointerLockFix: true,
            },
        },
        {
            title: "Sonic CD",
            creator: "Sega",
            prefix: "app-soniccd",
            screenmode: "16/9",
            forcescreenmode: true,
            injectTime: 'load',
            fixScripts: ["/fixes/sonic-cd-save-file-fix.js"],
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: false,
                removeVsync: false,
                pointerLockFix: false,
            },
            gameKeys: [
                {
                    name: 'Up',
                    key: Keys.UP,
                    extraKeys: [
                        Keys.W,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Down',
                    key: Keys.DOWN,
                    extraKeys: [
                        Keys.S,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Left',
                    key: Keys.LEFT,
                    extraKeys: [
                        Keys.A,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Right',
                    key: Keys.RIGHT,
                    extraKeys: [
                        Keys.D,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Select/Jump',
                    key: Keys.Z,
                    extraKeys: [
                        Keys.SPACE,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Back/Jump',
                    key: Keys.X,
                    extraKeys: [
                        Keys.BACKSPACE,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Select/Pause',
                    key: Keys.ENTER,
                    extraKeys: [
                        Keys.P,
                        Keys.ESCAPE
                    ],
                    disableOriginal: false,
                },
            ],
        },
        {
            title: "Half-Life",
            creator: "Valve",
            prefix: "app-hl/xash.html#150",
            screenmode: "16/9",
            forcescreenmode: true,
            injectTime: 'load',
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: true,
                removeVsync: false,
                pointerLockFix: true,
            },
        },
        {
            title: "Subway Surfers",
            creator: "SYBO Games",
            prefix: "app-sbwysrf",
            screenmode: "window",
            injectTime: 'load',
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: false,
                removeVsync: false,
                pointerLockFix: false,
            },
            versions: [
                {
                    url: "zurich",
                    title: "Zurich (Easter)",
                },
                {
                    url: "new-orleans",
                    title: "New Orleans (Halloween)"
                },
                {
                    url: "london",
                    title: "London (Christmas)"
                },
                {
                    url: "berlin",
                    title: "Berlin"
                },
                {
                    url: "havana",
                    title: "Havana"
                },
                {
                    url: "houston",
                    title: "Houston"
                },
                {
                    url: "monaco",
                    title: "Monaco"
                },
                {
                    url: "st-petersburg",
                    title: "Saint Petersburg"
                },

            ],
            gameKeys: [
                {
                    name: 'Jump',
                    key: Keys.UP,
                    extraKeys: [
                        Keys.W,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Duck',
                    key: Keys.DOWN,
                    extraKeys: [
                        Keys.S,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Left',
                    key: Keys.LEFT,
                    extraKeys: [
                        Keys.A,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Right',
                    key: Keys.RIGHT,
                    extraKeys: [
                        Keys.D,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Hoverboard',
                    key: Keys.SPACE,
                    extraKeys: [
                    ],
                    disableOriginal: false,
                },
            ]

        },
        {
            title: "Fruit Ninja",
            creator: "Halfbrick",
            prefix: "app-fruitninja",
            screenmode: "16/10",
            injectTime: 'load',
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: false,
                removeVsync: false,
                pointerLockFix: false,
            },
        },
        {
            title: "Friday Night Funkin'",
            creator: "Funkin' Crew",
            prefix: "app-fnf",
            screenmode: "window",
            forcescreenmode: true,
            injectTime: 'load',
            versions: [
                {
                    url: "",
                    title: "Base v0.4.0"
                },
                {
                    url: "bhb",
                    title: "Blue House Bundle: DEMO v1.0"
                }
            ],
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: false,
                removeVsync: false,
                pointerLockFix: false,
            },
        },
        {
            title: "Doom",
            creator: "id Software",
            prefix: "app-doom",
            screenmode: "window",
            forcescreenmode: true,
            injectTime: 'DOMContentLoaded',
            gameKeys: [
                {
                    name: 'Forwards',
                    key: Keys.W,

                    extraKeys: [],
                    disableOriginal: false,
                },
                {
                    name: 'Backwards',
                    key: Keys.S,
                    extraKeys: [],
                    disableOriginal: false,
                },
                {
                    name: 'Left',
                    key: Keys.A,
                    extraKeys: [
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Right',
                    key: Keys.D,
                    extraKeys: [
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Interact',
                    key: Keys.SPACE,
                    extraKeys: [
                    ],
                    disableOriginal: false,
                },
            ],
            versions: [
                {
                    url: "?bundleUrl=/app-doom/d?anonymous=1",
                    title: "Doom"
                },
                {
                    url: "?bundleUrl=/app-doom/d2?anonymous=1",
                    title: "Doom II"
                }
            ],
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: false,
                removeVsync: false,
                pointerLockFix: false,
            },
        },
    ];
}