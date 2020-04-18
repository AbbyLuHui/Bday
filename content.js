window.oncontextmenu = function(e) {
    var birthday = e.target.parentElement.getAttribute("data-tooltip-content");
    var link = "www.facebook.com/messages/t/"+e.target.parentElement.getAttribute("href").split(".com/")[1];
    console.log(birthday);
    chrome.runtime.sendMessage({friend:birthday}, function(response){
      console.log(response.sent);
    })
}
