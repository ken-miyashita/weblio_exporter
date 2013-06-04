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

// describe the error from Dropbox APIs.
function showDropboxError(error) {
    switch (error.status) {
        case Dropbox.ApiError.INVALID_TOKEN:
            // If you're using dropbox.js, the only cause behind this error is that
            // the user token expired.
            // Get the user through the authentication flow again.
            console.log("DropBox Error: INVALID_TOKEN");
            break;

        case Dropbox.ApiError.NOT_FOUND:
            // The file or folder you tried to access is not in the user's Dropbox.
            // Handling this error is specific to your application.
            break;

        case Dropbox.ApiError.OVER_QUOTA:
            // The user is over their Dropbox quota.
            // Tell them their Dropbox is full. Refreshing the page won't help.
            break;

        case Dropbox.ApiError.RATE_LIMITED:
            // Too many API requests. Tell the user to try again later.
            // Long-term, optimize your code to use fewer API calls.
            break;

        case Dropbox.ApiError.NETWORK_ERROR:
            // An error occurred at the XMLHttpRequest layer.
            // Most likely, the user's network connection is down.
            // API calls will not succeed until the user gets back online.
            break;

        case Dropbox.ApiError.INVALID_PARAM:
        case Dropbox.ApiError.OAUTH_ERROR:
        case Dropbox.ApiError.INVALID_METHOD:
        default:
        // Caused by a bug in dropbox.js, in your application, or in Dropbox.
        // Tell the user an error occurred, ask them to refresh the page.
    }
};

// Listen for the request from the content script.
chrome.extension.onRequest.addListener(setEntries);

// connect to DropBox with authentication.
var client = new Dropbox.Client({
    key: "lK+DODUJKIA=|z3nAFSjnMnQuuja76O6l+NxtRwZHCpYJsTRdLYn3oQ==", sandbox: true
});

client.authDriver(new Dropbox.Drivers.Chrome({
    receiverPath: "chrome_oauth_receiver.html"}));

client.authenticate(function(error, client) {
    if (error) {
        console.log("failed to authenticate. error = " + error);
        return showDropboxError(error);
    }

    // succeed in authentication.
    console.log("success!!!");
    
    // test!!
    client.getUserInfo(function(error, userInfo) {
        if (error) {
            return showDropboxError(error);  // Something went wrong.
        }
        console.log("Hello, " + userInfo.name + "!");
    });
});


