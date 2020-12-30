import { DrawObject } from "./interfaces/DrawObject";
import * as effects from "./effects/DrawFocus";

export class Box implements DrawObject {
    type: string = "box";
    selected: boolean = false;
    x: number;
    y: number;

    constructor(
        private canvas: HTMLCanvasElement,
        private context: CanvasRenderingContext2D,
        x: number,
        y: number,
        private w: number,
        private h: number,
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
        ctx.strokeStyle = "rgb(60,255,30)";
        ctx.lineWidth = 1;

        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.w, this.y + this.h);
        ctx.moveTo(this.x + this.w, this.y);
        ctx.lineTo(this.x, this.y + this.h);

        ctx.stroke();
    }

    clickToSelect(mouseX: number, mouseY: number) {
        this.selected =
            mouseX >= this.x &&
            mouseX <= this.x + this.w &&
            mouseY >= this.y &&
            mouseY <= this.y + this.h;
    }

    drawFocus() {
        effects.drawFocus(
            this.context,
            this.x,
            this.y,
            this.w,
            this.h,
        );
    }
}
