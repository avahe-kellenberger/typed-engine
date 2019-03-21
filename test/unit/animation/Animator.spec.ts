import { Animation } from '../../../src/animation/Animation';
import { Animator } from '../../../src/animation/Animator';

const canvas: HTMLCanvasElement = document.createElement('canvas');
const anim1: Animation = Animation.create([canvas]);
const anim2: Animation = Animation.create([canvas]);
const anim3: Animation = Animation.create([canvas]);

const animator: Animator = new Animator();

describe(`getAnimation`, () => {
    animator.setAnimation('one', anim1);
    animator.setAnimation('two', anim2);
    animator.setAnimation('three', anim3);
    
    it(`Existing animation with id is properly returned`, () => {
        expect(animator.getAnimation('one')).toBe(anim1);
        expect(animator.getAnimation('two')).toBe(anim2);
        expect(animator.getAnimation('three')).toBe(anim3);
    });

    it(`Incorrect animation id returns undefined`, () => {
        expect(animator.getAnimation('four')).toEqual(undefined);
    });
});

describe(`getCurrentAnimation`, () => {
    it(`Returns the first animation that was set`, () => {
        expect(animator.getCurrentAnimation()).toBe(anim1);
    });

    it(`Returns undefined when created without added animations`, () => {
        const emptyAnimator: Animator = new Animator();
        expect(emptyAnimator.getCurrentAnimation()).toEqual(undefined);
    });
});

describe(`setCurrentAnimation`, () => {
    it(`Error when given unknown animation ID`, () => {
        expect(() => animator.setCurrentAnimation(`four`)).toThrow();
    });

    it(`Sets the current animation when given a proper ID`, () => {
        const currentID: string = `two`;
        animator.setCurrentAnimation(currentID);
        expect(animator.getCurrentAnimation()).toBe(anim2);
    })
});


