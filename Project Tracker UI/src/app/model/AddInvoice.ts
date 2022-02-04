export interface IAddInvoice{

    projectID?:  string,
 
    invoiceNumber?:   string,
 
    invoiceValue?: number,
 
    invoiceDate?:  Date,
 
    invoiceValue_VAT?:   number,
 
    isInvoiceSent?:   boolean,
 
    isPaymentDone?:   boolean,
 
    invoiceID?:number,
    invCurrencyID?:number,
    pO_id?:number,
    iAttachment?:string
 
 }
 
 
 
 
 export interface IAddInvoiceList {

      InvoiceList? : IAddInvoice[]
 
  }
 
  