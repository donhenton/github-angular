import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOffsetComponent } from './page-offset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

describe('PageOffsetComponent', () => {
  let component: PageOffsetComponent;
  let fixture: ComponentFixture<PageOffsetComponent>;

  const fakeEvent = {
    preventDefault: () => { },
    target: { value: null }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,


      ],
      declarations: [PageOffsetComponent]
    })
      .compileComponents();
  }));
  // find something in the html:   expect(compiled.querySelector('figure').textContent).toContain('Browser');
  beforeEach(() => {
    fixture = TestBed.createComponent(PageOffsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fakeEvent.target.value = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set stuff on component', () => {

    expect(component.value).toEqual(1);
  });

  it('use arrows', () => {
    component.totalPages = 100;
    component.arrowAction('up', fakeEvent);
    expect(component.value).toEqual(2);
    component.arrowAction('down', fakeEvent);
    expect(component.value).toEqual(1);
  });

  it('use arrows will be reset to totalPages if it exceeds total pages up', () => {
    // total pages is zero
    component.arrowAction('up', fakeEvent);
    expect(component.value).toEqual(0);

  });

  it('use arrows will be reset to totalPages if it exceeds total pages down', () => {
    // total pages is zero
    component.arrowAction('down', fakeEvent);
    expect(component.value).toEqual(1);

  });

  it('test reset', () => {
    component.totalPages = 100;
    component.writeValue(50);
    expect(component.value).toEqual(50);
    component.reset();
    expect(component.value).toEqual(1);
    expect(component.totalPages).toEqual(0);

  });
  it('test writeValue', () => {

    component.writeValue(50);
    expect(component.value).toEqual(50);
    component.writeValue(null);
    expect(component.value).toEqual(50);


  });
  it('test detectChange', () => {
    component.totalPages = 100;
    fakeEvent.target.value = 50;
    component.detectChange(fakeEvent);
    expect(component.value).toEqual(50);


  });

  it('test setDisabled', () => {

    component.setDisabledState(true);
    // looking for errors only


  });


});
