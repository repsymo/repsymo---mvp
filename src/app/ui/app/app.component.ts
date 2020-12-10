/*
 * Copyright (C) 2019-2020 Tobias Briones. All rights reserved.
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

import { Component, OnInit } from '@angular/core';
import { IOActionEvent } from '../header/header.component';
import { DDPPS, DDPPSFile } from '../../model/DDPPSolverFile';
import { IOEvent, IoService } from '../service/io/io.service';
import { WmComponent } from '../page/wm/wm.component';
import { Router } from '@angular/router';
import { ImComponent } from '../page/im/im.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private readonly router: Router;
  private readonly ioService: IoService;

  constructor(router: Router, ioService: IoService) {
    this.router = router;
    this.ioService = ioService;
  }

  ngOnInit() {
  }

  onIOAction(e: IOActionEvent) {
    switch (e.action) {
      case 'open':
        // Shallow validation
        if (!DDPPS.validate(e.data)) {
          alert('Invalid file');
          return;
        }
        this.openFile(e.data as DDPPSFile, e.name);
        break;

      case 'save':
        if (this.router.url == '/mrm') {
          alert('Saving not available yet for MRM');
          break;
        }
        this.ioService.io.next({ ioAction: 'save' });
        break;
    }
  }

  private openFile(file: DDPPSFile, name: string) {
    const event: IOEvent = {
      ioAction: 'open',
      name: name,
      data: file
    };
    const url = this.router.url;
    const fromModelTypeToURL = (): string => {
      const routes = [
        '/im',
        '/mrm',
        '/wm'
      ];
      const values = [
        ImComponent.MODEL_TYPE,
        '',
        WmComponent.MODEL_TYPE
      ];
      const index = values.findIndex(v => v == file.modelType);
      return routes[index];
    };
    const properURL = fromModelTypeToURL();

    if (url != properURL) {
      this.router.navigateByUrl(properURL).then(() => {
        this.ioService.io.next(event);
      });
      return;
    }
    this.ioService.io.next(event);
  }

}
