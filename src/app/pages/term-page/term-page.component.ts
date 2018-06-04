import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../services/github.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageOffsetComponent } from '../../components/page-offset/page-offset.component';
import { GithubPage } from '../../services/github.interfaces';
import {ErrorService} from '../../services/error.service';

@Component({
  selector: 'app-term-page',
  templateUrl: './term-page.component.html',
  styleUrls: ['./term-page.component.scss']
})
export class TermPageComponent implements OnInit {

  @ViewChild('pageOffset') paginator: PageOffsetComponent;
  languages = null;
  topics = null;
  mainForm: FormGroup;
  isValidFormSubmitted = null;
  errorInformation = '';
  totalPages = 0;
  _queryType = 'language'; // or topics
  pageData: GithubPage = null;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private githubService: GithubService) { }


  createForm() {
    this.mainForm = this.formBuilder.group({
      language: [this.languages[0].key, [Validators.required]],
      topic: [this.topics[0].key, [Validators.required]],
      queryType: this._queryType,
      pageNumber: [1, [Validators.required, Validators.min(1)]],
    });
  }


  onFormSubmit() {

    this.isValidFormSubmitted = true;

    const success = (data: GithubPage) => {
      this.errorService.processError(null);
      this.isValidFormSubmitted = false;
      this.pageData = data;
      this.totalPages = data.totalPages;


    };

    const error = (e) => {

      this.isValidFormSubmitted = false;
      this.errorInformation = e.message;
      this.errorService.processError(e);
      this.totalPages = 0;
      this.pageData = null;
    };

    let param = this.topic.value;
    if (this.queryType === 'language') {
      param = this.language.value;
    }
    this.githubService.getEntriesByTerms( param,
      this.queryType,
      this.pageNumber.value - 1)
    .subscribe(success, error);

  }

  checkQueryType(type) {
    let t = false;
    if (type === this.queryType) {

      t = true;
    }
    return t;
  }

  queryTypeChange(ch, event) {
    this.queryType = ch;
    this.mainForm.patchValue({'queryType': ch});
    this.paginator.reset();

  }

  changeSelect(ev) {
    this.paginator.reset();
  }

  ngOnInit() {
    const me = this;

    this.route.data
      .subscribe((data) => {
        me.languages = data['itemData']['unique_lang'];
        me.topics = data['itemData']['unique_topics'];
        this.createForm();
      });

  }

  get language() {
    return this.mainForm.get('language');
  }
  get topic() {
    return this.mainForm.get('topic');
  }

  get queryType() {
    return this._queryType;

  }
  get pageNumber() {
    return this.mainForm.get('pageNumber');
  }

  set queryType(v) {
    this._queryType = v;
  }

}
