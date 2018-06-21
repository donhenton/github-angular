import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionSearchComponent } from './description-search.component';

describe('DescriptionSearchComponent', () => {
  let component: DescriptionSearchComponent;
  let fixture: ComponentFixture<DescriptionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
