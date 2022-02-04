import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MsalGuard } from '@azure/msal-angular';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }
  OpenConfirmDialog(msg:any){
    return this.dialog.open(DeletePopupComponent,{width:'390px',
  disableClose: true,
panelClass:'confirm-dialog-container',
data:{
  message:msg
}})
  }
}
