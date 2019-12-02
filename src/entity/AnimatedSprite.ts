import { Animation, AnimationFrame } from '../animation/Animation'
import { Animator } from '../animation/Animator'
import { Camera } from '../scene/Camera'
import { GameObject } from './GameObject'

/**
 * An animated object.
 */
export class AnimatedSprite<AnimationID extends string> extends GameObject {

    private readonly animator: Animator<AnimationID>;

    /**
     * @param animationIDMap The animations of the sprite mapped to their respective IDs.
     */
    constructor(animationIDMap: ReadonlyMap<AnimationID, Animation>) {
      super()
      this.animator = new Animator(animationIDMap)
    }

    /**
     * Sets the animation's ID.
     * @param id The ID of the animation.
     */
    public setCurrentAnimation(id: AnimationID): void {
      this.animator.setCurrentAnimation(id)
    }

    /**
     * @override
     */
    public update(deltaTime: number): void {
      super.update(deltaTime)
      this.animator.update(deltaTime)
    }

    /**
     * @override
     */
    public render(ctx: CanvasRenderingContext2D, camera: Camera): void {
      super.render(ctx, camera, () => {
        const frame: AnimationFrame|undefined = this.animator.getCurrentFrame()
        if (frame !== undefined) {
          const offsetX: number = frame.canvas.width - 0.5
          const offsetY: number = frame.canvas.height - 0.5
          ctx.drawImage(frame.canvas, offsetX, offsetY)
        }
      })
    }

}