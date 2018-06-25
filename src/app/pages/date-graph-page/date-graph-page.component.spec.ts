import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateGraphPageComponent } from './date-graph-page.component';

describe('DateGraphPageComponent', () => {
  let component: DateGraphPageComponent;
  let fixture: ComponentFixture<DateGraphPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateGraphPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateGraphPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
