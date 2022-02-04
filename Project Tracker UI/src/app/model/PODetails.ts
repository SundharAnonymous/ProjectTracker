import { IDocuments } from "./Documents";

export interface IPODetails {
    poguid?:number,

    poReceivedFromAirbus? : boolean,
   airbusPONumber? :  string ,
    poReceivedFromAKKA? : true,
    ltipoNumber? :  string ,
    poReceivedDate? :  Date ,
    ltipoValue? : number,
    documents?: IDocuments,
    attachment?:string
}
