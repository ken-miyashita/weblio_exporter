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

// send back the word list to the sender.
// called when the pop up is shown.
function getEntries(request, sender, sendResponse) {
    sendResponse({"entries": entries});
};

// request dispatcher
function onRequest(request, sender, sendResponse) {
    var reqName = request["name"];
    if(reqName == "setEntries"){
        setEntries(request, sender, sendResponse);
    }else if(reqName == "getEntries"){
        getEntries(request, sender, sendResponse);
    }else{
        console.log("background.js : invalid request is received. ignore it.");
    }
}

// Listen for requests.
chrome.extension.onRequest.addListener(onRequest);
