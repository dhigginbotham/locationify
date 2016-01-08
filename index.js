var locationify = function(str) {
  if (str) return locationify.parseHref(str);
  return locationify;
};
  
// http schema/protocol
locationify.getProtocol = function (str) {
  var re = /https?:\/\//;
  if (str) return str.match(re);
};

// strip off trailing slashes
locationify.stripTrailing = function (str) {
  if (str[str.length - 1] == '/') str = str.substr(0, str.length - 1);
  return str;
};

// get querystring params
locationify.parseParams = function (str) {
  var params = {}, queries, temp, i, l;
  var query = str;
  var queryString = query.substring(query.indexOf('?') + 1);
  queries = queryString.split("&");
  for (i = 0, l = queries.length; i < l; i++) {
    temp = queries[i].split('=');
    params[temp[0]] = decodeURIComponent(temp[1]);
  }
  return params;
};

// accepts an array of paths and joins
// them back into a str
locationify.serializePaths = function (arr) {
  if (arr && arr.length) return '/' + arr.join('/');
};

// serializes param obj, only works single
// level
locationify.serializeParams = function (obj) {
  var param = null;
  for (var k in obj) {
    if (!param) param = [];
    param.push(k + '=' + obj[k]);
  }
  return param.join('&');
};

locationify.parseHref = function (str) {

  var pieces, paramIndex, protocol, hashIndex, url;

  // base url obj values
  url = {
    base: null,
    host: null,
    hash: null,
    params: null,
    pathname: null,
    path: null,
    protocol: null
  };

  if (!str) return url;

  // reset/set current obj
  url.base = str;
    
  // match/strip protocol
  protocol = locationify.getProtocol(str);
  if (protocol) {
    url.protocol = protocol[0];
    str = str.replace(protocol[0], '');
  }

  // strip off #hash
  hashIndex = str.indexOf('#');
  if (hashIndex != -1) {
    url.hash = str.split('#')[1];
    str = str.substr(0, hashIndex);
  }

  // process params
  paramIndex = str.indexOf('?');
  if (paramIndex != -1) {
    url.params = locationify.parseParams(str);
    str = str.substr(0, paramIndex);
  }

  // strip any trailing slashes
  str = locationify.stripTrailing(str);

  // break pieces into array
  pieces = str.split('/');
  if (pieces.length) {
    url.host = pieces[0];
    if (pieces.length > 1) {
      url.path = url.pathname = pieces.splice(1, pieces.length - 1);
    }
  }

  return url;

};

module.exports = locationify;