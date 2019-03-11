export class Animation {

    private readonly frames: AnimationFrame[];
    private readonly animationDuration: number;

    /**
     * Constructs a single-image animation.
     * @param image The image of the animation.
     */
    constructor(image: HTMLImageElement);

    /**
     * @param frames The frames of the animation to be displayed.
     */
    constructor(frames: AnimationFrame[]);

    /**
     * Overload constructor.
     */
    constructor(imageOrFrames: HTMLImageElement|AnimationFrame[]) {
        if (imageOrFrames instanceof HTMLImageElement) {
            const singleFrame: AnimationFrame = {
                image: imageOrFrames,
                duration: 1.0
            };
            this.frames = [singleFrame];
        } else {
            this.frames = imageOrFrames;
        }
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
     * Creates an animation in the order of the given images,
     * using the same duration for each AnimationFrame.
     *  
     * @param images The ordered images for the frames to create.
     * @param frameDuration The duration of each frame.
     */
    public static createAnimation(images: HTMLImageElement[], frameDuration: number): Animation {
        const frames: AnimationFrame[] = [];
        images.forEach(image => {
            frames.push({
                image: image,
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
     * The image to be rendered.
     */
    readonly image: HTMLImageElement,
    /**
     * The duration in seconds the frame should be displayed.
     */
    readonly duration: number
}