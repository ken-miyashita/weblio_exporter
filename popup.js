/////////////////////////////////////////////////////////
// Chrome extension to export the word list in http://uwl.weblio.jp/word-list
/////////////////////////////////////////////////////////

// entries in the word list.
var entries = [];

// Dropbox client
// has a valid value only when authentication succeeded. 
// if authentication failed, dbxClient is set to be undefined.
var dbxClient = undefined;


// init the pop up panel with the word list.
function initPopUp(){
    // link variables in background.js
    entries = chrome.extension.getBackgroundPage().entries;       
    dbxClient = chrome.extension.getBackgroundPage().dbxClient;       

    // table component on the pop-up panel
    var wordTable = $('tbody#wordtable');
    
    // fill the table component.
    var i;
    for(i = 0; i < entries.length; i++){
        var entry = entries[i];
        var row = $("<tr><td>" + entry["wordEng"] + "</td><td>" + entry["wordJap"] + "</td></tr>");
        $(wordTable).append(row);
    }
    
    // test
    if(dbxClient != undefined){
        dbxClient.getUserInfo(function(error, userInfo) {
            if (error) {
                return showDropboxError(error);  // Something went wrong.
            }
            alert("Nice to see you, " + userInfo.name + "!");
        });
    }
}

document.addEventListener('DOMContentLoaded', initPopUp);
