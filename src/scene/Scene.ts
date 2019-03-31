import { Renderable, RenderableCallback } from '../entity/Renderable';
import { Updatable } from '../entity/Updatable';
import { Game } from '../Game';
import { InputHandler } from '../input/InputHandler';
import { Camera } from './Camera';
import { Layer } from './Layer';

/**
 * Manages Layers and scene-specific input via the `inputHandler`.
 * Each scene owns its own `inputHandler`.
 * For global input management, see `Game.inputHandler`.
 */
export class Scene implements Updatable, Renderable {

    private readonly layers: Layer[];
    private readonly layersSet: Set<Layer>;
    private layerOrderIsValid: boolean;

    public readonly inputHandler: InputHandler;

    /**
     * @param game The game which owns the scene.
     */
    constructor(game: Game) {
        this.inputHandler = new InputHandler(document);
        this.layers = [];
        this.layersSet = new Set();
        this.layerOrderIsValid = true;

        // Ensure all EventHandlers specific to this scene are removed.
        game.addContentListener(() => this.inputHandler.clearEventHandlers());
    }

    /**
     * @param layer The layer to add.
     * @return If the scene did not contain the layer.
     */
    public addLayer(layer: Layer): boolean {
        if (this.layersSet.size !== this.layersSet.add(layer).size) {
            this.layers.push(layer);
            this.layerOrderIsValid = false;
            return true;
        }
        return false;
    }

    /**
     * @param layer The layer to check.
     * @return If the scene contains the layer.
     */
    public containsLayer(layer: Layer): boolean {
        return this.layersSet.has(layer);
    }

    /**
     * @param layer The layer to remove.
     * @return If the scene contained the layer.
     */
    public removeLayer(layer: Layer): boolean {
        if (this.layersSet.delete(layer)) {
            this.layers.splice(this.layers.indexOf(layer), 1);
            return true;
        }
        return false;
    }

    /**
     * Sorts the layers by descending Z order.
     * @return The sorted layers.
     */
    private sortLayers(): Layer[] {
        if (!this.layerOrderIsValid) {
            this.layers.sort((layer1, layer2) => layer2.getZOrder() - layer1.getZOrder());
        }
        return this.layers;
    }

    /**
     * @override
     */
    public update(deltaTime: number): void {
        this.layers.forEach(layer => {
            layer.update(deltaTime);
        });
    }

    /**
     * @override
     */
    public render(ctx: CanvasRenderingContext2D, camera: Camera, callback?: RenderableCallback): void {
        this.sortLayers().forEach(layer => {
            layer.render(ctx, camera, callback);
        });

        if (callback !== undefined) {
            callback(ctx, camera);
        }
    }

}
