import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { IPublicClientApplication } from '@azure/msal-browser';
import { IProject } from '../model/project.model';
import { CommonDataService } from '../services/common-data-services';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private msalService: MsalService, private router:Router,private jwtHelper: JwtHelperService,private route:ActivatedRoute,private commonDataService:CommonDataService,private toastr:ToastrService) { }
pkguid:any;
project:any;
data:any
selectedproject:any
  ngOnInit(): void { 
    //this.pkguid= this.route.snapshot.paramMap.get('pkguid');
//this.GetProjectByIdDetails()
   
  }
 

OnSuccess(){
  this.toastr.success('some message','title')
}
}
