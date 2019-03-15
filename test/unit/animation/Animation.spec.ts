import { Animation, AnimationFrame } from '../../../src/animation/Animation';

describe(`getFrameAtTime`, () => {
    const blankCanvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
    it(`Any time for a single-frame animation should return that frame`, () => {
        const canvas: HTMLCanvasElement = blankCanvas;
        const testAnimation: Animation = new Animation(canvas);
        const onlyFrame: AnimationFrame = testAnimation.getFrameAtIndex(0);
        const randomTime: number = Math.random() * 10;
        expect(testAnimation.getFrameAtTime(randomTime)).toBe(onlyFrame);
    });

    it(`Time given multiple frames in should return the correct frame`, () => {
        const thirdCanvas: HTMLCanvasElement = document.createElement('canvas');
        const canvases: HTMLCanvasElement[] = [blankCanvas, blankCanvas, thirdCanvas, blankCanvas];
        const animation: Animation = Animation.createAnimation(canvases, 1.0);
        const canvasAtTime: HTMLCanvasElement = animation.getFrameAtTime(2.5).canvas;
        expect(thirdCanvas).toBe(canvasAtTime);
    });
});
