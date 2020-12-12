export class Grid {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
    ) {
        this.canvas = canvas;
        this.context = context;
    }

    public drawGrid() {
        let step = 20;
        let w = this.canvas.width;
        let h = this.canvas.height;
        let ctx = this.context;
        ctx.beginPath();
        for (var x = 0; x <= w; x += step) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
        }
        // set the color of the line
        ctx.strokeStyle = "rgb(220,220,220)";
        ctx.lineWidth = 1;
        // the stroke will actually paint the current path
        ctx.stroke();
        // for the sake of the example 2nd path
        ctx.beginPath();
        for (var y = 0; y <= h; y += step) {
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
        }
        // set the color of the line
        ctx.strokeStyle = "rgb(220,220,220)";
        // just for fun
        ctx.lineWidth = 1;
        // for your original question - you need to stroke only once
        ctx.stroke();
    }
}
