import { Animation } from '../animation/Animation';
import { Camera } from '../scene/Camera';
import { GameObject } from './GameObject';
import { Vector2D } from '../math/Vector2D';

export class Sprite extends GameObject {

    private readonly animation: Animation;
    private runningTime: number;

    /**
     * @param canvas The single canvas of the sprite.
     */
    constructor(canvas: HTMLCanvasElement, location?: Vector2D);

    /*
     * @param animation The sprite's animation.
     */
    constructor(animation: Animation, location?: Vector2D);

    /**
     * Overload constructor.
     */
    constructor(animOrCanvas: Animation|HTMLCanvasElement, location?: Vector2D) {
        super(location);
        if (animOrCanvas instanceof Animation) {
            this.animation = animOrCanvas;
        } else {
            this.animation = new Animation(animOrCanvas);
        }
        this.runningTime = 0;
    }

    /**
     * @return The animation of the sprite.
     */
    public getAnimation(): Animation {
        return this.animation;
    }

    /**
     * @override
     */
    public update(elapsedTime: number): void {
        super.update(elapsedTime);
        this.runningTime += elapsedTime;
        this.runningTime %= this.animation.getDuration();
    }

    /**
     * @override
     */
    public render(ctx: CanvasRenderingContext2D, camera: Camera): void {
        super.render(ctx, camera, () => {
            const frame: HTMLCanvasElement = this.animation.getFrameAtTime(this.runningTime).canvas;
            const offsetX: number = frame.width * -0.5;
            const offsetY: number = frame.height * -0.5;
            ctx.drawImage(frame, offsetX, offsetY);
        });
    }
}
