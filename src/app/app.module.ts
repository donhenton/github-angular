import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DropdownDirective } from './components/dropdown/dropdown.directive';
import { MenuDirective } from './components/dropdown/menu.directive';
import { DateQueryComponent } from './pages/date-query/date-query.component';
import { GithubService } from './services/github.service';
import { ErrorService } from './services/error.service';
import { PageOffsetComponent } from './components/page-offset/page-offset.component';
import { HomeComponent } from './pages/home/home-page.component';
import { CommaPipe } from './components/comma-pipe/comma.pipe';
import { GithubItemComponent } from './components/github-item/github-item.component';
import { OnlyNumberDirective } from './components/only-number/only-number.directive';
import { TermPageComponent } from './pages/term-page/term-page.component';
import { SuggestPageComponent } from './pages/suggest-page/suggest-page.component';
import { TruncatePipe } from './components/truncate-pipe/truncate.pipe';
import { GraphPageComponent } from './pages/graph-page/graph-page.component';
import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';


const appRoutes: Routes = [
  { path: 'date-query', component: DateQueryComponent },
  { path: 'suggest-page', component: SuggestPageComponent },
  {
    path: 'graph-page', component: GraphPageComponent,
    resolve: { itemData: GithubService },
    data: { dataType: 'graph' }
  },
  {
    path: 'term-page', component: TermPageComponent,
    resolve: { itemData: GithubService },
    data: { dataType: 'terms' }
  },
  { path: '', component: HomeComponent },
];



@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    MenuDirective,
    HomeComponent,
    DateQueryComponent,
    PageOffsetComponent,
    CommaPipe,
    TruncatePipe,
    GithubItemComponent,
    OnlyNumberDirective,
    TermPageComponent,
    SuggestPageComponent,
    GraphPageComponent,
    ErrorDisplayComponent,

  ],
  imports: [
    FormsModule,
    NvD3Module,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [GithubService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
