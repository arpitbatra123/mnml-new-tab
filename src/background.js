chrome.browserAction.onClicked.addListener(() => {
  try {
    if (browser) {
      chrome.tabs.create({});
    }
  } catch (_e) {
    chrome.tabs.create({
      url: 'chrome://newtab'
    });
  }
});
