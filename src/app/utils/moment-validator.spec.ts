import { momentValidator, checkDates, DATE_FORMAT } from './moment.validator';
import { ValidationErrors, AbstractControl } from '@angular/forms';


// https://stackoverflow.com/questions/39910017/angular-2-custom-validation-unit-testing

const dateOne = '2011-01-01';
const dateTwo = '2016-01-01';
let primedValidator;

describe('MomentValidtor', () => {


  beforeEach(() => {
    primedValidator = momentValidator(DATE_FORMAT);

  });


  it('create an instance', () => {

    expect(momentValidator).toBeTruthy();
  });


  describe('check dates testing ', () => {
    it('checkdates before', () => {
      const t = checkDates(dateOne, dateTwo);
      expect(t).toBeTruthy();

    });

    it('checkdates after', () => {

      const t = checkDates(dateTwo, dateOne);
      expect(t).toBeFalsy();

    });
  });

});
