import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageOffsetComponent } from '../../components/page-offset/page-offset.component';
import { TermPageComponent } from './term-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NvD3Module } from 'ng2-nvd3';
import { BrowserModule } from '@angular/platform-browser';
import { TruncatePipe } from '../../components/truncate-pipe/truncate.pipe';
import { CommaPipe } from '../../components/comma-pipe/comma.pipe';
import { GithubItemComponent } from './../../components/github-item/github-item.component';
import { ErrorDisplayComponent } from './../../components/error-display/error-display.component';
import { Router, ActivatedRoute } from '@angular/router';
import routes from './../../../../testing/testRoutes';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home-page.component';
import { ErrorService } from './../../services/error.service';
import { GithubService } from '../../services/github.service';
import { HttpModule } from '@angular/http';
import { uniqueData } from './../../../../testing/uniquetopics';

// https://stackoverflow.com/questions/45811379/angular2-unit-testing-a-component-with-route-resolve
// https://blog.thoughtram.io/angular/2016/11/28/testing-services-with-http-in-angular-2.html



// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx'; // NOT from 'rxjs/Rx/Observable
import { GithubPage } from '../../services/github.interfaces';

describe('TermPageComponent', () => {
  let component: TermPageComponent;
  let fixture: ComponentFixture<TermPageComponent>;
  let routeStub;
  let githubServiceRef;
  let errorServiceRef;

  beforeEach(async(() => {

    routeStub = {

      data: null

    };


    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NvD3Module,
        HttpModule,
        ReactiveFormsModule,
        BrowserModule,


      ],
      providers: [GithubService, ErrorService, { provide: ActivatedRoute, useValue: routeStub }],
      declarations: [
        TermPageComponent,
        HomeComponent,
        PageOffsetComponent,
        CommaPipe,
        TruncatePipe,
        GithubItemComponent,
        ErrorDisplayComponent

      ]
    })
      .compileComponents();

    routeStub.data = Observable.of({ 'itemData': uniqueData });
    fixture = TestBed.createComponent(TermPageComponent);
    githubServiceRef = fixture.debugElement.injector.get(GithubService);
    errorServiceRef = fixture.debugElement.injector.get(ErrorService);
    spyOn(errorServiceRef, 'processError').and.returnValue({});
    fixture.detectChanges();
    component = fixture.componentInstance;

  }));

  it('should create', () => {

    const activatedRouteStub = fixture.debugElement.injector.get(ActivatedRoute);
    // console.log(activatedRouteStub.data);
    fixture.detectChanges();
    fixture.whenStable().then(() => {

      expect(component).toBeTruthy();


    });

  });

  it('test paginator changes', () => {
    const resetCall = spyOn(component.paginator, 'reset');
    component.queryTypeChange('forks', null);
    expect(resetCall).toHaveBeenCalled();

  });

  it('test change Select', () => {
    const resetCall = spyOn(component.paginator, 'reset');
    component.changeSelect(null);
    expect(resetCall).toHaveBeenCalled();

  });

  it('test formSubmit error', () => {
    const spy = spyOn(githubServiceRef, 'getEntriesByTerms').and.returnValue(Observable.throw('frump'));
    component.isValidFormSubmitted = true;
    component.queryType = 'language';
    component.onFormSubmit();
    expect(component.isValidFormSubmitted).toBe(false);

  });

  it('test formSubmit', () => {
    const gPage: GithubPage = new GithubPage();
    gPage.pageOffset = 1;
    gPage.perPageCount = 25;
    gPage.totalPages = 100;
    const spy = spyOn(githubServiceRef, 'getEntriesByTerms').and.returnValue(Observable.of(gPage));
    component.isValidFormSubmitted = true;
    component.queryType = 'bonzo';
    component.onFormSubmit();
    expect(component.isValidFormSubmitted).toBe(false);

  });


});
