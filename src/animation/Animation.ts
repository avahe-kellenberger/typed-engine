import { AnimationFrame } from './AnimationFrame'

/**
 * The AnimationFrame and relative metadata.
 */
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
  private readonly frameData: FrameData[]
  public readonly duration: number

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
    this.duration = startTime
  }

  /**
   * @param seconds The number of seconds elapsed since the animation began.
   * @return A frame interpolated between the two frames which lie on either side of the given time.
   */
  public getInterpolatedFrameAtTime(seconds: number): AnimationFrame {
    const currentFrameData = this.getFrameDataPreceedingTime(seconds)
    const currentFrame = currentFrameData.frame

    // Get the next frame in the animation, which can wrap from the last frame to the first.
    const nextFrame = (currentFrameData.index + 1 == this.frameData.length ? this.frameData[0] : this.frameData[currentFrameData.index + 1]).frame
    const timeSinceFrameStart: number = seconds - currentFrameData.startTime
    return AnimationFrame.interpolateTo(currentFrame, nextFrame, timeSinceFrameStart)
  }

  public getFrameDataPreceedingTime(seconds: number): FrameData {
    seconds %= this.duration
    return this.frameData.find(data => {
      return data.startTime <= seconds && data.startTime + data.frame.duration > seconds
    })!
  }
}
