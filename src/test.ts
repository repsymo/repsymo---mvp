// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

// This file is required by karma.conf.js and loads recursively all the .spec
// and framework files

import { getTestBed } from "@angular/core/testing";
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from "@angular/platform-browser-dynamic/testing";
import "zone.js";
import "zone.js/testing";

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
);
