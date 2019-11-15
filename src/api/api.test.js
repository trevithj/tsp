import * as API from './index';

describe('API calls', () => {
  it('should return empty array if no matched addresses found', () => {
    return API.getAddresses('something').then(list => {
      expect(list.length).toEqual(0);
    });
  });
  it('should return list of matching addresses', () => {
    return API.getAddresses('Kai').then(list => {
      console.log(list);
      expect(list.length).toBeGreaterThan(0);
    });
  });
  // it('should return exact address if possible', () => {
  //   return API.getAddresses('Kaipara Tavern').then(list => {
  //     // console.log(list);
  //     expect(list.length).toEqual(1);
  //     expect(list[0].addr).toEqual('Kaipara Tavern, 26 Commercial Road');
  //   });
  // });
});
