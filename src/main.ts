import { Grid } from "./grid";
import { Rectangular } from "./rect";

class DrawingApp {
    private paint: boolean = false;
    private clickX: number[] = [];
    private clickY: number[] = [];
    private clickDrag: boolean[] = [];

    constructor(private rect: Rectangular) {
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "black";
        context.lineWidth = 1;

        this.paint = false;
        this.rect = new Rectangular(canvas, context);
        this.redraw();
        this.createUserEvents();
    }

    private createUserEvents() {
        window.addEventListener(
            "keypress",
            this.keyEventHandler,
        );
        window.addEventListener(
            "keydown",
            this.keyEventHandler,
        );
        window.addEventListener(
            "keyup",
            this.keyEventHandler,
        );

        canvas.addEventListener(
            "mousedown",
            this.pressEventHandler,
        );
        canvas.addEventListener(
            "mousemove",
            this.dragEventHandler,
        );
        canvas.addEventListener(
            "mouseup",
            this.releaseEventHandler,
        );
        canvas.addEventListener(
            "mouseout",
            this.cancelEventHandler,
        );
        canvas.addEventListener(
            "mousewheel",
            this.mouseWheelHandler,
        );

        canvas.addEventListener(
            "touchstart",
            this.pressEventHandler,
        );
        canvas.addEventListener(
            "touchmove",
            this.dragEventHandler,
        );
        canvas.addEventListener(
            "touchend",
            this.releaseEventHandler,
        );
        canvas.addEventListener(
            "touchcancel",
            this.cancelEventHandler,
        );
    }

    public redraw() {
        let clickX = this.clickX;
        let clickDrag = this.clickDrag;
        let clickY = this.clickY;
        context.strokeStyle = "rgb(0,0,255)";
        for (let i = 0; i < clickX.length; ++i) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(
                    clickX[i - 1],
                    clickY[i - 1],
                );
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }

            context.lineTo(clickX[i], clickY[i]);
            context.stroke();
        }
        context.closePath();
        this.rect.draw();
    }

    private addClick(
        x: number,
        y: number,
        dragging: boolean,
    ) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }

    private releaseEventHandler = () => {
        this.paint = false;
        this.redraw();
    };

    private cancelEventHandler = () => {
        this.paint = false;
    };

    private keyEventHandler = (e: KeyboardEvent) => {
        console.log(e);
    };

    private mouseWheelHandler = (e: WheelEvent) => {
        console.log(e);
    };

    private pressEventHandler = (
        e: MouseEvent | TouchEvent,
    ) => {
        let mouseX = (e as TouchEvent).changedTouches
            ? (e as TouchEvent).changedTouches[0].pageX
            : (e as MouseEvent).pageX;
        let mouseY = (e as TouchEvent).changedTouches
            ? (e as TouchEvent).changedTouches[0].pageY
            : (e as MouseEvent).pageY;
        mouseX -= canvas.offsetLeft;
        mouseY -= canvas.offsetTop;

        this.paint = true;
        this.addClick(mouseX, mouseY, false);
        this.redraw();
    };

    private dragEventHandler = (
        e: MouseEvent | TouchEvent,
    ) => {
        let mouseX = (e as TouchEvent).changedTouches
            ? (e as TouchEvent).changedTouches[0].pageX
            : (e as MouseEvent).pageX;
        let mouseY = (e as TouchEvent).changedTouches
            ? (e as TouchEvent).changedTouches[0].pageY
            : (e as MouseEvent).pageY;
        mouseX -= canvas.offsetLeft;
        mouseY -= canvas.offsetTop;

        if (this.paint) {
            this.addClick(mouseX, mouseY, true);
            this.redraw();
        }

        e.preventDefault();
    };
}

let canvas = document.getElementById(
    "canvas",
) as HTMLCanvasElement;
let context = canvas.getContext(
    "2d",
) as CanvasRenderingContext2D;
let grid: Grid = new Grid(canvas, context);
let app: DrawingApp = new DrawingApp();

let resizeWindow = () => {
    canvas.width = window.innerWidth * 1;
    canvas.height = window.innerHeight * 1;
    grid.drawGrid(canvas.width, canvas.height);
    app.redraw();
};
window.onresize = resizeWindow;
resizeWindow();
