var urlPattern = //*([^\/]+)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ \#]*)#?([^ \#]*)/i;
// var urlPattern = new RegExp('(\w+):/*([^\/]+)([a-z0-9\-@\^=%&;/~\+]*)[\?]?([^ \#]*)#?([^ \#]*)', 'i');
var partialPattern = /\/*([^\/]*)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ \#]*)#?([^ \t\n\#]*)/i;
// urlPattern = new RegExp('(\w+):/*([^\/]+)([a-z0-9\-@\^=%&;/~\+]*)[\?]?([^ \#]*)#?([^ \#]*)', 'i');

var groupList = [{
  key: 'host',
  test: function(uri) {
    var out = uri.match(/(\w+):\//i);
    return out; 
  }
}];

module.exports = function locationify(url) {
  var ify = groupList.reduce(function(loc,step){
    if (typeof step.test == 'function') {
      loc[step.key] = step.test(url);
    } else if (step.test instanceof RegExp) {
      loc[step.key] = url.match(step.test);
      if (Array.isArray(loc[step.key])) loc[step.key] = loc[step.key][0];
    }
    return loc;
  },{});
  return ify;
};

