import { Component, OnInit } from '@angular/core';
import { ApiError } from '../../services/github.interfaces';
import { ErrorService} from '../../services/error.service';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent implements OnInit {

  constructor(private errorService: ErrorService  ) { }
  error: ApiError = null;

  ngOnInit() {

    this.errorService.getErrorProvider().subscribe( (apiError: ApiError) => {
        console.log('got an error ' + JSON.stringify(apiError));
        if (apiError) {
          this.error = apiError;
        } else {

          this.error = null;
        }

    });
  }

}
