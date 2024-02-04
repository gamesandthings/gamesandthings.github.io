export default class Rectangle {
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public overlaps(r: Rectangle) {
        return this.x < r.x + r.width && this.x + this.width > r.x && this.y < r.y + r.height && this.y + this.height > r.y;
    }
    public overlapsPoint(x: number, y: number) {
        return this.x <= x && x <= this.x + this.width &&
            this.y <= y && y <= this.y + this.height;
    }
}