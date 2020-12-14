export class Rectangular {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private x: number;

    constructor(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
    ) {
        this.canvas = canvas;
        this.context = context;
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
