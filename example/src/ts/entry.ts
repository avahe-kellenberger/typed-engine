import { Game } from '../../../src/Game';
import { Assets } from './asset/Assets';
import { MyLayer } from './scenes/MyLayer';

// Designate your game's name.
const gameName: string = `My Game`;

// Queue asset loading as soon as possible.
console.log(`[${gameName}] Loading assets...`);
const assetPromise: Promise<void> = Assets.loadAll();

// Load the rendering context from the DOM's canvas.
const canvas: HTMLCanvasElement = document!.getElementById('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
console.log(`[${gameName}] Canvas loaded.`);

// Assets loaded successfully.
assetPromise.then(() => {
    console.log(`[${gameName}] Assets loaded.`);
    const game: Game = new Game(ctx);
    game.setContent(new MyLayer());
    game.start();
    console.log(`[${gameName}] Game Started.`);
});

// Assets failed to load.
assetPromise.catch(reason => {
    console.error(`Failed to load assets!\n${reason}`);
});