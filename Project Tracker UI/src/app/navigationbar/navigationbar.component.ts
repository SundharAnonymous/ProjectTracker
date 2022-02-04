
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { IPublicClientApplication } from '@azure/msal-browser';
import { LoginComponent } from '../login/login.component';

import { CommonDataService } from '../services/common-data-services';
@Component({    
  selector:'app-navigationbar',    
  templateUrl:'./navigationbar.component.html',    
  styleUrls:['./navigationbar.component.css']    
  })  
  export class NavigationBarComponent implements OnInit {
activelink?:boolean
  constructor(private msalService: MsalService, private router:Router,private route:ActivatedRoute,private jwtHelper: JwtHelperService) { }
  public user?:any;
  ngOnInit(): void { 
    // this.msalService.instance.handleRedirectPromise().then(
    //   res => {
    //     if(res != null && res.account != null){
    //       this.msalService.instance.setActiveAccount(res.account);
    //       // console.log(this.msalService.instance.getActiveAccount().name;)
    //       this.router.navigate(['/dashboard'])
    //     }
    //   }
    // )
  this.user=localStorage.getItem("username")
console.log(this.user)
  }
  isLoggedIn():boolean{
    return this.msalService.instance.getActiveAccount() != null;
  }
  logout(){
    console.log("logging out")
    this.msalService.logout();
    this.router.navigate([''])
  }
///// GETTING NAMES ON NAVIGATION//////
  getName():any{
    if(this.msalService.instance.getActiveAccount()==null){
      return "unknown"
    }
    return this.msalService.instance.getActiveAccount()?.name;
      }

      
///// GETTING NAMES ON NAVIGATION//////



 //Local Login Local Login Local Login Local Login Local Login 
isUserAuthenticated(){
  const token = localStorage.getItem("jwt");
  if(token && !this.jwtHelper.isTokenExpired(token)){
    return true
  }
  else{
    return false;
  }
}

locallogout(){
  debugger
  if(this.isLoggedIn()== true){
    this.logout()
  }
  else{
    localStorage.removeItem("jwt");
  this.router.navigate(['/'])
  console.log("token deleted logging out")
  }
}

//Local Login Local Login Local Login Local Login Local Login

InvoiceReports(){
  debugger
  this.activelink=false
  this.router.navigate(['/reports'])
}
POReports(){
  debugger
  this.activelink=false
  this.router.navigate(['/poreports'])
}
backtodashboard(){
  debugger
  this.activelink=true
  this.router.navigate(['/dashboard']);
}
}
