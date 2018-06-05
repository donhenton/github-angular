import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {

  let pipe ;
  beforeEach(() => {
     pipe = new TruncatePipe();
  });



  it('create an instance', () => {

    expect(pipe).toBeTruthy();
  });

  it('test truncate output', () => {

     const testIn =  '12345 12345 12345 12345 12345 12345';
     const valueExpected = '12345 12345 12345 12345...';
     const t = pipe.transform(testIn);
     expect(t).toEqual(valueExpected);

  });

});
