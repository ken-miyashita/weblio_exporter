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

    // connect to Dropbox.com.
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
                
                // test
                // upload the word list.
                uploadEntries();
            });
        }
          
    });
}

// upload the entries (word list).
// see https://github.com/dropbox/dropbox-js/blob/stable/guides/getting_started.md#write-a-file
function uploadEntries(){
    // create a file content as a string.
    var cont = "";
    var entries = bgPage.entries;
    var i;
    for(i = 0; i < entries.length; i++){
        var entry = entries[i];
        cont += entry["wordEng"] + " / " + entry["sampleEng"] + "\t" 
                + entry["wordJap"] + " / " + entry["sampleJap"] + "\n";
    }   

    bgPage.dbxClient.writeFile("weblio2013.tsv", cont, function(error, stat) {
        if (error) {
            return showDropboxError(error);   // Something went wrong.
        }
    }); 
}




document.addEventListener('DOMContentLoaded', initPopUp);
