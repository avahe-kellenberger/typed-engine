import { Vector2D } from '../../../src/math/Vector2D'
import { AnimationFrame } from '../../../src/animation/AnimationFrame'
import { Animation, FrameData } from '../../../src/animation/Animation'

describe(`getFrameAtTime`, () => {
  describe(`An animation with multiple frames`, () => {
    // Frame durations are the length of time before the next frame begins.
    // Interpolation occurs during an entire frame's duration until the next frame has started.

    const frames: AnimationFrame[] = [
      new AnimationFrame(new Vector2D(10, 10), 1.2),
      new AnimationFrame(new Vector2D(40, 66), 3.4),
      new AnimationFrame(new Vector2D(200, 848), 2.5)
    ]

    let animationDuration: number = 0
    frames.forEach(frame => (animationDuration += frame.duration))

    const animation: Animation = new Animation(frames)

    it(`Finds the correct preceeding frame based on time`, () => {
      let index: number = animation.getFrameDataPreceedingTime(0).index
      expect(index).toEqual(0)

      index = animation.getFrameDataPreceedingTime(frames[0].duration - 0.1).index
      expect(index).toEqual(0)

      index = animation.getFrameDataPreceedingTime(frames[0].duration).index
      expect(index).toEqual(1)

      index = animation.getFrameDataPreceedingTime(frames[0].duration + frames[1].duration - 0.1).index
      expect(index).toEqual(1)

      index = animation.getFrameDataPreceedingTime(frames[0].duration + frames[1].duration).index
      expect(index).toEqual(2)

      // TODO: Add cases for wrapping (last frame of animation wrapping to first frame of animation).
    })

    it(`Correctly interpolates frame properties between multiple frames`, () => {
      const interpolationTime = frames[0].duration + frames[1].duration / 2
      const interpolatedFrame: AnimationFrame = animation.getInterpolatedFrameAtTime(interpolationTime)

      const firstFrameData: FrameData = animation.getFrameDataPreceedingTime(interpolationTime)
      const firstFrameDuration: number = firstFrameData.frame.duration
      const firstFrameLoc: Vector2D = firstFrameData.frame.location

      // TODO: Will need to change this line for frame wrapping.
      const lastFrame: AnimationFrame = frames[firstFrameData.index + 1]
      const lastFrameLoc: Vector2D = lastFrame.location
      const distance: Vector2D = lastFrameLoc.subtract(firstFrameLoc)

      const interpolationRatio: number = (interpolationTime - firstFrameData.startTime) / firstFrameDuration
      const expectedInterpolatedLocation: Vector2D = firstFrameLoc.add(distance.scale(interpolationRatio))
      expect(interpolatedFrame.location).toEqual(expectedInterpolatedLocation)

      const interpolatedTime: number = firstFrameDuration - firstFrameDuration * interpolationRatio
      expect(interpolatedTime).toEqual(interpolatedFrame.duration)
    })
  })
})
