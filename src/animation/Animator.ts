import { Updatable } from '../entity/Updatable';
import { Animation, AnimationFrame } from './Animation';

export class Animator implements Updatable {

    private readonly animationMap: Map<string, Animation>;
    private currentAnimation: Animation|undefined;
    private elapsedSeconds: number;

    constructor() {
        this.animationMap = new Map();
        this.elapsedSeconds = 0;
    }

    /**
     * @return The current animation being played.
     */
    public getCurrentAnimation(): Animation|undefined {
        return this.currentAnimation;
    }

    /**
     * Sets the current animation to be played, starting from 0 seconds elapsed.
     * @param id The animation's ID.
     * @return If the animation wasn't already playing.
     */
    public setCurrentAnimation(id: string): boolean {
        const anim: Animation|undefined = this.animationMap.get(id);
        if (anim === undefined) {
            throw new Error(`Unknown animation id \"${id}\"`);
        }
        if (anim === this.currentAnimation) {
            return false;
        }
        this.currentAnimation = anim;
        this.elapsedSeconds = 0;
        return true;
    }

    /**
     * @return The current animation frame.
     */
    public getCurrentFrame(): AnimationFrame|undefined {
        if (this.currentAnimation === undefined) {
            return undefined;
        }
        return this.currentAnimation.getFrameAtTime(this.elapsedSeconds);
    }

    // #region Mapping

    /**
     * @param id The animation's ID.
     * @return The animation associated with the given ID.
     */
    public getAnimation(id: string): Animation|undefined {
        return this.animationMap.get(id);
    }

    /**
     * @param id The animation's ID.
     * @return If the animator contains an animation associated with the given ID.
     */
    public hasAnimation(id: string): boolean {
        return this.animationMap.has(id);
    }

    /**
     * Assigns the ID to the given animation.
     * If this is the only animation, it will automatically be set as the current animation.
     * @see Animator.setCurrentAnimation
     * @param id The ID of the animation.
     * @param animation The animation to set.
     */
    public setAnimation(id: string, animation: Animation): void {
        this.animationMap.set(id, animation);
        if (this.animationMap.size === 1) {
            this.currentAnimation = animation;
        }
    }

    // #endregion

    /**
     * @override
     */
    public update(deltaTime: number): void {
        this.updateAnimationTime(deltaTime);
    }

    /**
     * Updates the elapsed time since the animation began.
     * @param deltaTime The time elapsed since the last game update.
     */
    private updateAnimationTime(deltaTime: number): void {
        if (this.currentAnimation === undefined) {
            return;
        }
        this.elapsedSeconds += deltaTime;
        this.elapsedSeconds %= this.currentAnimation.getDuration();
    }

}