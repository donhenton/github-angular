import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateQueryComponent } from './date-query.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { SuggestPageComponent } from '../suggest-page/suggest-page.component';
import { CommaPipe } from '../../components/comma-pipe/comma.pipe';
import { TruncatePipe } from '../../components/truncate-pipe/truncate.pipe';
import { ErrorDisplayComponent } from '../../components/error-display/error-display.component';
import { GithubItemComponent } from '../../components/github-item/github-item.component';
import { GithubService } from '../../services/github.service';
import { ErrorService } from '../../services/error.service';
import { PageOffsetComponent } from '../../components/page-offset/page-offset.component';

describe('DateQueryComponent', () => {
  let component: DateQueryComponent;
  let fixture: ComponentFixture<DateQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserModule,
      ],
      declarations:
        [DateQueryComponent,
          CommaPipe,
          PageOffsetComponent,
          TruncatePipe,
          ErrorDisplayComponent,
          GithubItemComponent],

      providers: [GithubService, ErrorService, ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
