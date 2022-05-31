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
  appProperties!:AppProperties;

constructor(private  appService: AppService) {  }

ngOnInit(): void {
  this.appProperties = this.appService.getAppProperties();
}
}
