// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    console.log(request.friend);
    sendResponse({sent: "sent"});
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
      const headers = new Headers({
      'Authorization' : 'Bearer ' + token,
      'Content-Type': 'application/json'
      })

      const queryParams = { headers };

      fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', queryParams)
        .then((response) => response.json()) // Transform the data into json
        .then(function(data) {
        console.log("Succeed");
        })
      })
    });
