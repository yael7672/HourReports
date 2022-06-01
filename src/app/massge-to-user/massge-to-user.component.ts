import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-massge-to-user',
  templateUrl: './massge-to-user.component.html',
  styleUrls: ['./massge-to-user.component.css']
})
export class MassgeToUserComponent implements OnInit {
  @Output()clickYes = new EventEmitter<any>();
  @Output()clickNo = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  BtnYes() {
    this.clickYes.emit()
  }
  BtnNo() {
    this.clickNo.emit()
  }

}
