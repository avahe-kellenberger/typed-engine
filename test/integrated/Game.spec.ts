import 'jest-canvas-mock';

import { GameObject } from '../../src/entity/GameObject';
import { Game } from '../../src/Game';

const canvas: HTMLCanvasElement = document.createElement('canvas');
const game: Game = new Game(canvas.getContext('2d')!);

describe(`Game`, () => {
    it(`Content should be updated and rendered`, () => {
        const object: GameObject = new GameObject();
        const updateSpy: jest.SpyInstance = jest.spyOn(object, 'update');
        const renderSpy: jest.SpyInstance = jest.spyOn(object, 'render');

        game.setContent(object);
        game.start();

        expect(updateSpy).toBeCalled();
        expect(renderSpy).toBeCalled();
    });
});
