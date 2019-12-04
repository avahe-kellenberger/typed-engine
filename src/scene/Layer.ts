import { Renderable, RenderableCallback } from '../entity/Renderable'
import { Updatable } from '../entity/Updatable'
import { ZOrder, ZOrderListener } from '../entity/ZOrder'
import { Camera } from './Camera'

/**
 * Layers manage in-game Renderable and Updatable objects.
 */
export class Layer implements ZOrder, Updatable, Renderable {

    private readonly updatables: Set<Updatable>;
    private readonly renderables: Set<Renderable>;

    private zOrder: number;
    private zOrderListeners: Set<ZOrderListener>|undefined;

    /**
     * @param zOrder The object's Z order.
     */
    constructor(zOrder: number = 1) {
      this.zOrder = zOrder
      this.updatables = new Set()
      this.renderables = new Set()
    }

    /**
     * Adds the object to the game.
     * @param object The object to add.
     */
    public addObject(object: Updatable|Renderable): boolean {
      let added: boolean = false
      if (Updatable.isInstance(object)) {
        added = this.updatables.size !== this.updatables.add(object).size
      }
      if (Renderable.isInstance(object)) {
        added = this.renderables.size !== this.renderables.add(object).size || added
      }
      return added
    }

    /**
     * @param object The object to check.
     * @return If the layer contains the object.
     */
    public containsObject(object: Updatable|Renderable): boolean {
      return (Updatable.isInstance(object) && this.updatables.has(object)) ||
               (Renderable.isInstance(object) && this.renderables.has(object))
    }

    /**
     * @param object The object to remove.
     * @return If the object was removed.
     */
    public removeObject(object: Updatable|Renderable): boolean {
      let removed: boolean = false
      if (Updatable.isInstance(object)) {
        removed = this.updatables.delete(object)
      }
      if (Renderable.isInstance(object)) {
        removed = this.renderables.delete(object) || removed
      }
      return removed
    }

    /**
     * Removes all objects from the layer.
     */
    public removeAllObjects(): void {
      this.updatables.clear()
      this.renderables.clear()
    }

    // #region ZOrder

    /**
     * @override
     */
    public getZOrder(): number {
      return this.zOrder
    }

    /**
     * @override
     */
    public setZOrder(z: number): void {
      this.zOrder = z
    }

    /**
     * @override
     */
    public addZOrderListener(listener: ZOrderListener): boolean {
      if (this.zOrderListeners === undefined) {
        this.zOrderListeners = new Set()
      }
      return this.zOrderListeners.size !== this.zOrderListeners.add(listener).size
    }

    /**
     * @override
     */
    public containsZOrderListener(listener: ZOrderListener): boolean {
      return this.zOrderListeners != undefined && this.zOrderListeners.has(listener)
    }

    /**
     * @override
     */
    public removeZOrderListener(listener: ZOrderListener): boolean {
      return this.zOrderListeners != undefined && this.zOrderListeners.delete(listener)
    }

    // #endregion

    /**
     * @override
     */
    public update(deltaTime: number): void {
      this.updatables.forEach(obj => obj.update(deltaTime))
    }

    /**
     * @override
     */
    public render(ctx: CanvasRenderingContext2D, camera: Camera, callback?: RenderableCallback): void {
      const relativeZOrder: number = this.getZOrder() - camera.getZOrder()
      if (relativeZOrder <= 0) {
        return
      }
      this.renderables.forEach(obj => obj.render(ctx, camera, callback))

      if (callback !== undefined) {
        callback(ctx, camera)
      }
    }

}
