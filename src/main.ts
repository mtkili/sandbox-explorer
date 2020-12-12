import { Grid } from "./grid";

class DrawingApp {
    private canvas: HTMLCanvasElement;
    private myContext: CanvasRenderingContext2D;
    private paint: boolean;

    private clickX: number[] = [];
    private clickY: number[] = [];
    private clickDrag: boolean[] = [];

    private grid: Grid;

    constructor() {
        let canvas = document.getElementById(
            "canvas",
        ) as HTMLCanvasElement;
        let context = canvas.getContext("2d");
        if (context) {
            this.myContext = context;
            this.myContext.lineCap = "round";
            this.myContext.lineJoin = "round";
            this.myContext.strokeStyle = "black";
            this.myContext.lineWidth = 1;
        } else {
            console.error("No canvas found!");
        }

        this.canvas = canvas;
        this.paint = false;
        this.redraw();
        this.createUserEvents();
        this.grid = new Grid(canvas, this.myContext);
        this.grid.drawGrid();
    }

    private createUserEvents() {
        let canvas = this.canvas;

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

    private redraw() {
        let clickX = this.clickX;
        let context = this.myContext;
        let clickDrag = this.clickDrag;
        let clickY = this.clickY;
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

    private pressEventHandler = (
        e: MouseEvent | TouchEvent,
    ) => {
        let mouseX = (e as TouchEvent).changedTouches
            ? (e as TouchEvent).changedTouches[0].pageX
            : (e as MouseEvent).pageX;
        let mouseY = (e as TouchEvent).changedTouches
            ? (e as TouchEvent).changedTouches[0].pageY
            : (e as MouseEvent).pageY;
        mouseX -= this.canvas.offsetLeft;
        mouseY -= this.canvas.offsetTop;

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
        mouseX -= this.canvas.offsetLeft;
        mouseY -= this.canvas.offsetTop;

        if (this.paint) {
            this.addClick(mouseX, mouseY, true);
            this.redraw();
        }

        e.preventDefault();
    };
}

new DrawingApp();
