import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  selectedTab = -1;

  constructor() { }

  ngOnInit() {
  }

  onActionClick() {
    this.selectedTab = -1;
  }

  onTabSelected(index) {
    this.selectedTab = index;
  }
}
