import { Vector2D } from '../../../src/math/Vector2D';
import { Camera } from '../../../src/scene/Camera';

const camera: Camera = new Camera(Vector2D.ZERO, Vector2D.createRandom(100).floor());

test(`Change in location moves the viewport by the same amount`, () => {
    const viewportStartLocation: Vector2D = camera.getViewport().getLocation();
    const cameraDisplacement: Vector2D = Vector2D.createRandom(100).floor();
    camera.move(cameraDisplacement);
    
    const viewportEndLocation: Vector2D = camera.getViewport().getLocation();
    const viewportDisplacement: Vector2D = viewportEndLocation.subtract(viewportStartLocation);
    expect(viewportDisplacement).toEqual(cameraDisplacement);
});
