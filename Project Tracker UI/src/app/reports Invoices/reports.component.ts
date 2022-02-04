import { Component, OnInit } from '@angular/core';
import { IInvoice } from '../model/invoice.model';
import { CommonDataService } from '../services/common-data-services';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public Invoicedetails: IInvoice[] = [];
  isDesc: boolean= false;
  invoiceNumber:any
  constructor(private commondataservice:CommonDataService) { }

  ngOnInit(): void {
this.GetAllInvoices()
  }

  GetAllInvoices(){
    this.commondataservice.getAllInvoiceList().subscribe(result=>{
      const invoicePresentData: IInvoice[] = result.data;
      this.Invoicedetails=invoicePresentData
    })
  }


sortDataId(){
   
  console.log(this.Invoicedetails);
  if(this.isDesc){
  this.Invoicedetails.sort((a,b) => a.invoiceNumber.localeCompare(b.invoiceNumber));
  }else{
  this.Invoicedetails.sort((a,b) => b.invoiceNumber.localeCompare(a.invoiceNumber));
  }
  this.isDesc= this.isDesc == true ? false: true;
  
  }
  sortDataName(property: any){
       
    console.log(this.Invoicedetails);
    if(this.isDesc){
    this.Invoicedetails.sort((a,b) => a.invoiceNumber.localeCompare(b.invoiceNumber));
    }else{
    this.Invoicedetails.sort((a,b) => b.invoiceNumber.localeCompare(a.invoiceNumber));
    }
    this.isDesc= this.isDesc == true ? false: true;
    
    }
}
