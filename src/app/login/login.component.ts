import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { User } from '../interfacees/user';
import { PopUpServiceService } from '../pop-up-service.service';
import { UserServiceService } from '../user-service.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!: User
  ifAdmin = true;
  constructor(private router: Router, private userServiceService: UserServiceService,
    private appService: AppService, private popUpService: PopUpServiceService) { }

  ngOnInit(): void {
    if (localStorage.getItem('systemGuid')) {
      this.router.navigate(['/menu'])
    }
  }
  Login(form: NgForm) {
    this.userServiceService.logIn(form.value.SystemUserName).subscribe(
      (res: any) => {
        this.user = res;
        swal( this.user.Name + " ברוך הבא  ");
        localStorage.clear();
        localStorage.setItem('systemGuid', this.user.SystemGuid);
        localStorage.setItem('systemName', this.user.Name);
        localStorage.setItem('systemMail', this.user.Mail);
        localStorage.setItem('ifAdmin', 'true');
        this.router.navigate(['show-my-task', this.user.SystemGuid])
        this.appService.setIsPopUpOpen(false);
        this.popUpService.setClosePopUp();
        this.appService.setIsLogin(true);
      },
      (err: any) =>
        alert(err.error)
    )
  }
}
