import { AnimationFrame } from './AnimationFrame'
import { Vector2D } from '../math/Vector2D'

export interface FrameData {
  index: number
  frame: AnimationFrame
  startTime: number
}

/**
 * Animations use HTMLCanvasElements to render loaded images.
 * This allows for higher flexibility when dealing with image data.
 */
export class Animation {
  // AnimationFrame, startTime
  private readonly frameData: FrameData[]

  /**
   * @param frames The frames of the animation to be displayed.
   */
  constructor(frames: AnimationFrame[]) {
    this.frameData = []

    let startTime: number = 0
    frames.forEach((frame, index) => {
      this.frameData[index] = { index, frame, startTime }
      startTime += frame.duration
    })
  }

  /**
   * @param seconds The number of seconds elapsed since the animation began.
   * @return TODO:
   */
  public getInterpolatedFrameAtTime(seconds: number): AnimationFrame {
    const startFrameData = this.getFrameDataAtTime(seconds)
    // TODO: Can break if last frame - but last frame should be ending (no duration).
    const endFrameData = this.frameData[startFrameData.index + 1]

    const startFrame = startFrameData.frame
    const endFrame = endFrameData.frame

    const timeSinceStartFrame: number = seconds - startFrameData.startTime
    const interpolationRatio: number = timeSinceStartFrame / startFrame.duration

    // Interpolate number data types.
    const interpolatedLocation: Vector2D = endFrame.location
      .add(startFrame.location)
      .scale(interpolationRatio)

    return new AnimationFrame(interpolatedLocation, startFrame.duration - timeSinceStartFrame)
  }

  private getFrameDataAtTime(seconds: number): FrameData {
    for (let i = 0; i < this.frameData.length; i++) {
      if (seconds >= this.frameData[i].startTime) {
        return this.frameData[i]
      }
    }
    throw new Error("Given time does not lie within the animation's duration.")
  }
}
