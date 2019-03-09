import { Updatable } from './Updatable';
import { Renderable, RenderableCallback } from './Renderable';
import { Entity } from './Entity';
import { Camera } from '../scene/Camera';

export class GameObject extends Entity implements Updatable, Renderable {
    
    /**
     * @override
     */
    public update(deltaTime: number): void {}
    
    /**
     * @override
     */
    public render(ctx: CanvasRenderingContext2D, camera: Camera, callback?: RenderableCallback): void {}


}