export interface WorkforcePerTU {
    timeunit: number;
    workforce: number;
}
// TU = Time Unit (s)
export interface Model {
    manpowerExcessCost: number;
    newEmployeeFixedCost: number;
    newEmployeePerTUCost: number;
    initialNumberOfEmployees: number;
    fireEmployeeCost: number;
    quitEmployees: number;
    workforcePerTU: WorkforcePerTU[];
}

export interface CostOption {
    demand: number;
    value: number;
}

export interface StageRow {
    /**
     * x_(i-1)
     */
    previousX: number;

    /**
     * Options for cost formatted as JSON array
     */
    cost: string;

    /**
     * Cost function on that row
     */
    f: number;

    /**
     * x value for that row
     */
    x: number;
}

export interface Stage {
    id: number;
    minimumDemand: number;
    rows: StageRow[];
}

export class WMSolver {

    private model: Model;
    private stages: Stage[];
    private max: number;
    private path: number[];
    private cost: number[];
    private interpretation: string[];

    constructor() {
        this.reset();
    }

    private reset() {
        this.model = null;
        this.stages = null;
        this.max = -1;
        this.path = [];
        this.cost = [];
        this.interpretation = [];
    }

    private solveStage = (stage: Stage) => {
        const stageId: number = stage.id;
        const minimumDemand = this.model.workforcePerTU[stageId].workforce;
        const C1 = this.model.manpowerExcessCost;
        const C2 = this.model.newEmployeePerTUCost;
        const C3 = this.model.newEmployeeFixedCost;
        const F = this.model.fireEmployeeCost;
        const isHiringNewEmployees = (_x: number, demand: number): boolean => {
            // New employees are hired for this TU iff the number of employees from the
            // previous TU is less than those of this TU
            return _x < demand;
        };
        const isFiringExistingEmployees = (_x: number, demand: number): boolean => {
            return demand < _x;
        };
        const getOptionValueAt = (demand: number): number => {
            // Cero by definition for the last stage
            if (stageId >= this.stages.length - 1) { return 0; }
            const nextStage: Stage = this.stages[stageId + 1];
            const lookupRow: StageRow = nextStage.rows.find(row => row.previousX == demand);
            return lookupRow.f;
        };
        const calculateCost = (demand: number, _x: number): number => {
            // Calculate the cost for the cost options array
            // If this stage is hiring new employees then sum up the cost of hiring
            const hasNewEmployees = isHiringNewEmployees(_x, demand);
            const hasToFireEmployees = isFiringExistingEmployees(_x, demand);
            const newStaffCost = (hasNewEmployees) ? C3 + C2 * (demand - _x) : 0;
            const firingCost = (hasToFireEmployees) ? F * (_x - demand) : 0;
            const f_ = getOptionValueAt(demand);
            return C1 * (demand - minimumDemand) + newStaffCost + firingCost + f_;
        };
        const getMinimum = (options: CostOption[]): CostOption => {
            let smallest: number = Number.POSITIVE_INFINITY;
            let smallestValue: CostOption = null;

            options.forEach(option => {
                if (option.value < smallest) {
                    smallest = option.value;
                    smallestValue = option;
                }
            });
            return smallestValue;
        };

        stage.rows.forEach(row => {
            // Substract the number of employees who just quited the job
            const _x = row.previousX - this.model.quitEmployees;
            const options: CostOption[] = [];

            // Check each value for each row and so compute the minimum of the options
            for (let b = minimumDemand; b <= this.max; b++) {
                options.push({
                    demand: b,
                    value: calculateCost(b, _x)
                });
            }
            const minCost: CostOption = getMinimum(options);
            row.cost = JSON.stringify(options);
            row.f = minCost.value;
            row.x = minCost.demand;
        });
    }

    private findResultPathCostAndInterpretation() {
        const path: number[] = [];
        const cost: number[] = [];
        const interpretation: string[] = [];
        const timeunits = this.model.workforcePerTU.length;
        const getInterpretationAt = (row: StageRow): string => {
            if (row.x < row.previousX) {
                return `Fire ${row.previousX - row.x} employees`;
            } else if (row.x > row.previousX) {
                return `Hire ${row.x - row.previousX} employees`;
            }
            return `It doesn't change`;
        };
        const getF_ = (i: number, demand: number): number => {
            if (i == 0) { return 0; } // Last stage
            const nextStage: Stage = this.stages[i - 1];
            const lookupRow: StageRow = nextStage.rows.find(row => row.previousX == demand);
            return lookupRow.f;
        };
        // Create this initial row to start iterating next
        let row: StageRow = {
            previousX: -1,
            cost: null,
            f: -1,
            x: this.stages[timeunits - 1].rows[0].previousX
        };

        // The array is reversed so start from the first stage
        for (let stageIndex = timeunits - 1; stageIndex >= 0; stageIndex--) {
            const stage = this.stages[stageIndex];
            row = stage.rows.find(v => v.previousX == row.x);

            path.push(row.x);
            cost.push(row.f - getF_(stageIndex, row.x));
            interpretation.push(getInterpretationAt(row));
        }
        this.path = path;
        this.cost = cost;
        this.interpretation = interpretation;
    }

    getModel(): Model {
        return this.model;
    }

    getStages(): Stage[] {
        return this.stages;
    }

    getPath(): number[] {
        return this.path;
    }

    getCost(): number[] {
        return this.cost;
    }

    getInterpretation(): string[] {
        return this.interpretation;
    }

    solve(problemModel: Model) {
        this.reset();
        this.model = problemModel;
        this.stages = [];
        this.max = Math.max.apply(null, problemModel.workforcePerTU.map(v => v.workforce));
        const timeunits = problemModel.workforcePerTU.length;
        const initStages = () => {
            let previousXStart = problemModel.initialNumberOfEmployees;
            let previousXEnd = problemModel.initialNumberOfEmployees;

            for (let stage = 0; stage < timeunits; stage++) {
                const rows: StageRow[] = [];

                for (let _x = previousXStart; _x <= previousXEnd; _x++) {
                    rows.push({
                        previousX: _x,
                        cost: '',
                        f: 0,
                        x: 0
                    });
                }
                this.stages.push({
                    id: stage,
                    minimumDemand: problemModel.workforcePerTU[stage].workforce,
                    rows
                });
                previousXStart = problemModel.workforcePerTU[stage].workforce;
                previousXEnd = this.max;
            }
        };
        const solveStages = () => {
            for (let stageIndex = timeunits - 1; stageIndex >= 0; stageIndex--) {
                this.solveStage(this.stages[stageIndex]);
            }
        };

        initStages();
        solveStages();
        this.stages.reverse();
        this.findResultPathCostAndInterpretation();
    }

}
