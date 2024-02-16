import { Font } from "../UniFont";

export type ContextOption = {
    text: string,
    desc?: string,
    onselect?: () => void,
    title?: boolean,
    hasSecondary?: boolean,
    font?: Font,
    descFont?: Font,
}