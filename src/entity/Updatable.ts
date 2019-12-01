export interface Updatable {
    /**
     * @param deltaTime The time in seconds since the game's last update.
     */
    update(deltaTime: number): void;
}

export namespace Updatable {
    /**
     * @param obj The object to check.
     * @return If the object is an instance of Updatable.
     */
    export function isInstance(obj: any): obj is Updatable {
        return obj.update !== void 0
    }
}