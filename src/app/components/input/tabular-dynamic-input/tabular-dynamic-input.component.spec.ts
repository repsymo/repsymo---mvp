// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import {
    TabularDynamicInputComponent,
} from "./tabular-dynamic-input.component";

describe("TabularDynamicInputComponent", () => {
    let component: TabularDynamicInputComponent;
    let fixture: ComponentFixture<TabularDynamicInputComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ TabularDynamicInputComponent ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TabularDynamicInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
