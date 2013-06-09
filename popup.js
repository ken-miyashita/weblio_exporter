/////////////////////////////////////////////////////////
// Chrome extension to export the word list in http://uwl.weblio.jp/word-list
/////////////////////////////////////////////////////////

// background page
var bgPage = undefined;


// init the pop up panel with the word list.
function initPopUp(){
    // link variables in background.js
    bgPage = chrome.extension.getBackgroundPage();

    // table component on the pop-up panel
    var wordTable = $('tbody#wordtable');
    
    // fill the table component.
    var entries = bgPage.entries;
    var i;
    for(i = 0; i < entries.length; i++){
        var entry = entries[i];
        var row = $("<tr><td>" + entry["wordEng"] + "</td><td>" + entry["wordJap"] + "</td></tr>");
        $(wordTable).append(row);
    }

    // test
    bgPage.connectDropbox(function(error, client) {
        if (error) {
            return showDropboxError(error);
        } 
        
        // succeed.
        var dbxClient = bgPage.dbxClient; 
        if(dbxClient != undefined){
            dbxClient.getUserInfo(function(error, userInfo) {
                if (error) {
                    return showDropboxError(error);  // Something went wrong.
                }

                // show the username on the popup window.                
                $('#username').text(userInfo.name);
            });
        }
          
    });
}

document.addEventListener('DOMContentLoaded', initPopUp);
