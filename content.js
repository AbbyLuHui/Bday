window.oncontextmenu = function(e) {
    alert("Right Click");
    console.log(e.target.parentElement);
    console.log(e.target.tagName);
}
