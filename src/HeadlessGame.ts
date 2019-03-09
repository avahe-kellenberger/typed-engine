import { Updatable } from './entity/Updatable';
import { GameEngine } from './GameEngine';

/**
 * Utilizes a GameEngine to update a given Updatable.
 * Games do not start by default; invoke `Game.start()` to start the game.
 */
export class HeadlessGame implements Updatable {

    private readonly engine: GameEngine;
    protected content: Updatable|undefined;
    
    /**
     * Constructs a game in a paused/stopped state.
     * @param content The content to update.
     * @see `Game.setContent()`
     * @see `Game.start()`
     */
    constructor(content?: Updatable) {
        this.content= content;
        this.engine = new GameEngine(this);
    }

    /**
     * @return The content of the game.
     */
    public getContent(): Updatable|undefined {
        return this.content;
    }

    /**
     * Sets the content of the Game to be updated.
     * @param content The content to update.
     */
    public setContent(content: Updatable|undefined): void {
        this.content = content;
    }

    /**
     * Starts/resumes the game.
     */
    public start(): boolean {
        return this.engine.start();
    }

    /**
     * Stops/pauses the game.
     */
    public stop(): boolean {
        return this.engine.stop();
    }

    /**
     * @override
     */
    public update(deltaTime: number): void {
        if (this.content !== undefined) {
            this.content.update(deltaTime);
        }
    }

}
