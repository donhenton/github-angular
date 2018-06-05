import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GithubItemComponent } from './../../components/github-item/github-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { SuggestPageComponent } from './suggest-page.component';
import { ErrorDisplayComponent } from './../../components/error-display/error-display.component';
import { CommaPipe } from '../../components/comma-pipe/comma.pipe';
import { TruncatePipe } from '../../components/truncate-pipe/truncate.pipe';
import { ErrorService } from './../../services/error.service';
import { GithubService } from '../../services/github.service';
import { HttpModule } from '@angular/http';

describe('SuggestPageComponent', () => {
  let component: SuggestPageComponent;
  let fixture: ComponentFixture<SuggestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserModule,
      ],
      declarations:
      [ SuggestPageComponent,
        CommaPipe,
        TruncatePipe,
        ErrorDisplayComponent,
         GithubItemComponent ],

         providers: [GithubService, ErrorService, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
