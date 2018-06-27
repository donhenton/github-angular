import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NvD3Module } from 'ng2-nvd3';
import { DateGraphPageComponent } from './date-graph-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorDisplayComponent } from '../../components/error-display/error-display.component';
import { GithubService } from '../../services/github.service';
import { ErrorService } from '../../services/error.service';
import { CommaPipe } from '../../components/comma-pipe/comma.pipe';
import { PageOffsetComponent } from '../../components/page-offset/page-offset.component';
import { TruncatePipe } from '../../components/truncate-pipe/truncate.pipe';
import { GithubItemComponent } from '../../components/github-item/github-item.component';


describe('DateGraphPageComponent', () => {
  let component: DateGraphPageComponent;
  let fixture: ComponentFixture<DateGraphPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NvD3Module,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,


      ],
      declarations: [ DateGraphPageComponent,
       CommaPipe,
        PageOffsetComponent,
        ErrorDisplayComponent,
        TruncatePipe,
        ErrorDisplayComponent,
        GithubItemComponent  ],
        providers: [GithubService, ErrorService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateGraphPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
