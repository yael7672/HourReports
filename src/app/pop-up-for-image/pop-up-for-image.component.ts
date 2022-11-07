import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app-service.service';

@Component({
  selector: 'app-pop-up-for-image',
  templateUrl: './pop-up-for-image.component.html',
  styleUrls: ['./pop-up-for-image.component.css']
})
export class PopUpForImageComponent implements OnInit {
  @Input() ifX!: boolean;
  @Input() header!: string;
  @Input() imagesToShow!: any;
  @Input() imagesArr!: any[];
  @Input() ifMinus!:boolean;
  @Input() ifPlus!:boolean;
  @Input() ifShowArrow!:boolean;
  @Output() ClosePopUp = new EventEmitter<any>();
  @Output() PlusSlides = new EventEmitter<any>();

  slideIndex = 1;
  currntIndex: any;
  isClose = false;
  constructor(private appService: AppService) {

  }

  ngOnInit(): void {
console.log(this.ifMinus,this.ifPlus);
    

  }
  closePopUp() {
    this.ClosePopUp.emit()
   
  }

  plusSlides(n: any) {
    this.PlusSlides.emit(n)
  }

  
}
