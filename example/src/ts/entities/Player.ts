import { Animation } from '../../../../src/animation/Animation';
import { AnimatedSprite } from '../../../../src/entity/AnimatedSprite';
import { CanvasUtils } from '../../../../src/util/CanvasUtils';
import { Assets } from '../asset/Assets';

type AnimationID = 'idle' | 'walking' | 'jumping';

/**
 * Example implementation of an `AnimatedSprite`
 */
export class Player extends AnimatedSprite<AnimationID> {

    constructor() {
        // Split the player spritesheet into its frames.
        const canvases: HTMLCanvasElement[] = CanvasUtils.split(Assets.SHEET_PLAYER, 4, 2);

        // Each animation will be mapped to an ID, declared above in `type AnimationID`.
        const animationIDMap: Map<AnimationID, Animation> = new Map();

        // The `idle` animation has one frame.
        const idleAnim: Animation = Animation.create([canvases[0]]);
        // Add this animation with the ID `idle`.
        animationIDMap.set('idle', idleAnim);

        // The jumping animation also only has one frame.
        const jumpingAnim: Animation = Animation.create([canvases[1]]);
        animationIDMap.set('jumping', jumpingAnim);

        // The walking animation has two frames, so we will need to declare how long these frames are displayed (in seconds).
        const walkingFrameDuration: number = 0.25;
        const walkingAnim: Animation = Animation.create([canvases[3], canvases[2]], walkingFrameDuration);
        animationIDMap.set('walking', walkingAnim);

        // We pass in the map of Animations and their respective IDs to the super class.
        super(animationIDMap);

        // We are now able to set the player's animation by passing in the related ID.
        this.setCurrentAnimation('walking');
    }

}
