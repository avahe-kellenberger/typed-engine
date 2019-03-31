/**
 * Handles events fired from the DOM.
 */
export interface EventHandler {
    /**
     * The event type.
     */
    readonly type: keyof GlobalEventHandlersEventMap;
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
    private readonly inputHandlers: Set<EventHandler>;

    /**
     * Attaches the handler to the given document.
     * @param document The document on which to listen for input events.
     */
    constructor(document: HTMLDocument) {
        this.document = document;
        this.inputHandlers = new Set();
    }

    /**
     * Adds an `EventHandler` to the DOM.
     * @param handler The event handler.
     * @return If the event handler had not already been added.
     */
    public addEventHandler(handler: EventHandler): boolean {
        if (this.inputHandlers.size !== this.inputHandlers.add(handler).size) {
            this.document.addEventListener(handler.type, handler.listener);
            return true;
        }
        return false;
    }

    /**
     * Removes an `EventHandler` from the DOM.
     * @param handler The event handler.
     * @return If the event handler had already been added. 
     */
    public removeEventHandler(handler: EventHandler): boolean {
        if (this.inputHandlers.delete(handler)) {
            this.document.removeEventListener(handler.type, handler.listener);
            return true;
        }
        return false;
    }

    /**
     * Removes all event handlers.
     */
    public clearEventHandlers(): void {
        this.inputHandlers.forEach(handler => {
            this.document.removeEventListener(handler.type, handler.listener);
        });
    }

}