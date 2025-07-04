"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Keys_1 = __importDefault(require("./Keys"));
var Games = /** @class */ (function () {
    function Games() {
    }
    Games.getGameByID = function (id) {
        for (var i = 0; i < Games.games.length; i++) {
            var element = Games.games[i];
            if (element.id == id) {
                return element;
            }
        }
        return null;
    };
    Games.getVersionByID = function (game, id) {
        if (game.versions == null) {
            return null;
        }
        for (var i = 0; i < game.versions.length; i++) {
            var element = game.versions[i];
            if (element.id == id) {
                return element;
            }
        }
        return null;
    };
    Games.games = [
        {
            title: "Minecraft",
            id: "minecraft",
            creator: "Mojang Studios",
            inject: false,
            prefix: "mc",
            screenmode: "window",
            fixScripts: ["/fixes/mc-mobile-fix.js"],
            versions: [
                {
                    url: "1.12.2",
                    title: "1.12.2",
                    id: "1.12.2"
                },
                {
                    url: "1.12.2_WASM",
                    title: "1.12.2 (wasm)",
                    id: "1.12.2-wasm"
                },
                {
                    url: "1.8.8",
                    title: "1.8.8",
                    id: "1.8.8"
                },
                {
                    url: "1.8.8_WASM",
                    title: "1.8.8 (wasm)",
                    id: "1.8.8-wasm"
                },
                {
                    url: "1.8.8-resent",
                    title: "1.8.8 Resent Client",
                    id: "1.8.8-resent"
                },
                {
                    url: "1.5.2",
                    title: "1.5.2",
                    id: "1.5.2"
                },
                {
                    url: "b1.7.3",
                    title: "b1.7.3",
                    id: "b1.7.3"
                },
                {
                    url: "b1.3_01",
                    title: "b1.3_01",
                    id: "b1.3_01"
                },
                {
                    url: "a1.2.6",
                    title: "a1.2.6",
                    id: "a1.2.6"
                },
                {
                    url: "indev-20100223",
                    title: "Indev-20100223",
                    id: "indev-20100223"
                },
                {
                    url: "c0.30",
                    title: "c0.30",
                    id: "c0.30"
                },
                {
                    url: "c0.0.23a_01",
                    title: "c0.0.23a_01",
                    id: "c0.0.23a_01"
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
            title: "New Super Mario Bros.",
            id: "nsmb",
            creator: "Nintendo",
            prefix: "app-ejs",
            screenmode: "window",
            forcescreenmode: true,
            inject: true,
            fixes: {
                preserveDrawingBuffer: false,
                runsAtSetFrameRate: false,
                removeVsync: true,
                pointerLockFix: false,
                alpha: false,
            },
            versions: [
                {
                    url: "ds/nsmb/",
                    title: "New Super Mario Bros.",
                    id: "nsmb"
                },
            ]
        },
        {
            title: "MarioKart",
            id: "mk",
            creator: "Nintendo",
            prefix: "app-ejs",
            screenmode: "window",
            forcescreenmode: true,
            inject: true,
            showVersionSelectOnLaunch: true,
            fixes: {
                preserveDrawingBuffer: false,
                runsAtSetFrameRate: false,
                removeVsync: true,
                pointerLockFix: false,
                alpha: false,
            },
            versions: [
                {
                    url: "ds/mk/",
                    title: "MarioKart DS",
                    id: "mkds"
                },
            ]
        },
        {
            title: "Pokémon Gen Ⅰ (GB)",
            id: "pkmn-gen1",
            creator: "The Pokémon Company",
            overrideVersionListName: "Change Edition",
            prefix: "app-ejs",
            screenmode: "window",
            forcescreenmode: true,
            onlyShowVersionNameInTabTitle: true,
            showVersionSelectOnLaunch: true,
            inject: true,
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: false,
                removeVsync: false,
                pointerLockFix: false,
            },
            versions: [
                {
                    url: "gb/pky/",
                    title: "Pokémon Yellow",
                    id: "pky"
                },
                {
                    url: "gb/pkr/",
                    title: "Pokémon Red",
                    id: "pkr"
                },
                {
                    url: "gb/pkb/",
                    title: "Pokémon Blue",
                    id: "pkb"
                },
            ]
        },
        {
            title: "Pokémon Gen Ⅴ (DS)",
            id: "pkmn-gen5",
            creator: "The Pokémon Company",
            prefix: "app-ejs",
            screenmode: "window",
            forcescreenmode: true,
            onlyShowVersionNameInTabTitle: true,
            showVersionSelectOnLaunch: true,
            inject: true,
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: false,
                removeVsync: false,
                pointerLockFix: false,
            },
            versions: [
                {
                    url: "ds/pkb/",
                    title: "Pokémon Black",
                    id: "pkb"
                },
                {
                    url: "ds/pkw/",
                    title: "Pokémon White",
                    id: "pkw"
                },
            ]
        },
        {
            title: "Super Mario 64",
            id: "sm64",
            creator: "Nintendo",
            prefix: "app-sm64",
            screenmode: "4/3",
            inject: true,
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
                    key: Keys_1.default.W,
                    extraKeys: [],
                    disableOriginal: false,
                },
                {
                    name: 'Back',
                    key: Keys_1.default.S,
                    extraKeys: [],
                    disableOriginal: false,
                },
                {
                    name: 'Left',
                    key: Keys_1.default.A,
                    extraKeys: [],
                    disableOriginal: false,
                },
                {
                    name: 'Right',
                    key: Keys_1.default.D,
                    extraKeys: [],
                    disableOriginal: false,
                },
                {
                    name: 'Crouch (Z Trigger)',
                    key: Keys_1.default.K,
                    extraKeys: [],
                    disableOriginal: false,
                },
                {
                    name: 'Jump (A Button)',
                    key: Keys_1.default.L,
                    extraKeys: [],
                    disableOriginal: false,
                },
                {
                    name: 'Punch (B Button)',
                    key: Keys_1.default.COMMA,
                    extraKeys: [],
                    disableOriginal: false,
                },
                {
                    name: 'Pause (Start Button)',
                    key: Keys_1.default.SPACE,
                    extraKeys: [
                        Keys_1.default.ENTER,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Camera (R Button)',
                    key: Keys_1.default.RSHIFT,
                    extraKeys: [
                        Keys_1.default.LSHIFT,
                    ],
                    disableOriginal: false,
                },
            ]
        },
        {
            title: "UNDERTALE",
            id: "undertale",
            creator: "Toby Fox",
            prefix: "app-ut",
            screenmode: "window",
            forcescreenmode: true,
            inject: true,
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: true,
                removeVsync: false,
                pointerLockFix: false,
            },
        },
        {
            title: "DELTARUNE",
            id: "deltarune",
            creator: "Toby Fox",
            prefix: "app-dt",
            screenmode: "window",
            forcescreenmode: true,
            inject: true,
            overrideVersionListName: "Chapter Select",
            showVersionSelectOnLaunch: true,
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: true,
                removeVsync: false,
                pointerLockFix: false,
            },
            versions: [
                {
                    url: "chapter1-v2",
                    title: "Chapter 1 - The Beginning",
                    id: "chapter1"
                },
                {
                    url: "chapter2-v4",
                    title: "Chapter 2 - A Cyber's World",
                    id: "chapter2"
                },
                {
                    url: "chapter3",
                    title: "Chapter 3 - Late Night",
                    id: "chapter3"
                },
                {
                    url: "chapter4",
                    title: "Chapter 4 - Prophecy",
                    id: "chapter4"
                },
            ]
        },
        {
            title: "Pizza Tower",
            id: "pizza-tower",
            creator: "Tour De Pizza",
            prefix: "app-pt",
            screenmode: "window",
            forcescreenmode: true,
            inject: true,
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: true,
                removeVsync: false,
                pointerLockFix: false,
            },
        },
        {
            title: "osu! (web)",
            id: "osu",
            creator: "ppy",
            prefix: "app-osu",
            screenmode: "window",
            forcescreenmode: true,
            inject: true,
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: true,
                removeVsync: false,
                pointerLockFix: false,
            },
        },
        {
            title: "Mari0",
            id: "mari0",
            creator: "Stabyourself.net",
            prefix: "app-mari0",
            screenmode: "16/9",
            forcescreenmode: true,
            inject: true,
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: true,
                removeVsync: false,
                pointerLockFix: true,
            },
        },
        {
            title: "Sonic CD",
            id: "sonic-cd",
            creator: "Sega",
            prefix: "app-soniccd",
            screenmode: "16/9",
            forcescreenmode: true,
            inject: true,
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
                    key: Keys_1.default.UP,
                    extraKeys: [
                        Keys_1.default.W,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Down',
                    key: Keys_1.default.DOWN,
                    extraKeys: [
                        Keys_1.default.S,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Left',
                    key: Keys_1.default.LEFT,
                    extraKeys: [
                        Keys_1.default.A,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Right',
                    key: Keys_1.default.RIGHT,
                    extraKeys: [
                        Keys_1.default.D,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Select/Jump',
                    key: Keys_1.default.Z,
                    extraKeys: [
                        Keys_1.default.SPACE,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Back/Jump',
                    key: Keys_1.default.X,
                    extraKeys: [
                        Keys_1.default.BACKSPACE,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Select/Pause',
                    key: Keys_1.default.ENTER,
                    extraKeys: [
                        Keys_1.default.P,
                        Keys_1.default.ESCAPE
                    ],
                    disableOriginal: false,
                },
            ],
        },
        {
            title: "Half-Life",
            id: "hl",
            creator: "Valve",
            prefix: "app-hl/xash.html#150",
            screenmode: "16/9",
            forcescreenmode: true,
            inject: true,
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: true,
                removeVsync: false,
                pointerLockFix: true,
            },
        },
        {
            title: "Subway Surfers",
            id: "subway-surfers",
            creator: "SYBO Games",
            prefix: "app-sbwysrf",
            screenmode: "window",
            inject: true,
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
                    id: "zurich"
                },
                {
                    url: "new-orleans",
                    title: "New Orleans (Halloween)",
                    id: "new-orleans"
                },
                {
                    url: "london",
                    title: "London (Christmas)",
                    id: "london"
                },
                {
                    url: "berlin",
                    title: "Berlin",
                    id: "berlin"
                },
                {
                    url: "havana",
                    title: "Havana",
                    id: "havana"
                },
                {
                    url: "houston",
                    title: "Houston",
                    id: "houston"
                },
                {
                    url: "monaco",
                    title: "Monaco",
                    id: "monaco"
                },
                {
                    url: "st-petersburg",
                    title: "Saint Petersburg",
                    id: "st-petersburg"
                },
            ],
            gameKeys: [
                {
                    name: 'Jump',
                    key: Keys_1.default.UP,
                    extraKeys: [
                        Keys_1.default.W,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Duck',
                    key: Keys_1.default.DOWN,
                    extraKeys: [
                        Keys_1.default.S,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Left',
                    key: Keys_1.default.LEFT,
                    extraKeys: [
                        Keys_1.default.A,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Right',
                    key: Keys_1.default.RIGHT,
                    extraKeys: [
                        Keys_1.default.D,
                    ],
                    disableOriginal: false,
                },
                {
                    name: 'Hoverboard',
                    key: Keys_1.default.SPACE,
                    extraKeys: [],
                    disableOriginal: false,
                },
            ]
        },
        {
            title: "Fruit Ninja",
            id: "fruit-ninja",
            creator: "Halfbrick",
            prefix: "app-fruitninja",
            screenmode: "16/10",
            inject: true,
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: false,
                removeVsync: false,
                pointerLockFix: false,
            },
        },
        {
            title: "Friday Night Funkin'",
            id: "fnf",
            creator: "Funkin' Crew",
            prefix: "app-fnf",
            screenmode: "window",
            forcescreenmode: true,
            inject: true,
            versions: [
                {
                    url: "",
                    title: "Base v0.4.0",
                    id: "v0.4.0",
                },
                {
                    url: "bhb",
                    title: "Blue House Bundle: DEMO v1.0",
                    id: "bhb-demo",
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
            id: "doom",
            creator: "id Software",
            prefix: "app-doom",
            screenmode: "window",
            forcescreenmode: true,
            inject: true,
            gameKeys: [
                {
                    name: 'Forwards',
                    key: Keys_1.default.W,
                    extraKeys: [],
                    disableOriginal: false,
                },
                {
                    name: 'Backwards',
                    key: Keys_1.default.S,
                    extraKeys: [],
                    disableOriginal: false,
                },
                {
                    name: 'Left',
                    key: Keys_1.default.A,
                    extraKeys: [],
                    disableOriginal: false,
                },
                {
                    name: 'Right',
                    key: Keys_1.default.D,
                    extraKeys: [],
                    disableOriginal: false,
                },
                {
                    name: 'Interact',
                    key: Keys_1.default.SPACE,
                    extraKeys: [],
                    disableOriginal: false,
                },
            ],
            versions: [
                {
                    url: "?bundleUrl=/app-doom/d?anonymous=1",
                    title: "Doom",
                    id: "I",
                },
                {
                    url: "?bundleUrl=/app-doom/d2?anonymous=1",
                    title: "Doom II",
                    id: "II",
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
            title: "Run",
            id: "run",
            creator: "player03",
            prefix: "app-flash",
            screenmode: "window",
            forcescreenmode: true,
            inject: true,
            fixes: {
                preserveDrawingBuffer: true,
                runsAtSetFrameRate: false,
                removeVsync: false,
                pointerLockFix: false,
            },
            versions: [
                {
                    url: "run1",
                    title: "Run (Classic)",
                    id: "run",
                },
                {
                    url: "run1remaster",
                    title: "Run (Remaster)",
                    id: "run-remaster",
                },
                {
                    url: "run2",
                    title: "Run 2",
                    id: "run2",
                },
                {
                    url: "run3",
                    title: "Run 3",
                    id: "run3",
                },
            ],
        },
    ];
    return Games;
}());
exports.default = Games;
