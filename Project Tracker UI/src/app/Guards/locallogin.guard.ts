import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class LocalloginGuard implements CanActivate {
  constructor(private router: Router,private jwtHelper:JwtHelperService,private msalService:MsalService){}
  canActivate(){

    const token=localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)){
      //this.router.navigate(["/testpagelocal"])
      return true;
    }
    
    if(this.msalService.instance.getActiveAccount()!=null){
      console.log("not logged")
      return true;
      
    }
    else{
      this.router.navigate(["/"]);
      return false;
      }
  }}