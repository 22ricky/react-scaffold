let Mock = require('mockjs');

let Random = Mock.Random;

module.exports = function() {
  var data = {};
  data.user = {
    'name': Random.cname(),
    'intro': Random.word(20)
  };
  return data;
};