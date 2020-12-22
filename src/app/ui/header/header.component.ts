/*
 * Copyright (c) 2019-2020 Tobias Briones. All rights reserved.
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * This file is part of 2DP Repsymo Solver.
 *
 * 2DP Repsymo Solver is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * 2DP Repsymo Solver is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with 2DP Repsymo Solver.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export interface IOActionEvent {
  action: string,
  name?: string,
  data?: object
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output()
  readonly ioAction: EventEmitter<IOActionEvent>;
  routerSubscription: Subscription;
  selectedTab: number;
  private readonly router: Router;

  constructor(router: Router) {
    this.router = router;
    this.ioAction = new EventEmitter();
    this.routerSubscription = null;
    this.selectedTab = -1;
  }

  ngOnInit() {
    const f = filter(e => e instanceof NavigationEnd);
    this.routerSubscription = this.router.events.pipe(f).subscribe((e: NavigationEnd) => {
      const url = e.url;
      const routes = [
        '/im',
        '/mrm',
        '/wm'
      ];
      const index = routes.findIndex(v => v == url);
      this.selectedTab = (index != -1) ? index : this.selectedTab;
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  onActionClick(e: MouseEvent) {
    const target = e.target as HTMLElement;

    switch (target.id) {
      case 'actionOpen':
        this.setIOAction('open');
        break;

      case 'actionSave':
        this.setIOAction('save');
        break;

      case 'actionAbout':
        this.selectedTab = -1;
        break;
    }
  }

  onTabSelected(index: number) {
    this.selectedTab = index;
  }

  private setIOAction(action: string) {
    if (action == 'open') {
      const inputEl = document.createElement('input');

      inputEl.setAttribute('type', 'file');
      inputEl.setAttribute('accept', '.ddpps');
      inputEl.addEventListener('change', (e: any) => {
        if (e.target.files && e.target.files[0]) {
          const getName = (): string => {
            let a: string = e.target.files[0].name;

            if (a.lastIndexOf('.') != -1) {
              a = a.substring(0, a.lastIndexOf('.'));
            }
            return a;
          };
          const reader = new FileReader();
          const name = getName();

          reader.onload = (le: any) => {
            try {
              const object = JSON.parse(le.target.result);
              const event: IOActionEvent = {
                action: 'open',
                name: name,
                data: object
              };

              this.ioAction.emit(event);
            }
            catch (error) {
              alert('Invalid file. ' + error);
            }
          };
          reader.readAsText(e.target.files[0]);
        }
      });
      inputEl.click();
    }
    else {
      const event: IOActionEvent = {
        action: 'save'
      };

      this.ioAction.emit(event);
    }
  }

}
