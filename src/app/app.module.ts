/*
 * Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * This file is part of 2DP Repsymo Solver.
 *
 * This source code is licensed under the GNU General Public License v3.0 or
 * later License found in the LICENSE file in the root directory of this source
 * tree or at https://opensource.org/licenses/GPL-3.0.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './page/about/about.component';
import {
  ExampleStatementComponent
} from './components/example-statement/example-statement.component';
import { ImComponent } from './page/im/im.component';
import {
  InputPaneComponent
} from './components/input/input-pane/input-pane.component';
import {
  TabularDynamicInputComponent
} from './components/input/tabular-dynamic-input/tabular-dynamic-input.component';
import {
  TabularInputComponent
} from './components/input/tabular-input/tabular-input.component';
import {
  TimeUnitSelectorComponent
} from './components/input/time-unit-selector/time-unit-selector.component';
import { MrmComponent } from './page/mrm/mrm.component';
import {
  OptionsBarComponent
} from './components/options-bar/options-bar.component';
import {
  ChainItemComponent
} from './components/output/results/chain-item/chain-item.component';
import {
  ChainsResultComponent
} from './components/output/results/chains-result/chains-result.component';
import {
  TabularOutputComponent
} from './components/output/tabular-output/tabular-output.component';
import {
  PageDocumentationComponent
} from './components/page-documentation/page-documentation.component';
import { WmComponent } from './page/wm/wm.component';
import { UncertaintyComponent } from './page/uncertainty/uncertainty.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/about',
    pathMatch: 'full'
  },
  {
    path: 'im',
    component: ImComponent
  },
  {
    path: 'mrm',
    component: MrmComponent
  },
  {
    path: 'wm',
    component: WmComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'uncertainty',
    component: UncertaintyComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MrmComponent,
    WmComponent,
    HeaderComponent,
    FooterComponent,
    ImComponent,
    AboutComponent,
    PageDocumentationComponent,
    TimeUnitSelectorComponent,
    ExampleStatementComponent,
    TabularInputComponent,
    OptionsBarComponent,
    TabularOutputComponent,
    ChainsResultComponent,
    InputPaneComponent,
    ChainItemComponent,
    TabularDynamicInputComponent,
    UncertaintyComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    BrowserModule,
    FormsModule,
    ServiceWorkerModule.register(
      'ngsw-worker.js',
      { enabled: environment.production }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
