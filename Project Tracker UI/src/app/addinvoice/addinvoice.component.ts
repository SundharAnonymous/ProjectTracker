import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { type } from 'os';
//import { IProject, Project } from '../model/project.model';
//import { IServerResponse } from '../model/serverresponse.model';
import {   IAddProject } from '../model/AddProject';
import { CommonDataService } from '../services/common-data-services';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
// import { RegisterUserService } from './createproject.service';
import { NgForm } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IPODetails } from '../model/PODetails';
import { IAddPODetails } from '../model/PostPOdetail';
import { IDocuments } from '../model/Documents';
import { DialogService } from '../services/dialog.service';
import { IInvoice } from '../model/invoice.model';
import { IAddInvoice, IAddInvoiceList } from '../model/AddInvoice';
import {ViewProjectDetailsComponent} from '../viewprojectdetails/viewprojectdetails.component';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addinvoice',
  templateUrl: './addinvoice.component.html',
  styleUrls: ['./addinvoice.component.css'],
  
})
export class AddInvoice implements OnInit {

public POProjects: IPODetails[] = [];
public Invoicedetails: IAddInvoice[] = [];
public Invoicedetails2: IInvoice[] = [];
public Invoicedet: IInvoice[] = [];
  display='none';
  displaytwo='none';
  displaythree='none';
  selectdropdownflag:boolean=false
  Dropdownform = new FormGroup({
    podropdown : new FormControl()
  })
  

  newInvoiceform = new FormGroup({

    invoiceNumber:new FormControl(),  

    invoiceValue:new FormControl(),

    invoiceDate:new FormControl(),

    invoiceValue_VAT:new FormControl(),

    isInvoiceSent:new FormControl(),
    invCurrencyID:new FormControl(),
    isPaymentDone:new FormControl(),
    attachmentvalue:new FormControl()
  })

  InvoicesList!: IAddInvoiceList;
  document:IDocuments={
    fileName:"",
    fileType:"",
    fileData:"",
  }
  documentlist?:IDocuments[]=[]
 Invoice : IAddInvoice[] = [];
 Invoice2 : IAddInvoice[] = [];
 InvoiceList2!:IAddInvoiceList;
  ProjectInvoice!:IAddInvoiceList
  poid:any;
  pkguid: any;
  podd: any;
  Projects!: IAddProject;
  PODetails : IAddPODetails[] = [];
  EditedPOdetails!:IAddPODetails
  orderForm!: any;
  poguid: any;
  project: any;
  //attribute:string='none';
  selectedproject: any;
  id: any;
  id2: any;
  base64Output: any;
  formdata: any;
 invoicetoreplace:any;
 InvoiceFlag?:boolean;
 //Invoiceflag?: boolean;
  setdropdown: any;
  currency?: string;
  projectID: any;
  pO_id: any;
  newprojectform: any;
  setdropdowntwo: any;
  selectedGroup: any;
  myRadio: any;
  invoiceToEdit: any;
attribute?:boolean;
  constructor(
    private router: Router, 
    private obj : CommonDataService,
    // private obj1 : RegisterUserService,
    private dialogservice:DialogService,
    private route:ActivatedRoute,
    private datepipe :DatePipe,
    private toastr:ToastrService
    //public data: IAddProject
    ) { }
  ngOnInit() {
   
    
    //this.getInvoice(this.id, this.id2);
    this.pkguid=this.route.snapshot.paramMap.get('pkguid');
    //this.pO_id=this.route.snapshot.paramMap.get('poguid');
    this.getPODetails();
    this.GetInvoiceDetailsByProjectID();
  }
  Dropdown(data:any){
    debugger
    console.log(data);
    if(this.Dropdownform.get("podropdown")?.value == 0 || data==0){
      this.GetInvoiceDetailsByProjectID()
      this.attribute=false
      console.log(this.attribute)
    }
    else{
      this.podd = this.Dropdownform.get("podropdown")?.value;
      console.log(this.podd)
      console.log(this.POProjects[0].poguid)
    this.getInvoice();
    this.attribute=true}
  }
  ResetDropDown(){
    debugger
    
  }
  getPOids(){
    
    this.obj.ViewPODetailsByProjectID1(this.pkguid).subscribe(result => {
      const poprojectData: IPODetails[] = result.data;
      this.POProjects = poprojectData;
          console.log(this.POProjects);
      }
  )
  }

