import { DrawObject } from "./interfaces/DrawObject";

export class Image implements DrawObject {
    private selected: boolean = false;
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
        ctx.strokeStyle = "rgb(120,30,60)";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.w, 0, 2 * Math.PI);
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
        let ctx = this.context;
        ctx.strokeStyle = "rgb(120,120,120)";
        ctx.setLineDash([5, 2]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        let outline = 2;
        ctx.rect(
            this.x - outline,
            this.y - outline,
            this.w + 2 * outline,
            this.h + 2 * outline,
        );
        ctx.stroke();
        ctx.setLineDash([]);

        let focusPointSize = 5;
        ctx.strokeStyle = "rgb(120,120,120)";
        ctx.beginPath();
        ctx.rect(
            this.x - focusPointSize,
            this.y - focusPointSize,
            2 * focusPointSize,
            2 * focusPointSize,
        );
        ctx.rect(
            this.x + this.w - focusPointSize,
            this.y - focusPointSize,
            2 * focusPointSize,
            2 * focusPointSize,
        );
        ctx.rect(
            this.x - focusPointSize,
            this.y + this.h - focusPointSize,
            2 * focusPointSize,
            2 * focusPointSize,
        );
        ctx.rect(
            this.x + this.w - focusPointSize,
            this.y + this.h - focusPointSize,
            2 * focusPointSize,
            2 * focusPointSize,
        );

        ctx.stroke();
    }
}
