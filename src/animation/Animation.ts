import { AnimationFrame } from './AnimationFrame'

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
    const currentFrameData = this.getFrameDataAtTime(seconds)
    const currentFrame = currentFrameData.frame
    // If this is the last frame, no interpolation can be done.
    if (currentFrameData.index + 1 === this.frameData.length) {
      return currentFrame
    }

    const nextFrame = this.frameData[currentFrameData.index + 1].frame
    const timeSinceStartFrame: number = seconds - currentFrameData.startTime
    return currentFrame.interpolateTo(nextFrame, timeSinceStartFrame)
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
