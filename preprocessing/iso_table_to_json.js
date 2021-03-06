// Fetch a URL and parse all it's tables into JSON, using a callback 
var tabletojson = require('tabletojson');
var fs = require('fs');

var url = 'https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes';
var fileNameOut = "iso_dict.json";

tabletojson.convertUrl(url, function (tablesAsJson) {
  var mainTable = tablesAsJson[1]; // we want the second table on the Wikipedia ISO page
  var codesDict = {};
  for (language of mainTable) {
    var iso1 = language["639-1"];
    var iso2T = language["639-2/T"];
    var iso2B = language["639-2/B"];
    var iso3 = language["639-3"];
    codesDict[iso1] = language;
    codesDict[iso2T] = language;
    codesDict[iso2B] = language;
    codesDict[iso3] = language;
  }
  // now codesDict contains the same data as mainTable, but indexed by all iso codes
  var prettyString = JSON.stringify(codesDict, null, 2);
  fs.writeFile(fileNameOut, prettyString, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("File was written.");
  });
});