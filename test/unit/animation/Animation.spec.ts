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
      let index: number = 0
      let currentTime: number = 0
      for (let i = 0; i < frames.length; i++) {
        index = animation.getFrameDataPreceedingTime(currentTime).index
        expect(index).toEqual(i)
        currentTime += frames[i].duration - 0.1
        expect(index).toEqual(i)
        currentTime += 0.1
      }

      // Special case where time exceeds the duration, and wraps around to the first frame.
      currentTime = animation.duration
      index = animation.getFrameDataPreceedingTime(currentTime).index
      expect(index).toEqual(0)
    })

    function testFrameInterpolationAtTime(interpolationTime: number) {
      const interpolatedFrame: AnimationFrame = animation.getInterpolatedFrameAtTime(interpolationTime)

      const firstFrameData: FrameData = animation.getFrameDataPreceedingTime(interpolationTime)
      const firstFrameDuration: number = firstFrameData.frame.duration
      const firstFrameLoc: Vector2D = firstFrameData.frame.location

      const lastFrame: AnimationFrame = firstFrameData.index == frames.length - 1 ? frames[0] : frames[firstFrameData.index + 1]
      const lastFrameLoc: Vector2D = lastFrame.location
      const distance: Vector2D = lastFrameLoc.subtract(firstFrameLoc)

      const interpolationRatio: number = (interpolationTime - firstFrameData.startTime) / firstFrameDuration
      const expectedInterpolatedLocation: Vector2D = firstFrameLoc.add(distance.scale(interpolationRatio))
      const interpolatedTime: number = firstFrameDuration - firstFrameDuration * interpolationRatio
      const expectedFrame: AnimationFrame = new AnimationFrame(expectedInterpolatedLocation, interpolatedTime)
      expect(interpolatedFrame).toEqual(expectedFrame)
    }

    it(`Correctly interpolates frame properties between multiple frames`, () => {
      const interpolationTime = frames[0].duration + frames[1].duration / 2
      testFrameInterpolationAtTime(interpolationTime)
    })

    it(`Correctly interpolates frame properties between the last and first frames`, () => {
      const interpolationTime = frames[0].duration + frames[1].duration + frames[2].duration / 2
      testFrameInterpolationAtTime(interpolationTime)
    })
  })
})
