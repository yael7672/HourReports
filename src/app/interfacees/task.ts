import { Project } from "./project";
import { Regardingobjectid } from "./regardingobjectid";
import { WorkType } from "./work-type";

export interface Task {
    Project: Project;
    AccountEmail: string;
    Regardingobjectid: Regardingobjectid;
    Description: string;
    Subject: string;
    WorkType: WorkType;
    BillableHours: boolean;
    OwnerId: string;
}