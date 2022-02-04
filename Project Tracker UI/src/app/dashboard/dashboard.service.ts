import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from '../model/project.model';
import { IServerResponse } from '../model/serverresponse.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {
      
   }
   public getCountry(){
    return this.httpClient.get<IProject[]>('https://localhost:44310/GetCompleteDetails');
    
  }
}
