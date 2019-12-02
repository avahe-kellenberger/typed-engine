import { Vector2D } from '../math/Vector2D'
import { Camera } from '../scene/Camera'
import { Entity } from './Entity'
import { Renderable, RenderableCallback } from './Renderable'
import { Updatable } from './Updatable'

export class GameObject extends Entity implements Updatable, Renderable {

  /**
     * @override
     */
  public update(deltaTime: number): void {}

  /**
     * @override
     */
  public render(ctx: CanvasRenderingContext2D, camera: Camera, callback?: RenderableCallback): void {
    if (callback != null) {
      const location: Vector2D = this.getLocation()
      ctx.translate(location.x, location.y)
      callback(ctx, camera)
      ctx.translate(-location.x, -location.y)
    }
  }


}