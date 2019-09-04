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
import { TimeUnitSelectorComponent } from './page/time-unit-selector/time-unit-selector.component';
import { ExampleStatementComponent } from './page/example-statement/example-statement.component';
import { TabularInputComponent } from './page/tabular-input/tabular-input.component';
import { OptionsBarComponent } from './page/options-bar/options-bar.component';
import { TabularOutputComponent } from './page/tabular-output/tabular-output.component';
import { ChainsResultComponent } from './page/chains-result/chains-result.component';
import { InputPaneComponent } from './page/input-pane/input-pane.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/wm',
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
    InputPaneComponent
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