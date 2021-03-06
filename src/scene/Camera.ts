import { Entity } from '../entity/Entity'
import { ZOrder, ZOrderListener } from '../entity/ZOrder'
import { Rectangle } from '../math/geom/Rectangle'
import { Vector2D } from '../math/Vector2D'

/**
 * The camera which views the game.
 */
export class Camera extends Entity implements ZOrder {

    private viewport: Rectangle;
    private zOrder: number;
    private zOrderListeners: Set<ZOrderListener>|undefined;

    /**
     * @param viewportSize The size of the canvas being viewed by the camera.
     * @param location The camera's starting location.
     * @param zOrder The object's Z order.
     */
    constructor(viewportSize: Vector2D, location: Vector2D = Vector2D.ZERO, zOrder: number = 0) {
      super(location)
      this.viewport = this.createViewport(viewportSize)
      this.zOrder = zOrder
      this.addLocationListener((_, delta) => this.moveViewport(delta))
    }

    // #region Viewport

    /**
     * Moves the viewport by the given distance.
     * @param distance The distance to move.
     */
    private moveViewport(distance: Vector2D): void {
      const newLocation: Vector2D = this.viewport.getLocation().add(distance)
      this.viewport = new Rectangle(newLocation, this.viewport.getSize())
    }

    /**
     * Calculates the viewport based on the camera's location and the canvas size.
     * @return An updated viewport.
     */
    private createViewport(size: Vector2D): Rectangle {
      const viewportLoc: Vector2D = this.getLocation().subtract(size.scale(0.5))
      return new Rectangle(viewportLoc, size)
    }

    /**
     * Gets an immutable snapshot of the unscaled viewport of the camera.
     * In other words, this is the viewport at Z order `camera.getZOrder() + 1`.
     * @return The unscaled viewport.
     */
    public getViewport(): Rectangle {
      return this.viewport
    }

    /**
     * Sets the size of the viewport.
     * @param newSize The new size of the viewport.
     */
    public setViewportSize(newSize: Vector2D): boolean {
      const oldViewportSize: Vector2D = this.viewport.getSize()
      if (oldViewportSize.equals(newSize)) {
        return false
      }
      this.viewport = this.createViewport(newSize)
      return true
    }

    // #endregion

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
      if (this.zOrder === z) {
        return
      }
      const oldZ: number = this.zOrder
      this.zOrder = z
      if (this.zOrderListeners !== undefined) {
        this.zOrderListeners.forEach(listener => listener(oldZ, this.zOrder))
      }
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
      return this.zOrderListeners !== undefined &&
               this.zOrderListeners.has(listener)
    }

    /**
     * @override
     */
    public removeZOrderListener(listener: ZOrderListener): boolean {
      return this.zOrderListeners !== undefined &&
               this.zOrderListeners.delete(listener)
    }

  // #endregion

}
