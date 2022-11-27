import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';  
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { SmartCardComponent } from './smart-card/smart-card.component';

import { environment } from '../environments/environment';
<<<<<<< HEAD
import { CodeSpairComponent } from './code-spair/code-spair.component';
=======
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClickOutsideModule } from 'ng-click-outside';
>>>>>>> 5a169c051d664748b6c57c59864e59337a083f9b

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
<<<<<<< HEAD
    CodeSpairComponent,
=======
    
>>>>>>> 5a169c051d664748b6c57c59864e59337a083f9b
  ],
  imports: [
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
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
