/*
 * Chrome extension to export the word list in http://uwl.weblio.jp/word-list
 */


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


    console.log(wordEng + " |" + pron + "|" + wordJap + "|" + sampleEng + "|" + sampleJap);
   
});


var regex = /iya/;

// Test the text of the body element against our regular expression.
if (regex.test(document.body.innerText)) {
  // The regular expression produced a match, so notify the background page.
  chrome.extension.sendRequest({}, function(response) {});

} else {
  // No match was found.
}
