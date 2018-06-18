// https://medium.com/spektrakel-blog/angular-testing-snippets-httpclient-d1dc2f035eb8


import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DateQueryComponent } from './date-query.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { SuggestPageComponent } from '../suggest-page/suggest-page.component';
import { CommaPipe } from '../../components/comma-pipe/comma.pipe';
import { TruncatePipe } from '../../components/truncate-pipe/truncate.pipe';
import { ErrorDisplayComponent } from '../../components/error-display/error-display.component';
import { GithubItemComponent } from '../../components/github-item/github-item.component';
import { GithubService } from '../../services/github.service';
import { ErrorService } from '../../services/error.service';
import { PageOffsetComponent } from '../../components/page-offset/page-offset.component';
import { Observable } from 'rxjs/Observable';
import { GithubPage } from '../../services/github.interfaces';

describe('DateQueryComponent', () => {
  let component: DateQueryComponent;
  let fixture: ComponentFixture<DateQueryComponent>;
  let githubServiceRef;
  let errorServiceRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        HttpClientTestingModule,
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

      providers: [GithubService, ErrorService ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateQueryComponent);
    component = fixture.componentInstance;
    githubServiceRef = fixture.debugElement.injector.get(GithubService);
    errorServiceRef = fixture.debugElement.injector.get(ErrorService);
    fixture.detectChanges();
  });
  // https://www.codesandnotes.be/2017/07/06/writing-and-testing-custom-angular-validators-the-passwords-matching-case/
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set form with bad start Date', () => {

     component.dateForm.patchValue({'startDate': '2012-01-01', endDate: 'bonzo'});
     component.onFormSubmit();
     expect(component.dateForm.invalid).toBe(true);
     component.dateForm.patchValue({'startDate': '2012-01-01', endDate: ''});
     component.onFormSubmit();
     expect(component.dateForm.invalid).toBe(true);
     component.dateForm.patchValue({'startDate': '2012-01-01', endDate: '2011-34-76'});
     component.onFormSubmit();

     component.dateForm.patchValue({'endDate': '2012-01-01', startDate: 'bonzo'});
     component.onFormSubmit();
     expect(component.dateForm.invalid).toBe(true);
     component.dateForm.patchValue({'endDate': '2012-01-01', startDate: ''});
     component.onFormSubmit();
     expect(component.dateForm.invalid).toBe(true);
     component.dateForm.patchValue({'endDate': '2012-01-01', startDate: '2011-34-76'});
     component.onFormSubmit();
     expect(component.dateForm.invalid).toBe(true);

     component.dateForm.patchValue({'endDate': '2012-01-01', startDate: '2016-01-01'});
     component.onFormSubmit();
     expect(component.dateForm.invalid).toBe(true);

  });





  it('set form with good dates', () => {

    const gPage: GithubPage = new GithubPage();
    gPage.pageOffset = 1;
    gPage.perPageCount = 25;
    gPage.totalPages = 100;

    const spy = spyOn(githubServiceRef, 'getEntriesByDate').and.returnValue(Observable.of(gPage));
    component.dateForm.patchValue({'startDate': '2012-01-01', endDate: '2015-01-01'});
    component.onFormSubmit();
    expect(component.dateForm.invalid).toBe(false);
    expect(component.totalPages).toEqual(gPage.totalPages);



  });
  it('test rxjs error', () => {

    const gPage: GithubPage = new GithubPage();
    gPage.pageOffset = 1;
    gPage.perPageCount = 25;
    gPage.totalPages = 100;


    const spy = spyOn(githubServiceRef, 'getEntriesByDate').and.returnValue(Observable.throw('frump'));
    const spyError = spyOn(errorServiceRef, 'processError').and.returnValue({});
    component.dateForm.patchValue({'startDate': '2012-01-01', endDate: '2015-01-01'});
    component.isValidFormSubmitted = true;
    component.onFormSubmit();
    expect(component.dateForm.invalid).toBe(false);
    expect(component.isValidFormSubmitted).toBe(false);



  });

});
