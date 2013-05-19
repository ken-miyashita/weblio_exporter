/////////////////////////////////////////////////////////
// Chrome extension to export the word list in http://uwl.weblio.jp/word-list
/////////////////////////////////////////////////////////

// entries in the word list.
var entries = [];

// set the word list entries.
// called when the content script is invoked.
// - show the icon in the URL field to let users show the pop up dialog.
// - receive the extracted word list entries.
function setEntries(request, sender, sendResponse) {
    chrome.pageAction.show(sender.tab.id);
    entries = request["entries"];
    sendResponse({});
};

// Listen for the request from the content script.
chrome.extension.onRequest.addListener(setEntries);

