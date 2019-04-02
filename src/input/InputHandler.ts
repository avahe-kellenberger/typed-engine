/**
 * Handles events fired from the DOM.
 */
export interface EventHandler {
    /**
     * The event type(s).
     */
    readonly types: ReadonlyArray<keyof GlobalEventHandlersEventMap>;
    /**
     * The function which handles the event.
     */
    readonly listener: EventListener;
}

/**
 * Handles DOM input events.
 */
export class InputHandler {

    private readonly document: Document;
    private readonly eventHandlers: Set<EventHandler>;

    /**
     * Attaches the handler to the given document.
     * @param document The document on which to listen for input events.
     */
    constructor(document: HTMLDocument) {
        this.document = document;
        this.eventHandlers = new Set();
    }

    /**
     * Adds an `EventHandler` to the DOM.
     * @param handler The event handler.
     * @return If the event handler had not already been added.
     */
    public addEventHandler(handler: EventHandler): boolean {
        if (this.eventHandlers.size === this.eventHandlers.add(handler).size) {
            return false;
        }
        handler.types.forEach(type => {
            this.document.addEventListener(type, handler.listener);
        });
        return true;
    }

    /**
     * Removes an `EventHandler` from the DOM.
     * @param handler The event handler.
     * @return If the event handler had already been added. 
     */
    public removeEventHandler(handler: EventHandler): boolean {
        if (!this.eventHandlers.delete(handler)) {
            return false;
        }
        handler.types.forEach(type => {
            this.document.removeEventListener(type, handler.listener);
        });
        return true;
    }

    /**
     * Removes all event handlers.
     */
    public clearEventHandlers(): void {
        this.eventHandlers.forEach(handler => {
            handler.types.forEach(type => {
                this.document.removeEventListener(type, handler.listener);
            });
        });
    }

}