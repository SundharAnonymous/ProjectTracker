import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { EditInvoiceComponent } from '../edit-invoice/edit-invoice.component';
import { IAddProject } from '../model/AddProject';
import { IDocuments } from '../model/Documents';
import { IInvoice } from '../model/invoice.model';
import { IPODetails } from '../model/PODetails';
import { IAddPODetails } from '../model/PostPOdetail';
import { CommonDataService } from '../services/common-data-services';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit, AfterViewInit  {
  public POProjects: IAddPODetails[] = [];
  public Invoicedetails2: IInvoice[] = [];
  setdropdown: any;
  InvoicePresent?:boolean
  currency?: string;
  finalbackdonebuttonflag:boolean=false
  constructor(private router:Router,private route:ActivatedRoute,private commonDataService:CommonDataService,private fb:FormBuilder,private dialogservice:DialogService,private datepipe:DatePipe,private toastr:ToastrService) { }
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
    poReceivedFromAKKA:new FormControl(),
    ltipoNumber:new FormControl(),	
    poReceivedDate:new FormControl(),
    ltipoValue:new FormControl(),	
    projectValue:new FormControl(),	
    ltiValue:new FormControl(),	
    ltiOffShoringPercentage:new FormControl(), 
    ltiOffShoring:new FormControl(),	
    akkaContribution:new FormControl(),	
    akkaContractualMargin:new FormControl(),	
    akkaRevenue:new FormControl(),
    //documents:new FormControl(),
    poattachment:new FormControl(),
    currencyID:new FormControl()
  })
  
  ngOnInit(): void {
    this.pkguid= this.route.snapshot.paramMap.get('pkguid');
    this.invflag=this.route.snapshot.paramMap.get('invflag')
    this.GetProjectByIdDetails();
    this.SetFlagFunction();
    this.getPOByProjectID();
  }
  ngAfterViewInit(){
    //this.toggleDisplayisOppIDCreated()
        }
    // ////////Invoices//////////
    // @ViewChild(EditInvoiceComponent) child:any;
    // @Input() finalBackDoneButtonFlag?:boolean
    // ///////Invoices//////////
    startDateFormatted:string=''
  base64Output? : any;
  formdata:any=[];
  div1: boolean = true;
  div2: boolean = true;
  div3: boolean = true;
  div4:boolean=true;
  pkguid:any;
  project:any;
  selectedproject:any
  po:any;
  selectedpo:any
  EditedProject!:IAddProject
  currentPOonReadPOGUID:any
  public counts = ["Project Details",
  "Revenue","PO Details","Invoice Details"];
  orderStatus:any;
  display='none';
  displaytwo='none';
  POflag?:boolean;
  invflag?:any;
i:number=0
PODetails : IAddPODetails[] = [];
documentlist?:IDocuments[]=[]
POByID:any
potoreplace:any;
document:IDocuments={
  fileName:"",
  fileType:"",
  fileData:"",
}

  div1Function() {
    this.div1 = true;
    this.div2 = false;
    this.div3 = false;
    this.div4=false;
    this.orderStatus="Project Details";
    this.i=0
    
  }

  div2Function() {
    debugger
    this.getKeyByValue(this.POProjects)
    this.div2 = true;
    this.div1 = false;
    this.div3 = false;
    this.div4=false;
    this.orderStatus = "Revenue";
    this.i=0
    
  }

  div3Function() {
    
    this.div3 = true;
    this.div2 = false;
    this.div1 = false;
    this.div4=false;
    this.orderStatus = "PO Details";
    this.i=2
  }

  div4Function() {
    debugger
    this.div3 = false;
    this.div2 = false;
    this.div1 = false;
    this.div4=true;
    this.orderStatus = "Invoice Details";
    this.i=2
    
  }

  
  goToPage() {
    debugger;
    this.router.navigate(['/dashboard']);

  }
  
  isShowone = false;
  isShowtwo = false
  isShowthree = false
  isShowfour = false;

  toggleDisplayisOppIDCreated(event:any) {
    debugger
    if(this.selectedproject.isOppIDCreated == true){
      console.log(this.selectedproject.isOppIDCreated)
      this.isShowone=true
    }
    if(event.target.checked==false){
      this.isShowone=false
    }
    if(event.target.checked==true){
      this.isShowone=true
    }
  }

  toggleDisplayisTRDReceived(event:any) {
    if(this.selectedproject.isTRDReceived == true){
      console.log(this.selectedproject.isOppIDCreated)
      this.isShowtwo=true
    }
    if(event.target.checked==false){
      this.isShowtwo=false
    }
    if(event.target.checked==true){
      this.isShowtwo=true
    }
    //this.isShowtwo = !this.isShowtwo;
  }

  toggleDisplayisCRDsend(event:any){
    debugger
    if(this.selectedproject.isCRDSent == true){
      //console.log(this.selectedproject.isOppIDCreated)
      this.isShowthree=true
    }
    if(event.target.checked==false){
      this.isShowthree=false
    }
    if(event.target.checked==true){
      this.isShowthree=true
    }
    }
  toggleDisplayLTIpono(){
    this.isShowfour = !this.isShowfour;
  }
  backtodashboard(){
    this.router.navigate(['/dashboard']);
  }
  GetProjectByIdDetails(){
    debugger
     this.commonDataService.GetProjectbyid(this.pkguid).subscribe(
      result => {
        if (result != null) {
          
            //const projectData: IProject[] = result;
            this.project = result;
            this.selectedproject=this.project.data[0];
            //this.startDateFormatted=
            this.newprojectform.get('projectID')?.setValue(this.selectedproject.projectID)
            this.newprojectform.get('projectName')?.setValue(this.selectedproject.projectName)
            this.newprojectform.get('description')?.setValue(this.selectedproject.description)
            this.newprojectform.get('country')?.setValue(this.selectedproject.country)
            this.newprojectform.get('startDate')?.setValue(this.datepipe.transform(this.selectedproject.startDate,'yyyy-MM-dd'))
            this.newprojectform.get('status')?.setValue(this.selectedproject.status)
            this.newprojectform.get('isOppIDCreated')?.setValue(this.selectedproject.isOppIDCreated)
            this.newprojectform.get('isTRDReceived')?.setValue(this.selectedproject.isTRDReceived)
            this.newprojectform.get('trdReceivedDate')?.setValue(this.datepipe.transform(this.selectedproject.trdReceivedDate,'yyyy-MM-dd'))
            this.newprojectform.get('isCRDSent')?.setValue(this.selectedproject.isCRDSent)
            this.newprojectform.get('crdSentDate')?.setValue(this.datepipe.transform(this.selectedproject.crdSentDate,'yyyy-MM-dd'))
            //this.newprojectform.get('airbusPONumber')?.setValue(this.selectedproject.poDetailsList.airbusPONumber)
            this.newprojectform.get('poReceivedFromAKKA')?.setValue(this.selectedproject.poReceivedFromAKKA)
            this.newprojectform.get('ltipoNumber')?.setValue(this.selectedproject.ltipoNumber)
            this.newprojectform.get('poReceivedDate')?.setValue(this.selectedproject.poReceivedDate)
            this.newprojectform.get('ltipoValue')?.setValue(this.selectedproject.ltipoValue)
            this.newprojectform.get('projectValue')?.setValue(this.selectedproject.projectValue)
            this.newprojectform.get('ltiValue')?.setValue(this.selectedproject.ltiValue)
            this.newprojectform.get('ltiOffShoringPercentage')?.setValue(this.selectedproject.ltiOffShoringPercentage)
            this.newprojectform.get('ltiOffShoring')?.setValue(this.selectedproject.ltiOffShoring)
            this.newprojectform.get('akkaContribution')?.setValue(this.selectedproject.akkaContribution)
            this.newprojectform.get('akkaContractualMargin')?.setValue(this.selectedproject.akkaContractualMargin)
            this.newprojectform.get('akkaRevenue')?.setValue(this.selectedproject.akkaRevenue)
            //this.newprojectform.get('poReceivedFromAirbus')?.setValue(this.selectedproject.poDetailsList.poReceivedFromAirbus)

           this.newprojectform.get('currencyID')?.setValue(this.selectedproject.currencyID)
            
        }
     })
     //this.toggleDisplayisOppIDCreated()
     console.log(this.selectedproject)
  }

  PostEditedProject(){
    debugger
    this.EditedProject = Object.assign(this.newprojectform.value)
    this.EditedProject.poDetailsList = this.PODetails
    console.log(this.EditedProject);
      this.commonDataService.EditProjectbyID(this.EditedProject,this.pkguid).subscribe();
      this.router.navigate(['/dashboard'])
      this.OnSuccess('New Changes Updated','Project Updated')
  }

  openModalDialog(data:any=""){
    debugger
    //this.newprojectform.reset()
    this.display='block'; //Set block css
    if(data==""){
      this.POflag=true;
      this.newprojectform.get('ltipoNumber')?.setValue(data.ltipoNumber)
    this.newprojectform.get('poReceivedDate')?.setValue(this.datepipe.transform(data.poReceivedDate,'yyyy-MM-dd'))
    this.newprojectform.get('ltipoValue')?.setValue(data.ltipoValue)
    this.newprojectform.get('poattachment')?.setValue('')
    }
    else{
      this.POflag=undefined;
      this.potoreplace=data.ltipoNumber
   console.log(data)
  if (data != null || data == undefined)
  {
    this.newprojectform.get('ltipoNumber')?.setValue(data.ltipoNumber)
    this.newprojectform.get('poReceivedDate')?.setValue(this.datepipe.transform(data.poReceivedDate,'yyyy-MM-dd'))
    this.newprojectform.get('ltipoValue')?.setValue(data.ltipoValue)
    this.newprojectform.get('poattachment')?.setValue('')
  }
    }
 }

 closeModalDialog(){
  this.display='none'; //set none css after close dialog
 }
 closeModalDialogThree(){
  this.display='none'; //set none css after close dialog
 }

 
 openModalDialogTwo(data:any){
  this.displaytwo='block'; //Set block css

}



openModalDialogThree(data: any ){
  debugger
  if(typeof(data)==='number')
  {
    this.display='block'; //Set block css
  this.POflag=false
  //this.potoreplace=this.newprojectform.get('ltipoNumber')?.value
  this.currentPOonReadPOGUID=data
  this.commonDataService.GetPOdetailsbyid(data).subscribe(result=>{
    if (result != null){
      console.log(result)
      this.po = result;
            this.selectedpo=this.po.data[0];
            console.log(this.selectedpo)
    this.newprojectform.get('ltipoNumber')?.setValue(this.selectedpo.ltipoNumber)
    this.newprojectform.get('poReceivedDate')?.setValue(this.datepipe.transform(this.selectedpo.poReceivedDate,'yyyy-MM-dd'))
    this.newprojectform.get('ltipoValue')?.setValue(this.selectedpo.ltipoValue)
    this.newprojectform.get('poattachment')?.setValue('')
    }
  })
   console.log(data)

  }
}

EditPOByPOID(){
  debugger
  ////////////////ADD PO/////////////
  if(this.POflag==true){
    
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
     ///////////////Resetting the Documents Object///////////////
     this.documentlist?.splice(0,this.documentlist.length)
     this.document.fileName="";
      this.document.fileData="";
      this.document.fileType="";
///////////////Resetting the Documents Object///////////////
     this.closeModalDialog();  
     //this.POflag=false
     this.OnSuccess('PO Added Successfully','New PO Added') 
  }
  debugger;
  //////////DATABASE EDIT/////////////
  if(this.POflag==false){
    this.ViewModelDeleteForEditPO(this.currentPOonReadPOGUID)
    const doc={
      fileName:this.document.fileName,
      fileType:this.document.fileType,
      fileData:this.base64Output
    }
    this.documentlist?.push(doc)
    const PODetailsvalue ={
      poguid:this.currentPOonReadPOGUID,
      poReceivedFromAirbus : this.newprojectform.controls.poReceivedFromAirbus.value,
      airbusPONumber : this.newprojectform.controls.airbusPONumber.value,
      poReceivedFromAKKA : false,
      ltipoNumber : this.newprojectform.controls.ltipoNumber.value,
      poReceivedDate : this.newprojectform.controls.poReceivedDate.value,
      ltipoValue : this.newprojectform.controls.ltipoValue.value,
      documents:this.documentlist![0]
     }
     const POvalue: IAddPODetails = PODetailsvalue;
     this.POProjects.push(PODetailsvalue)
     ///////////////Resetting the Documents Object///////////////
     this.documentlist?.splice(0,this.documentlist.length)
     this.document.fileName="";
      this.document.fileData="";
      this.document.fileType="";
///////////////Resetting the Documents Object///////////////
    //  this.PODetails.push(POvalue);
     this.closeModalDialogThree();  
    this.commonDataService.EditPO(PODetailsvalue).subscribe()
    this.OnEdit('New Changes Updated','PO Updated')
  }
//////////LOCAL EDIT/////////////
  if(this.POflag==undefined){
    const doc={
      fileName:this.document.fileName,
      fileType:this.document.fileType,
      fileData:this.base64Output
    }
    this.documentlist?.push(doc)
    const PODetailsvalue ={
      poReceivedFromAirbus : this.newprojectform.controls.poReceivedFromAirbus.value,
      airbusPONumber :this.newprojectform.controls.airbusPONumber.value,
      poReceivedFromAKKA : false,
      ltipoNumber : this.newprojectform.controls.ltipoNumber.value,
      poReceivedDate : this.newprojectform.controls.poReceivedDate.value,
      ltipoValue : this.newprojectform.controls.ltipoValue.value,
      documents:this.documentlist![0]
     }
     const POvalue: IAddPODetails = PODetailsvalue;
     this.PODetails.forEach((element,index) => {
      if(element.ltipoNumber==this.potoreplace){
        this.PODetails.splice(index,1)
      }
    });
     this.PODetails.push(POvalue);
     ///////////////Resetting the Documents Object///////////////
     this.documentlist?.splice(0,this.documentlist.length)
      this.document.fileName="";
      this.document.fileData="";
      this.document.fileType="";
      ///////////////Resetting the Documents Object///////////////
    this.closeModalDialog(); 
    this.OnEdit('New Changes Updated','PO Updated')
  }
}
 


closeModalDialogTwo(){
  this.displaytwo='none'; //set none css after close dialog
 }


 getPODetailsvalue(){
  debugger;
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
this.documentlist?.splice(0,this.documentlist.length)
this.closeModalDialog();  
}

getPODetails()
{
  debugger
  this.commonDataService.getPODetails().subscribe(
    result => {
      if (result.data != null) {
        
          const poprojectData: IPODetails[] = result.data;
          this.POProjects = poprojectData;
          
      }
  })
}

getPOByProjectID(){
  debugger
  this.commonDataService.ViewPODetailsByProjectID1(this.pkguid).subscribe(result => {
    const poprojectData: IPODetails[] = result.data;
    this.POProjects = poprojectData;
        console.log(this.POProjects);
       
        this.getKeyByValue(this.POProjects)
    }
)
}
 getKeyByValue(object:any) {
   this.POProjects.forEach(element => {
          this.newprojectform.get('poReceivedFromAirbus')?.setValue(element.poReceivedFromAirbus)
          this.newprojectform.get('airbusPONumber')?.setValue(element.airbusPONumber)
        });
}
DeletePOByID(id:any){
 this.commonDataService.DeletePOByID(id).subscribe();
 this.OnDelete('PO Deleted','Deleted')
}

  DeleteLocalPOByID(id:any){
    this.dialogservice.OpenConfirmDialog('Are You Sure You want to Delete this PO?').afterClosed().subscribe(res=>{
      console.log(res)
      if(res==true){
        this.PODetails.forEach((element,index) => {
          if(element.ltipoNumber==id){
            this.PODetails.splice(index,1)
          }
        });
        this.OnDelete('PO Deleted','Deleted')
  }
    })}

ViewModelDeleteForEditPO(id:any){
  this.POProjects.forEach((element,index) => {
    if(element.poguid==id){
      this.POProjects.splice(index,1)
    }
  });
}
    ViewModelDelete(id:any){
      this.dialogservice.OpenConfirmDialog('Are You Sure You want to Delete this PO?').afterClosed().subscribe(res=>{
        console.log(res)
        if(res==true){
          this.DeletePOByID(id)
          this.POProjects.forEach((element,index) => {
            if(element.poguid==id){
              this.POProjects.splice(index,1)
            }
          });
    }})
}

SetFlagFunction(){
  if(this.invflag=="true"){
    this.InvoicePresent=true
  }
  else{
    this.InvoicePresent=false
  }
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
flagsetter(selectdropdownflag: boolean) {
  debugger
  this.finalbackdonebuttonflag = selectdropdownflag
  console.log(this.finalbackdonebuttonflag);
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

 
  
