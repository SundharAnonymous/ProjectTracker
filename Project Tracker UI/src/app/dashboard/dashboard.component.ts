import { Component, OnInit, SimpleChanges } from '@angular/core';

import { CommonDataService } from '../services/common-data-services';
//import { type } from 'os';
//import { ApiService } from '../dashboard/dashboard.service';
import { IProject, Project } from '../model/project.model';
import { IServerResponse } from '../model/serverresponse.model';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { IInvoice } from '../model/invoice.model';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projectName: any
  emptyflag?:Boolean=false
  AllProjects: Array<any> = [];
  public InvoicedetailsPresentCheck: IInvoice[] = [];
  InvoicePresent?:boolean=false
 
   //public AllProjects: IProject[] = [];
   order: any;
   data: any;
   isDesc: boolean= false;
  showData: any;
   isTRDReceived: any;
   invoiceTable: boolean= false;
   groupedData:Array<IProject>=[];
  myRadio: any;
 
  constructor(
    private commonDataService: CommonDataService, private router: Router,private dialogservice:DialogService, private toastr:ToastrService
    ) { }
  ngOnInit() {
    this.getAllProjectsList();
    this.getAllInvoiceList();
    
  }
  
getAllInvoiceList(){
  this.commonDataService.getAllInvoiceList().subscribe(result=>{
    const invoicePresentData: IInvoice[] = result.data;
    this.InvoicedetailsPresentCheck = invoicePresentData;
  })
}
  getAllProjectsList()
  {
    debugger
    this.commonDataService.getAllProjects().subscribe(
      result => {
      
        if (result.data != null){ 
            const projectData: IProject[] = result.data;
            this.AllProjects = projectData;
            this.AllProjects.forEach(element => {

              if(!this.groupedData.some((item) => item.projectID == element.projectID)){

                this.groupedData.push(element)  

              }

            });

        
        }
        else{
          this.emptyflag=true
        }
    }
    )

  }
  createprojectpage() {
    
    this.router.navigate(['/createproject']);

  }
  ViewDetailsPage(id:any){
    for(var i=0;i<=this.InvoicedetailsPresentCheck.length-1;i++){
      if(this.InvoicedetailsPresentCheck[i].projectID==id){
        this.InvoicePresent=true
        break;
      }
      else{
        this.InvoicePresent=false;
        
      }
    }
    this.router.navigate(['/viewprojectdetails/',id,this.InvoicePresent]);
}
  
  sortDataId(property: any){
   
    console.log(this.groupedData);
    if(this.isDesc){
    this.groupedData.sort((a,b) => a.projectID.localeCompare(b.projectID));
    }else{
    this.groupedData.sort((a,b) => b.projectID.localeCompare(a.projectID));
    }
    this.isDesc= this.isDesc == true ? false: true;
    
    }
    sortDataName(property: any){
       
      console.log(this.groupedData);
      if(this.isDesc){
      this.groupedData.sort((a,b) => a.projectName.localeCompare(b.projectName));
      }else{
      this.groupedData.sort((a,b) => b.projectName.localeCompare(a.projectName));
      }
      this.isDesc= this.isDesc == true ? false: true;
      
      }
    sortDataTRD(property: any){
       
      console.log(this.AllProjects);
      
       if(this.isDesc){
      this.AllProjects.sort((a,b) => a.isTRDReceived.localeCompare(b.isTRDReceived));
      }else{
      this.AllProjects.sort((a,b) => b.isTRDReceived.localeCompare(a.isTRDReceived));
      }
      this.isDesc= this.isDesc == true ? false: true;
      
      }
  
      sortDataCRD(property: any){
         
        console.log(this.AllProjects);
        if(this.isDesc){
        this.AllProjects.sort((a,b) => a.isCRDSent.localeCompare(b.isCRDSent));
        }else{
        this.AllProjects.sort((a,b) => b.isCRDSent.localeCompare(a.isCRDSent));
        }
        this.isDesc= this.isDesc == true ? false: true;
        
        }
        sortDataPOAB(property: any){
           
          console.log(this.AllProjects);
          if(this.isDesc){
          this.AllProjects.sort((a,b) => a.poReceivedFromAirbus.localeCompare(b.poReceivedFromAirbus));
          }else{
          this.AllProjects.sort((a,b) => b.poReceivedFromAirbus.localeCompare(a.poReceivedFromAirbus));
          }
          this.isDesc= this.isDesc == true ? false: true;
          
          }
          sortDataPOAK(property: any){
             
            console.log(this.AllProjects);
            if(this.isDesc){
            this.AllProjects.sort((a,b) => a.poReceivedFromAKKA.localeCompare(b.poReceivedFromAKKA));
            }else{
            this.AllProjects.sort((a,b) => b.poReceivedFromAKKA.localeCompare(a.poReceivedFromAKKA));
            }
            this.isDesc= this.isDesc == true ? false: true;
            
            }
            sortDataPV(property: any){
               
              console.log(this.AllProjects);
              if(this.isDesc){
              this.AllProjects.sort((a,b) => a.projectValue.localeCompare(b.projectValue));
              }else{
              this.AllProjects.sort((a,b) => b.projectValue.localeCompare(a.projectValue));
              }
              this.isDesc= this.isDesc == true ? false: true;
              
              }
              sortDataLV(property: any){
                 
                console.log(this.AllProjects);
                if(this.isDesc){
                this.AllProjects.sort((a,b) => a.ltiValue.localeCompare(b.ltiValue));
                }else{
                this.AllProjects.sort((a,b) => b.ltiValue.localeCompare(a.ltiValue));
                }
                this.isDesc= this.isDesc == true ? false: true;
                
                }
              
  



 reloadCurrentRoute() {
   debugger
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
ViewModelDelete(id:any){
  this.dialogservice.OpenConfirmDialog('Are You Sure You want to Delete this Project?').afterClosed().subscribe(res=>{
    console.log(res)
    if(res==true){
      this.groupedData.forEach((element,index) => {
        if(element.pkguid==id){
          this.groupedData.splice(index,1)
        }  
      });
      this.deleteProjectbyId(id)
    }})
     
  }
  deleteProjectbyId(id:any){
        this.commonDataService.deleteproject(id).subscribe();
        this.OnDelete('Project Deleted Successfully','Project Deleted')
     }

    EditProject(id:any){
      debugger
      if(this.InvoicedetailsPresentCheck.length != 0){
        for(var i=0; i<= this.InvoicedetailsPresentCheck.length-1;i++){
          if(this.InvoicedetailsPresentCheck[i].projectID==id){
            this.InvoicePresent=true;
            break;
          }
          else{
            this.InvoicePresent=false;
          }
        }
      }
      else{
        this.InvoicePresent=false;
      }
    //   if( this.InvoicedetailsPresentCheck.length != 0){
    //  if (this.InvoicedetailsPresentCheck.filter(x=>(x.projectID==id)) != null){
    //    this.InvoicePresent=true
    //  }
    //  else{
    //    this.InvoicePresent=false
    //  }
    // }
    //  else{
    //    this.InvoicePresent=false
    //  } 
      this.router.navigate(['/',id,this.InvoicePresent]);
    }

    invoiceRB(){
      this.invoiceTable= !this.invoiceTable;
    }
   
    RadioValue(id:any){
      this.myRadio=id
    }
    invoicepage(){
     debugger
     this.router.navigate(['addinvoice/',this.myRadio])
    }

    /////////////////////NOTIFICATIONS///////////////
  OnSuccess(message:any,title:any){
    this.toastr.success(message,title)
  }
  
  OnDelete(message:any,title:any){
    this.toastr.error(message,title)
  }
}

