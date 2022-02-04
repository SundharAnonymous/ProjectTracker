export interface IInvoice {

    invoiceID: number,
      projectID: string,
      invoiceNumber: string,
      invoiceValue: number,
      invoiceDate: Date,
      invoiceValue_VAT: number,
      isInvoiceSent: boolean,
      isPaymentDone: boolean,
      invCurrencyID?:number,
      pO_id: number,
      iAttachment:string
    

}
export class Invoice implements IInvoice{
    constructor(
        public invoiceID: 0,
        public projectID: '',
        public invoiceNumber: '',
        public invoiceValue: 0,
        public invoiceDate: Date,
        public invoiceValue_VAT: 0,
        public isInvoiceSent: false,
        public isPaymentDone: false,
        public invCurrencyID:0,
        public pO_id: 0,
        public iAttachment:string
    ){}
}