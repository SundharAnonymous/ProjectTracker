import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ProjectTracker';
  constructor(private router: Router, ) {}  
  onSubmit() {  
    this.router.navigateByUrl('/dashboard');
  }  
  ngOnInit() {}  
}
