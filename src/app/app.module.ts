import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MrmComponent } from './mrm/mrm.component';
import { WmComponent } from './wm/wm.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ImComponent } from './im/im.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { PageDocumentationComponent } from './page-documentation/page-documentation.component';
import { TimeUnitSelectorComponent } from './time-unit-selector/time-unit-selector.component';
import { ExampleStatementComponent } from './example-statement/example-statement.component';

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
    ExampleStatementComponent
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