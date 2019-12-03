import { CanvasUtils } from '../../../src/util/CanvasUtils'

describe('split', () => {
  it('Should divide sheet into even images', () => {
    const sheet: HTMLCanvasElement = CanvasUtils.create(Math.floor(Math.random() * 40),
                                                            Math.floor(Math.random() * 40))
    const canvases: HTMLCanvasElement[] = CanvasUtils.split(sheet, 2, 8)
    expect(canvases.length).toEqual(16)
  })
})
