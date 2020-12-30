export interface DrawObject {
    x: number;
    y: number;
    selected: boolean;
    type: string;

    draw(): void;

    clickToSelect(mouseX: number, mouseY: number): void;

    drawFocus(): void;
}
