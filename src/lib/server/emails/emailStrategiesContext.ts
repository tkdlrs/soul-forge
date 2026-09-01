/**
 *
 **/
// The contract every strategy must follow
export interface FormatEmailStrategy<T> {
    format(data: T): string;
}
// Context class that consumes a strategy
export class EmailStrategyContext<T> {
    constructor(private strategy: FormatEmailStrategy<T>) {}
    //
    setStrategy(strategy: FormatEmailStrategy<T>): void {
        this.strategy = strategy;
    }
    //
    format(data: T): string {
        return this.strategy.format(data);
    }
}

//
