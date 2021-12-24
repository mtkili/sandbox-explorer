export class BaseCanvas {
    readonly canvas;
    readonly context;

    constructor(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
    ) {
        this.canvas = canvas;
        this.context = context;
    }
}
