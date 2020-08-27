chrome.commands.onCommand.addListener(function(command) {
  if (command=="copy") {
    chrome.tabs.executeScript(undefined, {file: 'copy.js'});
  }
});