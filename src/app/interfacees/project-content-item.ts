import { Regardingobjectid } from "./regardingobjectid";
import { WorkType } from "./work-type";

export interface ProjectContentItem {
    Guid:string;
    Name:string;
    CreatedOn:string;
    BillableHours:string;
    WorkingHours:string;
    Regardingobjectid: Regardingobjectid;
    Description: string;
    WorkType: WorkType;
}
