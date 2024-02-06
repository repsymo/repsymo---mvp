// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-tabular-dynamic-input",
    templateUrl: "./tabular-dynamic-input.component.html",
    styleUrls: [ "./tabular-dynamic-input.component.css" ],
})
export class TabularDynamicInputComponent implements OnInit {
    readonly keys: any;

    @Input()
    rkey: string;

    @Input()
    header: string[];

    @Input()
    rows: object[];

    constructor() {
        this.keys = Object.keys;
    }

    ngOnInit() {}
}
