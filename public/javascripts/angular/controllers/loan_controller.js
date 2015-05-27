(function(){
    'use strict';

    function LoanController(LoanFactory, LoanService, $scope){
        this.data = LoanFactory.data;
        this.termsChanged = false;
        
        this.ontermChanges = function() {
            this.termsChanged = true;
            this.termInYears = (this.tempTerm / 12);
        };

        this.resetQuote = function() {
            this.tempAmount = this.data.loan.amount;
            this.tempTerm = this.data.loan.term;
            this.termInYears = (this.data.loan.term / 12)
            updateSlidersInView(this.tempTerm, this.tempAmount);
            this.termsChanged = false;
        };

        this.updateQuote = function () {
            LoanService.updateQuote(this.data.loan.id, this.tempTerm, this.tempAmount).
            success(function(data) {
                this.data = data;
                this.quoteUpdated = true;
                this.initFromLoanData();
                updateSlidersInView(this.tempTerm, this.tempAmount);
                this.termsChanged = false;
            }.bind(this)),function(error) {
                console.log(error);
            };
        }

        this.initFromLoanData = function() {
            this.totalRepayment = calculateTotalRepayment(this.data.loan.monthlyRepayment, 
                                                    this.data.loan.term, 
                                                    this.data.loan.adjustments);
            this.tempTerm = this.data.loan.term;
            this.termInYears = (this.tempTerm / 12);
            this.tempAmount = this.data.loan.amount;
        };

        // private
        function calculateTotalRepayment(monthlyRepayment, term, adjustments) {
            return (monthlyRepayment * term + adjustments).toFixed(2)
        };

        function updateSlidersInView(term, amount) {
            $('#loan-term').val(term).change();
            $('#loan-amount').val(amount).change();
        };

        this.initFromLoanData();
    }

    LoanController.$inject = ['LoanFactory', 'LoanService', '$scope'];

    angular.module('MyLoans').controller('LoanController', LoanController);
})();