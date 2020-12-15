export class Box {
    constructor(
        private canvas: HTMLCanvasElement,
        private context: CanvasRenderingContext2D,
        private x: number,
        private y: number,
        private w: number,
        private h: number,
    ) {}

    draw() {
        let ctx = this.context;

        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);

        // set the color of the line
        ctx.strokeStyle = "rgb(60,150,30)";
        ctx.lineWidth = 1;

        // the stroke will actually paint the current path
        ctx.stroke();
    }
}
