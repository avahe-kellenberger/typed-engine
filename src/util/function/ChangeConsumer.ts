/**
 * Consumes changes of a variable's value.
 */
export interface ChangeConsumer<T> {
    /**
     * @param oldValue
     * @param newValue
     */
    (oldValue: T, newValue: T): any;
}