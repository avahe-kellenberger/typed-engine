/**
 * Z order defines the distance of an object in the 'Z' direction on a 3D plane, starting from zero.
 */
export interface ZOrder extends IZOrder {
    /**
     * Sets the object's Z order.
     * @param z The Z order of the object.
     */
    setZOrder(z: number): void;
}

export namespace ZOrder {
    /**
     * @param obj The object to check.
     * @return If the object is an instance of Zorder.
     */
    export function isInstance(obj: any): obj is ZOrder {
        return obj.setZOrder !== void 0 &&
               IZOrder.isInstance(obj);
    }
}

/**
 * Immutable Z order implementation.
 */
export interface IZOrder {

    /**
     * @return The Z order of the object.
     */
    getZOrder(): number;

    /**
     * @param listener The listener for which to check.
     * @return If the object contains the given listener.
     */
    containsZOrderListener(listener: ZOrderListener): boolean;

    /**
     * @param listener The listener to add.
     * @return If the object did not previously contain the listener.
     */
    addZOrderListener(listener: ZOrderListener): boolean;

    /**
     * @param listener The listener to remove.
     * @return If the object previously contained the listener.
     */
    removeZOrderListener(listener: ZOrderListener): boolean;

}

export namespace IZOrder {
    /**
     * @param obj The object to check.
     * @return If the object is an instance of IZorder.
     */
    export function isInstance(obj: any): obj is IZOrder {
        return obj.getZOrder !== void 0 &&
               obj.containsZOrderListener !== void 0 &&
               obj.addZOrderListener !== void 0 &&
               obj.removeZOrderListener !== void 0;
    }
}

/**
 *
 */
export interface ZOrderListener {
    /**
     * Invoked when the Z order of the object is changed.
     * @param newZ The object's new (current) Z order.
     * @param oldZ The object's previous Z order.
     */
    (newZ: number, oldZ?: number): void;
}
