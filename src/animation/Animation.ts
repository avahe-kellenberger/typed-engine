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
   * @return A frame interpolated between the two frames which lie on either side of the given time.
   */
  public getInterpolatedFrameAtTime(seconds: number): AnimationFrame {
    const currentFrameData = this.getFrameDataPreceedingTime(seconds)
    const currentFrame = currentFrameData.frame
    // If this is the last frame, no interpolation can be done.
    // TODO: Change when implementing frame wrapping (details in test suite).
    if (currentFrameData.index + 1 === this.frameData.length) {
      return currentFrame
    }

    const nextFrame = this.frameData[currentFrameData.index + 1].frame
    const timeSinceFrameStart: number = seconds - currentFrameData.startTime
    return AnimationFrame.interpolateTo(currentFrame, nextFrame, timeSinceFrameStart)
  }

  public getFrameDataPreceedingTime(seconds: number): FrameData {
    const data: FrameData | undefined = this.frameData.find(data => {
      return data.startTime <= seconds && data.startTime + data.frame.duration > seconds
    })
    if (data === undefined) {
      // TODO: Change when implementing frame wrapping (details in test suite).
      throw new Error("Given time does not lie within the animation's duration.")
    }
    return data
  }
}
