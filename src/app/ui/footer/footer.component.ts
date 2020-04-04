import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  readonly copyright: string;
  
  constructor() {
    this.copyright = '© 2019-2020 Tobias Briones';
  }
  
  ngOnInit() {
  }
  
}
