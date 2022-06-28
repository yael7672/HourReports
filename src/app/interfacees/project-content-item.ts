import { ownerid } from "./ownerid";
import { Project } from "./project";
import { Regardingobjectid } from "./regardingobjectid";
import { WorkType } from "./work-type";

export interface ProjectContentItem {
    Guid:string;
    OwnerId:ownerid;
    Name:string;
    Project:Project
    CustomTask:Task
    CreatedOn:string;
    BillableHours:string;
    WorkingHours:string;
    Regardingobjectid: Regardingobjectid;
    Description: string;
    WorkType: WorkType;
}

