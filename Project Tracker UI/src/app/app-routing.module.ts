import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MsalGuard } from './Guards/msal.guard';
import { TestComponent } from './test/test.component';
import { LocalloginGuard } from './Guards/locallogin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateProject } from './createproject/createproject.component';
import { AddInvoice } from './addinvoice/addinvoice.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import {ViewProjectDetailsComponent} from './viewprojectdetails/viewprojectdetails.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';

import { POReportsComponent } from './poreports/poreports.component';
import { ReportsComponent } from './reports Invoices/reports.component';
//import { AddInvoiceComponent } from './add-invoice/add-invoice.component';

const routes: Routes = [
  //{path:'', redirectTo:'login', pathMatch:'full'},
  { path: 'loginpage', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [LocalloginGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LocalloginGuard] },
  { path: 'reports', component: ReportsComponent ,canActivate: [LocalloginGuard]},
  { path: 'poreports', component: POReportsComponent ,canActivate: [LocalloginGuard]},
  { path: 'viewprojectdetails/:pkguid/:invflag', component: ViewProjectDetailsComponent },
  { path: 'addinvoice/:pkguid', component: AddInvoice },
  
  { path: 'createproject', component: CreateProject,canActivate: [LocalloginGuard] },
  { path: 'invoice/:pkguid', component: AddInvoice },
  { path: 'dashboardlocal', component: DashboardComponent, canActivate: [LocalloginGuard] },
  { path: 'EditInvoice/:pkguid', component: EditInvoiceComponent },
  { path: 'testpage', component: TestComponent },
  { path: ':pkguid/:invflag', component: EditProjectComponent },
  { path: ':poguid', component: EditProjectComponent },
  { path: '**', component: LoginComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private route: Router) { }

  onSubmit() {
    this.route.navigate(['/app-dashboard']); // navigate to other page
  }
}