import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { User } from '../interfacees/user';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!: User

  constructor(private router: Router, private userServiceService: UserServiceService,
    private appService: AppService,private popUpService:PopUpServiceService) { }

  ngOnInit(): void {
  }
  Login(form: NgForm) {
    this.userServiceService.logIn(form.value.SystemUserName).subscribe(
      (res: any) => {
        this.user = res;
        console.log(this.user);
        alert(this.user.Name + "ברוך הבא");
        localStorage.clear();
        localStorage.setItem('systemGuid', this.user.SystemGuid);
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
      },
      (err: any) =>
        alert("error")
    )
  }
}
