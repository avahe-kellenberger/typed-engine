import { Vector2D } from '../math/Vector2D'

export class AnimationFrame {
  public readonly location: Vector2D
  public readonly duration: number

  constructor(location: Vector2D, duration: number) {
    this.location = location
    this.duration = duration
  }

  public interpolateTo(nextFrame: AnimationFrame, timeSinceFrameStart: number) {
    const interpolationRatio: number = timeSinceFrameStart / this.duration
    const distance: Vector2D = nextFrame.location.subtract(this.location)
    const interpolatedLocation: Vector2D = this.location.add(distance.scale(interpolationRatio))
    return new AnimationFrame(interpolatedLocation, this.duration - timeSinceFrameStart)
  }
}
