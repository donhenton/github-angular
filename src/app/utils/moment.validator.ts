import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';


export const DATE_FORMAT = 'YYYY-MM-DD';


export function momentValidator(dateFormat: string): ValidatorFn {

function checkDate(control: AbstractControl): ValidationErrors {
    const dateStr = control.value;
    let t = null;
    const invalidObj = { 'momentCheck': true };
    try {
          t = moment(dateStr, dateFormat, true);
    } catch (e) {
        // console.log('in error ' + e.message);
        return invalidObj;
    }


    // console.log(`input date ${dateStr} dateFormat ${dateFormat}  -- ${t.toString()}`);
    if (t.isValid() === false) {
      //  console.log('failed validation');
        return invalidObj;
    }
    return null;
}

return checkDate;

}


export function checkDates(start, end) {

    const tStart = moment(start, DATE_FORMAT, true);
    const tEnd = moment(end, DATE_FORMAT, true);
    const diff = tStart.diff(tEnd, 'days' );
    const valid = diff < 0 ? true : false;
   // console.log(`diff ${diff} valid ${valid}`);
    return valid;


}
