import * as config from "../config.json";

export class ObjectFace {
    private selected: boolean = false;

    constructor(
        private canvas: HTMLCanvasElement,
        private context: CanvasRenderingContext2D,
        private x: number,
        private y: number,
        private name: string,
    ) {}

    draw() {
        if (this.selected) {
            this.drawFocus();
        }
        let ctx = this.context;

        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.strokeStyle = "rgb(255,255,30)";
        ctx.lineWidth = 1;

        let w = 150;
        let spacebetween = 2; // space in between of outputs/inputs
        let ni = 1;
        let no = 3;
        let arrowdepth = 10;
        let arrowheight = 30;
        let arrowspace = 10;
        let hl = arrowheight + 2 * arrowspace;

        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + w, this.y);

        // draw outputs
        let xx = this.x;
        let yy = this.y;
        let ymax =
            yy +
            Math.max(ni, no) * hl +
            (Math.max(ni, no) - 1) * spacebetween;
        for (let i = 0; i < no; ++i) {
            this.drawInputOutput(
                xx + w,
                yy,
                arrowspace,
                arrowdepth,
                arrowheight,
            );
            yy +=
                2 * arrowspace + arrowheight + spacebetween;
        }
        ctx.lineTo(xx + w, ymax);
        ctx.stroke();

        // draw inputs
        ctx.beginPath();
        yy = this.y;
        ctx.lineTo(xx, yy);

        for (let i = 0; i < ni; ++i) {
            this.drawInputOutput(
                xx,
                yy,
                arrowspace,
                arrowdepth,
                arrowheight,
            );
            yy +=
                2 * arrowspace + arrowheight + spacebetween;
        }
        ctx.lineTo(xx, ymax);
        ctx.lineTo(xx + w, ymax);

        ctx.stroke();
    }

    private drawFunctionName(
        xx: number,
        yy: number,
        w: number,
        h: number,
    ) {
        let ctx = this.context;
        this.context.font = "10px Verdana";
        this.context.fillStyle = "rgb(255,255,30)";
        this.context.fillText(
            "I can draw text, too!",
            10,
            200,
            200,
        );
    }

    private drawInputOutput(
        xx: number,
        yy: number,
        arrowspace: number,
        arrowdepth: number,
        arrowheight: number,
    ) {
        let ctx = this.context;
        if (arrowspace !== 0) {
            ctx.lineTo(xx, yy + arrowspace);
            yy += arrowspace;
        }
        ctx.lineTo(xx + arrowdepth, yy + arrowheight / 2);
        ctx.lineTo(xx, yy + arrowheight);
        if (arrowspace !== 0) {
            ctx.lineTo(xx, yy + arrowheight + arrowspace);
        }
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
