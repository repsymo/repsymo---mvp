// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { TabularOutputComponent } from "./tabular-output.component";

describe("TabularOutputComponent", () => {
    let component: TabularOutputComponent;
    let fixture: ComponentFixture<TabularOutputComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ TabularOutputComponent ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TabularOutputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
