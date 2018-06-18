import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { GithubService } from '../../services/github.service';
import { GithubResult, GithubPage } from '../../services/github.interfaces';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-suggest-page',
  templateUrl: './suggest-page.component.html',
  styleUrls: ['./suggest-page.component.scss']
})
export class SuggestPageComponent implements OnInit {

  suggestForm: FormGroup;
  entries: GithubResult[] = [];
  pageData: GithubPage = null;
  loading = false;


  constructor(private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private githubService: GithubService) { }

  ngOnInit() {

    this.createForm();
    this.suggestForm.valueChanges.subscribe(this.formChange.bind(this));
  }

  createForm() {
    this.suggestForm = this.formBuilder.group({
      suggestion: ''
    });
  }

  getSuggestion(data) {
    console.log('http mock returned ' + JSON.stringify(data));
    const suggestions: GithubResult[] = data['suggestions'];
    this.loading = false;
    if (suggestions) {
      this.entries = suggestions;

    } else {
      this.entries = [];
    }

  }

  handleClickForEntry(githubEntry: GithubResult, event) {
    const p = new GithubPage();
    p.pageOffset = 0;
    p.perPageCount = 25;
    p.totalCount = 1;
    p.totalPages = 1;
    p.results = [githubEntry];
    this.pageData = p;
  }


  handleSuggestionError(e) {
    console.log(`error in suggestion ${e.message}`);
    this.loading = false;
    this.errorService.processError(e);
    this.entries  = [];
      this.pageData = null;
  }

  formChange(data) {
    const suggestion = this.suggestion.value;
    const hdl = this.getSuggestion.bind(this);
    const err = this.handleSuggestionError.bind(this);
    if (this.suggestion && suggestion.length > 2) {
      this.loading = true;
      this.githubService.getSuggestion(suggestion).subscribe(hdl, err);

    } else {
      this.entries = [];
      this.pageData = null;
    }
  }

  handleESC(ev) {
    const e = <KeyboardEvent>ev;
    if (e.keyCode === 27) {
      this.entries = [];
      this.pageData = null;
    }
  }

  getIndicatorCss() {

    let css = 'scroll-loader';
    if (this.loading === false) {
      css = css + ' hidden';
    }

    return css;
  }
  getSuggestionListCss() {
    let css = 'suggestion-list';
    if (this.entries.length === 0) {
      css = css + ' hidden';
    }

    return css;
  }

  get suggestion(): AbstractControl {
    return this.suggestForm.get('suggestion');
  }

}
