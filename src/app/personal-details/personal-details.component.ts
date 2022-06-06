import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  systemName!: any;
  systemMail!: any;
  systemGuid!: any;

  constructor() { }

  ngOnInit(): void {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.systemName = localStorage.getItem('systemName');
    this.systemMail = localStorage.getItem('systemMail');

  }

}
