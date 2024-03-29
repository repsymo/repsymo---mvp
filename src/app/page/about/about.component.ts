// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import { Component, OnInit } from "@angular/core";
import { VERSION } from "../../../main";

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: [ "./about.component.css" ],
})
export class AboutComponent implements OnInit {
    private static readonly STR: object = {
        appName: "2DP Repsymo™ Solver",
        appLongName: "Deterministic Dynamic Programming Repsymo Solver",
        aboutMsg: `This app implements several deterministic dynamic programming models to solve a
              considerable amount of real world problems in operations research.`,
        contributionMsg: `2DP Repsymo Solver is open source software licensed under the GPLv3.0 license. Don't
                      hesitate to get in touch if you are interested in these models or wish to
                      extend the application for personal or educational usage.`,
        educationMsg: `This app is also intended to improve the teaching of operations research and
                  make experimental studies of math solvers, CAS, arbitrarily complex systems. This is in order
                  to get the system model solver at production level as a long term project.`,
        referencesMsg: `For a general reference about the 2DP models check `,
    };
    readonly appVersion: string;
    readonly appName: string;
    readonly appLongName: string;
    readonly aboutMsg: string;
    readonly contributionMsg: string;
    readonly educationMsg: string;
    readonly referencesMsg: string;
    readonly bookTaha: string;

    constructor() {
        this.appVersion = VERSION;
        this.appName = AboutComponent.STR["appName"];
        this.appLongName = AboutComponent.STR["appLongName"];
        this.aboutMsg = AboutComponent.STR["aboutMsg"];
        this.contributionMsg = AboutComponent.STR["contributionMsg"];
        this.educationMsg = AboutComponent.STR["educationMsg"];
        this.referencesMsg = AboutComponent.STR["referencesMsg"];
        this.bookTaha = "OPERATIONS RESEARCH AN INTRODUCTION Hamdy A. Taha";
    }

    ngOnInit() {}
}
