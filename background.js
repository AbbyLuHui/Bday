'use strict';

var contextMenusItem = {
  id: "addbirthday",
  title: "Add Birthday to Google Calendar", 
  contexts:['page'], 
};

chrome.contextMenus.create(contextMenusItem);

chrome.contextMenus.onClicked.addListener(function(e){
  console.log("addBirthday");
  var birthday = e.target.parentElement.getAttribute("data-tooltip-content");
  console.log(birthday);
});

// var addBirthday = function(e){
//   console.log("addBirthday");
//   var birthday = e.target.parentElement.getAttribute("data-tooltip-content")
//     chrome.runtime.sendMessage({friend:birthday}, function(response){
//       console.log(response.sent);
//     })
// }

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({color: '#3aa757'}, function() {
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

var event;
var name;
var curr_year_bday;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    console.log(request.friend);
    sendResponse({sent: "sent"});
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
      var opt = {
        type: "basic",
        title: "Primary Title",
        message: "Primary message to display",
        //iconUrl: "url_to_small_icon"
      }

      const headers = new Headers({
        'Authorization' : 'Bearer ' + token,
        'Content-Type': 'application/json'
      })

      //ADD WHEN REQUEST.FRIEND == NULL TO ACCOUNT FOR RANDOM RIGHT CLICK ON THE PAGE

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



       fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events/', createParams)
         .then((response) => response.json()) // Transform the data into json
         .then(function(d) {
           var id = d.id;
           chrome.storage.local.get(['birthday'], function(data){
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
         });
        chrome.storage.local.set({"current_friend":name});
        //chrome.notifications.onButtonClicked.addListener(undoBtnClick);
    })
});

// function undoBtnClick {
//   chrome.storage.local.get("current_friend", function(user){
//     chrome.storage.local.get("birthday", function(data){
//       var event_id = data.birthday[user.current_friend].id;
//       const deleteParams = {
//         headers: headers,
//         method: "DELETE",
//       };
//      fetch ('https://www.googleapis.com/calendar/v3/calendars/primary/events/' + event_id, deleteParams);
//      delete data.birthday[user.current_friend];
//      chrome.storage.local.set(data);
//     })
//   })
// }
