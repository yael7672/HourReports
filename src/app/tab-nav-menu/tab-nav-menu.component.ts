import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab-nav-menu',
  templateUrl: './tab-nav-menu.component.html',
  styleUrls: ['./tab-nav-menu.component.css']
})
export class TabNavMenuComponent implements OnInit {
@Input() tabLink:any 

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
