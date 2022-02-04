import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { JwtModule } from '@auth0/angular-jwt';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateProject } from './createproject/createproject.component';
import { AddInvoice } from './addinvoice/addinvoice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import { MatTabsModule} from '@angular/material/tabs';
import { MatIconModule} from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import { ApiService } from './services/api.service';
import { CommonDataService } from './services/common-data-services';
import { EnvironmentUrlService } from './services/environment-url.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationBarComponent } from './navigationbar/navigationbar.component';
import { SearchPipe } from './dashboard/searchpipe';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import {ViewProjectDetailsComponent} from './viewprojectdetails/viewprojectdetails.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { ReportsComponent } from './reports Invoices/reports.component';
import { POReportsComponent } from './poreports/poreports.component';
import { DatePipe } from '@angular/common';
import { InvoiceSearchPipe } from './reports Invoices/invoice-search.pipe';
import { POSearchPipe } from './poreports/posearch.pipe';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ToastrModule } from 'ngx-toastr';
//import { AddInvoiceComponent } from './add-invoice/add-invoice.component';





export function MSALInstanceFactory():IPublicClientApplication{
  return new PublicClientApplication({
    auth:{
      clientId : '8cc0a655-4b04-401d-8f94-40a98d58c9e2',
      redirectUri : 'http://localhost:4200'
    },
    cache:{
      cacheLocation:'localStorage',
      storeAuthStateInCookie: true
    }
  })
}
export function tokenGetter(){
  return localStorage.getItem("jwt");
}

export function MSALInterceptorConfigFactory():MsalInterceptorConfiguration{
const protectedResourceMap=new Map<string, Array<string>>();
protectedResourceMap.set('https://graph.microsoft.com/v1.0/me',['user.read']);
return {
  interactionType: InteractionType.Redirect,
  protectedResourceMap
};
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent,
    DashboardComponent,
    CreateProject,
    NavigationBarComponent,
    SearchPipe,
    DeletePopupComponent,
    EditProjectComponent,
    AddInvoice,
    ViewProjectDetailsComponent,
    EditInvoiceComponent,
    ReportsComponent,
    POReportsComponent,
    InvoiceSearchPipe,
    POSearchPipe,
    
    
  ],
  entryComponents: [DeletePopupComponent],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains:["localhost:4200"],
        disallowedRoutes: []
      }
    }),
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatStepperModule,
    SimpleNotificationsModule.forRoot(),
    ToastrModule.forRoot()
  
    
  ],
  providers: [{
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory
  },
  MsalService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass:MsalInterceptor,
    multi:true
  },
  {
    provide:MSAL_INTERCEPTOR_CONFIG,
    useFactory:MSALInterceptorConfigFactory
  },
  ApiService,
    CommonDataService,
    EnvironmentUrlService,
    DatePipe
],
  bootstrap: [AppComponent]
})
export class AppModule { }
