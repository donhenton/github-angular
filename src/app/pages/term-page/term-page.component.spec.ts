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
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx'; // NOT from 'rxjs/Rx/Observable

describe('TermPageComponent', () => {
  let component: TermPageComponent;
  let fixture: ComponentFixture<TermPageComponent>;
  let routeStub;

  beforeEach(async(() => {

    routeStub = {

      data:  null

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

      routeStub.data = Observable.of({'itemData': uniqueData});
      fixture = TestBed.createComponent(TermPageComponent);
      component = fixture.componentInstance;

  }));


    it('should create',   ( ) => {

      const activatedRouteStub = fixture.debugElement.injector.get(ActivatedRoute);
     // console.log(activatedRouteStub.data);
      fixture.detectChanges();
      fixture.whenStable().then(() => {

        expect(component).toBeTruthy();


      });

    });

});
