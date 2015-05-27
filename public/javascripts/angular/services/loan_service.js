(function(){
    'use strict';

    function LoanService($http){
      var service = {};

      service.updateQuote = function(id, term, amount){
        return $http.post('/my/quote/'+ id +'/recalculate', { 
          term: term,
          amount: amount 
        });
      };

      return service;
    }

    LoanService.$inject = ['$http'];

    angular.module('MyLoans').service('LoanService', LoanService);
})();