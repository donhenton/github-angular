import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { DescriptionSearchComponent } from './description-search.component';
import { CommaPipe } from '../../../components/comma-pipe/comma.pipe';
import { PageOffsetComponent } from '../../../components/page-offset/page-offset.component';
import { TruncatePipe } from '../../../components/truncate-pipe/truncate.pipe';
import { GithubItemComponent } from '../../../components/github-item/github-item.component';
import { ErrorDisplayComponent } from '../../../components/error-display/error-display.component';
import { GithubService } from '../../../services/github.service';
import { ErrorService } from '../../../services/error.service';

describe('DescriptionSearchComponent', () => {
  let component: DescriptionSearchComponent;
  let fixture: ComponentFixture<DescriptionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserModule,


      ],
      declarations: [ DescriptionSearchComponent,
        CommaPipe,
        PageOffsetComponent,
        ErrorDisplayComponent,
        TruncatePipe,
        ErrorDisplayComponent,
        GithubItemComponent ],
        providers: [GithubService, ErrorService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
