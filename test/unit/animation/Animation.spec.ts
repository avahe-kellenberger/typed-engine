import { Animation, AnimationFrame } from '../../../src/animation/Animation';

describe(`getFrameAtTime`, () => {
    const blankCanvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
    
    it(`Any time for a single-frame animation should return that frame`, () => {
        const testAnimation: Animation = Animation.create([blankCanvas]);
        const firstFrame: AnimationFrame = testAnimation.getFrameAtIndex(0);
        const randomTime: number = Math.random() * 10;
        const frameAtTime: AnimationFrame = testAnimation.getFrameAtTime(randomTime);
        expect(frameAtTime).toBe(firstFrame);
    });

    it(`Time given multiple frames in should return the correct frame`, () => {
        const thirdCanvas: HTMLCanvasElement = document.createElement('canvas');
        const canvases: HTMLCanvasElement[] = [blankCanvas, blankCanvas, thirdCanvas, blankCanvas];
        const animation: Animation = Animation.create(canvases, 1.0);
        const canvasAtTime: HTMLCanvasElement = animation.getFrameAtTime(2.5).canvas;
        expect(thirdCanvas).toBe(canvasAtTime);
    });
});