  getInvoice(){
    this.obj.getInvoice(this.pkguid, this.podd).subscribe(result => {
      const invoiceData: IInvoice[] = result.data;
      this.Invoicedetails = invoiceData;
      //this.InvoiceList2.InvoiceList?.splice(0,this.InvoiceList2.InvoiceList.le)
      }
  )
  }

GetInvoiceDetailsByProjectID(){
  debugger
  this.obj.getInvoiceByProjectID(this.pkguid).subscribe(result => {
    const invoiceData2: IInvoice[] = result.data;
    this.Invoicedetails2 = invoiceData2;
    }
)
}
  getInvoiceDetailsvalue(){
debugger
this.Dropdownform.get('podropdown')?.disable()
      this.selectdropdownflag=true;
//////////ADD NEW INVOICE/////////////
if(this.InvoiceFlag==true){
  const doc={
    fileName:this.document.fileName,
    fileType:this.document.fileType,
    fileData:this.base64Output
  }
  this.documentlist?.push(doc)
  const Invoicevalue ={
    invoiceNumber:this.newInvoiceform.controls.invoiceNumber.value,
    invoiceValue:this.newInvoiceform.controls.invoiceValue.value,
    invoiceDate:this.newInvoiceform.controls.invoiceDate.value,
    invoiceValue_VAT:this.newInvoiceform.controls.invoiceValue_VAT.value,
    isInvoiceSent:this.newInvoiceform.controls.isInvoiceSent.value,
    isPaymentDone:this.newInvoiceform.controls.isPaymentDone.value,
    invCurrencyID:this.newInvoiceform.controls.invCurrencyID.value,
    documents:this.documentlist![0]
  }

  const Invoice: IAddInvoice = Invoicevalue;
  this.Invoice.push(Invoice);
  this.documentlist?.splice(0,this.documentlist.length)
  this.closeModalDialog();  
  this.OnSuccess('Invoice Added Successfully','New Invoice Added')
  //this.InvoiceFlag=false;
 }

 //////////DATABASE EDIT/////////////
 if(this.InvoiceFlag==false){
  this.ViewModelInvoiceDeleteForEdit(this.invoiceToEdit)
  const doc={
    fileName:this.document.fileName,
    fileType:this.document.fileType,
    fileData:this.base64Output
  }
  this.documentlist?.push(doc)
  const Invoicevalue ={
    invoiceNumber:this.newInvoiceform.controls.invoiceNumber.value,
    invoiceValue:this.newInvoiceform.controls.invoiceValue.value,
    invoiceDate:this.newInvoiceform.controls.invoiceDate.value,
    invoiceValue_VAT:this.newInvoiceform.controls.invoiceValue_VAT.value,
    isInvoiceSent:this.newInvoiceform.controls.isInvoiceSent.value,
    isPaymentDone:this.newInvoiceform.controls.isPaymentDone.value,
    invCurrencyID:this.newInvoiceform.controls.invCurrencyID.value,
    documents:this.documentlist![0],
    invoiceID:this.invoiceToEdit
  }

  const Invoice: IAddInvoice = Invoicevalue;
  this.Invoice2.push(Invoice)
  this.Invoicedetails.push(Invoice)
  this.InvoiceList2 = Object.assign(this.newInvoiceform.value)
  this.InvoiceList2.InvoiceList=this.Invoice2
  this.obj.EditInvoice(this.InvoiceList2,this.pkguid,this.podd,this.invoiceToEdit).subscribe()
  this.documentlist?.splice(0,this.documentlist.length)
  this.Invoice2.splice(0,this.Invoice2.length)
  this.closeModalDialog(); 
  this.OnEdit('New Changes Updated','Invoice Updated') 
 }
 //////////LOCAL EDIT/////////////   
 if(this.InvoiceFlag==undefined){
  const doc={
    fileName:this.document.fileName,
    fileType:this.document.fileType,
    fileData:this.base64Output
  }
  this.documentlist?.push(doc)
  const Invoicevalue ={
    invoiceNumber:this.newInvoiceform.controls.invoiceNumber.value,
    invoiceValue:this.newInvoiceform.controls.invoiceValue.value,
    invoiceDate:this.newInvoiceform.controls.invoiceDate.value,
    invoiceValue_VAT:this.newInvoiceform.controls.invoiceValue_VAT.value,
    isInvoiceSent:this.newInvoiceform.controls.isInvoiceSent.value,
    isPaymentDone:this.newInvoiceform.controls.isPaymentDone.value,
    invCurrencyID:this.newInvoiceform.controls.invCurrencyID.value,
    documents:this.documentlist![0]
  }
  const Invoice: IAddInvoice = Invoicevalue;
  this.Invoice.forEach((element,index) => {
    if(element.invoiceNumber==this.invoicetoreplace){
      this.Invoice.splice(index,1)
    }
  });
  this.Invoice.push(Invoice);
  this.documentlist?.splice(0,this.documentlist.length)
  this.closeModalDialog();
  this.OnEdit('New Changes Updated','Invoice Updated')
 }
}

  
  SaveInvoice(){
    debugger
    this.ProjectInvoice = Object.assign(this.newInvoiceform.value)
   //this.ProjectInvoice = Object.assign(this.newInvoiceform.value)
    this.ProjectInvoice.InvoiceList=this.Invoice
    console.log(this.Invoice);
    this.obj.postInvoice(this.ProjectInvoice,this.pkguid,this.podd).subscribe()
    this.Invoice.splice(0,this.Invoice.length)
    this.closeModalDialogTwo()
    this.Dropdownform.get('podropdown')?.enable()
      this.selectdropdownflag=false;
      this.Dropdown(0)
      this.OnSuccess('Invoices Updated Successfully','Project Updated')
    //this.router.navigate(['/dashboard']);
  }

  
FinalSave(){
  this.router.navigate(['/dashboard']);
}

