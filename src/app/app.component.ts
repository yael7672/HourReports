import { Component, OnInit } from '@angular/core';
import { AppProperties } from './app-properties.interface';
import { AppService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'HourlyReports';
  appProperties!: AppProperties;
  systemGuid: any;
  showMenu = false;
  constructor(private appService: AppService) {
    this.appService.getIsLogin().subscribe(res => {
      if (res)
        this.showMenu = true;
      else
        this.showMenu = false;
    })
  }

  ngOnInit(): void {
    this.systemGuid = localStorage.getItem('systemGuid')
    if (this.systemGuid)
      this.showMenu = true;

    this.appProperties = this.appService.getAppProperties();
  }
}
