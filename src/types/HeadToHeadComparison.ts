export class HeadToHeadComparison {
    run1Value?: number;
    run1DifferencePercentage?: number;
    run2Value?: number;
    run2DifferencePercentage?: number;
    unit?: string;
    lowerIsBetter?: boolean;

    compare = function(): void {
        this.run1DifferencePercentage = this.getRelativeGrowthOrDecrease(this.run1Value, this.run2Value);
        this.run2DifferencePercentage = this.getRelativeGrowthOrDecrease(this.run2Value, this.run1Value);
    }

    public get run1Label() {
        if (!this.run1Value) {
            return `!! MISSING !!`
        }
        return `${this.run1Value}${this.unit}` + (this.run1DifferencePercentage ? `(${this.run1DifferencePercentage?.toFixed(2)}%)` : '');
    }

    public get run2Label() {
        if (!this.run2Value) {
            return `!! MISSING !!`
        }
        return `${this.run2Value}${this.unit}` + (this.run2DifferencePercentage ? `(${this.run2DifferencePercentage?.toFixed(2)}%)` : '');
    }

    getRelativeGrowthOrDecrease = function(newNumber?: number, oldNumber?: number): number | null {
        if (newNumber == undefined || oldNumber == undefined) {
            return null;
        }

        // Calculate the difference between the new and old numbers
        const difference = newNumber - oldNumber;

        // Calculate the percentage change
        const percentageChange = (difference / oldNumber) * 100;

        return percentageChange;

    }

    public get isGood() {
        if (this.lowerIsBetter) {
            return this.run2DifferencePercentage < this.run1DifferencePercentage;
        }
            
        return this.run2DifferencePercentage > this.run1DifferencePercentage;     
    }
}