import 'jest-canvas-mock';

import { Game } from '../../src/Game';
import { Layer } from '../../src/scene/Layer';

const canvas: HTMLCanvasElement = document.createElement('canvas');
const game: Game = new Game(canvas.getContext('2d')!);

test(`getContent returns the object given in setContent`, () => {
    const layerA: Layer = new Layer();
    const layerB: Layer = new Layer();

    game.setContent(layerA);
    expect(game.getContent()).toBe(layerA);
    expect(game.getContent()).not.toBe(layerB);

    game.setContent(layerB);
    expect(game.getContent()).toBe(layerB);
    expect(game.getContent()).not.toBe(layerA);
});
