import { Renderable, RenderableCallback } from './entity/Renderable'
import { Updatable } from './entity/Updatable'
import { GameEngine } from './GameEngine'
import { InputHandler } from './input/InputHandler'
import { Vector2D } from './math/Vector2D'
import { Camera } from './scene/Camera'
import { ChangeConsumer as ChangeListener } from './util/function/ChangeConsumer'

type Content = Updatable&Renderable;

/**
 * Manages updating/rendering of content by utilization of a GameEngine.
 * This object does not start the engine by default; invoke `Game.start()` to start the game.
 */
export class Game implements Renderable {

    private readonly engine: GameEngine;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly camera: Camera;
    private contentChangedListeners: Set<ChangeListener<Content|undefined>> | undefined;
    private content: Content|undefined;

    public readonly inputHandler: InputHandler;

    /**
     * Constructs a game in a paused/stopped state.
     * @param content The content to update and/or render.
     * @see `Game.setContent()`
     * @see `Game.start()`
     */
    constructor(ctx: CanvasRenderingContext2D, content?: Content) {
      this.ctx = ctx
      this.content = content
      this.engine = new GameEngine(this)
      const canvasSize: Vector2D = new Vector2D(ctx.canvas.width, ctx.canvas.height)
      this.camera = new Camera(canvasSize)
      this.inputHandler = new InputHandler(document)

      window.addEventListener('load', this.fitCanvasToParent)
      window.addEventListener('resize', this.fitCanvasToParent)
    }

    /**
     * Ensures that the game's canvas fits its parent element.
     */
    private fitCanvasToParent = (): void => {
      const canvas: HTMLCanvasElement = this.ctx.canvas
      const canvasParent: HTMLElement|null = canvas.parentElement
      if (canvasParent !== null) {
        const parentBounds = canvasParent.getBoundingClientRect()
        if (canvas.width !== parentBounds.width || canvas.height !== parentBounds.height) {
          canvas.width = parentBounds.width
          canvas.height = parentBounds.height
        }
      }
    }

    /**
     * @return The content of the game.
     */
    public getContent(): Content|undefined {
      return this.content
    }

    /**
     * Sets the content of the Game to be updated/rendered.
     * This is typically a Scene or a Layer, but can be used with other
     * object types (usually for quick previews and testing purposes).
     *
     * @param content The content to update and/or render.
     */
    public setContent(content: Content|undefined): void {
      this.content = content
    }

    /**
     * @param listener The listener invoked when the game's content is changed.
     * @return If the listener had not previously been added to the game.
     */
    public addContentListener(listener: ChangeListener<Content|undefined>): boolean {
      if (this.contentChangedListeners === undefined) {
        this.contentChangedListeners = new Set()
      }
      return this.contentChangedListeners.size !== this.contentChangedListeners.add(listener).size
    }

    /**
     * @param listener The listener to remove.
     * @return If the listener had previously been added to the game.
     */
    public removeContentListener(listener: ChangeListener<Content|undefined>): boolean {
      if (this.contentChangedListeners === undefined) {
        return false
      }
      return this.contentChangedListeners.delete(listener)
    }

    /**
     * @return The camera viewing the game.
     */
    public getCamera(): Camera {
      return this.camera
    }

    /**
     * Starts/resumes the game.
     */
    public start(): boolean {
      return this.engine.start()
    }

    /**
     * Stops/pauses the game.
     */
    public stop(): boolean {
      return this.engine.stop()
    }

    /**
     * @override
     */
    public update(deltaTime: number): void {
      if (this.content !== undefined) {
        this.content.update(deltaTime)
        this.render(this.ctx, this.camera)
      }
    }

    /**
     * @override
     */
    public render(ctx: CanvasRenderingContext2D, camera: Camera, callback?: RenderableCallback): void {
      if (this.content !== undefined) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        this.content.render(ctx, camera, callback)
      }
    }

}