   getPODetailsvalue(){
     ;
     if(this.InvoiceFlag==true){
      this.PODetails.forEach((element,index) => {
        if(element.ltipoNumber==this.invoicetoreplace){
          this.PODetails.splice(index,1)
        }
      });
      this.InvoiceFlag=false;
     }
    const PODetailsvalue ={
    poReceivedFromAirbus : false,
    airbusPONumber : '',
    poReceivedFromAKKA : false,
    // ltipoNumber : this.newprojectform.controls.ltipoNumber.value,
    // poReceivedDate : this.newprojectform.controls.poReceivedDate.value,
    // ltipoValue : this.newprojectform.controls.ltipoValue.value,
  }

  const POvalue: IAddPODetails = PODetailsvalue;
  this.PODetails.push(POvalue);
  this.closeModalDialog();  
}

  getPODetails()
  {
    
      this.obj.ViewPODetailsByProjectID1(this.pkguid).subscribe(result => {
        const poprojectData: IPODetails[] = result.data;
        this.POProjects = poprojectData;
        
            console.log(this.POProjects);
        }
    )
  }

  div1: boolean = true;
  div2: boolean = true;
  div3: boolean = true;
  div4: boolean = true;

  
  public counts = ["Project Details",
  "Revenue","PO Details"];
  orderStatus:any;

  
  
  goToPage() {
    ;
    this.router.navigate(['/dashboard']);

  }
  isShowone = false;
  isShowtwo = false;
  isShowthree = false;
  isShowfour = false;

  showflag=false;

  toggleDisplayisOppIDCreated() {
    this.isShowone = !this.isShowone;
  }

  toggleDisplayisTRDReceived() {
    this.isShowtwo = !this.isShowtwo;
  }

  toggleDisplayisCRDsend(){
    this.isShowthree = !this.isShowthree;
  }

  toggleDisplayLTIpono(){
    this.isShowfour = !this.isShowfour;
  }

