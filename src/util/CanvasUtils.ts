import { Rectangle } from '../math/geom/Rectangle';
import { Vector2D } from '../math/Vector2D';

export class CanvasUtils {

    /**
     * Creates a canvas with the given size in pixels.
     * @param width
     * @param height 
     * @param callback Optional callback to render after the canvas' creation.
     */
    public static create(width: number, height: number, callback?: (ctx: CanvasRenderingContext2D) => void): HTMLCanvasElement {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        if (callback !== undefined) {
            callback(canvas.getContext("2d")!);
        }
        return canvas;
    }

    /**
     * Creates a copy of a rectangular section from the canvas.
     * @param canvas The canvas from which to derive.
     * @param dest The destination sub-rectangle to copy from the canvas.
     */
    public static getSubCanvas(canvas: HTMLCanvasElement, dest: Rectangle): HTMLCanvasElement {
        const width: number = dest.getWidth();
        const height: number = dest.getHeight();
        return this.create(width, height, ctx => {
            const topLeft: Vector2D = dest.getTopLeft();
            ctx.drawImage(canvas, topLeft.x, topLeft.y, width, height, 0, 0, width, height);
        });
    }

    /**
     * @param image The image to transform into a canvas.
     * @return A canvas version of the given image.
     */
    public static imageToCanvas(image: HTMLImageElement): HTMLCanvasElement {
        return CanvasUtils.create(image.width, image.height, ctx => {
            ctx.drawImage(image, 0, 0);
        });
    }

    /**
     * Splits a canvas into equal parts.
     * @param canvas The canvas to split.
     * @param columns The number of columns to split into.
     * @param rows The number of rows to split into.
     */
    public static split(canvas: HTMLCanvasElement, columns: number, rows: number): HTMLCanvasElement[] {
        const canvases: HTMLCanvasElement[] = [];
        const size: Vector2D = new Vector2D(Math.floor(canvas.width / columns), Math.floor(canvas.height / rows));
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < columns; x++) {
                const dest: Rectangle = new Rectangle(new Vector2D(x * size.x, y * size.y), size);
                canvases.push(CanvasUtils.getSubCanvas(canvas, dest));
            }
        }
        return canvases;
    }

}