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
 * An AnimationComponent is a piece of an Animation,
 * such as an animated leg on an animated character.
 */
export class AnimationComponent {
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
    const nextFrame = this.getNextFrameData(currentFrameData.index).frame
    const timeSinceFrameStart: number = seconds - currentFrameData.startTime
    return currentFrame.interpolateTo(nextFrame, timeSinceFrameStart)
  }

  private getNextFrameData(index: number): FrameData {
    return index == this.frameData.length - 1 ? this.frameData[0] : this.frameData[index + 1]
  }

  public getFrameDataPreceedingTime(seconds: number): FrameData {
    // Wrap the time around to the beginning of the animation.
    seconds %= this.duration
    // `find` could return undefined, but we ensure it doesn't by wrapping the time.
    // This is the reason for the exclamation mark (this is thoroughly tested).
    return this.frameData.find(data => {
      return data.startTime <= seconds && data.startTime + data.frame.duration > seconds
    })!
  }
}
