(function() {
  'use strict';

  describe('LoanService', function() {
    var httpBackend, service;

    beforeEach(function() {

      angular.mock.module('MyLoans');

      inject(function($injector) {
        service       = $injector.get('LoanService');
        httpBackend   = $injector.get('$httpBackend');
      });
    });

    describe('#updateQuote', function() {
      beforeEach(function() {
        httpBackend.when('POST', '/my/quote/1/recalculate')
        .respond({});
      });

      afterEach(function() {
       httpBackend.verifyNoOutstandingExpectation();
       httpBackend.verifyNoOutstandingRequest();
     });

      it('should post to the right path with the expected params', function() {
        var id, term, amount;
        id = 1;
        term = 2;
        amount = 3;

        httpBackend.expectPOST('/my/quote/'+1+'/recalculate', {
          term: term,
          amount: amount
        });

        service.updateQuote(id, term, amount);

        httpBackend.flush();
      });
    });
  });
})();
