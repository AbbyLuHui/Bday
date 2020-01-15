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
chrome.storage.local.get(['birthday', 'color'], function(data){
    displayBirthday.rows[0].cells[0].innerHTML = data.birthday.name;
    displayBirthday.rows[0].cells[1].innerHTML = data.birthday.date;
    displayBirthday.rows[1].cells[0].innerHTML = data.birthday.gifturl;
    displayBirthday.rows[1].cells[1].innerHTML = data.birthday.giftdescription;
    console.log(data.birthday.gifturl);
});

let addGift = document.getElementById('addGift');
addGift.onclick = function(element){
  window.location.href = "addgift.html";
}
