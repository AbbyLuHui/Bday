window.oncontextmenu = function(e) {
    var birthday = e.target.parentElement.getAttribute("data-tooltip-content")
    console.log(birthday);
    chrome.runtime.sendMessage({friend:birthday}, function(response){
      console.log(response.sent);
    })
}
