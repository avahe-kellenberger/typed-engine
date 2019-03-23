import { Animation } from '../../../src/animation/Animation';
import { Animator } from '../../../src/animation/Animator';

type AnimationID = 'one' | 'two' | 'three';

const canvas: HTMLCanvasElement = document.createElement('canvas');
const anim1: Animation = Animation.create([canvas]);
const anim2: Animation = Animation.create([canvas]);
const anim3: Animation = Animation.create([canvas]);

const animationIDMap: Map<AnimationID, Animation> = new Map();
animationIDMap.set('one', anim1);
animationIDMap.set('two', anim2);
animationIDMap.set('three', anim3);

const animator: Animator<AnimationID> = new Animator(animationIDMap);

describe(`getAnimation`, () => {
    it(`Animation mapped to given ID is properly returned`, () => {
        animationIDMap.forEach((anim, id) => {
            expect(animator.getAnimation(id)).toBe(anim);
        });
    });
});

describe(`getCurrentAnimation`, () => {
    it(`Returns the first animation that was set`, () => {
        expect(animator.getCurrentAnimation()).toBe(anim1);
    });
});

describe(`setCurrentAnimation`, () => {
    it(`Sets the current animation when given a proper ID`, () => {
        animator.setCurrentAnimation('two');
        expect(animator.getCurrentAnimation()).toBe(anim2);
    })
});


