import { GithubService } from '../../services/github.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';



@Component({
  selector: 'app-date-graph-page',
  templateUrl: './date-graph-page.component.html',
  styleUrls: ['./date-graph-page.component.scss']
})
export class DateGraphPageComponent implements OnInit {

  dateForm: FormGroup;
  isValidFormSubmitted = null;
  errorInformation = '';
  currentDate = '';
  graphData: any;
  options = {
    chart: {
      type: 'discreteBarChart',
      height: 450,
      margin: {
        top: 20,
        right: 20,
        bottom: 50,
        left: 55
      },
      x: function (d) { return d.label; },
      y: function (d) { return d.value; },
      showValues: true,
      valueFormat: function (d) {
        return d3.format(',')(d);
      },
      duration: 500,
      xAxis: {
        axisLabel: 'Month'
      },
      yAxis: {
        axisLabel: 'Count',
        axisLabelDistance: -10
      }
    }
  };

  constructor(private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private githubService: GithubService) { }

  ngOnInit() {
    this.createDateForm();

  }



  createDateForm() {
    this.dateForm = this.formBuilder.group({
      year: ['', [Validators.required, this.validateYear()]]
    });
  }

  onFormSubmit() {

    this.isValidFormSubmitted = false;

    if (this.year.errors) {
      if (this.year.errors.required) {
        this.errorInformation = 'Date required';
        return;
      }
      if (this.year.errors.validateYear) {
        this.errorInformation = 'Must be valid year > 2000';
        return;
      }
    }

    this.isValidFormSubmitted = true;
    const success = (data) => {



      this.isValidFormSubmitted = false;

      this.graphData = data.bucketData.map(d => {

        const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
        'Jun', 'Jly', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


        const newData = {};
        newData['value'] = d.count;
        const parts = d.interval.split('-');
        newData['label'] = monthList[parseInt(parts[1], 10) - 1];

        return newData;

      });

     this.graphData =  [{'key': 'data-graph', 'values': this.graphData}];

    };

    const error = (e: HttpErrorResponse) => {

      this.isValidFormSubmitted = false;
      this.errorInformation = e.message;
      this.errorService.processError(e);
    };


    this.githubService.getDataByMonth(this.year.value).subscribe(success, error);

  }



  validateYear(): ValidatorFn {

   return  (c: AbstractControl) => {

       const submittedYear: string = c.value;
       let year = 0;
       try {
        year = parseInt(submittedYear, 10);
       } catch (e) {}

       if (year && year > 2000) {
         return null;
       }


       return {validateYear: true};


   };

  }


  get year() {
    return this.dateForm.get('year');
  }

}
