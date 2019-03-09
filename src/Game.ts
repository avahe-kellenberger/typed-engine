import { Renderable, RenderableCallback } from './entity/Renderable';
import { Updatable } from './entity/Updatable';
import { HeadlessGame } from './HeadlessGame';
import { Vector2D } from './math/Vector2D';
import { Camera } from './scene/Camera';

/**
 * Manages updating/rendering of content by utilization of a GameEngine.
 * This object does not start the engine by default; invoke `Game.start()` to start the game.
 */
export class Game extends HeadlessGame implements Renderable {

    private readonly ctx: CanvasRenderingContext2D;
    private readonly camera: Camera;
    protected content: (Updatable&Renderable)|undefined;
    
    /**
     * Constructs a game in a paused/stopped state.
     * @param content The content to update and/or render.
     * @see `Game.setContent()`
     * @see `Game.start()`
     */
    constructor(canvas: HTMLCanvasElement, content?: Updatable&Renderable) {
        super(content);
        const canvasSize: Vector2D = new Vector2D(canvas.width, canvas.height);
        this.camera = new Camera(canvasSize);
        this.ctx = canvas.getContext("2d")!;
    }

    /**
     * @return The content of the game.
     */
    public getContent(): (Updatable&Renderable)|undefined {
        return this.content;
    }

    /**
     * Sets the content of the Game to be updated/rendered.
     * This is typically a Scene or a Layer, but can be used with other
     * object types (usually for quick previews and testing purposes).
     * 
     * @param content The content to update and/or render.
     */
    public setContent(content: (Updatable&Renderable)|undefined): void {
        super.setContent(content);
    }

    /**
     * @return The camera viewing the game.
     */
    public getCamera(): Camera {
        return this.camera;
    }

    /**
     * @override
     */
    public update(deltaTime: number): void {
        super.update(deltaTime);
        this.render(this.ctx, this.camera);
    }

    /**
     * @override
     */
    public render(ctx: CanvasRenderingContext2D, camera: Camera, callback?: RenderableCallback): void {
        if (this.content !== undefined) {
            this.content.render(ctx, camera, callback);
        }
    }

}
