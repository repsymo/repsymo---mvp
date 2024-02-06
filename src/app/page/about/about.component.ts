// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import { Component, OnInit } from "@angular/core";
import { APP_VERSION_LABEL } from "../../../info";

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: [ "./about.component.css" ],
})
export class AboutComponent implements OnInit {
    readonly appName: string;
    readonly appLongName: string;
    readonly bookTaha: string;
    readonly appVersionLabel = APP_VERSION_LABEL;

    constructor() {
        this.appName = "Repsymo™";
        this.appLongName = "Representational System Modeling";
        this.bookTaha = "OPERATIONS RESEARCH AN INTRODUCTION Hamdy A. Taha";
    }

    ngOnInit() {}
}
