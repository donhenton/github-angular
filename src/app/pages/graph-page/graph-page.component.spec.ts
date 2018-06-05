import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPageComponent } from './graph-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NvD3Module } from 'ng2-nvd3';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { GithubService } from '../../services/github.service';
import { ErrorService } from '../../services/error.service';
import { ErrorDisplayComponent } from '../../components/error-display/error-display.component';
import { ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx'; // NOT from 'rxjs/Rx/Observable
declare let d3: any;


describe('GraphPageComponent', () => {
  let component: GraphPageComponent;
  let fixture: ComponentFixture<GraphPageComponent>;
  const routeStub = {
    data: null
  };
  beforeEach(async(() => {

    routeStub.data = Observable.of({
      itemData: {
        forks:
          [
            {
              'count': 15.68,
              'interval': '0.00'
            },
            {
              'count': 7.08,
              'interval': '0.20'
            }]
      }
    }
    );
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NvD3Module,
        HttpModule,
        ReactiveFormsModule,
        BrowserModule,


      ],
      providers: [GithubService, ErrorService, { provide: ActivatedRoute, useValue: routeStub }],
      declarations: [GraphPageComponent, ErrorDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(GraphPageComponent);
    component = fixture.componentInstance;

      fixture.detectChanges();


  });

  it('should create', () => {
    // for this test to work d3 and nvd3 need to be in the .angular-cli.json scripts block
    expect(component).toBeTruthy();
  });
});
