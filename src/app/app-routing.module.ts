import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAprojectContentItemComponent } from './project-contect-items/create-aproject-content-item/create-aproject-content-item.component';
import { CreateNewTaskComponent } from './tasks/create-new-task/create-new-task.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { UpdateAnExistingTaskComponent } from './tasks/update-an-existing-task/update-an-existing-task.component';
import { EndOfTaskComponent } from './tasks/end-of-task/end-of-task.component';
import { ShowMyTaskComponent } from './tasks/show-my-task/show-my-task.component';
import { SpecificTaskComponent } from './tasks/specific-task/specific-task.component';
import { SmartCardComponent } from './smart-card/smart-card.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { ChartsComponent } from './charts/charts.component';
import { StatisticsGraphComponent } from './statistics-graph/statistics-graph.component';
import { ChartsMyTaskComponent } from './charts-my-task/charts-my-task.component';
import { SickLeaveProjectContentItemComponent } from './project-contect-items/sick-leave-project-content-item/sick-leave-project-content-item.component';
import { UpdateProjectContentItemComponent } from './update-project-content-item/update-project-content-item.component';
import { TheLastTasksIWorkedComponent } from './tasks/the-last-tasks-iworked/the-last-tasks-iworked.component';
import { MyProjectContectItemsComponent } from './project-contect-items/my-project-contect-items/my-project-contect-items.component';
import { HoursAwaitingApprovalComponent } from './hours-awaiting-approval/hours-awaiting-approval.component';
import { StatisticsGraphEmployeeDetailsToManagerComponent } from './statistics-graph-employee-details-to-manager/statistics-graph-employee-details-to-manager.component';
import { StatisticsGraphAllEmployeesDetailsToManagerComponent } from './statistics-graph-all-employees-details-to-manager/statistics-graph-all-employees-details-to-manager.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
import { ProjectContectItemsByEmployeeComponent } from './project-contect-items/project-contect-items-by-employee/project-contect-items-by-employee.component';
import { ShowMyTeamTaskComponent } from './tasks/show-my-team-task/show-my-team-task.component';
import { TasksByEmployeeComponent } from './tasks/tasks-by-employee/tasks-by-employee.component';
import { TeamReportComponent } from './team-report/team-report.component';
import { TaskByTeamComponent } from './tasks/task-by-team/task-by-team.component';
import { DetailsOfWorkingHoursEmployeeComponent } from './details-of-working-hours-employee/details-of-working-hours-employee.component';

const routes: Routes = [
   { path: '', component: LoginComponent },
 // { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'menu', component: MenuComponent, children:[
  { path: 'createTask', component: CreateNewTaskComponent },
  { path: 'updateTask', component: UpdateAnExistingTaskComponent },
  { path: 'endOfTask', component: EndOfTaskComponent },
  { path: 'pop', component: PopUpComponent },
  { path: 'createAprojectContentItem', component: CreateAprojectContentItemComponent },
  { path: 'specific-task/:id', component: SpecificTaskComponent },
  { path: 'smartCard', component: SmartCardComponent },
  { path: 'personalDetails', component: PersonalDetailsComponent },
  { path: 'charts9', component: ChartsComponent },
  { path: 'StatisticsGraph', component: StatisticsGraphComponent },
  { path: 'ChartsMyTask', component: ChartsMyTaskComponent },
  { path: 'sick', component: SickLeaveProjectContentItemComponent },
  { path: 'up', component: UpdateProjectContentItemComponent },
  { path: 'show-my-task/:id', component: ShowMyTaskComponent },
  { path: 'show-team-my-task/:id', component: ShowMyTeamTaskComponent },
  { path: 'the-last-tasks-i-worked/:id', component: TheLastTasksIWorkedComponent },
  { path: 'project-contect-items-by-employee/:id', component: ProjectContectItemsByEmployeeComponent },
  { path: 'my-project-contect-items-component/:id', component: MyProjectContectItemsComponent },
  { path: 'hours-awaiting-approval-component', component: HoursAwaitingApprovalComponent },
  { path: 'employee-report', component: EmployeeReportComponent },
  { path: 'team-report', component: TeamReportComponent },
  { path: 'tasks-by-team/:id', component: TaskByTeamComponent },
  { path: 'tasks-by-employee/:id', component: TasksByEmployeeComponent },
  { path: 'my-project-contect-items-component', component: MyProjectContectItemsComponent },
  { path: 'hours-awaiting-approval-component', component: HoursAwaitingApprovalComponent },
  { path: 'Statistics-Graph-Employee-Details-ToManager/:id', component: StatisticsGraphEmployeeDetailsToManagerComponent },
  { path: 'Statistics-Graph-All-Employees-Details-ToManager', component: StatisticsGraphAllEmployeesDetailsToManagerComponent },
  { path: 'AdminSettings', component: AdminSettingsComponent },
  { path: 'details-of-working-hours-Employee', component: DetailsOfWorkingHoursEmployeeComponent }
] },

];

@NgModule({
  imports: [],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
