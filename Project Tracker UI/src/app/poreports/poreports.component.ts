import { Component, OnInit } from '@angular/core';
import { IPODetails } from '../model/PODetails';
import { IAddPODetails } from '../model/PostPOdetail';
import { CommonDataService } from '../services/common-data-services';

@Component({
  selector: 'app-poreports',
  templateUrl: './poreports.component.html',
  styleUrls: ['./poreports.component.css']
})
export class POReportsComponent implements OnInit {

  constructor(private commonDataService:CommonDataService) { }
  public PODetails: IAddPODetails[] = [];
  isDesc: boolean= false;
  ltipoNumber?:any
  ngOnInit(): void {
    this.getPODetails()
  }
  getPODetails()
  {
    debugger
    this.commonDataService.getPODetails().subscribe(
      result => {
        if (result.data != null) {
          
            const poprojectData: IAddPODetails[] = result.data;
            this.PODetails = poprojectData;
            
        }
    })
  }

  
}
