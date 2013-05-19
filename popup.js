/////////////////////////////////////////////////////////
// Chrome extension to export the word list in http://uwl.weblio.jp/word-list
/////////////////////////////////////////////////////////

// init the pop up panel with the word list.
function initPopUp(){
    // word list entries (array)
    var entries = chrome.extension.getBackgroundPage().entries;       

    // table component on the pop-up panel
    var wordTable = $('tbody#wordtable');
    
    // fill the table component.
    var i;
    for(i = 0; i < entries.length; i++){
        var entry = entries[i];
        var row = $("<tr><td>" + entry["wordEng"] + "</td><td>" + entry["wordJap"] + "</td></tr>");
        $(wordTable).append(row);
    }
}

document.addEventListener('DOMContentLoaded', initPopUp);
