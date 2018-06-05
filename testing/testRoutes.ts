import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from './../src/app/app.component';
import { HomeComponent } from './../src/app/pages/home/home-page.component';
import { TermPageComponent } from '../src/app/pages/term-page/term-page.component';
import {uniqueData} from './uniquetopics';

const appRoutes: Routes = [

    { path: '', component: HomeComponent },

  ];

export default appRoutes;




