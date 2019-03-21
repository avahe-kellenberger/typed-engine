import { AssetLoader } from '../../../../src/util/asset/AssetLoader';

export class Assets {

    // Resource directories
    private static readonly imageDir: string = '../resources/images';
    private static readonly spritesheetDir: string = `${Assets.imageDir}/spritesheets`;

    // Asset filepaths
    private static readonly playerSpritesheetPath: string = `${Assets.spritesheetDir}/platformerPack_character.png`;

    // Loaded assets
    public static SHEET_PLAYER: HTMLCanvasElement;

    /**
     * Loads all assets.
     */
    public static async loadAll(): Promise<void> {
        // Create an array of promises that resolve each loaded asset.
        const promises: Promise<any>[] = [];

        // Load an asset from a Promise, and add that promise to the `promises` array.
        const playerSheetPromise: Promise<HTMLCanvasElement> = AssetLoader.loadImageFile(Assets.playerSpritesheetPath);
        promises.push(playerSheetPromise.then(canvas => Assets.SHEET_PLAYER = canvas));

        // Resolve all promises created in this function.
        return Promise.all(promises).then(() => {});
    }

}