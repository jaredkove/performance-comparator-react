export class HeadToHeadComparison {
    run1Value?: number;
    run1Label?: string;
    run1DifferencePercentage?: number;
    run2Value?: number;
    run2Label?: string;
    run2DifferencePercentage?: number;
    unit?: string;
    lowerIsBetter?: boolean;

    getRun1DifferencePercentage = function(): number | null {
        if (this.run1Value === null || this.run2Value === null) {
            return null; // Handle null values
        }
    
        const diff = Math.abs(this.run1Value - this.run2Value);
        const avg = (this.run1Value + this.run2Value) / 2;
        return (diff / avg) * 100;
    }

    getRun2DifferencePercentage = function(): number | null {
        if (this.run1Value === null || this.run2Value === null) {
            return null; // Handle null values
        }
    
        const diff = Math.abs(this.run2Value - this.run1Value);
        const avg = (this.run2Value + this.run1Value) / 2;
        return (diff / avg) * 100;
    }
}