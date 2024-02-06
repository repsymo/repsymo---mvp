// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import { Directive, OnDestroy, OnInit } from "@angular/core";
import { of, Subscription } from "rxjs";
import { ModelFile } from "../model-file";
import { IOService } from "../../service/io.service";
import {
    Example,
} from "../components/example-statement/example-statement.component";
import { APP_SEMVER, APP_VERSION } from "../../info";

@Directive()
export abstract class Page implements OnInit,
    OnDestroy {
    private readonly ioService: IOService;
    private readonly modelType: string;
    private readonly problemName: string;
    private ioSubscription: Subscription;

    protected constructor(ioService: IOService, modelLabel: string) {
        this.ioService = ioService;
        this.modelType = modelLabel;
        this.problemName = "2DP Repsymo Solver problem";
        this.ioSubscription = null;
    }

    ngOnInit() {
        let f = false; // fixes the bug of asking to save when changing from tab

        this.ioSubscription = this.ioService.io.subscribe(e => {
            if (e === null) {
                return;
            }

            switch (e.ioAction) {
                case "open":
                    this.open(e.data, e.name);
                    break;

                case "save":
                    if (!f) {
                        break;
                    }
                    this.save();
                    break;
            }
        });
        f = true;
    }

    ngOnDestroy() {
        if (this.ioSubscription) {
            this.ioSubscription.unsubscribe();
        }
    }

    abstract getModel(): object;

    abstract getExample(): Example;

    abstract loadModel(
        modelObj: object,
        fileName: string,
        statement: string,
    ): boolean;

    abstract onSolve(): void;

    abstract onReset(): void;

    private open(data: ModelFile, name: string) {
        if (data.modelType !== this.modelType) {
            return;
        }
        if (this.loadModel(data.problemModel, name, data.statement)) {
            this.onSolve();
        }
        else {
            alert(`Invalid ${ this.modelType } model`);
        }
    }

    private save() {
        const download = (json: string, name: string) => {
            const p = { userDate1: 1, userData2: 2 };

            of(p).subscribe(() => {
                const element = document.createElement("a");
                const me = new MouseEvent("click");
                const uri = encodeURIComponent(json);

                element.setAttribute(
                    "href",
                    `data:text/json;charset=UTF-8,${ uri }`,
                );
                element.setAttribute("download", name);
                element.dispatchEvent(me);
            });
        };
        const model = this.getModel();

        // The model may be empty and had returned null, don't download then
        if (model === null) {
            alert("Model is empty!");
            return;
        }
        const name = prompt("Save problem as", this.problemName);

        if (name !== null) {
            const stm = this.getExample().statement;
            const statement = prompt(
                    "Enter a problem statement (optional)",
                    stm,
                )
                || "";
            const fileObj: ModelFile = {
                appVersion: APP_SEMVER,
                modelType: this.modelType,
                statement: statement,
                problemModel: model,
            };
            const fileJSON = JSON.stringify(fileObj);

            download(fileJSON, `${ name }.ddpps`);
        }
    }
}
