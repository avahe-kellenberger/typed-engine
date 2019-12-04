import { Updatable } from './entity/Updatable'

export class GameEngine {

    private updatable: Updatable;
    private isLooping: boolean;
    private lastTick: number|undefined;

    /**
     * Updates the given object.
     * @param updatable The object to update.
     */
    constructor(updatable: Updatable) {
      this.updatable = updatable
      this.isLooping = false
    }

    /**
     * Loops until stopped.
     * @see GameEngine.stop()
     */
    private readonly loop = (): void => {
      // Exit the loop if the engine has been stopped.
      if (!this.isLooping) {
        return
      }

      const now: number = performance.now()
      if (this.lastTick === undefined) {
        this.lastTick = now
      }

      const elapsed: number = now - this.lastTick
      this.updatable.update(elapsed * 0.001)

      this.lastTick = now
      requestAnimationFrame(this.loop)
    }

    /**
     * Starts the engine if paused.
     * @return If the engine was started.
     */
    public start(): boolean {
      if (this.isLooping) {
        return false
      }
      this.isLooping = true
      this.loop()
      return true
    }

    /**
     * Stops the engine.
     * @return If the engine was stopped.
     */
    public stop(): boolean {
      if (!this.isLooping) {
        return false
      }
      this.isLooping = false
      return true
    }

    /**
     * @return If the engine is running.
     */
    public isRunning(): boolean {
      return this.isLooping
    }

}
