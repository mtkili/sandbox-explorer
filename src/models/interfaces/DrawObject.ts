export interface DrawObject {
    x: number;
    y: number;

    clickToSelect(xx: number, yy: number): void;
}
