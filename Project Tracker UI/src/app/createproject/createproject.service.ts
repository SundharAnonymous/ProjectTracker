import { HttpClient,HttpErrorResponse,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAddProject } from "../model/AddProject";


@Injectable({
    providedIn: 'root'
  })
  export class RegisterUserService {
  
    constructor(private http:HttpClient) { }
  
    //Variable to store the request URL for accessing API.
    req:string="https://localhost:44310/AddProject";
  
    //Method to get the list of all user from the API.
    
     //Method  to create a new user.
    CreateProject(Projects:IAddProject):Observable<IAddProject>
    {
        debugger
      // return this.httpClient.post<Flight>(this.FlightApiUrl + '/Flights/', JSON.stringify(flight), this.httpOptions)    
      return this.http.post<IAddProject>(this.req,Projects,{
        
        headers:new HttpHeaders({
          'Content-Type':'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Method':'*'
          
        })
      });
    }}
