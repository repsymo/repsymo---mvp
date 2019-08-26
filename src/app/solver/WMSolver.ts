export interface WorkforcePerWeek {
    week: number,
    workforce: number
}

export interface Model {
    manpowerExcessCost: number,
    newEmployeeFixedCost: number,
    newEmployeePerWeekCost: number,
    workforceWeeks: WorkforcePerWeek[]
}

export interface CostOption {
    demand: number,
    value: number
}

export interface StageRow {
    /**
     * x_(i-1)
     */
    previousX: number,
    cost,
    
    /**
     * Cost function on that row
     */
    f: number,
    
    /**
     * x value for that row
     */
    x: number
}

export interface Stage {
    week: number,
    minimumDemand: number,
    rows: StageRow[]
}

export class WMSolver {
    
    private model: Model;
    private stages: Stage[];
    private max: number;
    private path: number[];
    private interpretation: string[];
    
    constructor() {
        this.reset();
    }
    
    private reset() {
        this.model = null;
        this.stages = null;
        this.max = -1;
        this.path = [];
        this.interpretation = [];
    }
    
    private solveStage = (stage: Stage) => {
        const week: number = stage.week;
        const minimumDemand = this.model.workforceWeeks[week].workforce;
        const C1 = this.model.manpowerExcessCost;
        const C2 = this.model.newEmployeePerWeekCost;
        const C3 = this.model.newEmployeeFixedCost;
        const isHiringNewEmployees = (_x: number, demand: number): boolean => {
            // New employees are hired for this week iff the number of employees from the
            // previous week is less than those of this week
            return _x < demand;
        }
        const getOptionValueAt = (demand: number): number => {
            // Cero by definition for the last week
            if(week >= this.stages.length - 1) return 0;
            const nextStage: Stage = this.stages[week + 1];
            const lookupRow: StageRow = nextStage.rows.find(row => row.previousX == demand);
            return lookupRow.f;
        }
        const calculateCost = (demand: number, _x: number): number => {
            // Calculate the cost for the cost options array
            // If this stage is hiring new employees then sum up the cost of hiring
            const hasNewEmployees = isHiringNewEmployees(_x, demand);
            const newStaffCost = (hasNewEmployees) ? C3 + C2 * (demand - _x) : 0;
            const f_ = getOptionValueAt(demand);
            return C1 * (demand - minimumDemand) + newStaffCost + f_;
        }
        const getMinimum = (options: CostOption[]): CostOption => {
            let smallest: number = Number.POSITIVE_INFINITY;
            let smallestValue: CostOption = null;
            
            options.forEach(option => {
                if(option.value < smallest) {
                    smallest = option.value;
                    smallestValue = option;
                }
            })
            return smallestValue;
        }
        console.log(`Solving STAGE ${week}`);
        
        
        stage.rows.forEach((row, index) => {
            const _x = row.previousX;
            const options: CostOption[] = [];
            
            // Check each value for each row and so compute the minimum of the options
            for(let b = minimumDemand; b <= this.max; b++) {
                options.push({
                    demand: b,
                    value: calculateCost(b, _x)
                });
            }
            console.log(`Options for stage ${week} row ${_x}: `);
            console.log(options);
            
            const minCost: CostOption = getMinimum(options);
            row.cost = JSON.stringify(options);
            row.f = minCost.value;
            row.x = minCost.demand;
            
        });
        console.log("------------------------------------------------------------------");
        console.log();
    }
    
    private findResultPathAndInterpretation() {
        const path: number[] = [];
        const interpretation: string[] = [];
        const weeks = this.model.workforceWeeks.length;
        let row = 0;
        let last = this.stages[weeks - 1].rows[row].x;
        
        path.push(last);
        interpretation.push(`Hire ${last} employees`);
        
        // The array is reversed so start from the second stage
        for(let stageIndex = weeks - 2; stageIndex >= 0; stageIndex--) {
            const stage = this.stages[stageIndex];
            const row = stage.rows.find(row => row.previousX == last);
            let interpretationStr = '';
            
            if(row.x < last) {
                interpretationStr = `Fire ${last - row.x} employees`;
            }
            else if(row.x > last) {
                interpretationStr = `Hire ${row.x - last} employees`;
            }
            else {
                interpretationStr = `It doesn't change`;
            }
            last = row.x;
            
            path.push(last);
            interpretation.push(interpretationStr);
        }
        this.path = path;
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
    
    getInterpretation(): string[] {
        return this.interpretation;
    }
    
    solve(problemModel: Model) {
        this.reset();
        this.model = problemModel;
        this.stages = [];
        this.max = Math.max.apply(null, problemModel.workforceWeeks.map(v => v.workforce));
        const weeks = problemModel.workforceWeeks.length;
        
        let previousXStart = 0;
        let previousXEnd = 0;
        
        // Initialize stages
        for(let stage = 0; stage < weeks; stage++) {
            const rows: StageRow[] = [];
            
            for(let _x = previousXStart; _x <= previousXEnd; _x++) {
                rows.push({
                   previousX: _x,
                   cost: 0,
                   f: 0,
                   x: 0
                });
            }
            this.stages.push({
               week: stage,
               minimumDemand: problemModel.workforceWeeks[stage].workforce,
               rows: rows
            });
            previousXStart = problemModel.workforceWeeks[stage].workforce;
            previousXEnd = this.max;
        }
        
        // Solve stages
        for(let stageIndex = weeks - 1; stageIndex >= 0; stageIndex--) {
            this.solveStage(this.stages[stageIndex]);
        }
        this.stages.reverse();
        this.findResultPathAndInterpretation();
        console.log(this.findResultPathAndInterpretation());
        
    }
    
}