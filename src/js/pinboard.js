var BASE_URL = 'https://pinboard.in';

var Pinboard = { // eslint-disable-line no-unused-vars
  all: function () {
    browser.tabs.create({ url: BASE_URL });
  },
  random: function () {
    browser.tabs.create({ url: BASE_URL + '/random/?type=unread' });
  },
  readLater: function () {
    var getTabs = browser.tabs.query({ active: true, currentWindow: true });
    getTabs.then(function (tabs) {
      var tab = tabs[0];
      var url = BASE_URL
        + '/add?jump=close&later=yes&noui=yes&jump=close&url=' + encodeURIComponent(tab.url)
        + '&title=' + encodeURIComponent(tab.title);
      browser.windows.create({
        allowScriptsToClose: true,
        height: 550,
        width: 700,
        type: 'panel',
        titlePreface: 'Pinboard',
        url: url
      });
    });
  },
  save: function () {
    var getTabs = browser.tabs.query({ active: true, currentWindow: true });
    getTabs.then(function (tabs) {
      var tab = tabs[0];
      var selection = browser.tabs.executeScript(tab.id, {
        code: 'window.getSelection().toString();'
      });
      selection.then(function (text) {
        var url = BASE_URL + '/add?jump=close&showtags=yes&url=' + encodeURIComponent(tab.url)
          + '&title=' + encodeURIComponent(tab.title)
          + '&description=' + encodeURIComponent(text);
        browser.windows.create({
          allowScriptsToClose: true,
          height: 550,
          width: 700,
          type: 'panel',
          titlePreface: 'Pinboard',
          url: url
        });
      });
    });
  },
  unread: function () {
    browser.tabs.create({ url: BASE_URL + '/toread/' });
  }
};
