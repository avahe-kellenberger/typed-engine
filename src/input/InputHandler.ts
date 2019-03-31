/**
 * Handles events fired from the DOM.
 */
export interface EventHandler {
    /**
     * The event type.
     */
    readonly types: (keyof GlobalEventHandlersEventMap)[];
    /**
     * The function which handles the event.
     */
    readonly listener: EventListener;
}

/**
 * EventHandler for 'keyup' and 'keydown' events.
 */
export class KeyEventHandler implements EventHandler {
    
    public readonly types: (keyof GlobalEventHandlersEventMap)[] = ['keyup', 'keydown'];
    public readonly listener: EventListener;
    private lastEventUp: boolean|undefined;

    /**
     * @param listener The listener to invoke.
     * @param stateChangesOnly If the listener should only be invoked if the state of the key changes,
     * e.g. keydown to keyup, or keyup to keydown.
     */
    constructor(listener: EventListener, stateChangesOnly: boolean = true) {
        if (stateChangesOnly) {
            this.listener = (event) => listener(event);
        } else {
            this.listener = (event) => {
                const isEventKeyup: boolean = event.type === 'keyup';
                if (this.lastEventUp === undefined || this.lastEventUp !== isEventKeyup) { 
                    this.lastEventUp = isEventKeyup;
                    listener(event);
                }
            };
        }
    }

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
            handler.types.forEach(type => {
                this.document.addEventListener(type, handler.listener);
            });
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
            handler.types.forEach(type => {
                this.document.removeEventListener(type, handler.listener);
            });
            return true;
        }
        return false;
    }

    /**
     * Removes all event handlers.
     */
    public clearEventHandlers(): void {
        this.inputHandlers.forEach(handler => {
            handler.types.forEach(type => {
                this.document.removeEventListener(type, handler.listener);
            });
        });
    }

}