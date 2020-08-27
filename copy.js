// Get selected text and convert to roam syntax

var base_url = window.location.origin;
var url = document.URL;

if (base_url=="https://en.wikipedia.org") {

   var title = url.split("/").pop().replace(/#.*/,"").replace("_"," ");

   var range = window.getSelection().getRangeAt(0);
   var selectionContents = range.cloneContents();
   var selectionNodes = selectionContents.childNodes;

   // Convert hyperlinks to Roam references
   var selection = "";
   selectionNodes.forEach((node) => {
       if (node.nodeName=="B") {
           selection = selection + `[${node.textContent}]([[${title}]])`;
       } else if (node.nodeName=="A") {
           selection = selection + `[${node.textContent}]([[${node.title}]])`;
       } else if (node.nodeName=="SUP") {
           // Skip citation links
           selection = selection;
       } else {
           selection = selection + node.textContent;
       }
   })
   selection = selection.replace(/\s*\n\s*/g, " ")
}

// Copy the above to the clipboard

//source:: https://stackoverflow.com/a/18455088
//Create area for the text
var copyFrom = document.createElement("textarea");
document.body.appendChild(copyFrom);
//Add the text string to the text area and copy it
copyFrom.textContent = selection;
copyFrom.select();
document.execCommand('copy');
// Clean up
copyFrom.blur();
document.body.removeChild(copyFrom);
