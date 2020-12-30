import { DrawObject } from "./interfaces/DrawObject";
import * as effects from "./effects/DrawFocus";

export class ImageObject implements DrawObject {
    type: string = "image";
    selected: boolean = false;
    x: number;
    y: number;
    w: number;
    h: number;
    image: HTMLImageElement;

    constructor(
        private canvas: HTMLCanvasElement,
        private context: CanvasRenderingContext2D,
        x: number,
        y: number,
        imageSrc: string,
    ) {
        this.x = x;
        this.y = y;
        this.w = 0;
        this.h = 0;
        this.image = new Image();
        this.image.crossOrigin = "Anonymous";
        let loaded = () => {
            this.w = this.image.width;
            this.h = this.image.height;
        };
        this.image.onload = loaded;
        this.image.src = imageSrc;
    }

    makeTransparant() {
        // let tempCanvas = <HTMLCanvasElement>(
        //     document.createElement("canvas")
        // );
        // let tempCtx = tempCanvas.getContext("2d");
        // tempCtx.drawImage(this.image, 0, 0);
        let imageData = this.context.getImageData(
            0,
            0,
            this.image.width,
            this.image.height,
        );
        // var img = new Image();
        // img.src = imageData;
        //        context.drawImage(img, 0, 0);

        // let ctx = this.context;
        // var imgData = ctx.getImageData(
        //     this.x,
        //     this.y,
        //     this.w,
        //     this.h,
        // );
        //        ctx.putImageData(imgData, 10, 70);

        // let idata = ctx.getImageData(
        //     this.x,
        //     this.y,
        //     this.w,
        //     this.h,
        // );
        let data32 = new Uint32Array(imageData.data.buffer);
        let len = data32.length;

        for (let i = 0; i < len; i++) {
            let px = data32[i] & 0xff000000;

            if (px) {
                data32[i] = px | 0xffffff;
            }
        }

        // done
        this.context.putImageData(imageData, 0, 0);
    }

    draw() {
        if (this.selected) {
            this.drawFocus();
        }
        let ctx = this.context;
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.w,
            this.h,
        );
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
            this.x,
            this.y,
            this.w,
            this.h,
        );
    }
}
