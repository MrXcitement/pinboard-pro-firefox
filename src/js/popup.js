document.addEventListener('DOMContentLoaded', function () {
  var items = ['all', 'random', 'readLater', 'save', 'unread'];
  var getOptions;

  items.forEach(function (item) {
    document.querySelector('.js-' + item + ' a')
      .addEventListener('click', Pinboard[item]);
  });

  getOptions = browser.storage.sync.get({ visibleItems: true });
  getOptions.then(function (options) {
    if (!options.visibleItems || typeof options.visibleItems !== 'object') return;
    items.forEach(function (item) {
      if (!options.visibleItems[item]) {
        document.querySelector('.js-' + item).remove();
      }
    });
  });
});
