import * as config from "../../config.json";
import { BaseCanvas } from "./models/BaseCanvas";

export class Grid extends BaseCanvas {
    // constructor(
    //     private canvas: HTMLCanvasElement,
    //     private context: CanvasRenderingContext2D,
    // ) {}

    public drawGrid(step: number) {
        let w = this.canvas.width;
        let h = this.canvas.height;
        let ctx = this.context;
        ctx.beginPath();
        for (var x = 0; x <= w; x += step) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
        }

        ctx.strokeStyle = config.grid.linecolor;
        ctx.lineWidth = 1;
        // the stroke will actually paint the current path
        ctx.stroke();
        // for the sake of the example 2nd path
        ctx.beginPath();
        for (var y = 0; y <= h; y += step) {
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
        }

        ctx.strokeStyle = config.grid.linecolor;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}
