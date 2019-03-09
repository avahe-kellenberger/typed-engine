import { Entity } from '../../../src/entity/Entity';
import { LocationListener } from '../../../src/entity/Locatable';
import { Vector2D } from '../../../src/math/Vector2D';

// Initialize the test entity.
const entity = new Entity();

describe(`LocationListeners add/contains/remove`, () => {
    const locationListener: LocationListener = jest.fn();

    it(`Should not contain the listener by default`, () => {
        expect(entity.containsLocationListener(locationListener)).toBeFalsy();
    });

    it(`Should add the listener successfully`, () => {
        expect(entity.addLocationListener(locationListener)).toBeTruthy();
    });

    it(`Should contain the listener after being added`, () => {
        expect(entity.containsLocationListener(locationListener)).toBeTruthy();
    });

    it(`Listener should be removed successfully`, () => {
        expect(entity.removeLocationListener(locationListener)).toBeTruthy();
    });

    it(`Should not contain the listener after being removed`, () => {
        expect(entity.containsLocationListener(locationListener)).toBeFalsy();
    });
});

describe(`setLocation moves the object only when the given location is different`, () => {
    const startLocation: Vector2D = Vector2D.createRandom(100).floor();
    const locationListener: LocationListener = jest.fn();

    it(`LocationListener should not be invoked when setLocation is given its current location`, () => {
        entity.setLocation(startLocation);
        entity.addLocationListener(locationListener);
        entity.setLocation(startLocation);
        expect(locationListener).not.toBeCalled();
    });

    it(`LocationListener should be invoked`, () => {
        const delta: Vector2D = Vector2D.createRandom(100).floor();
        entity.setLocation(startLocation.add(delta));
        expect(locationListener).toHaveBeenCalledWith(startLocation.add(delta), delta);
        entity.removeLocationListener(locationListener);
    });
});