  AddProject(){
    console.log(this.Projects);
    this.Projects.poDetailsList = this.PODetails
    this.router.navigate(['/dashboard']);
  }
  reloadComponent() {
    let currentUrl = this.div3;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
  
  backtodashboard(){
    this.router.navigate(['/dashboard']);
  }

 


  openModalDialog(data: any = ''){
    debugger
    this.newInvoiceform.reset()
    this.display='block'; //Set block css
    this.InvoiceFlag=true;
    
 }

 openModalDialog4(data: any = '',invoiceid:any){
   debugger
   this.newInvoiceform.reset()
  this.display='block'; //Set block css
  if(invoiceid!=null || invoiceid!=undefined)
  {
  this.InvoiceFlag=false
}
else{
  this.InvoiceFlag=undefined
}

  this.invoicetoreplace=data.invoiceNumber
  this.invoiceToEdit=invoiceid
   console.log(data)
  if (data != null || data == undefined)
  {
    this.newInvoiceform.get('invoiceNumber')?.setValue(data.invoiceNumber)
    //this.newInvoiceform.get('invoiceDate')?.setValue(data.invoiceDate)
    this.newInvoiceform.get('invoiceValue')?.setValue(data.invoiceValue)
    this.newInvoiceform.get('invoiceDate')?.setValue(this.datepipe.transform(data.invoiceDate,'yyyy-MM-dd'))
    this.newInvoiceform.get('invoiceValue_VAT')?.setValue(data.invoiceValue_VAT)
    this.newInvoiceform.get('isInvoiceSent')?.setValue(data.isInvoiceSent)
    this.newInvoiceform.get('isPaymentDone')?.setValue(data.isPaymentDone)
    this.newInvoiceform.get('invCurrencyID')?.setValue(data.invCurrencyID)
  }
  
}
OnsaveeditPO(data: any = ''){
  this.showflag = true;
this.id = this.newprojectform.get('poguid')
if(this.PODetails.find(this.poguid) == this.id){
  console.log(data,this.id)
  this.newprojectform.get('ltipoNumber')?.setValue(data.ltipoNumber)
      this.newprojectform.get('poReceivedDate')?.setValue(data.poReceivedDate)
      this.newprojectform.get('ltipoValue')?.setValue(data.ltipoValue)
}

}
 closeModalDialog(){
  this.display='none'; //set none css after close dialog
 }
 closeModalDialog4(){
  this.display='none'; //set none css after close dialog
 }

 
 openModalDialogTwo(){
  this.displaytwo='block'; //Set block css
}

 closeModalDialogTwo(){
  this.displaytwo='none'; //set none css after close dialog
 }
 openModalDialogthree(){
  this.displaythree='block'; //Set block css
}

 closeModalDialogthree(){
  this.displaythree='none'; //set none css after close dialog
 }


 EditPO(id:any){
   
  this.displaythree='block';
  this.obj.GetPOdetailsbyid(this.poguid).subscribe(
    result => {
      if (result != null) {
         // const projectData: IAddPODetails[] = result;
           this.project = result;
           this.selectedproject=this.project.data[0];

          // this.newprojectform.get('projectID')?.setValue(this.selectedproject.projectID)
          
      }
   })
}

dropdown(event?:any){
  debugger
  this.setdropdown=event.target.value[0]
  console.log(this.setdropdown)
  switch(this.setdropdown){
    case '0':
      this.currency="Euro";
      break;
      case '1':
      this.currency="Dollar";
      break;
      case '2':
      this.currency="Rupees";
      break;
      case '3':
      this.currency="Pound";
      break;
  }
}
  RadioValue(id:any){
    this.myRadio=id
  }
  viewdetailspage(){
    this.router.navigate(['/viewprojectdetails/',this.pkguid]);
  }

  
  podetailsdd(event:any){
    
    this.setdropdowntwo=event.target.value
    console.log(this.setdropdown)
  }

  DeleteLocalInvoiceByID(id:any){
    this.dialogservice.OpenConfirmDialog('Are You Sure You want to Delete this Invoice?').afterClosed().subscribe(res=>{
      console.log(res)
      if(res==true){
        this.Invoice.forEach((element,index) => {
          if(element.invoiceNumber==id){
            this.Invoice.splice(index,1)
          }
        });
        this.OnDelete('Invoice Deleted','Deleted')
  }
    })
    }


    DeleteInvoiceByID(invoiceID:any){
          this.obj.DeleteInvoiceByID(this.pkguid,this.podd,invoiceID).subscribe();
          this.OnDelete('Invoice Deleted','Deleted')
    }


    ViewModelInvoiceDeleteForEdit(id:any){
      if(this.InvoiceFlag==false){
        this.Invoicedetails.forEach((element,index) => {
          if(element.invoiceID==id){
            this.Invoicedetails.splice(index,1)
          }
        });
      }
    }
    
          ViewModelInvoiceDelete(id:any){
            debugger
            this.dialogservice.OpenConfirmDialog('Are You Sure You want to Delete this Invoice?').afterClosed().subscribe(res=>{
              console.log(res)
              if(res==true){
                this.DeleteInvoiceByID(id)
                this.Invoicedetails.forEach((element,index) => {
                  if(element.invoiceID==id){
                    this.Invoicedetails.splice(index,1)
                  }
                });
          }
            })
            
          }

          //for attachment///////////////////////////////////////////////////////////////
          handleUpload(event:any,data:any) {
            debugger
           
          const max_size = 20971520000;
          const file = event.target.files[0];
          if(file== undefined ){
            this.document.fileName='';
          this.document.fileType='';
          this.document.fileData=''
          }
          else{
          this.document.fileName=file.name;
          this.document.fileType=file.type;
          
          const reader = new FileReader();
          reader.readAsDataURL(file);
          
            reader.onloadend = () => {
              this.base64Output= reader.result
              this.document.fileData=this.base64Output;
             
          };
          }
          }
//for attachment///////////////////////////////////////////////////////////////
 
 /////////////////////NOTIFICATIONS///////////////
 OnSuccess(message:any,title:any){
  this.toastr.success(message,title)
}

OnDelete(message:any,title:any){
  this.toastr.error(message,title)
}
OnEdit(message:any,title:any){
  this.toastr.info(message,title)
}
}

