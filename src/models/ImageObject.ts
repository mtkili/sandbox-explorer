import { DrawObject } from "./interfaces/DrawObject";
import * as effects from "./effects/DrawFocus";

export class ImageObject implements DrawObject {
    private selected: boolean = false;
    x: number;
    y: number;

    constructor(
        private canvas: HTMLCanvasElement,
        private context: CanvasRenderingContext2D,
        x: number,
        y: number,
    ) {
        this.x = x;
        this.y = y;
    }

    draw() {
        if (this.selected) {
            this.drawFocus();
        }
        let ctx = this.context;

        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.strokeStyle = "rgb(120,30,60)";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.w, 0, 2 * Math.PI);
        ctx.stroke();
    }

    clickToSelect(mouseX: number, mouseY: number) {
        this.selected =
            mouseX >= this.x - this.w &&
            mouseX <= this.x + this.w &&
            mouseY >= this.y - this.h &&
            mouseY <= this.y + this.h;
    }

    drawFocus() {
        effects.drawFocus(
            this.context,
            this.x - this.w,
            this.y - this.w,
            this.w * 2,
            this.h * 2,
        );
    }
}
