/////////////////////////////////////////////////////////
// Chrome extension to export the word list in http://uwl.weblio.jp/word-list
/////////////////////////////////////////////////////////

// entries in the word list.
var entries = [];

// read all entries in the word list.
var rows = $('table.tngMainT tr');
rows.each(function(index, elm){
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

    // push the data into the array.
    entries.push({"wordEng": wordEng, "pron": pron, "wordJap": wordJap,
                  "sampleEng": sampleEng, "sampleJap": sampleJap});    
});

// send the extracted word list to the background page.
chrome.extension.sendRequest({"entries": entries}, function(response) {});
