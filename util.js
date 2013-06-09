/**
 * @author 0000940141
 */

// show the error from Dropbox APIs.
function showDropboxError(error) {
    var errName = "";
    switch (error.status) {
        case Dropbox.ApiError.INVALID_TOKEN:
            // If you're using dropbox.js, the only cause behind this error is that
            // the user token expired.
            // Get the user through the authentication flow again.
            errName = "INVALID_TOKEN";
            break;

        case Dropbox.ApiError.NOT_FOUND:
            // The file or folder you tried to access is not in the user's Dropbox.
            // Handling this error is specific to your application.
            errName = "NOT_FOUND";
            break;

        case Dropbox.ApiError.OVER_QUOTA:
            // The user is over their Dropbox quota.
            // Tell them their Dropbox is full. Refreshing the page won't help.
            errName = "OVER_QUOTA";
            break;

        case Dropbox.ApiError.RATE_LIMITED:
            // Too many API requests. Tell the user to try again later.
            // Long-term, optimize your code to use fewer API calls.
            errName = "RATE_LIMITED";
            break;

        case Dropbox.ApiError.NETWORK_ERROR:
            // An error occurred at the XMLHttpRequest layer.
            // Most likely, the user's network connection is down.
            // API calls will not succeed until the user gets back online.
            errName = "NETWORK_ERROR";
            break;

        case Dropbox.ApiError.INVALID_PARAM:
            errName = "INVALID_PARAM";
            break;


        case Dropbox.ApiError.OAUTH_ERROR:
            errName = "OAUTH_ERROR";
            break;
        case Dropbox.ApiError.INVALID_METHOD:
            errName = "INVALID_METHOD";
            break;

        default:
            // Caused by a bug in dropbox.js, in your application, or in Dropbox.
            // Tell the user an error occurred, ask them to refresh the page.
            errName = "Unknown";
    }

    alert("Dropbox error: status = " + errName + "(" + error.status + ")");
}
