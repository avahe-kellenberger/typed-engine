import { Vector2D } from '../math/Vector2D';
import { Locatable, LocationListener } from './Locatable';

/**
 * 
 */
export class Entity implements Locatable {

    private location: Vector2D;
    private locationListeners: Set<LocationListener>|undefined;

    /**
     * @param location The object's location.
     */
    constructor(location: Vector2D = Vector2D.ZERO) {
        this.location = location;
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
    
}

