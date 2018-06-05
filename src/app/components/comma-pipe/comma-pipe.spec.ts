import { CommaPipe } from './comma.pipe';

describe('CommaPipe', () => {

  let pipe ;
  beforeEach(() => {
     pipe = new CommaPipe();
  });



  it('create an instance', () => {

    expect(pipe).toBeTruthy();
  });

  it('test comma output', () => {

     const testIn = ['fred', 'ted', 'ned'];
     const valueExpected = 'fred, ted, ned';
     const t = pipe.transform(testIn);
     expect(t).toEqual(valueExpected);

  });

});
