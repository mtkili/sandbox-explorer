export interface DrawObject {
    x: number;
    y: number;

    draw(): void;

    clickToSelect(mouseX: number, mouseY: number): void;
}
