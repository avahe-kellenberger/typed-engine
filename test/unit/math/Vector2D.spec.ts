import { Vector2D } from '../../../src/math/Vector2D';

describe(`Vectors with equal values`, () => {
    it(`Should equal itself`, () => {
        const vector: Vector2D = Vector2D.createRandom(100);
        expect(vector.equals(vector)).toBeTruthy();
    });

    it(`Object with the same values should equal another`, () => {
        const vectorA: Vector2D = Vector2D.createRandom(100);
        const vectorB: Vector2D = new Vector2D(vectorA.x, vectorA.y);
        expect(vectorA.equals(vectorB)).toBeTruthy();
    });

    it(`Objects with different values should not be equal`, () => {
        const vectorA: Vector2D = Vector2D.createRandom(100);
        const vectorB: Vector2D = new Vector2D(vectorA.x + 1, vectorA.y);
        expect(vectorA.equals(vectorB)).toBeFalsy();
    });
});
