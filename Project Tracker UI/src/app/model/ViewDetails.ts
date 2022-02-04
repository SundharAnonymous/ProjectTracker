import { IAddInvoice } from "./AddInvoice";
import { IAddPODetails } from "./PostPOdetail";

export interface IViewDetails {

    projectID: string,
    projectName: string,
    description: string,
    country: number,
    startDate: Date,
    endDate: Date,
    status: number,
    isOppIDCreated: boolean,
    isTRDReceived: boolean,
    trdReceivedDate: Date,
    isCRDSent: boolean,
    crdSentDate: Date,
    projectValue: number,
    ltiValue: number,
    ltiOffShoringPercentage: number,
    ltiOffShoring: number,
    akkaContribution: number,
    akkaContractualMargin: number,
    akkaRevenue: number,
    currencyID?:number,
    invoiceNumber: string,
    invoiceValue: number,
    invoiceDate: Date,
    invoiceValue_VAT: number,
    isInvoiceSent: boolean,
    isPaymentDone: boolean,
    poDetailsList : IAddPODetails[],
    invoiceDetailsList: IAddInvoice[]
    

}
export class ViewDetails implements IViewDetails{
    constructor(
       public projectID: '',
       public projectName: '',
       public description: '',
       public country: 0,
       public startDate: Date,
       public endDate: Date,
       public status: 0,
       public isOppIDCreated: false,
       public isTRDReceived: false,
       public trdReceivedDate: Date,
       public isCRDSent: false,
       public crdSentDate: Date,
       public projectValue: 0,
       public ltiValue: 0,
       public ltiOffShoringPercentage: 0,
       public ltiOffShoring: 0,
       public akkaContribution: 0,
       public akkaContractualMargin: 0,
       public akkaRevenue: 0,
       public invoiceNumber: '',
       public invoiceValue: 0,
       public invoiceDate: Date,
       public invoiceValue_VAT: 0,
       public isInvoiceSent: false,
       public isPaymentDone: false,
       public poDetailsList : IAddPODetails[],
       public invoiceDetailsList: IAddInvoice[]
    ){}
}