import { GameObject } from '../../src/entity/GameObject';
import { HeadlessGame } from '../../src/HeadlessGame';

const game: HeadlessGame = new HeadlessGame();

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
