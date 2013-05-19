/////////////////////////////////////////////////////////
// Chrome extension to export the word list in http://uwl.weblio.jp/word-list
/////////////////////////////////////////////////////////

// Called when a message is passed.  We assume that the content script
// wants to show the page action (icon).
function onRequest(request, sender, sendResponse) {
    // Show the page action for the tab that the sender (content script)
    // was on.
    chrome.pageAction.show(sender.tab.id);
    console.log("backkground page is called.");

    // Return nothing to let the connection be cleaned up.
    sendResponse({});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);
