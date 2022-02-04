import { IDocuments } from "./Documents";

export interface IAddPODetails {

            poguid? : number,
            poReceivedFromAirbus? : boolean,
            airbusPONumber? :  string ,
            poReceivedFromAKKA? : boolean,
            ltipoNumber? :  string ,
            poReceivedDate? :  Date ,
            ltipoValue? : number,
            documents?: IDocuments
            attachment?:string
 }
 