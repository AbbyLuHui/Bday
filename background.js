'use strict';

var contextMenusItem = {
  id: "addbirthday1",
  title: "Add Birthday to Google Calendar",
  contexts:['link'],
  documentUrlPatterns: ["https://www.facebook.com/events/birthdays/"]
};

chrome.contextMenus.create(contextMenusItem);



chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({"birthday":{}});
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

var event;
var name;
var curr_year_bday;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    chrome.contextMenus.onClicked.addListener(function(){
      console.log(request.friend);
      sendResponse({sent: "sent"});
      chrome.identity.getAuthToken({ 'interactive': true }, function(token) {

      const headers = new Headers({
        'Authorization' : 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
      //if (request.friend !== "null" && request.friend !== "UNDO"){
      var lst = request.friend.split('(')
      name = lst[0].trim()
      var date_lst = lst[1].split(')')
      var date = date_lst[0]
      var month = date.split('/')[0]
      var day = date.split('/')[1]
      var d = new Date()
      var curr_year = d.getFullYear()

      curr_year_bday = curr_year+'-'+month+'-'+day

      event = {
        'summary': name + "'s Birthday",
        'start': {
          'date': curr_year_bday
        },
        'end': {
          'date': curr_year_bday
        },
        'recurrence': [
           'RRULE:FREQ=YEARLY;COUNT=2'
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 72 * 60},
            {'method': 'popup', 'minutes': 10}
          ]
        }
      };

      const createParams = {
        headers: headers,
        method: "POST",
        body: JSON.stringify(event)
      };


       chrome.storage.local.get(['birthday'], function(data){
         console.log(name in data.birthday);
         if (!(name in data.birthday)){
           fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events/', createParams)
             .then((response) => response.json()) // Transform the data into json
             .then(function(d) {
              var id = d.id;
              if (data !== 'undefined'){
               var bday_data = data.birthday;
               bday_data[name]={"date":curr_year_bday, "gifturl":[], "giftdescription":[], "phone":"", "message":"", "id":id};
               chrome.storage.local.set({"birthday":bday_data}, function(){
                 console.log("defined,", bday_data);
               });
              } else{
               var bday_data={"birthday":{[name]:{"date":curr_year_bday, "gifturl":[], "giftdescription":[], "phone":"", "message":"", "id":id}}};
               chrome.storage.local.set(bday_data);
               console.log("undefined,", bday_data);
             };
           });
         };
         });
        chrome.storage.local.set({"current_friend":name});
        //chrome.notifications.onButtonClicked.addListener(undoBtnClick);
    })
    })
});
