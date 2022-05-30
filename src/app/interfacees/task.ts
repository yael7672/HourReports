import { Regardingobjectid } from "./regardingobjectid";
import { WorkType } from "./work-type";

export interface Task {
    AccountEmail:string;
    Regardingobjectid: Regardingobjectid;
    Description: string;
    Subject: string;
    WorkType: WorkType;
    BillableHours: boolean;
    OwnerId: string;
}