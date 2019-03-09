import { HeadlessGame } from '../../src/HeadlessGame';
import { Layer } from '../../src/scene/Layer';

const game: HeadlessGame = new HeadlessGame();

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
