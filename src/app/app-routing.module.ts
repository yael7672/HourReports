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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
 // { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'login', component: LoginComponent },
  { path: 'createTask', component: CreateNewTaskComponent },
  { path: 'updateTask', component: UpdateAnExistingTaskComponent },
  { path: 'endOfTask', component: EndOfTaskComponent },
  { path: 'pop', component: PopUpComponent },
  { path: 'createAprojectContentItem', component: CreateAprojectContentItemComponent },
  { path: 'showMyTask', component: ShowMyTaskComponent },
  { path: 'specificTask', component: SpecificTaskComponent },
  { path: 'smartCard', component: SmartCardComponent },
  { path: 'personalDetails', component: PersonalDetailsComponent },
  { path: 'charts9', component: ChartsComponent },
  { path: 'StatisticsGraph', component: StatisticsGraphComponent },
  { path: 'ChartsMyTask', component: ChartsMyTaskComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
