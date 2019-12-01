import { Updatable } from '../entity/Updatable'

/**
 * A task that updates until completion.
 */
export class Task implements Updatable {

    private readonly updatable: Updatable;
    private readonly completionCondition: () => boolean;
    private readonly onCompleted?: (totalElaspedTime: number) => void;

    private completed: boolean;
    private elapsedTime: number;

    /**
     * Defines a task that is updated until a condition is met.
     * @param updatable The object to update.
     * @param completionCondition The condition which marks the completion of the task.
     * @param onCompleted The function called when the task has been completed.
     */
    constructor(updatable: Updatable,
                completionCondition: () => boolean,
                onCompleted?: (totalElaspedTime: number) => void) {
        this.updatable = updatable
        this.completionCondition = completionCondition
        this.onCompleted = onCompleted
        this.completed = false
        this.elapsedTime = 0
    }

    /**
     * @returns If the task has completed.
     */
    public hasCompleted(): boolean {
        return this.completed
    }

    /**
     * Changes the completed state of the task.
     * @param completed If the task should be set as completed or not.
     */
    public setCompleted(completed: boolean): void {
        this.completed = completed
    }

    /**
     * @returns The collective elasped time the task has been updated with (see `Updatable`).
     */
    public getElapsedTime(): number {
        return this.elapsedTime
    }

    /**
     * Sets the amount of time that has been elapsed since the task was first updated.
     * This will not changed the completed state of the task (see `Task.setCompleted`).
     * @param elapsedTime The time elapsed.
     */
    public setElapsedTime(elapsedTime: number): void {
        this.elapsedTime = elapsedTime
    }

    /**
     * @override
     */
    public update(elapsedTime: number): void {
        if (this.completed) {
            throw new Error('The task has completed, therefore it cannot be updated.')
        }
        this.setElapsedTime(this.elapsedTime + elapsedTime)
        this.updatable.update(elapsedTime)
        if (this.completionCondition()) {
            this.completed = true
            if (this.onCompleted != null) {
                this.onCompleted(this.elapsedTime)
            }
        }
    }

}