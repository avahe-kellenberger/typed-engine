import { GameEngine } from '../../src/GameEngine';
import { HeadlessGame } from '../../src/HeadlessGame';

const engine: GameEngine = new GameEngine(new HeadlessGame());

test(`start and stop function as intended`, () => {
    expect(engine.isRunning()).toBeFalsy();
    
    engine.start();
    expect(engine.isRunning()).toBeTruthy();

    engine.stop();
    expect(engine.isRunning()).toBeFalsy();
});