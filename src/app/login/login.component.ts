import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfacees/user';
import { UserServiceService } from '../user-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!: User

  constructor(private router: Router, private userServiceService: UserServiceService) { }

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

      },
      (err: any) =>
        alert("error")
    )
  }
}
