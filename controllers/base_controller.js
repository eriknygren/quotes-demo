var api = require('../services/api_mock')

exports.index = function(req, res, next) {
  res.render('index', { title: 'My Quote Demo' });
}

exports.getQuote = function(req, res, next) {
  var api_response = api.getQuote(req.params.id);

  if (api_response.code == 200) {
    var locals = {
      title: 'My quote',
      quote: api_response.body
    }
    res.render('quote_show', locals);
  } else {
    res.render('quote_not_found', { title: 'Quote not found' });
  }
};

exports.recalculateQuote = function(req, res, next) {
  var api_response = api.recalculateQuote();
  res.send(api_response.body);
};