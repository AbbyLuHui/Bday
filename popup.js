// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// let changeColor = document.getElementById('changeColor');
// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });
//
// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// };
let displayBirthday = document.getElementById('displayBirthday');
chrome.storage.local.get(['birthday'], function(data){
    console.log(data.birthday);
    var bday = data.birthday;
    var names = Object.keys(bday);
    console.log(names);
    var i = 0;
    for (var index in names){
      let name = names[index];
      // console.log(names[index]);
      console.log(bday[name]);
      displayBirthday.rows[i].cells[0].innerHTML = name;
      displayBirthday.rows[i].cells[1].innerHTML = bday[[name]].date;
      i += 1;
    }
});

let addGift = document.getElementById('addGift');
addGift.onclick = function(element){
  window.location.href = "addgift.html";
}
