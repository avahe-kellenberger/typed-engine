import { Animation, AnimationFrame } from '../../../src/animation/Animation';

describe(`getFrameAtTime`, () => {
    it(`Any time for a single-frame animation should return that frame`, () => {
        const image: HTMLImageElement = new Image();
        const testAnimation: Animation = new Animation(image);
        const onlyFrame: AnimationFrame = testAnimation.getFrameAtIndex(0);
        const randomTime: number = Math.random() * 10;
        expect(testAnimation.getFrameAtTime(randomTime)).toBe(onlyFrame);
    });

    it(`Time given multiple frames in should return the correct frame`, () => {
        const thirdImage: HTMLImageElement = new Image();
        const images: HTMLImageElement[] = [new Image(), new Image(), thirdImage, new Image()];
        const animation: Animation = Animation.createAnimation(images, 1.0);
        const imageAtTime: HTMLImageElement = animation.getFrameAtTime(2.5).image;
        expect(thirdImage).toBe(imageAtTime);
    });
});
