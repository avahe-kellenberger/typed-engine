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
   * @param frames The frames of the animation to be displayed.
   */
  constructor(frames: AnimationFrame[]) {
    this.frames = frames
    this.frameStartTimes = []

    let startTime: number = 0
    frames.forEach((frame, index) => {
      this.frameStartTimes[index] = startTime
      startTime += frame.duration
    })
    this.duration = startTime
  }

  /**
   * @param seconds The number of seconds elapsed since the animation began.
   * @return A frame interpolated between the two frames which lie on either side of the given time.
   */
  public getInterpolatedFrameAtTime(seconds: number): AnimationFrame {
    const currentFrameIndex: number = this.getFrameIndexPreceedingTime(seconds)
    const currentFrame = this.frames[currentFrameIndex]
    const nextFrame = this.frames[(currentFrameIndex + 1) % this.frames.length]
    // Get the next frame in the animation, which can wrap from the last frame to the first.
    const timeSinceFrameStart: number = seconds - this.frameStartTimes[currentFrameIndex]
    return currentFrame.interpolateTo(nextFrame, timeSinceFrameStart)
  }

  public getFrame(index: number): AnimationFrame {
    return this.frames[index]
  }

  public getFramesSurroundingTime(seconds: number): AnimationFrame[] {
    const firstFrameIndex: number = this.getFrameIndexPreceedingTime(seconds)
    const secondFrameIndex: number = (firstFrameIndex + 1) % this.frames.length
    return [this.frames[firstFrameIndex], this.frames[secondFrameIndex]]
  }

  public getFramePreceedingTime(seconds: number): AnimationFrame {
    return this.getFrame(this.getFrameIndexPreceedingTime(seconds))
  }

  public getFrameStartTime(frameIndex: number): number {
    return this.frameStartTimes[frameIndex]
  }

  public getFrameIndexPreceedingTime(seconds: number): number {
    // Wrap the time around to the beginning of the animation.
    seconds %= this.duration
    for (let i = 0; i < this.frames.length; i++) {
      const frame = this.frames[i]
      const startTime: number = this.frameStartTimes[i]
      if (startTime <= seconds && startTime + frame.duration > seconds) {
        return i
      }
    }
    throw new Error('Error calculating frame based on time - please report this bug to the developers.')
  }
}
