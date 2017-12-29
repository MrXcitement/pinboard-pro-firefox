function restoreOptions() {
  var getOptions = browser.storage.sync.get({ visibleItems: true });
  getOptions.then(function (options) {
    var key;
    for (key in options.visibleItems) {
      if (options.visibleItems.hasOwnProperty(key)) {
        document.querySelector('.js-show-' + key).checked = options.visibleItems[key];
      }
    }
  });
}

function updateStatus() {
  var status = document.querySelector('.js-status');
  status.textContent = 'Saved!';
  setTimeout(function () {
    status.textContent = '';
  }, 750);
}

function saveOptions() {
  var visibleItems = {};
  var setOptions;
  var items = ['all', 'random', 'readLater', 'save', 'unread'];

  items.forEach(function (item) {
    visibleItems[item] = document.querySelector('.js-show-' + item).checked;
  });

  setOptions = browser.storage.sync.set({ visibleItems: visibleItems });
  setOptions.then(updateStatus());
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('.js-save').addEventListener('click', saveOptions);
