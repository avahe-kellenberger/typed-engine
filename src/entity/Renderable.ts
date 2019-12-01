import {Camera} from '../scene/Camera'

export interface Renderable {
    /**
     * @param ctx The context to render upon.
     * @param camera The camera viewing the object.
     * @param callback Invoked after the context has been translated to the object's center.
     */
    render(ctx: CanvasRenderingContext2D, camera: Camera, callback?: RenderableCallback): void;
}

export namespace Renderable {
    /**
     * @param obj The object to check.
     * @return If the object is an instance of Renderable.
     */
    export function isInstance(obj: any): obj is Renderable {
        return obj.render !== void 0
    }
}

export interface RenderableCallback {
    /**
     * @param ctx The context to render upon.
     * @param camera The camera viewing the object.
     */
    (ctx: CanvasRenderingContext2D, camera?: Camera): void;
}
