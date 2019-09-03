import { Component, OnInit } from '@angular/core';
import { IOActionEvent } from './header/header.component';
import { DDPPS, DDPPSFile } from './model/DDPPSolverFile';
import { IoService, IOEvent } from './io.service';
import { WmComponent } from './page/wm/wm.component';
import { Router } from '@angular/router';

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
  
  private openFile(file: DDPPSFile, name: string) {
    const event: IOEvent = {
      ioAction: 'open',
      name: name,
      data: file
    }
    const url = this.router.url;
    const fromModelTypeToURL = (): string => {
      const routes = [
        '/im',
        '/mrm',
        '/wm'
      ];
      const values = [
        '',
        '',
        WmComponent.MODEL_TYPE
      ];
      const index = values.findIndex(v => v == file.modelType);
      return routes[index];
    }
    const properURL = fromModelTypeToURL();
    
    if(url != properURL) {
      this.router.navigateByUrl(properURL).then(() => {
        this.ioService.io.next(event);
      });
      return;
    }
    this.ioService.io.next(event);
  }
  
  ngOnInit() {}
  
  onIOAction(e: IOActionEvent) {
    switch(e.action) {
      case 'open':
        // Shallow validation
        if(!DDPPS.validate(e.data)) {
          alert('Invalid file');
          return;
        }
        this.openFile(e.data as DDPPSFile, e.name);
        break;
      
      case 'save':
        this.ioService.io.next({ ioAction: 'save' });
        break;
    }
  }
  
}