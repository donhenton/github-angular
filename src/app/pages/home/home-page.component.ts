import { Component, OnInit } from '@angular/core';
import {environment} from './../../../environments/environment';

@Component({

  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomeComponent implements OnInit {

  swaggerURL;
  constructor() {
    this.swaggerURL = environment.swaggerURL;
   }

  ngOnInit() {
  }

}
