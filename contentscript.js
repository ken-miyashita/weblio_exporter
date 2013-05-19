/////////////////////////////////////////////////////////
// Chrome extension to export the word list in http://uwl.weblio.jp/word-list
/////////////////////////////////////////////////////////


// read all entries in the word list.
var entries = $('table.tngMainT tr');
entries.each(function(index, elm){
    // ignore the first row since it contains titles of columns.
    // note "return" means "continue" in the function called by each().
    if(index == 0){
        return;
    } 
   
    // extract data in one row.
    var wordEng   = $('td.tngMainTTG', $(elm)).text();
    var pron      = $('td.tngMainTHT', $(elm)).text();
    var wordJap   = $('td.tngMainTIM', $(elm)).text();
    var sampleEng = $('p.tngMainTSRH', $(elm)).text();
    var sampleJap = $('span.tngMainTSRFL', $(elm)).text();


    // console.log(wordEng + " |" + pron + "|" + wordJap + "|" + sampleEng + "|" + sampleJap);
   
});

// ask the background page to show the icon in the omnibox.
chrome.extension.sendRequest({}, function(response) {
    // the background page sends back a response.
    console.log("content script received a response.")
});
