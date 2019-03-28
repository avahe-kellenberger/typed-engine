import { Vector2D } from '../../../../src/math/Vector2D';
import { Layer } from '../../../../src/scene/Layer';
import { Player } from '../entities/Player';

export class MyLayer extends Layer {

    private readonly player: Player;

    constructor() {
        super();
        this.player = new Player();
        this.player.setLocation(300, 200);
        this.addObject(this.player);
    }

}