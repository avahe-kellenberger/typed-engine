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
     * Sets the object's location.
     * @param x The x location.
     * @param y The y location.
     */
    public setLocation(x: number, y: number): void;
    
    /**
     * @override
     */
    public setLocation(location: Vector2D): void;

    /**
     * Overload function.
     */
    public setLocation(locationOrX: Vector2D|number, y?: number): void {
        if (!(locationOrX instanceof Vector2D)) {
            if (y === undefined) {
                throw new Error('');
            } 
            this.setLocation(new Vector2D(locationOrX, y));
        } else {
            if (locationOrX.equals(this.location)) {
                return;
            }
            const delta: Vector2D = locationOrX.subtract(this.location);
            this.location = locationOrX;
            if (this.locationListeners !== undefined) {
                this.locationListeners.forEach(listener => listener(this.location, delta));
            }
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

