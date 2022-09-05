import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { CreateAprojectContentItemComponent } from './project-contect-items/create-aproject-content-item/create-aproject-content-item.component';
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
import { ProjectContentItemComponent } from './project-contect-items/project-content-item/project-content-item.component';
import { FilterPipe } from './filter.pipe';
import { MassgeToUserComponent } from './massge-to-user/massge-to-user.component';
import { CommonModule } from '@angular/common';  
import { PauseWorkComponent } from './pause-work/pause-work.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsComponent } from './charts/charts.component';
import { StatisticsGraphComponent } from './statistics-graph/statistics-graph.component';
import { ChartsMyTaskComponent } from './charts-my-task/charts-my-task.component';
import { MyProjectContectItemsComponent } from './project-contect-items/my-project-contect-items/my-project-contect-items.component';
import { SickLeaveProjectContentItemComponent } from './project-contect-items/sick-leave-project-content-item/sick-leave-project-content-item.component';
import { FreedomProjectContentItemComponent } from './project-contect-items/freedom-project-content-item/freedom-project-content-item.component';
import { ProjectContectItemWithTimeComponent } from './project-contect-items/project-contect-item-with-time/project-contect-item-with-time.component';
import { HoursAwaitingApprovalComponent } from './hours-awaiting-approval/hours-awaiting-approval.component';
import { MassgeToUserWithEditComponent } from './massge-to-user-with-edit/massge-to-user-with-edit.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { searchInputFilterPipe } from './pipes/searchInputFilter.pipe';
import { UpdateProjectContentItemComponent } from './update-project-content-item/update-project-content-item.component';
import { DeleteProjectContentItemComponent } from './project-contect-items/delete-project-content-item/delete-project-content-item.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { ShowMyTeamTaskComponent } from './tasks/show-my-team-task/show-my-team-task.component';
import { TheLastTasksIWorkedComponent } from './tasks/the-last-tasks-iworked/the-last-tasks-iworked.component';
import { SearchAndSortTasksComponent } from './search-and-sort-tasks/search-and-sort-tasks.component';
import { TimeCounterComponent } from './time-counter/time-counter.component';
import { MyNewTasksComponent } from './my-new-tasks/my-new-tasks.component';
import { StatisticsGraphEmployeeDetailsToManagerComponent } from './statistics-graph-employee-details-to-manager/statistics-graph-employee-details-to-manager.component';
import { StatisticsGraphAllEmployeesDetailsToManagerComponent } from './statistics-graph-all-employees-details-to-manager/statistics-graph-all-employees-details-to-manager.component';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
import { TasksByEmployeeComponent } from './tasks/tasks-by-employee/tasks-by-employee.component';
import { ProjectContectItemsByEmployeeComponent } from './project-contect-items/project-contect-items-by-employee/project-contect-items-by-employee.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';

// import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
// var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart


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
    MassgeToUserComponent,
    PauseWorkComponent,
    PersonalDetailsComponent,
    ChartsComponent,
    StatisticsGraphComponent,
    ChartsMyTaskComponent,
    MyProjectContectItemsComponent,
    SickLeaveProjectContentItemComponent,
    FreedomProjectContentItemComponent,
    ProjectContectItemWithTimeComponent,
    HoursAwaitingApprovalComponent,
    MassgeToUserWithEditComponent,
    UpdateProjectContentItemComponent,
    DeleteProjectContentItemComponent,
    SmartTableComponent,
    ShowMyTeamTaskComponent,
    TheLastTasksIWorkedComponent,
    SearchAndSortTasksComponent,
    TimeCounterComponent,
    EmployeeReportComponent,
    TasksByEmployeeComponent,
    ProjectContectItemsByEmployeeComponent,
    MyNewTasksComponent,
    StatisticsGraphEmployeeDetailsToManagerComponent,
    StatisticsGraphAllEmployeesDetailsToManagerComponent,
    AdminSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    CommonModule,
    NgbModule,
    ClickOutsideModule,
    AutocompleteLibModule
   
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
