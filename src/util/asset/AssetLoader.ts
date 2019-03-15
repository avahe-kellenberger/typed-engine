import { CanvasUtils } from "../CanvasUtils";

export class AssetLoader {
    /**
     * Loads an image with the given URL/file path.
     * @param url The URL of the image.
     * @return An HTMLCanvasElement as the loaded image.
     */
    public static loadImageFile(url: string): Promise<HTMLCanvasElement> {
        return new Promise((resolve, reject) => {
            const image: HTMLImageElement = new Image();
            image.onload = () => {
                resolve(CanvasUtils.imageToCanvas(image));
            };
            image.onerror = (e: ErrorEvent) => {
                reject(e);
            };
            image.src = url;
        });
    }
}
