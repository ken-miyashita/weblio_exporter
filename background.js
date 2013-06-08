/////////////////////////////////////////////////////////
// Chrome extension to export the word list in http://uwl.weblio.jp/word-list
/////////////////////////////////////////////////////////

// entries in the word list.
var entries = [];

// Dropbox client
// has a valid value only when authentication succeeded. 
// if authentication failed, dbxClient is set to be undefined.
var dbxClient = undefined;


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

// connect to DropBox with authentication.
dbxClient = new Dropbox.Client({
    key: "lK+DODUJKIA=|z3nAFSjnMnQuuja76O6l+NxtRwZHCpYJsTRdLYn3oQ==", sandbox: true
});

dbxClient.authDriver(new Dropbox.Drivers.Chrome({
    receiverPath: "chrome_oauth_receiver.html"}));

dbxClient.authenticate(function(error, client) {
    if (error) {
        dbxClient = undefined;
        return showDropboxError(error);
    }   
});


