/**
 * Immutable two dimensional vector.
 */
export class Vector2D {

    public static readonly ZERO: Vector2D = new Vector2D(0, 0);
    public static readonly ONE: Vector2D = new Vector2D(1, 1);

    public readonly x: number;
    public readonly y: number;

    /**
     * @param x The vector's x component.
     * @param y The vector's y component.
     */
    constructor(x: number = 0, y: number = 0) {
      this.x = x
      this.y = y
    }

    /**
     * @param v The vector to add.
     * @return A vector additive of this vector and the given vector.
     */
    public add(v: Vector2D): Vector2D;

    /**
     * @param x The x component to add.
     * @param y The y component to add.
     * @return A vector additive of this vector and the given components.
     */
    public add(x: number, y: number): Vector2D;
    public add(vectorOrX: Vector2D|number, y?: number): Vector2D {
      if (vectorOrX instanceof Vector2D) {
        return this.add(vectorOrX.x, vectorOrX.y)
      } else if (y !== undefined) {
        return new Vector2D(this.x + vectorOrX, this.y + y)
      } else {
        throw new Error(`Illegal argument y: ${y}`)
      }
    }

    /**
     * @param v The vector to subtract.
     * @return A vector differential of this vector and the given vector.
     */
    public subtract(v: Vector2D): Vector2D;

    /**
     * @param x The x component to subtract.
     * @param y The y component to subtract.
     * @return A vector differential of this vector and the given components.
     */
    public subtract(x: number, y: number): Vector2D;
    public subtract(vectorOrX: Vector2D|number, y?: number): Vector2D {
      if (vectorOrX instanceof Vector2D) {
        return this.add(-vectorOrX.x, -vectorOrX.y)
      } else if (y !== undefined) {
        return this.add(-vectorOrX, -y)
      } else {
        throw new Error(`Illegal argument y: ${y}`)
      }
    }

    /**
     * @param scalar The amount by which to scale the vector.
     * @return A scaled version of this vector.
     */
    public scale(scalar: number): Vector2D {
      return new Vector2D(this.x * scalar, this.y * scalar)
    }

    /**
     * @param digitCount The number of digits after the decimal point.
     * @return A new vector with limited digits after the decimal point.
     * @see `Number.toFixed()`
     */
    public toFixed(digitCount: number): Vector2D {
      return new Vector2D(Number.parseFloat(this.x.toFixed(digitCount)),
                            Number.parseFloat(this.y.toFixed(digitCount)))
    }

    /**
     * @return A vector copy with values passed through `Math.ceil()`.
     */
    public ceil(): Vector2D {
      return new Vector2D(Math.ceil(this.x), Math.ceil(this.y))
    }

    /**
     * @return A vector copy with values passed through `Math.floor()`.
     */
    public floor(): Vector2D {
      return new Vector2D(Math.floor(this.x), Math.floor(this.y))
    }

    /**
     * @param scalar The amount to scale the normalized vector.
     * @return A normalized version of this vector.
     */
    public normalize(scalar: number = 1): Vector2D {
      const magnitude: number = this.getMagnitude()
      return new Vector2D((this.x / magnitude) * scalar,
                            (this.y / magnitude) * scalar)
    }

    /**
     * @return The magnitude of the vector.
     */
    public getMagnitude(): number {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    /**
     * @param v The vector to compare.
     * @return If this vector's components match the given vector's components.
     */
    public equals(v: Vector2D): boolean {
      return this.x === v.x && this.y === v.y
    }

    /**
     * @override
     */
    public toString(): string {
      return `(${this.x}, ${this.y})`
    }

    // #region Static Methods

    /**
     * @param maxMagnitude The maximum magnitude of the vector to create.
     * @return A random vector limited to the maximum magnitude.
     */
    public static createRandom(maxMagnitude: number): Vector2D {
      const randomVector: Vector2D = new Vector2D(Math.random() * 2 - 1.0, Math.random() * 2 - 1.0)
      return randomVector.normalize(maxMagnitude)
    }

  // #endregion

}
