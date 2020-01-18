'use strict';

let displayBirthday = document.getElementById('displayBirthday');
//chrome.storage.local.set({"birthday":{}});
chrome.storage.local.get(['birthday'], function(data){
    var bday = data.birthday;
    var names = Object.keys(bday).sort(function(a,b) {
      return (new Date(bday[a].date) - new Date(bday[b].date))});
    for (var index in names){
      let name = names[index];
      let row = displayBirthday.insertRow(-1);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      var text1 = document.createElement('label');
      text1.for = "chk";
      text1.innerHTML = name;
      text1.name = "friend";
      // text1.name = "friend";
      var chk = document.createElement('input');
      chk.type = "checkbox";
      let text2 = document.createTextNode(bday[[name]].date);
      text2.name = "friend";
      cell1.appendChild(text1);
      cell2.appendChild(text2);
      cell1.className += "friend";
      cell2.className += "friend";
      text1.className += "friend";
      text2.className += "friend";
      cell1.name = name;
      cell2.name = name;
      text1.name = name;
      text2.name = name;
    }
});

document.body.onclick = function(element){
  if (element.target.classList.contains("friend")){
    chrome.storage.local.set({"current_friend":element.target.name});
    window.location.href = "profile.html";
  }
}
