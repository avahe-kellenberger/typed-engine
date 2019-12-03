import { Vector2D } from '../../../src/math/Vector2D'

const baseVector: Vector2D = Vector2D.createRandom(100)

describe('constructor', () => {
  it('given values should equal class members', () => {
    const x: number = Math.random() * 100
    const y: number = Math.random() * 100
    const vector: Vector2D = new Vector2D(x, y)
    expect(vector.x).toEqual(x)
    expect(vector.y).toEqual(y)
  })
})

describe('add', () => {
  it('another vector', () => {
    const another: Vector2D = Vector2D.createRandom(100)
    const vectorSum: Vector2D = baseVector.add(another)
    expect(vectorSum.x).toEqual(baseVector.x + another.x)
    expect(vectorSum.y).toEqual(baseVector.y + another.y)
  })

  it('x and y', () => {
    const x: number = Math.random() * 100
    const y: number = Math.random() * 100
    const vectorSum: Vector2D = baseVector.add(x, y)
    expect(vectorSum.x).toEqual(baseVector.x + x)
    expect(vectorSum.y).toEqual(baseVector.y + y)
  })
})

describe('subtract', () => {
  it('another vector', () => {
    const another: Vector2D = Vector2D.createRandom(100)
    const vectorDiff: Vector2D = baseVector.subtract(another)
    expect(vectorDiff.x).toEqual(baseVector.x - another.x)
    expect(vectorDiff.y).toEqual(baseVector.y - another.y)
  })

  it('x and y', () => {
    const x: number = Math.random() * 100
    const y: number = Math.random() * 100
    const vectorSum: Vector2D = baseVector.subtract(x, y)
    expect(vectorSum.x).toEqual(baseVector.x - x)
    expect(vectorSum.y).toEqual(baseVector.y - y)
  })
})

test('scale', () => {
  const scalar: number = Math.random() * 50
  const scaledVector: Vector2D = baseVector.scale(scalar)
  expect(scaledVector.x).toEqual(baseVector.x * scalar)
  expect(scaledVector.y).toEqual(baseVector.y * scalar)
})

test('toFixed', () => {
  const digitCount: number = 15
  const fixedVector: Vector2D = baseVector.toFixed(digitCount)
  const fixedX: number = Number.parseFloat(baseVector.x.toFixed(digitCount))
  const fixedY: number = Number.parseFloat(baseVector.y.toFixed(digitCount))
  expect(fixedVector.x).toEqual(fixedX)
  expect(fixedVector.y).toEqual(fixedY)
})

test('ceil', () => {
  const ceilX: number = Math.ceil(baseVector.x)
  const ceilY: number = Math.ceil(baseVector.y)
  const ceiledVector: Vector2D = baseVector.ceil()
  expect(ceiledVector.x).toEqual(ceilX)
  expect(ceiledVector.y).toEqual(ceilY)
})

test('floor', () => {
  const floorX: number = Math.floor(baseVector.x)
  const floorY: number = Math.floor(baseVector.y)
  const flooredVector: Vector2D = baseVector.floor()
  expect(flooredVector.x).toEqual(floorX)
  expect(flooredVector.y).toEqual(floorY)
})

describe('normalize', () => {
  const floatingPointErrorMargin: number = 0.00000000000001

  it('default scales to magnitude of 1', () => {
    const normal: Vector2D = baseVector.normalize()
    const magnitude: number = normal.getMagnitude()
    const magnitudeDifference: number = Math.abs(magnitude - 1.0)
    expect(magnitudeDifference).toBeLessThanOrEqual(floatingPointErrorMargin)
  })

  it('scales magnitude to given scalar', () => {
    const scalar: number = Math.random() * 10
    const scaledNormal: Vector2D = baseVector.normalize(scalar)
    const magnitude: number = scaledNormal.getMagnitude()
    const magnitudeDifference: number = Math.abs(magnitude - scalar)
    expect(magnitudeDifference).toBeLessThanOrEqual(floatingPointErrorMargin)
  })
})

test('getMagnitude', () => {
  const magnitude: number = Math.sqrt(baseVector.x * baseVector.x + baseVector.y * baseVector.y)
  expect(baseVector.getMagnitude()).toEqual(magnitude)
})

describe('equals', () => {
  it('Vector equal itself', () => {
    expect(baseVector.equals(baseVector)).toBeTruthy()
  })

  it('Same values should equal another', () => {
    const vectorA: Vector2D = Vector2D.createRandom(100)
    const vectorB: Vector2D = new Vector2D(vectorA.x, vectorA.y)
    expect(vectorA.equals(vectorB)).toBeTruthy()
  })

  it('Different values should not be equal', () => {
    const vectorA: Vector2D = Vector2D.createRandom(100)
    const vectorB: Vector2D = new Vector2D(vectorA.x + 1, vectorA.y)
    expect(vectorA.equals(vectorB)).toBeFalsy()
  })
})
