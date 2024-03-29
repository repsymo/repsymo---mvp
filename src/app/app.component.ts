// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DefaultModelFile, ModelFile } from "./model-file";
import { IOActionEvent } from "./header/header.component";
import { ImComponent } from "./page/im/im.component";
import { WmComponent } from "./page/wm/wm.component";
import { IOEvent, IOService } from "../service/io.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: [ "./app.component.css" ],
})
export class AppComponent implements OnInit {
    private readonly router: Router;
    private readonly ioService: IOService;

    constructor(router: Router, ioService: IOService) {
        this.router = router;
        this.ioService = ioService;
    }

    ngOnInit() {}

    onIOAction(e: IOActionEvent) {
        switch (e.action) {
            case "open":
                // Shallow validation
                if (!DefaultModelFile.validate(e.data)) {
                    alert("Invalid file");
                    return;
                }
                this.openFile(e.data as ModelFile, e.name);
                break;

            case "save":
                if (this.router.url === "/mrm") {
                    alert("Saving not available yet for MRM");
                    break;
                }
                this.ioService.io.next({ ioAction: "save" });
                break;
        }
    }

    private openFile(file: ModelFile, name: string) {
        const event: IOEvent = {
            ioAction: "open",
            name: name,
            data: file,
        };
        const url = this.router.url;
        const fromModelTypeToURL = (): string => {
            const routes = [
                "/im",
                "/mrm",
                "/wm",
            ];
            const values = [
                ImComponent.MODEL_TYPE,
                "",
                WmComponent.MODEL_TYPE,
            ];
            const index = values.findIndex(v => v === file.modelType);
            return routes[index];
        };
        const properURL = fromModelTypeToURL();

        if (url !== properURL) {
            this.router.navigateByUrl(properURL).then(() => {
                this.ioService.io.next(event);
            });
            return;
        }
        this.ioService.io.next(event);
    }
}
