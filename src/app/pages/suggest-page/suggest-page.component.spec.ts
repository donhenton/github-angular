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
import { HttpModule, Http, XHRBackend } from '@angular/http';
import { suggestions } from './../../../../testing/testSuggestions';
import { GithubResult } from '../../services/github.interfaces';
import { Observable } from 'rxjs/Observable';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('SuggestPageComponent', () => {
  let component: SuggestPageComponent;
  let fixture: ComponentFixture<SuggestPageComponent>;
  let errorServiceRef = null;
  let githubServiceRef = null;
  let httpRef = null;

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserModule,
      ],
      declarations:
        [SuggestPageComponent,
          CommaPipe,
          TruncatePipe,
          ErrorDisplayComponent,
          GithubItemComponent],

      providers: [GithubService, ErrorService, { provide: XHRBackend, useClass: MockBackend }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestPageComponent);
    component = fixture.componentInstance;
    errorServiceRef = fixture.debugElement.injector.get(ErrorService);
    githubServiceRef = fixture.debugElement.injector.get(GithubService);
    httpRef = fixture.debugElement.injector.get(Http);
    fixture.detectChanges();


    // spyOn(tagService, 'getTags')
    // .and.returnValue(Observable.of(['C#']));


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test getSuggestions', () => {
    expect(component.entries.length).toEqual(0);
    component.getSuggestion(suggestions);
    expect(component.entries.length).toEqual(2);


  });

  it('test handleEsc', () => {
    expect(component.entries.length).toEqual(0);
    component.getSuggestion(suggestions);
    expect(component.entries.length).toEqual(2);
    const ev = { keyCode: 0 };
    ev.keyCode = 65;
    component.handleESC(ev);
    expect(component.entries.length).toEqual(2);
    ev.keyCode = 27;
    component.handleESC(ev);
    expect(component.entries.length).toEqual(0);
  });

  it('test getSuggestions with null', () => {
    expect(component.entries.length).toEqual(0);
    component.getSuggestion({ suggestions: null });
    expect(component.entries.length).toEqual(0);
  });



  it('test handleSuggestionError', () => {
    const err = { message: 'get a job' };
    component.loading = true;
    const spy = spyOn(errorServiceRef, 'processError');
    component.handleSuggestionError(err);
    expect(component.loading).toEqual(false);
    expect(spy).toHaveBeenCalledWith(err);

  });

  describe('HandleClickForEntry Tests', () => {
    it('test handling data', () => {
      expect(component.pageData).toBeNull();
      const t = JSON.parse(JSON.stringify(suggestions.suggestions[1]));
      t.created = new Date();
      const entry: GithubResult = t;
      component.handleClickForEntry(entry, null);
      expect(component.pageData).not.toBeNull();
      // component.getSuggestion({ suggestions: null });
      // expect(component.entries.length).toEqual(0);
    });

  });

  describe('css Tests', () => {
    it('test indicator css', () => {
      component.loading = true;
      const t = 'scroll-loader';
      expect(component.getIndicatorCss()).toEqual(t);
      component.loading = false;
      expect(component.getIndicatorCss()).toEqual(t + ' hidden');
    });

    it('test SuggestionList css', () => {
      const tx = JSON.parse(JSON.stringify(suggestions.suggestions[1]));
      tx.created = new Date();
      const entry: GithubResult = tx;
      component.entries = [entry];
      const t = 'suggestion-list';
      expect(component.getSuggestionListCss()).toEqual(t);
      component.entries = [];
      expect(component.getSuggestionListCss()).toEqual(t + ' hidden');
    });


  });
  describe('formchange Tests', () => {
    let spy = null;
    let entry: GithubResult;

    beforeEach(() => {
      const t = JSON.parse(JSON.stringify(suggestions.suggestions[1]));
      t.created = new Date();
      entry = t;
      component.suggestForm.patchValue({ suggestion: 'fred' });
      component.loading = false;
      // console.log(`1 ${component.entries.length}`);

    });

    it('test formChange with good suggestion', () => {
      spy = spyOn(githubServiceRef, 'getSuggestion').and.returnValue(Observable.of(entry));
      const spyGet = spyOn(component, 'getSuggestion');
      component.formChange(null);
      expect(spyGet).toHaveBeenCalledWith(entry);


    });
    fit('test formChange with bad suggestion', () => {

     // component.suggestForm.patchValue({ suggestion: 'f' });
     // spy = spyOn(githubServiceRef, 'getSuggestion').and.returnValue(Observable.of(entry));
     // const spyGet = spyOn(component, 'getSuggestion').and.returnValue(Observable.of(entry));

      component.formChange(null);
      expect(component.entries.length).toEqual(0);


    });

  });

});
