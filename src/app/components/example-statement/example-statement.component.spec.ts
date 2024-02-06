// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ExampleStatementComponent } from "./example-statement.component";

describe("ExampleStatementComponent", () => {
    let component: ExampleStatementComponent;
    let fixture: ComponentFixture<ExampleStatementComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule(
            {
                declarations: [ ExampleStatementComponent ],
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExampleStatementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
