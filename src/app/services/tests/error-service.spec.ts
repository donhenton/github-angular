import { ErrorService } from './../error.service';
import { ApiError, ErrorPayload } from '../github.interfaces';


const apiError = {};


/*
 _body: string;
    status: number;
    ok: string;
    statusText: string;
    headers: any;
    type: number;
    url: string;
    apiError: ApiError;

*/




describe('ErrorService', () => {


  const apiVar = new ApiError();
  apiVar.debugMessage = 'fred';
  apiVar.message = 'fred';
  apiVar.status = 'ted';
  apiVar.subErrors = [];
  apiVar.timestamp = 'bonzo';



  const error = function (err) {
    console.error(err);
  };


  const errorData = {
    url: 'url',
    type: 'type',
    headers: {},
    statusText: 'statusText',
    ok: 'ok',
    status: 'status',
    _body: JSON.stringify({ apierror: apiVar })


  };


  /*
 _body: string;
    status: number;
    ok: string;
    statusText: string;
    headers: any;
    type: number;
    url: string;
    apiError: ApiError;

*/
  // const errorPayload = new ErrorPayload(data);


  let errorService: ErrorService;
  beforeEach(() => {
    errorService = new ErrorService();

  });



  it('create an instance', () => {

    expect(errorService).toBeTruthy();
  });

  it('error reports out with payload', () => {

    const success = function (d) {
      expect(d.message).toEqual('fred');
    };
    errorService.getErrorProvider().subscribe(success, error);
    errorService.processError(errorData);

  });

  it('handles null', () => {

    const success = function (d) {
      expect(d).toBeNull();
    };
    errorService.getErrorProvider().subscribe(success, error);
    errorService.processError(null);

  });

});
