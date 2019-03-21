import { Animation } from '../../../../src/animation/Animation';
import { AnimatedSprite } from '../../../../src/entity/AnimatedSprite';
import { CanvasUtils } from '../../../../src/util/CanvasUtils';
import { Assets } from '../asset/Assets';

type AnimationID = 'idle' | 'walking' | 'jumping';

export class Player extends AnimatedSprite<AnimationID> {

    constructor() {
        const canvases: HTMLCanvasElement[] = CanvasUtils.split(Assets.SHEET_PLAYER, 4, 2);

        const animations: Array<[AnimationID, Animation]> = [];

        const idleAnim: Animation = Animation.create([canvases[0]]);
        animations.push(['idle', idleAnim]);

        const walkingFrameDuration: number = 0.25;
        const walkingAnim: Animation = Animation.create([canvases[3], canvases[2]], walkingFrameDuration);
        animations.push(['walking', walkingAnim]);

        const jumpingAnim: Animation = Animation.create([canvases[1]]);
        animations.push(['jumping', jumpingAnim]);
        
        super(animations);

        this.setCurrentAnimation('walking');
    }

}
