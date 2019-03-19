import { Vector2D } from '../math/Vector2D';
import { Camera } from '../scene/Camera';
import { GameObject } from './GameObject';

export class Sprite extends GameObject {

    private readonly canvas: HTMLCanvasElement;

    /**
     * @param canvas The single canvas of the sprite.
     */
    constructor(canvas: HTMLCanvasElement, location?: Vector2D) {
        super(location);
        this.canvas = canvas;
    }

    /**
     * @return The sprite's canvas.
     */
    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    /**
     * @override
     */
    public render(ctx: CanvasRenderingContext2D, camera: Camera): void {
        super.render(ctx, camera, () => {
            const offsetX: number = this.canvas.width * -0.5;
            const offsetY: number = this.canvas.height * -0.5;
            ctx.drawImage(this.canvas, offsetX, offsetY);
        });
    }
}
