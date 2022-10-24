import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSelectModule } from 'ngx-select-ex';
import { SmartCardComponent } from './smart-card/smart-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,

  
   
  ],
  imports: [
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    CommonModule,
    NgbModule,
    ClickOutsideModule,
    AutocompleteLibModule,
    NgxSelectModule,
    NgxPaginationModule
    ,FlexLayoutModule,
     ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  registrationStrategy: 'registerWhenStable:30000'
})

   
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
