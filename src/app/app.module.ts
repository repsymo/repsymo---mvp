import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MrmComponent } from './page/mrm/mrm.component';
import { WmComponent } from './page/wm/wm.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ImComponent } from './page/im/im.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { PageDocumentationComponent } from './page/page-documentation/page-documentation.component';
import { TimeUnitSelectorComponent } from './page/input/time-unit-selector/time-unit-selector.component';
import { ExampleStatementComponent } from './page/example-statement/example-statement.component';
import { TabularInputComponent } from './page/input/tabular-input/tabular-input.component';
import { OptionsBarComponent } from './page/options-bar/options-bar.component';
import { TabularOutputComponent } from './page/output/tabular-output/tabular-output.component';
import { ChainsResultComponent } from './page/output/results/chains-result/chains-result.component';
import { InputPaneComponent } from './page/input/input-pane/input-pane.component';
import { ChainItemComponent } from './page/output/results/chain-item/chain-item.component';
import { TabularDynamicInputComponent } from './page/input/tabular-dynamic-input/tabular-dynamic-input.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/im',
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
    TabularDynamicInputComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }