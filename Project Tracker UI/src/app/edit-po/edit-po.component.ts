import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAddProject } from '../model/AddProject';
import { IPODetails } from '../model/PODetails';
import { IAddPODetails } from '../model/PostPOdetail';
import { CommonDataService } from '../services/common-data-services';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditPOComponent implements OnInit {
  public POProjects: IPODetails[] = [];
  constructor(private router:Router,private route:ActivatedRoute,private commonDataService:CommonDataService,private fb:FormBuilder) { }
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
    // poReceivedFromAirbus:new FormControl(),
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
    // invoiceNumber:new FormControl(),	
    // invoiceValue:new FormControl(),	
    // invoiceDate:new FormControl(),
    // invoiceValue_VAT:new FormControl(),	
    // isInvoiceSent:new FormControl(),
    // isPaymentDone:new FormControl()
  })
  
  ngOnInit(): void {
    this.pkguid= this.route.snapshot.paramMap.get('pkguid');
    this.GetProjectByIdDetails();
    this.getPODetails();
  }
  ngAfterViewInit(){
   
    ///////////SETTING PREFILLED VALUES///////////////////
    
  }
  div1: boolean = true;
  div2: boolean = true;
  div3: boolean = true;
  pkguid:any;
  Projects!: IAddProject;
  project:any;
  selectedproject:any
  EditedProject!:IAddProject
  public counts = ["Project Details",
  "Revenue","PO Details"];
  orderStatus:any;
  display='none';
  displaytwo='none';
  PODetails : IAddPODetails[] = [];
  getPODetailsvalue (){
    debugger;
   const PODetailsvalue ={
   poReceivedFromAirbus : false,
   airbusPONumber : '',
   poReceivedFromAKKA : false,
   ltipoNumber : this.newprojectform.controls.ltipoNumber.value,
   poReceivedDate : this.newprojectform.controls.poReceivedDate.value,
   ltipoValue : this.newprojectform.controls.ltipoValue.value,
  }
  const POvalue: IAddPODetails = PODetailsvalue;
  this.PODetails.push(POvalue);
  this.closeModalDialog();  
  }
  
  getPODetails()
  {
    this.commonDataService.getPODetails().subscribe(
      result => {
        if (result.data != null) {
            const poprojectData: IPODetails[] = result.data;
            this.POProjects = poprojectData;
            
        }
    })
  }
  
  div1Function() {
    this.div1 = true;
    this.div2 = false;
    this.div3 = false;
    this.orderStatus="Project Details";
  }

  div2Function() {
    this.div2 = true;
    this.div1 = false;
    this.div3 = false;
    this.orderStatus = "Revenue";
  }

  div3Function() {
    this.div3 = true;
    this.div2 = false;
    this.div1 = false;
    this.orderStatus = "PO Details";
  }

  
  goToPage() {
    debugger;
    this.router.navigate(['/dashboard']);

  }
  
  isShowone = this.newprojectform.get('isOppIDCreated')?.value;
  isShowtwo = false;
  isShowthree = false;
  isShowfour = false;

  toggleDisplayisOppIDCreated() {
    debugger
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
            this.newprojectform.get('projectID')?.setValue(this.selectedproject.projectID)
            this.newprojectform.get('projectName')?.setValue(this.selectedproject.projectName)
            this.newprojectform.get('description')?.setValue(this.selectedproject.description)
            this.newprojectform.get('country')?.setValue(this.selectedproject.country)
            this.newprojectform.get('startDate')?.setValue(this.selectedproject.startDate)
            this.newprojectform.get('status')?.setValue(this.selectedproject.status)
            this.newprojectform.get('isOppIDCreated')?.setValue(this.selectedproject.isOppIDCreated)
            this.newprojectform.get('isTRDReceived')?.setValue(this.selectedproject.isTRDReceived)
            this.newprojectform.get('trdReceivedDate')?.setValue(this.selectedproject.trdReceivedDate)
            this.newprojectform.get('isCRDSent')?.setValue(this.selectedproject.isCRDSent)
            this.newprojectform.get('crdSentDate')?.setValue(this.selectedproject.crdSentDate)
            this.newprojectform.get('airbusPONumber')?.setValue(this.selectedproject.airbusPONumber)
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
        }
     })
  }

  PostEditedProject(){ 
    debugger
    
    this.EditedProject = Object.assign(this.newprojectform.value)
    this.EditedProject.poDetailsList = this.PODetails
    console.log(this.EditedProject);
      this.commonDataService.EditProjectbyID(this.EditedProject,this.pkguid).subscribe();
      this.router.navigate(['/dashboard'])
  }

  openModalDialog(){
    this.display='block'; //Set block css
 }

 closeModalDialog(){
  this.display='none'; //set none css after close dialog
 }

 
 openModalDialogTwo(){
  this.displaytwo='block'; //Set block css
}

 closeModalDialogTwo(){
  this.displaytwo='none'; //set none css after close dialog
 }


}
