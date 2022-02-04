import { Injectable } from '@angular/core';
import { apiEndpoints } from '../configuration/apiEndPoints';



@Injectable({
providedIn: 'root'
})
export class ConfigurationService {
// API Endpoints - Define all values as public
// Prefix with ep for endpoint
public epGetCompleteDetails: string = apiEndpoints.GetCompleteDetails;
public epGetInvoice: string = apiEndpoints.GetInvoice;
public epAddProject: string = apiEndpoints.AddProject;
public epDeleteProject: string=apiEndpoints.DeleteProject;
public epGetProjectbyID: string=apiEndpoints.GetProjectbyID;
public epGetPOdetailsbyid: string=apiEndpoints.GetPOdetailsbyid;
public epEditProject:string=apiEndpoints.EditProject;
public epPODetails: string = apiEndpoints.PODetails;
public epPostfile:string=apiEndpoints.PostFile;
public epPOByprojectID:string=apiEndpoints.ViewPODetailsByProjectID;
public epDeletePOByID:string=apiEndpoints.DeletePOByID;
public epEditPO: string = apiEndpoints.EditPOByPOID;
public epAddInvoice:string = apiEndpoints.AddInvoice;
public epViewDetailsPage:string= apiEndpoints.ViewDetailsPage;
public epEditInvoice:string= apiEndpoints.EditInvoice;
public epDeleteInvoiceByID:string=apiEndpoints.DeleteInvoiceByID;
public epGetInvoiceByProjectID:string=apiEndpoints.GetInvoiceDetailsByProjectID;
public epGetAllInvoice:string=apiEndpoints.GetAllInvoices;

constructor() { }
}