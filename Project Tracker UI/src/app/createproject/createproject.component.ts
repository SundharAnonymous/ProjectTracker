import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { type } from 'os';
//import { IProject, Project } from '../model/project.model';
//import { IServerResponse } from '../model/serverresponse.model';
import {   IAddProject } from '../model/AddProject';
import { CommonDataService } from '../services/common-data-services';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RegisterUserService } from './createproject.service';
import { NgForm } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IPODetails } from '../model/PODetails';
import { IAddPODetails } from '../model/PostPOdetail';
import { IDocuments } from '../model/Documents';
import { DialogService } from '../services/dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css'],
  
})
export class CreateProject implements OnInit {

public POProjects: IPODetails[] = [];

  display='none';
  displaytwo='none';
  displaythree='none';
  document:IDocuments={
    fileName:"",
    fileType:"",
    fileData:"",
  }
  newprojectform = new FormGroup({
    projectID:new FormControl('',[Validators.required]),	
    projectName:new FormControl('',[Validators.required]),	
    description:new FormControl(),	
    country:new FormControl('',[Validators.required]),	
    startDate:new FormControl(),
    //endDate:new FormControl(),
    status:new FormControl('',[Validators.required]),	
     isOppIDCreated:new FormControl(),
     isTRDReceived:new FormControl(),
    trdReceivedDate:new FormControl(),
    isCRDSent:new FormControl(),
    crdSentDate:new FormControl(),
    poReceivedFromAirbus:new FormControl(),
    airbusPONumber:new FormControl(),	
   // poReceivedFromAKKA:new FormControl(),
    ltipoNumber:new FormControl(),	
   poReceivedDate:new FormControl(),
   ltipoValue:new FormControl(),	
   poReceivedFromAKKA:new FormControl(),
    projectValue:new FormControl(),	
    ltiValue:new FormControl(),	
    ltiOffShoringPercentage:new FormControl(), 
    ltiOffShoring:new FormControl(),	
    akkaContribution:new FormControl(),	
    akkaContractualMargin:new FormControl(),	
    akkaRevenue:new FormControl(),	
    currencyID:new FormControl(),
    documents:new FormControl(),
    poattachment:new FormControl(),
        // invoiceNumber:new FormControl(),	
    // invoiceValue:new FormControl(),	
    // invoiceDate:new FormControl(),
    // invoiceValue_VAT:new FormControl(),	
    // isInvoiceSent:new FormControl(),
    // isPaymentDone:new FormControl()
  })
  Projects!: IAddProject;
  PODetails : IAddPODetails[] = [];
  EditedPOdetails!:IAddPODetails
  orderForm!: any;
  poguid: any;
  project: any;
  selectedproject: any;
  id: any;
  base64Output: any;
  formdata: any;
 potoreplace:any;
 POflag?:boolean;
  setdropdown: any;
  currency?: string;
  documentlist?:IDocuments[]=[]
  constructor(
    private router: Router, 
    private obj : CommonDataService,
    private obj1 : RegisterUserService,
    private dialogservice:DialogService,
    private toastr:ToastrService
    //public data: IAddProject
    ) { }
  ngOnInit() {
    this.getPODetails();
  }

  getPODetailsvalue(){
    debugger;
    
    if(this.POflag==true){
     this.PODetails.forEach((element,index) => {
       if(element.ltipoNumber==this.potoreplace){
         this.PODetails.splice(index,1)
       }
     });
     this.OnEdit('New Changes Updated','PO Updated')
     //this.POflag=false;
    }
    const doc={
     fileName:this.document.fileName,
     fileType:this.document.fileType,
     fileData:this.base64Output
   }
   this.documentlist?.push(doc)
   const PODetailsvalue ={
   poReceivedFromAirbus : this.newprojectform.controls.poReceivedFromAirbus.value,
   airbusPONumber : this.newprojectform.controls.airbusPONumber.value,
   poReceivedFromAKKA : false,
   ltipoNumber : this.newprojectform.controls.ltipoNumber.value,
   poReceivedDate : this.newprojectform.controls.poReceivedDate.value,
   ltipoValue : this.newprojectform.controls.ltipoValue.value,
   documents:this.documentlist![0]
 }
 
 const POvalue: IAddPODetails = PODetailsvalue;
 this.PODetails.push(POvalue);
 ///////////////Resetting Document Object//////////////////////
 this.documentlist?.splice(0,this.documentlist.length)
 this.document.fileName="";
 this.document.fileData="";
 this.document.fileType="";
 ///////////////Resetting Document Object//////////////////////
 
 this.closeModalDialog(); 
 if(this.POflag==false){
   this.OnSuccess('PO Added Successfully','New PO Added')
 }
}
  getPODetails()
  {
    this.obj.getPODetails().subscribe(
      result => {
        if (result.data != null) {
            const poprojectData: IPODetails[] = result.data;
            this.POProjects = poprojectData;
            
        }
    })
  }

