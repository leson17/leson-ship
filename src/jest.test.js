/*
 * @Description:测试用例
 * @Author: Linxian Hong
 * @Date: 2020-09-05 17:54:53
 * @LastEditTime: 2020-09-05 18:33:55
 * @LastEditors: Linxian Hong
 */
test('test common matcher', () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBe(5);
});

// test('test to be true or false', () => {
//   expect(1).toBeTruthy();
//   expect(0).toBeFalsy();
// });

// test('test number', () => {
//   expect(4).toBeGreaterThan(3);
//   expect(2).toBeLessThan(3);
// });

// test('test object', () => {
//   expect({ name: 'leson' }).toEqual({ name: 'leson' });
// });
