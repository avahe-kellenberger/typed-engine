import { Vector2D } from '../math/Vector2D'

export class AnimationFrame {
  public readonly location: Vector2D
  public readonly duration: number

  constructor(location: Vector2D, duration: number) {
    this.location = location
    this.duration = duration
  }
}