  div1: boolean = true;
  div2: boolean = true;
  div3: boolean = true;
  div4: boolean = true;

  
  public counts = ["Project Details",
  "Revenue","PO Details"];
  orderStatus:any;

  div1Function() {
    this.div1 = true;
    this.div2 = false;
    this.div3 = false;
    this.div4 = false;
    this.orderStatus="Project Details";
  }

  div2Function() {
    this.div2 = true;
    this.div1 = false;
    this.div3 = false;
    this.div4 = false;
    this.orderStatus = "Revenue";
  }

  div3Function() {
    this.div3 = true;
    this.div2 = false;
    this.div1 = false;
    this.div4 = false;
    this.orderStatus = "PO Details";
  }

  div4Function() {
    this.div4 = true;
    this.div3 = false;
    this.div2 = false;
    this.div1 = false;
    this.orderStatus = "PO Details";
  }

  
  goToPage() {
    debugger;
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
    debugger;

    this.Projects = Object.assign(this.newprojectform.value)
    console.log(this.Projects);

    this.Projects.poDetailsList = this.PODetails
    
    this.obj1.CreateProject(this.Projects).pipe().subscribe(response=>{console.log(response)});
    this.router.navigate(['/dashboard']);
    this.OnSuccess('Project Created Successfully','New Project Added')

  }
  reloadComponent() {
    let currentUrl = this.div3;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

  AddPO(){
   debugger
  
    this.Projects.poDetailsList = Object.assign(this.newprojectform.value)
    debugger
    console.log(this.Projects);
    
    this.obj1.CreateProject(this.Projects).pipe().subscribe(response=>{console.log(response)});
    this.reloadComponent()
    

  }
  
  backtodashboard(){
    this.router.navigate(['/dashboard']);
  }

 


  openModalDialog(data: any = ''){
    debugger
    this.display='block'; //Set block css
    this.POflag=false;
    this.newprojectform.get('ltipoNumber')?.setValue(data.ltipoNumber)
    this.newprojectform.get('poReceivedDate')?.setValue(data.poReceivedDate)
    this.newprojectform.get('ltipoValue')?.setValue(data.ltipoValue)
    this.newprojectform.get('poattachment')?.setValue('')
 }

 openModalDialog4(data: any = ''){
  debugger
  this.display='block'; //Set block css
  this.POflag=true
  this.potoreplace=data.ltipoNumber
  
   console.log(data)
  if (data != null || data == undefined)
  {
    this.newprojectform.get('ltipoNumber')?.setValue(data.ltipoNumber)
    this.newprojectform.get('poReceivedDate')?.setValue(data.poReceivedDate)
    this.newprojectform.get('ltipoValue')?.setValue(data.ltipoValue)
    this.newprojectform.get('poattachment')?.setValue('')
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
   debugger
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
//for attachment///////////////////////////////////////////////////////////////
handleUpload(event:any,data:any) {
  debugger
 
const max_size = 20971520000;
const file = event.target.files[0];

this.document.fileName=file.name;
this.document.fileType=file.type;

const reader = new FileReader();
reader.readAsDataURL(file);

  reader.onloadend = () => {
    this.base64Output= reader.result
    this.document.fileData=this.base64Output;
   
};
}
//for attachment///////////////////////////////////////////////////////////////
  //this.docc_api(data)
  deletePObyId(ltipoNumber:any){
    this.dialogservice.OpenConfirmDialog('Are You Sure You want to Delete this PO?').afterClosed().subscribe(res=>{
      console.log(res)
      if(res==true){
        this.PODetails.forEach((element,index) => {
          if(element.ltipoNumber==ltipoNumber){
            this.PODetails.splice(index,1)
          }
        });
        this.OnDelete('PO Deleted','Deleted')
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

