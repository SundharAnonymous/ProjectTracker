import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { TestComponent } from './test.component';
import { IPublicClientApplication } from '@azure/msal-browser';


@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    BrowserModule, 
    MsalModule
  ],
  bootstrap: [TestComponent]
})
export class TestModule { 
  
  
}
