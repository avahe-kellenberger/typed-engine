/**
 * Animations use HTMLCanvasElements to render loaded images.
 * This allows for higher flexibility when dealing with image data.
 */
export class Animation {

    private readonly frames: AnimationFrame[];
    private readonly animationDuration: number;

    /**
     * @param frames The frames of the animation to be displayed.
     */
    constructor(frames: AnimationFrame[]) {
        this.frames = frames;
        let collectiveDuration: number = 0;
        this.frames.forEach(frame => collectiveDuration += frame.duration);
        this.animationDuration = collectiveDuration;
    }

    /**
     * @param index The index of the frame to retreive.
     * @return The frame at the given index.
     */
    public getFrameAtIndex(index: number): AnimationFrame {
        return this.frames[index];
    }

    /**
     * @param seconds The number of seconds elapsed since the animation began.
     * @return The frame to be displayed at the elapsed time since the animation began.
     */
    public getFrameAtTime(seconds: number): AnimationFrame {
        const timeSinceFirstFrame: number = seconds % this.animationDuration;
        let elapsed: number = 0;
        for (let i = 0; i < this.frames.length; i++) {
            const currentFrame: AnimationFrame = this.frames[i];
            elapsed += this.frames[i].duration;
            if (elapsed >= timeSinceFirstFrame) {
                return currentFrame;
            }
        }
        throw new Error(`Given time "${seconds}" is invalid.`);
    }

    /**
     * @return The number of frames in the animation.
     */
    public getFrameCount(): number {
        return this.frames.length;
    }

    /**
     * @return The duration of the animation in seconds.
     */
    public getDuration(): number {
        return this.animationDuration;
    }

    // #region Static Methods

    /**
     * Creates an animation in the order of the given canvases,
     * using the same duration for each AnimationFrame.
     *  
     * @param canvases The ordered canvases for the frames to create.
     * @param frameDuration The duration of each frame.
     */
    public static create(canvases: HTMLCanvasElement[], frameDuration: number = 1.0): Animation {
        const frames: AnimationFrame[] = [];
        canvases.forEach(canvas => {
            frames.push({
                canvas: canvas,
                duration: frameDuration
            });
        });
        return new Animation(frames);
    }

    // #endregion

}

/**
 * A single frame in an animation.
 */
export interface AnimationFrame {
    /**
     * The canvas to be rendered.
     */
    readonly canvas: HTMLCanvasElement,
    /**
     * The duration in seconds the frame should be displayed.
     */
    readonly duration: number
}