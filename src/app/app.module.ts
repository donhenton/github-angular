import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DropdownDirective } from './components/dropdown/dropdown.directive';
import { MenuDirective } from './components/dropdown/menu.directive';
import { DateQueryComponent } from './pages/date-query/date-query.component';
import { GithubService } from './services/github.service';
import { PageOffsetComponent } from './components/page-offset/page-offset.component';

import { CommaPipe } from './components/comma-pipe/comma.pipe';



const appRoutes: Routes = [
  { path: 'date-query', component: DateQueryComponent },
];



@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    MenuDirective,
    DateQueryComponent,
    PageOffsetComponent,
    CommaPipe,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
