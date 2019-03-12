import { ILocatable } from '../../entity/Locatable';
import { Vector2D } from '../Vector2D';

/**
 * Immutable rectangle implementation.
 */
export class Rectangle implements ILocatable {
    
    private readonly center: Vector2D;
    private readonly size: Vector2D;
    private readonly halfSize: Vector2D;

    /**
     * 
     * @param topLeft The rectangle's top left location.
     * @param size The size of the rectangle.
     */
    constructor(topLeft: Vector2D, size: Vector2D);
    
    /**
     * 
     * @param topLeft The rectangle's top left location.
     * @param width The rectangle's width.
     * @param height The rectangle's height.
     */
    constructor(topLeft: Vector2D, width: number, height: number);
    
    /**
     * Overload constructor.
     */
    constructor(topLeft: Vector2D, sizeOrWidth: Vector2D|number, height?: number) {
        this.center = topLeft;
        if (sizeOrWidth instanceof Vector2D) {
            this.size = sizeOrWidth;
            this.halfSize = sizeOrWidth.scale(0.5);
        } else if (height !== undefined) {
            this.size = new Vector2D(sizeOrWidth, height);
            this.halfSize = this.size.scale(0.5);
        } else {
            throw new Error(`Illegal argument height: ${height}`);
        }
    }

    /**
     * @override
     */
    public getLocation(): Vector2D {
        return this.center;
    }

    /**
     * @return The leftmost point of the rectangle.
     */
    public getLeft(): number {
        return this.center.x - this.halfSize.x;
    }

    /**
     * @return The rightmost point of the rectangle.
     */
    public getRight(): number {
        return this.center.x + this.halfSize.x;
    }

    /**
     * @return The topmost point of the rectangle.
     */
    public getTop(): number {
        return this.center.y - this.halfSize.y;
    }

    /**
     * @return The bottommost point of the rectangle.
     */
    public getBottom(): number {
        return this.center.y + this.halfSize.y;
    }

    /**
     * @return This rectangle's top left location.
     */
    public getTopLeft(): Vector2D {
        return this.center.add(this.halfSize);
    }

    /**
     * @return This rectangle's top right location.
     */
    public getTopRight(): Vector2D {
        return this.center.add(this.halfSize.x, -this.halfSize.y);
    }
    
    /**
     * @return The rectangle's center location.
     *         This method is the same as Rectangle.getLocation().
     */
    public getCenter(): Vector2D {
        return this.getLocation();
    }

    /**
     * @return This rectangle's bottom left location.
     */
    public getBottomLeft(): Vector2D {
        return this.center.add(-this.halfSize.x, this.halfSize.y);
    }

    /**
     * @return This rectangle's bottom right location.
     */
    public getBottomRight(): Vector2D {
        return this.center.add(this.halfSize);
    }

    /**
     * @return The half-size of the rectangle.
     */
    public getHalfSize(): Vector2D {
        return this.halfSize;
    }
    
    /**
     * @return The size of the rectangle.
     */
    public getSize(): Vector2D {
        return this.size;
    }

    /**
     * @return The width of the rectangle.
     */
    public getWidth(): number {
        return this.size.x;
    }

    /**
     * @return The height of the rectangle.
     */
    public getHeight(): number {
        return this.size.y;
    }

    /**
     * @param point The point to check.
     * @return If the point lies within the rectangle.
     */
    public contains(point: Vector2D): boolean {
        const distance: Vector2D = this.center.subtract(point);
        return distance.x <= this.halfSize.x && distance.y <= this.halfSize.y;
    }

}