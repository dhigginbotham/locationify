var urlPattern = /(\w+):\/*([^\/]+)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ \#]*)#?([^ \#]*)/i;
// var urlPattern = new RegExp('(\w+):/*([^\/]+)([a-z0-9\-@\^=%&;/~\+]*)[\?]?([^ \#]*)#?([^ \#]*)', 'i');
var partialPattern = /\/*([^\/]*)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ \#]*)#?([^ \t\n\#]*)/i;
// urlPattern = new RegExp('(\w+):/*([^\/]+)([a-z0-9\-@\^=%&;/~\+]*)[\?]?([^ \#]*)#?([^ \#]*)', 'i');

module.exports = function locationify(url) {
  if ( url && typeof url === 'string') {
    var parts = url.match(urlPattern); // well formed, best case (no checks for weird edge case stuff yet)
    // console.warn('parts', url, parts);
    if (parts && parts[1]  && parts[2]  && parts[3] ) {
      if (parts[1] === 'file') {
        return {
          protocol: parts[1]+':',
          host: null,
          path: (parts[2] + '' + parts[3]).split('/').filter(function(s) { return s; }),
          query: null,
          hash: null,
        };
      } else {
        return {
          protocol: parts[1]+':',
          host: parts[2],
          path: parts[3] && parts[3].split('/').filter(function(s) { return s; }),
          query: parts[4],
          hash: parts[5],
        };
      }

    }
    if (!parts || !parts.protocol) {
      parts = url.match(partialPattern);
      if (parts) {
        return {
          protocol: null,
          host: '',
          path: (parts[1] + '' + parts[2]).split('/').filter(function(s) { return s; }),
          // parts[1] && parts[1].split('/').filter(function(s) { return s; }),
          query: parts[3],
          hash: parts[4],
        };
      }
    }
    if (!parts) {
      parts = url.split(/(\w+):\/*([^ ]*)/);
      if (parts) {
        return { protocol: parts[1]+':', path: parts[2] && parts[2].split('/') };
      }

    }
  }

  return locationify;
};

