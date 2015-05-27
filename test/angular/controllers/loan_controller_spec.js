(function() {
  'use strict';
  var loanFixture = {
    customer: {
    name: 'Form Rose Testing'
    },
    loan: {
      id: 21,
      amount: 2000.00,
      fee: 80.00,
      term: 24,
      monthlyRepayment: 96.22,
      adjustments: 1.08,
      apr: 14.20
    }
  };

  describe('LoanController', function() {
    var scope, controller, factory, service, q;

    beforeEach(function() {

      angular.mock.module('MyLoans', function($provide) {
        $provide.value('LoanData', loanFixture);
      });

      inject(function($controller, $rootScope, $injector, $q) {
        scope      = $rootScope.$new();
        q          = $q;
        factory    = $injector.get('LoanFactory');
        service    = $injector.get('LoanService');
        controller = $controller('LoanController', { $scope: scope });
      });
    });

    describe('controller data', function() {
      it('should expose a loan and a customer object', function() {
        expect(controller.data.loan).toBeDefined();
        expect(controller.data.customer).toBeDefined();
      });
    });

    describe('#resetQuote', function() {
      it('should reset tempAmount and term when resetting the quote', function() {
        //simulate the loan slider being dragged
        controller.tempAmount = 4000.00;
        controller.tempTerm = 48;
        controller.ontermChanges();
        
        controller.resetQuote();
        expect(controller.termsChanged).toEqual(false);
        expect(controller.termInYears).toEqual(2);
        expect(controller.tempAmount).toEqual(controller.data.loan.amount);
        expect(controller.tempTerm).toEqual(controller.data.loan.term);
      });
    });

    describe('#updateQuote', function() {
      it('should call the LoanService with the select term and amount and refresh the quote data', function() {
        spyOn(service, 'updateQuote').and.callFake(function () {
          return {
            success: function (callback) {
              callback(loanFixture);
            }
          }
        });

        spyOn(controller, 'initFromLoanData');

        controller.tempTerm = 36;
        controller.tempAmount = 5000;
        controller.updateQuote();
        expect(service.updateQuote).toHaveBeenCalledWith(controller.data.loan.id, 36, 5000);
        expect(controller.initFromLoanData).toHaveBeenCalled();
      });
    });
  });
})();
