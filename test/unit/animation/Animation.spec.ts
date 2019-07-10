import { Vector2D } from '../../../src/math/Vector2D'
import { AnimationFrame } from '../../../src/animation/AnimationFrame'
import { AnimationComponent } from '../../../src/animation/AnimationComponent'

describe(`AnimationComponent`, () => {
  describe(`getFrameAtTime`, () => {
    describe(`An animation with multiple frames`, () => {
      // Frame durations are the length of time before the next frame begins.
      // Interpolation occurs during an entire frame's duration until the next frame has started.

      const frames: AnimationFrame[] = [
        {
          location: new Vector2D(10, 10),
          duration: 1.2
        },
        {
          location: new Vector2D(40, 66),
          duration: 3.4
        },
        {
          location: new Vector2D(200, 848),
          duration: 2.5
        }
      ]

      let animationDuration: number = 0
      frames.forEach(frame => (animationDuration += frame.duration))

      const animationComponent: AnimationComponent = new AnimationComponent(frames)

      it(`Finds the correct preceeding frame based on time`, () => {
        let index: number = 0
        let currentTime: number = 0
        for (let i = 0; i < frames.length; i++) {
          index = animationComponent.getFrameIndexPreceedingTime(currentTime)
          expect(index).toEqual(i)
          currentTime += frames[i].duration - 0.1
          expect(index).toEqual(i)
          currentTime += 0.1
        }

        // Special case where time exceeds the duration, and wraps around to the first frame.
        currentTime = animationComponent.duration
        index = animationComponent.getFrameIndexPreceedingTime(currentTime)
        expect(index).toEqual(0)
      })

      function testFrameInterpolationAtTime(interpolationTime: number) {
        const interpolatedFrame: AnimationFrame = animationComponent.getInterpolatedFrameAtTime(interpolationTime)

        const [firstFrame, lastFrame]: AnimationFrame[] = animationComponent.getFramesSurroundingTime(interpolationTime)
        const firstFrameDuration: number = firstFrame.duration
        const firstFrameLoc: Vector2D = firstFrame.location
        const lastFrameLoc: Vector2D = lastFrame.location
        const distance: Vector2D = lastFrameLoc.subtract(firstFrameLoc)

        const firstFrameStartTime: number = animationComponent.getFrameStartTime(firstFrame)
        const interpolationRatio: number = (interpolationTime - firstFrameStartTime) / firstFrameDuration
        const expectedInterpolatedLocation: Vector2D = firstFrameLoc.add(distance.scale(interpolationRatio))
        const interpolatedTime: number = firstFrameDuration - firstFrameDuration * interpolationRatio
        const expectedFrame: AnimationFrame = {
          location: expectedInterpolatedLocation,
          duration: interpolatedTime
        }
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
})
