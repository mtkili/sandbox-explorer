import { DrawObject } from "./interfaces/DrawObject";

export class Box implements DrawObject {
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
