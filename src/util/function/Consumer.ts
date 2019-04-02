export interface Consumer<T> {
    (t: T): any;
}