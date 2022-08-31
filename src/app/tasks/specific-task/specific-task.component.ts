import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { AppService } from 'src/app/app-service.service';
import { ButtonWorkingTaskService } from 'src/app/button-working-task.service';
import { TaskByGuid } from 'src/app/interfacees/TaskByGuid';
import { PopUpServiceService } from 'src/app/pop-up-service.service';
import { UserServiceService } from 'src/app/user-service.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-specific-task',
  templateUrl: './specific-task.component.html',
  styleUrls: ['./specific-task.component.css']
})
export class SpecificTaskComponent implements OnInit {
  @Input() workTime!: any;
  @Input() isDisabledStart!: boolean;
  @Input() textButtonBack: any;
  @Output() objectEmitter = new EventEmitter<any>();
  @Output() getDataClickOfButton = new EventEmitter<any>();
  @Output() clickBackToMyTask = new EventEmitter<any>();
  descriptionTask!: string

  timeSetting: any;
  taskGuid: any;
  systemGuid: any;
  TaskByGuidObject!: TaskByGuid;
  kindOfMassageUserFinishtasklesstime = 'kindOfMassageUserFinishtasklesstime'
  massgeUserFinishtasklesstimeBody2 = " שעות עבודה לעומת שעות בפועל "
  massgeUserFinishtasklesstimeHeader = "כל הכבוד"
  massgeUserFinishtasklesstimeBody = "שעות העבודה על המשימה היו פחות ממשך הזמן שהוקצה לה!";
  showMassgeToUser = false;
  kindOfMassageifInTheMiddleOfWorkOnATask = 'kindOfMassageifInTheMiddleOfWorkOnATask';
  showMassgeToUserIfInTheMiddleOfWorkOnATask = false;
  taskNameFromLocalStorage: any;
  massgeUseIfInTheMiddleOfWorkOnATaskHeader = "!יש לך משימה פתוחה";
  massgeUserIfInTheMiddleOfWorkOnATaskBody = "?האם ברצונך לחזור אליה";
  titleCard = 'פרטי המשימה';
  kindOfMassageIsifCloseTask = 'kindOfMassageIsifCloseTask';
  massgeUserCloseTaskBody = "!שים לב";
  massgeUserCloseTaskFooter = "פעולה זו סוגרת  את הטיימר של המשימה";
  massgeUserCloseTaskHeader = "?האם אתה בטוח שברצונך לצאת";
  showMassgeToUseMIfFinishtasklesstime = false;
  taskListDataDetails: any;
  taskListDataDetailsParseToJson: any;
  openChartComparePopUp!: boolean
  
  constructor(private appService: AppService, private popUpService: PopUpServiceService,
    private userService: UserServiceService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.taskGuid = this.activatedRoute.snapshot.paramMap.get('id');
    this.systemGuid = localStorage.getItem('systemGuid')
    this.taskListDataDetails = localStorage.getItem('taskListDataDetails');
    this.taskListDataDetailsParseToJson = JSON.parse(this.taskListDataDetails)
    console.log(this.taskListDataDetailsParseToJson);
  }
  SelectedData(val: any) {
    this.objectEmitter.emit(val)
  }
  clickOfButton(kindOfButton: string, type: boolean) {
    this.getDataClickOfButton.emit({ "kind": kindOfButton, "type": type })
  }
 
  backToMyTask() {
    this.clickBackToMyTask.emit();
  }
  openChartCompare() {
    this.openChartComparePopUp = true
  }
  closePopUp() {
    this.appService.setIsPopUpOpen(false);
    this.popUpService.setClosePopUp();
  }
  clickCloseCard() {

  }
  BackToMyTask() {

  }
  clickYes(val: any) {

  }
  clickNo(val: any) {

  }
  AlertIfActualHoursLessThanAllottedHours(TaskGuid: any, parseTime: any, massageFromServerUpdate: any) {
    this.systemGuid = localStorage.getItem('systemGuid');
    this.userService.GetActualTaskHours(this.systemGuid, TaskGuid).subscribe(
      res => {
        if (res) {
          this.TaskByGuidObject = res;
          if (this.TaskByGuidObject.WorkingHours == "0") {
            swal(massageFromServerUpdate)
          }
          else
            if (this.TaskByGuidObject.WorkingHours > this.TaskByGuidObject.ActualTime) {
              this.showMassgeToUseMIfFinishtasklesstime = true
              setTimeout(() => {
                this.showMassgeToUseMIfFinishtasklesstime = false
              }, 2000)
            }
            else {
              swal(massageFromServerUpdate)
            }
        }
      },
      err => {
        console.log(err.error);
      }
    )
  }

}
