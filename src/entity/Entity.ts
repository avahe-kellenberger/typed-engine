import { Updatable } from './Updatable';
import { Vector2D } from '../math/Vector2D';
import { Locatable, LocationListener } from './Locatable';
import { ZOrder, ZOrderListener } from './ZOrder';

/**
 * 
 */
export class Entity implements Locatable, ZOrder {

    private location: Vector2D;
    private locationListeners: Set<LocationListener>|undefined;

    private zOrder: number;
    private zOrderListeners: Set<ZOrderListener>|undefined;

    /**
     * @param location The object's location.
     * @param zOrder the object's Z order.
     */
    constructor(location: Vector2D = Vector2D.ZERO, zOrder: number = 1) {
        this.location = location;
        this.zOrder = zOrder;
    }

    // #region Locatable

    /**
     * @override
     */
    public getLocation(): Vector2D {
        return this.location;
    }

    /**
     * @override
     */
    public move(distance: Vector2D): void {
        this.setLocation(this.location.add(distance));
    }

    /**
     * @override
     */
    public setLocation(location: Vector2D): void {
        if (this.location.equals(location)) {
            return;
        }
        const delta: Vector2D = location.subtract(this.location);
        this.location = location;
        if (this.locationListeners !== undefined) {
            this.locationListeners.forEach(listener => listener(this.location, delta));
        }
    }

    /**
     * @override
     */
    public addLocationListener(listener: LocationListener): boolean {
        if (this.locationListeners === undefined) {
            this.locationListeners = new Set();
        }
        return this.locationListeners.size !== this.locationListeners.add(listener).size;
    }

    /**
     * @override
     */
    public containsLocationListener(listener: LocationListener): boolean {
        return this.locationListeners !== undefined &&
               this.locationListeners.has(listener);
    }
    
    /**
     * @override
     */
    public removeLocationListener(listener: LocationListener): boolean {
        return this.locationListeners !== undefined &&
               this.locationListeners.delete(listener);
    }

    // #endregion
    
    // #region ZOrder

    /**
     * @override
     */
    public getZOrder(): number {
        return this.zOrder;
    }

    /**
     * @override
     */
    public setZOrder(z: number): void {
        if (this.zOrder === z) {
            return;
        }
        const oldZ: number = this.zOrder;
        this.zOrder = z;
        if (this.zOrderListeners !== undefined) {
            this.zOrderListeners.forEach(listener => listener(oldZ, this.zOrder));
        }
    }
        
    /**
     * @override
     */
    public addZOrderListener(listener: ZOrderListener): boolean {
        if (this.zOrderListeners === undefined) {
            this.zOrderListeners = new Set();
        }
        return this.zOrderListeners.size !== this.zOrderListeners.add(listener).size;
    }

    /**
     * @override
     */
    public containsZOrderListener(listener: ZOrderListener): boolean {
        return this.zOrderListeners !== undefined &&
               this.zOrderListeners.has(listener);
    }
        
    /**
     * @override
     */
    public removeZOrderListener(listener: ZOrderListener): boolean {
        return this.zOrderListeners !== undefined &&
               this.zOrderListeners.delete(listener);
    }
        
    // #endregion

}
