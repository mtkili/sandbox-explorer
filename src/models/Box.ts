export class Box {
    private selected: boolean = false;

    constructor(
        private canvas: HTMLCanvasElement,
        private context: CanvasRenderingContext2D,
        private x: number,
        private y: number,
        private w: number,
        private h: number,
    ) {}

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

    clickToSelect(xx: number, yy: number) {
        this.selected =
            xx >= this.x &&
            xx <= this.x + this.w &&
            yy >= this.y &&
            yy <= this.y + this.h;
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
