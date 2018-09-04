chrome.webNavigation.onHistoryStateUpdated.addListener((a) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { name: "history-changed", data: a.url });
    });
});