import { Component, OnInit } from '@angular/core';

import { CommonDataService } from '../services/common-data-services';
//import { type } from 'os';
//import { ApiService } from '../dashboard/dashboard.service';
import { IProject, Project } from '../model/project.model';
import { IServerResponse } from '../model/serverresponse.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { AddInvoice } from '../addinvoice/addinvoice.component';
import { IViewDetails } from '../model/ViewDetails';
import { Subscription } from 'rxjs';
import { IAddPODetails } from '../model/PostPOdetail';
import { IInvoice } from '../model/invoice.model';

@Component({
    selector: 'app-viewprojectdetails',
    templateUrl: './viewprojectdetails.component.html',
    styleUrls: ['./viewprojectdetails.component.css']
  })
  export class ViewProjectDetailsComponent implements OnInit {
   pkguid:any;
   public ViewDetails: IViewDetails[] = [];
   private routeSub?: Subscription;
  public PODet: IAddPODetails[] = [];
  public InvoicedetailsPresentCheck: IInvoice[] = [];
  InvoicePresent?:boolean
  public Invoicedetails2: IInvoice[] = [];
  ProjectName?:string
invflag?:any
    constructor(
      private commonDataService: CommonDataService, private router: Router,private dialogservice:DialogService, private route:ActivatedRoute
      ) { }
    ngOnInit() {
      
      this.pkguid=this.route.snapshot.paramMap.get('pkguid');
      
      this.routeSub = this.route.params.subscribe(params => {
        console.log(params) //log the entire params object
        console.log(params['id']) //log the value of id
        this.getViewDetails();
        
      });
      this.getAllInvoiceList();
      this.GetInvoiceDetailsByProjectID()
      this.invflag=this.route.snapshot.paramMap.get('invflag')
      this.SetFlagFunction()
    }

    SetFlagFunction(){
      if(this.invflag=="true"){
        this.InvoicePresent=true
      }
      else{
        this.InvoicePresent=false
      }
    }
    backtodashboard(){
      this.router.navigate(['/dashboard']);
    }
    backtoinvoice(){
      this.router.navigate(['/addinvoice/',this.pkguid]);
    }
    getViewDetails()
  {
    
      this.commonDataService.ViewDetailsPage(this.pkguid).subscribe(result => {
        const viewDetails: IViewDetails[] = result.data;
            console.log(this.ViewDetails);
            let arr: any[] = [];  
            arr.push(viewDetails); 
            this.ViewDetails = arr; 
            console.log(arr)
            this.ViewDetails.forEach(element => {
              this.ProjectName=element.projectName
            });
debugger
            this.ViewDetails[0].poDetailsList.forEach((poDetailsList) => {
              this.PODet.push(poDetailsList);
            });
        })
      
  }

  getAllInvoiceList(){
    this.commonDataService.getAllInvoiceList().subscribe(result=>{
      const invoicePresentData: IInvoice[] = result.data;
      this.InvoicedetailsPresentCheck = invoicePresentData;
    })
  }
  EditProject(){
    debugger 
    this.router.navigate(['/',this.pkguid,this.InvoicePresent]);
  }


  GetInvoiceDetailsByProjectID(){
    debugger
    this.commonDataService.getInvoiceByProjectID(this.pkguid).subscribe(result => {
      const invoiceData2: IInvoice[] = result.data;
      this.Invoicedetails2 = invoiceData2;
      }
  )
  }
}