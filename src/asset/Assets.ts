export class Assets {

    /**
     * Loads an image with the given URL.
     * @param url The URL of the image.
     */
    public static loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image: HTMLImageElement = new Image();
            image.onload = () => {
                resolve(image);
            };
            image.onerror = (e: ErrorEvent) => {
                reject(e);
            };
            image.src = url;
        });
    }

}