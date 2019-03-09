import { Vector2D } from '../math/Vector2D';

export interface Locatable extends ILocatable {
    
    /**
     * @param distance The distance to move the object. 
     */
    move(distance: Vector2D): void;

    /**
     * @param location The object's new center location.
     */
    setLocation(location: Vector2D): void;

    /**
     * @param listener The listener for which to check.
     * @return If the object contains the given listener.
     */
    containsLocationListener(listener: LocationListener): boolean;

    /**
     * @param listener The listener to add.
     * @return If the object did not previously contain the listener.
     */
    addLocationListener(listener: LocationListener): boolean;

    /**
     * @param listener The listener to remove.
     * @return If the object previously contained the listener.
     */
    removeLocationListener(listener: LocationListener): boolean;

}

export interface ILocatable {
    
    /**
     * @return The object's center location.
     */
    getLocation(): Vector2D;

}

export interface LocationListener {
    /**
     * Invoked when the object's location changes.
     * @param location The object's new location.
     * @param delta The distance the object moved.
     */
    (location: Vector2D, delta: Vector2D): void;
}