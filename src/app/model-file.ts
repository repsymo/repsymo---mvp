// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import { ImComponent } from "./page/im/im.component";
import { WmComponent } from "./page/wm/wm.component";

export interface ModelFile {
    appVersion: string;
    modelType: string;
    statement: string;
    problemModel: object;
}

export class DefaultModelFile implements ModelFile {
    private static readonly MODEL_TYPES: string[] = [
        ImComponent.MODEL_TYPE,
        WmComponent.MODEL_TYPE,
    ];
    public readonly appVersion: string;
    public readonly modelType: string;
    public readonly statement: string;
    public readonly problemModel: object;

    constructor(
        appVersion: string,
        modelType: string,
        statement: string,
        problemModel: object,
    ) {
        this.appVersion = appVersion;
        this.modelType = modelType;
        this.statement = statement;
        this.problemModel = problemModel;
    }

    public static validate(data: object): boolean {
        // Shallow check
        const member = "appVersion" in data
            && "modelType" in data
            && "statement" in data
            && "problemModel" in data;

        if (!member) {
            return false;
        }
        const ddpps = data as DefaultModelFile;

        // Check model type (investment, workforce, etc)
        if (DefaultModelFile.MODEL_TYPES.findIndex(v => v === ddpps.modelType) === -1) {
            return false;
        }
        return true;
    }
}
