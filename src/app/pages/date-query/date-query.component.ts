import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import {DATE_REGEX} from './../../utils/dateUtils';
import { dateValidator } from './../../utils/date.validator';

// https://www.concretepage.com/angular-2/angular-2-4-pattern-validation-example
// https://auth0.com/blog/real-world-angular-series-part-6/

@Component({
  selector: 'app-date-query',
  templateUrl: './date-query.component.html',
  styleUrls: ['./date-query.component.scss']
})
export class DateQueryComponent implements OnInit {

  // 10/10/2010 is the valid
  // isoDatePatternStr = '\\/d{4}-\\/d{2}-\\/d2';
  // isoDatePatternRegex: RegExp = new RegExp(this.isoDatePatternStr);
  // isoDatePattern =  new RegExp(/^(\d{4}|\d)\/(\d{2}|\d)\/\d{2}$/);
  // ^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])$
  /// isoDatePattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  dateForm: FormGroup;
  isValidFormSubmitted = null;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createDateForm();
  }
  createDateForm() {
    this.dateForm = this.formBuilder.group({
      startDate: ['', [Validators.required, Validators.pattern(DATE_REGEX)]],
      endDate: ['', [Validators.required, Validators.pattern(DATE_REGEX)]],
      pageCount: 0
    });
  }

  getError() {
    let message = null;

    if (this.isValidFormSubmitted != null && !this.isValidFormSubmitted) {
      if (this.startDate.errors) {
        if (this.startDate.errors.required) {
          message = 'Start Date required';
          return message;
        }
        if (this.startDate.errors.pattern) {
          message = 'Start Date invalid ' + JSON.stringify(this.startDate.errors.pattern);
          return message;
        }
      }
      if (this.endDate.errors) {
        if (this.endDate.errors.required) {
          message = 'End Date required';
          return message;
        }
        if (this.endDate.errors.pattern) {
          message = 'End Date invalid';
          return message;
        }
      }
    }

    return message;

  }

  onFormSubmit() {
    const data = JSON.stringify(this.dateForm.value);
    console.log(data);
    this.isValidFormSubmitted = false;
    if (this.dateForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    // let user: User = this.dateForm.value;
    // this.userService.createUser(user);
    this.dateForm.reset({ 'pageCount': 0 });
  }

  get startDate() {
    return this.dateForm.get('startDate');
  }
  get endDate() {
    return this.dateForm.get('endDate');
  }
  get pageCount() {
    return this.dateForm.get('pageCount');
  }

}
