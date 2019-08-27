import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-documentation',
  templateUrl: './page-documentation.component.html',
  styleUrls: ['./page-documentation.component.css']
})
export class PageDocumentationComponent implements OnInit {

  @Input()
  items: string[];

  constructor() { }

  ngOnInit() {
  }

}
