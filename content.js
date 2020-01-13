window.oncontextmenu = function(e) {
    var birthday = e.target.parentElement.getAttribute("data-tooltip-content")
    console.log(birthday);
}
