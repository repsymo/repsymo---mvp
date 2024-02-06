// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { MrmComponent } from "./mrm.component";

describe("MrmComponent", () => {
    let component: MrmComponent;
    let fixture: ComponentFixture<MrmComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ MrmComponent ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MrmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
