import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorDisplayComponent } from './error-display.component';
import { ErrorService } from '../../services/error.service';
import { ApiError } from '../../services/github.interfaces';

describe('ErrorDisplayComponent', () => {
  let component: ErrorDisplayComponent;
  let fixture: ComponentFixture<ErrorDisplayComponent>;
  let apiVar;

  let errorData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorDisplayComponent],
      providers: [ErrorService

      ]
    })
      .compileComponents();

    apiVar = new ApiError();
    apiVar.debugMessage = 'fred';
    apiVar.message = 'fred';
    apiVar.status = 'ted';
    apiVar.subErrors = [];
    apiVar.timestamp = 'bonzo';

    errorData = {
      url: 'url',
      type: 'type',
      headers: {},
      statusText: 'statusText',
      ok: 'ok',
      status: 'status',
      _body: JSON.stringify({ apierror: apiVar })


    };




  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const serv = fixture.debugElement.injector.get(ErrorService);
   // console.log(serv);
    expect(component).toBeTruthy();
  });

  it('should receive an error with existing API error', () => {
    const serv = fixture.debugElement.injector.get(ErrorService);


    serv.processError(errorData);
    expect(component.error).not.toBeNull();

  });
  it('should receive an error with null API error', () => {
    const serv = fixture.debugElement.injector.get(ErrorService);

    errorData['_body'] = JSON.stringify({ apierror: null });
    serv.processError(errorData);
    expect(component.error).toBeNull();

  });

});


// https://www.arroyolabs.com/2017/04/angular-2-unit-test-mocks-stubs/
// https://codecraft.tv/courses/angular/unit-testing/mocks-and-spies/
//
