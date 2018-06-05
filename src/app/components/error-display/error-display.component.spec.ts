import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorDisplayComponent } from './error-display.component';
import { ErrorService } from '../../services/error.service';

describe('ErrorDisplayComponent', () => {
  let component: ErrorDisplayComponent;
  let fixture: ComponentFixture<ErrorDisplayComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorDisplayComponent ],
      providers: [ErrorService]
    })
    .compileComponents();
  })) ;

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// https://www.arroyolabs.com/2017/04/angular-2-unit-test-mocks-stubs/
// https://codecraft.tv/courses/angular/unit-testing/mocks-and-spies/
//
