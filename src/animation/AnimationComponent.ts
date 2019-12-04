import { AnimationFrame } from './AnimationFrame'

/**
 * An AnimationComponent is a piece of an Animation,
 * such as an animated leg on an animated character.
 */
export class AnimationComponent {

  private readonly frames: AnimationFrame[]
  private readonly frameStartTimes: number[]
  public readonly duration: number

  /**
   * @param {AnimationFrame[]} frames - The frames of the animation to be displayed.
   */
  constructor(frames: AnimationFrame[]) {
    this.frames = []
    this.frameStartTimes = []

    let startTime: number = 0
    frames.forEach((frame: AnimationFrame) => {
      this.frames.push(frame)
      this.frameStartTimes.push(startTime)
      startTime += frame.duration
    })
    this.duration = startTime
  }

  public getFrameStartTimeByIndex(frameIndex: number): number {
    return this.frameStartTimes[frameIndex]
  }

  /**
   * @return {number} The start time of the given frame, or -1 if the frame isn't part of this component.
   */
  public getFrameStartTime(frame: AnimationFrame): number {
    for (let i = 0; i < this.frames.length; i++) {
      if (frame === this.frames[i]) {
        return this.frameStartTimes[i]
      }
    }
    return -1
  }

  /**
   * @param {number} seconds - The number of seconds elapsed since the animation began.
   * @return {AnimationFrame} A frame interpolated between the two frames which lie on either side of the given time.
   */
  public getInterpolatedFrameAtTime(seconds: number): AnimationFrame {
    const currentFrameIndex: number = this.getFrameIndexPreceedingTime(seconds)
    const currentFrame: AnimationFrame = this.frames[currentFrameIndex]
    const nextFrameIndex: number = this.getNextFrameIndex(currentFrameIndex)
    const nextFrame: AnimationFrame = this.frames[nextFrameIndex]
    // Get the next frame in the animation, which can wrap from the last frame to the first.
    const timeSinceFrameStart: number = seconds - this.frameStartTimes[currentFrameIndex]
    return AnimationFrame.interpolate(currentFrame, nextFrame, timeSinceFrameStart)
  }

  private getNextFrameIndex(currentFrameIndex: number): number {
    return (currentFrameIndex + 1) % this.frames.length
  }

  public getFramesSurroundingTime(seconds: number): AnimationFrame[] {
    const firstFrameIndex: number = this.getFrameIndexPreceedingTime(seconds)
    const secondFrameIndex: number = (firstFrameIndex + 1) % this.frames.length
    return [this.frames[firstFrameIndex], this.frames[secondFrameIndex]]
  }

  public getFrameIndexPreceedingTime(seconds: number): number {
    // Wrap the time around to the beginning of the animation.
    seconds %= this.duration
    for (let i = 0; i < this.frames.length; i++) {
      const frame: AnimationFrame = this.frames[i]
      const startTime: number = this.frameStartTimes[i]
      if (startTime <= seconds && startTime + frame.duration > seconds) {
        return i
      }
    }
    throw new Error('Error calculating frame based on time - please report this bug to the developers.')
  }
}
