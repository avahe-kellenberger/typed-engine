import { GameObject } from '../../src/entity/GameObject';
import { HeadlessGame } from '../../src/HeadlessGame';
import { Vector2D } from '../../src/math/Vector2D';
import { Camera } from '../../src/scene/Camera';

const camera: Camera = new Camera(new Vector2D(800, 600));
const game: HeadlessGame = new HeadlessGame(camera);

describe(`HeadlessGame`, () => {
    it(`GameObject should be updated but not rendered`, () => {
        const object: GameObject = new GameObject();
        const updateSpy: jest.SpyInstance = jest.spyOn(object, 'update');
        const renderSpy: jest.SpyInstance = jest.spyOn(object, 'render');

        game.setContent(object);
        game.start();

        expect(updateSpy).toBeCalled();
        expect(renderSpy).not.toBeCalled();
    });
});
