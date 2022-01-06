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

import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface IOActionEvent {
  action: string;
  name?: string;
  data?: object;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,
                                        OnDestroy {
  @Output()
  readonly ioAction: EventEmitter<IOActionEvent>;
  private readonly router: Router;
  routerSubscription: Subscription;
  selectedTab: number;

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
      const index = routes.findIndex(v => v === url);
      this.selectedTab = (index !== -1) ? index : this.selectedTab;
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
    if (action === 'open') {
      const inputEl = document.createElement('input');

      inputEl.setAttribute('type', 'file');
      inputEl.setAttribute('accept', '.ddpps');
      inputEl.addEventListener('change', (e: any) => {
        if (e.target.files && e.target.files[0]) {
          const getName = (): string => {
            let a: string = e.target.files[0].name;

            if (a.lastIndexOf('.') !== -1) {
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
