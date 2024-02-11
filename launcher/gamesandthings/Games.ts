export type Game = {
    title: string,
    prefix: string,
    screenmode: string,
    versions: Array<GameVersion>
}
export type GameVersion = {
    url: string,
    title: string,
}
export default class Games {
    public static games: Array<Game> = [
        {
            title: "Minecraft",
            prefix: "mc/",
            screenmode: "16:9",
            versions: [
                {
                    url: "1.8.8",
                    title: "1.8.8"
                }, {
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
            ]
        },
        {
            title: "Super Mario 64",
            prefix: "app-sm64/",
            screenmode: "16:9",
            versions: [
                {
                    url: "",
                    title: "Super Mario 64"
                }
            ]
        },
    ];
}