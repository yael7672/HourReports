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
import { ShowMyTeamTaskComponent } from './tasks/show-my-team-task/show-my-team-task.component';
import { MyProjectContectItemsComponent } from './project-contect-items/my-project-contect-items/my-project-contect-items.component';
import { HoursAwaitingApprovalComponent } from './hours-awaiting-approval/hours-awaiting-approval.component';
import { EmployeeReportComponent } from './employee-report/employee-report.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: 'menu', component: MenuComponent },
 // { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'login', component: LoginComponent },
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
  { path: 'the-last-tasks-i-worked', component: TheLastTasksIWorkedComponent },
  { path: 'my-project-contect-items-component/:id', component: MyProjectContectItemsComponent },
  { path: 'hours-awaiting-approval-component', component: HoursAwaitingApprovalComponent },
  { path: 'employee-report', component: EmployeeReportComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
