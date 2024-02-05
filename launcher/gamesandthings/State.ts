import IDrawable from "./interfaces/IDrawable";

export default class State implements IDrawable {
    members: Array<IDrawable> = [];
    create(): void {

    }
    draw() {
        this.members.forEach((drawable) => { drawable.draw() })
    }
    update(elapsed: number): void {
        this.members.forEach((sprite) => {
            sprite.update(elapsed);
        });
    }
    destroy(): void {

    }
    add(member: IDrawable) {
        this.members.push(member);
        member.create();
    }
}