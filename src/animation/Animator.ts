import { Updatable } from '../entity/Updatable'
import { Animation, AnimationFrame } from './Animation'

export class Animator<AnimationID extends string> implements Updatable {

    private readonly animationIDMap: ReadonlyMap<AnimationID, Animation>;
    private currentAnimation: Animation;
    private elapsedSeconds: number;

    /**
     * @param animationIDMap The animations of the sprite mapped to their respective IDs.
     * The first animation in the map will be assigned as the current animation.
     * @see Animator.getCurrentAnimation
     */
    constructor(animationIDMap: ReadonlyMap<AnimationID, Animation>) {
      this.animationIDMap = animationIDMap
      this.currentAnimation = animationIDMap.values().next().value
      this.elapsedSeconds = 0
    }

    /**
     * @return The current animation being played.
     */
    public getCurrentAnimation(): Animation|undefined {
      return this.currentAnimation
    }

    /**
     * Sets the current animation to be played, starting from 0 seconds elapsed.
     * @param id The animation's ID.
     * @return If the animation wasn't already playing.
     */
    public setCurrentAnimation(id: AnimationID): boolean {
      const anim: Animation|undefined = this.animationIDMap.get(id)
      if (anim === undefined) {
        throw new Error(`Unknown animation id "${id}"`)
      }
      if (anim === this.currentAnimation) {
        return false
      }
      this.currentAnimation = anim
      this.elapsedSeconds = 0
      return true
    }

    /**
     * @return The current animation frame.
     */
    public getCurrentFrame(): AnimationFrame|undefined {
      if (this.currentAnimation === undefined) {
        return undefined
      }
      return this.currentAnimation.getFrameAtTime(this.elapsedSeconds)
    }

    // #region Mapping

    /**
     * @param id The animation's ID.
     * @return The animation associated with the given ID.
     */
    public getAnimation(id: AnimationID): Animation|undefined {
      return this.animationIDMap.get(id)
    }

    /**
     * @param id The animation's ID.
     * @return If the animator contains an animation associated with the given ID.
     */
    public hasAnimation(id: AnimationID): boolean {
      return this.animationIDMap.has(id)
    }

    // #endregion

    /**
     * @override
     */
    public update(deltaTime: number): void {
      this.updateAnimationTime(deltaTime)
    }

    /**
     * Updates the elapsed time since the animation began.
     * @param deltaTime The time elapsed since the last game update.
     */
    private updateAnimationTime(deltaTime: number): void {
      if (this.currentAnimation === undefined) {
        return
      }
      this.elapsedSeconds += deltaTime
      this.elapsedSeconds %= this.currentAnimation.getDuration()
    }

}
