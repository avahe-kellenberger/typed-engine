import { Vector2D } from '../math/Vector2D'

export class AnimationFrame {
  public readonly location: Vector2D
  public readonly duration: number

  constructor(location: Vector2D, duration: number) {
    this.location = location
    this.duration = duration
  }

  public static interpolateTo(
    startFrame: AnimationFrame,
    endFrame: AnimationFrame,
    timeSinceFrameStart: number
  ): AnimationFrame {
    const interpolationRatio: number = timeSinceFrameStart / startFrame.duration
    const distance: Vector2D = endFrame.location.subtract(startFrame.location)
    const interpolatedLocation: Vector2D = startFrame.location.add(distance.scale(interpolationRatio))
    return new AnimationFrame(interpolatedLocation, startFrame.duration - timeSinceFrameStart)
  }
}
