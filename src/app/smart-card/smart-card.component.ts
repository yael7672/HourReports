import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-smart-card',
  templateUrl: './smart-card.component.html',
  styleUrls: ['./smart-card.component.css']
})
export class SmartCardComponent implements OnInit {

  constructor() { }
  @Input()title!:string;
  @Input()arrFunc:any;
  @Input()nameOfFunc:any;
  @Input()sizeOfCard:any;
  @Input()ifX:any;
  @Input()textButtonBackToMyTask:any;
  @Input() isDisabledStart!: any;
  @Input() textButtonBack!: any;
  @Output() clickBackToMyTask= new EventEmitter<any>();
  @Output()clickCloseCard = new EventEmitter<any>();
  @Output()clickStartTimer = new EventEmitter<any>();
  @Output()clickPauseTimer = new EventEmitter<any>();
  @Output()clickdeleteTimer = new EventEmitter<any>();

  ngOnInit(): void {
  }
  closeCard()
  {
    this.clickCloseCard.emit();
  }
  
  backToMyTask()
  {
    this.clickBackToMyTask.emit();
  }
}
