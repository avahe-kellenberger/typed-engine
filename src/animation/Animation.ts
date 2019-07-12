import { AnimationComponent } from './AnimationComponent'

export class Animation {
  public readonly components: readonly AnimationComponent[]
  constructor(animationComponents: readonly AnimationComponent[]) {
    this.components = animationComponents.slice()
  }

  /**
   * @param animationJson The json representation of the AnimationComponents which make up the Animation.
   * @return An animation based on the loaded json.
   */
  public static load(animationJson: string): Animation {
    const animationComponents: readonly AnimationComponent[] = JSON.parse(animationJson) as AnimationComponent[]
    return new Animation(animationComponents)
  }
}
