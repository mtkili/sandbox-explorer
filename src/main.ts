import { Grid } from "./Grid";
import { Rectangular } from "./Rect";
import { DrawingApp } from "./DrawingApp";

let canvas = document.getElementById(
    "canvas",
) as HTMLCanvasElement;
let context = canvas.getContext(
    "2d",
) as CanvasRenderingContext2D;
let grid: Grid = new Grid(canvas, context);
let app: DrawingApp = new DrawingApp(grid, canvas, context);

let resizeWindow = () => {
    canvas.width = window.innerWidth * 1;
    canvas.height = window.innerHeight * 1;
    grid.drawGrid(canvas.width, canvas.height);
    app.redraw();
};
window.onresize = resizeWindow;
resizeWindow();
