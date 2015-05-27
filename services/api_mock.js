exports.getQuote = function(id) {
  if (id == 3433) {
    return getQuote200;
  } else {
    return getQuote404;
  }
};

exports.recalculateQuote = function() {
  return postRecalculateQuote200;
}

//Fixtures
var getQuote200 = {
  code: 200,
  body: {
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
  }
}

var getQuote404 = {
  code: 404,
  body: {
    errors: [
      { message: 'The quote does not exist' }
    ]
  }
}

var postRecalculateQuote200 = { 
  code: 200,
  body:{
    customer: {
      name: 'Form Rose Testing'
    },
    loan: {
      id: 21,
      amount: 3000.00,
      fee: 90.00,
      term: 36,
      monthlyRepayment: 76.22,
      adjustments: 1.08,
      apr: 13.90
    }
  }
}

