import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { ApiError, ErrorPayload } from './github.interfaces';

@Injectable()
export class ErrorService {
  private subject = new Subject<ApiError>();

  constructor() { }

/**
 * send null to clear the message;
 * @param apiError
 */
  processError(error: any) {

    if (error) {
      const payload: ErrorPayload  = new ErrorPayload(error);
      const that = this;
      this.subject.next(payload.apiError);
    } else {
      this.subject.next(null);
    }


  }

  getErrorProvider(): Observable<ApiError> {
    return this.subject.asObservable();
}

}
