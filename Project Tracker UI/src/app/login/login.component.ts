import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public invalidLogin?: boolean;
  public user?:string;

   apires!: string;
  constructor(private msalService: MsalService, private router:Router, private httpClient:HttpClient,private jwtHelper:JwtHelperService) { }
//LocalLogin code
locallogin(form: NgForm){
  const credentials = {
    'username':form.value.username,
    'password':form.value.password
  }

  this.httpClient.post("https://localhost:44310/Login", credentials).subscribe(
    response=>{
      console.log("logginin thrugh local")
      const token = (<any>response).token;
      console.log(token)
      localStorage.setItem("jwt",token);
      localStorage.setItem("username",credentials.username)
      this.router.navigate(["/dashboard"]);
      this.invalidLogin=false;
      
    },err=>{
      this.invalidLogin=true;
      console.log("Invalid login")
    }
  )
  }


  
//LocalLogin code


//MSAL LOGIN MSAL LOGIN MSAL LOGIN MSAL LOGIN
  ngOnInit(): void {
    const token=localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)){
      this.router.navigate(['/dashboard'])
    }

    if(this.msalService.instance.getActiveAccount()!=null){
      this.router.navigate(['/dashboard'])
    }
    this.msalService.instance.handleRedirectPromise().then(
      res => {
        if(res != null && res.account != null){
          console.log("setting active account")
          this.msalService.instance.setActiveAccount(res.account);
          this.router.navigate(['/dashboard']);
        }
      }
    )
  }
  isLoggedIn():boolean{
    return this.msalService.instance.getActiveAccount() != null;
  }

  login(){
    debugger;
    console.log("logging in")
    this.msalService.loginRedirect();
  }
  getName():any{
    if(this.msalService.instance.getActiveAccount()==null){
      return "unknown"
    }
    return this.msalService.instance.getActiveAccount()?.name;
      }
  


}