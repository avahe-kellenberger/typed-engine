import { GameObject } from '../../src/entity/GameObject';
import { HeadlessGame } from '../../src/HeadlessGame';
import { Scene } from '../../src/scene/Scene';

const game: HeadlessGame = new HeadlessGame();

describe(`Content updating`, () => {
    it(`Content should be updated only after game has started`, () => {
        const scene: Scene = new Scene();
        const spy = jest.spyOn(scene, 'update');
        game.setContent(scene);

        expect(spy).not.toHaveBeenCalled();
        game.start();
        expect(spy).toHaveBeenCalled();
        game.stop();
    });

    it(`Renderable content should be updated but not rendered`, () => {
        const object: GameObject = new GameObject();
        const updateSpy: jest.SpyInstance = jest.spyOn(object, 'update');
        const renderSpy: jest.SpyInstance = jest.spyOn(object, 'render');

        game.setContent(object);
        game.start();

        expect(updateSpy).toBeCalled();
        expect(renderSpy).not.toBeCalled();
    });
});
