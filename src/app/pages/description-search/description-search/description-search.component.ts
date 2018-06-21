import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { GithubService } from '../../../services/github.service';
import { GithubResult, GithubPage } from '../../../services/github.interfaces';
import { ErrorService } from '../../../services/error.service';
import { PageOffsetComponent } from '../../../components/page-offset/page-offset.component';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-description-search',
  templateUrl: './description-search.component.html',
  styleUrls: ['./description-search.component.scss']
})
export class DescriptionSearchComponent implements OnInit {


  termForm: FormGroup;
  isValidFormSubmitted = null;
  errorInformation = '';
  totalPages = 0;
  pageData: GithubPage = null;
  @ViewChild('pageOffset') paginator: PageOffsetComponent;
  currentTerm: string = null;




  constructor(private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private githubService: GithubService) { }

  ngOnInit() {

    this.createTermForm();
    this.termForm.valueChanges.subscribe(this.formChange.bind(this));
  }

  createTermForm() {
    this.termForm = this.formBuilder.group({
      searchTerm: ['', [Validators.required]],
      pageNumber: [1, [Validators.required, Validators.min(1)]]
    });
  }

  formChange(data) {
    // // console.log(`formChange ${JSON.stringify(data)}`);
    if (this.currentTerm == null) {
      this.currentTerm = data.searchTerm;

    }
     if (this.currentTerm !== data.searchTerm) {

         console.log('resetting paginator');
        this.paginator.reset();
     }

  }

  get searchTerm() {
    return this.termForm.get('searchTerm');
  }
  get pageNumber() {
    return this.termForm.get('pageNumber');
  }

  onFormSubmit() {

    const success = (data: GithubPage) => {
      this.isValidFormSubmitted = false;
      this.pageData = data;
      this.totalPages = data.totalPages;


    };
    // https://angular.io/guide/http
    const error = (e: HttpErrorResponse) => {

      this.isValidFormSubmitted = false;
      this.errorInformation = e.message;
      this.errorService.processError(e);
    };


    this.githubService.getDescriptionSearch(this.searchTerm.value, this.pageNumber.value - 1)
      .subscribe(success, error);

  }

}
