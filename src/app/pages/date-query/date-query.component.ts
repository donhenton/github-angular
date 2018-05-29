import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { momentValidator } from './../../utils/moment.validator';
import {GithubService} from './../../services/github.service';
import {GithubPage} from './../../services/github.interfaces';

// https://www.concretepage.com/angular-2/angular-2-4-pattern-validation-example
// https://auth0.com/blog/real-world-angular-series-part-6/

@Component({
  selector: 'app-date-query',
  templateUrl: './date-query.component.html',
  styleUrls: ['./date-query.component.scss']
})
export class DateQueryComponent implements OnInit {

  dateForm: FormGroup;
  isValidFormSubmitted = null;
  errorInformation = '';
  totalPages = 0;
  pageData: GithubPage = null;

  constructor(private formBuilder: FormBuilder, private githubService: GithubService) { }

  ngOnInit() {
    this.createDateForm();
  }
  createDateForm() {
    this.dateForm = this.formBuilder.group({
      startDate: ['', [Validators.required, momentValidator('YYYY-MM-DD')]],
      endDate: ['', [Validators.required, momentValidator('YYYY-MM-DD')]],
      pageNumber: [1, [Validators.required, Validators.min(1)]],
    });
  }

  getError() {


    if (this.isValidFormSubmitted != null && !this.isValidFormSubmitted) {
      this.errorInformation = '';
      if (this.startDate.errors) {
        if (this.startDate.errors.required) {
          this.errorInformation = 'Start Date required';
          return;
        }
        if (this.startDate.errors.momentCheck) {
          this.errorInformation = 'Start Date invalid ';
          return;
        }
      }
      if (this.endDate.errors) {
        if (this.endDate.errors.required) {
          this.errorInformation = 'End Date required';
          return;
        }
        if (this.endDate.errors.momentCheck) {
          this.errorInformation = 'End Date invalid';
          return;
        }
      }
    }

  }

  onFormSubmit() {
    this.isValidFormSubmitted = false;
    this.getError();
    if (this.dateForm.invalid) {

      return;
    }
    this.isValidFormSubmitted = true;

    const success = (data: GithubPage) => {
      this.isValidFormSubmitted = false;
      this.pageData = data;
      this.totalPages = data.totalPages;

    };

    const error = (e) => {

      this.isValidFormSubmitted = false;
      this.errorInformation = e.message;
    };


    // this.dateForm.reset({ 'pageNumber': 0 });
    // make the call to the service
    this.githubService.getEntriesByDate(this.startDate.value, this.endDate.value, this.pageNumber.value - 1)
    .subscribe(success, error);




  }

  get startDate() {
    return this.dateForm.get('startDate');
  }
  get endDate() {
    return this.dateForm.get('endDate');
  }
  get pageNumber() {
    return this.dateForm.get('pageNumber');
  }

}
