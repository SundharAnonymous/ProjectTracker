import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialogref:MatDialogRef<DeletePopupComponent>) { }
  
  ngOnInit(): void {
  }
  closedialog(){
this.dialogref.close(false);
  }
}
