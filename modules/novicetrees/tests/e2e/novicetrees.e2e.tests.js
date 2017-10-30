'use strict';

describe('Novicetrees E2E Tests:', function () {
  describe('Test Novicetrees page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/novicetrees');
      expect(element.all(by.repeater('novicetree in novicetrees')).count()).toEqual(0);
    });
  });
});
