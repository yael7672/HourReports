import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { CreateAprojectContentItemComponent } from './create-aproject-content-item/create-aproject-content-item.component';
import { UpdateAnExistingTaskComponent } from './tasks/update-an-existing-task/update-an-existing-task.component';
import { CreateNewTaskComponent } from './tasks/create-new-task/create-new-task.component';
import { EndOfTaskComponent } from './tasks/end-of-task/end-of-task.component';
import { MenuComponent } from './menu/menu.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { ShowMyTaskComponent } from './tasks/show-my-task/show-my-task.component';
import { SpecificTaskComponent } from './tasks/specific-task/specific-task.component';
import { SmartCardComponent } from './smart-card/smart-card.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ProjectContentItemComponent } from './project-content-item/project-content-item.component';
import { FilterPipe } from './filter.pipe';
import { MassgeToUserComponent } from './massge-to-user/massge-to-user.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateNewTaskComponent,
    UpdateAnExistingTaskComponent,
    PopUpComponent,
    EndOfTaskComponent,
    MenuComponent,
    CreateAprojectContentItemComponent,
    ShowMyTaskComponent,
    SpecificTaskComponent,
    SmartCardComponent,
    LoginComponent,
    ProjectContentItemComponent,
    FilterPipe,
    MassgeToUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
