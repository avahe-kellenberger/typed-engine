import { GameEngine } from '../../src/GameEngine'

const engine: GameEngine = new GameEngine({
  update(deltaTime: number): void {
    // Empty
  }
})

test('start and stop function as intended', () => {
  expect(engine.isRunning()).toBeFalsy()

  engine.start()
  expect(engine.isRunning()).toBeTruthy()

  engine.stop()
  expect(engine.isRunning()).toBeFalsy()
})
