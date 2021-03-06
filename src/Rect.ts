export class Rectangular {
    private x: number;

    constructor(
        private canvas: HTMLCanvasElement,
        private context: CanvasRenderingContext2D,
    ) {
        this.x = 10;
    }

    draw() {
        let ctx = this.context;

        ctx.beginPath();
        ctx.arc(100, 75, 50, 0, 2 * Math.PI);

        // set the color of the line
        ctx.strokeStyle = "rgb(220,0,0)";
        ctx.lineWidth = 1;

        // the stroke will actually paint the current path
        ctx.stroke();
    }
}
