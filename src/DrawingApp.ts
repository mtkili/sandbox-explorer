import { Grid } from "./Grid";
import { Rectangular } from "./Rect";
import { Box } from "./models/Box";
import { ImageObject } from "./models/ImageObject";
import { Circle } from "./models/Circle";
import { DrawObject } from "./models/interfaces/DrawObject";
// import { ObjectFace } from "./models/ObjectFace";

import * as config from "../config.json";

export class DrawingApp {
    private paint: boolean = false;
    private clickX: number[] = [];
    private clickY: number[] = [];
    private clickDrag: boolean[] = [];
    private scaleXY: number = 1.0;
    private rect: Rectangular;
    private objects: DrawObject[] = [];
    private mouseX: number = 0;
    private mouseY: number = 0;
    private shiftKeyDown: boolean = false;
    private ctrlKeyDown: boolean = false;
    private altKeyDown: boolean = false;

    constructor(
        private grid: Grid,
        private canvas: HTMLCanvasElement,
        private context: CanvasRenderingContext2D,
    ) {
        this.context.lineCap = "round";
        this.context.lineJoin = "round";
        this.context.strokeStyle = "black";
        this.context.lineWidth = 1;

        this.paint = false;
        this.rect = new Rectangular(canvas, context);
        this.redraw();
        this.createUserEvents();

        this.objects.push(
            new Box(canvas, context, 200, 400, 100, 100),
        );
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

        if (this.shiftKeyDown) {
        }

        this.redraw();
    };

    private cancelEventHandler = () => {
        this.paint = false;
    };

    private keyEventHandler = (e: KeyboardEvent) => {
        this.shiftKeyDown = e.shiftKey;
        this.ctrlKeyDown = e.ctrlKey;
        this.altKeyDown = e.altKey;

        if (e.type == "keyup" && e.code == "KeyA") {
            this.objects.push(
                new Box(
                    this.canvas,
                    this.context,
                    this.mouseX,
                    this.mouseY,
                    50,
                    50,
                ),
            );
            this.redraw();
        } else if (e.type == "keyup" && e.code == "KeyD") {
            this.objects.push(
                new ImageObject(
                    this.canvas,
                    this.context,
                    this.mouseX,
                    this.mouseY,
                    "https://media.s-bol.com/qYzWx2Q7jMXD/115x210.jpg",
                    // "https://www.w3schools.com/tags/img_the_scream.jpg",
                ),
            );
            this.redraw();
        } else if (e.type == "keyup" && e.code == "KeyC") {
            this.objects.push(
                new Circle(
                    this.canvas,
                    this.context,
                    this.mouseX,
                    this.mouseY,
                    50,
                    50,
                ),
            );
            this.redraw();
        } else if (e.type == "keyup" && e.code == "KeyE") {
            for (let i = 0; i < this.objects.length; ++i) {
                if (
                    this.objects[i].type === "image" &&
                    this.objects[i].selected
                ) {
                    let image = this.objects[
                        i
                    ] as ImageObject;
                    // image.invert();
                    //                    image.makeTransparant();
                }
            }
            this.redraw();
        }
    };

    private mouseWheelHandler = (e: WheelEvent) => {
        //        console.log(e);
        //        this.scaleXY = 0.1;
        this.redraw();
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
        let redraw: boolean = false;
        mouseX -= this.canvas.offsetLeft;
        mouseY -= this.canvas.offsetTop;
        this.mouseX = mouseX;
        this.mouseY = mouseY;

        if (this.ctrlKeyDown) {
            this.paint = true;
            this.addClick(mouseX, mouseY, false);
            redraw = true;
        }

        for (let i = 0; i < this.objects.length; ++i) {
            this.objects[i].clickToSelect(mouseX, mouseY);
            redraw = true;
        }

        if (redraw) {
            this.redraw();
        }
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
        this.mouseX = mouseX;
        this.mouseY = mouseY;

        // if (
        //     this.determineCursor(this.mouseX, this.mouseY)
        // ) {
        //     this.canvas.style.cursor = "nwse-resize";
        //     this.canvas.style.cursor = "nesw-resize";
        // } else {
        //     this.canvas.style.cursor = "default";
        // }

        if (this.paint && this.ctrlKeyDown) {
            this.addClick(mouseX, mouseY, true);
            this.redraw();
        }

        e.preventDefault();
    };

    private determineCursor(
        mouseX: number,
        mouseY: number,
    ) {
        return mouseY > 100;
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

        this.canvas.addEventListener(
            "mousedown",
            this.pressEventHandler,
        );
        this.canvas.addEventListener(
            "mousemove",
            this.dragEventHandler,
        );
        this.canvas.addEventListener(
            "mouseup",
            this.releaseEventHandler,
        );
        this.canvas.addEventListener(
            "mouseout",
            this.cancelEventHandler,
        );
        this.canvas.addEventListener(
            "mousewheel",
            this.mouseWheelHandler,
        );

        this.canvas.addEventListener(
            "touchstart",
            this.pressEventHandler,
        );
        this.canvas.addEventListener(
            "touchmove",
            this.dragEventHandler,
        );
        this.canvas.addEventListener(
            "touchend",
            this.releaseEventHandler,
        );
        this.canvas.addEventListener(
            "touchcancel",
            this.cancelEventHandler,
        );
    }

    public redraw() {
        let clickX = this.clickX;
        let clickDrag = this.clickDrag;
        let clickY = this.clickY;
        //        context.scale(this.scaleXY, this.scaleXY);
        //       context.scale(0.99, 0.99);

        this.context.beginPath();
        this.context.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height,
        );
        this.context.fillStyle = "rgb(20,20,20)";
        this.context.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height,
        );
        this.context.stroke();

        this.grid.drawGrid(15);

        this.context.strokeStyle = "rgb(0,0,255)";
        for (let i = 0; i < clickX.length; ++i) {
            this.context.beginPath();
            if (clickDrag[i] && i) {
                this.context.moveTo(
                    clickX[i - 1],
                    clickY[i - 1],
                );
            } else {
                this.context.moveTo(
                    clickX[i] - 1,
                    clickY[i],
                );
            }

            this.context.lineTo(clickX[i], clickY[i]);
            this.context.stroke();
        }
        this.context.closePath();
        this.rect.draw();

        for (let i = 0; i < this.objects.length; ++i) {
            this.objects[i].draw();
        }

        this.context.font = "36px Verdana";
        this.context.fillStyle = "white";
        this.context.textAlign = "left";
        // this.context.textBaseline = "Bottom";

        this.context.fillText("Hello World!", 10, 200, 200);
    }
}
