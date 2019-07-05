import { Vector2D } from '../../../src/math/Vector2D'
import { AnimationFrame } from '../../../src/animation/AnimationFrame'
import { Animation } from '../../../src/animation/Animation'

describe(`getFrameAtTime`, () => {
  describe(`An animation with multiple frames`, () => {
    const frameDuration: number = 1.2

    it(`Correctly interpolates location between two frames`, () => {
      // Frame durations are the length of time before the next frame begins.
      // Interpolation occurs during an entire frame's duration until the next frame has started.
      const startLocation: Vector2D = new Vector2D(10, 10)
      const frame1 = new AnimationFrame(startLocation, frameDuration)

      const endLocation: Vector2D = new Vector2D(80, 80)
      // The ending frame as no duration (last frame)
      const frame2 = new AnimationFrame(endLocation, 0)

      const animation: Animation = new Animation([frame1, frame2])

      const interpolationRatio: number = 0.4
      const interpolationTime = frameDuration * interpolationRatio
      const interpolatedFrame: AnimationFrame = animation.getInterpolatedFrameAtTime(
        interpolationTime
      )
      const distance: Vector2D = endLocation.subtract(startLocation)
      const expectedInterpolatedLocation: Vector2D = startLocation.add(
        distance.scale(interpolationRatio)
      )
      expect(interpolatedFrame.location).toEqual(expectedInterpolatedLocation)
    })
  })
})
