// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-footer",
    templateUrl: "./footer.component.html",
    styleUrls: [ "./footer.component.css" ],
})
export class FooterComponent implements OnInit {
    readonly copyright: string;

    constructor() {
        this.copyright = `© 2019-2024 Tobias Briones.`;
    }

    ngOnInit() {}
}
