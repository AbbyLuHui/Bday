
window.oncontextmenu = function(e) {
    var birthday = e.target.parentElement.getAttribute("data-tooltip-content")
    chrome.runtime.sendMessage({friend:birthday}, function(response){
      console.log(response.sent);
    })
}
