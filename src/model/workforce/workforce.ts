// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

/**
 * Workforce problem model.
 *
 * @author Tobias Briones
 */
export interface Workforce {
    /**
     * Amount of time (weeks, years, etc.) to count the process. It must be the
     * same as workforcePerTU length, and it must be greater than 0.
     */
    amountOfAnalysisTime: number;

    /**
     * Initial number of employees working before applying the analysis.
     */
    initialNumberOfEmployees: number;

    /**
     * Cost to pay to each employee hired for their manpower.
     */
    manpowerExcessCost: number;

    /**
     * Fixed cost for hiring a new employee. It is paid only the first time to
     * hire the employee.
     */
    newEmployeeFixedCost: number;

    /**
     * Cost to hire a new employee per time unit. For example: a employee salary
     * is $500 a week.
     */
    newEmployeePerTUCost: number;

    /**
     * Cost for firing an employee. This cost is about the benefit an employee
     * gets when he's fired.
     */
    fireEmployeeCost: number;

    /**
     * Number of employees that quit the job regularly each time unit, they
     * will
     * not get the fireEmployeeCost money so the company doesn't have to pay
     * that cost. For example: 2 employees quit each week.
     */
    quitEmployeesPerTU: number;

    /**
     * Workforce demand there is per time unit. Depends on the time analysis of
     * the problem. Each position of the array is the demand required per time
     * unit (eg. position 2: demand required for week #2).
     */
    workforcePerTU: WorkforcePerTU[];

    /**
     * Defines flags to set a value as proportional to the other value. For
     * example, the key fireEmployeeCostToCurrentStage means that the model
     * value
     * 'fireEmployeeCost' will be taken as
     * (fireEmployeeCost * 'the current stage (eg. week #1, week #4)') in the
     * computation so older employees receive more money if being fired.
     */
    // proportionalityOptions: WMProportionalityOption;
}

/**
 * Workforce required per unit of time.
 */
export interface WorkforcePerTU {
    /**
     * Position of time unit that requires that workforce. For example: the week
     * #2 needs 15 employees.
     */
    timeunit: number;

    /**
     * Workforce demand on that time unit.
     */
    workforce: number;
}

/**
 * Pair (demand, value) that is used to compare all of the cost function values
 * on each row and eventually take out the demand yielding the minimum cost.
 */
export interface CostOption {
    /**
     * Workforce assumed.
     */
    demand: number;

    /**
     * Cost evaluated on that demand.
     */
    value: number;
}

/**
 * Defines flags to set a value as proportional to the other value. For
 * example, the key fireEmployeeCostToCurrentStage means that the model value
 * 'fireEmployeeCost' will be taken as
 * (fireEmployeeCost * 'the current stage (eg. week #1, week #4)') in the
 * computation so older employees receive more money if being fired.
 */
export interface WMProportionalityOption { // Experimental
    fireEmployeeCostToCurrentStage: boolean;
}
