(function(){
    'use strict';

    function HomepageController($scope, $window){
        this.submit = function() {
            if (!this.quoteId) {
                return;
            }
            $window.location.href = 'my/quote/' + this.quoteId;
        };
    };

    HomepageController.$inject = ['$scope', '$window'];

    angular.module('MyLoans').controller('HomepageController', HomepageController);
})();