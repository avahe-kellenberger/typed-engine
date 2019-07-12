import { Animation } from '../../../src/animation/Animation'
import { AnimationComponent } from '../../../src/animation/AnimationComponent'
import { AnimationFrame } from '../../../src/animation/AnimationFrame'
import { Vector2D } from '../../../src/math/Vector2D'

describe('Animation', () => {
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
  const animationComponents: AnimationComponent[] = [new AnimationComponent(frames)]
  const animationJson: string = JSON.stringify(animationComponents)

  it('is created with the correct data when loading an animation file', () => {
    const anim: Animation = Animation.load(animationJson)
    expect(Array.isArray(anim.components)).toBeTruthy()
    expect(anim.components[0]).toEqual(animationComponents[0])
  })
})
