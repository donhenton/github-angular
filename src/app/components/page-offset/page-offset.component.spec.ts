import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOffsetComponent } from './page-offset.component';

describe('PageOffsetComponent', () => {
  let component: PageOffsetComponent;
  let fixture: ComponentFixture<PageOffsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageOffsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageOffsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
