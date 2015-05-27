(function(){
    'use strict';

    function LoanFactory(LoanData){
      var factory = {
        data: LoanData
      }

      return factory;
    }

    LoanFactory.$inject = ['LoanData'];

    angular.module('MyLoans').factory('LoanFactory', LoanFactory);
})();