var tap = require('tap');
var locationify = require('..');
var testData = {
  'file:///home/dan/passwords': {
    protocol: 'file:',
    path: ['home', 'dan', 'passwords']
  },
  '/justsml/locationify#top': {
    host: '',
    hash: 'top',
    path: ['justsml', 'locationify'],
  },
  'https://github.com/justsml#top': {
    protocol: 'https:',
    host: 'github.com',
    hash: 'top',
    path: ['justsml'],
  }
};

Object.keys(testData).forEach(function(url) {
  var data = testData[url];
  tap.test('parse ' + url, function (t) {
    t.similar(locationify(url), data);
    // call t.end() when you're done
    t.end();
  });
});

tap.test('blank string - returns function?', function (t) {
  t.ok(typeof locationify('') === 'function');
  t.end();
});

tap.test('no args, returns function?', function (t) {
  var l = locationify();
  t.ok(typeof l === 'function');
  t.end();
});
