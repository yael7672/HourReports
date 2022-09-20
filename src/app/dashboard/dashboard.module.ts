import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminSettingsComponent } from '../admin-settings/admin-settings.component';
import { AppComponent } from '../app.component';
import { ChartsMyTaskComponent } from '../charts-my-task/charts-my-task.component';
import { ChartsComponent } from '../charts/charts.component';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { DetailsOfWorkingHoursEmployeeComponent } from '../details-of-working-hours-employee/details-of-working-hours-employee.component';
import { EmployeeReportComponent } from '../employee-report/employee-report.component';
import { FilterPipe } from '../filter.pipe';
import { HoursAwaitingApprovalComponent } from '../hours-awaiting-approval/hours-awaiting-approval.component';
import { MassegeToManagerComponent } from '../massege-to-manager/massege-to-manager.component';
import { MassgeToUserWithEditComponent } from '../massge-to-user-with-edit/massge-to-user-with-edit.component';
import { MassgeToUserComponent } from '../massge-to-user/massge-to-user.component';
import { MenuComponent } from '../menu/menu.component';
import { MyNewTasksComponent } from '../my-new-tasks/my-new-tasks.component';
import { PauseWorkComponent } from '../pause-work/pause-work.component';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { CreateAprojectContentItemComponent } from '../project-contect-items/create-aproject-content-item/create-aproject-content-item.component';
import { DeleteProjectContentItemComponent } from '../project-contect-items/delete-project-content-item/delete-project-content-item.component';
import { FreedomProjectContentItemComponent } from '../project-contect-items/freedom-project-content-item/freedom-project-content-item.component';
import { MyProjectContectItemsComponent } from '../project-contect-items/my-project-contect-items/my-project-contect-items.component';
import { ProjectContectItemWithTimeComponent } from '../project-contect-items/project-contect-item-with-time/project-contect-item-with-time.component';
import { ProjectContectItemsByEmployeeComponent } from '../project-contect-items/project-contect-items-by-employee/project-contect-items-by-employee.component';
import { ProjectContentItemComponent } from '../project-contect-items/project-content-item/project-content-item.component';
import { SickLeaveProjectContentItemComponent } from '../project-contect-items/sick-leave-project-content-item/sick-leave-project-content-item.component';
import { SearchAndSortTasksComponent } from '../search-and-sort-tasks/search-and-sort-tasks.component';
import { SmartCardComponent } from '../smart-card/smart-card.component';
import { SmartTableComponent } from '../smart-table/smart-table.component';
import { StatisticsGraphAllEmployeesDetailsToManagerComponent } from '../statistics-graph-all-employees-details-to-manager/statistics-graph-all-employees-details-to-manager.component';
import { StatisticsGraphEmployeeDetailsToManagerComponent } from '../statistics-graph-employee-details-to-manager/statistics-graph-employee-details-to-manager.component';
import { StatisticsGraphComponent } from '../statistics-graph/statistics-graph.component';
import { CreateNewTaskComponent } from '../tasks/create-new-task/create-new-task.component';
import { EndOfTaskComponent } from '../tasks/end-of-task/end-of-task.component';
import { ShowMyTaskComponent } from '../tasks/show-my-task/show-my-task.component';
import { ShowMyTeamTaskComponent } from '../tasks/show-my-team-task/show-my-team-task.component';
import { SpecificTaskComponent } from '../tasks/specific-task/specific-task.component';
import { TaskByTeamComponent } from '../tasks/task-by-team/task-by-team.component';
import { TasksByEmployeeComponent } from '../tasks/tasks-by-employee/tasks-by-employee.component';
import { TheLastTasksIWorkedComponent } from '../tasks/the-last-tasks-iworked/the-last-tasks-iworked.component';
import { UpdateAnExistingTaskComponent } from '../tasks/update-an-existing-task/update-an-existing-task.component';
import { TeamReportComponent } from '../team-report/team-report.component';
import { TimeCounterComponent } from '../time-counter/time-counter.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UpdateProjectContentItemComponent } from '../update-project-content-item/update-project-content-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ClickOutsideModule } from 'ng-click-outside';
import { DetailsOfWorkingHoursEmployeeForAdminComponent } from '../details-of-working-hours-employee-for-admin/details-of-working-hours-employee-for-admin.component';
import { SystemSettingComponent } from '../system-setting/system-setting.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxPaginationModule } from 'ngx-pagination';
import {  INgxSelectOptions } from 'ngx-select-ex';
import { AddProjectByManagerComponent } from '../add-project-by-manager/add-project-by-manager.component';
import { AddUserComponent } from '../add-user/add-user.component';

const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
    optionValueField: 'Guid',
    optionTextField: 'Name'
};
@NgModule({
 declarations:[
    UpdateProjectContentItemComponent,
    CreateNewTaskComponent,
    UpdateAnExistingTaskComponent,
    PopUpComponent,
    EndOfTaskComponent,
    MenuComponent,
    CreateAprojectContentItemComponent,
    ShowMyTaskComponent,
    SpecificTaskComponent,
    ProjectContentItemComponent,
    SmartCardComponent,
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
    AdminSettingsComponent,
    TeamReportComponent,
    TaskByTeamComponent,
    DeleteTaskComponent,
    DetailsOfWorkingHoursEmployeeComponent,
    DeleteTaskComponent,
    MassegeToManagerComponent,
    DetailsOfWorkingHoursEmployeeForAdminComponent,
    SystemSettingComponent,
    AddProjectByManagerComponent,
    AddUserComponent

    

],
 imports : [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule ,
    NgbModule,
    ClickOutsideModule,
    AutocompleteLibModule,
    NgxSelectModule,
    NgxPaginationModule

],
providers: [],
bootstrap: []
   
})
export class DashboardModule { }
