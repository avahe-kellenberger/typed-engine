import { Vector2D } from '../math/Vector2D'

export interface AnimationFrame {
  location: Vector2D;
  duration: number;
}

export class AnimationFrame {
  public static interpolate(startFrame: AnimationFrame, endFrame: AnimationFrame, timeSinceStartFrameBegan: number): AnimationFrame {
    const interpolationRatio: number = timeSinceStartFrameBegan / startFrame.duration
    const distance: Vector2D = endFrame.location.subtract(startFrame.location)
    const interpolatedLocation: Vector2D = startFrame.location.add(distance.scale(interpolationRatio))
    return {
      location: interpolatedLocation,
      duration: startFrame.duration - timeSinceStartFrameBegan
    }
  }
}
