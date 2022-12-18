import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSettingsComponent } from '../admin-settings/admin-settings.component';
import { AuthGuard } from '../auth.guard';
import { ChartsMyTaskComponent } from '../charts-my-task/charts-my-task.component';
import { ChartsComponent } from '../charts/charts.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { DetailsOfWorkingHoursEmployeeForAdminComponent } from '../details-of-working-hours-employee-for-admin/details-of-working-hours-employee-for-admin.component';
import { DetailsOfWorkingHoursEmployeeComponent } from '../details-of-working-hours-employee/details-of-working-hours-employee.component';
import { EmployeeReportComponent } from '../employee-report/employee-report.component';
import { HoursAwaitingApprovalComponent } from '../hours-awaiting-approval/hours-awaiting-approval.component';
import { LoginComponent } from '../login/login.component';
import { MenuComponent } from '../menu/menu.component';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { PricingTasksComponent } from '../pricing-tasks/pricing-tasks.component';
import { ProjectContectItemByProjectComponent } from '../project-contect-item-by-project/project-contect-item-by-project.component';
import { CreateAprojectContentItemComponent } from '../project-contect-items/create-aproject-content-item/create-aproject-content-item.component';
import { MyProjectContectItemsComponent } from '../project-contect-items/my-project-contect-items/my-project-contect-items.component';
import { ProjectContectItemsByEmployeeComponent } from '../project-contect-items/project-contect-items-by-employee/project-contect-items-by-employee.component';
import { SickLeaveProjectContentItemComponent } from '../project-contect-items/sick-leave-project-content-item/sick-leave-project-content-item.component';
import { ProjectsByEmployeeComponent } from '../projects-by-employee/projects-by-employee.component';
import { SmartCardComponent } from '../smart-card/smart-card.component';
import { SpecificProjectDetailsComponent } from '../specific-project-details/specific-project-details.component';
import { StatisticsGraphAllEmployeesDetailsToManagerComponent } from '../statistics-graph-all-employees-details-to-manager/statistics-graph-all-employees-details-to-manager.component';
import { StatisticsGraphEmployeeDetailsToManagerComponent } from '../statistics-graph-employee-details-to-manager/statistics-graph-employee-details-to-manager.component';
import { StatisticsGraphComponent } from '../statistics-graph/statistics-graph.component';
import { SystemSettingComponent } from '../system-setting/system-setting.component';
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
import { UpdateProjectContentItemComponent } from '../update-project-content-item/update-project-content-item.component';

const routes: Routes = [
    {
        path: '', component: MenuComponent, canActivate: [AuthGuard], children: [
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
            { path: 'details-of-working-hours-employee/:id', component: DetailsOfWorkingHoursEmployeeComponent },
            { path: 'details-of-working-hours-employee-for-admin/:id', component: DetailsOfWorkingHoursEmployeeForAdminComponent },
            { path: 'system-setting', component: SystemSettingComponent },
            { path: 'projects-by-employee', component: ProjectsByEmployeeComponent },
            { path: 'project-contect-item-by-project/:id/:userId', component: ProjectContectItemByProjectComponent },
            { path: 'specific-project-details/:id/:userId', component: SpecificProjectDetailsComponent },
            { path: 'pricing-tasks/:id', component: PricingTasksComponent },

            { path: 'date', component: DatepickerComponent }

        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
