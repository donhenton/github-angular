import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateQueryComponent } from './date-query.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { SuggestPageComponent } from '../suggest-page/suggest-page.component';
import { CommaPipe } from '../../components/comma-pipe/comma.pipe';
import { TruncatePipe } from '../../components/truncate-pipe/truncate.pipe';
import { ErrorDisplayComponent } from '../../components/error-display/error-display.component';
import { GithubItemComponent } from '../../components/github-item/github-item.component';
import { GithubService } from '../../services/github.service';
import { ErrorService } from '../../services/error.service';
import { PageOffsetComponent } from '../../components/page-offset/page-offset.component';

describe('DateQueryComponent', () => {
  let component: DateQueryComponent;
  let fixture: ComponentFixture<DateQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserModule,
      ],
      declarations:
        [DateQueryComponent,
          CommaPipe,
          PageOffsetComponent,
          TruncatePipe,
          ErrorDisplayComponent,
          GithubItemComponent],

      providers: [GithubService, ErrorService, ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // https://www.codesandnotes.be/2017/07/06/writing-and-testing-custom-angular-validators-the-passwords-matching-case/
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false on bad date', async(() => {


    component.dateForm.controls.startDate.patchValue('bonzo');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

       // let field2Model = fixture.debugElement.query(By.css('input[name=field2]')).references['field2Model'];
       expect(component.dateForm.controls.startDate.valid).toBe(false);
      // expect(field2Model.valid).toBe(false);
    });
  }));

  it('should return true  on good date', async(() => {


    component.dateForm.controls.startDate.patchValue('2015-01-01');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

       expect(component.dateForm.controls.startDate.valid).toBe(true);
    });
  }));

  it('should return false on error', async(() => {


    component.dateForm.controls.startDate.patchValue(null);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

       expect(component.dateForm.controls.startDate.valid).toBe(false);
    });
  }));

});
