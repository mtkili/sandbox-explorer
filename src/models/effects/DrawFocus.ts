function drawFocusPoint(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
) {
    let focusPointSize = 4;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(120,120,120)";
    ctx.lineWidth = 1;
    ctx.rect(
        x - focusPointSize,
        y - focusPointSize,
        2 * focusPointSize,
        2 * focusPointSize,
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "#999999";
    ctx.strokeStyle = "#999999";
    ctx.fillRect(
        x - 1 - focusPointSize,
        y - 1 - focusPointSize,
        2 * focusPointSize,
        2 * focusPointSize,
    );
    ctx.stroke();
}

export function drawFocus(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
) {
    ctx.strokeStyle = "rgb(120,120,120)";
    ctx.setLineDash([5, 2]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    let outline = 2;
    ctx.rect(
        x - outline,
        y - outline,
        w + 2 * outline,
        h + 2 * outline,
    );
    ctx.stroke();
    ctx.setLineDash([]);

    drawFocusPoint(ctx, x, y);
    drawFocusPoint(ctx, x + w, y);
    drawFocusPoint(ctx, x + w, y + h);
    drawFocusPoint(ctx, x, y + h);
}
