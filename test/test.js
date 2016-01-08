var tap = require('tap');
var locationify = require('..');

tap.test('full URLs', function (t) {
  t.similar(locationify('https://github.com/justsml#top'), {
    protocol: 'https:',
    host: 'github.com',
    hash: 'top',
    path: ['justsml'],
  });
  // call t.end() when you're done
  t.end();
});
tap.test('partial URL', function (t) {
  t.similar(locationify('/justsml/locationify#top'), {
    host: '',
    hash: 'top',
    path: ['justsml', 'locationify'],
  });
  t.end();
});
tap.test('callable fn when no input', function (t) {
  var l = locationify();
  t.ok(typeof l === 'function');
  t.end();
});
