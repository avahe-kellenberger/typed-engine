import { AssetLoader } from '../../../../src/util/asset/AssetLoader';

export class Assets {

    // Filepath relative to `index.html`
    private static readonly imageDir: string = '../resources/images';

    public static SHEET_PLAYER: HTMLCanvasElement;

    /**
     * Loads all assets.
     */
    public static loadAll(): Promise<void> {
        const promises: Promise<void>[] = [];

        const playerSheetPath: string = `${Assets.imageDir}/spritesheets/platformerPack_character.png`;
        promises.push(AssetLoader.loadImageFile(playerSheetPath).then(canvas => {
            Assets.SHEET_PLAYER = canvas;
        }));
        
        return Promise.all(promises).then(() => {});
    }

}