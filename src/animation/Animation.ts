import { AnimationFrame } from './AnimationFrame'

/**
 * Animations use HTMLCanvasElements to render loaded images.
 * This allows for higher flexibility when dealing with image data.
 */
export class Animation {
  private readonly frames: AnimationFrame[]

  /**
   * @param frames The frames of the animation to be displayed.
   */
  constructor(frames: AnimationFrame[]) {
    this.frames = frames
  }

  /**
   * @param seconds The number of seconds elapsed since the animation began.
   * @return The frame to be displayed at the elapsed time since the animation began.
   */
  public getFrameAtTime(seconds: number): AnimationFrame {
    let duration: number = 0
    for (const frame of this.frames) {
    }
    return this.frames[0]
  }

  public findDurationAt(seconds: number): AnimationFrame {
    return this.frames[0]
  }
}

