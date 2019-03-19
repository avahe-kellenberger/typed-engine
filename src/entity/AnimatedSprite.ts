import { Animation, AnimationFrame } from '../animation/Animation';
import { Animator } from '../animation/Animator';
import { Camera } from '../scene/Camera';
import { GameObject } from './GameObject';

/**
 * An animated object.
 */
export class AnimatedSprite extends GameObject {

    private readonly animator: Animator;

    /**
     * @param animationID The ID of the animation.
     * @param animation The animation to use.
     */
    constructor(animationID: string, animation: Animation);

    /**
     * 
     * @param animations The animations of the sprite paired with their respective IDs.
     */
    constructor(animations: [string, Animation][]);

    /**
     * Overload Constructor.
     */
    constructor(animationsOrAnimationID: string|[string, Animation][], animation?: Animation) {
        super();
        this.animator = new Animator();
        if (animationsOrAnimationID instanceof Array) {
            animationsOrAnimationID.forEach(entry => this.animator.setAnimation(entry[0], entry[1]));
        } else if (animation !== undefined) {
            this.animator.setAnimation(animationsOrAnimationID, animation);
        } else {
            throw new Error(`animation must be defined.`);
        }
        
    }

    /**
     * Sets the animation's ID.
     * @param id The ID of the animation.
     */
    public setCurrentAnimation(id: string): void {
        this.animator.setCurrentAnimation(id);
    }

    /**
     * @override
     */
    public update(deltaTime: number): void {
        super.update(deltaTime);
        this.animator.update(deltaTime);
    }

    /**
     * @override
     */
    public render(ctx: CanvasRenderingContext2D, camera: Camera): void {
        super.render(ctx, camera, () => {
            const frame: AnimationFrame|undefined = this.animator.getCurrentFrame();
            if (frame !== undefined) {
                const offsetX: number = frame.canvas.width - 0.5;
                const offsetY: number = frame.canvas.height - 0.5;
                ctx.drawImage(frame.canvas, offsetX, offsetY);
            }
        });
    }

}