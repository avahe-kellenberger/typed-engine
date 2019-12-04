import { AnimationComponent } from './AnimationComponent'

export class Animation {

  public readonly components: readonly AnimationComponent[]

  /**
   * Creates a new animation using the given components.
   * Note that this object will use the array directly.
   *
   * @param {readonly AnimationComponent[]} animationComponents - The components of the animation.
   */
  constructor(animationComponents: readonly AnimationComponent[]) {
    this.components = animationComponents
  }

  /**
   * @static
   * @param {string} animationJson - The json representation of the AnimationComponents which make up the Animation.
   * @return {Animation} An animation based on the loaded json.
   */
  public static load(animationJson: string): Animation {
    const animationComponents: readonly AnimationComponent[] = JSON.parse(animationJson) as AnimationComponent[]
    return new Animation(animationComponents)
  }
}
