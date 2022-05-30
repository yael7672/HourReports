import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-project-content-item',
  templateUrl: './project-content-item.component.html',
  styleUrls: ['./project-content-item.component.css']
})
export class ProjectContentItemComponent implements OnInit {
  @Input() title!: string;
  @Input() thArr!: any;
  @Input() tableData!: any;
  @Input() tableDataKeys!: any;
  @Input() kindOfCard!: any;
  @Output() clickSelectedTask = new EventEmitter<any>();
  @Output()getDataClickOfButton = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
