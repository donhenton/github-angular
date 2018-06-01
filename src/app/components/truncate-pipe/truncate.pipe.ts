import { Pipe, PipeTransform } from '@angular/core';

/**
 * take a string and split on words then truncate to a given limit
 * optional trail string eg '...'
 * sample usage:
 *
 * {{ str | truncate: 35 :'$$$' }}
 *
 * limit eg 45 string limit defaults to 25;
 *
 * trail defaults to '...'
 */
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(text: string, limit= 25, trail = '...'): any {
    // const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
    // const trail = args.length > 1 ? args[1] : '...';
    const textOutput = this.computeSplitText(text, limit, trail.length);
    return textOutput + trail;
  }

  /**
   * compute the split text, splitting on words
   * @param text text to truncate
   * @param length  limit will include trailLength
   * @param trailLength the length of the appended trail
   */
  computeSplitText(text, length, trailLength) {

    text = text.trim();
    let splitText = '';
    const words = text.split(/\s+/);
    let currentCount = trailLength;

    words.every(element => {
      element = element.trim();
      currentCount = currentCount + element.length;
      if (currentCount <= length) {
        splitText = splitText + ' ' + element;
        return true;
      } else {
        return false;
      }

    });
    return splitText;


  }

}



