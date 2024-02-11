export type Game = {
    title: string,
    creator: string,
    prefix: string,
    screenmode?: string,
    versions?: Array<GameVersion> | null
}
export type GameVersion = {
    url: string,
    title: string,
}
export default class Games {
    public static games: Array<Game> = [
        {
            title: "Minecraft",
            creator: "Mojang Studios",
            prefix: "mc/",
            screenmode: "16/9",
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
            creator: "Nintendo",
            prefix: "app-sm64/",
            screenmode: "4/3",
        },
    ];
}