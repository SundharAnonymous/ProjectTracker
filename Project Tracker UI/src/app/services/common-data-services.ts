import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ConfigurationService } from '../services/configuration.service';
import { Observable } from 'rxjs';
import { IServerResponse } from '../model/server-response.model';
import { HttpParams } from '@angular/common/http';
import { IProject } from '../model/project.model';
import { IAddProject } from '../model/AddProject';
import { IPODetails } from '../model/PODetails';
import { IDocuments } from '../model/Documents';
import { IAddPODetails } from '../model/PostPOdetail';
import { IInvoice } from '../model/invoice.model';
import { IAddInvoice, IAddInvoiceList } from '../model/AddInvoice';
import { IViewDetails } from '../model/ViewDetails';
//import { IAddProject } from '../model/AddProject';
//import { IAddProject } from '../model/AddProject';


export interface ICommonDataService {
    getAllProjects(): Observable<IServerResponse<IProject[]>>
    // addUpdateKits(data: IKitManagement,operation:string): Observable<IServerResponse<IKitManagement>>;


}

@Injectable()
export class CommonDataService implements ICommonDataService {

    constructor(public apiService: ApiService,
        public configurationService: ConfigurationService) {
    }


    getAllProjects(): Observable<IServerResponse<IProject[]>> {
        return this.apiService.get<IProject[]>(this.configurationService.epGetCompleteDetails);
    }

    // getInvoice(id:any, id2:any): Observable<IServerResponse<IInvoice[]>> {
    //     return this.apiService.get<IInvoice[]>(this.configurationService.epGetInvoice+id, id2);
    // }
getAllInvoiceList():Observable<IServerResponse<IInvoice[]>>{
    return this.apiService.get<IInvoice[]>(this.configurationService.epGetAllInvoice);
}

    getPODetails(): Observable<IServerResponse<IPODetails[]>> {
        return this.apiService.get<IPODetails[]>(this.configurationService.epPODetails);
    }

    postProject(data: IAddProject): Observable<IServerResponse<IAddProject>> {
        debugger;
       // params = new HttpParams().set(data)
        // if(operation=='Edit')
        // {return this.apiService.put<IKitManagement>(this.configurationService.ekit, data);}
        // else
        {return this.apiService.post<IAddProject>(this.configurationService.epAddProject, data);}
    }
    deleteproject(id:string)
    {
        return this.apiService.deletebyid(this.configurationService.epDeleteProject+id,id);
    }

    GetProjectbyid(id:string)
    {
        return this.apiService.getbyid(this.configurationService.epGetProjectbyID+id,id);
    }

    GetPOdetailsbyid(id:any)
    {
        return this.apiService.getbyid(this.configurationService.epGetPOdetailsbyid+id,id);
    }

    EditProjectbyID(data:IAddProject,id:any){
        debugger
        {return this.apiService.put<IAddProject>(this.configurationService.epEditProject+id, data);}
    }

    postfile(data: IDocuments,id:any): Observable<IServerResponse<IDocuments>> {

        debugger;
        {return this.apiService.post<IDocuments>(this.configurationService.epPostfile+id, data);}

    }


    ViewPODetailsByProjectID(id:any)
    {
        //return this.apiService.getbyid<IPODetails[]>(this.configurationService.epPOByprojectID+id,id);
        return this.apiService.getbyid(this.configurationService.epPOByprojectID+id,id);
    }


    ViewPODetailsByProjectID1(id:any): Observable<IServerResponse<IPODetails[]>>
    {
        return this.apiService.getPOByprojectID<IPODetails[]>(this.configurationService.epPOByprojectID+id,id);
        //return this.apiService.getbyid(this.configurationService.epPOByprojectID+id,id);
    }

    DeletePOByID(id:number){
        return this.apiService.deletebyid(this.configurationService.epDeletePOByID+id,id);
    }
    EditPO(data: IAddPODetails): Observable<IServerResponse<IAddPODetails>> {
        debugger;

        {return this.apiService.post<IAddPODetails>(this.configurationService.epEditPO, data);}
    }
    EditInvoice(data: IAddInvoiceList,ProjectID:any,POID:any,InvoiceID:any): Observable<IServerResponse<IAddInvoiceList>> {
        debugger;

        {return this.apiService.post<IAddInvoiceList>(this.configurationService.epEditInvoice+ProjectID+"/"+POID+"/"+InvoiceID, data);}
    }
    DeleteInvoiceByID(ProjectID:any,POID:any,InvoiceID:any){
        return this.apiService.deletebyid(this.configurationService.epDeleteInvoiceByID+ProjectID+"/"+POID+"/"+InvoiceID,ProjectID);
    }
    postInvoice(data: IAddInvoiceList,pkguid:any,poid:any): Observable<IServerResponse<IAddInvoiceList>> {
        debugger;
        {return this.apiService.post<IAddInvoiceList>(this.configurationService.epAddInvoice+pkguid+"/"+poid, data);}

    }
    getInvoice(pkguid:any, poid:any): Observable<IServerResponse<IInvoice[]>> {
        return this.apiService.get<IInvoice[]>(this.configurationService.epGetInvoice+pkguid+"/"+ poid);
    }
    getInvoiceByProjectID(pkguid:any): Observable<IServerResponse<IInvoice[]>> {
        return this.apiService.get<IInvoice[]>(this.configurationService.epGetInvoiceByProjectID+pkguid);
    
    }
    
    ViewDetailsPage(id:any): Observable<IServerResponse<IViewDetails[]>> {
        return this.apiService.get<IViewDetails[]>(this.configurationService.epViewDetailsPage+id,id);
    }
    // ViewPODetailsByProjectID1(id:any): Observable<IServerResponse<IPODetails[]>>
    // {
    //     return this.apiService.getPOByprojectID<IPODetails[]>(this.configurationService.epPOByprojectID+id,id);
    //     //return this.apiService.getbyid(this.configurationService.epPOByprojectID+id,id);
    // }

    // addUpdateKits(data: IKitManagement,operation:string): Observable<IServerResponse<IKitManagement>> {
    //     if(operation=='Edit')
    //     {return this.apiService.put<IKitManagement>(this.configurationService.ekit, data);}
    //     else
    //     {return this.apiService.post<IKitManagement>(this.configurationService.ekit, data);}
    // }
}