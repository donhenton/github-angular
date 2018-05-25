import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateQueryComponent } from './date-query.component';

describe('DateQueryComponent', () => {
  let component: DateQueryComponent;
  let fixture: ComponentFixture<DateQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
